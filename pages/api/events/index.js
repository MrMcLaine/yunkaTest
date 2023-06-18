import connectDB from '../../../lib/mongo';
import Event from '../../../models/Event';

connectDB();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const notes = await Event.find({});

                res.status(200).json({ success: true, data: notes })
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