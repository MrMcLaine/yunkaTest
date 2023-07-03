import connectDB from '../../../lib/mongo';
import uploadImage from '../../../services/imageService';
import Event from '../../../models/Event';

connectDB();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const events = await Event.find({});

                const eventsWithImageURL = events.map((event) => ({
                    _id: event.id,
                    title: event.title,
                    description: event.description,
                    imageUrl: event.imageUrl,
                }));

                res.status(200).json({ success: true, data: eventsWithImageURL })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const {title, description, image} = req.body;

                // Upload image to Cloudinary
                const result = await uploadImage(image);

                // Create a new event with the image URL
                const event = await Event.create({
                    title,
                    description,
                    imageUrl: result.secure_url, // Save the Cloudinary image URL
                });

                res.status(201).json({ success: true, data: event })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}