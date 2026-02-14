import type { ExportBookmark } from "./types";

export function generateNetscapeHTML(bookmarks: ExportBookmark[]): string {
  const lines: string[] = [
    "<!DOCTYPE NETSCAPE-Bookmark-file-1>",
    "<!-- This is an automatically generated file.",
    "     It will be read and overwritten.",
    "     DO NOT EDIT! -->",
    '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">',
    "<TITLE>Bookmarks</TITLE>",
    "<H1>Bookmarks</H1>",
    "<DL><p>",
  ];

  for (const bm of bookmarks) {
    let attrs = `HREF="${escapeAttr(bm.url)}"`;

    if (bm.createdAt) {
      attrs += ` ADD_DATE="${isoToUnix(bm.createdAt)}"`;
    }

    if (bm.lastVisitedAt) {
      attrs += ` LAST_VISIT="${isoToUnix(bm.lastVisitedAt)}"`;
    }

    if (bm.favicon) {
      attrs += ` ICON="${escapeAttr(bm.favicon)}"`;
    }

    if (bm.tags.length > 0) {
      attrs += ` TAGS="${escapeAttr(bm.tags.join(","))}"`;
    }

    lines.push(`    <DT><A ${attrs}>${escapeHTML(bm.title)}</A>`);

    if (bm.description) {
      lines.push(`    <DD>${escapeHTML(bm.description)}`);
    }
  }

  lines.push("</DL><p>");
  return lines.join("\n");
}

function isoToUnix(iso: string): number {
  const ms = Date.parse(iso);
  return isNaN(ms) ? 0 : Math.floor(ms / 1000);
}

function escapeHTML(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
