import React from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { showNotification } from '@mantine/notifications';
import * as yup from 'yup';
import { db } from '../../app/firebaseConfig';
import { useForm, yupResolver } from '@mantine/form';
import { Text, TextInput } from '@mantine/core';

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

    return (
        <div className='min-h-screen grid items-center'>
            <div className="bg-white rounded-lg shadow-lg py-6 px-8 max-w-sm mx-auto">
                <h2 className="text-2xl font-bold mb-4">Subscribe to our newsletter</h2>
                <form onSubmit={form.onSubmit((data) => {
                    const subscriber = {
                        email: data.email,
                        createdAt: serverTimestamp(),
                    };
                    addDoc(collection(db, 'subscribers'), subscriber)
                        .then(() => {
                            showNotification({
                                id: `subscribe-${Math.random()}`,
                                autoClose: 5000,
                                title: 'Success',
                                message: 'Thanks for subscribing!',
                                color: 'green',
                                loading: false,
                            });
                            form.reset();
                        })
                        .catch((error) => {
                            console.log(error);
                            showNotification({
                                id: `subscribe-${Math.random()}`,
                                autoClose: 5000,
                                title: 'Error',
                                message: 'Error subscribing, please try again',
                                color: 'red',
                                loading: false,
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
                            className={`w-full p-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ${form.errors.email ? 'border-red-500' : ''
                                }`}
                            {...form.getInputProps('email')}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewsletterForm;
