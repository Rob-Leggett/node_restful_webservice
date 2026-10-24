import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.mocha
      }
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_|^next$' }],
      'no-console': 'off'
    }
  }
];
