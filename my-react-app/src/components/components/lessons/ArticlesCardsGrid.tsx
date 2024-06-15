import { SimpleGrid, Card, Image, Text, Container, AspectRatio } from '@mantine/core';
import classes from './ArticlesCardsGrid.module.css';
import '@mantine/core/styles/SimpleGrid.css';
import '@mantine/core/styles/Card.css';
import '@mantine/core/styles/Image.css';
import '@mantine/core/styles/Text.css';
import '@mantine/core/styles/Container.css';
import '@mantine/core/styles/AspectRatio.css';
import Lesson1 from '../../../assets/lesson1.jpg'
import Lesson2 from '../../../assets/lesson2.jpg'
import Lesson3 from '../../../assets/lesson3.jpg'
import Lesson4 from '../../../assets/lesson4.jpg'
import { useNavigate } from 'react-router-dom';

function getStatusDetails(state) {
  switch (state) {
    case 2:
      return { text: 'Урок пройден', color: 'rgb(16 120 0)', imageUrl: Lesson1 }; // Зеленый
    case 1:
      return { text: 'Урок не пройден, можно пройти', color: '#00f', imageUrl: Lesson2 }; // Синий
    case 3:
      return { text: 'Урок завален. Курс тоже', color: '#f00', imageUrl: Lesson3 }; // Красный
    default:
      return { text: 'Неизвестное состояние', color: '#000', imageUrl: Lesson4 }; // Черный
  }
}

export function ArticlesCardsGrid({ applications }) {
  const navigate = useNavigate();
  const cards = applications.lessons.map((application) => {
    const { text, color, imageUrl } = getStatusDetails(application.state);
    const isClickable = application.state === 1;

    return (
      <Card 
        key={application.id} 
        p="md" 
        radius="md" 
        component={isClickable ? 'a' : 'div'} 
        href={isClickable ? `#` : undefined} 
        className={classes.card} 
        onClick={isClickable ? () => navigate(`lessons/${application.id}`) : undefined}
        style={{ cursor: isClickable ? 'pointer' : 'default' }}
      >
        <AspectRatio ratio={1920 / 1080}>
          <Image src={imageUrl} />
        </AspectRatio>
        <Text className={classes.title} mt={5}>
          {application.name}
        </Text>
        <Text className={classes.title} mt={5} style={{ color }}>
          {text}
        </Text>
      </Card>
    );
  });

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
    </Container>
  );
}