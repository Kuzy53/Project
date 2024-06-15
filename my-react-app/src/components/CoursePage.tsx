import React from 'react';

import { useGetLessonsByCourseQuery } from '../api/userApi';
import { HeroText } from './components/hero/HeroText';
import { ArticlesCardsGrid } from './components/lessons/ArticlesCardsGrid';
import { useParams } from 'react-router-dom';

export const CoursePage = () => {
    let { id } = useParams();
  const { data, isLoading } = useGetLessonsByCourseQuery(id);
  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
    <HeroText/>

    <ArticlesCardsGrid applications={data}/>
  </>
  );
};
