import { blazemarksUrl, customReadingDomains } from "@/utils/storage";
import { buildAddUrl } from "@/utils/blazemarks";

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

  // Keyboard shortcut uses _execute_browser_action to open the popup natively

  // --- Custom reading domains sync (via /add page URL hash) ---
  async function startDomainSyncListener() {
    const hasPermission = await browser.permissions.contains({
      permissions: ["tabs"],
    });
    if (!hasPermission) return;

    browser.tabs.onUpdated.addListener((_tabId, changeInfo) => {
      if (!changeInfo.url) return;
      const hashIdx = changeInfo.url.indexOf("#customDomains=");
      if (hashIdx === -1) return;
      const encoded = changeInfo.url.slice(hashIdx + "#customDomains=".length);
      try {
        const domains = JSON.parse(decodeURIComponent(encoded));
        if (Array.isArray(domains)) {
          customReadingDomains.setValue(domains);
        }
      } catch {}
    });
  }

  startDomainSyncListener();
});
