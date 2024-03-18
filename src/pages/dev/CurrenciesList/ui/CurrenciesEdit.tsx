import { CurrenciesForm } from '@/features/CurrenciesForm';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const CurrenciesEdit = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  return (
    <ContentLayout title={t('currencies-edit')}>
      <CurrenciesForm id={Number(id)} />
    </ContentLayout>
  );
};

export default CurrenciesEdit;
