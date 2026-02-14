import { sqliteTrue } from "@evolu/common";
import { evolu } from "./Db";

export const allBookmarksQuery = evolu.createQuery((db) =>
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

export type BookmarkRow = (typeof allBookmarksQuery)["Row"];

export const allTagsQuery = evolu.createQuery((db) =>
  db
    .selectFrom("tag")
    .select(["id", "name"])
    .where("isDeleted", "is not", sqliteTrue)
    .orderBy("name"),
);

export type TagRow = (typeof allTagsQuery)["Row"];

export const allBookmarkTagsQuery = evolu.createQuery((db) =>
  db
    .selectFrom("bookmarkTag")
    .select(["id", "bookmarkId", "tagId"])
    .where("isDeleted", "is not", sqliteTrue),
);

export type BookmarkTagRow = (typeof allBookmarkTagsQuery)["Row"];

export const settingsQuery = evolu.createQuery((db) =>
  db
    .selectFrom("settings")
    .select(["id", "pageTitle", "showSearchChat"])
    .where("isDeleted", "is not", sqliteTrue)
    .limit(1),
);

export type SettingsRow = (typeof settingsQuery)["Row"];
