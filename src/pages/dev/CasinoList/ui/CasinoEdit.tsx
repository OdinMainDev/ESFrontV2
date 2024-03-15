import { CasinoForm } from '@/features/CasinoForm';
import ContentLayout from '@/shared/layout/ContentLayout';
import React from 'react';
import { useParams } from 'react-router-dom';

const CasinoEdit = () => {
  const { id } = useParams();
  return (
    <ContentLayout title="Изменить казино">
      <CasinoForm id={Number(id)} />
    </ContentLayout>
  );
};

export default CasinoEdit;
