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
            id={item.id}
            editRoute={`verification/await/edit/${item.id}`}
            deleteUrl={deleteVerificationAwaitByIdApi(item.id)}
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
            id={item.id}
            editRoute={`verification/closed/edit/${item.id}`}
            deleteUrl={deleteVerificationClosedByIdApi(item.id)}
          />
        );
      },
    },
  ];
  return columns;
};
