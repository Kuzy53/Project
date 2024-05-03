import React, { useState } from 'react';
import { useRegisterMutation } from '../api/userApi';
import { FooterLinks } from './components/FooterLinks';
import { HeroContentLeft } from './components/hero/HeroContentLeft';
import { EmailBanner } from './components/banners/EmailBanner';
// import {
//   TextInput,
//   PasswordInput,
//   Checkbox,
//   Anchor,
//   Paper,
//   Title,
//   Text,
//   Container,
//   Group,
//   Button,
//   MantineProvider
// } from '@mantine/core';
// import '@mantine/core/styles/PasswordInput.css';
// import '@mantine/core/styles/Checkbox.css';
// import '@mantine/core/styles/Anchor.css';
// import '@mantine/core/styles/Paper.css';
// import '@mantine/core/styles/Title.css';
// import '@mantine/core/styles/Text.css';
// import '@mantine/core/styles/Container.css';
// import '@mantine/core/styles/Group.css';
// import '@mantine/core/styles/Button.css';
// import '@mantine/core/styles/Input.css';
// // import classes from './AuthenticationTitle.module.css';
// import '@mantine/core/styles/global.css';
// // import { useNavigate } from 'react-router-dom';


export function Home() {



  return (
    <>
    <HeroContentLeft/>
    <EmailBanner/>
    <FooterLinks />
    </>
  );
}

