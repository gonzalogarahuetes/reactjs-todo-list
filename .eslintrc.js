<<<<<<< HEAD
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    "jest/globals": true,
  },
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:jsx-a11y/recommended",
    "prettier",
    "plugin:cypress/recommended",
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    requireConfigFile: "false",
    jsx: true,
  },
  plugins: [
    "html",
    "react",
    "react-hooks",
    "jsx-a11y",
    "markdown",
    "react-hooks",
    "import",
    "prettier",
  ],
  settings: {
    react: {
      version: "detect",
    },
    jest: {
      version: 26,
    },
  },
  overrides: [
    {
      files: ["*.html"],
      parser: "@html-eslint/parser",
      extends: ["plugin:@html-eslint/recommended"],
    },
    {
      files: ["src/**/*.test.js"],
      plugins: ["jest"],
      rules: {
        "jest/expect-expect": "error",
      },
      extends: ["plugin:jest/recommended"],
    },
  ],
  rules: {
    "prettier/prettier": [
      "off",
      {
        endOfLine: "auto",
      },
    ],
    "react/jsx-filename-extension": "off",
    "import/prefer-default-export": "off",
    "prefer-destructuring": "off",
    "object-shorthand": "off",
    "react/jsx-props-no-spreading": "off",
    "arrow-body-style": "off",
    "no-underscore-dangle": "off",
    "react/forbid-prop-types": "off",
    "react/prop-types": "off",
    "no-unused-expressions": "off",
    "jsx-a11y/label-has-for": [
      "off",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
  },
};
=======
// module.exports = {
//   env: {
//     browser: true,
//     es2021: true,
//     jest: true,
//     "jest/globals": true,
//   },
//   extends: [
//     "airbnb",
//     "eslint:recommended",
//     "plugin:react/recommended",
//     "plugin:import/errors",
//     "plugin:import/warnings",
//     "plugin:jsx-a11y/recommended",
//     "prettier",
//     "plugin:cypress/recommended",
//   ],
//   parser: "@babel/eslint-parser",
//   parserOptions: {
//     ecmaVersion: 12,
//     sourceType: "module",
//     requireConfigFile: "false",
//     jsx: true,
//   },
//   plugins: [
//     "html",
//     "react",
//     "react-hooks",
//     "jsx-a11y",
//     "markdown",
//     "react-hooks",
//     "import",
//     "prettier",
//   ],
//   settings: {
//     react: {
//       version: "detect",
//     },
//     jest: {
//       version: 26,
//     },
//   },
//   overrides: [
//     {
//       files: ["*.html"],
//       parser: "@html-eslint/parser",
//       extends: ["plugin:@html-eslint/recommended"],
//     },
//     {
//       files: ["src/**/*.test.js"],
//       plugins: ["jest"],
//       rules: {
//         "jest/expect-expect": "error",
//       },
//       extends: ["plugin:jest/recommended"],
//     },
//   ],
//   rules: {
//     "prettier/prettier": [
//       "off",
//       {
//         endOfLine: "auto",
//       },
//     ],
//     "react/jsx-filename-extension": "off",
//     "import/prefer-default-export": "off",
//     "prefer-destructuring": "off",
//     "object-shorthand": "off",
//     "react/jsx-props-no-spreading": "off",
//     "arrow-body-style": "off",
//     "no-underscore-dangle": "off",
//     "react/forbid-prop-types": "off",
//     "react/prop-types": "off",
//     "no-unused-expressions": "off",
//     "jsx-a11y/label-has-for": [
//       "error",
//       {
//         required: {
//           some: ["nesting", "id"],
//         },
//       },
//     ],
//   },
// };
>>>>>>> 138a6208b2e42b33320330560471b15222a59b21
