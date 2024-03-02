import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n';
import AppProvider from '@/shared/providers/AppProvider';
import SettingsPanelProvider from '@/shared/providers/SettingsPanelProvider';
import BreakpointsProvider from '@/shared/providers/BreakpointsProvider';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/Routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <SettingsPanelProvider>
        <BreakpointsProvider>
          <RouterProvider router={router} />
        </BreakpointsProvider>
      </SettingsPanelProvider>
    </AppProvider>
  </React.StrictMode>,
);
