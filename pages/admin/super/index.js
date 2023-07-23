import React, {useState} from 'react';
import {Input, Button, Form, Message, Grid} from 'semantic-ui-react';
import axios from 'axios';

function AdminPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [canProcessYunka, setCanProcessYunka] = useState(false);
    const [canChangeAutoLetter, setCanChangeAutoLetter] = useState(false);
    const [canRemoveContent, setCanRemoveContent] = useState(false);
    const [creationStatus, setCreationStatus] = useState(null);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleCanProcessYunkaChange = (event) => {
        setCanProcessYunka(event.target.checked);
    };

    const handleCanChangeAutoLetterChange = (event) => {
        setCanChangeAutoLetter(event.target.checked);
    };

    const handleCanRemoveContentChange = (event) => {
        setCanRemoveContent(event.target.checked);
    };

    const handleAdminCreation = async () => {
        try {
            const adminData = {
                email: email,
                password: password,
                canProcessYunka: canProcessYunka,
                canChangeAutoLetter: canChangeAutoLetter,
                canRemoveContent: canRemoveContent,
            };
            await axios.post('/api/admin/super/create', adminData);

            // Admin created successfully
            setCreationStatus('success');

            // Clear form fields
            setEmail('');
            setPassword('');
            setCanProcessYunka(false);
            setCanChangeAutoLetter(false);
            setCanRemoveContent(false);
        } catch (error) {
            console.log(error);
            setCreationStatus('error');
        }
    };

    return (
        <div>
            <h1>Create Admin</h1>
            <Grid columns={3} centered>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Form success={creationStatus === 'success'} error={creationStatus === 'error'}>
                            <Form.Field>
                                <label>Email:</label>
                                <Input type="email" value={email} onChange={handleEmailChange}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Password:</label>
                                <Input type="password" value={password} onChange={handlePasswordChange}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Can process Yunka-requests:</label>
                                <Input type="checkbox" checked={canProcessYunka}
                                       onChange={handleCanProcessYunkaChange}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Can change the text of Yunka-auto-letter:</label>
                                <Input type="checkbox" checked={canChangeAutoLetter}
                                       onChange={handleCanChangeAutoLetterChange}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Can remove content and Yunka requests</label>
                                <Input type="checkbox" checked={canRemoveContent}
                                       onChange={handleCanRemoveContentChange}/>
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
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}

export default AdminPage;
