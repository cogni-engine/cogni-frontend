import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/out/**',
      '**/build/**',
      '**/dist/**',
      '**/.turbo/**',
      '**/next-env.d.ts',
      '**/.vercel/**',
      '**/coverage/**',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.extends('prettier'), // Disables ESLint rules that conflict with Prettier
  {
    plugins: {
      prettier: (await import('eslint-plugin-prettier')).default,
    },
    rules: {
      'prettier/prettier': 'error',
      // Additional rules for better code quality
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      '@typescript-eslint/quotes': 'off',
    },
  },
];

export default eslintConfig;
