// create a form that gets user's name, age, sex and height. age should be between 18 and 60. and a minimum of 145cm height. The fields are displayed in grid with 2 cols.
import { useState } from 'react';
import { useForm, yupResolver } from '@mantine/form';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../app/firebaseConfig';
import { TextInput, Button } from '@mantine/core';
import * as Yup from 'yup';
import { showNotification } from '@mantine/notifications';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  age: Yup.number()
    .integer('Age must be an integer')
    .positive('Age must be a positive number')
    .min(18, 'Age must be at least 18 years old')
    .max(60, 'Age cannot be more than 60 years old')
    .typeError('Enter a valid height')

    .required('Age is required'),
  sex: Yup.string()
    .matches(/^(male|female)$/i, 'Sex must be either male or female')
    .required('Sex is required'),
  height: Yup.number()
    .positive('Height must be a positive number')
    .min(145, 'Height must be at least 145cm')
    .typeError('Enter a valid height')
    .required('Height is required'),
});


export default function Data1() {
  const form = useForm({
    initialValues: { name: '', age: '', sex: '', height: '' },
    validate: yupResolver(validationSchema),
  });
const [loading, setLoading] = useState(false)
  async function handleSubmit() {
    try {
      setLoading(true)
      await addDoc(collection(db, 'users'), {
        name: form.values.name,
        age: form.values.age,
        sex: form.values.sex,
        height: form.values.height,
        createdAt: serverTimestamp(),
      });
            showNotification({
                id: `id-${Math.random()}`,
                autoClose: 5000,
                title: 'Success',
                message: 'Details saved successfully',
                color: 'green',
            });
      form.reset(); // Clear form after submission
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false);
      showNotification({
        id: `survey - error - ${Math.random()}`,
        autoClose: 5000,
        title: 'Error',
        message: 'Error try again',
        color: 'red',
    });
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
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
          <Button loading={loading} type="submit" >
            submit
          </Button>
        </div>
      </form>
    </div>
  );
}
