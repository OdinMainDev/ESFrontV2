import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dataEditApi } from '../api/api';
import { getCountriesApi } from '@/shared/api/countriesApi';

const CasinoUrlAdd = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<IFormItem[]>([
    {
      name: 'name',
      placeholder: 'name',
      label: 'name',
      required: true,
    },
    {
      name: 'url',
      placeholder: 'url',
      label: 'url',
      required: true,
    },
    {
      name: 'blocked_countries[]',
      label: 'Выберите заблокированные страны',
      type: 'multiSelect',
      required: true,
    },
    {
      name: 'allowed_countries[]',
      label: 'Выберите разрешенные страны',
      type: 'multiSelect',
      required: true,
    },
  ]);

  useEffect(() => {
    const getCountries = async () => {
      const countriesList = await getCountriesApi();
      setData((prev) =>
        prev.map((data) => {
          if (data.type === 'multiSelect') {
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

    void getCountries();
  }, []);
  return (
    <ContentLayout title={t('casino url add')}>
      <FormGenerator
        id={0}
        navigateTo="admin/casino/url/edit/"
        api={dataEditApi()}
        formItems={data}
      />
    </ContentLayout>
  );
};

export default CasinoUrlAdd;
