import { create, props } from "@stylexjs/stylex";
import { Virtuoso } from "react-virtuoso";
import type { BookmarkRow, TagRow, BookmarkTagRow } from "../lib/queries";
import { useT } from "../lib/i18n";
import type { Mode } from "../lib/hooks/useSearch";
import { BookmarkCard } from "./BookmarkCard";
import { colors, fonts, fontSizes } from "../lib/Tokens.stylex";

interface BookmarkListProps {
  bookmarks: readonly BookmarkRow[];
  allBookmarks: readonly BookmarkRow[];
  tags: readonly TagRow[];
  bookmarkTags: readonly BookmarkTagRow[];
  onTagClick: (tagName: string) => void;
  mode: Mode;
}

export function BookmarkList({
  bookmarks,
  allBookmarks,
  tags,
  bookmarkTags,
  onTagClick,
  mode,
}: BookmarkListProps) {
  const t = useT();

  if (bookmarks.length === 0) {
    return (
      <div {...props(styles.empty)}>
        <p {...props(styles.emptyText)}>
          {mode === "reading" ? t("list.emptyReading") : t("list.emptySearch")}
        </p>
      </div>
    );
  }

  return (
    <Virtuoso
      useWindowScroll
      data={bookmarks}
      computeItemKey={(_index, bookmark) => bookmark.id}
      itemContent={(_index, bookmark) => (
        <BookmarkCard
          bookmark={bookmark}
          allBookmarks={allBookmarks}
          tags={tags}
          bookmarkTags={bookmarkTags}
          onTagClick={onTagClick}
          mode={mode}
        />
      )}
    />
  );
}

const styles = create({
  empty: {
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
