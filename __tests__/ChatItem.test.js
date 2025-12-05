import { render } from '@testing-library/react-native';
import ChatItem from '../src/components/chat/ChatItem';

describe('ChatItem component', () => {
  it('renders user and message correctly', () => {
    const { getByText } = render(<ChatItem user="You" message="Hello world" />);

    expect(getByText('You')).toBeTruthy();
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('applies user or system styling', () => {
    const { getByText } = render(
      <ChatItem user="System" message="Processing..." />,
    );

    expect(getByText('Processing...')).toBeTruthy();
  });
});
