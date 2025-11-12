// import { addons } from "storybook/manager-api";

// // Hack fix to automatically close the addons panel, sidebar, and toolbar
// // This is needed because the automatic hiding is broken in Storybook 8
// addons.register("custom-panel", (api) => {
//   // Small delay to ensure Storybook is fully loaded
//   setTimeout(() => {
//     // Hide the addons panel
//     api.togglePanel(false);

//     // Hide the sidebar
//     api.toggleNav(false);

//     // Hide the toolbar
//     api.toggleToolbar(false);
//   }, 100);
// });

// // Additional configuration
// addons.setConfig({
//   // These don't work reliably in Storybook 8 but keeping them for potential future fixes
//   showNav: false, // Set to false to hide sidebar (doesn't work reliably)
//   showPanel: false, // Set to false to hide addons panel (doesn't work reliably)
//   showToolbar: false, // Set to false to hide toolbar (doesn't work reliably)
//   panelPosition: "bottom",
//   enableShortcuts: true,
//   initialActive: "sidebar",
// });

import { addons } from "storybook/manager-api";

// Hack fix to automatically close the addons panel, sidebar, and toolbar
// This is needed because the automatic hiding is broken in Storybook 8
addons.register("custom-panel", (api) => {
  // Small delay to ensure Storybook is fully loaded
  setTimeout(() => {
    // Hide the addons panel
    api.togglePanel(false);

    // Hide the sidebar
    api.toggleNav(false);

    // Hide the toolbar
    api.toggleToolbar(false);
  }, 100);
});

// Additional configuration
addons.setConfig({
  // These don't work reliably in Storybook 8 but keeping them for potential future fixes
  showNav: false, // Set to false to hide sidebar (doesn't work reliably)
  showPanel: false, // Set to false to hide addons panel (doesn't work reliably)
  showToolbar: false, // Set to false to hide toolbar (doesn't work reliably)
  panelPosition: "bottom",
  enableShortcuts: true,
  initialActive: "sidebar",
});
