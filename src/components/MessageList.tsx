// components/MessageList.tsx
import React from 'react';
import { FlatList, Text, StyleSheet, FlatListProps } from 'react-native';
import ChatItem from './ChatItem';
import { Message } from '../data/fakeChatData';

interface MessageListProps {
  messages: Message[];
  flatListRef: React.RefObject<FlatList<Message> | null>;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}
const MessageList: React.FC<MessageListProps> = ({
  messages,
  flatListRef,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}) => {
  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={({ item }) => <ChatItem {...item} />}
      keyExtractor={(m) => m.id.toString()}
      onEndReached={() => hasNextPage && fetchNextPage()}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isFetchingNextPage ? <Text>Loading...</Text> : null}
      contentContainerStyle={styles.pad}
    />
  );
};

export default MessageList;

const styles = StyleSheet.create({
  pad: { paddingBottom: 80, paddingTop: 10 },
});
