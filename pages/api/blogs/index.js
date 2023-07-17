import connectDB from '../../../lib/mongo';
import uploadImage from '../../../services/imageService';
import Blog from '../../../models/Blog';

connectDB();

export default async (req, res) => {
    const {method} = req;

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

                res.status(200).json({success: true, data: blogsWithImageURL})
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        case 'POST':
            try {
                const {title, description, image} = req.body;

                // Upload image to Cloudinary
                const result = await uploadImage(image);

                // Create a new event with the image URL
                const blog = await Blog.create({
                    title,
                    description,
                    imageUrl: result.secure_url, // Save the Cloudinary image URL
                });

                res.status(201).json({success: true, data: blog})
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        default:
            res.status(400).json({success: false});
            break;
    }
}