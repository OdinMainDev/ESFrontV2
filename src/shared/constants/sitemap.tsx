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
      label: t('Users'),
      active: true,
      icon: UilUsersAlt,
      pages: [
        {
          name: t('Statuses'),
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
          name: t('Bots'),
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
          name: t('Verifications'),
          active: true,
          pages: [
            {
              name: t('VerificationAwait'),
              path: `${lang}/admin/verification/await`,
              active: true,
            },
            {
              name: t('VerificationClosed'),
              path: `${lang}/admin/verification/closed`,
              active: true,
            },
          ],
        },
      ],
    },
    {
      label: t('Finances'),
      active: true,
      icon: UilChartPie,
      pages: [
        {
          name: t('PaymentGateways'),
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
          name: t('WithdrawalGateways'),
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
          name: t('PaymentsTransactions'),
          active: true,
          path: `${lang}/admin/finances/payments-transactions`,
        },
        {
          name: t('WithdrawalTransactions'),
          active: true,
          path: `${lang}/admin/finances/withdrawal-transactions`,
        },
      ],
    },
    {
      label: t('Casino'),
      active: true,
      icon: UilChartPie,
      pages: [
        {
          name: t('CasinoUrls'),
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
          name: t('Events'),
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
              name: t('EventGroups'),
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
          name: t('Bonuses'),
          active: true,
          path: `${lang}/admin/casino/bonuses`,
        },
      ],
    },
    {
      label: t('Affiliate'),
      active: true,
      icon: UilChartPie,
      pages: [
        {
          name: t('AffiliateMedias'),
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
          name: t('AffiliateOffers'),
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
      label: t('Games'),
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
          name: t('GameProviders'),
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
          name: t('GameCategories'),
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
          name: t('GameVendors'),
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
      label: t('Settings'),
      active: true,
      icon: UilChartPie,
      pages: [
        {
          name: t('SettingsGeneral'),
          path: `${lang}/admin/settings`,
          active: true,
        },
        {
          name: t('SettingsAuth'),
          path: `${lang}/admin/settings/auth`,
          active: true,
        },
        {
          name: t('SettingsProfile'),
          path: `${lang}/admin/settings/profile`,
          active: true,
        },
        {
          name: t('SettingsAffiliate'),
          path: `${lang}/admin/settings/affiliate`,
          active: true,
        },
        {
          name: t('SettingsFinances'),
          path: `${lang}/admin/settings/finances`,
          active: true,
        },
        {
          name: t('SettingsVerification'),
          path: `${lang}/admin/settings/verification`,
          active: true,
        },
        {
          name: t('SettingsBots'),
          path: `${lang}/admin/settings/bots`,
          active: true,
        },
        {
          name: t('SettingsApi'),
          path: `${lang}/admin/settings/api`,
          active: true,
        },
        {
          name: t('SettingsCurrencyConversion'),
          path: `${lang}/admin/settings/currency-conversion`,
          active: true,
        },
        {
          name: t('SettingsNotifications'),
          path: `${lang}/admin/settings/notifications`,
          active: true,
        },
      ],
    },
    {
      label: t('Other'),
      active: true,
      icon: UilChartPie,
      pages: [
        {
          name: t('Slider'),
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
          name: t('Email'),
          path: `${lang}/admin/other/email`,
          active: true,
        },
        {
          name: t('SupportChat'),
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
