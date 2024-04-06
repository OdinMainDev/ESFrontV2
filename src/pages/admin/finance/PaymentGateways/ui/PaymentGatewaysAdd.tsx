import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dataEditApi } from '../api/api';
import { getCurrenciesList } from '@/shared/api/currenciesApi';
import { getPaymentProvidersApi } from '@/shared/api/paymentProviders';

const PaymentGatewaysAdd = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<IFormItem[]>([
    {
      name: 'name',
      placeholder: 'name',
      label: t('name'),
      required: true,
    },
    {
      name: 'enable',
      placeholder: 'enable',
      type: 'switch',
      label: t('enable'),
      required: true,
    },
    {
      name: 'api_name',
      placeholder: 'api_name',
      type: 'select',
      label: t('api-name'),
      required: true,
    },
    {
      name: 'compensate_commission',
      placeholder: 'compensate_commission',
      type: 'switch',
      label: t('compensate-commission'),
      required: true,
    },
    {
      name: 'currency',
      placeholder: 'currency',
      type: 'select',
      label: t('currency'),
      required: true,
    },
  ]);

  useEffect(() => {
    const getCurrency = async () => {
      const currenciesList = await getCurrenciesList();
      const paymentProvidersList = await getPaymentProvidersApi();
      setData((prev) =>
        prev.map((data) => {
          if (data.type === 'select' && data.name === 'currency') {
            return {
              ...data,
              options: currenciesList.map((item) => ({
                value: item.title,
                label: item.title,
              })),
            };
          }
          if (data.type === 'select' && data.name === 'api_name') {
            return {
              ...data,
              options: paymentProvidersList.map((item) => ({
                value: item,
                label: item,
              })),
            };
          }
          return data;
        }),
      );
    };

    void getCurrency();
  }, []);

  return (
    <ContentLayout title={t('payment-gateways-add')}>
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
