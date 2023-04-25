//create a login form using mantine compontns and mantaine forms with yup validation

import React from 'react';
import { TextInput, Button } from '@mantine/core';
import * as yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../app/firebaseConfig';
import { showNotification } from '@mantine/notifications';

const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

function LoginForm() {
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: yupResolver(validationSchema),
    });

    return (
        <div className='h-screen grid items-center max-w-xl m-auto'>
            <form onSubmit={form.onSubmit(async (values) => {
                try {
                    await signInWithEmailAndPassword(auth, values.email, values.password);
                    showNotification({
                        id: `login-success-${Math.random()}`,
                        autoClose: 5000,
                        title: 'Success',
                        message: 'Logged in successfully',
                        color: 'green',
                        loading: false,
                    });
                    form.reset();
                } catch (error) {
                    console.log(error);
                    showNotification({
                        id: `login-error-${Math.random()}`,
                        autoClose: 5000,
                        title: 'Error',
                        message: 'Invalid email or password. Please try again.',
                        color: 'red',
                        loading: false,
                    });
                }
            })}>
                <TextInput label='Email' required name='email' placeholder='Enter your email' {...form.getInputProps('email')} />
                <TextInput label='Password' required name='password' type='password' placeholder='Enter your password' {...form.getInputProps('password')} />
                <Button type='submit'>Login</Button>
            </form>
        </div >
    );
}

export default LoginForm;
