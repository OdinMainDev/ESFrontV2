import { ITableColumns, TableEditButton } from '@/features/Table';
import { IBot } from './models/bots';
import { useTranslation } from 'react-i18next';

export const useGenerateTableCulumns = () => {
  const { t } = useTranslation();
  const columns: ITableColumns[] = [
    {
      label: 'ID',
      value: 'id',
      sort: true,
      export: true,
    },
    {
      label: t('name'),
      value: 'name',
      sort: true,
      export: true,
    },
    {
      label: t('created-at'),
      value: 'created_at',
      sort: true,
      export: true,
    },
    {
      label: '',
      value: 'action',
      sort: false,
      render: (item: IBot) => {
        return (
          <TableEditButton
            editRoute={`currencies/edit/${item.id}`}
            deleteUrl={`currencies/delete/${item.id}`}
          />
        );
      },
    },
  ];
  return columns;
};
