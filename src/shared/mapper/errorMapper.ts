import { AxiosError } from 'axios';

export const errorMapper = (error: AxiosError<{ errors: object }>): string[] => {
  if (error.response?.status === 422) {
    const errorData = Object.keys(error.response?.data.errors ?? []);
    return errorData;
  }
  return [];
};
