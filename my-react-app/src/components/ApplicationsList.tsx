import React from 'react';
import { useGetApplicationsQuery } from '../api/userApi';
import { HeroText } from './components/hero/HeroText';
import { ArticlesCardsGrid } from './components/cards/ArticlesCardsGrid';
export const ApplicationsList = () => {
  const { data: applications, isLoading } = useGetApplicationsQuery();
  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
    <HeroText/>

    <ArticlesCardsGrid applications={applications}/>
  </>
  );
};
