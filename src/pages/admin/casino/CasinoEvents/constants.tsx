import { ITableColumns, TableEditButton } from '@/features/Table';
import { IData } from './models/interfaces';
import { useTranslation } from 'react-i18next';
import { dataDeleteApi, dataGroupDeleteApi } from './api/api';

export const useGenerateTableCulumns = () => {
  const { t } = useTranslation();
  const columns: ITableColumns[] = [
    {
      label: 'ID',
      value: 'id',
      sort: true,
      export: true,
    },
    {
      label: t('name'),
      value: 'name',
      sort: true,
      export: true,
    },
    {
      label: t('created-at'),
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
            deleteUrl={dataDeleteApi(item.id)}
          />
        );
      },
    },
  ];
  return columns;
};

export const useGroupGenerateTableCulumns = () => {
  const { t } = useTranslation();
  const columns: ITableColumns[] = [
    {
      label: 'ID',
      value: 'id',
      sort: true,
      export: true,
    },
    {
      label: t('name'),
      value: 'name',
      sort: true,
      export: true,
    },
    {
      label: t('api-name'),
      value: 'api_name',
      sort: true,
      export: true,
    },
    {
      label: t('created-at'),
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
            deleteUrl={dataGroupDeleteApi(item.id)}
          />
        );
      },
    },
  ];
  return columns;
};
