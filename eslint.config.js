import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// Rules from docs/naming-and-folders.md: no barrels, the `#/` alias instead of relative imports,
// and the MVVM View (`*.view.tsx`) that only draws props and emits actions.

const RELATIVE_IMPORTS = {
  group: ['./*', '../*', '.', '..'],
  message: 'Use the `#/` alias instead of a relative import.',
};
const BARREL_IMPORTS = {
  group: ['**/index', '**/index.ts', '**/index.tsx'],
  message: 'There are no barrels: import the real file.',
};
// `\#` because the pattern is gitignore-style, where a leading `#` starts a comment.
const VIEW_IMPORTS = {
  group: ['\\#/domain/**', '\\#/router/**', '@tanstack/react-router', 'zustand', 'zustand/*'],
  message: 'The View only draws props and emits actions; the ViewModel wires the rest.',
};

export default tseslint.config(
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/coverage/**', '.claude/**', 'public/**'],
  },
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      // TanStack Router redirects are thrown (`throw redirect(...)`).
      '@typescript-eslint/only-throw-error': [
        'error',
        { allow: [{ from: 'package', package: '@tanstack/router-core', name: 'Redirect' }] },
      ],
      // Type-only namespaces are the project pattern; erasableSyntaxOnly already blocks runtime ones.
      '@typescript-eslint/no-namespace': 'off',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ExportAllDeclaration',
          message: 'There are no barrels. Import the real file.',
        },
        {
          selector: 'ExportNamedDeclaration[source]',
          message: 'There are no barrels. Import the real file.',
        },
      ],
    },
  },
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['src/**/*.{ts,tsx}', 'tests/**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat['recommended-latest']],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['scripts/**/*.ts'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['src/**/*.{ts,tsx}', 'tests/**/*.{ts,tsx}', 'scripts/**/*.ts'],
    rules: {
      'no-restricted-imports': ['error', { patterns: [RELATIVE_IMPORTS, BARREL_IMPORTS] }],
    },
  },
  {
    files: ['src/**/*.view.tsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        { patterns: [RELATIVE_IMPORTS, BARREL_IMPORTS, VIEW_IMPORTS] },
      ],
    },
  },
);
