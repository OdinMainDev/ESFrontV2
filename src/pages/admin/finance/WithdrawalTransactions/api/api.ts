export const dataListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/withdraws/transactions/list`;
};

export const dataFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/withdraws/transactions/list/filters`;
};

export const dataEditApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/withdraws/transactions/process`;
};

export const getDataByIdApi = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/withdraws/transactions/get/${id}`;
};

export const deleteDataByIdApi = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/withdraws/transactions/delete/${id}`;
};
