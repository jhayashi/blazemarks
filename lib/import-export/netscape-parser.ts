import type { ParsedBookmark, ParseResult } from "./types";

const SKIP_FOLDERS = new Set([
  "bookmarks bar",
  "other bookmarks",
  "bookmarks toolbar",
  "bookmarks menu",
  "favorites bar",
  "mobile bookmarks",
]);

const SKIP_URL_PREFIXES = ["javascript:", "place:"];

export function parseNetscapeHTML(html: string): ParseResult {
  const bookmarks: ParsedBookmark[] = [];
  const errors: string[] = [];
  const folderStack: string[] = [];
  const lines = html.split("\n");

  let pendingBookmark: ParsedBookmark | null = null;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    if (raw === undefined) continue;
    const line = raw.trim();

    // Folder open: <DT><H3 ...>Name</H3>
    const folderMatch = line.match(/<DT><H3[^>]*>(.+?)<\/H3>/i);
    if (folderMatch) {
      const folderName = decodeHTMLEntities(folderMatch[1]!).trim();
      if (!SKIP_FOLDERS.has(folderName.toLowerCase())) {
        folderStack.push(sanitizeTagName(folderName));
      } else {
        folderStack.push(""); // placeholder so </DL> pops correctly
      }
      if (pendingBookmark) {
        bookmarks.push(pendingBookmark);
        pendingBookmark = null;
      }
      continue;
    }

    // Folder close: </DL>
    if (/<\/DL>/i.test(line)) {
      if (pendingBookmark) {
        bookmarks.push(pendingBookmark);
        pendingBookmark = null;
      }
      if (folderStack.length > 0) folderStack.pop();
      continue;
    }

    // Bookmark: <DT><A HREF="..." ...>Title</A>
    const linkMatch = line.match(/<DT><A\s+([^>]+)>(.+?)<\/A>/i);
    if (linkMatch) {
      if (pendingBookmark) {
        bookmarks.push(pendingBookmark);
        pendingBookmark = null;
      }

      const attrs = parseAttributes(linkMatch[1]!);
      const url = attrs["href"];
      const title = decodeHTMLEntities(linkMatch[2]!).trim();

      if (!url) {
        errors.push(`Line ${i + 1}: missing HREF`);
        continue;
      }

      if (SKIP_URL_PREFIXES.some((p) => url.toLowerCase().startsWith(p))) {
        continue;
      }

      const tags: string[] = [];

      // Tags from folder hierarchy
      for (const folder of folderStack) {
        if (folder) tags.push(folder);
      }

      // Tags from TAGS attribute (comma-separated)
      const tagsAttr = attrs["tags"];
      if (tagsAttr) {
        for (const t of tagsAttr.split(",")) {
          const name = sanitizeTagName(t);
          if (name && !tags.includes(name)) tags.push(name);
        }
      }

      const bookmark: ParsedBookmark = { url, title, tags };

      const addDateAttr = attrs["add_date"];
      if (addDateAttr) {
        const ts = parseInt(addDateAttr, 10);
        if (!isNaN(ts)) bookmark.addDate = ts;
      }

      const lastVisitAttr = attrs["last_visit"];
      if (lastVisitAttr) {
        const ts = parseInt(lastVisitAttr, 10);
        if (!isNaN(ts)) bookmark.lastVisit = ts;
      }

      const icon = attrs["icon"] || attrs["icon_uri"];
      if (icon) bookmark.favicon = icon;

      pendingBookmark = bookmark;
      continue;
    }

    // Description: <DD>...
    const ddMatch = line.match(/<DD>(.+)/i);
    if (ddMatch && pendingBookmark) {
      pendingBookmark.description = decodeHTMLEntities(ddMatch[1]!).trim();
      continue;
    }
  }

  // Flush last pending bookmark
  if (pendingBookmark) {
    bookmarks.push(pendingBookmark);
  }

  return { bookmarks, errors };
}

function parseAttributes(str: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const re = /([A-Z_]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(str)) !== null) {
    attrs[m[1]!.toLowerCase()] = decodeHTMLEntities(m[2] ?? m[3] ?? "");
  }
  return attrs;
}

function decodeHTMLEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#(\d+);/g, (_, code) =>
      String.fromCharCode(parseInt(code, 10)),
    )
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16)),
    );
}

function sanitizeTagName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\-_ ]/g, "")
    .replace(/\s+/g, "-");
}
