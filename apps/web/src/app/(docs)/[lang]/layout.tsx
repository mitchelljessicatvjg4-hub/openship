import type { Metadata, Viewport } from "next";
import type { CSSProperties, ReactNode } from "react";

import "fumadocs-ui/style.css";
import "../../../styles/fonts.css";
import "../../../styles/docs-overrides.css";

const SITE_URL = "https://openship.io";

const FONT_SANS = "'Gellix', 'SF Arabic', system-ui, -apple-system, sans-serif";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Openship Docs", template: "%s – Openship" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function DocsRootLayout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;
  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
      style={{ "--font-sans": FONT_SANS } as CSSProperties}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen antialiased" style={{ fontFamily: "var(--font-sans)" }}>
        {children}
      </body>
    </html>
  );
}
