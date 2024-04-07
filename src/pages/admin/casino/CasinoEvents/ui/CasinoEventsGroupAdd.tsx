import React from 'react';

import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dataGroupEditApi } from '../api/api';

const CasinoEventsGroupAdd = () => {
  const { t } = useTranslation();
  const [data] = useState<IFormItem[]>([
    {
      name: 'name',
      placeholder: 'name',
      label: t('name'),
      required: true,
    },
    {
      name: 'enable',
      placeholder: 'enable',
      label: t('enable'),
      type: 'switch',
      required: true,
    },
  ]);

  return (
    <ContentLayout title={t('casino-events-add')}>
      <FormGenerator
        id={0}
        navigateTo="admin/casino/events/group/edit/"
        api={dataGroupEditApi()}
        formItems={data}
      />
    </ContentLayout>
  );
};

export default CasinoEventsGroupAdd;
