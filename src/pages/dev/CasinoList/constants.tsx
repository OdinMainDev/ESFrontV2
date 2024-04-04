import { TableEditButton } from '@/features/Table';
import { ITableColumns } from '@/features/Table/models/table';
import { ICasino } from '@/shared/models/interfaces/casinos';
import Badge from '@/shared/ui/Badge';
import { useTranslation } from 'react-i18next';
import { deleteDataById } from './api/casinosApi';
export const useGenerateTableColumns = () => {
  const { t } = useTranslation();
  const casinosTableColumns: ITableColumns[] = [
    {
      label: t('name'),
      value: 'name',
      sort: true,
      export: true,
    },
    {
      label: t('turn-on'),
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
            id={item.id}
            editRoute={`casinos/edit/${item.id}`}
            deleteUrl={deleteDataById(item.id)}
          />
        );
      },
    },
    {
      label: t('api-key'),
      value: 'token',
      sort: false,
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
      render: (item: ICasino) => {
        return (
          <TableEditButton
            id={item.id}
            editRoute={`casinos/edit/${item.id}`}
            deleteUrl={deleteDataById(item.id)}
          />
        );
      },
      export: false,
    },
  ];
  return casinosTableColumns;
};
