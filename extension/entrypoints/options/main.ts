import { blazemarksUrl, newTabRedirect } from "@/utils/storage";

const instanceUrlInput = document.getElementById(
  "instance-url",
) as HTMLInputElement;
const newtabToggle = document.getElementById(
  "newtab-toggle",
) as HTMLInputElement;
const permissionDenied = document.getElementById("permission-denied")!;
const shortcutValue = document.getElementById("shortcut-value")!;
const shortcutConfigure = document.getElementById("shortcut-configure")!;
const shortcutWarning = document.getElementById("shortcut-warning")!;

// --- Blazemarks URL ---

async function loadUrl() {
  instanceUrlInput.value = await blazemarksUrl.getValue();
}

instanceUrlInput.addEventListener("change", () => {
  const value = instanceUrlInput.value.trim();
  if (value) {
    blazemarksUrl.setValue(value);
  }
});

// --- New tab redirect ---

async function loadNewTabToggle() {
  newtabToggle.checked = await newTabRedirect.getValue();
}

newtabToggle.addEventListener("change", async () => {
  permissionDenied.classList.add("hidden");

  if (newtabToggle.checked) {
    // Request tabs permission if not already granted
    const granted = await browser.permissions.request({
      permissions: ["tabs"],
    });
    if (!granted) {
      newtabToggle.checked = false;
      permissionDenied.classList.remove("hidden");
      return;
    }
    await newTabRedirect.setValue(true);
  } else {
    await newTabRedirect.setValue(false);
  }
});

// --- Keyboard shortcut ---

async function loadShortcut() {
  const commands = await browser.commands.getAll();
  const saveCmd = commands.find((c) => c.name === "save-bookmark");
  if (saveCmd?.shortcut) {
    shortcutValue.textContent = saveCmd.shortcut;
    shortcutWarning.classList.add("hidden");
  } else {
    shortcutValue.textContent = "—";
    shortcutWarning.classList.remove("hidden");
  }
}

shortcutConfigure.addEventListener("click", () => {
  // Open the browser's built-in extension shortcut management page
  const isFirefox =
    navigator.userAgent.includes("Firefox") ||
    typeof (browser.runtime as any).getBrowserInfo === "function";
  if (isFirefox) {
    browser.tabs.create({ url: "about:addons" });
  } else {
    browser.tabs.create({ url: "chrome://extensions/shortcuts" });
  }
});

// --- Localize ---

function localize() {
  const msg = browser.i18n.getMessage;
  const setText = (id: string, key: string) => {
    const el = document.getElementById(id);
    if (el) {
      const text = msg(key);
      if (text) el.textContent = text;
    }
  };
  setText("options-title", "optionsTitle");
  setText("url-label", "blazemarksUrl");
  setText("url-description", "blazemarksUrlDescription");
  setText("newtab-label", "newTabLabel");
  setText("newtab-description", "newTabDescription");
  setText("permission-denied", "permissionDenied");
  setText("shortcut-label", "shortcutLabel");
  setText("shortcut-description", "shortcutDescription");
  setText("shortcut-warning", "shortcutWarning");

  const configureBtn = document.getElementById("shortcut-configure");
  const configureText = msg("shortcutConfigure");
  if (configureBtn && configureText) configureBtn.textContent = configureText;
}

localize();
loadUrl();
loadNewTabToggle();
loadShortcut();
