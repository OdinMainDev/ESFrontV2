import { GameForm } from '@/features/GameForm';
import ContentLayout from '@/shared/layout/ContentLayout';
import React from 'react';
import { useParams } from 'react-router-dom';

const GamesEdit = () => {
  const { id } = useParams();
  return (
    <ContentLayout title="Изменить игру">
      <GameForm id={Number(id)} />
    </ContentLayout>
  );
};

export default GamesEdit;
