import { useAppContext } from '@/shared/providers/AppProvider';
import { ChangeEvent } from 'react';
import { Col, Row } from 'react-bootstrap';
import topDefault from '@/shared/assets/images/generic/top-default.png';
import topDefaultDark from '@/shared/assets/images/generic/top-default-dark.png';
import topSlim from '@/shared/assets/images/generic/top-slim.png';
import topSlimDark from '@/shared/assets/images/generic/top-slim-dark.png';
import RadioItem from './RadioItem';
import { NavTopShapeVariant } from '@/shared/config/config';
import { WarningMessage } from '@/entities/WarningMessage';
import { useSettingsPanelContext } from '@/shared/providers/SettingsPanelProvider';
import { useTranslation } from 'react-i18next';

const HorizontalNavbarShape = () => {
  const { t } = useTranslation();
  const {
    config: { theme, navbarTopShape },
    setConfig,
  } = useAppContext();

  const {
    settingsPanelConfig: { disableHorizontalNavbarShape },
  } = useSettingsPanelContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfig({
      navbarTopShape: value as NavTopShapeVariant,
    });
  };

  return (
    <div className="setting-panel-item">
      <h5 className="setting-panel-item-title">{t('horizontal-navbar-shape')}</h5>
      <Row className="gx-2">
        <Col xs={6}>
          <RadioItem
            label={t('default')}
            name="top-nav-shape"
            value="default"
            thumb={theme === 'light' ? topDefault : topDefaultDark}
            checked={navbarTopShape === 'default'}
            handleChange={handleChange}
            disabled={disableHorizontalNavbarShape}
          />
        </Col>
        <Col xs={6}>
          <RadioItem
            label={t('slim')}
            name="top-nav-shape"
            value="slim"
            thumb={theme === 'light' ? topSlim : topSlimDark}
            checked={navbarTopShape === 'slim'}
            handleChange={handleChange}
            disabled={disableHorizontalNavbarShape}
          />
        </Col>
      </Row>
      {disableHorizontalNavbarShape && (
        <WarningMessage message="You can't update horizontal navbar shape here" />
      )}
    </div>
  );
};

export default HorizontalNavbarShape;
