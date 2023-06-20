import connectDB from '../../../lib/mongo';
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
                const event = await Event.create(req.body);

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