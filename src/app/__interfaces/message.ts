export interface MessageInterface {
  chat_id?: number;
  message: string;
  sender_id: number;
  sender_nickname?:  string;
  sender_avatar?:  string;
  timestamp?: number;
}
