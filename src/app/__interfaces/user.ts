export interface UserInterface {
  id: number;
  name: string;
  image: string;
  online: boolean | string;
  avatar?: string;
  nickname?: string;
  city?: string;
  country?: string;
  gender?: string;
  phone?: string;
  website?: string;
  address?: string;
}
