module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  globals: {
    L: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: ["plugin:vue/recommended", "standard", "prettier"],
  // required to lint *.vue files
  plugins: ["vue"],
  // add your custom rules here
  rules: {
    camelcase: 0,
    indent: ["error", 2],
    "arrow-parens": 0,
    "one-var": 0,
    semi: ["warn", "always"],
    "eol-last": ["error", "always"]
  }
};
