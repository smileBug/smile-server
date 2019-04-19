module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true
  },
  plugins: ['react-hooks'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: ['airbnb', 'prettier'],
  rules: {
    'import/no-unresolved': ['off'],
    'react/prop-types': ['off'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.js'] }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react-hooks/rules-of-hooks': 'error',
    'consistent-return': ['off', { treatUndefinedAsUnspecified: false }]
  }
}
