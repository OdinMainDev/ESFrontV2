import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@/shared/ui/Button';
import { useAppContext } from '@/shared/providers/AppProvider';
import { Offcanvas } from 'react-bootstrap';
import NavigationType from './NavigationType';
import HorizontalNavbarShape from './HorizontalNavbarShape';
import ColorScheme from './ColorScheme';
import VerticalNavbarAppearance from './VerticalNavbarAppearance';
import TopNavbarAppearance from './TopNavbarAppearance';
import RTLMode from './RTLMode';
import { useSettingsPanelContext } from '@/shared/providers/SettingsPanelProvider';
import { faArrowsRotate, faPalette, faTimes } from '@fortawesome/free-solid-svg-icons';
import ChatWidgetVisibility from './ChatWidgetVisibility';
import { RESET } from '@/shared/reducers/ConfigReducer';
import { useTranslation } from 'react-i18next';

const SettingsPanel = () => {
  const { configDispatch } = useAppContext();
  const { t } = useTranslation();

  const {
    settingsPanelConfig: { openSettingPanel, disableResetButton },
    setSettingsPanelConfig,
  } = useSettingsPanelContext();

  const handleClose = () => {
    setSettingsPanelConfig({
      openSettingPanel: !openSettingPanel,
    });
  };
  const handleResetToDefault = () => {
    configDispatch({
      type: RESET,
    });
  };

  return (
    <Offcanvas
      className="settings-panel border-0"
      show={openSettingPanel}
      onHide={handleClose}
      placement="end"
    >
      <Offcanvas.Header className="align-items-start border-bottom flex-column">
        <div className="pt-1 w-100 mb-6 d-flex justify-content-between align-items-start">
          <div>
            <h5 className="mb-2 me-2 lh-sm">
              <FontAwesomeIcon icon={faPalette} className="me-2 fs-8" />
              {t('theme-customizer')}
            </h5>
            <p className="mb-0 fs-9">{t('theme-customizer-description')}</p>
          </div>
          <button className="btn p-1 fw-bolder" onClick={handleClose}>
            <FontAwesomeIcon icon={faTimes} className="fs-8" />
          </button>
        </div>
        <Button
          variant="esfront-secondary"
          className="w-100"
          onClick={handleResetToDefault}
          disabled={disableResetButton}
        >
          <FontAwesomeIcon icon={faArrowsRotate} className="me-2 fs-10" />
          {t('reset-to-default')}
        </Button>
      </Offcanvas.Header>
      <Offcanvas.Body className="px-card scrollbar">
        <ColorScheme />
        <ChatWidgetVisibility />
        <NavigationType />
        <VerticalNavbarAppearance />
        <HorizontalNavbarShape />
        <TopNavbarAppearance className="mb-5" />
        <RTLMode />
        <Button
          onClick={handleClose}
          className="w-100 mb-3 text-white dark__text-100"
          variant="primary"
        >
          {t('save-and-close')}
        </Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SettingsPanel;
