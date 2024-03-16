import axios from 'axios';
import Cookies from 'js-cookie';
import { ICurrencies } from '../models/interfaces/currencies';

export const currenciesApi = () => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/get/all-currencies`;
};

export const getCurrenciesList = async (): Promise<ICurrencies[]> => {
  try {
    const { data } = await axios.get<{ data: ICurrencies[] }>(currenciesApi(), {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token'),
      },
    });
    return data.data;
  } catch (e) {
    return [];
  }
};
