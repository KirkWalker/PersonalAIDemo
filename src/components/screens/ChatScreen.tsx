import React, { useRef, useState, useEffect } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  InteractionManager,
  StyleSheet,
} from 'react-native';

import { useQueryClient } from '@tanstack/react-query';

import { useChat } from '../../hooks/useChat';
import { Message } from '../../data/fakeChatData';
import Layout from '../layout/Layout';
import Header from '../layout/Header';
import MessageList from '../chat/MessageList';
import ChatInput from '../chat/ChatInput';
import LoadingIndicator from '../atoms/LoadingIndicator';

const ChatScreen = () => {
  const queryClient = useQueryClient();
  const flatListRef = useRef<FlatList<Message>>(null);
  const [userInput, setUserInput] = useState('');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useChat();

  const messages = (data?.pages?.flat() as Message[]) ?? [];
  const prevCount = useRef(messages.length);

  // Auto-scroll on new user message
  useEffect(() => {
    const newMessageAdded = messages.length > prevCount.current;
    const lastMessage = messages[messages.length - 1];

    if (newMessageAdded && lastMessage?.user === 'You') {
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

  return (
    <Layout>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Header title="Personal AI Demo" />

        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <MessageList
            messages={messages}
            flatListRef={flatListRef}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}

        <ChatInput
          value={userInput}
          onChangeText={setUserInput}
          onSend={sendMessage}
        />
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
