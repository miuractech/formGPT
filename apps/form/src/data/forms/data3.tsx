//create form to collect user info

import { useForm } from '@mantine/form';
import {
  NumberInput,
  TextInput,
  Button,
  Box,
} from '@mantine/core';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../app/firebaseConfig';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';

export default function Data3() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: { name: '', email: '', age: 0 },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) =>
        value.length < 2 ? 'Name must have at least 2 letters' : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      age: (value) =>
        value < 18 ? 'You must be at least 18 to register' : null,
    },
  });

  return (
    <Box maw={320} mx="auto" className="h-screen grid items-center">
      <form
        onSubmit={form.onSubmit((values) => {
          const formData = {
            ...values,
            timestamp: serverTimestamp(), // Include the current timestamp
          };
          setLoading(true);
          addDoc(collection(db, 'data3'), formData)
            .then(() => {
              showNotification({
                id: `reg-err-${Math.random()}`,
                autoClose: 5000,
                title: 'Success',
                message: 'Data saved successfully',
                color: 'green',
              });
              form.reset();
              setLoading(false);
            })
            .catch((error) => {
              setLoading(false);
              console.error('Error saving data: ', error);
              showNotification({
                id: `survey - error - ${Math.random()}`,
                autoClose: 5000,
                title: 'Error',
                message: 'Error try again',
                color: 'red',
              });
            });
        })}
      >
        <TextInput
          label="Name"
          placeholder="Name"
          {...form.getInputProps('name')}
        />
        <TextInput
          mt="sm"
          label="Email"
          placeholder="Email"
          {...form.getInputProps('email')}
        />
        <NumberInput
          mt="sm"
          label="Age"
          placeholder="Age"
          min={0}
          max={99}
          {...form.getInputProps('age')}
        />
        <Button loading={loading} type="submit" mt="sm">
          Submit
        </Button>
      </form>
    </Box>
  );
}
