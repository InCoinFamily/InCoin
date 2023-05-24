module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    // 'plugin:@typescript-eslint/recommended',
    'airbnb',
    // 'airbnb-typescript',
    'prettier',
  ],
  overrides: [],
  // parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // project: './tsconfig.json',
    // tsconfigRootDir: __dirname,
  },
  // plugins: ['react', '@typescript-eslint'],
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'react/button-has-type': 'off',
    'react/jsx-no-bind': 'off',
    'react/prop-types': 'off',
    'no-useless-escape': 'off',
  },
};
