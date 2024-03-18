import { TableEditButton } from '@/features/Table';
import { ITableColumns } from '@/features/Table/models/table';
import { ICasino } from '@/shared/models/interfaces/casinos';
import Badge from '@/shared/ui/Badge';

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
          <Badge
            bg={item.is_enabled ? 'success' : 'danger'}
            variant="esfront"
            iconPosition="end"
            className="fs-10"
          >
            {item.is_enabled ? 'on' : 'off'}
          </Badge>
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
