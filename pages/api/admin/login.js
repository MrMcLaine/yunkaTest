// api/admin/login.js

import dbConnect from '../../../lib/mongo';
import Admin from '../../../models/Admin';
import {comparePasswords, hashPassword} from '../../../lib/utils/passwordUtils';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {

            //checking block

/*            const pass = 'wwww';
            const hPass = await hashPassword(pass);
            const isChecked = await comparePasswords(pass, hPass);
            console.log(hPass);
            console.log('CHECKING ---> ', isChecked);*/

            console.log('Connect to db');
            await dbConnect();

            const { email, password } = req.body;

            console.log(email, password);

            // Find the admin with the provided email
            const admin = await Admin.findOne({ email });

            console.log(admin);

            if (!admin) {
                // Admin not found
                console.log('!admin');
                return res.status(401).json({ error: 'Invalid email or password.' });
            }

            console.log('start comparing');
            // Compare the provided password with the hashed password stored in the database
            console.log(password);
            console.log(admin.password);

            const pass = 'wwww';
            const hPass = await hashPassword(pass);
            console.log(hPass);

            const isPasswordValid = await comparePasswords(password, admin.password);
            console.log('Password validation:', isPasswordValid);

            if (!isPasswordValid) {
                // Invalid password
                console.log('!password');
                return res.status(401).json({ error: 'Invalid email or password.' });
            }

            // Authentication successful
            // Generate a token or session to indicate the logged-in state

            res.status(200).json({ message: 'Login successful.' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An error occurred while logging in.' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed.' });
    }
}
