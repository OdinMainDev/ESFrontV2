import axios from 'axios';
import Cookies from 'js-cookie';

export const countriesApi = () => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/get/countries`;
};

export const getCountriesApi = async () => {
  try {
    const { data } = await axios.get<{ data: string[] }>(countriesApi(), {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token'),
      },
    });
    return data.data;
  } catch (e) {
    return [];
  }
};
