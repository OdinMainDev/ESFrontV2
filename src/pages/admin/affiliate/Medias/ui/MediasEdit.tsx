import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dataEditApi, getDataByIdApi } from '../api/api';
import { getLanguagesList } from '@/shared/api/languagesApi';
import { useParams } from 'react-router-dom';
import { IData } from '../models/interfaces';
import axios from 'axios';
import Cookies from 'js-cookie';

const EditMedias = () => {
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
      name: 'language',
      placeholder: 'language',
      label: t('language'),
      type: 'select',
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
      name: 'type',
      placeholder: 'type',
      label: t('type'),
      type: 'number',
      required: true,
    },
  ]);
  useEffect(() => {
    const getLanguages = async () => {
      const countriesList = await getLanguagesList();
      setData((prev) =>
        prev.map((data) => {
          if (data.name === 'language') {
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

    void getLanguages();
  }, []);
  return (
    <ContentLayout title={t('affiliate-edit-media') + `${title}`}>
      <FormGenerator
        id={Number(id)}
        navigateTo="admin/casino/url/edit/"
        api={dataEditApi()}
        formItems={data}
      />
    </ContentLayout>
  );
};

export default EditMedias;
