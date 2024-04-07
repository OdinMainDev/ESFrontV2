import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dataEditApi } from '../api/api';

const SliderAdd = () => {
  const { t } = useTranslation();

  const [data] = useState<IFormItem[]>([
    {
      name: 'url',
      placeholder: 'url',
      label: t('url'),
      type: 'text',
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
      name: 'image',
      placeholder: 'image',
      label: t('image'),
      type: 'text',
      required: true,
    },
  ]);

  return (
    <ContentLayout title={t('slider-add')}>
      <FormGenerator
        id={0}
        navigateTo="admin/other/slider/edit/"
        api={dataEditApi()}
        formItems={data}
      />
    </ContentLayout>
  );
};

export default SliderAdd;
