import { CurrenciesForm } from '@/features/CurrenciesForm';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useParams } from 'react-router-dom';

const CurrenciesEdit = () => {
  const { id } = useParams();
  return (
    <ContentLayout title={'Изменить валюту'}>
      <CurrenciesForm id={Number(id)} />
    </ContentLayout>
  );
};

export default CurrenciesEdit;
