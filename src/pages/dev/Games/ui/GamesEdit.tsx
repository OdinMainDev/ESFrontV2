import ContentLayout from '@/shared/layout/ContentLayout';
import React from 'react';
import { useParams } from 'react-router-dom';

const GamesEdit = () => {
  const { id } = useParams();
  return (
    <ContentLayout title="Изменить игру">
      <div></div>
    </ContentLayout>
  );
};

export default GamesEdit;
