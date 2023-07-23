import React, {useState} from 'react';
import {Input, Button, Form, Grid, Loader} from 'semantic-ui-react';
import axios from 'axios';
import {useRouter} from "next/router";

function AdminPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleAdminLogin() {
        try {
            setLoading(true);
            const response = await axios.post('/api/admin/login', {
                email: email,
                password: password
            });

            // If login is successful, redirect to "/admin/events"
            if (response.data.message === 'Login successful.') {
                await router.push('/admin/events');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Login Admin</h1>
            <Grid columns={3} centered>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Form>
                            <Form.Field>
                                <label>Email:</label>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                /> </Form.Field>
                            <Form.Field>
                                <label>Password:</label>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                />
                            </Form.Field>
                            <Button type="button" onClick={handleAdminLogin}>
                                {loading ? (
                                    <Loader active inline="centered"/> // Show loading animation while loading
                                ) : (
                                    'Login As Admin'
                                )}
                            </Button> </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}

export default AdminPage;
