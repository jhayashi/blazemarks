import { Menu, type MenuItem } from "elf-components/menu";
import Link from "next/link";
import { useMemo } from "react";
import { useT, type TranslationKey } from "../lib/i18n";

const menuItemKeys: { key: TranslationKey; href: string }[] = [
  { key: "nav.home", href: "/" },
  { key: "nav.readingMode", href: "/reading" },
  { key: "nav.importExport", href: "/settings/import-export" },
  { key: "nav.tags", href: "/settings/tags" },
  { key: "nav.settings", href: "/settings/preferences" },
  { key: "nav.help", href: "/settings/help" },
  { key: "nav.about", href: "/settings/about" },
];

export function HamburgerMenu({ currentPath }: { currentPath: string }) {
  const t = useT();
  const items: MenuItem[] = useMemo(
    () => menuItemKeys.map((item) => ({ label: t(item.key), href: item.href })),
    [t],
  );
  return (
    <Menu
      currentPath={currentPath}
      items={items}
      ariaLabel={t("nav.menu")}
      renderLink={({ href, children, onClick, ...rest }) => (
        <Link href={href} onClick={onClick} {...rest}>
          {children}
        </Link>
      )}
    />
  );
}
