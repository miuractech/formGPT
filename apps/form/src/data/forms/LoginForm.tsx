//create a login form for email and password
import { TextInput, Button } from '@mantine/core';
import * as yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../app/firebaseConfig';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';
const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'password must be greater than 6 chars')
    .required('Password is required'),
});
function LoginForm() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: yupResolver(validationSchema),
  });
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-md mx-auto">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            setLoading(true);
            await signInWithEmailAndPassword(
              auth,
              values.email,
              values.password
            );
            showNotification({
              id: `login-success-${Math.random()}`,
              autoClose: 5000,
              title: 'Success',
              message: 'logged in successfully',
              color: 'green',
            });
            form.reset();
            setLoading(false);
          } catch (error) {
            console.log(error);
            showNotification({
              id: `login-error-${Math.random()}`,
              autoClose: 5000,
              title: 'Error',
              message: 'Incorrect email or password. Please try again.',
              color: 'red',
            });
            setLoading(false);
          }
        })}
      >
        <TextInput
          label="Email"
          required
          name="email"
          placeholder="Enter your email"
          {...form.getInputProps('email')}
        />
        <TextInput
          label="Password"
          required
          name="password"
          type="password"
          placeholder="Enter your password"
          {...form.getInputProps('password')}
        />
        <Button loading={loading} className="mt-4" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
