export const deleteDataById = (id: number) => {
  return `${import.meta.env.VITE_APP_BASE_URL}/api/dev/games/delete/${id}`;
};
