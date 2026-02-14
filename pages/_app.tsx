import { create, props } from "@stylexjs/stylex";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode, useEffect } from "react";
import { Providers } from "../components/Providers";
import { LocaleProvider } from "../lib/i18n";
import { webSpacing } from "../lib/Themes";
import { colors } from "../lib/Tokens.stylex";
import { applySelectedTheme } from "../lib/theme";
import "../styles/globals.css";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps,
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  // Apply the user's saved theme on mount
  useEffect(() => {
    return applySelectedTheme();
  }, []);

  return (
    <Providers>
      <LocaleProvider>
        <Head>
          <title>BlazeMarks</title>
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <div {...props(webSpacing, styles.container)}>
          {getLayout(<Component {...pageProps} />)}
        </div>
      </LocaleProvider>
    </Providers>
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
