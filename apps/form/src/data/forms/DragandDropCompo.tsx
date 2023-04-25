import { FC, useState, useEffect } from 'react';
import { Group, TextInput, Box, Text, Code, Button, Center } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { IconGripVertical } from '@tabler/icons-react';
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, writeBatch } from 'firebase/firestore';
import { db } from '../../app/firebaseConfig';
import { showNotification } from '@mantine/notifications';

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
        setEmployees(newOrder)
        localStorage.setItem("newOrder", JSON.stringify(newOrder));
    };

    const fields = employees.map((employee, index) => (
        <Draggable key={employee.id} index={index} draggableId={employee.id}>
            {(provided) => (
                <Group ref={provided.innerRef} mt="xs" {...provided.draggableProps}>
                    <Center {...provided.dragHandleProps}>
                        <IconGripVertical size="1.2rem" />
                    </Center>
                    <div className='flex gap-5'>
                        <Text>{employee.name}</Text>
                        <Text>{employee.email}</Text>
                    </div>
                </Group>
            )}
        </Draggable>
    ));

    const form = useForm({
        initialValues: {
            name: "",
            email: ""
        },
    });

    return (
        <Box maw={500} mx="auto" p={4} bg="gray-50">
            <form className='flex gap-5' onSubmit={form.onSubmit((values) => {
                addDoc(collection(db, 'employees'), { ...values, order: employees.length })
                form.reset()
            })}>
                <TextInput
                    placeholder="Name"
                    {...form.getInputProps(`name`)}
                    variant="filled"
                    size="sm"
                    required
                />
                <TextInput
                    placeholder="Email"
                    {...form.getInputProps(`email`)}
                    variant="filled"
                    size="sm"
                    required
                />
                <Button type='submit' size="sm" variant="outline">Add</Button>
            </form>
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

            <Button
                onClick={() => {
                    const data = localStorage.getItem("newOrder")
                    if (data) {
                        const batch = writeBatch(db);
                        JSON.parse(data).forEach((employee: { id: string; }, index: any) => {
                            batch.update(doc(db, 'employees', employee.id), { order: index });
                        });
                        batch.commit();
                        localStorage.removeItem("newOrder")
                        showNotification({
                            id: `contact-success-${Math.random()}`,
                            title: 'Success',
                            message: 'Changes saved successfully',
                            color: 'green',
                            autoClose: 5000,
                        });
                    } else {
                        showNotification({
                            id: `contact-error-${Math.random()}`,
                            message: 'No changes were make',
                            color: 'red',
                            autoClose: 5000,
                        });
                    }
                }}>Save</Button>
        </Box>
    );
};

export default Data6;






// import { FC, useState, useEffect } from 'react';
// import { Group, TextInput, Box, Text, Code, Button, Center } from '@mantine/core';
// import { useForm } from '@mantine/form';
// import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
// import { IconGripVertical } from '@tabler/icons-react';
// import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, writeBatch } from 'firebase/firestore';
// import { db } from '../../app/firebaseConfig';

// type Employee = {
//     id: string;
//     name: string;
//     email: string;
//     order: number;
// };


// const Data6: FC = () => {
//     const [employees, setEmployees] = useState<Employee[]>([]);

//     useEffect(() => {
//         const q = query(collection(db, "employees"), orderBy("order"))
//         const unsubscribe = onSnapshot(q, (snapshot) => {
//             const employees = snapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data(),
//             })) as Employee[];
//             setEmployees(employees);
//         })

//         return () => unsubscribe();
//     }, []);

//     const onDragEnd = ({ destination, source }: DropResult) => {
//         if (!destination) return;
//         const newOrder = Array.from(employees);
//         const [removed] = newOrder.splice(source.index, 1);
//         newOrder.splice(destination.index, 0, removed);
//         setEmployees(newOrder)
//         localStorage.setItem("newOrder", JSON.stringify(newOrder));
//     };

//     const fields = employees.map((employee, index) => (
//         <Draggable key={employee.id} index={index} draggableId={employee.id}>
//             {(provided) => (
//                 <Group ref={provided.innerRef} mt="xs" {...provided.draggableProps}>
//                     <Center {...provided.dragHandleProps}>
//                         <IconGripVertical size="1.2rem" />
//                     </Center>
//                     <div className='flex gap-5'>
//                         <Text>{employee.name}</Text>
//                         <Text>{employee.email}</Text>
//                     </div>
//                 </Group>
//             )}
//         </Draggable>
//     ));

//     const form = useForm({
//         initialValues: {
//             name: "",
//             email: ""
//         },
//     });

//     return (
//         <Box maw={500} mx="auto">
//             <form className='flex gap-5' onSubmit={form.onSubmit((values) => {
//                 addDoc(collection(db, 'employees'), { ...values, order: employees.length })
//                 form.reset()
//             })}>
//                 <TextInput
//                     placeholder="John Doe"
//                     {...form.getInputProps(`name`)}
//                 />
//                 <TextInput
//                     placeholder="example@mail.com"
//                     {...form.getInputProps(`email`)}
//                 />
//                 <Button type='submit'>Add</Button>
//             </form>
//             <DragDropContext onDragEnd={onDragEnd}>
//                 <Droppable droppableId="dnd-list" direction="vertical">
//                     {(provided) => (
//                         <div {...provided.droppableProps} ref={provided.innerRef}>
//                             {fields}
//                             {provided.placeholder}
//                         </div>
//                     )}
//                 </Droppable>
//             </DragDropContext>

//             {/* <Group position="center" mt="md">
//                 <Button
//                     onClick={() => {
//                         addDoc(collection(db, 'employees'), { name: '', email: '', order: employees.length })
//                         form.insertListItem('employees', { name: '', email: '' });
//                     }}
//                 >
//                     Add employee
//                 </Button>
//             </Group> */}
//             <Button onClick={() => {
//                 const data = localStorage.getItem("newOrder")
//                 if (data) {
//                     const batch = writeBatch(db);
//                     JSON.parse(data).forEach((employee: { id: string; }, index: any) => {
//                         batch.update(doc(db, 'employees', employee.id), { order: index });
//                     });
//                     batch.commit();
//                     localStorage.removeItem("newOrder")
//                 }
//             }}>Save</Button>
//         </Box>
//     );
// };

// export default Data6;
