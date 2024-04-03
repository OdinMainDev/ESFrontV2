export const dataListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/casino/domains/list`;
};

export const dataFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/casino/domains/list/filters`;
};

export const dataEditApi = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/casino/domains/edit/${id}`;
};

export const getDataByIdApi = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/casino/domains/get/${id}`;
};
