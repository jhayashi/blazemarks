import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { Locale, Translations } from "./types";
import { rtlLocales } from "./types";
import en from "./locales/en";

const STORAGE_KEY = "blazemarks-locale";

export function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && isLocale(stored)) return stored;
  const browserLang = navigator.language.split("-")[0];
  if (browserLang && isLocale(browserLang)) return browserLang;
  return "en";
}

function isLocale(s: string): s is Locale {
  return [
    "en",
    "es",
    "ja",
    "zh",
    "fr",
    "de",
    "pt",
    "ko",
    "it",
    "ar",
  ].includes(s);
}

export function setStoredLocale(locale: Locale) {
  localStorage.setItem(STORAGE_KEY, locale);
}

type TranslationKey = keyof Translations;

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
});

const loaders: Record<Locale, () => Promise<{ default: Translations }>> = {
  en: () => Promise.resolve({ default: en }),
  es: () => import("./locales/es"),
  ja: () => import("./locales/ja"),
  zh: () => import("./locales/zh"),
  fr: () => import("./locales/fr"),
  de: () => import("./locales/de"),
  pt: () => import("./locales/pt"),
  ko: () => import("./locales/ko"),
  it: () => import("./locales/it"),
  ar: () => import("./locales/ar"),
};

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [translations, setTranslations] = useState<Translations>(en);

  useEffect(() => {
    const detected = detectLocale();
    if (detected !== "en") {
      setLocaleState(detected);
      void loaders[detected]().then((m) => setTranslations(m.default));
    }
  }, []);

  useEffect(() => {
    document.documentElement.dir = rtlLocales.has(locale) ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    setStoredLocale(newLocale);
    if (newLocale === "en") {
      setTranslations(en);
    } else {
      void loaders[newLocale]().then((m) => setTranslations(m.default));
    }
  }, []);

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>) => {
      const template = translations[key] || en[key] || key;
      if (!params) return template;
      return template.replace(/\{(\w+)\}/g, (_, name: string) => {
        const val = params[name];
        return val !== undefined ? String(val) : `{${name}}`;
      });
    },
    [translations],
  );

  return createElement(I18nContext.Provider, { value: { locale, setLocale, t } }, children);
}

export function useT() {
  return useContext(I18nContext).t;
}

export function useLocale() {
  const { locale, setLocale } = useContext(I18nContext);
  return { locale, setLocale };
}

export type { Locale, Translations, TranslationKey };
