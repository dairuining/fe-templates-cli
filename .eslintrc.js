module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  /** 使用TypeScript解析器 */
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  /** 使用Typescript语法时支持ESLint */
  plugins: ['@typescript-eslint'],
  rules: {
    /** 允许使用requires */
    '@typescript-eslint/no-var-requires': 0,
  },
};
