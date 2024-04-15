import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dataEditApi } from '../api/api';
import { getCountriesApi } from '@/shared/api/countriesApi';
import { getGamesApi } from '@/shared/api/gamesApi';
import { getAllGamesApi } from '@/shared/api/allGamesApi';

const ProvidersAdd = () => {
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
      name: 'image',
      placeholder: 'image',
      label: t('image'),
      type: 'image',
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
      name: 'url',
      placeholder: 'url',
      label: t('url'),
      type: 'text',
      required: true,
    },
    {
      name: 'blocked_countries[]',
      placeholder: 'blocked_countries',
      type: 'multiSelect',
      label: t('blocked_countries'),
      required: true,
    },
    {
      name: 'allowed_countries[]',
      placeholder: 'allowed_countries',
      type: 'multiSelect',
      label: t('allowed_countries'),
      required: true,
    },
    {
      name: 'games[]',
      placeholder: 'games',
      type: 'multiSelect',
      label: t('games'),
      required: true,
    },
  ]);

  useEffect(() => {
    const getCurrency = async () => {
      const countriesList = await getCountriesApi();
      const gamesList = await getAllGamesApi();
      setData((prev) =>
        prev.map((data) => {
          if (data.name.includes('countries')) {
            return {
              ...data,
              options: countriesList.map((item) => ({
                value: item,
                label: item,
              })),
            };
          }
          if (data.placeholder === 'games') {
            return {
              ...data,
              options: gamesList.map((item) => ({
                value: item.name,
                label: item.name,
              })),
            };
          }
          return data;
        }),
      );
    };

    void getCurrency();
  }, []);

  return (
    <ContentLayout title={t('game-provider-add')}>
      <FormGenerator
        id={0}
        navigateTo="admin/games/providers/edit/"
        api={dataEditApi()}
        formItems={data}
      />
    </ContentLayout>
  );
};

export default ProvidersAdd;
