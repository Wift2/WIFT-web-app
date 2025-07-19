import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default tseslint
  .config([
    globalIgnores(['dist', 'node_modules']),
    {
      files: ['**/*.{ts,tsx}'],
      extends: [
        js.configs.recommended,
        ...tseslint.configs.recommended,
        reactHooks.configs['recommended-latest'],
        reactRefresh.configs.vite,
        unicorn.configs['flat/recommended'],
      ],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
      },
      rules: {
        // TypeScript specific rules
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/consistent-type-imports': [
          'error',
          { prefer: 'type-imports' },
        ],
        '@typescript-eslint/no-import-type-side-effects': 'error',

        // React specific rules
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
        ],

        // General rules
        'prefer-const': 'error',
        'no-var': 'error',
        'no-console': 'warn',
        eqeqeq: ['error', 'always'],
        curly: ['error', 'all'],

        // Unicorn rules customization
        'unicorn/prevent-abbreviations': 'off', // Allow common abbreviations like 'props', 'ref'
        'unicorn/filename-case': [
          'error',
          {
            cases: {
              camelCase: true,
              pascalCase: true,
              kebabCase: true,
            },
            ignore: [
              /^vite-env\.d\.ts$/,
              /^aws-config\.ts$/,
              /\.config\./,
              /\.test\./,
              /\.spec\./,
            ],
          },
        ],
        'unicorn/no-null': 'off', // Allow null for React/DOM compatibility
        'unicorn/prefer-module': 'off', // Allow CommonJS for config files
        'unicorn/prefer-node-protocol': 'error',
        'unicorn/prefer-array-some': 'error',
        'unicorn/prefer-array-find': 'error',
        'unicorn/prefer-includes': 'error',
        'unicorn/prefer-string-starts-ends-with': 'error',
        'unicorn/no-array-for-each': 'off', // Allow forEach for React patterns
        'unicorn/consistent-function-scoping': 'error',
        'unicorn/no-useless-undefined': 'error',
      },
    },
  ])
  .concat(eslintPluginPrettier);
