import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getBotsByIdApi, botsEditApi } from '../api/api';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { IBot } from '../models/interfaces';
import { getCurrenciesList } from '@/shared/api/currenciesApi';

const BotsEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [resData, setResData] = useState<IBot | null>(null);
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
      label: t('enable'),
      type: 'switch',
      required: true,
      checked: false,
    },
    {
      name: 'email',
      placeholder: 'email',
      label: t('email'),
      type: 'text',
      required: true,
      checked: false,
    },
    {
      name: 'full_name',
      placeholder: 'full_name',
      label: t('full_name'),
      type: 'text',
      required: true,
      checked: false,
    },
    {
      name: 'username',
      placeholder: 'username',
      label: t('username'),
      type: 'text',
      required: true,
      checked: false,
    },
    {
      name: 'currency',
      placeholder: 'currency',
      label: t('currency'),
      type: 'multiSelect',
      required: true,
      checked: false,
    },
  ]);

  useEffect(() => {
    const getCurrencies = async () => {
      const countriesList = await getCurrenciesList();
      setFormData((prev) =>
        prev.map((data) => {
          if (data.type === 'multiSelect') {
            return {
              ...data,
              options: countriesList.map((item) => ({
                value: item.title,
                label: item.title,
              })),
            };
          }
          return data;
        }),
      );
    };
    const getStatus = async () => {
      try {
        const { data } = await axios.get<{ data: IBot }>(getBotsByIdApi(Number(id)), {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('token'),
          },
        });
        setFormData((prev) =>
          prev.map((item) => ({
            ...item,
            value: data.data[item.name as keyof IBot] as string,
          })),
        );
        setResData(data.data);
      } catch (e) {
        console.log(e);
      }
    };

    void getStatus();
    void getCurrencies();
  }, []);

  return (
    <ContentLayout title={t('bots-edit')}>
      <FormGenerator
        id={Number(id)}
        title={resData?.name}
        api={botsEditApi()}
        formItems={formData}
      />
    </ContentLayout>
  );
};

export default BotsEdit;
