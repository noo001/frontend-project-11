module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['node_modules', 'dist', 'code', '*.config.js'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'],
        moduleDirectory: ['node_modules', '.'],
      },
    },
  },
  rules: {
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'indent': ['error', 2, { SwitchCase: 1 }],
    'comma-dangle': ['error', 'always-multiline'],
    'arrow-parens': ['error', 'always'],
    'brace-style': 'off',
    'no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],
    'no-console': 'off',
    'space-in-parens': ['error', 'never'],
    'padded-blocks': ['error', 'never'],
    'eol-last': ['error', 'always'],
    'import/extensions': ['error', 'ignorePackages'],
    'no-underscore-dangle': 'off',
    'no-param-reassign': ['error', { props: false }],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        'vite.config.js',
        '**/vite.config.js',
        '**/vitest.config.js',
      ],
    }],
    'import/no-unresolved': ['error', {
      ignore: ['vite'],
    }],
    'object-curly-newline': 'off',
    'arrow-body-style': 'off',
  },
}
