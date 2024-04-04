export const dataListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/payments/providers/list`;
};

export const dataFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/payments/providers/list/filters`;
};

export const dataEditApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/payments/providers/process`;
};

export const getDataByIdApi = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/payments/providers/get/${id}`;
};

export const deleteDataByIdApi = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/payments/providers/delete/${id}`;
};
