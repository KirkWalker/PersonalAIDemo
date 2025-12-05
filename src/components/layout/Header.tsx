import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>;
};

export default Header;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 26,
    marginVertical: 18,
    fontWeight: '700',
  },
});
