//create a newletter subscribing form;

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { showNotification } from '@mantine/notifications';
import * as yup from 'yup';
import { db } from '../../app/firebaseConfig';
import { useForm, yupResolver } from '@mantine/form';
import { Button, Text, TextInput } from '@mantine/core';
import { useState } from 'react';

const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
});
const NewsletterForm = () => {
    const form = useForm({
        initialValues: {
            email: '',
        },
        validate: yupResolver(validationSchema),
    });
    const [loading, setLoading] = useState(false)
    return (
        <div className='min-h-screen grid items-center'>
            <div className="bg-white rounded-lg shadow-lg py-6 px-8 max-w-sm mx-auto">
                <h2 className="text-2xl font-bold mb-4">Subscribe to our newsletter</h2>
                <form onSubmit={form.onSubmit((data) => {
                                                setLoading(true)
                    const subscriber = {
                        email: data.email,
                        createdAt: serverTimestamp(),
                    };
                    addDoc(collection(db, 'subscribers'), subscriber)
                        .then(() => {
                            showNotification({
                                id: `subscribe-${Date.now()}`,
                                autoClose: 5000,
                                title: 'Success',
                                message: 'Thanks for subscribing!',
                                color: 'green',
                            });
                            form.reset();
                            setLoading(false)

                        })
                        .catch((error) => {
                            setLoading(false)
                            console.log(error);
                            showNotification({
                                id: `subscribe-${Date.now()}`,
                                autoClose: 5000,
                                title: 'Error',
                                message: 'Error subscribing, please try again',
                                color: 'red',
                            });
                        });
                })}>
                    <div className="mb-4">
                        <Text className="block font-medium mb-2">
                            Email Address
                        </Text>
                        <TextInput
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            {...form.getInputProps('email')}
                        />
                    </div>
                    <Button
                        type="submit"
                        loading={loading}
                    >
                        Subscribe
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default NewsletterForm;
