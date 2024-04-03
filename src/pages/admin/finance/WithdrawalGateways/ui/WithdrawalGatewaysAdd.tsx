import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dataEditApi } from '../api/api';

const WithdrawalGatewaysAdd = () => {
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
    <ContentLayout title={t('withdrawal gateways add')}>
      <FormGenerator
        navigateTo="admin/finances/withdrawal-gateways/edit/"
        api={dataEditApi(0)}
        formItems={data}
      />
    </ContentLayout>
  );
};

export default WithdrawalGatewaysAdd;
