import connectDB from '../../../lib/mongo';
import cloudinary from '../../../lib/cloudinary/index';
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
                }));

                res.status(200).json({ success: true, data: eventsWithImageURL })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const result = await cloudinary.uploader.upload(req.body.image, {
                    folder: 'D://test'
                });

                const event = await Event.create({
                    title: req.body.title,
                    description: req.body.description,
                    imageUrl: result.secure_url
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