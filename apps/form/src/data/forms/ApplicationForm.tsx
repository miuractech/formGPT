//create a application form with feilds email phone address education passingYear otherDetails which is a text,

import React, { useState } from 'react';
import {TextInput,Button,Textarea,Radio,} from '@mantine/core';
import * as yup from 'yup';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../app/firebaseConfig';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().required('Phone number is required'),
    address: yup.string().required('Address is required'),
    sex: yup.string().required('Sex is required'),
    education: yup.string().required('Education is required'),
    passingYear: yup.number().required('Passing year is required'),
    otherDetails: yup.string(),
});

function ApplicationForm() {
    const [loading, setloading] = useState(false)
    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
            sex: '',
            education: '',
            passingYear: '',
            otherDetails: '',
        },
        validate: yupResolver(validationSchema)
    });

    return (
        <div className='max-w-xl m-auto'>
            <form className='space-y-3' onSubmit={form.onSubmit(async (values) => {
                try {
                    setloading(true)
                    await addDoc(collection(db, 'application form'), values);
                    showNotification({
                        id: `login-success-${Math.random()}`,
                        autoClose: 5000,
                        title: 'Success',
                        message: 'Form submited successfully',
                        color: 'green',
                    });
                    form.reset();
                    setloading(false)
                } catch (error) {
                    setloading(false)
                    console.error('Error adding document: ', error);
                    showNotification({
                        id: `login-success-${Math.random()}`,
                        autoClose: 5000,
                        title: 'Error',
                        message: 'Error try again',
                        color: 'red',
                    });
                }
            })}>
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
                    label="Phone"
                    required
                    name="phone"
                    placeholder="Enter your phone number"
                    {...form.getInputProps('phone')}
                />
                <TextInput
                    label="Address"
                    required
                    name="address"
                    placeholder="Enter your address"
                    {...form.getInputProps('address')}
                />
                <Radio.Group
                    label="Sex"
                    required
                    name="sex"
                    {...form.getInputProps('sex')}
                >
                    <div className='space-y-2'>
                        <Radio value="male" label="Male" />
                        <Radio value="female" label="Female" />
                        <Radio value="other" label="Other" />
                    </div>
                </Radio.Group>
                <TextInput
                    label="Education"
                    required
                    name="education"
                    placeholder="Enter your education"
                    {...form.getInputProps('education')}
                />
                <TextInput
                    label="Passing year"
                    required
                    name="passingYear"
                    type="number"
                    placeholder="Enter your passing year"
                    {...form.getInputProps('passingYear')}
                />
                <Textarea
                    label="Other details"
                    name="otherDetails"
                    placeholder="Enter any other details"
                    {...form.getInputProps('otherDetails')}
                />
                <Button loading={loading} type="submit">Submit</Button>
            </form >
        </div>
    );
}

export default ApplicationForm;