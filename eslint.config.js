import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import rnPlugin from 'eslint-plugin-react-native';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        __DEV__: 'readonly', // React Native
        fetch: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        require: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        jest: 'readonly',
      },
    },
    plugins: {
      react: reactPlugin,
      'react-native': rnPlugin,
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // General
      'no-console': 'warn',
      'no-unused-vars': 'off', // disabled because TS handles unused vars
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern:
            'React|SafeAreaView|QueryClientProvider|ChatList|View|Text|TextInput|TouchableOpacity|FlatList|ActivityIndicator|ChatItem',
        },
      ],

      // React
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',

      // React Native
      'react-native/no-inline-styles': 'warn',
      'react-native/split-platform-components': 'warn',
      'react-native/no-color-literals': 'warn',

      // Prettier
      'prettier/prettier': 'warn',
    },
    settings: { react: { version: 'detect' } },
  },
];
