import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import unusedImports from 'eslint-plugin-unused-imports'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config({
  files: ['**/*.ts', '**/*.tsx'],
  ignores: [
    // '**/build/*.js',
    '*.queries.ts',
    'src/lib/db/schema/public/PublicSchema.ts',
  ],
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
    // eslintConfigPrettier,
  ],
  languageOptions: {
    ecmaVersion: 'latest',
    parserOptions: {
      project: ['./tsconfig.json'],
      tsconfigRootDir: import.meta.dirname,
    },
    // globals: {
    // ...globals.recommended,
    // Stripe: true,
    // cy: true,
    // Cypress: true,
    // },
  },
  plugins: {
    'unused-imports': unusedImports,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    'react/no-unescaped-entities': 'off',
    'react/no-unknown-property': 'off',
    'react/display-name': 'off',

    // unusedImports plugin
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
})
