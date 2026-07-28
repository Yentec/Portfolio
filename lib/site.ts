/**
 * Canonical host of the site.
 *
 * Must exactly match the production domain served by Vercel:
 * `yentec.fr` redirects with a 308 status code to `www.yentec.fr`. If you declare the apex in the
 * canonical URLs, the sitemap, or hreflang tags would send Google to URLs that
 * redirect—resulting in a “Page with a redirect” status, and thus not indexed.
 */
export const SITE_URL = "https://www.yentec.fr";

/** Builds an absolute URL from a root path (`/fr`, `/fr/projects/x`). */
export function absoluteUrl(path = ""): string {
  return `${SITE_URL}${path}`;
}
