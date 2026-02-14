import { useQuery } from "@evolu/react";
import { create, props } from "@stylexjs/stylex";
import { Suspense, useCallback, useRef, useState } from "react";
import { HamburgerMenu } from "../../components/HamburgerMenu";
import { Toast, toast } from "../../components/Toast";
import { useT } from "../../lib/i18n";
import type { BookmarkId, TagId } from "../../lib/Db";
import { getGoogleFaviconUrl } from "../../lib/favicon";
import type { OrganizePreview } from "../../lib/aiOrganize";
import {
  generateOrganizePrompt,
  parseOrganizeResponse,
} from "../../lib/aiOrganize";
import { parseNetscapeHTML } from "../../lib/import-export/netscape-parser";
import { generateNetscapeHTML } from "../../lib/import-export/netscape-writer";
import type { ExportBookmark, ImportPreview } from "../../lib/import-export/types";
import {
  addTagToBookmark,
  createBookmark,
  createTag,
  removeTagFromBookmark,
} from "../../lib/mutations";
import {
  allBookmarkTagsQuery,
  allBookmarksQuery,
  allTagsQuery,
} from "../../lib/queries";
import { colors, fonts, fontSizes, spacing } from "../../lib/Tokens.stylex";

function ImportExportContent() {
  const t = useT();
  const tags = useQuery(allTagsQuery);
  const bookmarkTags = useQuery(allBookmarkTagsQuery);
  const bookmarks = useQuery(allBookmarksQuery);

  // Import state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importPreview, setImportPreview] = useState<ImportPreview | null>(
    null,
  );
  const [importing, setImporting] = useState(false);
  const [addFavicons, setAddFavicons] = useState(true);

  // AI Organize state
  const organizeFileInputRef = useRef<HTMLInputElement>(null);
  const [organizePreview, setOrganizePreview] =
    useState<OrganizePreview | null>(null);
  const [organizeIncluded, setOrganizeIncluded] = useState<boolean[]>([]);
  const [freshTags, setFreshTags] = useState(false);

  // --- Import handlers ---

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const html = reader.result as string;
        const { bookmarks: parsed, errors } = parseNetscapeHTML(html);

        if (errors.length > 0) {
          toast(t("importExport.toastParseWarnings", { count: errors.length }));
        }

        const existingUrls = new Set(
          bookmarks
            .map((b) => b.url)
            .filter((u): u is string => u !== null),
        );

        const newBookmarks = parsed.filter((p) => !existingUrls.has(p.url));
        const skippedUrls = parsed
          .filter((p) => existingUrls.has(p.url))
          .map((p) => p.url);

        const allImportTags = new Set<string>();
        for (const bm of newBookmarks) {
          for (const t of bm.tags) allImportTags.add(t);
        }

        const existingTagNames = new Set(
          tags
            .map((t) => (t.name ?? "").toLowerCase())
            .filter((n) => n !== ""),
        );

        const allImportTagsArr = Array.from(allImportTags);
        const newTags = allImportTagsArr.filter(
          (t) => !existingTagNames.has(t),
        );
        const existingTags = allImportTagsArr.filter((t) =>
          existingTagNames.has(t),
        );

        setImportPreview({ newBookmarks, skippedUrls, newTags, existingTags });
      };
      reader.readAsText(file);

      e.target.value = "";
    },
    [bookmarks, tags, t],
  );

  const handleImportConfirm = useCallback(() => {
    if (!importPreview) return;

    setImporting(true);

    const { newBookmarks: toImport, newTags } = importPreview;
    const total = toImport.length;

    const tagMap = new Map<string, TagId>();
    for (const t of tags) {
      if (t.name) tagMap.set(t.name.toLowerCase(), t.id);
    }

    for (const name of newTags) {
      const result = createTag(name);
      if (result.ok) {
        tagMap.set(name, result.value.id);
      }
    }

    for (const bm of toImport) {
      const favicon = bm.favicon || (addFavicons ? getGoogleFaviconUrl(bm.url) : null);
      const result = createBookmark({
        url: bm.url,
        ...(bm.title ? { title: bm.title } : {}),
        ...(bm.description ? { description: bm.description } : {}),
        ...(favicon ? { favicon } : {}),
      });

      if (result.ok) {
        const bookmarkId = result.value.id;
        for (const tagName of bm.tags) {
          const tagId = tagMap.get(tagName);
          if (tagId) addTagToBookmark(bookmarkId, tagId);
        }
      }
    }

    setImporting(false);
    setImportPreview(null);
    toast(t("importExport.toastImported", { count: total }));
  }, [importPreview, tags, addFavicons, t]);

  const handleImportCancel = useCallback(() => {
    setImportPreview(null);
  }, []);

  // --- Export handler ---

  const handleExport = useCallback(() => {
    const exportData: ExportBookmark[] = bookmarks.map((bm) => {
      const bmTagIds = bookmarkTags
        .filter((bt) => bt.bookmarkId === bm.id)
        .map((bt) => bt.tagId);
      const bmTags = bmTagIds
        .map((tid) => {
          const tag = tags.find((t) => t.id === tid);
          return tag?.name ?? null;
        })
        .filter((n): n is string => n !== null);

      const exp: ExportBookmark = {
        url: bm.url ?? "",
        title: bm.title ?? bm.url ?? "",
        tags: bmTags,
      };
      if (bm.description) exp.description = bm.description;
      if (bm.favicon) exp.favicon = bm.favicon;
      if (bm.createdAt) exp.createdAt = bm.createdAt;
      if (bm.lastVisitedAt) exp.lastVisitedAt = bm.lastVisitedAt;
      return exp;
    });

    const html = generateNetscapeHTML(exportData);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const date = new Date().toISOString().slice(0, 10);
    a.download = `blazemarks-export-${date}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast(t("importExport.toastExported"));
  }, [bookmarks, bookmarkTags, tags, t]);

  // --- AI Organize handlers ---

  const handleGeneratePrompt = useCallback(() => {
    const prompt = generateOrganizePrompt(bookmarks, freshTags ? [] : tags);
    void navigator.clipboard.writeText(prompt).then(() => {
      toast(t("importExport.toastPromptCopied"));
    });
  }, [bookmarks, tags, freshTags, t]);

  const handleOrganizeFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        const { suggestions, errors } = parseOrganizeResponse(
          text,
          bookmarks.length,
        );

        if (errors.length > 0) {
          toast(errors[0] ?? "Unknown error");
          return;
        }

        const existingTagNames = new Set(
          tags
            .map((t) => (t.name ?? "").toLowerCase())
            .filter((n) => n !== ""),
        );

        const allSuggestedTags = new Set<string>();
        for (const s of suggestions) {
          for (const t of s.tags) allSuggestedTags.add(t.toLowerCase());
        }

        const allSuggestedArr = Array.from(allSuggestedTags);
        const newTags = allSuggestedArr.filter(
          (t) => !existingTagNames.has(t),
        );
        const existingTags = allSuggestedArr.filter((t) =>
          existingTagNames.has(t),
        );

        const included = suggestions.map(() => true);
        setOrganizePreview({ suggestions, included, newTags, existingTags });
        setOrganizeIncluded(included);
      };
      reader.readAsText(file);
      e.target.value = "";
    },
    [bookmarks.length, tags],
  );

  const handleOrganizeToggle = useCallback(
    (index: number) => {
      setOrganizeIncluded((prev) => {
        const next = [...prev];
        next[index] = !next[index];
        return next;
      });
    },
    [],
  );

  const handleOrganizeConfirm = useCallback(() => {
    if (!organizePreview) return;

    const tagMap = new Map<string, TagId>();
    for (const t of tags) {
      if (t.name) tagMap.set(t.name.toLowerCase(), t.id);
    }

    for (const name of organizePreview.newTags) {
      const result = createTag(name);
      if (result.ok) {
        tagMap.set(name.toLowerCase(), result.value.id);
      }
    }

    const urlToBookmarkId = new Map<string, BookmarkId>();
    for (const bm of bookmarks) {
      if (bm.url) urlToBookmarkId.set(bm.url, bm.id);
    }

    const existingPairs = new Set<string>();
    for (const bt of bookmarkTags) {
      if (bt.bookmarkId && bt.tagId) {
        existingPairs.add(`${bt.bookmarkId}:${bt.tagId}`);
      }
    }

    let applied = 0;
    for (let i = 0; i < organizePreview.suggestions.length; i++) {
      if (!organizeIncluded[i]) continue;
      const suggestion = organizePreview.suggestions[i];
      if (!suggestion) continue;
      const bookmarkId = urlToBookmarkId.get(suggestion.url);
      if (!bookmarkId) continue;

      if (freshTags) {
        for (const bt of bookmarkTags) {
          if (bt.bookmarkId === bookmarkId) {
            removeTagFromBookmark(bt.id);
            existingPairs.delete(`${bt.bookmarkId}:${bt.tagId}`);
          }
        }
      }

      for (const tagName of suggestion.tags) {
        const tagId = tagMap.get(tagName.toLowerCase());
        if (tagId && !existingPairs.has(`${bookmarkId}:${tagId}`)) {
          addTagToBookmark(bookmarkId, tagId);
          existingPairs.add(`${bookmarkId}:${tagId}`);
        }
      }
      applied++;
    }

    setOrganizePreview(null);
    setOrganizeIncluded([]);
    toast(t("importExport.toastAppliedTags", { count: applied }));
  }, [organizePreview, organizeIncluded, tags, bookmarks, bookmarkTags, freshTags, t]);

  const handleOrganizeCancel = useCallback(() => {
    setOrganizePreview(null);
    setOrganizeIncluded([]);
  }, []);


  return (
    <div {...props(styles.page)}>
      <div {...props(styles.header)}>
        <h1 {...props(styles.title)}>{t("importExport.title")}</h1>
        <HamburgerMenu currentPath="/settings/import-export" />
      </div>

      <section {...props(styles.section)}>
        <h2 {...props(styles.sectionTitle)}>{t("importExport.importTitle")}</h2>
        <p {...props(styles.helpText)}>
          {t("importExport.importHelp")}
        </p>
        <label {...props(styles.fileLabel)}>
          {t("importExport.chooseFile")}
          <input
            ref={fileInputRef}
            type="file"
            accept=".html,.htm"
            onChange={handleFileSelect}
            {...props(styles.fileInput)}
          />
        </label>

        {importPreview && !importing && (
          <div {...props(styles.previewBox)}>
            <p {...props(styles.previewText)}>
              {t("importExport.newBookmarks", { count: importPreview.newBookmarks.length })}
            </p>
            <p {...props(styles.previewTextMuted)}>
              {t("importExport.duplicatesSkipped", { count: importPreview.skippedUrls.length })}
            </p>
            <p {...props(styles.previewTextMuted)}>
              {t("importExport.newTags", { count: importPreview.newTags.length })}
            </p>
            <label {...props(styles.checkboxRow)}>
              <input
                type="checkbox"
                checked={addFavicons}
                onChange={(e) => setAddFavicons(e.target.checked)}
              />
              {t("importExport.addMissingFavicons")}
            </label>
            <div {...props(styles.buttonRow)}>
              <button
                type="button"
                onClick={handleImportConfirm}
                {...props(styles.importButton)}
              >
                {t("importExport.import")}
              </button>
              <button
                type="button"
                onClick={handleImportCancel}
                {...props(styles.button)}
              >
                {t("importExport.cancel")}
              </button>
            </div>
          </div>
        )}

        {importing && (
          <div {...props(styles.previewBox)}>
            <p {...props(styles.previewText)}>{t("importExport.importing")}</p>
          </div>
        )}
      </section>

      <section {...props(styles.section)}>
        <h2 {...props(styles.sectionTitle)}>{t("importExport.exportTitle")}</h2>
        <button
          type="button"
          onClick={handleExport}
          {...props(styles.button)}
        >
          {t("importExport.exportButton", { count: bookmarks.length })}
        </button>
      </section>

      <section {...props(styles.section)}>
        <h2 {...props(styles.sectionTitle)}>{t("importExport.aiOrganize")}</h2>
        <p {...props(styles.helpText)}>
          {t("importExport.aiOrganizeHelp")}
        </p>

        <label {...props(styles.checkboxRow)}>
          <input
            type="checkbox"
            checked={freshTags}
            onChange={(e) => setFreshTags(e.target.checked)}
          />
          {t("importExport.freshTags")}
        </label>

        <div {...props(styles.buttonRow)}>
          <button
            type="button"
            onClick={handleGeneratePrompt}
            {...props(styles.button)}
          >
            {t("importExport.copyAiPrompt", { count: bookmarks.length })}
          </button>
          <label {...props(styles.fileLabel)}>
            {t("importExport.importAiResponse")}
            <input
              ref={organizeFileInputRef}
              type="file"
              accept=".json"
              onChange={handleOrganizeFileSelect}
              {...props(styles.fileInput)}
            />
          </label>
        </div>

        {organizePreview && (
          <div {...props(styles.previewBox)}>
            <p {...props(styles.previewText)}>
              {t("importExport.bookmarksWithSuggestions", { count: organizePreview.suggestions.length })}
            </p>
            <p {...props(styles.previewTextMuted)}>
              {t("importExport.newAndExistingTags", { newCount: organizePreview.newTags.length, existingCount: organizePreview.existingTags.length })}
            </p>
            <div {...props(styles.reviewList)}>
              {organizePreview.suggestions.map((s, i) => (
                <label key={i} {...props(styles.reviewRow)}>
                  <input
                    type="checkbox"
                    checked={organizeIncluded[i] ?? true}
                    onChange={() => handleOrganizeToggle(i)}
                    {...props(styles.reviewCheckbox)}
                  />
                  <span {...props(styles.reviewUrl)}>
                    {s.url.length > 50 ? s.url.slice(0, 50) + "..." : s.url}
                  </span>
                  <span {...props(styles.reviewTags)}>
                    {s.tags.map((t) => (
                      <span key={t} {...props(styles.tagChip)}>
                        {t}
                      </span>
                    ))}
                  </span>
                </label>
              ))}
            </div>
            <div {...props(styles.buttonRow)}>
              <button
                type="button"
                onClick={handleOrganizeConfirm}
                {...props(styles.importButton)}
              >
                {t("importExport.apply")}
              </button>
              <button
                type="button"
                onClick={handleOrganizeCancel}
                {...props(styles.button)}
              >
                {t("importExport.cancel")}
              </button>
            </div>
          </div>
        )}
      </section>

      <Toast />
    </div>
  );
}

export default function ImportExport() {
  return (
    <Suspense>
      <ImportExportContent />
    </Suspense>
  );
}

const styles = create({
  page: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    maxWidth: "48rem",
    width: "100%",
    marginInline: "auto",
    paddingBlock: spacing.m,
    paddingInline: spacing.s,
    gap: spacing.l,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: fontSizes.step2,
    fontFamily: fonts.sans,
    color: colors.primary,
    fontWeight: 700,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.s,
  },
  sectionTitle: {
    fontSize: fontSizes.step1,
    fontFamily: fonts.sans,
    color: colors.primary,
    fontWeight: 600,
  },
  helpText: {
    fontSize: fontSizes.step_1,
    fontFamily: fonts.sans,
    color: colors.secondary,
  },
  fileLabel: {
    alignSelf: "flex-start",
    paddingBlock: spacing.xs,
    paddingInline: spacing.s,
    fontSize: fontSizes.step_1,
    fontFamily: fonts.sans,
    color: colors.primary,
    backgroundColor: colors.hoverAndFocusBackground,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    borderRadius: 6,
    cursor: "pointer",
    ":hover": {
      borderColor: colors.accent,
    },
  },
  fileInput: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
  previewBox: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.xs,
    padding: spacing.s,
    backgroundColor: colors.hoverAndFocusBackground,
    borderRadius: 6,
  },
  previewText: {
    fontSize: fontSizes.step_1,
    fontFamily: fonts.sans,
    color: colors.primary,
  },
  previewTextMuted: {
    fontSize: fontSizes.step_1,
    fontFamily: fonts.sans,
    color: colors.secondary,
  },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: spacing.xs,
    fontSize: fontSizes.step_1,
    fontFamily: fonts.sans,
    color: colors.primary,
    cursor: "pointer",
  },
  buttonRow: {
    display: "flex",
    gap: spacing.xs,
  },
  importButton: {
    alignSelf: "flex-start",
    paddingBlock: spacing.xs,
    paddingInline: spacing.s,
    fontSize: fontSizes.step_1,
    fontFamily: fonts.sans,
    color: "#fff",
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.accent,
    borderRadius: 6,
    cursor: "pointer",
    ":hover": {
      opacity: 0.9,
    },
  },
  button: {
    alignSelf: "flex-start",
    paddingBlock: spacing.xs,
    paddingInline: spacing.s,
    fontSize: fontSizes.step_1,
    fontFamily: fonts.sans,
    color: colors.primary,
    backgroundColor: colors.hoverAndFocusBackground,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    borderRadius: 6,
    cursor: "pointer",
    ":hover": {
      borderColor: colors.accent,
    },
  },
  reviewList: {
    maxHeight: "20rem",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: spacing.xxs,
  },
  reviewRow: {
    display: "flex",
    alignItems: "center",
    gap: spacing.xs,
    paddingBlock: spacing.xxs,
    paddingInline: spacing.xs,
    cursor: "pointer",
    borderRadius: 4,
    ":hover": {
      backgroundColor: colors.ghostElementHover,
    },
  },
  reviewCheckbox: {
    flexShrink: 0,
    cursor: "pointer",
  },
  reviewUrl: {
    flex: 1,
    fontSize: fontSizes.step_2,
    fontFamily: fonts.mono,
    color: colors.secondary,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    minWidth: 0,
  },
  reviewTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: spacing.xxxs,
    flexShrink: 0,
  },
  tagChip: {
    fontSize: fontSizes.step_2,
    fontFamily: fonts.sans,
    color: colors.accent,
    backgroundColor: colors.hoverAndFocusBackground,
    paddingBlock: 1,
    paddingInline: spacing.xxxs,
    borderRadius: 3,
  },
});
