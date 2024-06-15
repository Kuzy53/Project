import React, { useState } from 'react';
import { useRegisterMutation } from '../api/userApi';
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
  MantineProvider,
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


export function Register() {

  const [name, setName] = useState('');
  // const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(4);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [register, { isLoading, isError, error }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await register({name, username, email, password, role }).unwrap();
      localStorage.setItem('userId', result.id); 
      navigate('/login')
    } catch (err) {
      console.error('Ошибка регистрации:', err);
    }
  };


  return (
    <MantineProvider>
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
        <TextInput mt={10} label="fullName" placeholder="Кузнецов Никита Георгиевич" required  onChange={(e) => setName(e.target.value)}/>
        <TextInput mt={10} label="Login" placeholder="Login" required  onChange={(e) => setUsername(e.target.value)}/>
        {/* <TextInput mt={10} label="Phone" placeholder="8 800 535 35 35" required  onChange={(e) => setPhone(e.target.value)}/> */}
        <TextInput mt={10} label="Email" placeholder="nikita@mail.ru" required  onChange={(e) => setEmail(e.target.value)}/>
        <PasswordInput mt={10} label="Password" placeholder="Your password" required onChange={(e) => setPassword(e.target.value)} />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
        </Group>
        <Button fullWidth mt="xl" disabled={isLoading} onClick={handleSubmit}>
          Sign in
        </Button>
        {isError && <p>Произошла ошибка: {error.message}</p>}
      </Paper>
    </Container>
    </MantineProvider>
  );
}

