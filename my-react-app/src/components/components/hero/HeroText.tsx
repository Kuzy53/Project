import { Title, Text, Button, Container } from '@mantine/core';
import { Dots } from './Dots';
import classes from './HeroText.module.css';
import '@mantine/core/styles/Container.css';
import '@mantine/core/styles/Title.css';
import '@mantine/core/styles/Text.css';
import '@mantine/core/styles/Button.css';
import { useNavigate } from 'react-router-dom';

export function HeroText() {

  const navigate = useNavigate()

  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Automated AI{' '}
          <Text component="span" className={classes.highlight} inherit>
            code reviews
          </Text>{' '}
          for any stack
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            Build more reliable software with AI companion. AI is also trained to detect lazy
            developers who do nothing and just complain on Twitter.
          </Text>
        </Container>

        <div className={classes.controls}>
        <Button
      variant="gradient"
      gradient={{ from: 'blue', to: 'pink', deg: 104 }}
      onClick={() => {navigate('/form')}}
    >
      Сreate a request
    </Button>
        </div>
      </div>
    </Container>
  );
}