import { useInfiniteQuery } from '@tanstack/react-query';
import { generateFakeMessages } from '../data/fakeChatData';

export const useChat = () => {
  return useInfiniteQuery({
    queryKey: ['chatMessages'],
    queryFn: ({ pageParam = 0 }) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(generateFakeMessages(pageParam));
        }, 500); // simulate network delay
      });
    },
    getNextPageParam: (lastPage, allPages) => allPages.length * 15,
    initialPageParam: 0,
  });
};
