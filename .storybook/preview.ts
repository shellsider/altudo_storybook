// .storybook/preview.ts
import "../tailwind.css";
import type { Preview } from "@storybook/react"; // or @storybook/react-vite if types still complain

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: "fullscreen",
  },
};

export default preview;
