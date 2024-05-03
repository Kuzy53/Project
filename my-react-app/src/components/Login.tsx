import React, { useState } from 'react';
import { useLoginMutation } from '../api/userApi';
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
  MantineProvider
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
import '@mantine/core/styles/global.css';
import { useNavigate } from 'react-router-dom';


export function Login() {

  const navigate = useNavigate() 
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [log, { isLoading, isError, error }] = useLoginMutation();


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const result = await log({ login, password }).unwrap();
    localStorage.setItem('token', result.token);
    navigate('/');
  } catch (err) {
    console.error('Ошибка авторизации:', err);
  }
};

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button" onClick={() => {navigate('/register')}}>
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required  onChange={(e) => setLogin(e.target.value)}/>
        <PasswordInput label="Password" placeholder="Your password" required mt="md" onChange={(e) => setPassword(e.target.value)} />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl disabled={isLoading}" onClick={handleSubmit}>
          Sign in
        </Button>
        {isError && <p>Произошла ошибка: {error.message}</p>}
      </Paper>
    </Container>
  );
}
