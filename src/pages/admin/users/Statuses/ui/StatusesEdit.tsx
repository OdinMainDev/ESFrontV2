import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getStatusByIdApi, statusesEditApi } from '../api/statusesApi';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { IStatus } from '../models/status';

const StatusesEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [resData, setResData] = useState<IStatus | null>(null);
  const [options] = useState<string[]>(['danger', 'success', 'warning', 'info', 'primary']);
  const [formData, setFormData] = useState<IFormItem[]>([
    {
      name: 'name',
      placeholder: 'name',
      label: 'name',
      required: true,
    },
    {
      name: 'color',
      placeholder: 'color',
      type: 'select',
      label: 'color',
      required: true,
      options: options.map((item) => ({
        value: item,
        label: item,
      })),
    },
  ]);

  useEffect(() => {
    const getStatus = async () => {
      try {
        const { data } = await axios.get<{ data: IStatus }>(getStatusByIdApi(Number(id)), {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('token'),
          },
        });
        setFormData((prev) =>
          prev.map((item) => ({
            ...item,
            value: data.data[item.name as keyof IStatus] as string,
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
    <ContentLayout title={t('statuese edit')}>
      <FormGenerator title={resData?.name} api={statusesEditApi(Number(id))} formItems={formData} />
    </ContentLayout>
  );
};

export default StatusesEdit;
