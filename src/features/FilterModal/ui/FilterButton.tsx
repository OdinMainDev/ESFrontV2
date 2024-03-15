import Button from '@/shared/ui/Button';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import FilterModal from './FilterModal';
import Cookies from 'js-cookie';
import axios from 'axios';
import { IFilterItem } from '../models/filter';
import { useSearchParams } from 'react-router-dom';
import { updateFiltersWithValues } from '../helpers/updateFiltersWithValues';
import { FloatingLabel, Form } from 'react-bootstrap';

interface IProps {
  url: string;
}

const FilterButton = ({ url }: IProps) => {
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [filterContent, setFilterContent] = useState<IFilterItem[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const timer = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    const getFilters = async () => {
      try {
        const { data } = await axios.get<{ data: IFilterItem[] }>(url, {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('token'),
          },
        });
        setFilterContent(data.data);
        getQuery(data.data);
      } catch (e) {
        console.log(e);
      }
    };

    void getFilters();
  }, []);

  const getQuery = (filterContent: IFilterItem[]) => {
    const filterNames = searchParams.getAll('filter_name[]') || [];
    const filterValues = searchParams.getAll('filter_value[]') || [];
    setFilterContent(updateFiltersWithValues(filterContent, filterNames, filterValues));
  };

  const applyFilter = (filterContent: IFilterItem[]) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('filter_name[]');
    newSearchParams.delete('filter_value[]');
    filterContent.forEach((filter) => {
      if (filter.values) {
        newSearchParams.append('filter_name[]', filter.name);
        newSearchParams.append('filter_value[]', filter.values);
      }
    });
    setSearchParams(newSearchParams);
  };

  const changeHandler = (values: string, name: string) => {
    const filter = filterContent.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          values,
        };
      }
      return item;
    });
    setFilterContent(filter);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      applyFilter(filter);
    }, 1000);
  };
  return (
    <div className="flex gap-[10px]">
      {filterContent.slice(0, 3).map((item, key) => (
        <div key={key}>
          {item.name !== 'id' && (
            <FloatingLabel controlId={item.name} label={item.name} className="form-icon-container">
              <Form.Control
                required
                value={item.values ?? ''}
                onChange={(e) => changeHandler(e.target.value, item.name)}
                type={item.type}
                placeholder={item.name}
              />
            </FloatingLabel>
          )}
        </div>
      ))}
      <Button
        variant="esfront-secondary"
        className="px-3 ms-2 relative"
        onClick={() => setOpenFilterModal(true)}
      >
        <FontAwesomeIcon icon={faFilter} transform="down-3" className="text-primary" />
        {(searchParams.getAll('filter_name[]') || []).length > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
        )}
      </Button>
      <FilterModal
        filterContent={filterContent}
        setFilterContent={setFilterContent}
        show={openFilterModal}
        handleClose={() => setOpenFilterModal(false)}
      />
    </div>
  );
};

export default FilterButton;
