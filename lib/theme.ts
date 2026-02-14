import { bundledThemes, DEFAULT_THEME_ID } from "./themes";

/** Zed editor theme format types and loader. */

const STORAGE_KEY = "blazemarks-theme";

interface SavedTheme {
  themeId: string;
  custom?: ZedThemeFile;
}

export interface ZedThemeFile {
  $schema?: string;
  name: string;
  author?: string;
  themes: ZedTheme[];
}

export interface ZedTheme {
  name: string;
  appearance: "light" | "dark";
  style: Record<string, string>;
}

/**
 * Apply a Zed theme's style properties as CSS custom properties on the
 * document root. Keys like `text.muted` become `--text-muted`.
 */
export function applyThemeStyle(style: Record<string, string>): void {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(style)) {
    root.style.setProperty("--" + key.replaceAll(".", "-"), value);
  }
}

/**
 * Pick the theme matching the current `prefers-color-scheme` and apply it.
 * Returns a cleanup function that removes the inline styles.
 */
export function applyZedTheme(themeFile: ZedThemeFile): () => void {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const appearance = isDark ? "dark" : "light";
  const theme = themeFile.themes.find((t) => t.appearance === appearance);
  if (theme) {
    applyThemeStyle(theme.style);
  }

  // Listen for changes
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = (e: MediaQueryListEvent) => {
    const next = themeFile.themes.find(
      (t) => t.appearance === (e.matches ? "dark" : "light"),
    );
    if (next) {
      applyThemeStyle(next.style);
    }
  };
  mql.addEventListener("change", handler);

  return () => {
    mql.removeEventListener("change", handler);
    // Remove inline overrides so CSS :root rules take effect again
    const root = document.documentElement;
    if (theme) {
      for (const key of Object.keys(theme.style)) {
        root.style.removeProperty("--" + key.replaceAll(".", "-"));
      }
    }
  };
}

/** Read the saved theme ID from localStorage. Defaults to "bandley". */
export function getSelectedThemeId(): string {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: SavedTheme = JSON.parse(raw);
      return parsed.themeId;
    }
  } catch {
    // ignore
  }
  return DEFAULT_THEME_ID;
}

/** Read the saved custom theme file from localStorage, if any. */
export function getCustomThemeFile(): ZedThemeFile | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: SavedTheme = JSON.parse(raw);
      return parsed.custom;
    }
  } catch {
    // ignore
  }
  return undefined;
}

/** Save theme selection to localStorage and apply it immediately. */
export function setSelectedTheme(
  id: string,
  customFile?: ZedThemeFile,
): void {
  const saved: SavedTheme =
    id === "custom" && customFile
      ? { themeId: "custom", custom: customFile }
      : { themeId: id };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
}

/**
 * Read the saved theme from localStorage and apply it.
 * Returns a cleanup function that removes the media query listener.
 */
export function applySelectedTheme(): () => void {
  const saved = getSavedTheme();
  const themeFile = resolveThemeFile(saved);
  if (themeFile) {
    return applyZedTheme(themeFile);
  }
  return () => {};
}

/**
 * Apply the light variant of the saved theme, ignoring prefers-color-scheme.
 * Returns a no-op cleanup (no media listener needed since we force light).
 */
export function applyLightTheme(): () => void {
  const saved = getSavedTheme();
  const themeFile = resolveThemeFile(saved);
  if (!themeFile) return () => {};
  const light = themeFile.themes.find((t) => t.appearance === "light");
  if (light) applyThemeStyle(light.style);
  return () => {};
}

function getSavedTheme(): SavedTheme {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return { themeId: "bandley" };
}

function resolveThemeFile(saved: SavedTheme): ZedThemeFile | undefined {
  if (saved.themeId === "custom" && saved.custom) {
    return saved.custom;
  }
  return bundledThemes.find((t) => t.id === saved.themeId)?.file;
}
