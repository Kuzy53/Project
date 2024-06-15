import { SimpleGrid, Card, Image, Text, Container, AspectRatio } from '@mantine/core';
import classes from './ArticlesCardsGrid.module.css';
import '@mantine/core/styles/SimpleGrid.css';
import '@mantine/core/styles/Card.css';
import '@mantine/core/styles/Image.css';
import '@mantine/core/styles/Text.css';
import '@mantine/core/styles/Container.css';
import '@mantine/core/styles/AspectRatio.css';
import { useNavigate } from 'react-router-dom';
import Curs from '../../../assets/curs.jpg'


export function ArticlesCardsGrid({ applications }) {
  const navigate = useNavigate()
  const cards = applications.map((application) => (
    <Card key={application.id} p="md" radius="md" component="a" href="#" className={classes.card} onClick={() => {
      navigate(`courses/${application.id}`)
    }}>
      <AspectRatio ratio={1920 / 1080}>
        <Image src={Curs} />
      </AspectRatio>
      <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
        {application.name}
      </Text>
      <Text className={classes.title} mt={5}>
        {application.description}
      </Text>
      {/* <Text className={classes.title} mt={5} style={{
        color: '#f00'
      }}>
        {application.state}
      </Text> */}
    </Card>
  ));

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
    </Container>
  );
}