import connectDB from '../../../lib/mongo';
import Blog from '../../../models/Blog';
import {IncomingForm} from 'formidable';
import uploadImage from "../../../services/imageService";


connectDB();

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req, res) => {
    const {method} = req;
    console.log('Start api/blogs');

    switch (method) {
        case 'GET':
            try {
                const blogs = await Blog.find({});

                const blogsWithImageURL = blogs.map((blog) => ({
                    _id: blog.id,
                    title: blog.title,
                    description: blog.description,
                    imageUrl: blog.imageUrl,
                }));

                res.status(200).json({success: true, data: blogsWithImageURL});
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        case 'POST':
            try {
                const form = new IncomingForm();

                const formPromise = new Promise((resolve, reject) => {
                    form.parse(req, (err, fields, files) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve({fields, files});
                    });
                });

                const {fields, files} = await formPromise;

                const {title, description} = fields;
                const {image} = files;

                const titleValue = title[0];
                const descriptionValue = description[0];

                const imageValues = image.valueOf().toString();
                const startIndex = imageValues.indexOf('Path: ') + 6;
                const endIndex = imageValues.length;
                const filepath = imageValues.slice(startIndex, endIndex);

                // Upload image to Cloudinary
                const result = await uploadImage(filepath);
                const imageUrl = result.secure_url;

                // Create a new event with the image URL
                const blog = await Blog.create({
                    title: titleValue,
                    description: descriptionValue,
                    imageUrl: imageUrl, // Save the Cloudinary image URL
                });

                res.status(201).json({success: true, data: blog});
            } catch (error) {
                console.log('Some err', error);
                console.log('Error handling method:', method);
                res.status(400).json({success: false});
            }

            break;
        default:
            console.log('Error handling method:', method);
            res.status(400).json({success: false});
            break;
    }
};
