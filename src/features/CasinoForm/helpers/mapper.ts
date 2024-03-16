import { ICasino } from '@/shared/models/interfaces/casinos';
import { ICasinoFormData } from '../models/interface';

export const resDataToState = (casinoData: ICasino): ICasinoFormData => {
  return {
    name: casinoData.name,
    id: casinoData.id,
    apikey: casinoData.token,
    is_enabled: casinoData.is_enabled,
    languages: casinoData.settings.languages,
    currencies: casinoData.settings.currencies,
    image: casinoData.settings.public.logo,
  };
};
