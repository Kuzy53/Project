import React from 'react';
import { useGetAllApplicationsQuery, useUpdateApplicationMutation } from '../api/userApi';
import { Avatar, Table, Group, Text, ActionIcon, Menu, rem, Container, Button } from '@mantine/core';
import {
  IconPencil,
  IconMessages,
  IconNote,
  IconReportAnalytics,
  IconTrash,
  IconDots,
} from '@tabler/icons-react';
import '@mantine/core/styles/Avatar.css';
import '@mantine/core/styles/Table.css';
import '@mantine/core/styles/Group.css';
import '@mantine/core/styles/Text.css';
import '@mantine/core/styles/ActionIcon.css';
import '@mantine/core/styles/Menu.css';
import '@mantine/core/styles/Container.css';
import { useMutation, useQueryClient } from 'react-query';


export const AdminPanel = () => {
  const queryClient = useQueryClient();
  const { data: applications, isLoading } = useGetAllApplicationsQuery();
  const [updateApplication] = useUpdateApplicationMutation();

  const mutation = useMutation(updateApplication, {
    onSuccess: (data, variables) => {
      // Обновляем данные в кэше
      queryClient.invalidateQueries('applications');
    },
  });

  const handleStatusChange = async (id: string, status: 'confirmed' | 'rejected') => {
    try {
      await mutation.mutateAsync({ id, status });
      location.reload()
    } catch (err) {
      console.error('Ошибка обновления заявления:', err);
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  // const data = [
  //   {
  //     avatar:
  //       'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
  //     name: 'Robert Wolfkisser',
  //     job: 'Engineer',
  //     email: 'rob_wolf@gmail.com',
  //     rate: 22,
  //   },
  //   {
  //     avatar:
  //       'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
  //     name: 'Jill Jailbreaker',
  //     job: 'Engineer',
  //     email: 'jj@breaker.com',
  //     rate: 45,
  //   },
  //   {
  //     avatar:
  //       'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
  //     name: 'Henry Silkeater',
  //     job: 'Designer',
  //     email: 'henry@silkeater.io',
  //     rate: 76,
  //   },
  //   {
  //     avatar:
  //       'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
  //     name: 'Bill Horsefighter',
  //     job: 'Designer',
  //     email: 'bhorsefighter@gmail.com',
  //     rate: 15,
  //   },
  //   {
  //     avatar:
  //       'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
  //     name: 'Jeremy Footviewer',
  //     job: 'Manager',
  //     email: 'jeremy@foot.dev',
  //     rate: 98,
  //   },
  // ];

  const rows = applications.map((application) => (
    <Table.Tr key={application.id}>
      <Table.Td>
        <Group gap="sm">
          {/* <Avatar size={40} src={application.user.avatar} radius={40} /> */}
          <div>
            <Text fz="sm" fw={500}>
              {application.User.fullName}
            </Text>
            <Text c="dimmed" fz="xs">
              {application.description}
            </Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{application.status}</Text>
        <Text fz="xs" c="dimmed">
          Status
        </Text>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{application.carNumber}</Text>
        <Text fz="xs" c="dimmed">
          Номер автомобиля
        </Text>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <Button onClick={() => handleStatusChange(application.id, 'confirmed')}>
            Принять
          </Button>
          <Button ml={10} onClick={() => handleStatusChange(application.id, 'rejected')}>
            Отклонить
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
<>
<Container>
    <Table.ScrollContainer minWidth={800}>
    <Table verticalSpacing="md">
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  </Table.ScrollContainer>
  </Container>
  </>
    // <ul>
    //   {applications?.map((application) => (
    //     <li key={application.id}>
    //       <h2>{application.carNumber}</h2>
    //       <p>{application.description}</p>
    //       <button onClick={() => handleStatusChange(application.id, 'confirmed')}>Подтвердить</button>
    //       <button onClick={() => handleStatusChange(application.id, 'rejected')}>Отклонить</button>
    //     </li>
    //   ))}
    // </ul>
  );
};
