import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Image } from 'semantic-ui-react';
import React from 'react';

const Index = ({ events }) => {
    return (
        <div className="notes-container">
            <h1>Events</h1>
            <Link href="/new">
                <Button color="pink" type="button">
                    Create new event
                </Button>
            </Link>
            <div className="grid wrapper">
                {events.map((event) => {
                    return (
                        <div key={event._id}>
                            <Card>
                                {event.imageUrl && (
                                    <Image src={event.imageUrl} alt="Event" />
                                )}
                                <Card.Content>
                                    <Card.Header>{event.title}</Card.Header>
                                    <Card.Description>{event.description}</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Link href={`/events/${event._id}`}>
                                        <Button primary>View</Button>
                                    </Link>
                                    <Link href={`/events/${event._id}/edit`}>
                                        <Button primary>Edit</Button>
                                    </Link>
                                </Card.Content>
                            </Card>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

Index.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/events/');
    const { data } = await res.json();

    return { events: data };
};

export default Index;
