import MainLayout from './layout/MainLayout';
import { RouteObject, createBrowserRouter } from 'react-router-dom';
import MainLayoutProvider from '@/shared/providers/MainLayoutProvider';
import Error404 from '@/pages/errors/Error404';
import Error403 from '@/pages/errors/Error403';
import Error500 from '@/pages/errors/Error500';
import { Auth } from '@/pages/Auth';
import App from './App';
import { ComingSoon } from '@/pages/ComingSoon';

const routes: RouteObject[] = [
  {
    element: <App />,
    path: '/:lang',
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
      {
        path: 'auth',
        children: [
          {
            path: 'sign-in/:api_key',
            element: <Auth />,
          },
        ],
      },
      {
        path: '*',
        element: <Error404 />,
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
