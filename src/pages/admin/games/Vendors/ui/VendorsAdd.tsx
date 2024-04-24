import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dataEditApi } from '../api/api';
import { getApiProviderListApi } from '@/shared/api/allGamesApi';

const VendorsAdd = () => {
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
      type: 'text',
      required: true,
    },
    {
      name: 'external_key',
      placeholder: 'external_key',
      label: t('external-key'),
      type: 'text',
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

    void getApi();
  }, []);

  return (
    <ContentLayout title={t('vendors-add')}>
      <FormGenerator
        id={0}
        navigateTo="admin/games/vendors/edit/"
        api={dataEditApi()}
        formItems={data}
      />
    </ContentLayout>
  );
};

export default VendorsAdd;
