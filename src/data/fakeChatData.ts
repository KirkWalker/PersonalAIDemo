import { Message } from '../types/chatTypes';

export const generateFakeMessages = (page: number): Message[] => {
  return Array.from({ length: 15 }, (_, i) => ({
    id: page * 15 + i,
    user: i % 2 === 0 ? 'Bot' : 'You',
    message: `Message ${page * 15 + i}`,
  }));
};

export type { Message };
