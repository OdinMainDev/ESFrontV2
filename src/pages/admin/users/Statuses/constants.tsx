import { ITableColumns, TableEditButton } from '@/features/Table';
import { IStatus } from './models/status';

export const useGenerateTableCulumns = () => {
  const columns: ITableColumns[] = [
    {
      label: 'ID',
      value: 'id',
      sort: true,
      export: true,
    },
    {
      label: 'Название',
      value: 'name',
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
      render: (item: IStatus) => {
        return (
          <TableEditButton
            editRoute={`admin/statuses/edit/${item.id}`}
            deleteUrl={`admin/statuses/delete/${item.id}`}
          />
        );
      },
    },
  ];
  return columns;
};
