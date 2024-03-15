import Button from '@/shared/ui/Button';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import FilterModal from './FilterModal';
import Cookies from 'js-cookie';
import axios from 'axios';
import { IFilterItem } from '../models/filter';
import { useSearchParams } from 'react-router-dom';
import { updateFiltersWithValues } from '../helpers/updateFiltersWithValues';

interface IProps {
  url: string;
}

const FilterButton = ({ url }: IProps) => {
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [filterContent, setFilterContent] = useState<IFilterItem[]>([]);
  const [searchParams] = useSearchParams();

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

  return (
    <div>
      <Button
        variant="esfront-secondary"
        className="px-3 ms-2"
        onClick={() => setOpenFilterModal(true)}
      >
        <FontAwesomeIcon icon={faFilter} transform="down-3" className="text-primary" />
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
