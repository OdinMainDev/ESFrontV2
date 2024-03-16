import axios from 'axios';
import { ICasinoFormData } from '../models/interface';
import Cookies from 'js-cookie';
import { ICasino } from '@/shared/models/interfaces/casinos';

export const casinoApi = () => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/dev/casinos/process`;
};

export const casinoFormApi = async (formData: ICasinoFormData) => {
  const { data } = await axios.post<{ data: ICasino }>(casinoApi(), formData, {
    headers: {
      Authorization: 'Bearer ' + Cookies.get('token'),
    },
  });
  return data.data;
};
