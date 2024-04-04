export const dataListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/sliders/list`;
};

export const dataFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/sliders/list/filters`;
};

export const deleteDataById = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/sliders/delete/${id}`;
};
