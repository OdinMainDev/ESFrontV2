import axios from 'axios';
import Cookies from 'js-cookie';

export const uploadApi = () => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/file/upload`;
};

export const uploadImageFile = async (formData: FormData): Promise<string | null> => {
  try {
    const { data } = await axios.post<{ url: string }>(uploadApi(), formData, {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token'),
      },
    });
    return data.url;
  } catch (e) {
    return null;
  }
};
