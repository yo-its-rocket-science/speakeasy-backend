module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'standard',
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  plugins: ['only-warn'],
  rules: {
    quotes: [2, 'single'],
    semi: [2, 'always'],
    camelcase: 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  }
}
