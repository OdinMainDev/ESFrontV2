import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dataEditApi, getDataByIdApi } from '../api/api';
import { useParams } from 'react-router-dom';
import { IData } from '../models/interfaces';
import axios from 'axios';
import Cookies from 'js-cookie';

const EditOffers = () => {
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
      name: 'id',
      placeholder: 'id',
      label: 'id',
      type: 'number',
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
    <ContentLayout title={t('affiliate-edit-offer') + ` ${title}`}>
      <FormGenerator
        id={0}
        navigateTo="admin/affiliate/offers/edit/"
        api={dataEditApi()}
        formItems={data}
      />
    </ContentLayout>
  );
};

export default EditOffers;
