import { docsSource } from "@/lib/source";
import { pageToMarkdown, type LlmPage } from "@/lib/llms";

/**
 * Raw-markdown variant of a docs page — no HTML shell, just the source.
 * Public URL is `/docs/<slug>.md` (rewritten to here in next.config.mjs), the
 * standard llms.txt way to fetch a doc for an LLM/agent.
 */
export const dynamic = "force-static";

export function generateStaticParams() {
  const seen = new Set<string>();
  const params: { slug?: string[] }[] = [];
  for (const p of docsSource.generateParams()) {
    const key = (p.slug || []).join("/");
    if (!seen.has(key)) {
      seen.add(key);
      params.push({ slug: p.slug });
    }
  }
  return params;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  const page = docsSource.getPage(slug);
  if (!page) return new Response("Not found", { status: 404 });

  return new Response(await pageToMarkdown(page as unknown as LlmPage), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
