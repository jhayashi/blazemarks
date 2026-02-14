import { useState, useMemo, useEffect, useRef } from "react";
import type { BookmarkRow, TagRow, BookmarkTagRow } from "../queries";

export type SortBy = "createdAt" | "lastVisitedAt" | "visitCount";
export type SortDir = "asc" | "desc";
export type Mode = "home" | "reading";

export function useSearch(
  bookmarks: readonly BookmarkRow[],
  bookmarkTags: readonly BookmarkTagRow[],
  tags: readonly TagRow[],
  mode: Mode = "home",
) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setDebouncedQuery(query), 200);
    return () => clearTimeout(timerRef.current);
  }, [query]);

  const filteredBookmarks = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    // Pre-filter by mode
    let result =
      mode === "reading"
        ? bookmarks.filter((b) => b.isForReading === 1)
        : [...bookmarks];

    if (q) {
      // Check for #tag filter
      const tagMatch = q.match(/^#(\S+)$/);
      if (tagMatch) {
        const tagName = tagMatch[1];
        const matchingTag = tags.find(
          (t) => (t.name ?? "").toLowerCase() === tagName,
        );
        if (matchingTag) {
          const bookmarkIds = new Set(
            bookmarkTags
              .filter((bt) => bt.tagId === matchingTag.id)
              .map((bt) => bt.bookmarkId),
          );
          result = result.filter((b) => bookmarkIds.has(b.id));
        } else {
          result = [];
        }
      } else {
        // Text search: every token must match in title, url, or description
        const tokens = q.split(/\s+/).filter(Boolean);
        result = result.filter((b) => {
          const haystack = [
            (b.title ?? "").toLowerCase(),
            (b.url ?? "").toLowerCase(),
            (b.description ?? "").toLowerCase(),
          ].join(" ");
          return tokens.every((token) => haystack.includes(token));
        });
      }
    }

    result.sort((a, b) => {
      // In reading mode, always sort unread before read
      if (mode === "reading") {
        const aRead = a.isRead === 1 ? 1 : 0;
        const bRead = b.isRead === 1 ? 1 : 0;
        if (aRead !== bRead) return aRead - bRead;
      }

      const dir = sortDir === "asc" ? 1 : -1;

      if (sortBy === "visitCount") {
        return ((a.visitCount ?? 0) - (b.visitCount ?? 0)) * dir;
      }
      if (sortBy === "lastVisitedAt") {
        const aVal = a.lastVisitedAt ?? "";
        const bVal = b.lastVisitedAt ?? "";
        return aVal.localeCompare(bVal) * dir;
      }
      // createdAt
      return a.createdAt.localeCompare(b.createdAt) * dir;
    });

    return result;
  }, [bookmarks, bookmarkTags, tags, debouncedQuery, sortBy, sortDir, mode]);

  return {
    query,
    setQuery,
    sortBy,
    setSortBy,
    sortDir,
    setSortDir,
    filteredBookmarks,
  };
}
