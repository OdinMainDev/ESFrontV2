import axios from 'axios';
import { ICurrencyFormData } from '../models/interface';
import Cookies from 'js-cookie';

export const currenciesApi = () => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/dev/currencies/process`;
};

export const currencyFormApi = async (id: number, data: ICurrencyFormData) => {
  const res = await axios.post(
    currenciesApi(),
    {
      id,
      ...data,
      minor_units: Number(data.minor_units),
    },
    {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token'),
      },
    },
  );
  return res;
};
