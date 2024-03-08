export interface ICasino {
  id: number;
  created_at: number;
  updated_at: number;
  name: string;
  token: string;
  admin_id: number;
  is_enabled: boolean;
  settings: Settings;
}

export interface Settings {
  languages: string[];
  currencies: string[];
  public: Public;
  auth: Auth;
  main_currency: string;
  main_language: string;
  system: System;
  support_chat: SupportChat;
  profile: Profile;
  affiliate: Affiliate;
  bonus: Bonus;
}

export interface Public {
  logo: string;
  names: any[];
}

export interface Auth {
  login: Login;
  register: Register;
  reset: Reset;
  social_vk: SocialVk;
  social_ok: SocialOk;
  social_fb: SocialFb;
}

export interface Login {
  throttle_error: boolean;
  email: boolean;
  remember: boolean;
  captcha: boolean;
  phone: boolean;
  ban_error: boolean;
}

export interface Register {
  throttle_error: boolean;
  email: boolean;
  no_disposible: boolean;
  phone: boolean;
  username: boolean;
  full_name: boolean;
  city: boolean;
  dob: boolean;
  address: boolean;
  promo: boolean;
  gender: boolean;
  captcha: boolean;
}

export interface Reset {
  ban_error: boolean;
  throttle_error: boolean;
  email: boolean;
  captcha: boolean;
  phone: boolean;
  email_templates: any;
}

export interface SocialVk {
  is_enabled: boolean;
  client_id: string;
  client_secret: string;
}

export interface SocialOk {
  is_enabled: boolean;
  client_id: string;
  client_secret: string;
}

export interface SocialFb {
  is_enabled: boolean;
  client_id: string;
  client_secret: string;
}

export interface System {
  phone_provider: string;
  home_games_category: number;
  wager_type: string;
  main_url: string;
  maintenance: boolean;
  blocked_countries: any;
  allowed_countries: any;
  wager_break: boolean;
  wager_apply_bonus_games: boolean;
  withdraw: Withdraw;
  verification: Verification;
  bots: any;
  api: Api;
  notification: Notification;
  converter: any;
}

export interface Withdraw {
  withdraw_immediately: boolean;
  data_same_as_profile: boolean;
}

export interface Verification {
  documents_multiple: boolean;
  email_templates: any;
}

export interface Api {
  sms: Sms;
  mail: Mail;
  currency_converter: CurrencyConverter;
  captcha: Captcha;
  pusher: Pusher;
  email_templates: any;
}

export interface Sms {
  provider: string;
  api_key: string;
  api_secret: string;
  api_token: string;
}

export interface Mail {
  host: string;
  port: number;
  encryption: string;
  username: string;
  password: string;
  from_address: string;
  from_name: string;
}

export interface CurrencyConverter {
  provider: string;
  api_key: string;
}

export interface Captcha {
  key: string;
  secret: string;
}

export interface Pusher {
  id: string;
  key: string;
  secret: string;
  cluster: string;
}

export interface Notification {
  telegram_chat_id: string;
  payments: boolean;
  withdraws: boolean;
  verifications: boolean;
  bonus: boolean;
  user_bonus: boolean;
}

export interface SupportChat {
  is_global_support_avail: boolean;
  first_color: string;
  second_color: string;
  third_color: string;
  chat_position: string;
  chat_logo: string;
  chat_header_bg: string;
  chat_bg: string;
  is_rtl: boolean;
  header_texts: any;
  welcome_message: WelcomeMessage;
  bot_name: string;
  bot_avatar: string;
}

export interface WelcomeMessage {
  image: string;
  titles: any;
  contents: any;
}

export interface Profile {
  user_can_change_data: boolean;
  enable_2fa_password: boolean;
  has_email: boolean;
  has_phone: boolean;
  has_username: boolean;
  has_first_name: boolean;
  has_second_name: boolean;
  has_last_name: boolean;
  has_country: boolean;
  has_city: boolean;
  has_address: boolean;
  has_zip: boolean;
  has_dob: boolean;
  has_gender: boolean;
  has_avatar: boolean;
  has_promo: boolean;
}

export interface Affiliate {
  register: Register2;
}

export interface Register2 {
  has_email: boolean;
  has_phone: boolean;
  has_username: boolean;
  has_first_name: boolean;
  has_second_name: boolean;
  has_last_name: boolean;
  has_country: boolean;
  has_city: boolean;
  has_address: boolean;
  has_zip: boolean;
  has_dob: boolean;
  has_gender: boolean;
  has_verifications: any;
  blocked_countries: any;
  allowed_countries: any;
  need_company_name: boolean;
  need_traffic_sources: boolean;
  need_telegram: boolean;
  need_skype: boolean;
  need_whatsapp: boolean;
  need_moderate: boolean;
}

export interface Bonus {
  bonus_inactive_life_time: number;
  max_avail_bonuses: number;
  max_wager_per_deposit: number;
  max_bonuses_per_deposit: number;
  max_bonuses_freespins_per_deposit: number;
  max_bonuses_money_per_deposit: number;
  is_freespins_disabled: boolean;
  is_money_disabled: boolean;
  sum_values: boolean;
}
