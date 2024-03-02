import { SettingsToggle, SettingsPanel } from '@/widgets/SettingsPanel';
import { useAppContext } from '@/shared/providers/AppProvider';
import { useSettingsPanelContext } from '@/shared/providers/SettingsPanelProvider';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './assets/styles/global.scss';
import LangProvider from './provider/LangProvider';

const App = () => {
  const { pathname } = useLocation();

  const {
    settingsPanelConfig: { showSettingPanelButton },
    setSettingsPanelConfig,
  } = useSettingsPanelContext();

  const {
    config: { isRTL },
  } = useAppContext();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setSettingsPanelConfig({
      openSettingPanel: false,
    });
  }, [isRTL]);

  return (
    <LangProvider>
      <Outlet />
      {showSettingPanelButton && (
        <>
          <SettingsToggle />
          <SettingsPanel />
        </>
      )}
    </LangProvider>
  );
};

export default App;
