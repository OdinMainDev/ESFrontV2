import axios from 'axios';
import { ICurrencyFormData, IResData } from '../models/interface';
import Cookies from 'js-cookie';

export const currenciesApi = () => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/dev/currencies/process`;
};

export const currencyFormApi = async (id: number, formData: ICurrencyFormData) => {
  const { data } = await axios.post<{ data: IResData }>(
    currenciesApi(),
    {
      id,
      ...formData,
      minor_units: Number(formData.minor_units),
    },
    {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token'),
      },
    },
  );
  return data.data;
};
