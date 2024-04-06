export const dataListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/games/categories/list`;
};

export const dataFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/games/categories/list/filters`;
};

export const dataEditApi = () => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/games/categories/process`;

}

export const deleteDataById = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/games/categories/delete/${id}`;
};
