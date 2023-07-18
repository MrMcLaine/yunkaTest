import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import fetch from "isomorphic-unfetch";

const EditBlog = ({ blog }) => {
    console.log('Start EditBlog');
    console.log('EditBlog', blog);
    const [form, setForm] = useState({ title: blog.title, description: blog.description, image: null });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateBlog();
            } else {
                setIsSubmitting(false);
            }
        }
    }, [errors]);

    const updateBlog = async () => {
        try {
            const formData = new FormData();
            formData.append('title', form.title);
            formData.append('description', form.description);
            formData.append('image', form.image);

            await axios.put(`/api/blogs/${router.query.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            router.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        setForm({
            ...form,
            image: e.target.files[0],
        });
    };

    const validate = () => {
        let err = {};

        if (!form.title) {
            err.title = 'Title is required';
        }
        if (!form.description) {
            err.description = 'Description is required';
        }

        return err;
    };

    return (
        <div className="form-container">
            <h1>Update Blog</h1>
            <div>
                {isSubmitting ? (
                    <Loader active inline="centered" />
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                            label="Title"
                            placeholder="Title"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                        />
                        <Form.TextArea
                            label="Description"
                            placeholder="Description"
                            name="description"
                            error={errors.description ? { content: 'Please enter a description', pointing: 'below' } : null}
                            value={form.description}
                            onChange={handleChange}
                        />
                        <Form.Input
                            type="file"
                            label="Image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <Button type="submit">Update</Button>
                    </Form>
                )}
            </div>
        </div>
    );
};

EditBlog.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/blogs/${id}`);
    const { data } = await res.json();

    return { blog: data }
}

export default EditBlog;
