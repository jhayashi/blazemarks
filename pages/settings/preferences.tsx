import { AppOwner, Mnemonic, sqliteTrue } from "@evolu/common";
import { useQuery } from "@evolu/react";
import { create, props } from "@stylexjs/stylex";
import { useCallback, useEffect, useRef, useState } from "react";
import { HamburgerMenu } from "../../components/HamburgerMenu";
import { Toast, toast } from "../../components/Toast";
import { useT, useLocale } from "../../lib/i18n";
import { locales, localeNames } from "../../lib/i18n/types";
import type { Locale } from "../../lib/i18n/types";
import { evolu } from "../../lib/Db";
import { getSyncMode, setSyncMode, type SyncMode } from "../../lib/syncPreference";
import { generateBookmarkletCode } from "../../lib/bookmarklet";
import { createSettings, updateShowSearchChat } from "../../lib/mutations";
import { settingsQuery } from "../../lib/queries";
import type { SearchProviderId, ChatProviderId } from "../../lib/providers";
import {
  searchProviders,
  chatProviders,
  getSearchProviderId,
  setSearchProviderId,
  getChatProviderId,
  setChatProviderId,
} from "../../lib/providers";
import { bundledThemes } from "../../lib/themes";
import {
  applyZedTheme,
  getSelectedThemeId,
  setSelectedTheme,
} from "../../lib/theme";
import { colors, fonts, fontSizes, spacing } from "../../lib/Tokens.stylex";

export default function Preferences() {
  const t = useT();
  const { locale, setLocale } = useLocale();
  const settings = useQuery(settingsQuery);
  const settingsRow = settings.length > 0 ? settings[0] : undefined;

  const [owner, setOwner] = useState<AppOwner | null>(null);
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [activeThemeId, setActiveThemeId] = useState<string>("");

  const [activeSearchProvider, setActiveSearchProvider] =
    useState<SearchProviderId>("google");
  const [activeChatProvider, setActiveChatProvider] =
    useState<ChatProviderId>("google-ai");
  const [syncMode, setSyncModeState] = useState<SyncMode>("enabled");

  useEffect(() => {
    void evolu.appOwner.then(setOwner);
    setActiveThemeId(getSelectedThemeId());
    setActiveSearchProvider(getSearchProviderId());
    setActiveChatProvider(getChatProviderId());
    setSyncModeState(getSyncMode());
  }, []);

  const handleThemeSelect = useCallback((id: string) => {
    const entry = bundledThemes.find((t) => t.id === id);
    if (!entry) return;
    setSelectedTheme(id);
    setActiveThemeId(id);
    applyZedTheme(entry.file);
  }, []);

  const handleRestoreOwner = useCallback(() => {
    const mnemonic = window.prompt(t("settings.enterMnemonic"));
    if (!mnemonic) return;
    const result = Mnemonic.from(mnemonic);
    if (!result.ok) {
      alert(t("settings.invalidMnemonic"));
      return;
    }
    void evolu.restoreAppOwner(result.value);
  }, [t]);

  const handleSyncToggle = useCallback(() => {
    const newMode: SyncMode = syncMode === "enabled" ? "local-only" : "enabled";
    const msg =
      newMode === "local-only"
        ? t("settings.syncConfirmDisable")
        : t("settings.syncConfirmEnable");
    if (!confirm(msg)) return;
    setSyncMode(newMode);
    window.location.reload();
  }, [syncMode, t]);

  const handleResetOwner = useCallback(() => {
    if (confirm(t("settings.confirmReset"))) {
      void evolu.resetAppOwner();
    }
  }, [t]);

  const [bookmarkletCode, setBookmarkletCode] = useState("");
  const bookmarkletWrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const code = generateBookmarkletCode(window.location.origin);
    setBookmarkletCode(code);
    if (bookmarkletWrapperRef.current) {
      const a = document.createElement("a");
      a.href = code;
      a.textContent = "+ BlazeMarks";
      a.style.cssText =
        "display:inline-block;align-self:flex-start;padding:6px 12px;font-size:0.9rem;color:#fff;background:var(--text-accent);border-radius:6px;text-decoration:none;cursor:grab;";
      a.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
      bookmarkletWrapperRef.current.replaceChildren(a);
    }
  }, []);

  const handleCopyBookmarklet = useCallback(() => {
    void navigator.clipboard.writeText(bookmarkletCode).then(() => {
      toast(t("settings.toastBookmarkletCopied"));
    });
  }, [bookmarkletCode, t]);

  return (
    <div {...props(styles.page)}>
      <div {...props(styles.header)}>
        <h1 {...props(styles.title)}>{t("settings.title")}</h1>
        <HamburgerMenu currentPath="/settings/preferences" />
      </div>

      <section {...props(styles.section)}>
        <h2 {...props(styles.sectionTitle)}>{t("settings.bookmarklet")}</h2>
        <p {...props(styles.helpText)}>
          {t("settings.bookmarkletHelp")}
        </p>
        <div ref={bookmarkletWrapperRef} />
        {bookmarkletCode && (
          <div {...props(styles.codeRow)}>
            <code {...props(styles.code)}>
              {bookmarkletCode.slice(0, 80)}...
            </code>
            <button
              type="button"
              onClick={handleCopyBookmarklet}
              {...props(styles.button)}
            >
              {t("settings.copy")}
            </button>
          </div>
        )}
      </section>

      <section {...props(styles.section)}>
        <h2 {...props(styles.sectionTitle)}>{t("settings.searchChat")}</h2>
        <label {...props(styles.toggleRow)}>
          <input
            type="checkbox"
            checked={settingsRow?.showSearchChat === sqliteTrue}
            onChange={(e) => {
              if (settingsRow) {
                updateShowSearchChat(settingsRow.id, e.target.checked);
              } else {
                createSettings({ showSearchChat: e.target.checked });
              }
            }}
          />
          <span {...props(styles.toggleLabel)}>
            {t("settings.showSearchChat")}
          </span>
        </label>
        <div {...props(styles.selectRow)}>
          <label {...props(styles.selectLabel)}>
            {t("settings.searchProvider")}
            <select
              value={activeSearchProvider}
              onChange={(e) => {
                const val = e.target.value as SearchProviderId;
                setActiveSearchProvider(val);
                setSearchProviderId(val);
              }}
              {...props(styles.select)}
            >
              {(
                Object.entries(searchProviders) as [
                  SearchProviderId,
                  (typeof searchProviders)[SearchProviderId],
                ][]
              ).map(([id, p]) => (
                <option key={id} value={id}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>
          <label {...props(styles.selectLabel)}>
            {t("settings.chatProvider")}
            <select
              value={activeChatProvider}
              onChange={(e) => {
                const val = e.target.value as ChatProviderId;
                setActiveChatProvider(val);
                setChatProviderId(val);
              }}
              {...props(styles.select)}
            >
              {(
                Object.entries(chatProviders) as [
                  ChatProviderId,
                  (typeof chatProviders)[ChatProviderId],
                ][]
              ).map(([id, p]) => (
                <option key={id} value={id}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section {...props(styles.section)}>
        <h2 {...props(styles.sectionTitle)}>{t("settings.theme")}</h2>
        <div {...props(styles.themeGrid)}>
          {bundledThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeSelect(theme.id)}
              {...props(
                styles.themeButton,
                activeThemeId === theme.id && styles.themeButtonActive,
              )}
            >
              {theme.name}
            </button>
          ))}
        </div>
      </section>

      <section {...props(styles.section)}>
        <h2 {...props(styles.sectionTitle)}>{t("settings.language")}</h2>
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
          {...props(styles.select)}
        >
          {locales.map((loc) => (
            <option key={loc} value={loc}>
              {localeNames[loc]}
            </option>
          ))}
        </select>
      </section>

      <section {...props(styles.section)}>
        <h2 {...props(styles.sectionTitle)}>{t("settings.account")}</h2>
        <button
          onClick={() => setShowMnemonic(!showMnemonic)}
          {...props(styles.button)}
        >
          {showMnemonic ? t("settings.hideMnemonic") : t("settings.showMnemonic")}
        </button>
        {showMnemonic && owner && (
          <p {...props(styles.mnemonic)}>{owner.mnemonic}</p>
        )}
        <button onClick={handleRestoreOwner} {...props(styles.button)}>
          {t("settings.restoreOwner")}
        </button>
        <button onClick={handleResetOwner} {...props(styles.buttonDanger)}>
          {t("settings.resetOwner")}
        </button>
      </section>

      <section {...props(styles.section)}>
        <h2 {...props(styles.sectionTitle)}>{t("settings.sync")}</h2>
        <p {...props(styles.helpText)}>{t("settings.syncHelp")}</p>
        <label {...props(styles.toggleRow)}>
          <input
            type="checkbox"
            checked={syncMode === "enabled"}
            onChange={handleSyncToggle}
          />
          <span {...props(styles.toggleLabel)}>
            {syncMode === "enabled"
              ? t("settings.syncEnabled")
              : t("settings.syncDisabled")}
          </span>
        </label>
      </section>

      <Toast />
    </div>
  );
}

const styles = create({
  page: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    maxWidth: "48rem",
    width: "100%",
    marginInline: "auto",
    paddingBlock: spacing.m,
    paddingInline: spacing.s,
    gap: spacing.l,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: fontSizes.step2,
    fontFamily: fonts.sans,
    color: colors.primary,
    fontWeight: 700,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.s,
  },
  sectionTitle: {
    fontSize: fontSizes.step1,
    fontFamily: fonts.sans,
    color: colors.primary,
    fontWeight: 600,
  },
  toggleRow: {
    display: "flex",
    alignItems: "center",
    gap: spacing.xs,
    cursor: "pointer",
  },
  toggleLabel: {
    fontSize: fontSizes.step_1,
    fontFamily: fonts.sans,
    color: colors.primary,
  },
  helpText: {
    fontSize: fontSizes.step_1,
    fontFamily: fonts.sans,
    color: colors.secondary,
  },
  codeRow: {
    display: "flex",
    alignItems: "center",
    gap: spacing.xs,
  },
  code: {
    flex: 1,
    fontSize: fontSizes.step_2,
    fontFamily: fonts.mono,
    color: colors.secondary,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    padding: spacing.xs,
    backgroundColor: colors.hoverAndFocusBackground,
    borderRadius: 4,
  },
  selectRow: {
    display: "flex",
    gap: spacing.m,
    flexWrap: "wrap",
  },
  selectLabel: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.xxs,
    fontSize: fontSizes.step_1,
    fontFamily: fonts.sans,
    color: colors.secondary,
  },
  select: {
    paddingBlock: spacing.xs,
    paddingInline: spacing.s,
    fontSize: fontSizes.step_1,
    fontFamily: fonts.sans,
    color: colors.primary,
    backgroundColor: colors.hoverAndFocusBackground,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    borderRadius: 6,
    cursor: "pointer",
    outline: "none",
    ":focus": {
      borderColor: colors.accent,
    },
  },
  themeGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  themeButton: {
    paddingBlock: spacing.xs,
    paddingInline: spacing.s,
    fontSize: fontSizes.step_1,
    fontFamily: fonts.sans,
    color: colors.primary,
    backgroundColor: colors.hoverAndFocusBackground,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    borderRadius: 6,
    cursor: "pointer",
    ":hover": {
      borderColor: colors.accent,
    },
  },
  themeButtonActive: {
    borderColor: colors.accent,
    color: colors.accent,
  },
  button: {
    alignSelf: "flex-start",
    paddingBlock: spacing.xs,
    paddingInline: spacing.s,
    fontSize: fontSizes.step_1,
    fontFamily: fonts.sans,
    color: colors.primary,
    backgroundColor: colors.hoverAndFocusBackground,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    borderRadius: 6,
    cursor: "pointer",
    ":hover": {
      borderColor: colors.accent,
    },
  },
  buttonDanger: {
    alignSelf: "flex-start",
    paddingBlock: spacing.xs,
    paddingInline: spacing.s,
    fontSize: fontSizes.step_1,
    fontFamily: fonts.sans,
    color: colors.error,
    backgroundColor: colors.hoverAndFocusBackground,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    borderRadius: 6,
    cursor: "pointer",
    ":hover": {
      borderColor: colors.error,
    },
  },
  mnemonic: {
    textWrap: "balance",
    textAlign: "center",
    fontFamily: fonts.mono,
    color: colors.primary,
    fontSize: fontSizes.step_1,
    padding: spacing.s,
    backgroundColor: colors.hoverAndFocusBackground,
    borderRadius: 6,
  },
});
