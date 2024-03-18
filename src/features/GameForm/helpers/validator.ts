import { AxiosError } from 'axios';
import { IErrorData, IIsValidData } from '../models/interface';

export const errorValidator = (error: AxiosError<IErrorData>): IIsValidData => {
  if (error.response?.status === 422) {
    const errorData = Object.keys(error.response?.data.errors ?? []);
    return {
      desktop_enabled: !!errorData.find((item) => item === 'desktop_enabled'),
      game_provider: !!errorData.find((item) => item === 'game_provider'),
      has_freerounds: !!errorData.find((item) => item === 'has_freerounds'),
      image: !!errorData.find((item) => item === 'image'),
      mobile_enabled: !!errorData.find((item) => item === 'mobile_enabled'),
      name: !!errorData.find((item) => item === 'name'),
      system_id: !!errorData.find((item) => item === 'system_id'),
      system_name: !!errorData.find((item) => item === 'system_name'),
    };
  }
  return {
    desktop_enabled: false,
    game_provider: false,
    has_freerounds: false,
    image: false,
    mobile_enabled: false,
    name: false,
    system_id: false,
    system_name: false,
  };
};
