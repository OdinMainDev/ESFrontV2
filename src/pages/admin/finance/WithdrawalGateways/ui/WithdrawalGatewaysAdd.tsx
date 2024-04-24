import React, { useEffect } from 'react';

import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dataEditApi } from '../api/api';
import { getPaymentProvidersApi } from '@/shared/api/paymentProviders';
import { getCountriesApi } from '@/shared/api/countriesApi';
import { getCasinoCurrenciesList } from '@/shared/api/casinoCurrenciesApi';

const WithdrawalGatewaysAdd = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<IFormItem[]>([
    {
      name: 'name',
      placeholder: 'name',
      label: t('name'),
      required: true,
    },
    {
      name: 'image',
      placeholder: 'image',
      type: 'image',
      label: t('image'),
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
      name: 'currency',
      placeholder: 'currency',
      type: 'select',
      label: t('currency'),
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
      name: 'auto_withdraw',
      placeholder: 'auto_withdraw',
      type: 'switch',
      label: t('auto_withdraw'),
      required: true,
    },
    {
      name: 'fee_percent',
      placeholder: 'fee_percent',
      type: 'number',
      label: t('fee_percent'),
      required: true,
    },
    {
      name: 'fee_fixed',
      placeholder: 'fee_fixed',
      type: 'number',
      label: t('fee_fixed'),
      required: true,
    },
    {
      name: 'api_currency',
      placeholder: 'api_currency',
      type: 'select',
      label: t('api_currency'),
      required: true,
    },
    {
      name: 'api_key',
      placeholder: 'api_key',
      type: 'text',
      label: t('api_key'),
      required: true,
    },
    {
      name: 'api_password',
      placeholder: 'api_password',
      type: 'text',
      label: t('api_password'),
      required: true,
    },
    {
      name: 'limit_minimum',
      placeholder: 'limit_minimum',
      type: 'number',
      label: t('limit_minimum'),
      required: true,
    },
    {
      name: 'limit_maximum',
      placeholder: 'limit_maximum',
      type: 'number',
      label: t('limit_maximum'),
      required: true,
    },
    {
      name: 'minimum_transactions',
      placeholder: 'minimum_transactions',
      type: 'number',
      label: t('minimum_transactions'),
      required: true,
    },
    {
      name: 'maximum_transactions',
      placeholder: 'maximum_transactions',
      type: 'number',
      label: t('maximum_transactions'),
      required: true,
    },
    {
      name: 'minimum_transactions_payments',
      placeholder: 'minimum_transactions_payments',
      type: 'number',
      label: t('minimum_transactions_payments'),
      required: true,
    },
    {
      name: 'maximum_transactions_payments',
      placeholder: 'maximum_transactions_payments',
      type: 'number',
      label: t('maximum_transactions_payments'),
      required: true,
    },
    {
      name: 'verifications[]',
      placeholder: 'verifications',
      type: 'multiSelect',
      label: t('verifications'),
      required: true,
    },
    {
      name: 'blocked_countries[]',
      placeholder: 'blocked_countries',
      type: 'multiSelect',
      label: t('blocked_countries'),
      required: true,
    },
    {
      name: 'allowed_countries[]',
      placeholder: 'allowed_countries',
      type: 'multiSelect',
      label: t('allowed_countries'),
      required: true,
    },
    {
      name: 'texts',
      placeholder: 'texts',
      type: 'texts',
      label: t('texts'),
      required: false,
    },
  ]);

  useEffect(() => {
    const getCurrency = async () => {
      const currenciesList = await getCasinoCurrenciesList();
      const paymentProvidersList = await getPaymentProvidersApi();
      const countriesList = await getCountriesApi();
      const verificationsList = ['email', 'phone', 'documents'];
      const committerCurrencies = [
        'BTC',
        'LTC',
        'BCH',
        'ETH',
        'DOGE',
        'TCN',
        'DASH',
        'USDTERC20',
        'BNB',
        'TRX',
        'USDTTRC20',
        'XMR',
      ];
      setData((prev) =>
        prev.map((data) => {
          if (data.name.includes('countries')) {
            return {
              ...data,
              options: countriesList.map((item) => ({
                value: item,
                label: item,
              })),
            };
          }
          if (data.name === 'verifications[]') {
            return {
              ...data,
              options: verificationsList.map((item) => ({
                value: item,
                label: item,
              })),
            };
          }
          if (data.name === 'currency') {
            return {
              ...data,
              options: currenciesList.map((item) => ({
                value: item.code_alpha,
                label: item.code_alpha,
              })),
            };
          }
          if (data.name === 'api_name') {
            return {
              ...data,
              options: paymentProvidersList.map((item) => ({
                value: item,
                label: item,
              })),
            };
          }
          if (data.name === 'api_currency') {
            return {
              ...data,
              options: committerCurrencies.map((item) => ({
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
    <ContentLayout title={t('withdrawal-gateways-add')}>
      <FormGenerator
        navigateTo="admin/finances/withdrawal-gateways/edit/"
        api={dataEditApi()}
        id={0}
        formItems={data}
        withTabs
        tabs={[
          { name: t('info'), eventKey: 'info', start: 0, end: 3 },
          { name: t('provider'), eventKey: 'provider', start: 3, end: 12 },
          { name: t('conditions'), eventKey: 'conditions', start: 12, end: 21 },
          { name: t('texts'), eventKey: 'texts', start: data.length - 1, end: data.length },
        ]}
      />
    </ContentLayout>
  );
};

export default WithdrawalGatewaysAdd;
