import { Group, TextInput, Box, Text, Code, Button, Center } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IconGripVertical } from '@tabler/icons-react';

export default function Data6() {
    const form = useForm({
        initialValues: {
            employees: [
                { name: 'John Doe', email: 'john@mantine.dev' },
                { name: 'Bill Love', email: 'bill@mantine.dev' },
                { name: 'Nancy Eagle', email: 'nanacy@mantine.dev' },
                { name: 'Lim Notch', email: 'lim@mantine.dev' },
                { name: 'Susan Seven', email: 'susan@mantine.dev' },
            ],
        },
    });

    const fields = form.values.employees.map((_, index) => (
        <Draggable key={index} index={index} draggableId={index.toString()}>
            {(provided) => (
                <Group ref={provided.innerRef} mt="xs" {...provided.draggableProps}>
                    <Center {...provided.dragHandleProps}>
                        <IconGripVertical size="1.2rem" />
                    </Center>
                    <TextInput placeholder="John Doe" {...form.getInputProps(`employees.${index}.name`)} />
                    <TextInput
                        placeholder="example@mail.com"
                        {...form.getInputProps(`employees.${index}.email`)}
                    />
                </Group>
            )}
        </Draggable>
    ));

    return (
        <Box maw={500} mx="auto">
            <DragDropContext
                onDragEnd={({ destination, source }) => {
                    if (!destination) return
                    form.reorderListItem('employees', { from: source.index, to: destination.index })
                }

                }
            >
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
                <Button onClick={() => form.insertListItem('employees', { name: '', email: '' })}>
                    Add employee
                </Button>
            </Group>
        </Box>
    );
}