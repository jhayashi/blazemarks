import { blazemarksUrl, newTabRedirect } from "@/utils/storage";
import { buildAddUrl } from "@/utils/blazemarks";

const NEW_TAB_URLS = ["chrome://newtab/", "about:newtab", "about:home"];

async function saveCurrentTab(readLater?: boolean) {
  const [tab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  if (!tab?.url) return;

  const baseUrl = await blazemarksUrl.getValue();
  const addUrl = buildAddUrl(baseUrl, {
    url: tab.url,
    title: tab.title,
    favicon: tab.favIconUrl,
    readLater,
  });

  await browser.tabs.create({ url: addUrl, active: false });
}

// --- Reader Mode tracking (Firefox only) ---
if (typeof browser.tabs.toggleReaderMode === "function") {
  const readerPending = new Set<number>();

  browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
    // Detect marker in URL (ignore about:reader — that's the reader mode page itself)
    if (
      changeInfo.url?.includes("__blazemarks_reader") &&
      !changeInfo.url.startsWith("about:reader")
    ) {
      readerPending.add(tabId);
    }

    if (!readerPending.has(tabId)) return;

    // Firefox signals page is reader-compatible
    if (changeInfo.isArticle) {
      browser.tabs.toggleReaderMode(tabId);
      readerPending.delete(tabId);
    }

    // Fallback: page loaded but isArticle hasn't fired yet — wait 3s then try
    if (changeInfo.status === "complete") {
      setTimeout(() => {
        if (readerPending.has(tabId)) {
          browser.tabs.toggleReaderMode(tabId).catch(() => {});
          readerPending.delete(tabId);
        }
      }, 3000);
    }
  });

  browser.tabs.onRemoved.addListener((tabId) => {
    readerPending.delete(tabId);
  });
}

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({
      id: "save-bookmark",
      title: browser.i18n.getMessage("saveToBlaze"),
      contexts: ["page"],
    });
    browser.contextMenus.create({
      id: "read-later",
      title: browser.i18n.getMessage("readLater"),
      contexts: ["page"],
    });
  });

  browser.contextMenus.onClicked.addListener(async (info) => {
    if (info.menuItemId === "save-bookmark") {
      await saveCurrentTab();
    } else if (info.menuItemId === "read-later") {
      await saveCurrentTab(true);
    }
  });

  browser.commands.onCommand.addListener(async (command) => {
    if (command !== "save-bookmark") return;
    await saveCurrentTab();
  });

  // --- New tab redirect ---
  async function onNewTab(tab: { id?: number; url?: string }) {
    if (!tab.id || !tab.url || !NEW_TAB_URLS.includes(tab.url)) return;
    const enabled = await newTabRedirect.getValue();
    if (!enabled) return;
    const url = await blazemarksUrl.getValue();
    browser.tabs.update(tab.id, { url });
  }

  async function startNewTabListener() {
    const hasPermission = await browser.permissions.contains({
      permissions: ["tabs"],
    });
    const enabled = await newTabRedirect.getValue();
    if (hasPermission && enabled) {
      browser.tabs.onCreated.addListener(onNewTab);
    }
  }

  // Re-evaluate whenever the setting changes
  newTabRedirect.watch((enabled) => {
    browser.tabs.onCreated.removeListener(onNewTab);
    if (enabled) {
      browser.permissions
        .contains({ permissions: ["tabs"] })
        .then((has) => {
          if (has) browser.tabs.onCreated.addListener(onNewTab);
        });
    }
  });

  startNewTabListener();
});
