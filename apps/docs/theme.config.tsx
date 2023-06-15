import React from "react";
import { DocsThemeConfig, Link } from "nextra-theme-docs";
import Logo from "./components/logo";

const config: DocsThemeConfig = {
  logo: <Logo />,
  project: {
    link: "https://github.com/LogLib/loglib",
  },
  chat: {
    link: "https://t.me/loglib_community",
  },
  footer: {
    text: "MIT 2022 © Loglib",
  },
  feedback: {
    labels: "Feedback from Loglib Docs:",
    useLink: () => "https://t.me/loglib_community",
  },
  editLink: {
    component: ({ ...props }) => (
      <Link
        {...props}
        href={`https://github.com/LogLib/loglib/apps/docs/${props.filePath}`}
        target="_blank"
      />
    ),
    text: "Edit this page on GitHub",
  },
};

export default config;
