import Button from '@/shared/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

interface IProps {
  show: boolean;
  handleClose: () => void;
  deleteUrl: string;
  id: number;
}

const TableDeleteModal = ({ show, handleClose, deleteUrl, id }: IProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const deleteHandler = () => {
    setLoading(true);
    void axios
      .post(
        deleteUrl,
        {
          id,
        },
        {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('token'),
          },
        },
      )
      .then(() => {
        handleClose();
        window.location.reload();
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Modal show={show} onHide={handleClose} className="p-0" centered contentClassName="border">
      <Modal.Header className="flex justify-between border-200 p-4">
        <h5 className="modal-title text-1000 fs-6 lh-sm">{t('sure-delete')}</h5>
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
      <Modal.Footer className="d-flex justify-content-end align-items-center px-4 pb-4 border-0 pt-3">
        <Button
          variant="danger"
          className="px-4 fs-9 my-0"
          loading={loading}
          loadingPosition="start"
          onClick={deleteHandler}
          startIcon={<FontAwesomeIcon icon={faTrashCan} className="me-2 fs-10" />}
        >
          {t('delete')}
        </Button>
        <Button
          loading={loading}
          loadingPosition="start"
          variant="primary"
          className="px-8 fs-9 my-0"
          onClick={handleClose}
        >
          {t('close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TableDeleteModal;
