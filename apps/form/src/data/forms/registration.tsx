// Import required modules and libraries
import { useState } from 'react';
import { TextInput, Button } from '@mantine/core';
import { string, object, ref } from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../app/firebaseConfig';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { showNotification } from '@mantine/notifications';

// Define validation schema using Yup
const validationSchema = object({
  email: string().email('Invalid email').required('Email is required'),
  password: string().min(6,"Password must be a minimum of 6 characters").required('Password is required'),
  confirmPassword: string().oneOf([ref('password')], 'Passwords must match'),
});

// Create the Registration component
function Registration() {
  // Set up state for loading button
  const [loading, setLoading] = useState(false);

  // Set up form with initial values and validation resolver
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: yupResolver(validationSchema),
  });

  // Handle registration submit
  const handleSubmit = async (values: { email: string; password: string; }) => {
    try {
      // Attempt to create user account with email and password
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(auth, values.email, values.password);

      // Add user details to firestore database
      const userDetails = {
        email: values.email,
        createdAt: serverTimestamp(),
        uid: user.uid,
      };
      await addDoc(collection(db, 'registration'), userDetails);

      // Show success notification and reset form
      showNotification({
        id: `reg-err-${Math.random()}`,
        autoClose: 5000,
        title: 'Success',
        message: 'Account created successfully',
        color: 'green',
      });
      setLoading(false);
      form.reset();
    } catch (error) {
      // Handle errors and show error notification
      setLoading(false);
      console.log(error);
      showNotification({
        id: `reg-err-${Math.random()}`,
        autoClose: 5000,
        title: 'Error',
        message: 'Error creating account, please try again',
        color: 'red',
      });
    }
  };

  // Render registration form
  return (
    <div className='max-w-md mx-auto' >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label='Email' required name='email' placeholder='Enter your email' {...form.getInputProps('email')} />
        <TextInput label='Password' required name='password' type='password' placeholder='Enter your password' {...form.getInputProps('password')} />
        <TextInput label='Confirm password' required name='confirmPassword' type='password' placeholder='Confirm your password' {...form.getInputProps('confirmPassword')} />
        <Button loading={loading} className='my-3' type='submit'>Register</Button>
      </form>
    </div>
  );
}

// Export the Registration component
export default Registration;
