import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import * as jsoncParser from 'jsonc-eslint-parser';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores([
    '**/dist/**',
    '**/coverage/**',
    '**/public/**',
    '**/storybook-static/**',
    '**/.storybook-home/**',
    '**/vite.config.*.timestamp*',
    '**/vitest.config.*.timestamp*',
    'node_modules/**',
  ]),
  {
    files: ['**/*.json'],
    languageOptions: {
      parser: jsoncParser,
    },
  },
  {
    files: ['apps/web/src/**/*.{ts,tsx}', 'libs/shared-ui/src/**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'no-console': 'warn',
    },
  },
  {
    files: [
      'apps/web/*.ts',
      'libs/shared-ui/*.ts',
      'libs/shared-ui/.storybook/*.ts',
    ],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'no-console': 'warn',
    },
  },
  {
    files: ['apps/web/src/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/libs/shared-ui/src/**', '@shared-ui/core/src/**'],
              message:
                'Use the @shared-ui/core package entry point instead of importing shared-ui internals directly.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['libs/shared-ui/src/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/apps/web/src/**'],
              message:
                'shared-ui must not depend on app-level web source files.',
            },
          ],
        },
      ],
    },
  },
]);
