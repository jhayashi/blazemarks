import { create, props } from "@stylexjs/stylex";
import { useCallback, useState } from "react";
import type { BookmarkRow, TagRow, BookmarkTagRow } from "../lib/queries";
import {
  toggleStar,
  toggleRead,
  trackVisit,
  deleteBookmark,
} from "../lib/mutations";
import { useT } from "../lib/i18n";
import type { Mode } from "../lib/hooks/useSearch";
import { BookmarkForm } from "./BookmarkForm";
import { TagChip } from "./TagChip";
import { colors, fonts, fontSizes, spacing } from "../lib/Tokens.stylex";

interface BookmarkCardProps {
  bookmark: BookmarkRow;
  allBookmarks: readonly BookmarkRow[];
  tags: readonly TagRow[];
  bookmarkTags: readonly BookmarkTagRow[];
  onTagClick: (tagName: string) => void;
  mode: Mode;
}

/** Extract short site name: "www.nytimes.com" → "nytimes" */
function getSiteName(url: string | null): string {
  if (!url) return "";
  try {
    const hostname = new URL(url).hostname;
    const parts = hostname.replace(/^www\./, "").split(".");
    // For 4-part domains (host.company.tld.country), use the company (index 1)
    // For 3-part (sub.domain.tld) or 2-part (domain.tld), use second-to-last
    if (parts.length >= 4) {
      return parts[1] ?? "";
    }
    return (parts.length > 1 ? parts[parts.length - 2] : parts[0]) ?? "";
  } catch {
    return "";
  }
}

export function BookmarkCard({
  bookmark,
  allBookmarks,
  tags,
  bookmarkTags,
  onTagClick,
  mode,
}: BookmarkCardProps) {
  const t = useT();
  const [editing, setEditing] = useState(false);

  const bookmarkTagRows = bookmarkTags.filter(
    (bt) => bt.bookmarkId === bookmark.id,
  );
  const bookmarkTagList = bookmarkTagRows
    .map((bt) => {
      const tag = tags.find((t) => t.id === bt.tagId);
      return tag ? { ...tag, bookmarkTagId: bt.id } : null;
    })
    .filter(Boolean) as (TagRow & { bookmarkTagId: string })[];

  const handleClick = useCallback(() => {
    trackVisit(bookmark.id, bookmark.visitCount);
    if (bookmark.url) {
      let openUrl = bookmark.url;
      if (mode === "reading") {
        try {
          const u = new URL(bookmark.url);
          u.hash = u.hash
            ? u.hash + "&__blazemarks_reader"
            : "__blazemarks_reader";
          openUrl = u.toString();
        } catch {
          // invalid URL, open as-is
        }
      }
      window.open(openUrl, "_blank", "noopener");
    }
  }, [bookmark.id, bookmark.visitCount, bookmark.url, mode]);

  const handleStar = useCallback(() => {
    toggleStar(bookmark.id, bookmark.isStarred);
  }, [bookmark.id, bookmark.isStarred]);

  const handleDelete = useCallback(() => {
    if (confirm(t("bookmark.confirmDelete"))) {
      deleteBookmark(bookmark.id);
    }
  }, [bookmark.id, t]);

  const handleToggleRead = useCallback(() => {
    toggleRead(bookmark.id, bookmark.isRead);
  }, [bookmark.id, bookmark.isRead]);

  const siteName = getSiteName(bookmark.url);
  const hasSecondLine =
    bookmark.description || bookmarkTagList.length > 0 || (bookmark.visitCount ?? 0) > 0;

  const isRead = bookmark.isRead === 1;

  return (
    <div {...props(styles.card, mode === "reading" && isRead && styles.dimmed)}>
      {/* Line 1: favicon + title + site name + star + delete */}
      <div {...props(styles.topRow)}>
        {mode === "reading" && (
          <button
            type="button"
            onClick={handleToggleRead}
            {...props(styles.readCheckbox, isRead && styles.readCheckboxChecked)}
            aria-label={isRead ? t("bookmark.markUnread") : t("bookmark.markRead")}
          >
            {isRead ? "\u2713" : ""}
          </button>
        )}
        <button
          type="button"
          onClick={() => setEditing(!editing)}
          {...props(styles.faviconButton)}
          aria-label={t("bookmark.edit")}
        >
          {bookmark.favicon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={bookmark.favicon}
              alt=""
              width={16}
              height={16}
              {...props(styles.favicon)}
              onError={(e) => {
                (e.target as HTMLImageElement).style.visibility = "hidden";
              }}
            />
          ) : (
            <span {...props(styles.faviconPlaceholder)} />
          )}
        </button>
        <button
          type="button"
          onClick={handleClick}
          {...props(styles.mainContent)}
        >
          <span {...props(styles.title)}>
            {bookmark.title || siteName || bookmark.url}
          </span>
          {siteName && (
            <span {...props(styles.siteName)}>{siteName}</span>
          )}
        </button>
        <div {...props(styles.actions)}>
          <button
            type="button"
            onClick={handleStar}
            {...props(styles.actionButton, bookmark.isStarred === 1 && styles.starred)}
            aria-label={bookmark.isStarred ? t("bookmark.unstar") : t("bookmark.star")}
          >
            {bookmark.isStarred === 1 ? "\u2605" : "\u2606"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            {...props(styles.actionButton, styles.deleteButton)}
            aria-label={t("bookmark.delete")}
          >
            &times;
          </button>
        </div>
      </div>

      {/* Line 2: description + tags + visit count */}
      {!editing && hasSecondLine && (
        <div {...props(styles.bottomRow)}>
          {bookmark.description && (
            <span {...props(styles.description)}>{bookmark.description}</span>
          )}
          {bookmarkTagList.map((tag) => (
            <TagChip
              key={tag.id}
              name={tag.name ?? ""}
              onClick={() => onTagClick(tag.name ?? "")}
            />
          ))}
          {(bookmark.visitCount ?? 0) > 0 && (
            <span {...props(styles.visitCount)}>
              {bookmark.visitCount} {bookmark.visitCount === 1 ? t("bookmark.visit") : t("bookmark.visits")}
            </span>
          )}
        </div>
      )}

      {/* Inline edit form */}
      {editing && (
        <BookmarkForm
          bookmarks={allBookmarks}
          tags={tags}
          bookmarkTags={bookmarkTags}
          editBookmark={bookmark}
          onClose={() => setEditing(false)}
        />
      )}
    </div>
  );
}

const styles = create({
  card: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    paddingBlock: spacing.xs,
    paddingInline: spacing.s,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.borderLighter,
  },
  topRow: {
    display: "flex",
    alignItems: "center",
    gap: spacing.xs,
  },
  faviconButton: {
    appearance: "none",
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    margin: 0,
    cursor: "pointer",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 16,
    height: 16,
    ":hover": {
      opacity: 0.7,
    },
  },
  mainContent: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: spacing.xs,
    appearance: "none",
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    margin: 0,
    cursor: "pointer",
    textAlign: "start",
    minWidth: 0,
    overflow: "hidden",
  },
  favicon: {
    flexShrink: 0,
    borderRadius: 2,
    width: 16,
    height: 16,
  },
  faviconPlaceholder: {
    display: "inline-block",
    flexShrink: 0,
    width: 16,
    height: 16,
  },
  title: {
    fontSize: fontSizes.step_1,
    fontFamily: fonts.sans,
    color: colors.primary,
    fontWeight: 500,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    flexShrink: 1,
    minWidth: 0,
  },
  siteName: {
    fontSize: fontSizes.step_2,
    fontFamily: fonts.sans,
    color: colors.disabled,
    flexShrink: 0,
    whiteSpace: "nowrap",
    marginInlineStart: "auto",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: spacing.xxxs,
  },
  actionButton: {
    appearance: "none",
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: spacing.xxxs,
    margin: 0,
    cursor: "pointer",
    fontSize: fontSizes.step0,
    color: colors.secondary,
    lineHeight: 1,
    ":hover": {
      color: colors.accent,
    },
  },
  starred: {
    color: colors.success,
  },
  dimmed: {
    opacity: 0.5,
  },
  readCheckbox: {
    appearance: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: 18,
    height: 18,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: colors.secondary,
    borderRadius: "50%",
    backgroundColor: "transparent",
    cursor: "pointer",
    padding: 0,
    margin: 0,
    fontSize: 11,
    lineHeight: 1,
    color: "transparent",
    ":hover": {
      borderColor: colors.accent,
    },
  },
  readCheckboxChecked: {
    borderColor: colors.success,
    backgroundColor: colors.success,
    color: "#fff",
  },
  deleteButton: {
    fontSize: fontSizes.step_1,
    ":hover": {
      color: colors.error,
    },
  },
  bottomRow: {
    display: "flex",
    alignItems: "center",
    gap: spacing.xs,
    paddingInlineStart: 24,
    overflow: "hidden",
  },
  description: {
    fontSize: fontSizes.step_2,
    fontFamily: fonts.sans,
    color: colors.secondary,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    flexShrink: 1,
    minWidth: 0,
  },
  visitCount: {
    fontSize: fontSizes.step_2,
    fontFamily: fonts.sans,
    color: colors.warning,
    flexShrink: 0,
    whiteSpace: "nowrap",
    marginInlineStart: "auto",
  },
});
