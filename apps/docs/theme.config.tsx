import React, { ComponentProps, ReactElement, ReactNode } from "react";
import { DocsThemeConfig, Link } from "nextra-theme-docs";
import { useRouter } from "next/router";

const Logo = (props: ComponentProps<"svg">): ReactElement => (
  <svg
    width="36"
    height="31"
    viewBox="0 0 112 102"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M102.997 41.0937C102.66 41.2 102.362 41.4039 102.131 41.671L100.104 44.0141L71.3642 81.685C70.5322 82.7756 68.8743 82.724 68.1117 81.5838L47.2566 50.401C46.4686 49.2227 44.7388 49.2156 43.941 50.3873L25.4091 77.605C24.7293 78.6035 23.3262 78.7761 22.4247 77.972L10.348 67.2006C9.53248 66.4733 9.45171 65.2261 10.1666 64.3996L12.2283 62.0161C12.9576 61.1729 14.2356 61.0888 15.0691 61.8292L21.0031 67.0998C21.9046 67.9005 23.3044 67.7274 23.9837 66.7312L43.9408 37.4638C44.739 36.2933 46.4677 36.3009 47.2555 37.4784L68.4066 69.0915C69.1721 70.2357 70.8378 70.2824 71.6662 69.1829L90.3615 44.3682C91.3081 43.1117 90.4996 41.2701 88.9673 40.9137C86.8134 40.4126 84.7292 39.6282 82.7703 38.5768C79.7446 36.9529 77.0811 34.7264 74.943 32.0335C72.8049 29.3406 71.2372 26.2381 70.3358 22.916C69.6358 20.3362 69.3492 17.6661 69.482 15.0053C69.5427 13.7907 68.614 12.7134 67.3979 12.7134H6.77705C4.97969 12.7134 3.25595 13.4299 1.98502 14.7051C0.714098 15.9804 9.98328e-05 17.71 9.98328e-05 19.5134V94.3135C9.98328e-05 96.117 0.714098 97.8466 1.98502 99.1218C3.25595 100.397 4.97969 101.113 6.77705 101.113H101.654C103.452 101.113 105.175 100.397 106.446 99.1218C107.717 97.8466 108.431 96.117 108.431 94.3135V42.2061C108.431 40.6309 106.722 39.7402 105.276 40.3661C104.495 40.7046 103.997 40.7778 102.997 41.0937Z"
      fill="white"
    />
    <path
      d="M95.0576 34C104.415 34 112 26.3889 112 17C112 7.61116 104.415 0 95.0576 0C85.7006 0 78.1152 7.61116 78.1152 17C78.1152 26.3889 85.7006 34 95.0576 34Z"
      fill="#F9A858"
    />
  </svg>
);

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
    text: "Edit this page on GitHub →",
  },
  docsRepositoryBase: "https://github.com/LogLib/loglib/apps/docs/pages",
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s – Loglib",
      };
    }
  },
};

export default config;
