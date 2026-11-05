// @ts-check
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  // 1. Игнорируем папку dist (замена устаревшего .eslintignore)
  {
    ignores: ['dist/**', 'node_modules/**'],
  },

  js.configs.recommended,
  tseslint.configs.recommended,

  // 2. Настройки для исходного кода приложения (браузер)
  {
    files: ['src/**/*.{js,ts}'],
    languageOptions: {
      globals: {
        document: 'readonly',
        window: 'readonly',      // Добавлено
        localStorage: 'readonly', // Добавлено
        console: 'readonly',
        fetch: 'readonly',
        process: 'readonly',
      },
    },
  },

  // 3. Настройки для конфигурационных файлов Webpack (Node.js)
  {
    files: ['webpack*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
    languageOptions: {
      globals: {
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        process: 'readonly',
      },
    },
  },

  // 4. Главное правило (запрет any)
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  }
);