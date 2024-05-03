import React, { useState } from 'react';
import { useCreateApplicationMutation } from '../api/userApi';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Textarea
} from '@mantine/core';

import '@mantine/core/styles/PasswordInput.css';
import '@mantine/core/styles/Checkbox.css';
import '@mantine/core/styles/Anchor.css';
import '@mantine/core/styles/Paper.css';
import '@mantine/core/styles/Title.css';
import '@mantine/core/styles/Text.css';
import '@mantine/core/styles/Container.css';
import '@mantine/core/styles/Group.css';
import '@mantine/core/styles/Button.css';
import '@mantine/core/styles/Input.css';
import classes from './AuthenticationTitle.module.css';

export const ApplicationForm = () => {
  const [description, setDescription] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [createApplication, { isLoading }] = useCreateApplicationMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createApplication({ description, carNumber, userId: localStorage.getItem('userId') }).unwrap();
      // Очистите форму или перенаправьте пользователя на страницу заявлений
    } catch (err) {
      console.error('Ошибка создания заявления:', err);
    }
  };

  return (
    <Container size={420} my={40}>
    <Title ta="center" className={classes.title}>
      Welcome back!
    </Title>


    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <TextInput label="carNumber" placeholder="carNumber" required  onChange={(e) => setCarNumber(e.target.value)}/>
      <Textarea resize="vertical" label="Disabled" placeholder="Your Description" onChange={(e) => setDescription(e.target.value)} />
      <Button fullWidth mt="15" disabled={isLoading} onClick={handleSubmit}>
        Create
      </Button>
    </Paper>
  </Container>
  );
};
