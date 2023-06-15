import React from "react";
import { DocsThemeConfig, Link } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>Loglib</span>,
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
