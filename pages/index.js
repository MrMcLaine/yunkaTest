import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card } from 'semantic-ui-react';

const Index = ({ events }) => {
    return (
        <div className="notes-container">
            <h1>Events</h1>
            <div className="grid wrapper">
                {events.map(event => {
                    return (
                        <div key={event._id}>
                            <Card>
                                <Card.Content>
                                    <Card.Header>
                                        <Link href={`/${event._id}`}>
                                            <a>{event.title}</a>
                                        </Link>
                                    </Card.Header>
                                </Card.Content>
                                <Card.Content extra>
                                    <Link href={`/${event._id}`}>
                                        <Button primary>View</Button>
                                    </Link>
                                    <Link href={`/${event._id}/edit`}>
                                        <Button primary>Edit</Button>
                                    </Link>
                                </Card.Content>
                            </Card>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

Index.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/events/');
    const { data } = await res.json();

    return { events: data }
}

export default Index;