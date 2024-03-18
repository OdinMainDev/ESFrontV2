import { ITableColumns, TableEditButton } from '@/features/Table';
import { ICurrencies } from '@/shared/models/interfaces/currencies';

export const currenciesTableColumns: ITableColumns[] = [
  {
    label: 'ID',
    value: 'id',
    sort: true,
    export: true,
  },
  {
    label: 'Название',
    value: 'title',
    sort: true,
    export: true,
  },
  {
    label: 'Код валюты',
    value: 'code_alpha',
    sort: true,
    export: true,
  },
  {
    label: 'Знаки валют',
    value: 'minor_units',
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
    render: (item: ICurrencies) => {
      return (
        <TableEditButton
          editRoute={`currencies/edit/${item.id}`}
          deleteUrl={`currencies/delete/${item.id}`}
        />
      );
    },
  },
];
