import MainLayout from './layout/MainLayout';
import { RouteObject, createBrowserRouter } from 'react-router-dom';
import MainLayoutProvider from '@/shared/providers/MainLayoutProvider';
import Error404 from '@/pages/errors/Error404';
import Error403 from '@/pages/errors/Error403';
import Error500 from '@/pages/errors/Error500';
import { Auth } from '@/pages/Auth';
import App from './App';
import { ComingSoon } from '@/pages/ComingSoon';
import { GamesEdit, GamesList } from '@/pages/dev/Games';
import { CasinoAdd, CasinoEdit, CasinoList } from '@/pages/dev/CasinoList';
import { CurrenciesAdd, CurrenciesEdit, CurrenciesList } from '@/pages/dev/CurrenciesList';
import ProtectedRouteProvider from './provider/ProtectedRouteProvider';
import NotFounded from '@/pages/errors/404';
import { StatusesAdd, StatusesEdit, StatusesList } from '@/pages/admin/users/Statuses';
import { BotsAdd, BotsEdit, BotsList } from '@/pages/admin/users/Bots';
import { VerificationAwait, VerificationClosed } from '@/pages/admin/users/Verification';
import {
  PaymentGatewaysAdd,
  PaymentGatewaysEdit,
  PaymentGatewaysList,
} from '@/pages/admin/finance/PaymentGateways';
import {
  WithdrawalGatewaysAdd,
  WithdrawalGatewaysEdit,
  WithdrawalGatewaysList,
} from '@/pages/admin/finance/WithdrawalGateways';
import {
  PaymentTransactionsEdit,
  PaymentTransactionsList,
} from '@/pages/admin/finance/PaymentTransactions';
import {
  WithdrawalTransactionsEdit,
  WithdrawalTransactionsList,
} from '@/pages/admin/finance/WithdrawalTransactions';
import { CasinoUrlAdd, CasinoUrlEdit, CasinoUrlList } from '@/pages/admin/casino/CasinoUrl';
import {
  CasinoEventsAdd,
  CasinoEventsGroupAdd,
  CasinoEventsGroupList,
  CasinoEventsList,
} from '@/pages/admin/casino/CasinoEvents';
import { BonusesList } from '@/pages/admin/casino/Bonuses';
import { MediasAdd, MediasList } from '@/pages/admin/affiliate/Medias';
import { OffersAdd, OffersList } from '@/pages/admin/affiliate/Offers';
import { AdminGamesList } from '@/pages/admin/games/Games';
import { ProvidersAdd, ProvidersList } from '@/pages/admin/games/Providers';
import { CategoriesAdd, CategoriesList } from '@/pages/admin/games/Categories';
import { VendorsAdd, VendorsList } from '@/pages/admin/games/Vendors';
import { Main } from '@/pages/admin/settings/Main';
import { AdminAuth } from '@/pages/admin/settings/Auth';
import { Profile } from '@/pages/admin/settings/Profile';
import { Affiliate } from '@/pages/admin/settings/Affiliate';
import { Finances } from '@/pages/admin/settings/Finances';
import { Verification } from '@/pages/admin/settings/Verification';
import { Bots } from '@/pages/admin/settings/Bots';
import { Api } from '@/pages/admin/settings/Api';
import { CurrencyConversion } from '@/pages/admin/settings/CurrencyConversion';
import { Notifications } from '@/pages/admin/settings/Notifications';
import { SliderAdd, SliderList } from '@/pages/admin/other/Slider';
import { Email } from '@/pages/admin/other/Email';
import { SupportChat } from '@/pages/admin/other/SupportChat';
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
                  {
                    path: 'edit/:id',
                    element: <GamesEdit />,
                  },
                ],
              },
              {
                path: 'casinos',
                children: [
                  {
                    index: true,
                    element: <CasinoList />,
                  },
                  {
                    path: 'add',
                    element: <CasinoAdd />,
                  },
                  {
                    path: 'edit/:id',
                    element: <CasinoEdit />,
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
                  {
                    path: 'add',
                    element: <CurrenciesAdd />,
                  },
                  {
                    path: 'edit/:id',
                    element: <CurrenciesEdit />,
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
        path: 'admin',
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
            path: 'statuses',
            children: [
              {
                index: true,
                element: <StatusesList />,
              },
              {
                path: 'add',
                element: <StatusesAdd />,
              },
              {
                path: 'edit/:id',
                element: <StatusesEdit />,
              },
            ],
          },
          {
            path: 'bots',
            children: [
              {
                index: true,
                element: <BotsList />,
              },
              {
                path: 'add',
                element: <BotsAdd />,
              },
              {
                path: 'edit/:id',
                element: <BotsEdit />,
              },
            ],
          },
          {
            path: 'verification',
            children: [
              {
                path: 'await',
                element: <VerificationAwait />,
              },
              {
                path: 'closed',
                element: <VerificationClosed />,
              },
            ],
          },
          {
            path: 'finances',
            children: [
              {
                path: 'payment-gateways',
                children: [
                  {
                    index: true,
                    element: <PaymentGatewaysList />,
                  },
                  {
                    path: 'add',
                    element: <PaymentGatewaysAdd />,
                  },
                  {
                    path: 'edit/:id',
                    element: <PaymentGatewaysEdit />,
                  },
                ],
              },
              {
                path: 'withdrawal-gateways',
                children: [
                  {
                    index: true,
                    element: <WithdrawalGatewaysList />,
                  },
                  {
                    path: 'add',
                    element: <WithdrawalGatewaysAdd />,
                  },
                  {
                    path: 'edit/:id',
                    element: <WithdrawalGatewaysEdit />,
                  },
                ],
              },
              {
                path: 'payments-transactions',
                children: [
                  {
                    index: true,
                    element: <PaymentTransactionsList />,
                  },
                  {
                    path: 'edit/:id',
                    element: <PaymentTransactionsEdit />,
                  },
                ],
              },
              {
                path: 'withdrawal-transactions',
                children: [
                  {
                    index: true,
                    element: <WithdrawalTransactionsList />,
                  },
                  {
                    path: 'edit/:id',
                    element: <WithdrawalTransactionsEdit />,
                  },
                ],
              },
            ],
          },
          {
            path: 'casino',
            children: [
              {
                path: 'url',
                children: [
                  {
                    index: true,
                    element: <CasinoUrlList />,
                  },
                  {
                    path: 'edit/:id',
                    element: <CasinoUrlEdit />,
                  },
                  {
                    path: 'add',
                    element: <CasinoUrlAdd />,
                  },
                ],
              },
              {
                path: 'events',
                children: [
                  {
                    index: true,
                    element: <CasinoEventsList />,
                  },
                  {
                    path: 'add',
                    element: <CasinoEventsAdd />,
                  },
                ],
              },
              {
                path: 'events/group',
                children: [
                  {
                    index: true,
                    element: <CasinoEventsGroupList />,
                  },
                  {
                    path: 'add',
                    element: <CasinoEventsGroupAdd />,
                  },
                ],
              },
              {
                path: 'bonuses',
                children: [
                  {
                    index: true,
                    element: <BonusesList />,
                  },
                ],
              },
            ],
          },
          {
            path: 'affiliate',
            children: [
              {
                path: 'medias',
                children: [
                  {
                    index: true,
                    element: <MediasList />,
                  },
                  {
                    path: 'add',
                    element: <MediasAdd />,
                  },
                ],
              },
              {
                path: 'offers',
                children: [
                  {
                    index: true,
                    element: <OffersList />,
                  },
                  {
                    path: 'add',
                    element: <OffersAdd />,
                  },
                ],
              },
            ],
          },
          {
            path: 'games',
            children: [
              {
                index: true,
                element: <AdminGamesList />,
              },
              {
                path: 'providers',
                children: [
                  {
                    index: true,
                    element: <ProvidersList />,
                  },
                  {
                    path: 'add',
                    element: <ProvidersAdd />,
                  },
                ],
              },
              {
                path: 'categories',
                children: [
                  {
                    index: true,
                    element: <CategoriesList />,
                  },
                  {
                    path: 'add',
                    element: <CategoriesAdd />,
                  },
                ],
              },
              {
                path: 'vendors',
                children: [
                  {
                    index: true,
                    element: <VendorsList />,
                  },
                  {
                    path: 'add',
                    element: <VendorsAdd />,
                  },
                ],
              },
            ],
          },
          {
            path: 'settings',
            children: [
              {
                index: true,
                element: <Main />,
              },
              {
                path: 'auth',
                element: <AdminAuth />,
              },
              {
                path: 'profile',
                element: <Profile />,
              },
              {
                path: 'affiliate',
                element: <Affiliate />,
              },
              {
                path: 'finances',
                element: <Finances />,
              },
              {
                path: 'verification',
                element: <Verification />,
              },
              {
                path: 'bots',
                element: <Bots />,
              },
              {
                path: 'api',
                element: <Api />,
              },
              {
                path: 'currency-conversion',
                element: <CurrencyConversion />,
              },
              {
                path: 'notifications',
                element: <Notifications />,
              },
            ],
          },
          {
            path: 'other',
            children: [
              {
                path: 'slider',
                children: [
                  {
                    index: true,
                    element: <SliderList />,
                  },
                  {
                    path: 'add',
                    element: <SliderAdd />,
                  },
                ],
              },
              {
                path: 'email',
                element: <Email />,
              },
              {
                path: 'support-chat',
                element: <SupportChat />,
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
