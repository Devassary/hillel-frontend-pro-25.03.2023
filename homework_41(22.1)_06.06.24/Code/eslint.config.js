import globals from "globals";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import {fileURLToPath} from "url";
import {dirname} from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    resolvePluginsRelativeTo: __dirname,
    recommendedConfig: js.configs.recommended,
});

export default [
    {
        ignores: ["node_modules/**", "dist/**"],
    },
    {
        languageOptions: {
            globals: globals.browser,
            ecmaVersion: "latest",
            sourceType: "module",
        },
        rules: {
            "semi": ["error", "always"],
            "quote-props": ["error", "always"],
            "no-unused-vars": "warn",
            "no-console": "off",
        },
    },
    ...compat.config({
        env: {
            browser: true,
            es2021: true,
        },
        overrides: [
            {
                env: {
                    node: true,
                },
                files: ["*.config.js"],
                parserOptions: {
                    sourceType: "script",
                },
            },
        ],
    }),
];
