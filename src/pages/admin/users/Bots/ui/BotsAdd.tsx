import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { botsEditApi } from '../api/api';
import { getCurrenciesList } from '@/shared/api/currenciesApi';
import { getLanguagesList } from '@/shared/api/languagesApi';

const BotsAdd = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<IFormItem[]>([
    {
      name: 'count',
      placeholder: 'count',
      label: t('count'),
      type: 'number',
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
      name: 'currency',
      placeholder: 'currency',
      label: t('currency'),
      type: 'multiSelect',
      required: true,
      checked: false,
    },
  ]);
  useEffect(() => {
    const getCurrencies = async () => {
      const countriesList = await getCurrenciesList();
      const langList = await getLanguagesList();
      setData((prev) =>
        prev.map((data) => {
          if (data.type === 'multiSelect') {
            return {
              ...data,
              options: countriesList.map((item) => ({
                value: item.title,
                label: item.title,
              })),
            };
          }
          if (data.name === 'language') {
            return {
              ...data,
              options: langList.map((item) => ({
                value: item,
                label: item,
              })),
            };
          }

          return data;
        }),
      );
    };

    void getCurrencies();
  }, []);

  return (
    <ContentLayout title={t('bots-add')}>
      <FormGenerator id={0} navigateTo="admin/bots/edit/" api={botsEditApi()} formItems={data} />
    </ContentLayout>
  );
};

export default BotsAdd;
