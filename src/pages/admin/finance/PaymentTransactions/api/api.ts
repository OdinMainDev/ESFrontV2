export const dataListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/payments/transactions/list`;
};

export const dataFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/payments/transactions/list/filters`;
};
