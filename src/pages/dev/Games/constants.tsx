import { ITableColumns, TableEditButton } from '@/features/Table';
import { IGame } from '@/shared/models/interfaces/games';

export const gamesTableColumns: ITableColumns[] = [
  {
    label: 'ID',
    value: 'id',
    sort: true,
    export: true,
  },
  {
    label: '',
    value: 'image',
    sort: false,
    export: true,
    classNames: 'ps-0 object-contain text-right w-16 min-w-16',
    render: (item: IGame) => {
      if (!item.image) {
        return '';
      }
      return (
        <a className="rounded-2 border d-inline-block w-16 h-16 p-[4px]">
          <img src={item.image} className="w-100 h-100 object-contain" />
        </a>
      );
    },
  },
  {
    label: 'Название',
    value: 'name',
    sort: true,
    export: true,
    render: (item: IGame) => {
      return <a className="fw-semi-bold line-clamp-3 ">{item.name}</a>;
    },
  },
  {
    label: 'Провайдер',
    value: 'game_provider',
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
    render: (item: IGame) => {
      return (
        <TableEditButton
          editRoute={`games/edit/${item.id}`}
          deleteUrl={`games/delete/${item.id}`}
        />
      );
    },
  },
];
