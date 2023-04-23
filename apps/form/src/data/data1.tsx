// create a form that gets user's name, age, sex and height. age should be between 18 and 60. and a minimum of 145cm height.
import { useState } from 'react';
import { useForm, yupResolver } from '@mantine/form';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../app/firebaseConfig';
import { TextInput, Button } from '@mantine/core';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  age: Yup.number()
    .integer('Age must be an integer')
    .positive('Age must be a positive number')
    .min(18, 'Age must be at least 18 years old')
    .max(60, 'Age cannot be more than 60 years old')
    .required('Age is required'),
  sex: Yup.string()
    .matches(/^(male|female)$/i, 'Sex must be either male or female')
    .required('Sex is required'),
  height: Yup.number()
    .positive('Height must be a positive number')
    .min(145, 'Height must be at least 145cm')
    .required('Height is required'),
});


export default function Data1() {
  const [submitting, setSubmitting] = useState(false);
  const form = useForm({
    initialValues: { name: '', age: '', sex: '', height: '' },
    validate: yupResolver(validationSchema),
  });

  async function handleSubmit() {
    if (submitting) return;

    setSubmitting(true);

    try {
      await addDoc(collection(db, 'users'), {
        name: form.values.name,
        age: form.values.age,
        sex: form.values.sex,
        height: form.values.height,
        createdAt: serverTimestamp(),
      });

      form.reset(); // Clear form after submission
    } catch (error) {
      console.error(error);
    }

    setSubmitting(false);
  }

  return (
    <div className="max-w-lg mx-auto">
      <img src="https://picsum.photos/200" alt="Form" className="w-full h-auto mb-4 rounded-t-lg shadow-md" />
      <form onSubmit={form.onSubmit(handleSubmit)} className="bg-white rounded-lg shadow-md p-6">
        <h2 className="mb-4 text-xl font-bold">Enter your details</h2>
        <div className="grid grid-cols-2 gap-6">
          <TextInput
            label="Name"
            type="text"
            placeholder="Enter your name"
            autoComplete="off"
            {...form.getInputProps('name')}
          />

          <TextInput
            label="Age"
            type="number"
            placeholder="Enter your age"
            autoComplete="off"
            {...form.getInputProps('age')}
          />

          <TextInput
            label="Sex"
            type="text"
            placeholder="Enter your sex (male or female)"
            autoComplete="off"
            {...form.getInputProps('sex')}
          />

          <TextInput
            label="Height"
            type="number"
            placeholder="Enter your height"
            autoComplete="off"
            {...form.getInputProps('height')}
          />
        </div>
        <div className="mt-8 flex justify-center">
          <Button type="submit" disabled={submitting} variant="gradient">
            {submitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  );
}
