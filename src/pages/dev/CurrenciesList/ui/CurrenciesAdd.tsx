import { CurrenciesForm } from '@/features/CurrenciesForm';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useTranslation } from 'react-i18next';

const CurrenciesAdd = () => {
  const { t } = useTranslation();
  return (
    <ContentLayout title={t('currencies-add')}>
      <CurrenciesForm id={0} />
    </ContentLayout>
  );
};

export default CurrenciesAdd;
