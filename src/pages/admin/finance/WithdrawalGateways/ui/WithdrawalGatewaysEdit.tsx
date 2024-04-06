import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDataByIdApi, dataEditApi } from '../api/api';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { IData } from '../models/interfaces';
import { getPaymentProvidersApi } from '@/shared/api/paymentProviders';
import { getCurrenciesList } from '@/shared/api/currenciesApi';

const WithdrawalGatewaysEdit = () => {
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
    {
      name: 'auto_withdraw',
      placeholder: 'auto_withdraw',
      type: 'switch',
      label: t('auto-withdraw'),
      required: true,
    },
  ]);

  useEffect(() => {
    const getCurrency = async () => {
      const currenciesList = await getCurrenciesList();
      const paymentProvidersList = await getPaymentProvidersApi();
      setFormData((prev) =>
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
    void getCurrency();
  }, []);

  return (
    <ContentLayout title={t('withdrawal-gateways-edit')}>
      <FormGenerator
        title={resData?.name}
        api={dataEditApi()}
        id={Number(id)}
        formItems={formData}
      />
    </ContentLayout>
  );
};

export default WithdrawalGatewaysEdit;
