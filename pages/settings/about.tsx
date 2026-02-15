import { About } from "elf-components/about";
import { HamburgerMenu } from "../../components/HamburgerMenu";
import { useT } from "../../lib/i18n";

export default function AboutPage() {
  const t = useT();
  return (
    <About
      iconSrc="/icon-128.png"
      appName={t("about.appName")}
      version={t("about.version")}
      description={t("about.description")}
      title={t("about.title")}
      menu={<HamburgerMenu currentPath="/settings/about" />}
    />
  );
}
