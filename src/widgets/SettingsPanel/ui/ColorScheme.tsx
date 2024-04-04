import { useAppContext } from '@/shared/providers/AppProvider';
import { ChangeEvent } from 'react';
import { Col, Row } from 'react-bootstrap';
import defaultLight from '@/shared/assets/images/generic/default-light.png';
import defaultDark from '@/shared/assets/images/generic/default-dark.png';
import RadioItem from './RadioItem';
import { ThemeVariant } from '@/shared/config/config';
import { useTranslation } from 'react-i18next';

const ColorScheme = () => {
  const { t } = useTranslation();
  const {
    config: { theme },
    setConfig,
  } = useAppContext();

  const handleThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfig({
      theme: value as ThemeVariant,
    });
  };

  return (
    <div className="setting-panel-item mt-0">
      <h5 className="setting-panel-item-title">{t('color-scheme')}</h5>
      <Row className="gx-2">
        <Col xs={6}>
          <RadioItem
            label={t('light')}
            name="theme"
            value="light"
            thumb={defaultLight}
            checked={theme === 'light'}
            handleChange={handleThemeChange}
          />
        </Col>
        <Col xs={6}>
          <RadioItem
            label={t('dark')}
            name="theme"
            value="dark"
            thumb={defaultDark}
            checked={theme === 'dark'}
            handleChange={handleThemeChange}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ColorScheme;
