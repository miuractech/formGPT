import React from 'react'
import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../app/firebaseConfig';

const Data2 = () => {

    const form = useForm({
        initialValues: {
            email: '',
            termsOfService: false,
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });


    return (
        <Box maw={300} mx="auto" className='h-screen grid items-center'>
            <form onSubmit={form.onSubmit(async (values) => {
                try {
                    const dataWithTimestamp = { ...values, createdAt: serverTimestamp() };
                    await addDoc(collection(db, "Data2"), dataWithTimestamp);
                    console.log("Form submission saved to Firestore!");
                } catch (error) {
                    console.error("Error saving form submission to Firestore: ", error);
                }
            })}>
                <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    {...form.getInputProps('email')}
                />

                <Checkbox
                    mt="md"
                    label="I agree to sell my privacy"
                    {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                />

                <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Box>
    )
}

export default Data2