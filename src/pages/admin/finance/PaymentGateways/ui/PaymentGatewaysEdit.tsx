import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDataByIdApi, dataEditApi } from '../api/api';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { IData } from '../models/interfaces';
import { getCurrenciesList } from '@/shared/api/currenciesApi';
import { getPaymentProvidersApi } from '@/shared/api/paymentProviders';
import { getCountriesApi } from '@/shared/api/countriesApi';

const PaymentGatewaysEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [resData, setResData] = useState<IData | null>(null);
  const [formData, setFormData] = useState<IFormItem[]>([
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
      name: 'image',
      placeholder: 'image',
      type: 'text',
      label: t('image'),
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
    {
      name: 'without_bonus_wager',
      placeholder: 'without_bonus_wager',
      type: 'number',
      label: t('without_bonus_wager'),
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
      name: 'verifications',
      placeholder: 'verifications',
      type: 'multiSelect',
      label: t('verifications'),
      required: true,
    },
    {
      name: 'blocked_countries',
      placeholder: 'blocked_countries',
      type: 'multiSelect',
      label: t('blocked_countries'),
      required: true,
    },
    {
      name: 'allowed_countries',
      placeholder: 'allowed_countries',
      type: 'multiSelect',
      label: t('allowed_countries'),
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
      name: 'key',
      placeholder: 'key',
      type: 'text',
      label: t('key'),
      required: true,
    },
    {
      name: 'value',
      placeholder: 'value',
      type: 'text',
      label: t('value'),
      required: true,
    },
    {
      name: 'button',
      placeholder: 'button',
      type: 'text',
      label: t('button'),
      required: true,
    },
  ]);

  useEffect(() => {
    const getCurrency = async () => {
      const currenciesList = await getCurrenciesList();
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
      setFormData((prev) =>
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
          if (data.name === 'verifications') {
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
                value: item.title,
                label: item.title,
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
    const getData = async () => {
      try {
        const { data } = await axios.get<{ data: IData }>(getDataByIdApi(Number(id)), {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('token'),
          },
        });
        setFormData((prev) =>
          prev.map((item) => ({
            ...item,
            value: data.data[item.name as keyof IData] as string,
          })),
        );
        setResData(data.data);
      } catch (e) {
        console.log(e);
      }
    };

    void getData();
  }, []);

  return (
    <ContentLayout title={t('payment-gateways-edit')}>
      <FormGenerator
        title={resData?.name}
        api={dataEditApi()}
        id={Number(id)}
        formItems={formData}
      />
    </ContentLayout>
  );
};

export default PaymentGatewaysEdit;
