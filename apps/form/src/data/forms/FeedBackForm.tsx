//create a feedback form with name, email, ratings and mesage fields

import { Button, Card, Text, TextInput, Rating, Textarea } from '@mantine/core';
import * as yup from 'yup';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { showNotification } from '@mantine/notifications';
import { useForm, yupResolver } from '@mantine/form';
import { db } from '../../app/firebaseConfig';
import { useState } from 'react';

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, 'minimum of 3 characters')
    .required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  message: yup
    .string()
    .min(3, 'minimum of 10 characters')
    .required('Message is required'),
});

const FeedbackForm = () => {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      rating: 0,
      message: '',
    },
    validate: yupResolver(validationSchema),
  });
  const [loading, setLoading] = useState(false);
  return (
    <Card className="max-w-lg mx-auto px-6 py-8">
      <Text className="text-3xl font-bold text-center mb-8">
        Leave Your Feedback
      </Text>
      <form
        onSubmit={form.onSubmit((values) => {
          setLoading(true);
          const feedback = {
            name: values.name,
            email: values.email,
            rating: values.rating,
            message: values.message,
            createdAt: serverTimestamp(),
          };
          addDoc(collection(db, 'feedbacks'), feedback)
            .then(() => {
              showNotification({
                id: `feedback-${Math.random()}`,
                autoClose: 5000,
                title: 'Success',
                message: 'Feedback submitted successfully',
                color: 'green',
              });
              form.reset();
              setLoading(false);
            })
            .catch((error) => {
              setLoading(false);
              console.log(error);
              showNotification({
                id: `feedback-${Math.random()}`,
                autoClose: 5000,
                title: 'Error',
                message: 'Error submitting feedback, please try again',
                color: 'red',
              });
            });
        })}
      >
        <TextInput
          label="Name"
          required
          name="name"
          placeholder="Enter your name"
          className="mb-4"
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Email"
          required
          name="email"
          type="email"
          placeholder="Enter your email"
          className="mb-4"
          {...form.getInputProps('email')}
        />
        <div className="mb-4">
          <Text className="font-medium mb-2">Rating</Text>
          <Rating
            value={form.values.rating}
            onChange={(value) => form.setFieldValue('rating', value)}
            color="yellow"
            size="xl"
          />
        </div>
        <div className="mb-4">
          <Text className="font-medium mb-2">Message</Text>
          <Textarea
            name="message"
            className="w-full rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            required
            placeholder="Enter your feedback here"
            rows={4}
            {...form.getInputProps('message')}
          />
        </div>
        <Button loading={loading} type="submit" fullWidth>
          Submit Feedback
        </Button>
      </form>
    </Card>
  );
};

export default FeedbackForm;
