import { blazemarksUrl, focusSearch, newTabRedirect } from "@/utils/storage";

async function redirect() {
  const enabled = await newTabRedirect.getValue();
  if (!enabled) return;

  const url = await blazemarksUrl.getValue();
  const shouldFocus = await focusSearch.getValue();

  if (!shouldFocus) {
    window.location.replace(url);
    return;
  }

  const u = new URL(url);
  u.searchParams.set("focus", "search");
  // Firefox keeps keyboard focus in the address bar when this new-tab page
  // merely navigates itself, so the site can never focus its search input
  // (document.hasFocus() stays false). Tabs created directly at a real URL
  // focus the page content instead (Firefox 80+), so replace this tab with
  // a fresh one. Same approach as the New Tab Override add-on.
  // (Don't pass cookieStoreId here — it requires the "cookies" permission,
  // which we don't have, and tabs.create rejects if it's present.)
  try {
    const current = await browser.tabs.getCurrent();
    if (current?.id === undefined) throw new Error("no current tab");
    await browser.tabs.create({
      url: u.toString(),
      index: current.index,
      active: true,
    });
    await browser.tabs.remove(current.id);
  } catch {
    // Fall back to in-place navigation: the search box won't get keyboard
    // focus, but the site still loads.
    window.location.replace(u.toString());
  }
}

redirect();
