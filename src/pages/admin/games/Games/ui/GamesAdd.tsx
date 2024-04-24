import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dataEditApi } from '../api/api';

const GamesAdd = () => {
  const { t } = useTranslation();
  const [data] = useState<IFormItem[]>([
    {
      name: 'name',
      placeholder: 'name',
      label: t('name'),
      required: true,
    },
    {
      name: 'desktop_enabled',
      placeholder: 'desktop_enabled',
      label: t('desktop_enabled'),
      type: 'switch',
      required: true,
    },
    {
      name: 'game_id',
      placeholder: 'game_id',
      label: t('game_id'),
      type: 'number',
      required: true,
    },
    {
      name: 'image',
      placeholder: 'image',
      label: t('image'),
      type: 'text',
      required: true,
    },
    {
      name: 'mobile_enabled',
      placeholder: 'mobile_enabled',
      label: t('mobile_enabled'),
      type: 'switch',
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

  return (
    <ContentLayout title={t('games-add')}>
      <FormGenerator
        id={0}
        navigateTo="admin/games/edit/"
        api={dataEditApi()}
        formItems={data}
        withTabs
        tabs={[
          { name: t('info'), eventKey: 'info', start: 0, end: 5 },
          { name: t('texts'), eventKey: 'texts', start: data.length - 1, end: data.length },
        ]}
      />
    </ContentLayout>
  );
};

export default GamesAdd;
