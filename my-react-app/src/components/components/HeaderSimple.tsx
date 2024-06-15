import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
} from '@mantine/core';
// import '@mantine/core/styles/Group.css';
// import '@mantine/core/styles/UnstyledButton.css';
// import '@mantine/core/styles/Button.css';

// import '@mantine/core/styles/Text.css';
// import '@mantine/core/styles/SimpleGrid.css';
// import '@mantine/core/styles/Center.css';
import '@mantine/core/styles/Burger.css';
import '@mantine/core/styles/ScrollArea.css';
import '@mantine/core/styles/Drawer.css';


import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderSimple.module.css';
import { useNavigate } from 'react-router-dom';

export function HeaderSimple() {
  const navigate = useNavigate()
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const token = localStorage.getItem('token')

  return (
    <Box pb={0}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="#" className={classes.link} onClick={()=> {navigate('/')}}>
              Home
            </a>
            <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5} onClick={()=> {navigate('/applications')}}>
                    Applications
                    </Box>
    
                  </Center>
                </a>
              </HoverCard.Target>

            </HoverCard>
            {/* <a href="#" className={classes.link} onClick={()=> {navigate('/admin')}}>
              Admin
            </a> */}
          </Group>

          <Group visibleFrom="sm">
          { token ? (
              <>
                              <Button variant="default" onClick={()=> {navigate('/profile')}}>Profile</Button>
                <Button onClick={()=> {navigate('/')}}>Log out</Button>

            </>
              )  : (
                <>
               <Button variant="default" onClick={()=> {navigate('/login')}}>Log in</Button>
            <Button onClick={()=> {navigate('/register')}}>Sign up</Button>
                </>
              )
               }
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <a href="/" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
            <Box component="span" mr={5} onClick={()=> {navigate('/applications')}}>
                    Applications
                    </Box>
            
            </Center>
          </UnstyledButton>
          <a href="#" className={classes.link} onClick={()=> {navigate('/admin')}}>
              Admin
            </a>
          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            { token ? (
              <>
                              <Button variant="default" onClick={()=> {navigate('/profile')}}>Profile</Button>
                <Button onClick={()=> {navigate('/')}}>Log out</Button>

            </>
              )  : (
                <>
               <Button variant="default" onClick={()=> {navigate('/login')}}>Log in</Button>
            <Button onClick={()=> {navigate('/register')}}>Sign up</Button>
                </>
              )
               }
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}





// import {  useState } from 'react';
// import { useDisclosure } from '@mantine/hooks';
// import { Container, Group, Burger } from '@mantine/core';

// import classes from './HeaderSimple.module.css';
// import '@mantine/core/styles/Container.css';
// import '@mantine/core/styles/Group.css';
// import '@mantine/core/styles/Burger.css';
// import { Link } from 'react-router-dom';


// const links = [
//   { link: '/', label: 'Home' },
//   { link: '/login', label: 'Login' },
//   { link: '/register', label: 'Register' },
//   { link: '/applications', label: 'Applications' },
//   { link: '/admin', label: 'Admin' },
// ];

// export function HeaderSimple() {
//   const [opened, { toggle }] = useDisclosure(false);
//   const [active, setActive] = useState(links[0].link);

//   const items = links.map((link) => (
//     <Link
//       to={link.link}
//       key={link.label}
//       className={classes.link}
//       data-active={active === link.link || undefined}
//       onClick={(event) => {
//         // event.preventDefault();
//         setActive(link.link);
//       }}
//     >
//       {link.label}
//     </Link>
//   ));

//   return (
//     <header className={classes.header}>
//       <Container size="md" className={classes.inner}>
//         {/* <MantineLogo size={28} /> */}
//         <Group gap={5} visibleFrom="xs">
//           {items}
//         </Group>

//         <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
//       </Container>
//     </header>
//   );
// }