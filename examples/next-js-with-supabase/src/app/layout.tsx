import "./globals.css";
import { Inter } from "next/font/google";
import LogLib from "@loglib/tracker/react";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard",
  description: "Loglib Dashboard Demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <LogLib
        config={{
          debug: true,
        }}
      />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
