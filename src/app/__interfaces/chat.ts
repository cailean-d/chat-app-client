export interface ChatInterface {
  id: number;
  title: string | null;
  image: string | null;
  members: number[];
  lastMessage: string;
}
