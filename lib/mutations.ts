import {
  sqliteTrue,
  String as EvoluString,
  Number as EvoluNumber,
  SqliteBoolean,
} from "@evolu/common";
import { evolu } from "./Db";
import type { BookmarkId, BookmarkTagId, SettingsId, TagId } from "./Db";

type Str = typeof EvoluString.Type;
type Num = typeof EvoluNumber.Type;

export function createBookmark(fields: {
  url: string;
  title?: string | undefined;
  description?: string | undefined;
  favicon?: string | undefined;
  isForReading?: boolean | undefined;
}) {
  return evolu.insert("bookmark", {
    url: fields.url as Str,
    ...(fields.title ? { title: fields.title as Str } : {}),
    ...(fields.description ? { description: fields.description as Str } : {}),
    ...(fields.favicon ? { favicon: fields.favicon as Str } : {}),
    ...(fields.isForReading ? { isForReading: sqliteTrue } : {}),
  });
}

export function updateBookmark(
  id: BookmarkId,
  fields: {
    url?: string | undefined;
    title?: string | undefined;
    description?: string | undefined;
    favicon?: string | undefined;
    isForReading?: boolean | undefined;
  },
) {
  evolu.update("bookmark", {
    id,
    ...(fields.url !== undefined ? { url: fields.url as Str } : {}),
    ...(fields.title !== undefined ? { title: fields.title as Str } : {}),
    ...(fields.description !== undefined
      ? { description: fields.description as Str }
      : {}),
    ...(fields.favicon !== undefined
      ? { favicon: fields.favicon as Str }
      : {}),
    ...(fields.isForReading ? { isForReading: sqliteTrue } : {}),
  });
}

export function deleteBookmark(id: BookmarkId) {
  evolu.update("bookmark", { id, isDeleted: sqliteTrue });
}

export function toggleStar(
  id: BookmarkId,
  currentValue: SqliteBoolean | null,
) {
  evolu.update("bookmark", {
    id,
    isStarred: (currentValue === sqliteTrue ? null : sqliteTrue) as
      | SqliteBoolean
      | null,
  });
}

export function toggleForReading(
  id: BookmarkId,
  currentValue: SqliteBoolean | null,
) {
  evolu.update("bookmark", {
    id,
    isForReading: (currentValue === sqliteTrue ? null : sqliteTrue) as
      | SqliteBoolean
      | null,
  });
}

export function toggleRead(
  id: BookmarkId,
  currentValue: SqliteBoolean | null,
) {
  evolu.update("bookmark", {
    id,
    isRead: (currentValue === sqliteTrue ? null : sqliteTrue) as
      | SqliteBoolean
      | null,
  });
}

export function trackVisit(id: BookmarkId, currentCount: number | null) {
  evolu.update("bookmark", {
    id,
    visitCount: ((currentCount ?? 0) + 1) as Num,
    lastVisitedAt: new Date().toISOString() as Str,
  });
}

export function createTag(name: string) {
  return evolu.insert("tag", { name: name as Str });
}

export function addTagToBookmark(bookmarkId: BookmarkId, tagId: TagId) {
  return evolu.insert("bookmarkTag", { bookmarkId, tagId });
}

export function removeTagFromBookmark(bookmarkTagId: BookmarkTagId) {
  evolu.update("bookmarkTag", { id: bookmarkTagId, isDeleted: sqliteTrue });
}

export function updateStarOrder(id: BookmarkId, order: number) {
  evolu.update("bookmark", { id, starOrder: order as Num });
}

export function updatePageTitle(id: SettingsId, title: string) {
  evolu.update("settings", { id, pageTitle: title as Str });
}

export function updateShowSearchChat(id: SettingsId, show: boolean) {
  evolu.update("settings", {
    id,
    showSearchChat: show ? sqliteTrue : (0 as typeof SqliteBoolean.Type),
  });
}

export function createSettings(fields: {
  pageTitle?: string;
  showSearchChat?: boolean;
}) {
  const data: Record<string, unknown> = {};
  if (fields.pageTitle) {
    data["pageTitle"] = fields.pageTitle as Str;
  }
  if (fields.showSearchChat) {
    data["showSearchChat"] = sqliteTrue;
  }
  return evolu.insert("settings", data as Parameters<typeof evolu.insert<"settings">>[1]);
}

export function deleteTag(
  tagId: TagId,
  bookmarkTagRows: readonly { id: BookmarkTagId; tagId: TagId | null }[],
) {
  for (const bt of bookmarkTagRows) {
    if (bt.tagId === tagId) {
      evolu.update("bookmarkTag", { id: bt.id, isDeleted: sqliteTrue });
    }
  }
  evolu.update("tag", { id: tagId, isDeleted: sqliteTrue });
}
