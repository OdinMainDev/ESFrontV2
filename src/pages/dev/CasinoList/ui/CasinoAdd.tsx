import { CasinoForm } from '@/features/CasinoForm';
import ContentLayout from '@/shared/layout/ContentLayout';
import React from 'react';
import { useTranslation } from 'react-i18next';

const CasinoAdd = () => {
  const { t } = useTranslation();

  return (
    <ContentLayout title={t('casinos-add')}>
      <CasinoForm id={0} />
    </ContentLayout>
  );
};

export default CasinoAdd;
