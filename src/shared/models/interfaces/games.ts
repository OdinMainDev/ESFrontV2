export interface IGame {
  id: number;
  created_at: number;
  updated_at: number;
  name: string;
  system_name: string;
  system_id: string;
  api_name: string;
  game_provider: string;
  has_freerounds: boolean;
  desktop_enabled: boolean;
  mobile_enabled: boolean;
  image: string;
  data: IGameData;
  game_data: null;
}

export interface IGameData {
  demo_disabled: boolean;
  blocked_countries: null;
  allowed_countries: null;
  BaseTotalBet: number;
  MaxBetLevel: number;
}
