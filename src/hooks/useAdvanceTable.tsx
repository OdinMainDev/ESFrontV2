/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsWithChildren } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  InitialTableState
} from '@tanstack/react-table';
interface UseAdvanceTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  selection?: boolean;
  sortable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  selectionColumnWidth?: number | string;
  initialState?: InitialTableState;
}

const selectionColumn = {
  id: 'select',
  accessorKey: '',
  header: ({ table }: any) => (
    ""
  ),
  cell: ({ row }: any) => (
    ""
  ),
  meta: {
    headerProps: { style: { width: '30px' } }
  }
};

const useAdvanceTable = <T,>({
  columns,
  data,
  selection,
  sortable,
  pagination,
  pageSize,
  initialState
}: PropsWithChildren<UseAdvanceTableProps<T>>) => {
  const state = {
    pagination: { pageSize: pagination ? pageSize : data.length },
    ...initialState
  };
  const table = useReactTable<T>({
    data,
    columns: selection ? [selectionColumn, ...columns] : columns,
    enableSorting: sortable,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: state
  });

  return table;
};

export default useAdvanceTable;
