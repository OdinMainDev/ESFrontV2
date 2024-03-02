export interface ILoginData {
  email: string;
  password: string;
  api_key: string;
}
export interface ILoginResponse {
  token: string;
  success: boolean;
}
