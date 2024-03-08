import MainLayout from './layout/MainLayout';
import { RouteObject, createBrowserRouter } from 'react-router-dom';
import MainLayoutProvider from '@/shared/providers/MainLayoutProvider';
import Error404 from '@/pages/errors/Error404';
import Error403 from '@/pages/errors/Error403';
import Error500 from '@/pages/errors/Error500';
import { Auth } from '@/pages/Auth';
import App from './App';
import { ComingSoon } from '@/pages/ComingSoon';
import { GamesList } from '@/pages/dev/Games';
import { CasinoList } from '@/pages/dev/CasinoList';
import { CurrenciesList } from '@/pages/dev/CurrenciesList';
import ProtectedRouteProvider from './provider/ProtectedRouteProvider';
import NotFounded from '@/pages/errors/404';

const routes: RouteObject[] = [
  {
    element: <App />,
    path: '/:lang',
    children: [
      {
        element: <ProtectedRouteProvider />,
        children: [
          {
            element: (
              <MainLayoutProvider>
                <MainLayout />
              </MainLayoutProvider>
            ),
            children: [
              {
                index: true,
                element: <ComingSoon />,
              },
              {
                path: 'games',
                children: [
                  {
                    index: true,
                    element: <GamesList />,
                  },
                ],
              },
              {
                path: 'casino',
                children: [
                  {
                    index: true,
                    element: <CasinoList />,
                  },
                ],
              },
              {
                path: 'currencies',
                children: [
                  {
                    index: true,
                    element: <CurrenciesList />,
                  },
                ],
              },
            ],
          },
          {
            path: 'errors',
            children: [
              {
                path: '404',
                element: <Error404 />,
              },
              {
                path: '403',
                element: <Error403 />,
              },
              {
                path: '500',
                element: <Error500 />,
              },
            ],
          },
        ],
      },
      {
        path: 'auth',
        children: [
          {
            path: 'sign-in',
            element: <Auth />,
            children: [
              {
                path: ':api_key',
                element: <Auth />,
              },
            ],
          },
        ],
      },
      {
        path: '404',
        element: <NotFounded />,
      },
    ],
  },
  {
    path: '*',
    element: <App />,
  },
];
export const router = createBrowserRouter(routes);

export default routes;
