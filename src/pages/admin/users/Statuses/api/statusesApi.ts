export const statusesListApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/users/statuses/list`;
};

export const statusesFilterApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/users/statuses/list/filters`;
};

export const statusesEditApi = (id: number): string => {
  return `${import.meta.env.VITE_APP_BASE_URL}/users/statuses/edit/${id}`;
};
