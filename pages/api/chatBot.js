import { generateInviteLink } from '../../services/telegramBotService';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { username } = req.body;
            console.log('username:', username);
            const inviteLink = generateInviteLink(username);

            res.status(200).json({ inviteLink });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}