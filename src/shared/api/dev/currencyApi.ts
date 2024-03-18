import { ICurrencies } from '@/shared/models/interfaces/currencies';
import axios from 'axios';
import Cookies from 'js-cookie';

const getCurrencyByIdApi = (id: number) => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/dev/currencies/get/${id}`;
};

export const currenciesListApi = () => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/dev/currencies/list`;
};

export const getCurrencyByIdApiHandler = async (id: number): Promise<ICurrencies | null> => {
  try {
    const { data } = await axios.get<{ data: ICurrencies }>(getCurrencyByIdApi(id), {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token'),
      },
    });
    return data.data;
  } catch (e) {
    return null;
  }
};
