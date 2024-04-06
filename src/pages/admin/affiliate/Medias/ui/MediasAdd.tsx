import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dataEditApi } from '../api/api';
import { getLanguagesList } from '@/shared/api/languagesApi';

const AddMedias = () => {
  const { t } = useTranslation();
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

    void getLanguages();
  }, []);
  return (
    <ContentLayout title={t('affiliate-add-media')}>
      <FormGenerator
        id={0}
        navigateTo="admin/casino/url/edit/"
        api={dataEditApi()}
        formItems={data}
      />
    </ContentLayout>
  );
};

export default AddMedias;
