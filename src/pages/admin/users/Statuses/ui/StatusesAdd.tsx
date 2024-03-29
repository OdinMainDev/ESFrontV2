import { StatusForm } from '@/features/StatusForm';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useTranslation } from 'react-i18next';

const StatusesAdd = () => {
  const { t } = useTranslation();
  return (
    <ContentLayout title={t('currencies-add')}>
      <StatusForm id={0} />
    </ContentLayout>
  );
};

export default StatusesAdd;
