import { useQuery } from "@evolu/react";
import { create, props } from "@stylexjs/stylex";
import { Suspense, useCallback } from "react";
import { HamburgerMenu } from "../../components/HamburgerMenu";
import { Toast, toast } from "../../components/Toast";
import { useT } from "../../lib/i18n";
import { deleteTag } from "../../lib/mutations";
import { allBookmarkTagsQuery, allTagsQuery } from "../../lib/queries";
import { colors, fonts, fontSizes, spacing } from "../../lib/Tokens.stylex";

function TagsContent() {
  const t = useT();
  const tags = useQuery(allTagsQuery);
  const bookmarkTags = useQuery(allBookmarkTagsQuery);

  const handleDeleteTag = useCallback(
    (tagId: string) => {
      if (!confirm(t("tags.confirmDelete"))) return;
      deleteTag(tagId as Parameters<typeof deleteTag>[0], bookmarkTags);
      toast(t("tags.toastDeleted"));
    },
    [bookmarkTags, t],
  );

  return (
    <div {...props(styles.page)}>
      <div {...props(styles.header)}>
        <h1 {...props(styles.title)}>{t("tags.title")}</h1>
        <HamburgerMenu currentPath="/settings/tags" />
      </div>

      <section {...props(styles.section)}>
        {tags.length === 0 ? (
          <p {...props(styles.helpText)}>{t("tags.empty")}</p>
        ) : (
          <div {...props(styles.tagList)}>
            {tags.map((tag) => (
              <div key={tag.id} {...props(styles.tagRow)}>
                <span {...props(styles.tagName)}>#{tag.name}</span>
                <button
                  type="button"
                  onClick={() => handleDeleteTag(tag.id)}
                  {...props(styles.tagDeleteButton)}
                  aria-label={t("tags.deleteTag", { name: tag.name ?? "" })}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <Toast />
    </div>
  );
}

export default function Tags() {
  return (
    <Suspense>
      <TagsContent />
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
  helpText: {
    fontSize: fontSizes.step_1,
    fontFamily: fonts.sans,
    color: colors.secondary,
  },
  tagList: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.xxs,
  },
  tagRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBlock: spacing.xxs,
    paddingInline: spacing.s,
    backgroundColor: colors.hoverAndFocusBackground,
    borderRadius: 6,
  },
  tagName: {
    fontSize: fontSizes.step_1,
    fontFamily: fonts.sans,
    color: colors.accent,
  },
  tagDeleteButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
    cursor: "pointer",
    fontSize: fontSizes.step1,
    color: colors.accent,
    padding: spacing.xxxs,
    lineHeight: 1,
    ":hover": {
      color: colors.error,
    },
  },
});
