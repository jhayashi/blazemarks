import { useQuery } from "@evolu/react";
import { create, props } from "@stylexjs/stylex";
import { Suspense, useCallback } from "react";
import { BookmarkList } from "../components/BookmarkList";
import { FilterBar } from "../components/FilterBar";
import { HamburgerMenu } from "../components/HamburgerMenu";
import { Toast } from "../components/Toast";
import { useT } from "../lib/i18n";
import { useSearch } from "../lib/hooks/useSearch";
import {
  allBookmarksQuery,
  allBookmarkTagsQuery,
  allTagsQuery,
} from "../lib/queries";
import { colors, fonts, fontSizes, spacing } from "../lib/Tokens.stylex";

function ReadingContent() {
  const t = useT();
  const bookmarks = useQuery(allBookmarksQuery);
  const tags = useQuery(allTagsQuery);
  const bookmarkTags = useQuery(allBookmarkTagsQuery);

  const { query, setQuery, sortBy, setSortBy, sortDir, setSortDir, filteredBookmarks } = useSearch(
    bookmarks,
    bookmarkTags,
    tags,
    "reading",
  );

  const handleTagClick = useCallback(
    (tagName: string) => {
      setQuery(`#${tagName}`);
    },
    [setQuery],
  );

  return (
    <div {...props(styles.page)}>
      <div {...props(styles.header)}>
        <h1 {...props(styles.title)}>{t("reading.title")}</h1>
        <HamburgerMenu currentPath="/reading" />
      </div>

      <div {...props(styles.searchWrapper)}>
        <input
          type="search"
          placeholder={t("reading.searchPlaceholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          {...props(styles.searchBox)}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            {...props(styles.clearButton)}
            aria-label={t("reading.clearSearch")}
          >
            &times;
          </button>
        )}
      </div>

      {bookmarks.length > 0 && (
        <FilterBar
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortDir={sortDir}
          setSortDir={setSortDir}
        />
      )}

      <BookmarkList
        bookmarks={filteredBookmarks}
        allBookmarks={bookmarks}
        tags={tags}
        bookmarkTags={bookmarkTags}
        onTagClick={handleTagClick}
        mode="reading"
      />

      <Toast />
    </div>
  );
}

export default function Reading() {
  return (
    <Suspense>
      <ReadingContent />
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
  title: {
    fontSize: fontSizes.step2,
    fontFamily: fonts.sans,
    color: colors.primary,
    fontWeight: 700,
  },
  searchWrapper: {
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
});
