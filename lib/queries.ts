import { sqliteTrue } from "@evolu/common";
import { getEvolu } from "./Db";

function _createAllBookmarksQuery() {
  return getEvolu().createQuery((db) =>
    db
      .selectFrom("bookmark")
      .select([
        "id",
        "url",
        "title",
        "description",
        "favicon",
        "visitCount",
        "lastVisitedAt",
        "isStarred",
        "isForReading",
        "isRead",
        "starOrder",
        "createdAt",
      ])
      .where("isDeleted", "is not", sqliteTrue)
      .orderBy("createdAt", "desc"),
  );
}

let _allBookmarksQuery: ReturnType<typeof _createAllBookmarksQuery> | null = null;
export function getAllBookmarksQuery() {
  if (!_allBookmarksQuery) _allBookmarksQuery = _createAllBookmarksQuery();
  return _allBookmarksQuery;
}
export type BookmarkRow = ReturnType<typeof _createAllBookmarksQuery>["Row"];

function _createAllTagsQuery() {
  return getEvolu().createQuery((db) =>
    db
      .selectFrom("tag")
      .select(["id", "name"])
      .where("isDeleted", "is not", sqliteTrue)
      .orderBy("name"),
  );
}

let _allTagsQuery: ReturnType<typeof _createAllTagsQuery> | null = null;
export function getAllTagsQuery() {
  if (!_allTagsQuery) _allTagsQuery = _createAllTagsQuery();
  return _allTagsQuery;
}
export type TagRow = ReturnType<typeof _createAllTagsQuery>["Row"];

function _createAllBookmarkTagsQuery() {
  return getEvolu().createQuery((db) =>
    db
      .selectFrom("bookmarkTag")
      .select(["id", "bookmarkId", "tagId"])
      .where("isDeleted", "is not", sqliteTrue),
  );
}

let _allBookmarkTagsQuery: ReturnType<typeof _createAllBookmarkTagsQuery> | null = null;
export function getAllBookmarkTagsQuery() {
  if (!_allBookmarkTagsQuery) _allBookmarkTagsQuery = _createAllBookmarkTagsQuery();
  return _allBookmarkTagsQuery;
}
export type BookmarkTagRow = ReturnType<typeof _createAllBookmarkTagsQuery>["Row"];

function _createSettingsQuery() {
  return getEvolu().createQuery((db) =>
    db
      .selectFrom("settings")
      .select(["id", "pageTitle", "showSearchChat"])
      .where("isDeleted", "is not", sqliteTrue)
      .limit(1),
  );
}

let _settingsQuery: ReturnType<typeof _createSettingsQuery> | null = null;
export function getSettingsQuery() {
  if (!_settingsQuery) _settingsQuery = _createSettingsQuery();
  return _settingsQuery;
}
export type SettingsRow = ReturnType<typeof _createSettingsQuery>["Row"];
