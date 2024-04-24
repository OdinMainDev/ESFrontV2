import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dataEditApi, getDataByIdApi } from '../api/api';
import { IData } from '../models/interfaces';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { getApiProviderListApi } from '@/shared/api/allGamesApi';

const VendorsEdit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
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
      label: t('enable'),
      type: 'switch',
      required: true,
    },
    {
      name: 'api_name',
      placeholder: 'api_name',
      label: t('api-name'),
      type: 'select',
      required: true,
    },
    {
      name: 'external_id',
      placeholder: 'external_id',
      label: t('external-id'),
      type: 'select',
      required: true,
    },
    {
      name: 'external_key',
      placeholder: 'external_key',
      label: t('external-key'),
      type: 'select',
      required: true,
    },
  ]);
  useEffect(() => {
    const getApi = async () => {
      const apisList = await getApiProviderListApi();
      console.log(apisList);
      setData((prev) =>
        prev.map((data) => {
          if (data.name === 'api_name') {
            return {
              ...data,
              options: apisList.map((item) => ({
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
    void getApi();
    void getData();
  }, []);

  return (
    <ContentLayout title={t('vendors-edit') + ` ${title}`}>
      <FormGenerator
        id={Number(id)}
        navigateTo="admin/games/vendors/edit/"
        api={dataEditApi()}
        formItems={data}
      />
    </ContentLayout>
  );
};

export default VendorsEdit;
