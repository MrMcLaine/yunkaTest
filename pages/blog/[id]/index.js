import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader } from 'semantic-ui-react';

const Blog = ({ blog }) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deleteBlog();
        }
    }, [isDeleting])

    const open = () => setConfirm(true);

    const close = () => setConfirm(false);

    const deleteBlog = async () => {
        const id = router.query.id;
        try {
            await fetch(`http://localhost:3000/api/blogs/${id}`, {
                method: "Delete"
            });
            await router.push("/");
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    }

    return (
        <div className="note-container">
            {isDeleting
                ? <Loader active />
                :
                <>
                    <h1>{blog.title}</h1>
                    <p>{blog.description}</p>
                    <Button color='red' onClick={open}>Delete</Button>
                </>
            }
            <Confirm
                open={confirm}
                onCancel={close}
                onConfirm={handleDelete}
            />
        </div>
    )
}

Blog.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/blogs/${id}`);
    const { data } = await res.json();

    return { blog: data }
}

export default Blog;