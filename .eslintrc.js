module.exports = {
  plugins: ['prettier'],
  extends: ['react-app'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
  env: {
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
