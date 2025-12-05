import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { TYPOGRAPHY, COLORS } from '../../styles/tokens';

interface Props extends TextProps {
  variant?: keyof typeof TYPOGRAPHY;
  color?: keyof typeof COLORS;
}

const Text: React.FC<Props> = ({ variant = 'body', color = 'black', style, ...props }) => {
  return (
    <RNText
      style={[TYPOGRAPHY[variant], { color: COLORS[color] }, style]}
      {...props}
      accessibilityLabel="Message input field"
      accessibilityHint="Type your message here and press send to submit"
    />
  );
};

export default Text;
