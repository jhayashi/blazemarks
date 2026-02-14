const STORAGE_KEY = "blazemarks-sync-enabled";

export type SyncMode = "enabled" | "local-only";

export function getSyncMode(): SyncMode {
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    if (val === "enabled" || val === "local-only") return val;
  } catch {
    // SSR or storage unavailable
  }
  return "enabled";
}

export function setSyncMode(mode: SyncMode): void {
  localStorage.setItem(STORAGE_KEY, mode);
}
