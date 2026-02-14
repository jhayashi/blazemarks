import { blazemarksUrl } from "@/utils/storage";
import { buildAddUrl } from "@/utils/blazemarks";

const statusIcon = document.getElementById("status-icon")!;
const statusText = document.getElementById("status-text")!;
const pageTitle = document.getElementById("page-title")!;
const pageUrl = document.getElementById("page-url")!;
const instanceUrlInput = document.getElementById(
  "instance-url",
) as HTMLInputElement;

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

    const baseUrl = await blazemarksUrl.getValue();
    const addUrl = buildAddUrl(baseUrl, {
      url: tab.url,
      title: tab.title,
      favicon: tab.favIconUrl,
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

    setTimeout(() => window.close(), 1500);
  } catch (err) {
    showError(browser.i18n.getMessage("failedToSave"));
  }
}

function showError(message: string) {
  statusIcon.className = "error";
  statusText.textContent = message;
  statusText.className = "error";
}

async function loadSettings() {
  const url = await blazemarksUrl.getValue();
  instanceUrlInput.value = url;
}

instanceUrlInput.addEventListener("change", () => {
  const value = instanceUrlInput.value.trim();
  if (value) {
    blazemarksUrl.setValue(value);
  }
});

// Localize static text
statusText.textContent = browser.i18n.getMessage("saving");
const urlLabel = document.querySelector('label[for="instance-url"]');
if (urlLabel) urlLabel.textContent = browser.i18n.getMessage("blazemarksUrl");

loadSettings();
saveCurrentTab();
