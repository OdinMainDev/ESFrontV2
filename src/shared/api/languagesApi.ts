import axios from 'axios';
import Cookies from 'js-cookie';

export const languagesApi = () => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/get/languages`;
};

export const getLanguagesList = async (): Promise<string[]> => {
  try {
    const { data } = await axios.get<{ data: string[] }>(languagesApi(), {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token'),
      },
    });
    return data.data;
  } catch (e) {
    return [];
  }
};
