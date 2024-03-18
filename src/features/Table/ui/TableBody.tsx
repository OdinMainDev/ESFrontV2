import { ITableBody } from '../models/table';

const TableBody = ({ tableData, tableColumns }: ITableBody) => {
  return (
    <tbody>
      {tableData.map((item, index) => (
        <tr key={index}>
          {tableColumns.map(({ value, render, classNames }, index) => (
            <td key={index} className={classNames ? classNames : 'ps-4'}>
              {render ? render(item) : <span>{item[value] ?? ''}</span>}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
