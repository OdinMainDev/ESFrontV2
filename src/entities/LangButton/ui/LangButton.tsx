import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

const LangButton = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const changeLanguage = (lang: string) => {
    void i18n.changeLanguage(lang);
    navigate(`${location.pathname.replace(/^\/[a-z]{2}\//, `/${lang}/`)}`, { replace: true });
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        size="sm"
        variant="phenix-secondary"
        className="flex-shrink-0 dropdown-caret-none"
      >
        <FontAwesomeIcon icon={faLanguage} size="xl" />
      </Dropdown.Toggle>
      <Dropdown.Menu className="min-w-0 w-24	px-[0.5rem]">
        <Dropdown.Item onClick={() => changeLanguage('ru')}>RU</Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage('en')}>EN</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LangButton;
