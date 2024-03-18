import React from 'react';
import { Table } from 'react-bootstrap';
import { ITableColumns } from '../models/table';
import TableHeader from './TableHeader';
import TablePagination from './TablePagination';
import TableBody from './TableBody';

interface IProps {
  tableColumns: ITableColumns[];
  recordsTotal: number;
  tableData: object[];
}

const Tables = ({ tableColumns, recordsTotal, tableData }: IProps) => {
  return (
    <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white border-top border-bottom border-200 position-relative top-1">
      <div>
        <div className="scrollbar ms-n1 ps-1">
          <Table className="esfront-table fs-9 table">
            <TableHeader tableColumns={tableColumns} />
            <TableBody tableData={tableData} tableColumns={tableColumns} />
          </Table>
          <TablePagination recordsTotal={recordsTotal} />
        </div>
      </div>
    </div>
  );
};

export default Tables;
