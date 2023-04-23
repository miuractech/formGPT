import { useForm } from '@mantine/form';
import { TextInput, Switch, Group, ActionIcon, Box, Text, Button, Code } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';

export default function Data4() {
    const form = useForm({
        initialValues: {
            employees: [{ name: '', active: false, key: randomId() }],
        },
    });

    const fields = form.values.employees.map((item, index) => (
        <Group key={item.key} mt="xs">
            <TextInput
                placeholder="John Doe"
                withAsterisk
                sx={{ flex: 1 }}
                {...form.getInputProps(`employees.${index}.name`)}
            />
            <Switch
                label="Active"
                {...form.getInputProps(`employees.${index}.active`, { type: 'checkbox' })}
            />
            <ActionIcon color="red" onClick={() => form.removeListItem('employees', index)}>
                <IconTrash size="1rem" />
            </ActionIcon>
        </Group>
    ));

    return (
        <div className='min-h-screen grid items-center'>
            <Box maw={500} mx="auto" >
                {fields.length > 0 ? (
                    <Group mb="xs">
                        <Text weight={500} size="sm" sx={{ flex: 1 }}>
                            Name
                        </Text>
                        <Text weight={500} size="sm" pr={90}>
                            Status
                        </Text>
                    </Group>
                ) : (
                    <Text color="dimmed" align="center">
                        No one here...
                    </Text>
                )}
                {fields}
                <Group position="center" mt="md">
                    <Button
                        onClick={() =>
                            form.insertListItem('employees', { name: '', active: false, key: randomId() })
                        }
                    >
                        Add employee
                    </Button>
                </Group>
            </Box>
        </div>
    );
}