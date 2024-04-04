import { ITableColumns, TableEditButton } from '@/features/Table';
import { IStatus } from './models/status';
import { deleteStatuByIdApi } from './api/statusesApi';

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
            id={item.id}
            editRoute={`admin/statuses/edit/${item.id}`}
            deleteUrl={deleteStatuByIdApi(item.id)}
          />
        );
      },
    },
  ];
  return columns;
};
