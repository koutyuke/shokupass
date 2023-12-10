/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "eslint:recommended",
    "prettier",
    "eslint-config-turbo",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:tailwindcss/recommended",
  ],
  plugins: [
    "only-warn",
    "import",
    "promise",
    "react",
    "react-hooks",
    "jsx-a11y",
    "tailwindcss",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
  },
  ignorePatterns: ["node_modules/", "dist/"],
  rules: {
    "import/no-default-export": "error",
    "arrow-body-style": ["error", "as-needed"],
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": ["error", { packageDir: ["./"] }],
    "import/order": [
      "error",
      {
        pathGroups: [
          {
            pattern: "@*/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "#**",
            group: "internal",
            position: "before",
          },
        ],
        alphabetize: {
          order: "asc",
        },
      },
    ],
    "react/react-in-jsx-scope": "off",
    "react/jsx-no-useless-fragment": "error",
    "react/jsx-props-no-spreading": "off",
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
      },
    ],
  },
  settings: {
    tailwindcss: {
      callees: ["cn", "tv"],
      classRegex: "^(class|className|outsideClass)$",
    },
  },
  overrides: [
    {
      files: ["./*"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};
