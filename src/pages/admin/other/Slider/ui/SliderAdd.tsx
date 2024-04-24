import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dataEditApi } from '../api/api';
import { Tab, Tabs } from 'react-bootstrap';
import { getCountriesApi } from '@/shared/api/countriesApi';

const SliderAdd = () => {
  const { t } = useTranslation();

  const [data, setData] = useState<IFormItem[]>([
    {
      name: 'image',
      placeholder: 'image',
      label: t('image'),
      type: 'image',
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
      name: 'url',
      placeholder: 'url',
      label: t('url'),
      type: 'text',
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
      name: 'blocked_countries[]',
      label: 'Выберите заблокированные страны',
      type: 'multiSelect',
      required: true,
    },
    {
      name: 'allowed_countries[]',
      label: 'Выберите разрешенные страны',
      type: 'multiSelect',
      options: [],
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
    <ContentLayout title={t('slider-add')}>
      <Tabs className="mb-3" variant="underline" defaultActiveKey="main">
        <Tab eventKey="main" title="Общие данные">
          <FormGenerator
            id={0}
            navigateTo="admin/other/slider/edit/"
            api={dataEditApi()}
            formItems={data}
          />
        </Tab>
        <Tab eventKey="text" title="Текстые">
          <FormGenerator
            id={0}
            navigateTo="admin/other/slider/edit/"
            api={dataEditApi()}
            formItems={data}
          />
        </Tab>
      </Tabs>
    </ContentLayout>
  );
};

export default SliderAdd;
