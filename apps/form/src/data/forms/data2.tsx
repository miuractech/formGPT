//create a with email field and a checkbox to accept terms and conditions. 
import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../app/firebaseConfig';
import { useState } from 'react';
import { showNotification } from '@mantine/notifications';

const Data2 = () => {
const [loading, setLoading] = useState(false)
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
        <div className='max-w-md mx-auto'>
            <form onSubmit={form.onSubmit(async (values) => {
                try {
                    setLoading(true)
                    const dataWithTimestamp = { ...values, createdAt: serverTimestamp() };
                    await addDoc(collection(db, "Data2"), dataWithTimestamp);
                    console.log("Form submission saved to Firestore!");
                    setLoading(false)
                    showNotification({
                        id: `survey - success - ${Math.random()}`,
                        autoClose: 5000,
                        title: 'Success',
                        message: 'Details saved successfully',
                        color: 'green',
                    });
                } catch (error) {
                    console.error("Error saving form submission to Firestore: ", error);
                    setLoading(false)
                    showNotification({
                        id: `survey - error - ${Math.random()}`,
                        autoClose: 5000,
                        title: 'Error',
                        message: 'Error try again',
                        color: 'red',
                    });
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
                    <Button loading={loading} type="submit">Submit</Button>
                </Group>
            </form>
        </div>
    )
}

export default Data2