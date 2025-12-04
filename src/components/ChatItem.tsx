import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { Message } from '../data/fakeChatData';

type Props = Message;

const ChatItem = ({ user, message }: Props) => {
  const isUser = user === 'You';

  return (
    <View style={[styles.row, isUser ? styles.right : styles.left]}>
      <View
        style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}
      >
        <Text style={styles.userLabel}>{user}</Text>
        <Text style={styles.msgText}>{message}</Text>
      </View>
    </View>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: 6,
    paddingHorizontal: 10,
  },
  left: { justifyContent: 'flex-start' },
  right: { justifyContent: 'flex-end' },

  bubble: {
    width: '85%', // 👈 THIS gives 85% width
    padding: 10,
    borderRadius: 12,
  },

  userBubble: {
    backgroundColor: COLORS.green,
    borderBottomRightRadius: 2,
  },
  botBubble: {
    backgroundColor: COLORS.grey ?? '#e6e6e6',
    borderBottomLeftRadius: 2,
  },

  userLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 2,
  },
  msgText: {
    fontSize: 16,
    lineHeight: 20,
  },
});
