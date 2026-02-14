import { create, props } from "@stylexjs/stylex";
import { useCallback, useMemo, useState } from "react";
import type { BookmarkRow, TagRow, BookmarkTagRow } from "../lib/queries";
import {
  createBookmark,
  updateBookmark,
  toggleForReading,
  createTag,
  addTagToBookmark,
  removeTagFromBookmark,
} from "../lib/mutations";
import { useT } from "../lib/i18n";
import { TagChip } from "./TagChip";
import { toast } from "./Toast";
import { colors, fonts, fontSizes, spacing } from "../lib/Tokens.stylex";

interface BookmarkFormProps {
  bookmarks: readonly BookmarkRow[];
  tags: readonly TagRow[];
  bookmarkTags: readonly BookmarkTagRow[];
  /** If set, we're editing an existing bookmark */
  editBookmark?: BookmarkRow;
  onClose: () => void;
}

export function BookmarkForm({
  bookmarks,
  tags,
  bookmarkTags,
  editBookmark,
  onClose,
}: BookmarkFormProps) {
  const t = useT();
  const [url, setUrl] = useState(editBookmark?.url ?? "");
  const [title, setTitle] = useState(editBookmark?.title ?? "");
  const [description, setDescription] = useState(
    editBookmark?.description ?? "",
  );
  const [tagInput, setTagInput] = useState("");

  // Tags currently on this bookmark (edit mode)
  const currentTagIds = useMemo(() => {
    if (!editBookmark) return new Set<string>();
    return new Set(
      bookmarkTags
        .filter((bt) => bt.bookmarkId === editBookmark.id)
        .map((bt) => bt.tagId),
    );
  }, [editBookmark, bookmarkTags]);

  const currentTags = useMemo(
    () => tags.filter((t) => currentTagIds.has(t.id)),
    [tags, currentTagIds],
  );

  // Tags to add (new bookmark or new tags on edit)
  const [pendingTags, setPendingTags] = useState<string[]>([]);

  const dupWarning = useMemo(() => {
    if (editBookmark) return false;
    if (!url.trim()) return false;
    return bookmarks.some((b) => b.url === url.trim());
  }, [bookmarks, url, editBookmark]);

  const [suggestions, setSuggestions] = useState<TagRow[]>([]);

  const handleTagInputChange = useCallback(
    (value: string) => {
      setTagInput(value);
      if (value.trim()) {
        const q = value.trim().toLowerCase();
        setSuggestions(
          tags
            .filter(
              (t) =>
                (t.name ?? "").toLowerCase().includes(q) &&
                !pendingTags.includes(t.name ?? "") &&
                !currentTagIds.has(t.id),
            )
            .slice(0, 5),
        );
      } else {
        setSuggestions([]);
      }
    },
    [tags, pendingTags, currentTagIds],
  );

  const addPendingTag = useCallback(
    (name: string) => {
      const trimmed = name.trim().toLowerCase();
      if (!trimmed) return;
      if (
        !pendingTags.includes(trimmed) &&
        !currentTags.some((t) => (t.name ?? "").toLowerCase() === trimmed)
      ) {
        setPendingTags((prev) => [...prev, trimmed]);
      }
      setTagInput("");
      setSuggestions([]);
    },
    [pendingTags, currentTags],
  );

  const handleTagKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addPendingTag(tagInput);
      }
    },
    [tagInput, addPendingTag],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedUrl = url.trim();
      if (!trimmedUrl) return;

      if (editBookmark) {
        // Update existing
        const updateFields: Parameters<typeof updateBookmark>[1] = {
          url: trimmedUrl,
        };
        if (title.trim()) updateFields.title = title.trim();
        if (description.trim()) updateFields.description = description.trim();
        updateBookmark(editBookmark.id, updateFields);

        // Add new pending tags
        for (const tagName of pendingTags) {
          const existingTag = tags.find(
            (t) => (t.name ?? "").toLowerCase() === tagName,
          );
          if (existingTag) {
            addTagToBookmark(editBookmark.id, existingTag.id);
          } else {
            const result = createTag(tagName);
            if (result.ok) {
              addTagToBookmark(editBookmark.id, result.value.id);
            }
          }
        }

        toast(t("form.toastUpdated"));
      } else {
        // Create new
        const createFields: Parameters<typeof createBookmark>[0] = {
          url: trimmedUrl,
        };
        if (title.trim()) createFields.title = title.trim();
        if (description.trim()) createFields.description = description.trim();
        const result = createBookmark(createFields);
        if (!result.ok) {
          toast(t("form.toastCreateError"), "error");
          return;
        }

        const bookmarkId = result.value.id;

        // Add tags
        for (const tagName of pendingTags) {
          const existingTag = tags.find(
            (t) => (t.name ?? "").toLowerCase() === tagName,
          );
          if (existingTag) {
            addTagToBookmark(bookmarkId, existingTag.id);
          } else {
            const tagResult = createTag(tagName);
            if (tagResult.ok) {
              addTagToBookmark(bookmarkId, tagResult.value.id);
            }
          }
        }

        toast(t("form.toastAdded"));
      }

      onClose();
    },
    [url, title, description, pendingTags, tags, editBookmark, onClose, t],
  );

  const handleRemoveCurrentTag = useCallback(
    (tagId: string) => {
      if (!editBookmark) return;
      const bt = bookmarkTags.find(
        (bt) => bt.bookmarkId === editBookmark.id && bt.tagId === tagId,
      );
      if (bt) removeTagFromBookmark(bt.id);
    },
    [editBookmark, bookmarkTags],
  );

  return (
    <form onSubmit={handleSubmit} {...props(styles.form)}>
      <div {...props(styles.header)}>
        <h2 {...props(styles.heading)}>
          {editBookmark ? t("form.editBookmark") : t("form.addBookmark")}
        </h2>
        <button type="button" onClick={onClose} {...props(styles.closeButton)}>
          &times;
        </button>
      </div>

      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder={t("form.urlPlaceholder")}
        required
        {...props(styles.input)}
      />
      {dupWarning && (
        <p {...props(styles.warning)}>{t("form.urlDuplicate")}</p>
      )}

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={t("form.titlePlaceholder")}
        {...props(styles.input)}
      />

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={t("form.descriptionPlaceholder")}
        {...props(styles.input)}
      />

      <div {...props(styles.tagSection)}>
        <div {...props(styles.tagInputWrapper)}>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => handleTagInputChange(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder={t("form.tagsPlaceholder")}
            {...props(styles.input)}
          />
          {suggestions.length > 0 && (
            <div {...props(styles.suggestions)}>
              {suggestions.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => addPendingTag(t.name ?? "")}
                  {...props(styles.suggestion)}
                >
                  {t.name ?? ""}
                </button>
              ))}
            </div>
          )}
        </div>
        <div {...props(styles.tagList)}>
          {currentTags.map((t) => (
            <TagChip
              key={t.id}
              name={t.name ?? ""}
              onRemove={() => handleRemoveCurrentTag(t.id)}
            />
          ))}
          {pendingTags.map((name) => (
            <TagChip
              key={name}
              name={name}
              onRemove={() =>
                setPendingTags((prev) => prev.filter((n) => n !== name))
              }
            />
          ))}
        </div>
      </div>

      {editBookmark && (
        <label {...props(styles.toggleRow)}>
          <button
            type="button"
            onClick={() =>
              toggleForReading(editBookmark.id, editBookmark.isForReading)
            }
            {...props(
              styles.toggleButton,
              editBookmark.isForReading === 1 && styles.toggleActive,
            )}
            aria-pressed={editBookmark.isForReading === 1}
          >
            {editBookmark.isForReading === 1 ? t("form.toggleOn") : t("form.toggleOff")}
          </button>
          <span {...props(styles.toggleLabel)}>{t("form.showInReading")}</span>
        </label>
      )}

      <div {...props(styles.buttonRow)}>
        <button type="button" onClick={onClose} {...props(styles.cancelButton)}>
          {t("form.cancel")}
        </button>
        <button type="submit" {...props(styles.submitButton)}>
          {editBookmark ? t("form.save") : t("form.add")}
        </button>
      </div>
    </form>
  );
}

const styles = create({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.s,
    padding: spacing.m,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    borderRadius: 8,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: fontSizes.step1,
    fontFamily: fonts.sans,
    color: colors.primary,
    fontWeight: 600,
  },
  closeButton: {
    appearance: "none",
    backgroundColor: "transparent",
    borderWidth: 0,
    cursor: "pointer",
    fontSize: fontSizes.step2,
    color: colors.secondary,
    padding: 0,
    lineHeight: 1,
    ":hover": {
      color: colors.primary,
    },
  },
  input: {
    width: "100%",
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
    outline: "none",
    "::placeholder": {
      color: colors.secondary,
    },
    ":focus": {
      borderColor: colors.accent,
    },
  },
  warning: {
    fontSize: fontSizes.step_2,
    fontFamily: fonts.sans,
    color: colors.warning,
  },
  tagSection: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.xs,
  },
  tagInputWrapper: {
    position: "relative",
  },
  suggestions: {
    position: "absolute",
    top: "100%",
    insetInlineStart: 0,
    insetInlineEnd: 0,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    borderRadius: 6,
    zIndex: 10,
    overflow: "hidden",
  },
  suggestion: {
    display: "block",
    width: "100%",
    textAlign: "start",
    appearance: "none",
    backgroundColor: "transparent",
    borderWidth: 0,
    paddingBlock: spacing.xxs,
    paddingInline: spacing.s,
    fontSize: fontSizes.step_1,
    fontFamily: fonts.sans,
    color: colors.primary,
    cursor: "pointer",
    ":hover": {
      backgroundColor: colors.hoverAndFocusBackground,
    },
  },
  tagList: {
    display: "flex",
    flexWrap: "wrap",
    gap: spacing.xxs,
  },
  toggleRow: {
    display: "flex",
    alignItems: "center",
    gap: spacing.xs,
  },
  toggleButton: {
    appearance: "none",
    paddingBlock: spacing.xxxs,
    paddingInline: spacing.xs,
    fontSize: fontSizes.step_2,
    fontFamily: fonts.sans,
    color: colors.secondary,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.borderLighter,
    borderRadius: 6,
    cursor: "pointer",
    minWidth: 36,
    textAlign: "center",
    ":hover": {
      borderColor: colors.accent,
    },
  },
  toggleActive: {
    borderColor: colors.accent,
    color: colors.accent,
    backgroundColor: colors.hoverAndFocusBackground,
  },
  toggleLabel: {
    fontSize: fontSizes.step_1,
    fontFamily: fonts.sans,
    color: colors.secondary,
  },
  buttonRow: {
    display: "flex",
    gap: spacing.xs,
    justifyContent: "flex-end",
  },
  cancelButton: {
    paddingBlock: spacing.xs,
    paddingInline: spacing.m,
    fontSize: fontSizes.step_1,
    fontFamily: fonts.sans,
    color: colors.secondary,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    borderRadius: 6,
    cursor: "pointer",
    ":hover": {
      borderColor: colors.accent,
      color: colors.primary,
    },
  },
  submitButton: {
    paddingBlock: spacing.xs,
    paddingInline: spacing.m,
    fontSize: fontSizes.step_1,
    fontFamily: fonts.sans,
    color: "#fff",
    backgroundColor: colors.accent,
    borderWidth: 0,
    borderRadius: 6,
    cursor: "pointer",
    ":hover": {
      opacity: 0.9,
    },
  },
});
