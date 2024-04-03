export const dataListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/payments/providers/list`;
};

export const dataFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/payments/providers/list/filters`;
};

export const dataEditApi = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/payments/providers/edit/${id}`;
};

export const getDataByIdApi = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/payments/providers/get/${id}`;
};
