import { create, props } from "@stylexjs/stylex";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useT } from "../lib/i18n";
import type { TranslationKey } from "../lib/i18n";
import { colors, fonts, fontSizes, spacing } from "../lib/Tokens.stylex";

const menuItemKeys: { key: TranslationKey; href: string }[] = [
  { key: "nav.home", href: "/" },
  { key: "nav.readingMode", href: "/reading" },
  { key: "nav.importExport", href: "/settings/import-export" },
  { key: "nav.tags", href: "/settings/tags" },
  { key: "nav.settings", href: "/settings/preferences" },
  { key: "nav.help", href: "/settings/help" },
  { key: "nav.about", href: "/settings/about" },
];

interface HamburgerMenuProps {
  currentPath: string;
}

export function HamburgerMenu({ currentPath }: HamburgerMenuProps) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const allMenuItems = useMemo(
    () => menuItemKeys.map((item) => ({ label: t(item.key), href: item.href })),
    [t],
  );

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={menuRef} {...props(styles.menuWrapper)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        {...props(styles.hamburgerButton)}
        aria-label={t("nav.menu")}
      >
        <span {...props(styles.hamburgerLine)} />
        <span {...props(styles.hamburgerLine)} />
        <span {...props(styles.hamburgerLine)} />
      </button>
      {open && (
        <div {...props(styles.dropdown)}>
          {allMenuItems.map((item) => {
            const isCurrent = item.href === currentPath;
            return isCurrent ? (
              <span
                key={item.href}
                {...props(styles.dropdownItem, styles.dropdownItemInactive)}
              >
                {item.label}
              </span>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                {...props(styles.dropdownItem)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

const styles = create({
  menuWrapper: {
    position: "relative",
  },
  hamburgerButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
    outline: "none",
    appearance: "none",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 4,
    padding: 6,
    ":hover": {
      opacity: 0.8,
    },
  },
  hamburgerLine: {
    display: "block",
    width: 18,
    height: 2,
    backgroundColor: colors.accent,
    borderRadius: 1,
  },
  dropdown: {
    position: "absolute",
    insetInlineEnd: 0,
    top: "100%",
    marginTop: 4,
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.hoverAndFocusBackground,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    borderRadius: 8,
    overflow: "hidden",
    zIndex: 100,
    minWidth: "10rem",
  },
  dropdownItem: {
    paddingBlock: spacing.xs,
    paddingInline: spacing.s,
    fontSize: fontSizes.step_1,
    fontFamily: fonts.sans,
    color: colors.primary,
    textDecoration: "none",
    whiteSpace: "nowrap",
    ":hover": {
      backgroundColor: colors.ghostElementHover,
    },
  },
  dropdownItemInactive: {
    color: colors.secondary,
    cursor: "default",
    ":hover": {
      backgroundColor: "transparent",
    },
  },
});
