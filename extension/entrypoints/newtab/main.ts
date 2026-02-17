import { blazemarksUrl, newTabRedirect } from "@/utils/storage";

async function redirect() {
  const enabled = await newTabRedirect.getValue();
  if (!enabled) return;

  const url = await blazemarksUrl.getValue();
  window.location.replace(url);
}

redirect();
