export const currenciesFilterApi = () => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/dev/currencies/list/filters`;
};

export const deleteDataById = (id: number) => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/dev/currencies/delete/${id}`;
};
