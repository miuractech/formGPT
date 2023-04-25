//create a survey form using mantine compontns and mantaine forms with yup validation with feilds name email name age occupation and questions

import React, { FC } from 'react';
import { TextInput, Button, Textarea } from '@mantine/core';
import * as yup from 'yup';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../app/firebaseConfig';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

interface FormValues {
    name: string;
    email: string;
    age: number;
    occupation: string;
    question1: string;
    question2: string;
    question3: string;
}

const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    age: yup.number().required('Age is required'),
    occupation: yup.string().required('Occupation is required'),
    question1: yup.string().required('Question 1 is required'),
    question2: yup.string().required('Question 2 is required'),
    question3: yup.string().required('Question 3 is required'),
});

const SurveyForm = () => {
    const form = useForm<FormValues>({
        initialValues: {
            name: '',
            email: '',
            age: 0,
            occupation: '',
            question1: '',
            question2: '',
            question3: '',
        },
        validate: yupResolver(validationSchema),
    });

    const onSubmit = async (values: FormValues) => {
        try {
            await addDoc(collection(db, 'survey'), values);
            showNotification({
                id: `survey - success - ${Math.random()}`,
                autoClose: 5000,
                title: 'Success',
                message: 'Survey submitted successfully',
                color: 'green',
                loading: false,
            });
            form.reset();
        } catch (error) {
            console.error('Error adding document: ', error);
            showNotification({
                id: `survey - error - ${Math.random()}`,
                autoClose: 5000,
                title: 'Error',
                message: 'Error try again',
                color: 'red',
                loading: false,
            });
        }
    };

    return (
        <div className="max-w-xl m-auto">
            <form className="space-y-3" onSubmit={form.onSubmit(onSubmit)}>
                <TextInput
                    label="Name"
                    required
                    name="name"
                    placeholder="Enter your name"
                    {...form.getInputProps('name')}
                />
                <TextInput
                    label="Email"
                    required
                    name="email"
                    placeholder="Enter your email"
                    {...form.getInputProps('email')}
                />
                <TextInput
                    label="Age"
                    required
                    name="age"
                    placeholder="Enter your age"
                    type="number"
                    {...form.getInputProps('age')}
                />
                <TextInput
                    label="Occupation"
                    required
                    name="occupation"
                    placeholder="Enter your occupation"
                    {...form.getInputProps('occupation')}
                />
                <Textarea
                    label="Question 1"
                    required
                    name="question1"
                    placeholder="Enter your answer"
                    {...form.getInputProps('question1')}
                />
                <Textarea
                    label="Question 2"
                    required
                    name="question2"
                    placeholder="Enter your answer"
                    {...form.getInputProps('question2')}
                />
                <Textarea
                    label="Question 3"
                    required
                    name="question3"
                    placeholder="Enter your answer"
                    {...form.getInputProps('question3')}
                />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default SurveyForm;