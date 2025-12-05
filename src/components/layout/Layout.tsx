// src/layout/Layout.tsx
import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '../../styles/tokens';

interface LayoutProps {
  children: ReactNode;
  hasPadding?: boolean; // optional internal padding
}

const Layout: React.FC<LayoutProps> = ({ children, hasPadding = true }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, hasPadding && styles.padding]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
  },
  padding: {
    padding: SPACING.md,
  },
});
