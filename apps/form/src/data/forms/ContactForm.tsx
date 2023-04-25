//create a conatct form using mantine compontns and mantaine forms with yup validation

import React from 'react';
import { Textarea, Button, TextInput } from '@mantine/core';
import * as yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../app/firebaseConfig';
import { showNotification } from '@mantine/notifications';

interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    message: yup.string().required('Message is required'),
});

function ContactForm() {
    const form = useForm<ContactFormData>({
        initialValues: {
            name: '',
            email: '',
            message: '',
        },
        validate: yupResolver(validationSchema),
    });

    const handleSubmit = async (values: ContactFormData) => {
        try {
            await addDoc(collection(db, 'contactsInfo'), {
                name: values.name,
                email: values.email,
                message: values.message,
                createdAt: serverTimestamp(),
            });

            showNotification({
                id: `contact-success-${Math.random()}`,
                title: 'Success',
                message: 'Message sent successfully',
                color: 'green',
                autoClose: 5000,
            });

            form.reset();
        } catch (error) {
            showNotification({
                id: `contact-error-${Math.random()}`,
                title: 'Error',
                message: 'An error occurred, please try again',
                color: 'red',
                autoClose: 5000,
            });
        }
    };

    return (
        <div className="h-screen grid items-center max-w-xl m-auto">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput label="Name" required {...form.getInputProps('name')} />
                <TextInput label="Email" required {...form.getInputProps('email')} />
                <Textarea
                    label="Message"
                    required
                    rows={5}
                    {...form.getInputProps('message')}
                />
                <Button type="submit">Send</Button>
            </form>
        </div>
    );
}

export default ContactForm;
