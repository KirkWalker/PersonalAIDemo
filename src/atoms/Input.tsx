import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../design/tokens';

const Input: React.FC<TextInputProps> = (props) => {
  return (
    <TextInput
      style={styles.input}
      {...props}
      accessibilityLabel="Message input field"
      accessibilityHint="Type your message here and press send to submit"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 6,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.grey,
    flex: 1,
  },
});

export default Input;
