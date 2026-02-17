import { blazemarksUrl, customReadingDomains } from "@/utils/storage";
import { buildAddUrl } from "@/utils/blazemarks";
import { isReadingDomain } from "@/utils/readingDomains";

const statusIcon = document.getElementById("status-icon")!;
const statusText = document.getElementById("status-text")!;
const pageTitle = document.getElementById("page-title")!;
const pageUrl = document.getElementById("page-url")!;
const readingRow = document.getElementById("reading-row")!;
const readLaterCheckbox = document.getElementById(
  "read-later",
) as HTMLInputElement;

let savedTabUrl = "";
let savedTabTitle: string | undefined;
let savedTabFavicon: string | undefined;
let initialReadLater = false;

async function saveCurrentTab() {
  try {
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tab?.url) {
      showError(browser.i18n.getMessage("noActiveTab"));
      return;
    }

    savedTabUrl = tab.url;
    savedTabTitle = tab.title;
    savedTabFavicon = tab.favIconUrl;

    // Check if domain is a reading domain (built-in + cached custom)
    const cachedDomains = await customReadingDomains.getValue();
    initialReadLater = isReadingDomain(tab.url, cachedDomains);

    const baseUrl = await blazemarksUrl.getValue();
    const addUrl = buildAddUrl(baseUrl, {
      url: tab.url,
      title: tab.title,
      favicon: tab.favIconUrl,
      readLater: initialReadLater || undefined,
    });

    await browser.tabs.create({ url: addUrl, active: false });

    statusIcon.className = "saved";
    statusText.textContent = browser.i18n.getMessage("saved");
    statusText.className = "success";
    pageTitle.textContent = tab.title || "";
    try {
      pageUrl.textContent = new URL(tab.url).hostname;
    } catch {
      pageUrl.textContent = tab.url;
    }

    // Show reading list checkbox
    readLaterCheckbox.checked = initialReadLater;
    readingRow.classList.remove("hidden");

    setTimeout(() => window.close(), 3500);
  } catch (err) {
    showError(browser.i18n.getMessage("failedToSave"));
  }
}

// Handle checkbox toggle — send update if state changed
readLaterCheckbox.addEventListener("change", async () => {
  const newValue = readLaterCheckbox.checked;
  if (newValue === initialReadLater) return;

  const baseUrl = await blazemarksUrl.getValue();
  const addUrl = buildAddUrl(baseUrl, {
    url: savedTabUrl,
    title: savedTabTitle,
    favicon: savedTabFavicon,
    readLater: newValue,
  });

  // Dedup in the app will update the existing bookmark
  await browser.tabs.create({ url: addUrl, active: false });
  initialReadLater = newValue;
});

function showError(message: string) {
  statusIcon.className = "error";
  statusText.textContent = message;
  statusText.className = "error";
}

// Localize static text
statusText.textContent = browser.i18n.getMessage("saving");
const readLaterLabel = document.getElementById("read-later-label");
const labelText = browser.i18n.getMessage("addToReadingList");
if (readLaterLabel && labelText) readLaterLabel.textContent = labelText;

saveCurrentTab();
