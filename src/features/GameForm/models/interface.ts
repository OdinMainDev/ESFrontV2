export interface IGameFormData {
  id: number;
  desktop_enabled: boolean;
  game_provider: string;
  has_freerounds: boolean;
  image: string;
  mobile_enabled: boolean;
  name: string;
  system_id: string;
  system_name: string;
}

export interface IErrorData {
  errors: {
    desktop_enabled: string[];
    game_provider: string[];
    has_freerounds: string[];
    image: string[];
    mobile_enabled: string[];
    name: string[];
    system_id: string[];
    system_name: string[];
  };
}

export interface IIsValidData {
  desktop_enabled: boolean;
  game_provider: boolean;
  has_freerounds: boolean;
  image: boolean;
  mobile_enabled: boolean;
  name: boolean;
  system_id: boolean;
  system_name: boolean;
}
