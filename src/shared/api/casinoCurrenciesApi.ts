import axios from 'axios';
import Cookies from 'js-cookie';
import { ICurrencies } from '../models/interfaces/currencies';

export const casinoCurrenciesApi = () => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/get/casino-currencies`;
};

export const getCasinoCurrenciesList = async (): Promise<ICurrencies[]> => {
  try {
    const { data } = await axios.get<{ data: ICurrencies[] }>(casinoCurrenciesApi(), {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token'),
      },
    });
    return data.data;
  } catch (e) {
    return [];
  }
};
