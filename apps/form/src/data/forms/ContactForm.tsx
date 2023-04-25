//create a conatct form with name, email and message fields
import { Textarea, Button, TextInput } from '@mantine/core';
import * as yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../app/firebaseConfig';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';
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
    const [loading, setLoading] = useState(false)
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
            setLoading(true)
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
            setLoading(false)
            form.reset();
        } catch (error) {
            setLoading(false)
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
            <form className='space-y-3' onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput label="Name" required {...form.getInputProps('name')} />
                <TextInput label="Email" required {...form.getInputProps('email')} />
                <Textarea
                    label="Message"
                    required
                    rows={5}
                    {...form.getInputProps('message')}
                />
                <Button loading={loading} type="submit">Send</Button>
            </form>
        </div>
    );
}

export default ContactForm;
