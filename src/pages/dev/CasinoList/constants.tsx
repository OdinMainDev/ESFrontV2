import { TableEditButton } from '@/features/Table';
import { ITableColumns } from '@/features/Table/models/table';
import { ICasino } from '@/shared/models/interfaces/casinos';
import { Form } from 'react-bootstrap';

export const casinosTableColumns: ITableColumns[] = [
  {
    label: 'Название',
    value: 'name',
    sort: true,
    export: true,
  },
  {
    label: 'Включить',
    value: 'is_enabled',
    sort: false,
    render: (item: ICasino) => {
      return (
        <div className="flex">
          <Form.Check type="checkbox" checked={item.is_enabled} disabled />
          <span>{item.is_enabled}</span>
        </div>
      );
    },
    export: true,
  },
  {
    label: 'API KEY',
    value: 'token',
    sort: false,
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
    render: (item: ICasino) => {
      return (
        <TableEditButton
          editRoute={`casinos/edit/${item.id}`}
          deleteUrl={`casinos/delete/${item.id}`}
        />
      );
    },
    export: false,
  },
];
