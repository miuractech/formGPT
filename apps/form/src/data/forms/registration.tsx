//create a registaion form using mantine compoents and mantaine forms with yup validation

import React from 'react';
import { TextInput, Button } from '@mantine/core';
import * as yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../app/firebaseConfig';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { showNotification } from '@mantine/notifications';

const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
});

function Registration() {

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: yupResolver(validationSchema),
    });

    return (
        <div className='h-screen grid items-center max-w-xl m-auto' >
            <form onSubmit={form.onSubmit(async (values) => {
                try {
                    const { user } = await createUserWithEmailAndPassword(auth, values.email, values.password)
                    const userDetails = {
                        email: values.email,
                        createdAt: serverTimestamp(),
                        uid: user.uid,
                    };
                    await addDoc(collection(db, "registration"), userDetails)
                    showNotification({
                        id: `reg-err-${Math.random()}`,
                        autoClose: 5000,
                        title: 'Success',
                        message: 'Account created successfully',
                        color: 'green',
                        loading: false,
                    });
                    form.reset()
                } catch (error) {
                    console.log(error);
                    showNotification({
                        id: `reg-err-${Math.random()}`,
                        autoClose: 5000,
                        title: 'Error',
                        message: 'Error creating account please try again',
                        color: 'red',
                        loading: false,
                    });

                }
            })}>
                <TextInput label="Email" required name="email" placeholder="Enter your email" {...form.getInputProps("email")} />
                <TextInput label="Password" required name="password" type="password" placeholder="Enter your password" {...form.getInputProps("password")} />
                <TextInput label="Confirm password" required name="confirmPassword" type="password" placeholder="Confirm your password" {...form.getInputProps("confirmPassword")} />
                <Button type="submit">Register</Button>
            </form>
        </div>
    );
}

export default Registration;
