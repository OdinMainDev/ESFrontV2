import { CasinoForm } from '@/features/CasinoForm';
import ContentLayout from '@/shared/layout/ContentLayout';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const CasinoEdit = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  return (
    <ContentLayout title={t('casinos-edit')}>
      <CasinoForm id={Number(id)} />
    </ContentLayout>
  );
};

export default CasinoEdit;
