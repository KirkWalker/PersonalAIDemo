import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import rnPlugin from 'eslint-plugin-react-native';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        __DEV__: 'readonly', // React Native dev global
        fetch: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        jest: 'readonly',
      },
    },
    plugins: { react: reactPlugin, 'react-native': rnPlugin },
    rules: {
      // general
      'no-console': 'warn',
      'no-unused-vars': [
        'warn',
        {
          varsIgnorePattern:
            'React|SafeAreaView|QueryClientProvider|ChatList|View|Text|TextInput|TouchableOpacity|FlatList|ActivityIndicator|ChatItem',
        },
      ],

      // React
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',

      // React Native
      'react-native/no-inline-styles': 'warn',
      'react-native/split-platform-components': 'warn',
      'react-native/no-color-literals': 'warn',
    },
    settings: { react: { version: 'detect' } },
  },
];
