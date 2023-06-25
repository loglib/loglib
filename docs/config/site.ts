type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage?: string;
  links: {
    twitter: string;
    github: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "Loglib",
  description:
    "An open source web analytics tool that can be attached to your apps.",
  url: "https://loglib.io",
  ogImage: "https://loglib.io/og-image.png",
  links: {
    twitter: "https://t.me/loglib_community",
    github: "https://github.com/LogLib/loglib",
  },
};