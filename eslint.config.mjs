// @ts-check
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    // Настройки для исходного кода приложения (браузер)
    files: ['src/**/*.{js,ts}'],
    languageOptions: {
      globals: {
        document: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        process: 'readonly',
      },
    },
  },
  {
    // Настройки для конфигурационных файлов Webpack (Node.js)
    files: ['webpack*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off', // Разрешаем require() в webpack
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
  {
    // Ваше главное правило
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  }
);