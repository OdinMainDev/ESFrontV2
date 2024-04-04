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
            editRoute={`admin/casino/events/edit/${item.id}`}
            deleteUrl={`admin/casino/events/delete/${item.id}`}
          />
        );
      },
    },
  ];
  return columns;
};

export const useGroupGenerateTableCulumns = () => {
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
      label: 'Api Name',
      value: 'api_name',
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
            editRoute={`admin/casino/events/group/edit/${item.id}`}
            deleteUrl={`admin/casino/events/group/delete/${item.id}`}
          />
        );
      },
    },
  ];
  return columns;
};
