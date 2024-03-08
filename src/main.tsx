import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n';
import AppProvider from '@/shared/providers/AppProvider';
import SettingsPanelProvider from '@/shared/providers/SettingsPanelProvider';
import BreakpointsProvider from '@/shared/providers/BreakpointsProvider';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/Routes';
import { Providers } from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Providers>
    <AppProvider>
      <SettingsPanelProvider>
        <BreakpointsProvider>
          <RouterProvider router={router} />
        </BreakpointsProvider>
      </SettingsPanelProvider>
    </AppProvider>
  </Providers>,
);
