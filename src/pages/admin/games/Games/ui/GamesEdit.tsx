import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dataEditApi, getDataByIdApi } from '../api/api';
import { useParams } from 'react-router-dom';
import { IData } from '../models/interfaces';
import axios from 'axios';
import Cookies from 'js-cookie';

const GamesEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [data, setData] = useState<IFormItem[]>([
    {
      name: 'name',
      placeholder: 'name',
      label: t('name'),
      required: true,
    },
    {
      name: 'desktop_enabled',
      placeholder: 'desktop_enabled',
      label: t('desktop_enabled'),
      type: 'switch',
      required: true,
    },
    {
      name: 'game_id',
      placeholder: 'game_id',
      label: t('game_id'),
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
    {
      name: 'mobile_enabled',
      placeholder: 'mobile_enabled',
      label: t('mobile_enabled'),
      type: 'switch',
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
        setTitle(data.data.name);
      } catch (e) {
        console.log(e);
      }
    };

    void getData();
  }, []);

  return (
    <ContentLayout title={t('games-edit') + ` ${title}`}>
      <FormGenerator
        id={Number(id)}
        navigateTo="admin/games/edit/"
        api={dataEditApi()}
        formItems={data}
      />
    </ContentLayout>
  );
};

export default GamesEdit;
