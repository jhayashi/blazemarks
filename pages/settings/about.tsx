import { create, props } from "@stylexjs/stylex";
import { HamburgerMenu } from "../../components/HamburgerMenu";
import { useT } from "../../lib/i18n";
import { colors, fonts, fontSizes, spacing } from "../../lib/Tokens.stylex";

export default function About() {
  const t = useT();
  return (
    <div {...props(styles.page)}>
      <div {...props(styles.header)}>
        <h1 {...props(styles.title)}>{t("about.title")}</h1>
        <HamburgerMenu currentPath="/settings/about" />
      </div>

      <div {...props(styles.appInfo)}>
        <img
          src="/icon-128.png"
          alt={t("about.appName")}
          width={128}
          height={128}
          {...props(styles.icon)}
        />
        <h2 {...props(styles.appName)}>{t("about.appName")}</h2>
        <p {...props(styles.version)}>{t("about.version")}</p>
      </div>

      <p {...props(styles.description)}>
        {t("about.description")}
      </p>
    </div>
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
  appInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: spacing.xs,
    paddingBlock: spacing.l,
  },
  icon: {
    borderRadius: spacing.s,
  },
  appName: {
    fontSize: fontSizes.step3,
    fontFamily: fonts.sans,
    color: colors.primary,
    fontWeight: 700,
  },
  version: {
    fontSize: fontSizes.step0,
    fontFamily: fonts.sans,
    color: colors.secondary,
  },
  description: {
    fontSize: fontSizes.step_1,
    fontFamily: fonts.sans,
    color: colors.secondary,
    textAlign: "center",
  },
});
