import React, { Suspense } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Login } from './components/Login';
import { ApplicationsList } from './components/ApplicationsList';
import { ApplicationForm } from './components/ApplicationForm';
import { Register } from './components/Register';
import { AdminPanel } from './components/AdminPanel';
import { Home } from './components/Home.tsx';
import { MantineProvider } from '@mantine/core';
import { HeaderSimple } from './components/components/HeaderSimple';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <QueryClientProvider client={queryClient}>
    <MantineProvider>
    <BrowserRouter>
    <Suspense fallback={'...Loading'}>
    
    <HeaderSimple/>
    <Routes>
      <Route path="/login" element={<Login/>} />
      {/* <Route path="/applications" render={() => (
        isAuthenticated ? <ApplicationsList /> : redirect("/login")
      )} /> */}
      {/* <Route path="/main" component={<ApplicationsList/>} /> */}
      <Route path="/applications" element={<ApplicationsList/>} />
      <Route path="/form" element={<ApplicationForm/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/admin" element={<AdminPanel/>} />
      <Route path="/" element={<Home/>} />
    </Routes>
    </Suspense>
    </BrowserRouter>
    </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
