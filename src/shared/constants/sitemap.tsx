/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useAppSelector } from '@/store/hooks/redux';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  Icon,
  UilChartPie,
  UilUsersAlt,
  // UilCube,
  // UilDocumentLayoutRight,
  // UilFilesLandscapesAlt,
  // UilPuzzlePiece
} from '@iconscout/react-unicons';
import { useTranslation } from 'react-i18next';

type NewType = 'font-awesome';

export interface Route {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  icon?: IconProp | string | string[];
  iconSet?: NewType | 'feather' | 'unicons';
  pages?: Route[];
  path?: string;
  pathName?: string;
  flat?: boolean;
  topNavIcon?: string;
  dropdownInside?: boolean;
  active?: boolean;
  new?: boolean;
  hasNew?: boolean;
}

export interface RouteItems {
  label: string;
  horizontalNavLabel?: string;
  icon: Icon;
  labelDisabled?: boolean;
  pages: Route[];
  megaMenu?: boolean;
  active?: boolean;
}
const pathParts = window.location.pathname.split('/').filter(Boolean);
console.log(pathParts[0]);
const lang = pathParts[0] ? `/${pathParts[0]}` : '';

export const useGenerateRoutes = () => {
  const { t } = useTranslation();
  const { role } = useAppSelector((state) => state.userReducer);

  const adminRoutes: RouteItems[] = [
    {
      label: t('users'),
      active: true,
      icon: UilUsersAlt,
      pages: [
        {
          name: t('statuses'),
          active: true,
          icon: 'activity',
          pages: [
            {
              name: t('list'),
              path: `${lang}/admin/statuses`,
              active: true,
              icon: 'list',
            },
            {
              name: t('add'),
              path: `${lang}/admin/statuses/add`,
              active: true,
              icon: 'plus-square',
            },
          ],
        },
        {
          name: t('bots'),
          active: true,
          pages: [
            {
              name: t('list'),
              path: `${lang}/admin/bots`,
              active: true,
              icon: 'list',
            },
            {
              name: t('add'),
              path: `${lang}/admin/bots/add`,
              active: true,
              icon: 'plus-square',
            },
          ],
        },
        {
          name: t('verifications'),
          active: true,
          pages: [
            {
              name: t('verification-await'),
              path: `${lang}/admin/verification/await`,
              active: true,
            },
            {
              name: t('verification-closed'),
              path: `${lang}/admin/verification/closed`,
              active: true,
            },
          ],
        },
      ],
    },
    {
      label: t('finances'),
      active: true,
      icon: UilChartPie,
      pages: [
        {
          name: t('payment-gateways'),
          active: true,
          pages: [
            {
              name: t('list'),
              path: `${lang}/admin/finances/payment-gateways`,
              active: true,
              icon: 'list',
            },
            {
              name: t('add'),
              path: `${lang}/admin/finances/payment-gateways/add`,
              active: true,
              icon: 'plus-square',
            },
          ],
        },
        {
          name: t('withdrawal-gateways'),
          active: true,
          pages: [
            {
              name: t('list'),
              path: `${lang}/admin/finances/withdrawal-gateways`,
              active: true,
              icon: 'list',
            },
            {
              name: t('add'),
              path: `${lang}/admin/finances/withdrawal-gateways/add`,
              active: true,
              icon: 'plus-square',
            },
          ],
        },
        {
          name: t('payments-transactions'),
          active: true,
          path: `${lang}/admin/finances/payments-transactions`,
        },
        {
          name: t('withdrawal-transactions'),
          active: true,
          path: `${lang}/admin/finances/withdrawal-transactions`,
        },
      ],
    },
    {
      label: t('casinos'),
      active: true,
      icon: UilChartPie,
      pages: [
        {
          name: t('casino-urls'),
          active: true,
          pages: [
            {
              name: t('list'),
              path: `${lang}/admin/casino/url`,
              active: true,
              icon: 'list',
            },
            {
              name: t('add'),
              path: `${lang}/admin/casino/url/add`,
              active: true,
              icon: 'plus-square',
            },
          ],
        },
        {
          name: t('events'),
          active: true,
          pages: [
            {
              name: t('list'),
              path: `${lang}/admin/casino/events`,
              active: true,
              icon: 'list',
            },
            {
              name: t('add'),
              path: `${lang}/admin/casino/events/add`,
              active: true,
              icon: 'plus-square',
            },
            {
              name: t('event-groups'),
              active: true,
              pages: [
                {
                  name: t('list'),
                  path: `${lang}/admin/casino/events/group`,
                  active: true,
                  icon: 'list',
                },
                {
                  name: t('add'),
                  path: `${lang}/admin/casino/events/group/add`,
                  active: true,
                  icon: 'plus-square',
                },
              ],
            },
          ],
        },
        {
          name: t('bonuses'),
          active: true,
          path: `${lang}/admin/casino/bonuses`,
        },
      ],
    },
    {
      label: t('affiliate'),
      active: true,
      icon: UilChartPie,
      pages: [
        {
          name: t('affiliate-medias'),
          active: true,
          pages: [
            {
              name: t('list'),
              path: `${lang}/admin/affiliate/medias`,
              active: true,
              icon: 'list',
            },
            {
              name: t('add'),
              path: `${lang}/admin/affiliate/medias/add`,
              active: true,
              icon: 'plus-square',
            },
          ],
        },
        {
          name: t('affiliate-offers'),
          active: true,
          pages: [
            {
              name: t('list'),
              path: `${lang}/admin/affiliate/offers`,
              active: true,
              icon: 'list',
            },
            {
              name: t('add'),
              path: `${lang}/admin/affiliate/offers/add`,
              active: true,
              icon: 'plus-square',
            },
          ],
        },
      ],
    },
    {
      label: t('games'),
      active: true,
      icon: UilChartPie,
      pages: [
        {
          name: t('list'),
          active: true,
          path: `${lang}/admin/games`,
          icon: 'list',
        },
        {
          name: t('game-providers'),
          active: true,
          pages: [
            {
              name: t('list'),
              path: `${lang}/admin/games/providers`,
              active: true,
              icon: 'list',
            },
            {
              name: t('add'),
              path: `${lang}/admin/games/providers/add`,
              active: true,
              icon: 'plus-square',
            },
          ],
        },
        {
          name: t('categories'),
          active: true,
          pages: [
            {
              name: t('list'),
              path: `${lang}/admin/games/categories`,
              active: true,
              icon: 'list',
            },
            {
              name: t('add'),
              path: `${lang}/admin/games/categories/add`,
              active: true,
              icon: 'plus-square',
            },
          ],
        },
        {
          name: t('vendors'),
          active: true,
          pages: [
            {
              name: t('list'),
              path: `${lang}/admin/games/vendors`,
              active: true,
              icon: 'list',
            },
            {
              name: t('add'),
              path: `${lang}/admin/games/vendors/add`,
              active: true,
              icon: 'plus-square',
            },
          ],
        },
      ],
    },
    {
      label: t('settings'),
      active: true,
      icon: UilChartPie,
      pages: [
        {
          name: t('general'),
          path: `${lang}/admin/settings`,
          active: true,
        },
        {
          name: t('auth'),
          path: `${lang}/admin/settings/auth`,
          active: true,
        },
        {
          name: t('profile'),
          path: `${lang}/admin/settings/profile`,
          active: true,
        },
        {
          name: t('affiliate'),
          path: `${lang}/admin/settings/affiliate`,
          active: true,
        },
        {
          name: t('finances'),
          path: `${lang}/admin/settings/finances`,
          active: true,
        },
        {
          name: t('verifications'),
          path: `${lang}/admin/settings/verification`,
          active: true,
        },
        {
          name: t('bots'),
          path: `${lang}/admin/settings/bots`,
          active: true,
        },
        {
          name: 'API',
          path: `${lang}/admin/settings/api`,
          active: true,
        },
        {
          name: t('currency-converstion'),
          path: `${lang}/admin/settings/currency-conversion`,
          active: true,
        },
        {
          name: t('notifications'),
          path: `${lang}/admin/settings/notifications`,
          active: true,
        },
      ],
    },
    {
      label: t('other'),
      active: true,
      icon: UilChartPie,
      pages: [
        {
          name: t('slider'),
          active: true,
          pages: [
            {
              name: t('list'),
              path: `${lang}/admin/other/slider`,
              active: true,
              icon: 'list',
            },
            {
              name: t('add'),
              path: `${lang}/admin/other/slider/add`,
              active: true,
              icon: 'plus-square',
            },
          ],
        },
        {
          name: t('email'),
          path: `${lang}/admin/other/email`,
          active: true,
        },
        {
          name: t('support-chat'),
          path: `${lang}/admin/other/support-chat`,
          active: true,
        },
      ],
    },
  ];

  const routes: RouteItems[] = [
    {
      label: 'Escasino',
      active: true,
      icon: UilChartPie,
      pages: [
        {
          name: t('games'),
          icon: 'pie-chart',
          active: true,
          pages: [
            {
              name: t('list'),
              path: `${lang}/games`,
              pathName: 'games-list',
              active: true,
            },
          ],
        },
        {
          name: t('casinos'),
          icon: 'pie-chart',
          active: true,
          pages: [
            {
              name: t('list'),
              path: `${lang}/casinos`,
              pathName: 'casinos-list',
              active: true,
            },
            {
              name: t('add'),
              path: `${lang}/casinos/add`,
              pathName: 'casinos-add',
              active: true,
            },
          ],
        },
        {
          name: t('currencies'),
          icon: 'pie-chart',
          active: true,
          pages: [
            {
              name: t('list'),
              path: `${lang}/currencies`,
              pathName: 'currencies-list',
              active: true,
            },
            {
              name: t('add'),
              path: `${lang}/currencies/add`,
              pathName: 'currencies-add',
              active: true,
            },
          ],
        },
      ],
    },
  ];

  if (role === 2) {
    return adminRoutes;
  }

  return routes;
};
