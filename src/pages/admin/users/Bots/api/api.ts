export const botsListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/users/bots/list`;
};

export const botsFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/users/bots/list/filters`;
};

export const botsEditApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/users/bots/process`;
};

export const getBotsByIdApi = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/users/bots/get/${id}`;
};

export const deleteBotByIdApi = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/users/bots/delete/${id}`;
};
