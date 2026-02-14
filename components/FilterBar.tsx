import { create, props } from "@stylexjs/stylex";
import { useMemo } from "react";
import { useT } from "../lib/i18n";
import type { TranslationKey } from "../lib/i18n";
import type { SortBy, SortDir } from "../lib/hooks/useSearch";
import { colors, fonts, fontSizes, spacing } from "../lib/Tokens.stylex";

interface FilterBarProps {
  sortBy: SortBy;
  setSortBy: (s: SortBy) => void;
  sortDir: SortDir;
  setSortDir: (d: SortDir) => void;
}

const sortOptionKeys: { value: SortBy; key: TranslationKey }[] = [
  { value: "createdAt", key: "filter.dateAdded" },
  { value: "lastVisitedAt", key: "filter.lastVisited" },
  { value: "visitCount", key: "filter.visitCount" },
];

export function FilterBar({
  sortBy,
  setSortBy,
  sortDir,
  setSortDir,
}: FilterBarProps) {
  const t = useT();
  const sortOptions = useMemo(
    () => sortOptionKeys.map((opt) => ({ ...opt, label: t(opt.key) })),
    [t],
  );
  return (
    <div {...props(styles.bar)}>
      {sortOptions.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => setSortBy(opt.value)}
          {...props(styles.button, sortBy === opt.value && styles.active)}
        >
          {opt.label}
        </button>
      ))}
      <button
        type="button"
        onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
        {...props(styles.button)}
        aria-label={sortDir === "asc" ? t("filter.sortDescending") : t("filter.sortAscending")}
      >
        {sortDir === "asc" ? "\u2191" : "\u2193"}
      </button>
    </div>
  );
}

const styles = create({
  bar: {
    display: "flex",
    gap: spacing.xxs,
    flexWrap: "wrap",
  },
  button: {
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
    ":hover": {
      borderColor: colors.accent,
      color: colors.primary,
    },
  },
  active: {
    borderColor: colors.accent,
    color: colors.accent,
  },
});
