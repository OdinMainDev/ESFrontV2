import { ITableColumns, TableEditButton } from '@/features/Table';
import { IData } from './models/interfaces';
import { deleteDataByIdApi } from './api/api';

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
      render: (item: IData) => {
        return (
          <TableEditButton
            id={item.id}
            editRoute={`admin/finances/payment-gateways/edit/${item.id}`}
            deleteUrl={deleteDataByIdApi(item.id)}
          />
        );
      },
    },
  ];
  return columns;
};
