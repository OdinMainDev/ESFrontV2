import { ITableColumns, TableEditButton } from '@/features/Table';
import { IData } from './models/interfaces';
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
      render: (item: IData) => {
        return (
          <TableEditButton
            editRoute={`admin/finances/withdrawal-gateways/edit/${item.id}`}
            deleteUrl={`admin/finances/withdrawal-gateways/delete/${item.id}`}
          />
        );
      },
    },
  ];
  return columns;
};
