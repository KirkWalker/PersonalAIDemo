import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../atoms/Text';
import { COLORS, SPACING } from '../../styles/tokens';
import { Message } from '../../data/fakeChatData';

interface ChatItemProps extends Message {}

const ChatItem: React.FC<ChatItemProps> = ({ user, message }) => {
  const isUser = user === 'You';
  const displayName = isUser ? 'You' : 'Bot'; // Explicitly show names
  return (
    <View
      style={[styles.row, isUser ? styles.right : styles.left]}
      accessibilityRole="text"
      accessibilityLabel={`${user} says: ${message}`}
    >
      <View style={[styles.card, isUser ? styles.userCard : styles.systemCard]}>
        <Text variant="body">{user}</Text>
        <Text variant="body">{message}</Text>
      </View>
    </View>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: SPACING.xs,
  },
  left: { justifyContent: 'flex-start' },
  right: { justifyContent: 'flex-end' },
  card: {
    width: '85%',
    padding: SPACING.sm,
    borderRadius: 8,
  },
  userCard: {
    backgroundColor: COLORS.green,
  },
  systemCard: {
    backgroundColor: COLORS.grey,
  },
});
