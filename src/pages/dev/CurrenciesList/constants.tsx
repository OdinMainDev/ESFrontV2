import { ITableColumns, TableEditButton } from '@/features/Table';
import { ICurrencies } from '@/shared/models/interfaces/currencies';
import { deleteDataById } from './api/currenciesApi';

import { useTranslation } from 'react-i18next';
export const useGenerateTableColumns = () => {
  const { t } = useTranslation();

 const currenciesTableColumns: ITableColumns[] = [
  {
    label: 'ID',
    value: 'id',
    sort: true,
    export: true,
  },
  {
    label: t('name'),
    value: 'title',
    sort: true,
    export: true,
  },
  {
    label: t('code_alpha'),
    value: 'code_alpha',
    sort: true,
    export: true,
  },
  {
    label: t('minor_units'),
    value: 'minor_units',
    sort: true,
    export: true,
  },
  {
    label: t('created_at'),
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
          id={item.id}
          editRoute={`currencies/edit/${item.id}`}
          deleteUrl={deleteDataById(item.id)}
        />
      );
    },
  ];

  return currenciesTableColumns;
};
