import { ILoginData } from '../models/getters';

export function validateLoginData(data: ILoginData): boolean {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!emailRegex.test(data.email)) {
    return false;
  }

  if (!data.password) {
    return false;
  }

  if (!data.api_key) {
    return false;
  }

  return true;
}
