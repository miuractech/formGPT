import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Box } from '@mantine/core';

export default function Data5() {
    const form = useForm({ initialValues: { name: '', occupation: '' } });

    useEffect(() => {
        const storedValue = window.localStorage.getItem('user-form');
        if (storedValue) {
            try {
                const data = window.localStorage.getItem('user-form')
                if (data) {
                    form.setValues(JSON.parse(data));
                }
            } catch (e) {
                console.log('Failed to parse stored value');
            }
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem('user-form', JSON.stringify(form.values));
    }, [form.values]);

    return (
        <div>
            <Box maw={320} mx="auto" >
                <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
                <TextInput
                    mt="md"
                    label="Occupation"
                    placeholder="Occupation"
                    {...form.getInputProps('occupation')}
                />
            </Box>
        </div>
    );
}