import React, { useState } from 'react';
import { useGetProfileQuery } from '../api/userApi';
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
import './Profile.css'

export function Profile() {

  const { data, isLoading } = useGetProfileQuery();



  return (
    <>
<div className="main">
  <h2>Profile</h2>
  <div className="card">
    <div className="card-body">
      <i className="fa fa-pen fa-xs edit" />
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>:</td>
            <td>{data?.name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>:</td>
            <td>{data?.email}</td>
          </tr>
          <tr>
            <td>Login</td>
            <td>:</td>
            <td>{data?.username}</td>
          </tr>
          <tr>
            <td>Hobbies</td>
            <td>:</td>
            <td></td>
          </tr>
          <tr>
            <td>Job</td>
            <td>:</td>
            <td></td>
          </tr>
          <tr>
            <td>Skill</td>
            <td>:</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

    </>
  );
}
