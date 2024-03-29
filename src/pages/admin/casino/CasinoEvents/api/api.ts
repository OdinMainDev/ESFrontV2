export const dataListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/casino/events/list`;
};

export const dataFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/casino/events/list/filters`;
};

export const dataGroupListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/games/apis/list`;
};

export const dataGroupFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/games/apis/list/filters`;
};
