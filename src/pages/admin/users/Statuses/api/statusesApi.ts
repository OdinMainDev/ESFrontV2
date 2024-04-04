export const statusesListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/users/statuses/list`;
};

export const statusesFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/users/statuses/list/filters`;
};

export const statusesEditApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/users/statuses/process`;
};

export const getStatusByIdApi = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/users/statuses/get/${id}`;
};

export const deleteStatuByIdApi = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/users/statuses/delete/${id}`;
};
