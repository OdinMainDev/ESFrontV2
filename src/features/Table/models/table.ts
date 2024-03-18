export interface ITableColumns {
  sort: boolean;
  label: string;
  value: string;
  render?: (item: any) => JSX.Element | string;
  export?: boolean;
  classNames?: string;
}

export interface ITableBody {
  tableData: Record<string, any>[];
  tableColumns: ITableColumns[];
}
