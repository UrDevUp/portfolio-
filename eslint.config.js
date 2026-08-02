import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: 'detect' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // Sans ces deux regles, no-unused-vars ignore le JSX et signale a tort
      // tout identifiant utilise uniquement dans du JSX (ex. `motion.div`).
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'no-unused-vars': [
        'error',
        { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' },
      ],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    // Fichiers de configuration et scripts : ils tournent sous Node, pas dans
    // le navigateur (process, __dirname, require).
    files: [
      '*.config.js',
      'scripts/**/*.{js,mjs}',
      'postcss.config.js',
      'tailwind.config.js',
    ],
    languageOptions: {
      globals: { ...globals.node },
      sourceType: 'module',
    },
  },
]
