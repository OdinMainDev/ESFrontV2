export interface IData {
  id: number;
  created_at: number | Date | string;
  updated_at: number | Date | string;
  data: {
    texts: null;
    allowed_countries: string[];
    blocked_countries: string[];
    image: string;
  };
  name: string;
  url: string;
}
