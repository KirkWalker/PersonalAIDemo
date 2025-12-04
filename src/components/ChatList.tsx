import React, { useRef, useState, useEffect } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  InteractionManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQueryClient } from '@tanstack/react-query';
import { useChat } from '../hooks/useChat';
import ChatItem from './ChatItem';
import { Message } from '../data/fakeChatData';
import { COLORS } from '../constants/colors';

const ChatList = () => {
  const queryClient = useQueryClient();
  const flatListRef = useRef<FlatList<Message>>(null);
  const [userInput, setUserInput] = useState('');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useChat();

  const messages: Message[] = data?.pages.flat() ?? [];
  const prevCount = useRef(messages.length);

  useEffect(() => {
    const newMessage = messages.length > prevCount.current;
    const lastMessage = messages[messages.length - 1];

    if (newMessage && lastMessage?.user === 'You') {
      InteractionManager.runAfterInteractions(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      });
    }
    prevCount.current = messages.length;
  }, [messages]);

  const sendMessage = () => {
    if (!userInput.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      user: 'You',
      message: userInput.trim(),
    };

    queryClient.setQueryData(['chatMessages'], (old: any) => {
      if (!old) return { pages: [[newMessage]], pageParams: [0] };

      const pages = [...old.pages];
      pages[pages.length - 1] = [...pages[pages.length - 1], newMessage];

      return { ...old, pages };
    });

    setUserInput('');
  };

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <SafeAreaView style={styles.flex}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <Text style={styles.title}>Personal AI Demo</Text>

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => <ChatItem {...item} />}
          keyExtractor={(m) => m.id.toString()}
          onEndReached={() => hasNextPage && fetchNextPage()}
          ListFooterComponent={
            isFetchingNextPage ? <Text>Loading...</Text> : null
          }
          contentContainerStyle={styles.pad}
        />

        <View style={styles.inputBar}>
          <TextInput
            value={userInput}
            onChangeText={setUserInput}
            placeholder="Type message"
            style={styles.input}
          />
          <TouchableOpacity style={styles.send} onPress={sendMessage}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  flex: { flex: 1 },
  title: {
    textAlign: 'center',
    fontSize: 26,
    marginVertical: 18,
    fontWeight: '700',
  },
  pad: { paddingBottom: 80, paddingTop: 10 },
  inputBar: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    borderColor: COLORS.grey,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  send: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    justifyContent: 'center',
    marginLeft: 8,
    borderRadius: 6,
  },
  sendText: { color: COLORS.white, fontWeight: '700' },
});
