import React from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { COLORS, SPACING } from '../../styles/tokens';

interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChangeText,
  onSend,
}) => {
  const handleSend = () => {
    if (!value.trim()) return; // don't send empty messages
    onSend();
    Keyboard.dismiss(); // hide keyboard after sending
  };

  return (
    <View style={styles.container}>
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder="Type your message..."
        blurOnSubmit // allow keyboard to dismiss when tapping "Done"
        onSubmitEditing={() => Keyboard.dismiss()} // prevent sending on "Done"
        returnKeyType="done"
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: SPACING.sm,
    borderTopWidth: 1,
    borderColor: COLORS.white,
  },
});
