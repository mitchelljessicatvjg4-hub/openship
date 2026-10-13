import { createI18nMiddleware } from "fumadocs-core/i18n/middleware";
import { i18n } from "@/lib/i18n";

export default createI18nMiddleware(i18n);

export const config = {
  matcher: [
    "/docs/:path*",
    "/:lang(ru|de|es|fr|ja|pt|tr|zh|ar)/docs/:path*",
    "/docs",
    "/:lang(ru|de|es|fr|ja|pt|tr|zh|ar)/docs",
  ],
};
