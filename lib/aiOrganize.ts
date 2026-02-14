export interface TagSuggestion {
  url: string;
  tags: string[];
}

export interface OrganizePreview {
  suggestions: TagSuggestion[];
  included: boolean[];
  newTags: string[];
  existingTags: string[];
}

export function generateOrganizePrompt(
  bookmarks: readonly {
    url: string | null;
    title: string | null;
    description: string | null;
  }[],
  existingTags: readonly { name: string | null }[],
): string {
  const tagNames = existingTags
    .map((t) => t.name)
    .filter((n): n is string => n !== null);

  const bookmarkData = bookmarks
    .filter((b): b is typeof b & { url: string } => b.url !== null)
    .map((b) => {
      let domain = "";
      try {
        domain = new URL(b.url).hostname;
      } catch {
        // ignore invalid URLs
      }
      const entry: Record<string, string> = { url: b.url };
      if (domain) entry["domain"] = domain;
      if (b.title) entry["title"] = b.title;
      if (b.description) entry["description"] = b.description;
      return entry;
    });

  const lines = [
    "Categorize my bookmarks by analyzing each URL's domain, path, and title to infer what the page is about.",
    "",
    "Rules:",
    "- Assign 1-6 tags per bookmark",
    '- Tags: lowercase, hyphenated, 1-3 words (e.g. "web-dev", "machine-learning", "rust", "design-tools")',
    "- Reuse existing tags wherever they fit -- only invent new tags when nothing existing applies",
    '- If existing tags are too broad (e.g. "programming"), prefer creating more specific tags (e.g. "rust", "react") to refine the taxonomy',
    '- Infer topic from the domain (e.g. github.com -> "developer-tools"), URL path, and title',
    '- Be specific: prefer "react" over "javascript" when the content is React-specific',
    "- Avoid synonyms: don't create tags that overlap (e.g. use \"produce\" or \"fruits-and-vegetables\", not both)",
    '- Mix subject tags (what it\'s about: "react", "cooking") with format tags (what it is: "video", "blog-post", "tool")',
    '- Never tag with generic bookmark synonyms like "favorites", "bookmarks", or "starred"',
    "- If a bookmark's URL and title aren't enough to categorize it, fetch the page to read its content -- but limit this to a handful of the most ambiguous ones",
    "",
  ];

  if (tagNames.length > 0) {
    lines.push(`Existing tags: ${tagNames.join(", ")}`, "");
  }

  lines.push(
    "Bookmarks:",
    "```json",
    JSON.stringify(bookmarkData, null, 2),
    "```",
    "",
    "Return a JSON array with one entry per bookmark, in the same order:",
    '```json',
    '[{ "url": "...", "tags": ["tag1", "tag2"] }, ...]',
    "```",
    "",
    "After the JSON array, add a summary line:",
    '"Summary: X unique tags, Y total tag assignments"',
  );

  return lines.join("\n");
}

export function parseOrganizeResponse(
  json: string,
  bookmarkCount: number,
): { suggestions: TagSuggestion[]; errors: string[] } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return { suggestions: [], errors: ["Invalid JSON"] };
  }

  if (!Array.isArray(parsed)) {
    return { suggestions: [], errors: ["Response must be a JSON array"] };
  }

  if (parsed.length !== bookmarkCount) {
    return {
      suggestions: [],
      errors: [
        `Expected ${bookmarkCount} entries but got ${parsed.length}`,
      ],
    };
  }

  const errors: string[] = [];
  const suggestions: TagSuggestion[] = [];

  for (let i = 0; i < parsed.length; i++) {
    const entry = parsed[i];
    if (
      typeof entry !== "object" ||
      entry === null ||
      typeof entry.url !== "string" ||
      !Array.isArray(entry.tags)
    ) {
      errors.push(`Entry ${i}: must have "url" (string) and "tags" (array)`);
      continue;
    }

    const invalidTags = entry.tags.filter(
      (t: unknown) => typeof t !== "string",
    );
    if (invalidTags.length > 0) {
      errors.push(`Entry ${i}: all tags must be strings`);
      continue;
    }

    suggestions.push({ url: entry.url, tags: entry.tags });
  }

  if (errors.length > 0) {
    return { suggestions: [], errors };
  }

  return { suggestions, errors: [] };
}
