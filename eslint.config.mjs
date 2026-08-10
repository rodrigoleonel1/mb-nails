import nextVitals from "eslint-config-next/core-web-vitals";
import * as espree from "espree";

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", ".agents/**"],
  },
  ...nextVitals,
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    languageOptions: {
      parser: espree,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    files: ["hooks/use-toast.tsx"],
    rules: {
      "react-hooks/refs": "off",
      "react-hooks/immutability": "off",
    },
  },
  {
    settings: {
      react: { version: "19" },
    },
  },
];

export default eslintConfig;