import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dataEditApi, getDataByIdApi } from '../api/api';
import { getCountriesApi } from '@/shared/api/countriesApi';
import axios from 'axios';
import { IData } from '../models/interfaces';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const CasinoUrlEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [data, setData] = useState<IFormItem[]>([
    {
      name: 'name',
      placeholder: 'name',
      label: 'name',
      required: true,
    },
    {
      name: 'url',
      placeholder: 'url',
      label: 'url',
      required: true,
    },
    {
      name: 'blocked_countries[]',
      label: 'Выберите заблокированные страны',
      type: 'multiSelect',
      required: true,
    },
    {
      name: 'allowed_countries[]',
      label: 'Выберите разрешенные страны',
      type: 'multiSelect',
      required: true,
    },
  ]);

  useEffect(() => {
    const getCountries = async () => {
      const countriesList = await getCountriesApi();
      setData((prev) =>
        prev.map((data) => {
          if (data.type === 'multiSelect') {
            return {
              ...data,
              options: countriesList.map((item) => ({
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
        setData((prev) =>
          prev.map((item) => {
            return {
              ...item,
              value: data.data[item.name as keyof IData] as string,
            };
          }),
        );
        setTitle(data.data.name);
      } catch (e) {
        console.log(e);
      }
    };

    void getData();

    void getCountries();
  }, []);
  return (
    <ContentLayout title={t('casino url edit') + ` ${title}`}>
      <FormGenerator navigateTo="admin/casino/url/edit/" api={dataEditApi()} formItems={data} />
    </ContentLayout>
  );
};

export default CasinoUrlEdit;
