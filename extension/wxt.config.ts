import { defineConfig } from "wxt";

export default defineConfig({
  modules: ["@wxt-dev/auto-icons"],
  autoIcons: {
    baseIconPath: "assets/icon.png",
  },
  manifest: ({ browser }) => ({
    name: "__MSG_extName__",
    description: "__MSG_extDescription__",
    default_locale: "en",
    permissions: [
      "activeTab",
      "storage",
      "contextMenus",
      ...(browser === "firefox" ? (["tabs"] as const) : []),
    ],
    optional_permissions: [
      ...(browser === "firefox" ? [] : (["tabs"] as const)),
    ],
    browser_specific_settings: {
      gecko: {
        id: "blazemarks@blazemarks.com",
        data_collection_permissions: {
          required: ["none"],
          optional: [],
        },
      },
    },
    commands: {
      "save-bookmark": {
        suggested_key: { default: "Ctrl+Shift+8", mac: "Command+Shift+8" },
        description: "__MSG_commandSave__",
      },
    },
  }),
});
