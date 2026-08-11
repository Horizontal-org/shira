import { dirname, join } from "node:path";
import { createRequire } from "node:module";

// Storybook 10 loads this config as ESM, so we keep the file in .mjs and use
// createRequire() for package.json-based resolution of addon/framework paths.
const require = createRequire(import.meta.url);

const config = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/preset-create-react-app"),
    "@storybook/addon-a11y",
    "@chromatic-com/storybook"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  staticDirs: ["../public"],
  webpackFinal: async (config) => {
    config.plugins = (config.plugins ?? []).filter(
      (plugin) => plugin?.constructor?.name !== "ESLintWebpackPlugin"
    );

    return config;
  },
  docs: {
    autodocs: true
  }
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

export default config;
