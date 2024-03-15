import { CasinoForm } from '@/features/CasinoForm';
import ContentLayout from '@/shared/layout/ContentLayout';
import React from 'react';

const CasinoAdd = () => {
  return (
    <ContentLayout title="Добавить казино">
      <CasinoForm id={0} />
    </ContentLayout>
  );
};

export default CasinoAdd;
