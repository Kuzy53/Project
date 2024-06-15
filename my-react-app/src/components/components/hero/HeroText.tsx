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
          <Text component="span" className={classes.highlight} inherit>
          Helmsman
          </Text>{' '}
          for Обучение
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            Тяжело в ученье, легко в бою
            Семь раз  отмерь - один рааз отрежь
          </Text>
        </Container>

        <div className={classes.controls}>
        <Button
      variant="gradient"
      gradient={{ from: 'blue', to: 'pink', deg: 104 }}
    >
      Погнали
    </Button>
        </div>
      </div>
    </Container>
  );
}