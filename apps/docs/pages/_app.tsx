import "@/styles/globals.css";

import type { AppProps } from "next/app";
import type { ReactNode } from "react";

type NextraAppProps = AppProps & {
  Component: AppProps["Component"] & {
    getLayout: (page: ReactNode) => ReactNode;
  };
};

export default function Nextra({ Component, pageProps }: NextraAppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
