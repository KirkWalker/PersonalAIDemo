import { Message } from '../types/chatTypes';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateFakeMessages = async (page: number): Promise<Message[]> => {
  await wait(1000);
  return Array.from({ length: 15 }, (_, i) => ({
    id: page * 15 + i,
    user: i % 2 === 0 ? 'Bot' : 'You',
    message: `Message ${page * 15 + i}`,
  }));
};

export type { Message };
