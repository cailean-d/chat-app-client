export interface ChatInterface {
  id: number;
  title: string | null;
  picture: string | null;
  message: string;
  users?: number[] | any;
  messages?: any[];
  unread: number;
}
