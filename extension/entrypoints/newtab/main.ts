import { blazemarksUrl, focusSearch, newTabRedirect } from "@/utils/storage";

async function redirect() {
  const enabled = await newTabRedirect.getValue();
  if (!enabled) return;

  let url = await blazemarksUrl.getValue();
  const shouldFocus = await focusSearch.getValue();
  if (shouldFocus) {
    const u = new URL(url);
    u.searchParams.set("focus", "search");
    url = u.toString();
  }
  window.location.replace(url);
}

redirect();
