export interface MessageInterface {
  id?: number;
  chat_id?: number;
  message: string;
  sender_id: number;
  sender_nickname?:  string;
  sender_avatar?:  string;
  status?: number;
  timestamp?: number;
}
