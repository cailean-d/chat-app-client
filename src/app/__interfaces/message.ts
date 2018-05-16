export interface MessageInterface {
  chat_id?: number;
  message: string;
  sender_id: number;
  sender_name?:  string;
  sender_image?:  string;
  timestamp?: number;
}
