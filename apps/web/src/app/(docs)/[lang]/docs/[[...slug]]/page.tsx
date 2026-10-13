import { docsSource } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ lang: string; slug?: string[] }> };

type DocData = {
  title: string;
  description?: string;
  full?: boolean;
  body: ComponentType<{ components?: MDXComponents }>;
  toc: Parameters<typeof DocsPage>[0]["toc"];
};

export default async function Page({ params }: PageProps) {
  const { lang, slug } = await params;
  const page = docsSource.getPage(slug, lang);
  if (!page) notFound();

  const data = page.data as DocData;
  const MDX = data.body;

  return (
    <DocsPage toc={data.toc} full={data.full}>
      <DocsTitle>{data.title}</DocsTitle>
      <DocsDescription>{data.description}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return docsSource.generateParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const page = docsSource.getPage(slug, lang);
  if (!page) notFound();

  const data = page.data as DocData;
  const title = `${data.title} – Openship Docs`;
  const description = data.description;

  const pathname = page.url;
  const ogPath = slug && slug.length > 0 ? `/docs-og/${slug.join("/")}` : "/docs-og";

  return {
    title,
    description,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: pathname,
      images: [{ url: ogPath, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogPath],
    },
  };
}
