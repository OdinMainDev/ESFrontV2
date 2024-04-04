import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { statusesEditApi } from '../api/statusesApi';

const StatusesAdd = () => {
  const { t } = useTranslation();
  const [options] = useState<string[]>(['danger', 'success', 'warning', 'info', 'primary']);
  const [data] = useState<IFormItem[]>([
    {
      name: 'name',
      placeholder: 'name',
      label: 'name',
      required: true,
    },
    {
      name: 'color',
      placeholder: 'color',
      type: 'select',
      label: 'color',
      required: true,
      options: options.map((item) => ({
        value: item,
        label: item,
      })),
    },
  ]);
  return (
    <ContentLayout title={t('statuese add')}>
      <FormGenerator
        navigateTo="admin/statuses/edit/"
        api={statusesEditApi()}
        id={0}
        formItems={data}
      />
    </ContentLayout>
  );
};

export default StatusesAdd;
