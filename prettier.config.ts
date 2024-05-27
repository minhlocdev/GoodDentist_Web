import type { Options } from "prettier";

const config: Options = {
  plugins: ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"],
  tailwindConfig: "./tailwind.config.ts",
  tailwindAttributes: ["myClassList"],
  tailwindFunctions: ["tw"],
};

export default config;
