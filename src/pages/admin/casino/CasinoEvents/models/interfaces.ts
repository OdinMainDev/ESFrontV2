export interface IData {
  id: number;
  created_at: number | Date | string;
  updated_at: number | Date | string;
  name: string;
}

export interface IGroupData {
  id: number;
  created_at: number | Date | string;
  updated_at: number | Date | string;
  name: string;
  api_name: string;
}
