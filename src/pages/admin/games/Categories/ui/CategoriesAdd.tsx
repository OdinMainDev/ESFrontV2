import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dataEditApi } from '../api/api';
import { getCountriesApi } from '@/shared/api/countriesApi';
import { getGamesProviderList } from '@/shared/api/gamesProvider';
import { getGamesList } from '@/shared/api/gamesList';
import { getLanguagesList } from '@/shared/api/languagesApi';

const CategoriesAdd = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<IFormItem[]>([
    {
      name: 'name',
      placeholder: 'name',
      label: t('name'),
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
      name: 'enable',
      placeholder: 'enable',
      label: t('enable'),
      type: 'switch',
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
      name: 'game_ids[]',
      placeholder: 'games',
      type: 'multiSelect',
      label: t('games'),
      required: true,
    },
    {
      name: 'game_providers[]',
      placeholder: 'games',
      type: 'multiSelect',
      label: t('game-provider'),
      required: true,
    },
    {
      name: 'texts',
      placeholder: 'texts',
      type: 'texts',
      label: t('texts'),
      required: true,
    },
  ]);

  useEffect(() => {
    const getDatas = async () => {
      const countriesList = await getCountriesApi();
      const gamesProviderList = await getGamesProviderList();
      const gamesList = await getGamesList();
      const textTypes = ['title', 'description', 'seo_title', 'seo_keywords', 'seo_description'];
      const langList = await getLanguagesList();
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
          if (data.name === 'game_ids[]') {
            return {
              ...data,
              options: gamesList.map((item) => ({
                value: `${item.id}`,
                label: `${item.id}(${item.api_name}):${item.name}`,
              })),
            };
          }
          if (data.name === 'game_providers[]') {
            return {
              ...data,
              options: gamesProviderList.map((item) => ({
                value: item,
                label: item,
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
          if (data.name === 'type') {
            return {
              ...data,
              options: textTypes.map((item) => ({
                value: item,
                label: item,
              })),
            };
          }
          return data;
        }),
      );
    };

    void getDatas();
  }, []);

  return (
    <ContentLayout title={t('categories-add')}>
      <FormGenerator
        id={0}
        navigateTo="admin/games/providers/edit/"
        api={dataEditApi()}
        formItems={data}
        withTabs
        tabs={[
          { name: t('info'), eventKey: 'info', start: 0, end: 9 },
          { name: t('texts'), eventKey: 'texts', start: data.length - 1, end: data.length },
        ]}
      />
    </ContentLayout>
  );
};

export default CategoriesAdd;
