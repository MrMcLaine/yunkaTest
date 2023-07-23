// api/admin/login.js

import dbConnect from '../../../lib/mongo';
import Admin from '../../../models/Admin';
import {comparePasswords} from '../../../lib/utils/passwordUtils';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {

            //checking block

            await dbConnect();

            const {email, password} = req.body;

            // Find the admin with the provided email
            const admin = await Admin.findOne({email});

            console.log(admin);

            if (!admin) {
                // Admin not found
                return res.status(401).json({error: 'Invalid email or password.'});
            }

            const isPasswordValid = await comparePasswords(password, admin.password);
            console.log('Password validation:', isPasswordValid);

            if (!isPasswordValid) {
                // Invalid password
                console.log('!password');
                return res.status(401).json({error: 'Invalid email or password.'});
            }

            // Authentication successful
            // Generate a token or session to indicate the logged-in state

            res.status(200).json({message: 'Login successful.'});
        } catch (error) {
            console.log(error);
            res.status(500).json({error: 'An error occurred while logging in.'});
        }
    } else {
        res.status(405).json({error: 'Method not allowed.'});
    }
}
