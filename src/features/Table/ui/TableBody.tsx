import { ITableBody } from '../models/table';

const TableBody = ({ tableData, tableColumns }: ITableBody) => {
  return (
    <tbody>
      {tableData.length > 0 ? (
        tableData.map((item, index) => (
          <tr key={index}>
            {tableColumns.map(({ value, render, classNames }, index) => (
              <td key={index} className={classNames ? classNames : 'ps-4'}>
                {render ? render(item) : <span>{item[value] ?? ''}</span>}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={tableColumns.length} align="center" className="py-4">
            Записей не найдено
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
