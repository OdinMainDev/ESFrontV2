export const dataListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/withdraws/transactions/list`;
};

export const dataFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/withdraws/transactions/list/filters`;
};

export const dataEditApi = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/withdraws/transactions/edit/${id}`;
};

export const getDataByIdApi = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/withdraws/transactions/get/${id}`;
};
