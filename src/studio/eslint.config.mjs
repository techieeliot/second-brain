import eslint from "@eslint/js";

export default [
  eslint.configs.recommended,
  {
    ignores: ["dist/**", ".sanity/**", "node_modules/**"],
  },
];
