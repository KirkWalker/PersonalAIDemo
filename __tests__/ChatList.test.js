import { render, fireEvent } from '@testing-library/react-native';
import MessageList from '../src/components/ChatScreen';

// Mock react-query fully inside the factory
jest.mock('@tanstack/react-query', () => {
  const setQueryDataMock = jest.fn();

  return {
    useQueryClient: () => ({
      setQueryData: setQueryDataMock,
    }),
    __setQueryDataMock: setQueryDataMock,
  };
});

// Mock useChat hook
jest.mock('../src/hooks/useChat', () => ({
  useChat: () => ({
    data: { pages: [] },
    fetchNextPage: jest.fn(),
    hasNextPage: false,
    isFetchingNextPage: false,
    isLoading: false,
  }),
}));

describe('ChatList Component', () => {
  it('calls setQueryData when Send is pressed', () => {
    const { getByPlaceholderText, getByText } = render(<MessageList />);

    const input = getByPlaceholderText('Type your message...');
    const sendBtn = getByText('Send');

    fireEvent.changeText(input, 'Test message');
    fireEvent.press(sendBtn);

    const { __setQueryDataMock } = require('@tanstack/react-query');
    expect(__setQueryDataMock).toHaveBeenCalled();

    // Simulate oldData to inspect the new pages
    const setQueryFn = __setQueryDataMock.mock.calls[0][1];
    const result = setQueryFn({ pages: [[]], pageParams: [] }); // simulate previous data
    const lastPage = result.pages[result.pages.length - 1];

    expect(lastPage).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ user: 'You', message: 'Test message' }),
      ]),
    );
  });
});
