import React, { useState } from "react";
import { Form, Input, Button, Grid } from "semantic-ui-react";
import axios from "axios";

function JoinPage() {
    const [telegramUsername, setTelegramUsername] = useState("");
    const [inviteLink, setInviteLink] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("/api/chatBot", {
                username: telegramUsername,
            });
            const { inviteLink } = response.data;
            setInviteLink(inviteLink);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Join Chat-Bot</h1>
            <Grid columns={3} centered>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Field>
                                <Input
                                    fluid
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="Enter Your Telegram Username"
                                    value={telegramUsername}
                                    onChange={(e) => setTelegramUsername(e.target.value)}
                                />
                            </Form.Field>
                            <Button type="submit" primary>
                                Join Chat
                            </Button>
                        </Form>
                        {inviteLink && (
                            <div>
                                <h2>Your Invite Link:</h2>
                                <a href={inviteLink} target="_blank" rel="noopener noreferrer">
                                    {inviteLink}
                                </a>
                            </div>
                        )}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}

export default JoinPage;
