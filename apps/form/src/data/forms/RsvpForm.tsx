import React from 'react';
import {
    Button,
    Card,
    Text,
    TextInput,
    Radio,
    Group,
} from '@mantine/core';
import * as yup from 'yup';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { showNotification } from '@mantine/notifications';
import { useForm, yupResolver } from '@mantine/form';
import { db } from '../../app/firebaseConfig';

const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    attendance: yup.string().required('Attendance status is required'),
});

const RSVPForm = () => {
    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            attendance: '',
            message: '',
        },
        validate: yupResolver(validationSchema),
    });

    return (
        <Card className="max-w-lg mx-auto px-6 py-8 shadow-md">
            <Text className="text-3xl font-bold text-center mb-8">
                RSVP for Our Event
            </Text>
            <form onSubmit={form.onSubmit((values) => {
                const rsvp = {
                    name: values.name,
                    email: values.email,
                    attendance: values.attendance,
                    message: values.message,
                    createdAt: serverTimestamp(),
                };
                addDoc(collection(db, 'rsvps'), rsvp)
                    .then(() => {
                        showNotification({
                            id: `rsvp-${Math.random()}`,
                            autoClose: 5000,
                            title: 'Success',
                            message: 'RSVP submitted successfully',
                            color: 'green',
                            loading: false,
                        });
                        form.reset();
                    })
                    .catch((error) => {
                        console.log(error);
                        showNotification({
                            id: `rsvp-${Math.random()}`,
                            autoClose: 5000,
                            title: 'Error',
                            message: 'Error submitting RSVP, please try again',
                            color: 'red',
                            loading: false,
                        });
                    });
            })}>
                <TextInput
                    label="Name"
                    required
                    name="name"
                    placeholder="Enter your name"
                    className="mb-4"
                    {...form.getInputProps('name')}
                />
                <TextInput
                    label="Email"
                    required
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="mb-4"
                    {...form.getInputProps('email')}
                />
                <Radio.Group
                    label="Attendance"
                    required
                    name="attendance"
                    className="mb-4"
                    {...form.getInputProps('attendance')}
                >
                    <Group>
                        <Radio value="attending" label="Attending" />
                        <Radio value="not_attending" label="Not Attending" />
                        <Radio value="unsure" label="Unsure" />
                    </Group>
                </Radio.Group>
                <TextInput
                    label="Message"
                    name="message"
                    placeholder="Enter your message (optional)"
                    className="mb-4"
                    {...form.getInputProps('message')}
                />
                <Button type="submit" fullWidth>
                    Submit RSVP
                </Button>
            </form>
        </Card>
    );
};

export default RSVPForm;
