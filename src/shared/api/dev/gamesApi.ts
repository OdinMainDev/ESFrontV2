export const gamesFilterApi = () => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/dev/games/list/filters`;
};

export const gamesListApi = () => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/dev/games/list`;
};
