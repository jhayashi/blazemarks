import { useQuery } from "@evolu/react";
import { create, props } from "@stylexjs/stylex";
import { useRouter } from "next/router";
import { Suspense, useEffect, useRef, useState } from "react";
import { useT } from "../lib/i18n";
import { createBookmark, updateBookmark } from "../lib/mutations";
import { isNewsDomain } from "../lib/newsDomains";
import { allBookmarksQuery } from "../lib/queries";
import { colors, fonts, fontSizes, spacing } from "../lib/Tokens.stylex";

function AddContent() {
  const t = useT();
  const router = useRouter();
  const bookmarks = useQuery(allBookmarksQuery);
  const savedRef = useRef(false);
  const [status, setStatus] = useState<"saving" | "saved" | "updated" | "error">("saving");
  const [info, setInfo] = useState<{ title?: string; url?: string }>({});

  useEffect(() => {
    if (savedRef.current) return;
    if (!router.isReady) return;

    const { url, title, description, favicon, readlater } = router.query;
    if (typeof url !== "string" || !url) {
      setStatus("error");
      return;
    }

    savedRef.current = true;
    const bookmarkInfo: { title?: string; url?: string } = { url };
    if (typeof title === "string") bookmarkInfo.title = title;
    setInfo(bookmarkInfo);

    const shouldMarkForReading = readlater === "1" || isNewsDomain(url);

    // Dedup: update if URL already exists
    const existing = bookmarks.find((b) => b.url === url);
    if (existing) {
      const fields: Parameters<typeof updateBookmark>[1] = {};
      if (typeof title === "string") fields.title = title;
      if (typeof description === "string") fields.description = description;
      if (typeof favicon === "string") fields.favicon = favicon;
      if (shouldMarkForReading) fields.isForReading = true;
      updateBookmark(existing.id, fields);
      setStatus("updated");
    } else {
      const fields: Parameters<typeof createBookmark>[0] = { url };
      if (typeof title === "string") fields.title = title;
      if (typeof description === "string") fields.description = description;
      if (typeof favicon === "string") fields.favicon = favicon;
      if (shouldMarkForReading) fields.isForReading = true;
      const result = createBookmark(fields);
      if (result.ok) {
        setStatus("saved");
      } else {
        setStatus("error");
      }
    }

    setTimeout(() => {
      // If opened by bookmarklet (window.open), close the tab.
      // Otherwise fall back to navigating home.
      window.close();
      void router.push("/");
    }, 1500);
  }, [router, bookmarks]);

  return (
    <div {...props(styles.page)}>
      <div {...props(styles.card)}>
        {status === "saving" && (
          <p {...props(styles.text)}>{t("add.saving")}</p>
        )}
        {status === "error" && (
          <p {...props(styles.errorText)}>{t("add.error")}</p>
        )}
        {(status === "saved" || status === "updated") && (
          <>
            <p {...props(styles.successText)}>
              {status === "updated" ? t("add.updated") : t("add.saved")}
            </p>
            {info.title && <p {...props(styles.title)}>{info.title}</p>}
            {info.url && <p {...props(styles.url)}>{info.url}</p>}
          </>
        )}
      </div>
    </div>
  );
}

export default function AddPage() {
  return (
    <Suspense>
      <AddContent />
    </Suspense>
  );
}

const styles = create({
  page: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: spacing.xs,
    paddingBlock: spacing.l,
    paddingInline: spacing.xl,
    maxWidth: "24rem",
    textAlign: "center",
  },
  text: {
    fontSize: fontSizes.step0,
    fontFamily: fonts.sans,
    color: colors.secondary,
  },
  successText: {
    fontSize: fontSizes.step1,
    fontFamily: fonts.sans,
    color: colors.success,
    fontWeight: 600,
  },
  errorText: {
    fontSize: fontSizes.step1,
    fontFamily: fonts.sans,
    color: colors.error,
    fontWeight: 600,
  },
  title: {
    fontSize: fontSizes.step0,
    fontFamily: fonts.sans,
    color: colors.primary,
    fontWeight: 500,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "100%",
  },
  url: {
    fontSize: fontSizes.step_2,
    fontFamily: fonts.sans,
    color: colors.disabled,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "100%",
  },
});
