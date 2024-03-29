import { ITableColumns, TableEditButton } from '@/features/Table';
import { IData } from './models/interfaces';

export const useGenerateTableCulumns = () => {
  const columns: ITableColumns[] = [
    {
      label: 'ID',
      value: 'id',
      sort: true,
      export: true,
    },
    {
      label: 'User ID',
      value: 'user_id',
      sort: true,
      export: true,
    },
    {
      label: 'Дата создания',
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
            editRoute={`admin/finances/withdrawal-transactions/edit/${item.id}`}
            deleteUrl={`admin/finances/withdrawal-transactions/delete/${item.id}`}
          />
        );
      },
    },
  ];
  return columns;
};
