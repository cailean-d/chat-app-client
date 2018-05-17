export interface ChatInterface {
  id: number;
  title: string | null;
  picture: string | null;
  users: number[];
  message: string;
}
