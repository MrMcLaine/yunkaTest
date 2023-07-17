import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Image } from 'semantic-ui-react';
import React from 'react';

const Index = ({ blogs }) => {
    return (
        <div className="notes-container">
            <h1>Blog</h1>
            <Link href="/newBlog">
                <Button color="pink" type="button">
                    Create new blog
                </Button>
            </Link>
            <div className="grid wrapper">
                {blogs.map((blog) => {
                    return (
                        <div key={blog._id}>
                            <Card>
                                {blog.imageUrl && (
                                    <Image src={blog.imageUrl} alt="Event" />
                                )}
                                <Card.Content>
                                    <Card.Header>{blog.title}</Card.Header>
                                    <Card.Description>{blog.description}</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Link href={`/blog/${blog._id}`}>
                                        <Button primary>View</Button>
                                    </Link>
                                    <Link href={`/blog/${blog._id}/edit`}>
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
    const res = await fetch('http://localhost:3000/api/blogs/');
    const { data } = await res.json();

    return { blogs: data };
};

export default Index;
