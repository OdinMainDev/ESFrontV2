export const botsListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/users/bots/list`;
};

export const botsFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/users/bots/list/filters`;
};
