import { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import tailwind from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";
import path from "path";
import { fileURLToPath } from "url"; // ⬅️ Add this line

// ⬇️ Define __dirname manually since ESM doesn’t have it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  stories: ["../components/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-mcp",
  ],
  viteFinal: async (config) => {
    return mergeConfig(config, {
      define: {
        "process.env.NODE_ENV": JSON.stringify("development"),
        "process.env": {},
        "process.browser": true,
      },
      resolve: {
        alias: {
          process: "process/browser",
          "@sitecore-content-sdk/nextjs": path.resolve(
            __dirname,
            "../mocks/sitecore-content-sdk.tsx"
          ),
        },
      },
      optimizeDeps: {
        include: ["process"],
      },
      css: {
        postcss: {
          plugins: [tailwind(), autoprefixer()],
        },
      },
    });
  },
};

export default config;


