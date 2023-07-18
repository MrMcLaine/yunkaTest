import { useState, useEffect } from 'react';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const NewBlog = () => {
    const [form, setForm] = useState({ title: '', description: '', image: null });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();
    console.log('Start NewBlog');

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createBlog();
            } else {
                setIsSubmitting(false);
            }
        }
    }, [errors]);

    const createBlog = async () => {
        try {
            console.log('Start createBlog');
            const formData = new FormData();
            console.log('Title from form', form.title);
            formData.append('title', form.title);
            console.log('Description from form', form.description);
            formData.append('description', form.description);
            console.log('Image from form', form.image);
            formData.append('image', form.image);
            console.log('FormData', formData);

            await fetch("/api/blogs", {
                method: "POST",
                body: formData,
            });

            console.log('return to /')
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
            <h1>New Blog</h1>
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
                            onChange={handleChange}
                        />
                        <Form.TextArea
                            label="Description"
                            placeholder="Description"
                            name="description"
                            error={errors.description ? { content: 'Please enter a description', pointing: 'below' } : null}
                            onChange={handleChange}
                        />
                        <Form.Input
                            type="file"
                            label="Image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <Button type="submit">Create</Button>
                    </Form>
                )}
            </div>
        </div>
    );
};

export default NewBlog;
