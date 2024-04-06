import React from 'react';

import { FormGenerator, IFormItem } from '@/features/FormGenerator';
import ContentLayout from '@/shared/layout/ContentLayout';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dataEditApi } from '../api/api';

const CasinoAddEvent = () => {
  const { t } = useTranslation();
  const [data] = useState<IFormItem[]>([
    {
      name: 'name',
      placeholder: 'name',
      label: 'name',
      required: true,
    },
    {
      name: 'chat_is_admin_message',
      placeholder: 'chat_is_admin_message',
      label: t('chat_is_admin_message'),
      type: 'switch',
      required: true,
    },
    {
      name: 'chat_is_bot_message',
      placeholder: 'chat_is_bot_message',
      label: t('chat_is_bot_message'),
      type: 'switch',
      required: true,
    },
    {
      name: 'has_active_bonus',
      placeholder: 'has_active_bonus',
      label: t('has_active_bonus'),
      type: 'switch',
      required: true,
    },
    {
      name: 'has_inactive_bonus',
      placeholder: 'has_inactive_bonus',
      label: t('has_inactive_bonus'),
      type: 'switch',
      required: true,
    },
    {
      name: 'is_first_payment',
      placeholder: 'is_first_payment',
      label: t('is_first_payment'),
      type: 'switch',
      required: true,
    },
    {
      name: 'is_first_withdraw',
      placeholder: 'is_first_withdraw',
      label: t('is_first_withdraw'),
      type: 'switch',
      required: true,
    },
    {
      name: 'is_real_payment',
      placeholder: 'is_real_payment',
      label: t('is_real_payment'),
      type: 'switch',
      required: true,
    },
    {
      name: 'is_real_withdraw',
      placeholder: 'is_real_withdraw',
      label: t('is_real_withdraw'),
      type: 'switch',
      required: true,
    },
    {
      name: 'is_system_payment',
      placeholder: 'is_system_payment',
      label: t('is_system_payment'),
      type: 'switch',
      required: true,
    },
    {
      name: 'is_system_withdraw',
      placeholder: 'is_system_withdraw',
      label: t('is_system_withdraw'),
      type: 'switch',
      required: true,
    },
    {
      name: 'payments_has_bonus',
      placeholder: 'payments_has_bonus',
      label: t('payments_has_bonus'),
      type: 'switch',
      required: true,
    },
    {
      name: 'reuse',
      placeholder: 'reuse',
      label: t('reuse'),
      type: 'switch',
      required: true,
    },
    {
      name: 'trigger',
      placeholder: 'trigger',
      label: t('trigger'),
      type: 'switch',
      required: true,
    },
    {
      name: 'use_games_ids_in_specials',
      placeholder: 'use_games_ids_in_specials',
      label: t('use_games_ids_in_specials'),
      type: 'switch',
      required: true,
    },
  ]);

  return (
    <ContentLayout title={t('casino-events-add')}>
      <FormGenerator
        id={0}
        navigateTo="admin/casino/url/edit/"
        api={dataEditApi()}
        formItems={data}
      />
    </ContentLayout>
  );
};

export default CasinoAddEvent;
