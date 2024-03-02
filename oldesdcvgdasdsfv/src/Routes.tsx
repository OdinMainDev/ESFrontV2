import MainLayout from 'layouts/MainLayout';
import { RouteObject, createBrowserRouter } from 'react-router-dom';
import MainLayoutProvider from 'providers/MainLayoutProvider';
import Error404 from 'pages/error/Error404';
import Error403 from 'pages/error/Error403';
import Error500 from 'pages/error/Error500';
import SimpleSignIn from 'pages/pages/authentication/SignIn';
import App from 'App';
import ComingSoon from 'pages/pages/ComingSoon';

const routes: RouteObject[] = [
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <MainLayoutProvider>
            <MainLayout />
          </MainLayoutProvider>
        ),
        children: [
          {
            index: true,
            element: <ComingSoon />
          }
        ]
      },
      {
        path: '/pages/errors/',
        children: [
          {
            path: '404',
            element: <Error404 />
          },
          {
            path: '403',
            element: <Error403 />
          },
          {
            path: '500',
            element: <Error500 />
          }
        ]
      },
      {
        path: '/auth/',
        children: [
          {
            path: 'sign-in',
            element: <SimpleSignIn />
          }
        ]
      },

      {
        path: '*',
        element: <Error404 />
      }
    ]
  }
];

export const router = createBrowserRouter(routes);

export default routes;
