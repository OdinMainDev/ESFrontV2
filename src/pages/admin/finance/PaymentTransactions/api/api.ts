export const dataListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/payments/transactions/list`;
};

export const dataFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/payments/transactions/list/filters`;
};

export const dataEditApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/payments/transactions/process`;
};

export const getDataByIdApi = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/payments/transactions/get/${id}`;
};

export const deleteDataByIdApi = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/payments/transactions/delete/${id}`;
};
