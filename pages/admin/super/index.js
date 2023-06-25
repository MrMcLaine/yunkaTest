import React, { useState } from 'react';
import { Input, Button, Form, Message } from 'semantic-ui-react';
import axios from 'axios';
import { hashPassword } from '../../../lib/utils/passwordUtils.js';

function AdminPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creationStatus, setCreationStatus] = useState(null);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleAdminCreation = async () => {
        try {
            const hashedPassword = await hashPassword(password);
            const adminData = {
                email: email,
                password: hashedPassword,
                role: 'admin',
            };
            await axios.post('/api/admin/super/create', adminData);

            // Admin created successfully
            setCreationStatus('success');

            // Clear form fields
            setEmail('');
            setPassword('');
        } catch (error) {
            console.log(error);
            setCreationStatus('error');
        }
    };

    return (
        <div>
            <h1>Create Admin</h1>
            <Form success={creationStatus === 'success'} error={creationStatus === 'error'}>
                <Form.Field>
                    <label>Email:</label>
                    <Input type="email" value={email} onChange={handleEmailChange} />
                </Form.Field>
                <Form.Field>
                    <label>Password:</label>
                    <Input type="password" value={password} onChange={handlePasswordChange} />
                </Form.Field>
                <Button type="button" onClick={handleAdminCreation}>Create Admin</Button>
                {creationStatus === 'success' && (
                    <Message
                        success
                        header="Admin created"
                        content="The admin has been created successfully."
                    />
                )}
                {creationStatus === 'error' && (
                    <Message
                        error
                        header="Error creating admin"
                        content="An error occurred while creating the admin."
                    />
                )}
            </Form>
        </div>
    );
}

export default AdminPage;
