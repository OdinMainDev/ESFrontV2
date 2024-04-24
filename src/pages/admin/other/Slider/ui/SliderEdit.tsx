import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dataEditApi, getDataByIdApi } from '../api/api';
import { useParams } from 'react-router-dom';
import { IData } from '../models/interfaces';
import axios from 'axios';
import Cookies from 'js-cookie';
import { getCountriesApi } from '@/shared/api/countriesApi';
import { mapperData } from '../helpers/dataMapper';

const SliderEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [data, setData] = useState<IFormItem[]>([
    {
      name: 'image',
      placeholder: 'image',
      label: t('image'),
      type: 'image',
      required: true,
    },
    {
      name: 'enable',
      placeholder: 'enable',
      label: t('enable'),
      type: 'switch',
      required: true,
    },
    {
      name: 'url',
      placeholder: 'url',
      label: t('url'),
      type: 'text',
      required: true,
    },
    {
      name: 'position',
      placeholder: 'position',
      label: t('position'),
      type: 'number',
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
      options: [],
      required: true,
    },
  ]);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get<{ data: IData }>(getDataByIdApi(Number(id)), {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('token'),
          },
        });
        setData((prev) =>
          prev.map((item) => {
            const value = mapperData(data.data);
            const array = value[
              item.name.replace(/\[\]/g, '') as keyof IData
            ] as unknown as string[];
            return {
              ...item,
              value: item.type !== 'multiSelect' ? (value[item.name as keyof IData] as string) : '',
              selectedOption:
                item.type === 'multiSelect'
                  ? array.map((item) => ({
                      value: item,
                      label: item,
                    }))
                  : [],
            };
          }),
        );
        setTitle(data.data.url);
      } catch (e) {
        console.log(e);
      }
    };

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
    void getCountries();
    void getData();
  }, []);

  return (
    <ContentLayout title={t('slider-edit') + ` ${title}`}>
      <FormGenerator
        id={Number(id)}
        navigateTo="admin/other/slider/edit/"
        api={dataEditApi()}
        formItems={data}
      />
    </ContentLayout>
  );
};

export default SliderEdit;
