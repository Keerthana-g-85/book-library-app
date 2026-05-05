import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      }
    },

    //  ESLint rules
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'eqeqeq': 'error',
      'no-var': 'error',                   // Force let/const
      'prefer-const': 'warn',              // Suggest const where possible
      'no-duplicate-imports': 'error',      // Clean up imports
      'curly': ['error', 'all'],           // Prevent logic bugs in loops/ifs
      'no-multiple-empty-lines': ['warn', { 'max': 1 }], // Keep code compact
      'semi': ['error', 'always'],         // Enforce semicolons for consistency
      'quotes': ['error', 'single'],       // Enforce single quotes
      'camelcase': ['warn', { 'properties': 'always' }] // Enforce camelCase naming
    }
  }
]);