import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dataEditApi } from '../api/api';

const CategoriesAdd = () => {
  const { t } = useTranslation();
  const [data] = useState<IFormItem[]>([
    {
      name: 'name',
      placeholder: 'name',
      label: t('name'),
      required: true,
    },
    {
      name: 'id',
      placeholder: 'id',
      label: 'id',
      type: 'number',
      required: true,
    },
  ]);

  return (
    <ContentLayout title={t('affiliate-add-offer')}>
      <FormGenerator
        id={0}
        navigateTo="admin/casino/url/edit/"
        api={dataEditApi()}
        formItems={data}
      />
    </ContentLayout>
  );
};

export default CategoriesAdd;
