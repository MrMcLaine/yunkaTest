import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const NewEvent = () => {
    const [form, setForm] = useState({ title: '', description: '', image: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createEvent();
            } else {
                setIsSubmitting(false);
            }
        }
    }, [errors]);

    const createEvent = async () => {
        try {
            await axios.post('/api/events', form);
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
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            setForm({
                ...form,
                image: e.target.result,
            });
        };

        reader.readAsDataURL(file);
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
            <h1>New Event</h1>
            <div>
                {isSubmitting ? (
                    <Loader active inline="centered" />
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            fluid
                            error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                            label="Title"
                            placeholder="Title"
                            name="title"
                            onChange={handleChange}
                        />
                        <Form.TextArea
                            fluid
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

export default NewEvent;
