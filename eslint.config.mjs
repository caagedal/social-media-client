import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import cypress from "eslint-plugin-cypress";
import jest from "eslint-plugin-jest";

export default defineConfig([
  // 🔹 Vanlig JS-konfig for hele prosjektet
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    plugins: {
      js,
    },
    extends: ["js/recommended"],
    rules: {},
  },

  // 🔸 Cypress-konfig for e2e (*.cy.js)
  {
    files: ["**/*.cy.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals["cypress/globals"],
      },
    },
    plugins: {
      cypress,
    },
    rules: {
      ...cypress.configs.recommended.rules,
      "cypress/no-unnecessary-waiting": "off",
      "no-unused-vars": "off",
    },
  },

  // 🔸 Jest-konfig for unit tests (*.test.js)
  {
    files: ["**/*.test.js"],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,  // Add Node globals for Jest tests
      },
    },
    plugins: {
      jest: jest,
    },
    rules: {
      ...jest.configs.recommended.rules,
      "jest/prefer-expect-assertions": "off",
    },
  },
]);