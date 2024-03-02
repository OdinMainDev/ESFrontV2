export interface IGetMe {
  data: IUser
  success: boolean
}

export interface IUser {
  id: number
  created_at: number
  updated_at: number
  username: string
  email: string
  phone: string
  currency: string
  banned: boolean
  affiliate_id: number
  user_data: IUserData
  affiliate_user: any
}

export interface IUserData {
  id: number
  created_at: number
  updated_at: number
  user_id: number
  first_name: string
  second_name: string
  last_name: string
  avatar: string
  country: string
  city: string
  dob: number
  address: string
  zip: string
  gender: string
  currency_register: string
  register_type: string
  promo_enabled: boolean
  email_verified_at: number
  phone_verified_at: number
  documents_verified_at: number
  banned_until: number
}

export interface IGetMyPermissions {
  token: string;
  success: string[];
}
