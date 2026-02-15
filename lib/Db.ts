import {
  type Evolu,
  SimpleName,
  SqliteBoolean,
  String as EvoluString,
  Number as EvoluNumber,
  createEvolu,
  id,
  nullOr,
} from "@evolu/common";
import { evoluReactWebDeps } from "@evolu/react-web";
import { getSyncMode } from "./syncPreference";

export const BookmarkId = id("Bookmark");
export type BookmarkId = typeof BookmarkId.Type;

export const TagId = id("Tag");
export type TagId = typeof TagId.Type;

export const BookmarkTagId = id("BookmarkTag");
export type BookmarkTagId = typeof BookmarkTagId.Type;

export const SettingsId = id("Settings");
export type SettingsId = typeof SettingsId.Type;

const Schema = {
  bookmark: {
    id: BookmarkId,
    url: EvoluString,
    title: nullOr(EvoluString),
    description: nullOr(EvoluString),
    favicon: nullOr(EvoluString),
    visitCount: nullOr(EvoluNumber),
    lastVisitedAt: nullOr(EvoluString),
    isStarred: nullOr(SqliteBoolean),
    isForReading: nullOr(SqliteBoolean),
    isRead: nullOr(SqliteBoolean),
    starOrder: nullOr(EvoluNumber),
  },

  tag: {
    id: TagId,
    name: EvoluString,
  },

  bookmarkTag: {
    id: BookmarkTagId,
    bookmarkId: BookmarkId,
    tagId: TagId,
  },

  settings: {
    id: SettingsId,
    theme: nullOr(EvoluString),
    pageTitle: nullOr(EvoluString),
    showSearchChat: nullOr(SqliteBoolean),
  },
};

export type Database = typeof Schema;

let _evolu: Evolu<typeof Schema> | null = null;

/** Create (or return cached) Evolu instance. Reads sync mode from localStorage. */
export function initEvolu() {
  if (!_evolu) {
    _evolu = createEvolu(evoluReactWebDeps)(Schema, {
      name: SimpleName.orThrow("Blazemarks"),
      indexes: (create) => [
        create("indexBookmarkUrl").on("bookmark").column("url"),
        create("indexBookmarkIsStarred").on("bookmark").column("isStarred"),
        create("indexBookmarkTagBookmarkId")
          .on("bookmarkTag")
          .column("bookmarkId"),
        create("indexBookmarkTagTagId").on("bookmarkTag").column("tagId"),
        create("indexTagName").on("tag").column("name"),
      ],
      ...(getSyncMode() === "local-only" ? { transports: [] } : {}),
    });
  }
  return _evolu;
}

/** Get the existing Evolu instance. Throws if called before initEvolu(). */
export function getEvolu() {
  if (!_evolu) throw new Error("Evolu not initialized");
  return _evolu;
}
