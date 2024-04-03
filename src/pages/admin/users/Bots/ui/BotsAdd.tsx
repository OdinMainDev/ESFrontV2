import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { botsEditApi } from '../api/api';

const BotsAdd = () => {
  const { t } = useTranslation();
  const [data] = useState<IFormItem[]>([
    {
      name: 'name',
      placeholder: 'name',
      label: 'name',
      required: true,
    },
  ]);
  return (
    <ContentLayout title={t('bot add')}>
      <FormGenerator navigateTo="admin/bots/edit/" api={botsEditApi(0)} formItems={data} />
    </ContentLayout>
  );
};

export default BotsAdd;
