import { ITableColumns, TableEditButton } from '@/features/Table';
import { IBot } from './models/interfaces';
import { deleteBotByIdApi } from './api/api';

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
      render: (item: IBot) => {
        return (
          <TableEditButton
            editRoute={deleteBotByIdApi(item.id)}
            deleteUrl={`admin/bots/delete/${item.id}`}
          />
        );
      },
    },
  ];
  return columns;
};
