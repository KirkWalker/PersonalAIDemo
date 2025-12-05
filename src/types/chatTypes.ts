export interface Message {
  id: number;
  user: string;
  message: string;
}

export interface MessagePage {
  pages: Message[][];
  pageParams: number[];
}
