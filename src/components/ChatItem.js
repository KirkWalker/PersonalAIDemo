import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

const ChatItem = ({ user, message }) => {
  const isUser = user === 'You'; // or however you detect sender
  return (
    <View style={[styles.row, isUser ? styles.right : styles.left]}>
      <View style={[styles.card, isUser ? styles.userCard : styles.systemCard]}>
        <Text style={styles.userText}>{user}</Text>
        <Text style={styles.messageText}>{message}</Text>
      </View>
    </View>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 12,
    marginVertical: 6,
    flex: 1,
  },
  right: {
    alignItems: 'flex-end',
  },
  left: {
    alignItems: 'flex-start',
  },

  card: {
    width: '90%',
    padding: 12,
    borderRadius: 10,
    backgroundColor: COLORS.grey,
  },

  userCard: {
    backgroundColor: COLORS.grey,
  },
  systemCard: {
    backgroundColor: COLORS.green,
  },

  userText: {
    fontSize: 11,
    color: COLORS.drkgrey,
    marginBottom: 2,
  },
  messageText: {
    fontSize: 16,
    color: COLORS.black,
  },
});
