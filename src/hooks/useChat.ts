import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { generateFakeMessages } from '../data/fakeChatData';
import { Message } from '../types/chatTypes';

export type MessagePage = Message[];

export const useChat = () =>
  useInfiniteQuery<
    MessagePage,
    Error,
    InfiniteData<MessagePage>,
    ['chatMessages'],
    number
  >({
    queryKey: ['chatMessages'],
    queryFn: ({ pageParam = 0 }) =>
      Promise.resolve(generateFakeMessages(pageParam)),
    getNextPageParam: (_lastPage, allPages) => allPages.length,
    initialPageParam: 0,
  });
