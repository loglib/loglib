import "@/styles/globals.css";

import type { AppProps } from "next/app";
import type { ReactNode } from "react";
import Loglib from "@loglib/tracker/react"

type NextraAppProps = AppProps & {
  Component: AppProps["Component"] & {
    getLayout: (page: ReactNode) => ReactNode;
  };
};

export default function Nextra({ Component, pageProps }: NextraAppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Loglib config={{
        id: "docs_loglib",
        host: "https://www.loglib.io,"
      }} />
    </>
  );
}
