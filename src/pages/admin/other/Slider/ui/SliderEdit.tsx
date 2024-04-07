import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dataEditApi, getDataByIdApi } from '../api/api';
import { useParams } from 'react-router-dom';
import { IData } from '../models/interfaces';
import axios from 'axios';
import Cookies from 'js-cookie';

const SliderEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [data, setData] = useState<IFormItem[]>([
    {
      name: 'url',
      placeholder: 'url',
      label: t('url'),
      type: 'text',
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
      name: 'position',
      placeholder: 'position',
      label: t('position'),
      type: 'number',
      required: true,
    },
    {
      name: 'image',
      placeholder: 'image',
      label: t('image'),
      type: 'text',
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
            return {
              ...item,
              value: data.data[item.name as keyof IData] as string,
            };
          }),
        );
        setTitle(data.data.url);
      } catch (e) {
        console.log(e);
      }
    };

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
