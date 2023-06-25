import dbConnect from '../../../../lib/mongo/index';
import Admin from '../../../../models/Admin';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await dbConnect();

            const { email, password, role } = req.body;

            const newAdmin = new Admin({
                email,
                password,
                role,
            });

            await newAdmin.save();

            res.status(200).json({ message: 'Admin created successfully.' });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while creating the admin.' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed.' });
    }
}
