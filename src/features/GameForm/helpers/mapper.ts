import { IGameFormData } from '../models/interface';
import { IGame } from '@/shared/models/interfaces/games';

export const resDataToState = (gameData: IGame): IGameFormData => {
  return {
    id: gameData.id,
    desktop_enabled: gameData.desktop_enabled,
    game_provider: gameData.game_provider,
    has_freerounds: gameData.has_freerounds,
    image: gameData.image,
    mobile_enabled: gameData.mobile_enabled,
    name: gameData.name,
    system_id: gameData.system_id,
    system_name: gameData.system_name,
  };
};
