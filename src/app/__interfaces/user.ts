export interface UserInterface {
  id: number;
  nickname?: string;
  email?: string;
  avatar?: string;
  gender?: string;
  birthday?: string;
  phone?: string;
  website?: string;
  country?: string;
  city?: string;
  address?: string;
  language?: string[];
  deleted?: string;
  date?: string;

  name: string;
  image: string;
  online: boolean | string | number;
}
