import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dataEditApi } from '../api/api';

const PaymentGatewaysAdd = () => {
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
    <ContentLayout title={t('payment gateways add')}>
      <FormGenerator
        navigateTo="admin/finances/payment-gateways/edit/"
        api={dataEditApi()}
        id={0}
        formItems={data}
      />
    </ContentLayout>
  );
};

export default PaymentGatewaysAdd;
