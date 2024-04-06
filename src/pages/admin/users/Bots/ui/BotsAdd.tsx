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
      label: t('name'),
      required: true,
    },
    {
      name: 'enable',
      placeholder: 'enable',
      label: t('enable'),
      type: 'switch',
      required: true,
      checked: false,
    },
    // {
    //   name: 'api_name',
    //   placeholder: 'api_name',
    //   label: t('api_name'),
    //   required: true,
    // },
    // {
    //   name: 'external_id',
    //   placeholder: 'external_id',
    //   label: t('external_id'),
    //   required: true,
    // },
    // {
    //   name: 'external_key',
    //   placeholder: 'external_key',
    //   label: t('external_key'),
    //   required: true,
    // },
  ]);
  return (
    <ContentLayout title={t('bots-add')}>
      <FormGenerator id={0} navigateTo="admin/bots/edit/" api={botsEditApi()} formItems={data} />
    </ContentLayout>
  );
};

export default BotsAdd;
