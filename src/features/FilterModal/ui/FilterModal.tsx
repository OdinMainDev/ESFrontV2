import Button from '@/shared/ui/Button';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FloatingLabel, Form, Modal } from 'react-bootstrap';
import { IFilterItem } from '../models/filter';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface IProps {
  show: boolean;
  handleClose: () => void;
  filterContent: IFilterItem[];
  setFilterContent: React.Dispatch<React.SetStateAction<IFilterItem[]>>;
}

const FilterModal = ({ show, handleClose, filterContent, setFilterContent }: IProps) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const changeHandler = (values: string, name: string) => {
    setFilterContent((prev) =>
      prev.map((item) => {
        if (item.name === name) {
          return {
            ...item,
            values,
          };
        }
        return item;
      }),
    );
  };

  const resetHandler = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('filter_name[]');
    newSearchParams.delete('filter_value[]');
    setSearchParams(newSearchParams);
    setFilterContent((prev) =>
      prev.map((item) => ({
        ...item,
        values: '',
      })),
    );
    handleClose();
  };

  const applyFilter = () => {
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
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} className="p-0" centered contentClassName="border">
      <Modal.Header className="flex justify-between border-200 p-4">
        <h5 className="modal-title text-1000 fs-6 lh-sm">{t('filter')}</h5>
        <Button className="p-1" onClick={handleClose}>
          <svg
            className="svg-inline--fa fa-xmark fs--1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              fill="currentColor"
              d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
            ></path>
          </svg>
        </Button>
      </Modal.Header>
      <Modal.Body className="pt-4 pb-2 px-4">
        {filterContent.map((item, key) => (
          <div className="mb-3" key={key}>
            <FloatingLabel controlId={item.name} label={item.name} className="form-icon-container">
              <Form.Control
                required
                value={item.values ?? ''}
                onChange={(e) => changeHandler(e.target.value, item.name)}
                type={item.type}
                placeholder={item.name}
              />
            </FloatingLabel>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end align-items-center px-4 pb-4 border-0 pt-3">
        <Button
          variant="esfront-primary"
          size="sm"
          className="px-4 fs-10 my-0"
          onClick={resetHandler}
          startIcon={<FontAwesomeIcon icon={faArrowsRotate} className="me-2 fs-10" />}
        >
          {t('reset')}
        </Button>
        <Button variant="primary" size="sm" className="px-9 fs-9 my-0" onClick={applyFilter}>
          {t('done')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;
