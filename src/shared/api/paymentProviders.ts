import axios from 'axios';
import Cookies from 'js-cookie';

export const paymentProvidersApi = () => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/get/payment/providers`;
};

export const getPaymentProvidersApi = async () => {
  try {
    const { data } = await axios.get<{ data: string[] }>(paymentProvidersApi(), {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token'),
      },
    });
    return data.data;
  } catch (e) {
    return [];
  }
};
