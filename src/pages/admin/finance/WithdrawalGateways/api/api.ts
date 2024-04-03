export const dataListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/withdraws/providers/list`;
};

export const dataFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/withdraws/providers/list/filters`;
};

export const dataEditApi = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/withdraws/providers/edit/${id}`;
};

export const getDataByIdApi = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/withdraws/providers/get/${id}`;
};
