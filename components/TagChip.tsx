import { create, props } from "@stylexjs/stylex";
import { useT } from "../lib/i18n";
import { colors, fonts, fontSizes, spacing } from "../lib/Tokens.stylex";

interface TagChipProps {
  name: string;
  onClick?: () => void;
  onRemove?: () => void;
}

export function TagChip({ name, onClick, onRemove }: TagChipProps) {
  const t = useT();
  return (
    <span {...props(styles.chip)}>
      <button
        type="button"
        onClick={onClick}
        {...props(styles.label, onClick && styles.clickable)}
      >
        #{name}
      </button>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          {...props(styles.removeButton)}
          aria-label={t("tag.remove", { name })}
        >
          &times;
        </button>
      )}
    </span>
  );
}

const styles = create({
  chip: {
    display: "inline-flex",
    alignItems: "center",
    gap: spacing.xxxs,
    paddingBlock: 2,
    paddingInline: spacing.xs,
    backgroundColor: colors.hoverAndFocusBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.borderLighter,
    fontSize: fontSizes.step_2,
    fontFamily: fonts.sans,
    color: colors.accent,
    lineHeight: 1.6,
  },
  label: {
    appearance: "none",
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    margin: 0,
    fontSize: "inherit",
    fontFamily: "inherit",
    color: "inherit",
    cursor: "default",
  },
  clickable: {
    cursor: "pointer",
    ":hover": {
      color: colors.linkHover,
    },
  },
  removeButton: {
    appearance: "none",
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    margin: 0,
    cursor: "pointer",
    fontSize: fontSizes.step_1,
    color: colors.secondary,
    lineHeight: 1,
    ":hover": {
      color: colors.error,
    },
  },
});
