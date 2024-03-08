import { IFilterParams } from '@/shared/models/interfaces/filter';
import { useEffect, useState } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

interface IProps {
  recordsTotal: number;
}
const TablePagination = ({ recordsTotal }: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    length: Number(searchParams.get('length')) || 10,
    start: Number(searchParams.get('start')),
    order_direction: searchParams.get('order_direction') ?? '',
    order_column: searchParams.get('order_column') ?? '',
  });
  const paginationNumbers = Math.ceil(recordsTotal / (filterParams.length ?? 0));

  useEffect(() => {
    setFilterParams({
      length: Number(searchParams.get('length')) || 10,
      start: Number(searchParams.get('start')),
      order_direction: searchParams.get('order_direction') ?? '',
      order_column: searchParams.get('order_column') ?? '',
    });
  }, [searchParams]);

  function calculateCurrentPage(start: number, length: number) {
    return start / length + 1;
  }

  function calculateStart(page: number, length: number) {
    const data = { ...filterParams, start: (page - 1) * length };
    setSearchParams(data as unknown as URLSearchParamsInit);
  }

  const nextPage = () => {
    const data = { ...filterParams, start: filterParams.start + filterParams.length };
    setSearchParams(data as unknown as URLSearchParamsInit);
  };

  const prevPage = () => {
    const data = { ...filterParams, start: filterParams.start - filterParams.length };
    setSearchParams(data as unknown as URLSearchParamsInit);
  };

  return (
    <div className="align-items-center py-1 row">
      <div className="d-flex fs-9 col">
        <p className="mb-0 d-none d-sm-block me-3 fw-semi-bold text-900">
          {filterParams.start + 1} to {filterParams.length + filterParams.start}{' '}
          <span className="text-600"> items of </span>
          {recordsTotal}
        </p>
      </div>
      <div className="col-auto">
        <ul className="mb-0 justify-content-center pagination">
          <li className={filterParams.start === 0 ? 'page-item disabled' : 'page-item'}>
            <span className="page-link" onClick={prevPage}>
              <span aria-hidden="true">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="chevron-left"
                  className="svg-inline--fa fa-chevron-left "
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="currentColor"
                    d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
                  ></path>
                </svg>
              </span>
              <span className="visually-hidden">Previous</span>
            </span>
          </li>

          <ReactPaginate
            breakLabel="..."
            nextLabel={null}
            pageRangeDisplayed={1}
            forcePage={calculateCurrentPage(filterParams.start, filterParams.length) - 1}
            pageCount={paginationNumbers || 10}
            containerClassName="flex"
            activeClassName="active"
            onPageChange={(value) => calculateStart(value.selected + 1, filterParams.length)}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousLabel={null}
            renderOnZeroPageCount={null}
          />

          <li
            className={
              filterParams.start + filterParams.length > recordsTotal
                ? 'page-item disabled'
                : 'page-item'
            }
          >
            <div className="page-link" onClick={nextPage}>
              <span aria-hidden="true">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="chevron-right"
                  className="svg-inline--fa fa-chevron-right "
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="currentColor"
                    d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                  ></path>
                </svg>
              </span>
              <span className="visually-hidden">Next</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TablePagination;
