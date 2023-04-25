import { FC, useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Group, TextInput, Box, Text, Code, Button, Center } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { IconGripVertical } from '@tabler/icons-react';
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, writeBatch } from 'firebase/firestore';
import { db } from '../../app/firebaseConfig';

type Employee = {
    id: string;
    name: string;
    email: string;
    order: number;
};


const Data6: FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        const q = query(collection(db, "employees"), orderBy("order"))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const employees = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Employee[];
            setEmployees(employees);
        })

        return () => unsubscribe();
    }, []);

    const onDragEnd = ({ destination, source }: DropResult) => {
        if (!destination) return;
        const newOrder = Array.from(employees);
        const [removed] = newOrder.splice(source.index, 1);
        newOrder.splice(destination.index, 0, removed);
        localStorage.setItem("newOrder", JSON.stringify(newOrder));
    };

    const fields = employees.map((employee, index) => (
        <Draggable key={employee.id} index={index} draggableId={employee.id}>
            {(provided) => (
                <Group ref={provided.innerRef} mt="xs" {...provided.draggableProps}>
                    <Center {...provided.dragHandleProps}>
                        <IconGripVertical size="1.2rem" />
                    </Center>
                    <TextInput
                        placeholder="John Doe"
                        {...form.getInputProps(`employees.${index}.name`)}
                        defaultValue={employee.name}
                    />
                    <TextInput
                        placeholder="example@mail.com"
                        {...form.getInputProps(`employees.${index}.email`)}
                        defaultValue={employee.email}
                    />
                </Group>
            )}
        </Draggable>
    ));

    const form = useForm({
        initialValues: {
            employees: employees.map((employee) => ({ name: employee.name, email: employee.email })),
        },
    });

    return (
        <Box maw={500} mx="auto">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="dnd-list" direction="vertical">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {fields}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <Group position="center" mt="md">
                <Button
                    onClick={() => {
                        addDoc(collection(db, 'employees'), { name: '', email: '', order: employees.length })
                        form.insertListItem('employees', { name: '', email: '' });
                    }}
                >
                    Add employee
                </Button>
            </Group>
            <Button onClick={() => {
                const data = localStorage.getItem("newOrder")
                if (data) {
                    const batch = writeBatch(db);
                    JSON.parse(data).forEach((employee: { id: string; }, index: any) => {
                        batch.update(doc(db, 'employees', employee.id), { order: index });
                    });
                    batch.commit();
                    localStorage.removeItem("newOrder")
                }
            }}>Save</Button>
        </Box>
    );
};

export default Data6;
