export const casinosFilterApi = () => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/dev/casinos/list/filters`;
};

export const deleteDataById = (id: number) => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/dev/casinos/delete/${id}`;
};
