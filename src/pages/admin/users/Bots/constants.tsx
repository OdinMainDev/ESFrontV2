import { ITableColumns, TableEditButton } from '@/features/Table';
import { useTranslation } from 'react-i18next';
import { IBot } from './models/interfaces';
import { deleteBotByIdApi } from './api/api';
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
      render: (item: IBot) => {
        return (
          <TableEditButton
            id={item.id}
            editRoute={`admin/bots/edit/${item.id}`}
            deleteUrl={deleteBotByIdApi(item.id)}
          />
        );
      },
    },
  ];
  return columns;
};
