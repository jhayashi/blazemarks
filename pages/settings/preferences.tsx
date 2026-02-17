import { AppOwner, Mnemonic, sqliteTrue } from "@evolu/common";
import { useQuery } from "@evolu/react";
import { create, props } from "@stylexjs/stylex";
import { useCallback, useEffect, useRef, useState } from "react";
import { HamburgerMenu } from "../../components/HamburgerMenu";
import { Toast, toast } from "elf-components/toast";
import { ThemePicker } from "elf-components/settings/theme-picker";
import { AppearancePicker } from "elf-components/settings/appearance-picker";
import { AccountSection } from "elf-components/settings/account";
import { SyncSection } from "elf-components/settings/sync";
import { bundledThemes } from "elf-components/theme-files";
import type { Appearance } from "elf-components/theme";
import { useT, useLocale } from "../../lib/i18n";
import { locales, localeNames } from "../../lib/i18n/types";
import type { Locale } from "../../lib/i18n/types";
import { getEvolu } from "../../lib/Db";
import { getSyncMode, setSyncMode, type SyncMode } from "../../lib/syncPreference";
import { generateBookmarkletCode } from "../../lib/bookmarklet";
import {
  createSettings,
  updateShowSearchChat,
  updateCustomReadingDomains,
} from "../../lib/mutations";
import { getSettingsQuery } from "../../lib/queries";
import type { SearchProviderId, ChatProviderId } from "../../lib/providers";
import {
  searchProviders,
  chatProviders,
  getSearchProviderId,
  setSearchProviderId,
  getChatProviderId,
  setChatProviderId,
} from "../../lib/providers";
import { colors, fonts, fontSizes, spacing } from "../../lib/Tokens.stylex";
import { themeManager } from "../_app";

export default function Preferences() {
  const t = useT();
  const { locale, setLocale } = useLocale();
  const settings = useQuery(getSettingsQuery());
  const settingsRow = settings.length > 0 ? settings[0] : undefined;

  const [owner, setOwner] = useState<AppOwner | null>(null);
  const [activeThemeId, setActiveThemeId] = useState<string>("");
  const [appearance, setAppearanceState] = useState<Appearance>("system");

  const [activeSearchProvider, setActiveSearchProvider] =
    useState<SearchProviderId>("google");
  const [activeChatProvider, setActiveChatProvider] =
    useState<ChatProviderId>("google-ai");
  const [syncMode, setSyncModeState] = useState<SyncMode>("enabled");

  useEffect(() => {
    void getEvolu().appOwner.then(setOwner);
    setActiveThemeId(themeManager.getSelectedId());
    setAppearanceState(themeManager.getAppearance());
    setActiveSearchProvider(getSearchProviderId());
    setActiveChatProvider(getChatProviderId());
    setSyncModeState(getSyncMode());
  }, []);

  const handleThemeSelect = useCallback((id: string) => {
    themeManager.setSelected(id);
    setActiveThemeId(id);
    themeManager.applySelected();
  }, []);

  const handleAppearanceChange = useCallback((value: Appearance) => {
    themeManager.setAppearance(value);
    setAppearanceState(value);
    themeManager.applySelected();
  }, []);

  const handleRestoreOwner = useCallback(() => {
    const mnemonic = window.prompt(t("settings.enterIdentityPhrase"));
    if (!mnemonic) return;
    const result = Mnemonic.from(mnemonic);
    if (!result.ok) {
      alert(t("settings.invalidIdentityPhrase"));
      return;
    }
    void getEvolu().restoreAppOwner(result.value);
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
      void getEvolu().resetAppOwner();
    }
  }, [t]);

  const customDomainsRaw = settingsRow?.customReadingDomains ?? "";
  const customDomainsText = (() => {
    try {
      const parsed = JSON.parse(customDomainsRaw);
      return Array.isArray(parsed) ? parsed.join("\n") : "";
    } catch {
      return "";
    }
  })();

  const handleCustomDomainsChange = useCallback(
    (value: string) => {
      const domains = value
        .split(/[\n,]/)
        .map((d) => d.trim().toLowerCase())
        .filter(Boolean);
      const json = JSON.stringify(domains);
      if (settingsRow) {
        updateCustomReadingDomains(settingsRow.id, json);
      } else {
        createSettings({ customReadingDomains: json });
      }
    },
    [settingsRow],
  );

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
        <h2 {...props(styles.sectionTitle)}>{t("settings.savingBookmarks")}</h2>
        <p {...props(styles.helpText)}>
          {t("settings.extensionHelp")}
        </p>
        <div {...props(styles.extensionLinks)}>
          <a
            href="https://chromewebstore.google.com/detail/blazemarks/fdcdkhejnjjdmijdnmiinfmldkmflomh"
            target="_blank"
            rel="noopener noreferrer"
            {...props(styles.extensionLink)}
          >
            {t("settings.chromeExtension")}
          </a>
          <a
            href="https://addons.mozilla.org/en-US/firefox/addon/blazemarks/"
            target="_blank"
            rel="noopener noreferrer"
            {...props(styles.extensionLink)}
          >
            {t("settings.firefoxExtension")}
          </a>
        </div>
        <h3 {...props(styles.subheading)}>{t("settings.bookmarkletSubheading")}</h3>
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
        <h2 {...props(styles.sectionTitle)}>
          {t("settings.customReadingDomains")}
        </h2>
        <p {...props(styles.helpText)}>
          {t("settings.customReadingDomainsHelp")}
        </p>
        <textarea
          defaultValue={customDomainsText}
          onBlur={(e) => handleCustomDomainsChange(e.target.value)}
          placeholder={"example.com\nblog.example.org"}
          rows={4}
          {...props(styles.textarea)}
        />
      </section>

      <section {...props(styles.section)}>
        <h2 {...props(styles.sectionTitle)}>{t("settings.theme")}</h2>
        <ThemePicker
          themes={bundledThemes}
          activeThemeId={activeThemeId}
          onSelect={handleThemeSelect}
        />
      </section>

      <section {...props(styles.section)}>
        <h2 {...props(styles.sectionTitle)}>{t("settings.appearance")}</h2>
        <AppearancePicker
          appearance={appearance}
          onChange={handleAppearanceChange}
        />
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

      <AccountSection
        owner={owner?.mnemonic ? { mnemonic: owner.mnemonic } : null}
        onRestore={handleRestoreOwner}
        onReset={handleResetOwner}
        title={t("settings.account")}
        labels={{
          showIdentityPhrase: t("settings.showIdentityPhrase"),
          hideIdentityPhrase: t("settings.hideIdentityPhrase"),
          restore: t("settings.restoreIdentity"),
          reset: t("settings.resetAllData"),
        }}
      />

      <SyncSection
        enabled={syncMode === "enabled"}
        onToggle={handleSyncToggle}
        title={t("settings.sync")}
        helpText={t("settings.syncHelp")}
        enabledLabel={t("settings.syncEnabled")}
        disabledLabel={t("settings.syncDisabled")}
      />

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
  subheading: {
    fontSize: fontSizes.step0,
    fontFamily: fonts.sans,
    color: colors.primary,
    fontWeight: 600,
    margin: 0,
  },
  extensionLinks: {
    display: "flex",
    gap: spacing.s,
    flexWrap: "wrap",
  },
  extensionLink: {
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
    textDecoration: "none",
    ":hover": {
      borderColor: colors.accent,
    },
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
  textarea: {
    width: "100%",
    paddingBlock: spacing.xs,
    paddingInline: spacing.s,
    fontSize: fontSizes.step_1,
    fontFamily: fonts.mono,
    color: colors.primary,
    backgroundColor: colors.hoverAndFocusBackground,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    borderRadius: 6,
    outline: "none",
    resize: "vertical",
    ":focus": {
      borderColor: colors.accent,
    },
  },
});
