import { RootProvider } from "fumadocs-ui/provider/next";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { docsSource } from "@/lib/source";
import { i18nUI } from "@/lib/i18n";
import type { ReactNode } from "react";

export default async function DocsLayoutWrapper({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;
  return (
    <RootProvider
      theme={{ defaultTheme: "light", enableSystem: false }}
      i18n={i18nUI.provider(lang)}
    >
      <DocsLayout
        tree={docsSource.getPageTree(lang)}
        i18n={true}
        nav={{
          mode: "top",
          title: (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
              <span
                aria-hidden
                style={{
                  width: 22,
                  height: 22,
                  flexShrink: 0,
                  borderRadius: 9999,
                  borderWidth: 2.5,
                  borderStyle: "solid",
                  borderColor: "currentColor",
                }}
              />
              <span style={{ fontWeight: 600 }}>Openship</span>
            </span>
          ),
          url: "/",
        }}
        githubUrl="https://github.com/oblien/openship"
        links={[
          { text: "Changelog", url: "/changelog" },
          { text: "Resources", url: "/resources" },
        ]}
      >
        {children}
      </DocsLayout>
    </RootProvider>
  );
}
