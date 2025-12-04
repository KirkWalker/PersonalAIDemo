import React, { useState, useRef, useEffect } from 'react';
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatItem from './ChatItem';
import { useChat } from '../hooks/useChat';
import { useQueryClient } from '@tanstack/react-query';
import { COLORS } from '../constants/colors';

const ChatList = () => {
  const queryClient = useQueryClient();
  const flatListRef = useRef(null);
  const [userInput, setUserInput] = useState('');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useChat();

  const messages = data?.pages?.flat() || [];
  const prevMessageCount = useRef(messages.length);

  // Auto-scroll when a new user message is added
  useEffect(() => {
    const newMessagesAdded = messages.length > prevMessageCount.current;
    const lastMessage = messages[messages.length - 1];

    if (newMessagesAdded && lastMessage?.user === 'You') {
      InteractionManager.runAfterInteractions(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      });
    }

    prevMessageCount.current = messages.length;
  }, [messages]);

  const sendMessage = () => {
    if (!userInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      user: 'You',
      message: userInput,
    };

    queryClient.setQueryData(['chatMessages'], (oldData) => {
      if (!oldData) return { pages: [[newMessage]], pageParams: [] };
      const newPages = [...oldData.pages];
      newPages[newPages.length - 1] = [
        ...newPages[newPages.length - 1],
        newMessage,
      ];
      return { ...oldData, pages: newPages };
    });

    setUserInput('');
  };

  if (isLoading) return <ActivityIndicator size="large" style={styles.flex} />;

  return (
    <SafeAreaView style={styles.flex}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <Text style={styles.title}>Personal AI Demo</Text>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ChatItem {...item} />}
          onEndReached={() => {
            if (hasNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator /> : null
          }
          contentContainerStyle={styles.listContent}
        />

        {/* Input bar */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={userInput}
            onChangeText={setUserInput}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Text style={styles.sendBtnText}>Send</Text>
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
    marginTop: 50,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
  },
  listContent: {
    paddingBottom: 80, // ensures last message isn't hidden behind input
    paddingVertical: 12,
  },
  inputRow: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    borderColor: COLORS.grey,
    backgroundColor: COLORS.white,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginRight: 8,
    backgroundColor: COLORS.white,
  },
  sendBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnText: {
    color: COLORS.white,
    fontWeight: '700',
  },
});
