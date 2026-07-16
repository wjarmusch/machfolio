# MachFolio Code Review

Static Hugo site sourcing product data from Google Sheets (CSV) via content adapters, deployed to Cloudflare Pages. Review covers correctness, best practices, scaling, and SEO. Items are ordered by priority within each section.

---

## Critical (fix soon)

### 1. Global nav links to categories that don't exist yet
`layouts/_default/baseof.html` hardcodes nav links to `/planers` and `/miter-saws`, but category sections are only generated for categories that have at least one Live entry (`content/_content.gotmpl`). Right now `public/planers` and `public/miter-saws` don't exist, so those two links 404 on **every page of the site**. Broken links in a sitewide nav hurt crawl budget, user trust, and internal link equity.

Fix: build the nav dynamically from the categories that actually have Live entries (you already compute `$activeCategories` on the homepage — lift that into a partial the header can use), or remove the dead links until those categories are populated.

### 2. Every sitemap URL is set to `<priority>0</priority>`
All 162 URLs in `public/sitemap.xml` carry `priority` 0 and no `lastmod`. Priority 0 is the lowest possible value and signals to crawlers that nothing on the site is worth prioritizing. It won't deindex you, but it's the wrong signal and there's no reason to send it. Missing `lastmod` also removes the freshness hint Google uses to decide when to recrawl.

Fix: add a custom sitemap template (or set sitemap params) so priority is sensible (e.g. homepage/category pages higher than deep comparison pages) and emit `lastmod` from the entry's publish/update date.

### 3. No Open Graph or Twitter Card tags
`baseof.html` emits `<title>`, description, and canonical, but no `og:*` or `twitter:*` tags anywhere. Every share on social, Slack, iMessage, Discord, etc. renders with no title/description/image preview. This is the single biggest cheap SEO/discovery win available here.

Fix: add `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, and Twitter card equivalents to the `<head>`, driven by the same `title`/`description` blocks you already define per template.

### 4. No product images anywhere
There are zero `<img>` tags in the entire generated site. For a product-comparison affiliate site this is a major gap: no image search traffic, no image in rich results / merchant listings, weaker engagement and click-through, and the Product schema is missing the `image` field Google lists as recommended. Text-only spec pages are much harder to rank and convert.

Fix: add an image field to the sheet, render it on entry/comparison/category cards with proper `alt` text, and include it in the Product JSON-LD.

---

## High priority

### 5. Google Sheet is a single point of failure with no error handling
`resources.GetRemote` is called against the published CSV in four places with no nil-check or fallback. If the sheet is unshared, renamed, rate-limited, or Google is slow, `transform.Unmarshal` runs on a nil/empty resource and the build breaks (or silently produces an empty site) with no graceful degradation. There's also no schema validation — a renamed or reordered column in the sheet will quietly break field mapping across every page.

Fix: guard each `GetRemote` (`{{ with resources.GetRemote $url }}...{{ else }}` error/skip), and consider caching the last-good CSV to `data/` so a fetch failure doesn't take the site down.

### 6. `maxAge = "0s"` disables remote caching, so every build refetches all sheets
`[caches.getresource] maxAge = "0s"` in `hugo.toml` means each build re-downloads the CSVs from scratch, and you fetch across four call sites (see #7). Fine at 150 entries; wasteful and fragile as the site grows and builds get more frequent.

Fix: set a small non-zero `maxAge` (e.g. `"10m"`) so a single build reuses the fetch, and rely on your deploy trigger to bust it when data changes.

### 7. The same CSV is fetched and parsed in multiple independent code paths
`content/_content.gotmpl`, `layouts/partials/get-entries.html`, and `layouts/partials/get-category-specs.html` each re-fetch and re-zip the same sheets. The homepage (`index.html`) calls `get-entries` to re-derive Live entries that the content adapter already processed into pages. This is duplicated logic that must be kept in sync by hand — the header→map zipping, the Live filter, and the category-slug mapping all exist in two or more places.

Fix: process the sheet once in the content adapter, attach what pages need as params, and have the homepage read from `site.Pages` / section pages instead of re-fetching. Delete the redundant partials once nothing depends on them.

### 8. Category-slug mapping is duplicated in 6+ places
The `if eq $cat "Band Saw" -> "band-saws"` ladder is copy-pasted in `_content.gotmpl` (three times), `index.html` (twice), and `section.html`. Adding or renaming a category means editing every copy, and they can drift. This is the most likely source of a future bug.

Fix: define the category→slug map once (e.g. a `data/categories.yaml` or a single partial that returns the slug) and call it everywhere.

---

## Medium priority

### 9. `test-guide` is a live, crawlable page
`public/guides/test-guide/index.html` renders with the title "Test Guide" and is publicly reachable. It's not in the sitemap, but it's still a live URL that can be indexed if anything links to it, and it's clutter.

Fix: delete the source content file (or set `draft: true`), and rebuild.

### 10. Dead `current_price` code path
`single.html` renders a Price spec row from `.Params.current_price`, but the content adapter never sets that param (pricing comes from `affiliate_price_1..3`). The row never renders. Your own `build-check.command` even asserts "no stray current_price," confirming it was intentionally dropped — but the template code was left behind.

Fix: remove the dead `{{ if .Params.current_price }}` block.

### 11. Quadratic patterns in the content adapter
`_content.gotmpl` builds entry maps with `merge $entry (dict ...)` inside a per-column loop (allocates a new map each column), and dedupes comparison pairs with `in $seenPairs` (linear scan) inside a nested per-entry/per-competitor loop. At ~150 entries this is milliseconds; at a few thousand entries the comparison-pair generation in particular becomes noticeably slow (roughly O(n × competitors × pairs)).

Fix: acceptable for now — worth noting for when the catalog grows. A map keyed by pair-key for the "seen" check removes the worst factor cheaply.

### 12. Hardcoded "saw" / "saws" label on non-saw categories
The filter-count JS in `section.html` always writes `"N saws"`. On the Jointers and Planers pages this says "18 saws," which is wrong and looks sloppy.

Fix: pass the category noun into the script (or use a neutral word like "results").

### 13. Affiliate/outbound links missing `rel="noopener"`
Affiliate buttons use `target="_blank"` with `rel="nofollow sponsored"` (correct for affiliate compliance) but omit `noopener`. Without it the opened tab can access `window.opener` (reverse-tabnabbing) and it's a minor performance cost.

Fix: add `noopener` to the rel list on all `target="_blank"` links.

### 14. No `robots.txt`
There's no generated `robots.txt`, so there's no explicit `Sitemap:` pointer for crawlers. Not fatal (Google will still find the sitemap if submitted in Search Console) but it's a standard, free signal.

Fix: add a `robots.txt` (Hugo can template one) that allows crawling and points to the sitemap.

### 15. No RSS auto-discovery link
`index.xml` feeds are generated but the `<head>` has no `<link rel="alternate" type="application/rss+xml">`, so feed readers and some crawlers can't discover them.

Fix: add the alternate link in `baseof.html`.

---

## Low priority / polish

### 16. Product schema completeness
`product-schema.html` uses `AggregateOffer` with a hardcoded `availability: InStock` and no `highPrice`, no `image`, no `aggregateRating`/`review`. Hardcoded in-stock can be inaccurate, and the missing `image` is a recommended field for Product results. Adding `highPrice` when you have multiple offers and a real image would strengthen eligibility for rich results.

### 17. Render-blocking third-party scripts in `<head>`
GA4 and the Impact tracking tag both load in `<head>`. They're `async`, but the inline bootstrap still executes early. Minor Core Web Vitals cost; consider deferring non-critical tags.

### 18. Committed build artifacts and OS cruft
`hugo_stats.json` (from `writeStats = true`) is tracked, and there are several `.DS_Store` files in the tree. `writeStats` is only needed if you're doing CSS purging; otherwise it's noise in the repo.

Fix: add `.DS_Store` and `hugo_stats.json` to `.gitignore` (and `git rm --cached` them) unless the stats file is actually consumed by your build.

### 19. `.command` scripts hardcode `~/Documents/machfolio`
The double-clickable scripts are convenient but machine-specific and committed to the repo. `verify-pipeline.command` commits with a fixed "verify pipeline" message and pushes — easy to create noisy history. Fine for a solo workflow; worth being aware of if anyone else ever clones this.

---

## What's already good

Canonical URLs on every page, correct `rel="nofollow sponsored"` on affiliate links, sensible per-template `title`/`description` blocks, JSON-LD on product and comparison pages, fingerprinted CSS for cache-busting, accessible nav toggle (`aria-expanded`/`aria-controls`), and a clean tier/comparison data model. The comparison-pair canonicalization (sorting slugs so A-vs-B and B-vs-A dedupe) is a nice touch.

---

## Suggested order of attack

1. Fix the broken `/planers` and `/miter-saws` nav links (#1) — sitewide, affects every page.
2. Add Open Graph tags and product images (#3, #4) — biggest discovery/CTR upside.
3. Fix the sitemap priority/lastmod (#2).
4. Harden the sheet fetch with error handling and caching (#5, #6).
5. Consolidate the duplicated fetch logic and category-slug map (#7, #8).
6. Clean up: remove `test-guide` and the dead `current_price` block (#9, #10).
