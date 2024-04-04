import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getBotsByIdApi, botsEditApi } from '../api/api';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { IBot } from '../models/interfaces';

const BotsEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [resData, setResData] = useState<IBot | null>(null);
  const [formData, setFormData] = useState<IFormItem[]>([
    {
      name: 'name',
      placeholder: 'name',
      label: 'name',
      required: true,
    },
  ]);

  useEffect(() => {
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
  }, []);

  return (
    <ContentLayout title={t('bot edit')}>
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
