# MachFolio — Deployment Cheat Sheet

How the site is built and how to ship changes. All `.command` files live in the
project root and can be double-clicked in Finder or run from Terminal
(`cd ~/Documents/machfolio` first).

## How it works (30 seconds)

Machine data lives in a Google Sheet, but the site does **not** read the sheet at
build time. Instead, the sheet is snapshotted into two committed files:

- `assets/data/entries.csv` — every machine (the Entries tab)
- `assets/data/category_specs.csv` — per-category specs (the category_specs tab)

Hugo reads only those local files. Cloudflare Pages rebuilds the site whenever a
commit is pushed to `main`. Because the data is committed, builds are reproducible,
never depend on Google being up, and every content change is a reviewable diff.

The trade-off: a sheet edit does not go live until you **sync** it into those CSVs
and commit. That's the deliberate publish step.

## The two workflows

### A. You changed code (templates, CSS, layout)

1. `./build-check.command` — clean build, no push. Confirm it prints `BUILD PASSED — 0 errors`.
   (Or `./build-test.command` to build and open a live preview at http://localhost:1313.)
2. `./publish-changes.command` — type a commit message; it commits and pushes.
3. Cloudflare builds from source (~1–2 min). Hard-refresh to clear the edge cache.

### B. You changed the Google Sheet (added or edited machines)

1. Edit the sheet as usual (Extensions > Apps Script, or directly).
2. `./sync-data.command` — pulls both tabs into `assets/data/*.csv`.
3. `git diff --stat` — review what content changed. (Optional: `./build-check.command`.)
4. `./publish-changes.command` — commit and push.
5. Cloudflare builds; live shortly.

Note: there is no longer an "empty commit" trick for content. The CSV diff *is* the change.

## Helper commands

| Command | What it does | When to use |
|---|---|---|
| `sync-data.command` | Pulls the sheet's two tabs into `assets/data/*.csv`. Refuses to overwrite if Google returns a login page instead of CSV. Does not commit. | After any sheet edit, before publishing. |
| `build-check.command` | Clean `hugo --ignoreCache` build, no push. Prints QA spot-checks on sample pages. | Confirm 0 errors before publishing. |
| `build-test.command` | Builds, then runs `hugo server` at http://localhost:1313. Ctrl+C to stop. | Eyeball changes locally before publishing. |
| `publish-changes.command` | Prompts for a commit message, stages all changes, commits, pushes. **This is the main deploy command.** | Ship anything — code or synced data. |
| `verify-pipeline.command` | Quick `git add . && commit && push` with a fixed message. Forces a Cloudflare rebuild. | Re-trigger a deploy without other changes. |
| `deploy-homepage.command` | Older all-in-one: build + `git add .` + commit (hardcoded message) + push. | Prefer `publish-changes` instead; the commit message here is fixed. |
| `github-push.command` | One-time repo creation via `gh`. | Not used in normal work. |
| `commit-review-changes.command` | One-off from a past code-review pass (stages a fixed file list). | Historical; not general-purpose. |

## Good to know

- **Edge cache:** right after a deploy, a stale page can linger at Cloudflare's edge.
  Hard-refresh (Cmd+Shift+R) or append a throwaway query like `?v=1` to force a fresh copy.
- **Failed builds are safe:** if a Cloudflare build fails, the previous deployment stays live.
- **Stale server = broken styling:** if local styling suddenly vanishes, an old `hugo server`
  is serving an outdated CSS hash. Run `pkill hugo` then start fresh.
- **Sandbox note (for Claude/Cowork):** because data is now local, a full `hugo` build runs
  anywhere with no network, including the Cowork sandbox. Full builds no longer require the Mac —
  only the sheet **sync** and the **push** do (network + credentials).
