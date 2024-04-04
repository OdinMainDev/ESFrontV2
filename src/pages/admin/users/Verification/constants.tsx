import { ITableColumns, TableEditButton } from '@/features/Table';
import { IVerificationAwait, IVerificationClosed } from './models/verification';
import {
  deleteVerificationAwaitByIdApi,
  deleteVerificationClosedByIdApi,
} from './api/verificationApi';

export const useGenerateAwaitTableCulumns = () => {
  const columns: ITableColumns[] = [
    {
      label: 'ID',
      value: 'id',
      sort: true,
      export: true,
    },
    {
      label: '',
      value: 'action',
      sort: false,
      render: (item: IVerificationAwait) => {
        return (
          <TableEditButton
            editRoute={deleteVerificationAwaitByIdApi(item.id)}
            deleteUrl={`verification/await/${item.id}`}
          />
        );
      },
    },
  ];
  return columns;
};

export const useGenerateClosedTableCulumns = () => {
  const columns: ITableColumns[] = [
    {
      label: 'ID',
      value: 'id',
      sort: true,
      export: true,
    },
    {
      label: '',
      value: 'action',
      sort: false,
      render: (item: IVerificationClosed) => {
        return (
          <TableEditButton
            editRoute={deleteVerificationClosedByIdApi(item.id)}
            deleteUrl={`verification/closed/${item.id}`}
          />
        );
      },
    },
  ];
  return columns;
};
