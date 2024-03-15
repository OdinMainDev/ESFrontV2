import { CurrenciesForm } from '@/features/CurrenciesForm';
import ContentLayout from '@/shared/layout/ContentLayout';

const CurrenciesAdd = () => {
  return (
    <ContentLayout title="Добавить валюту">
      <CurrenciesForm id={0} />
    </ContentLayout>
  );
};

export default CurrenciesAdd;
