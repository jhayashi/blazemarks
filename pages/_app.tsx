import { type Evolu, Mnemonic } from "@evolu/common";
import { EvoluProvider } from "@evolu/react";
import { create, props } from "@stylexjs/stylex";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode, useCallback, useEffect, useState } from "react";
import { SetupWizard } from "elf-components/setup-wizard";
import { webSpacing } from "elf-components/themes";
import { colors } from "../lib/Tokens.stylex";
import { createThemeManager } from "elf-components/theme";
import { bundledThemes } from "elf-components/theme-files";
import { LocaleProvider } from "../lib/i18n";
import { initEvolu } from "../lib/Db";
import { setSyncMode } from "../lib/syncPreference";
import "../styles/globals.css";

export const themeManager = createThemeManager({
  storageKey: "blazemarks-theme",
  defaultThemeId: "bandley",
  bundledThemes: [...bundledThemes],
});

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function validateMnemonic(value: string): boolean {
  return Mnemonic.from(value).ok;
}

export default function App({
  Component,
  pageProps,
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const [setupComplete, setSetupComplete] = useState<boolean | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [evolu, setEvolu] = useState<Evolu<any> | null>(null);

  useEffect(() => {
    return themeManager.applySelected();
  }, []);

  useEffect(() => {
    const done = localStorage.getItem("blazemarks-setup") === "true";
    setSetupComplete(done);
    if (done) {
      setEvolu(initEvolu());
    }
  }, []);

  const handleCreateAccount = useCallback(async () => {
    localStorage.setItem("blazemarks-setup", "true");
    setSyncMode("enabled");
    const e = initEvolu();
    const owner = await e.appOwner;
    return owner.mnemonic as string;
  }, []);

  const handleComplete = useCallback(
    (result: { sync: false } | { sync: true; restoredMnemonic?: string }) => {
      localStorage.setItem("blazemarks-setup", "true");
      if (result.sync && result.restoredMnemonic) {
        setSyncMode("enabled");
        const e = initEvolu();
        const parsed = Mnemonic.from(result.restoredMnemonic);
        if (parsed.ok) {
          void e.restoreAppOwner(parsed.value);
          return; // restoreAppOwner triggers a reload
        }
      }
      if (result.sync) {
        // Evolu already created by onCreateAccount — use cached instance
        setEvolu(initEvolu());
      } else {
        // No-sync path
        setSyncMode("local-only");
        window.location.reload();
      }
    },
    [],
  );

  return (
    <>
      <Head>
        <title>BlazeMarks</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      {evolu ? (
        <EvoluProvider value={evolu}>
          <LocaleProvider>
            <div {...props(webSpacing, styles.container)}>
              {getLayout(<Component {...pageProps} />)}
            </div>
          </LocaleProvider>
        </EvoluProvider>
      ) : (
        setupComplete === false && (
          <SetupWizard
            appName="BlazeMarks"
            tagline="A free, fast, and powerful bookmark manager that puts you in control of your data."
            featuresDescription={
              <ul style={{ margin: 0, paddingInlineStart: "1.2em" }}>
                <li>Super fast search across thousands of bookmarks with optional sync.</li>
                <li>Integrated web search &amp; AI chat make for a useful new tab page.</li>
                <li>Reading list, import / export, theming, and optional AI tag help.</li>
              </ul>
            }
            dataHeading="Your data... in your control"
            dataDescription={
              <>
                <p style={{ margin: 0 }}>
                  BlazeMarks stores your bookmarks on your device — not in a cloud
                  service where someone else can monetize or lock in your data.
                </p>
                <p style={{ margin: 0, marginTop: "0.75em" }}>
                  Naturally you can export your data at anytime.
                </p>
                <p style={{ margin: 0, marginTop: "0.75em" }}>
                  BlazeMarks does offer optional encrypted sync, but you decide if
                  and when your data leaves your device.
                </p>
              </>
            }
            validateMnemonic={validateMnemonic}
            onCreateAccount={handleCreateAccount}
            onComplete={handleComplete}
          />
        )
      )}
    </>
  );
}

const styles = create({
  container: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.background,
  },
});
