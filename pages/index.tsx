import { sqliteTrue } from "@evolu/common";
import { useQuery } from "@evolu/react";
import { create, props } from "@stylexjs/stylex";
import { Suspense, useCallback, useEffect, useState } from "react";
import { BookmarkList } from "../components/BookmarkList";
import { EditableTitle } from "../components/EditableTitle";
import { FilterBar } from "../components/FilterBar";
import { HamburgerMenu } from "../components/HamburgerMenu";
import { StarredShortcuts } from "../components/StarredShortcuts";
import { Toast } from "../components/Toast";
import { useT } from "../lib/i18n";
import { useSearch } from "../lib/hooks/useSearch";
import {
  buildProviderUrl,
  chatProviders,
  getChatProviderId,
  getSearchProviderId,
  searchProviders,
} from "../lib/providers";
import type { ChatProviderId, SearchProviderId } from "../lib/providers";
import {
  allBookmarksQuery,
  allBookmarkTagsQuery,
  allTagsQuery,
  settingsQuery,
} from "../lib/queries";
import { colors, fonts, fontSizes, spacing } from "../lib/Tokens.stylex";

function HomeContent() {
  const t = useT();
  const bookmarks = useQuery(allBookmarksQuery);
  const tags = useQuery(allTagsQuery);
  const bookmarkTags = useQuery(allBookmarkTagsQuery);
  const settings = useQuery(settingsQuery);

  const settingsRow = settings.length > 0 ? settings[0] : undefined;

  const {
    query,
    setQuery,
    sortBy,
    setSortBy,
    sortDir,
    setSortDir,
    filteredBookmarks,
  } = useSearch(bookmarks, bookmarkTags, tags);

  const handleTagClick = useCallback(
    (tagName: string) => {
      setQuery(`#${tagName}`);
    },
    [setQuery],
  );

  const [searchProviderId, setSearchProviderIdState] =
    useState<SearchProviderId>("google");
  const [chatProviderId, setChatProviderIdState] =
    useState<ChatProviderId>("google-ai");

  useEffect(() => {
    setSearchProviderIdState(getSearchProviderId());
    setChatProviderIdState(getChatProviderId());
  }, []);

  const handleWebSearch = useCallback(() => {
    const provider = searchProviders[searchProviderId];
    const url = query.trim()
      ? buildProviderUrl(provider.urlTemplate, query.trim())
      : provider.urlTemplate.split("?")[0] ?? provider.urlTemplate;
    window.open(url, "_blank", "noopener");
  }, [query, searchProviderId]);

  const handleChatSearch = useCallback(() => {
    const provider = chatProviders[chatProviderId];
    const url = query.trim()
      ? buildProviderUrl(provider.urlTemplate, query.trim())
      : provider.urlTemplate.split("?")[0] ?? provider.urlTemplate;
    window.open(url, "_blank", "noopener");
  }, [query, chatProviderId]);

  const hasBookmarks = bookmarks.length > 0;

  return (
    <div {...props(styles.page)}>
      <div {...props(styles.header)}>
        <EditableTitle
          settingsId={settingsRow?.id ?? null}
          currentTitle={settingsRow?.pageTitle ?? null}
        />
        <div {...props(styles.headerActions)}>
          <HamburgerMenu currentPath="/" />
        </div>
      </div>

      <StarredShortcuts bookmarks={bookmarks} />

      <div {...props(styles.searchRow)}>
        <div {...props(styles.searchWrapper)}>
          <input
            type="search"
            placeholder={t("home.searchPlaceholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            {...props(styles.searchBox)}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              {...props(styles.clearButton)}
              aria-label={t("home.clearSearch")}
            >
              &times;
            </button>
          )}
        </div>
        {settingsRow?.showSearchChat === sqliteTrue && (
          <div {...props(styles.providerButtons)}>
            <button
              type="button"
              onClick={handleWebSearch}
              {...props(styles.providerButton)}
            >
              {t("home.search")}
            </button>
            <button
              type="button"
              onClick={handleChatSearch}
              {...props(styles.providerButton)}
            >
              {t("home.chat")}
            </button>
          </div>
        )}
      </div>

      {hasBookmarks && (
        <FilterBar
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortDir={sortDir}
          setSortDir={setSortDir}
        />
      )}

      {hasBookmarks ? (
        <BookmarkList
          bookmarks={filteredBookmarks}
          allBookmarks={bookmarks}
          tags={tags}
          bookmarkTags={bookmarkTags}
          onTagClick={handleTagClick}
          mode="home"
        />
      ) : (
        <div {...props(styles.emptyState)}>
          <p {...props(styles.emptyText)}>
            {t("home.emptyState")}
          </p>
        </div>
      )}

      <Toast />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
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
    gap: spacing.m,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: spacing.s,
  },
  searchRow: {
    display: "flex",
    gap: spacing.xs,
    alignItems: "stretch",
  },
  searchWrapper: {
    flex: 1,
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  searchBox: {
    width: "100%",
    paddingBlock: spacing.xs,
    paddingInline: spacing.s,
    fontSize: fontSizes.step0,
    fontFamily: fonts.sans,
    color: colors.primary,
    backgroundColor: colors.hoverAndFocusBackground,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    borderRadius: 8,
    outline: "none",
    "::placeholder": {
      color: colors.secondary,
    },
    ":focus": {
      borderColor: colors.accent,
    },
  },
  clearButton: {
    position: "absolute",
    insetInlineEnd: 8,
    backgroundColor: "transparent",
    borderWidth: 0,
    cursor: "pointer",
    fontSize: fontSizes.step1,
    color: colors.accent,
    padding: spacing.xxxs,
    lineHeight: 1,
    ":hover": {
      color: colors.primary,
    },
  },
  providerButtons: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.xxxs,
  },
  providerButton: {
    flex: 1,
    paddingBlock: 0,
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
    whiteSpace: "nowrap",
    ":hover": {
      borderColor: colors.accent,
    },
  },
  emptyState: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: fontSizes.step0,
    fontFamily: fonts.sans,
    color: colors.secondary,
    textAlign: "center",
  },
});
