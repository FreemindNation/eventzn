import "./globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { siteConfig } from "@/config/site";
import { fontPoppins, fontSans } from "@/config/fonts";



export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    {
      media: "(prefers-color-scheme: dark)",
      color: "hsl(217.2, 32.6%, 17.5%)",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <SessionProviderWrapper>
          <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
            {children}
          </Providers>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
