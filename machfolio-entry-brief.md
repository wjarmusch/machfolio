# MachFolio Entry Brief
### Operational reference for Claude Cowork — entry research and Google Sheet population

*This is the single operational reference for all MachFolio research tasks, whether researching one machine or a batch. Hand this document to Cowork for any entry research work.*

---

## What You Are Doing

MachFolio (machfolio.com) is a structured reference database for woodworking machinery. Each machine gets one entry. Your job is to research a given machine, draft its fields, and populate a new row in the Google Sheet.

Each entry has a row on the main Entries tab (the shared 37-column schema documented below). Machines in categories that have category-specific specs (table saws, jointers, planers) also get a row on the `category_specs` tab, joined by machine_slug. Band saws use only the Entries tab. Both tabs are documented below.

You are not writing a review. You are not writing an article. You are populating a structured record.

---

## Inputs You Will Receive Per Task

The operator will provide either a single machine or a list of machines. For each machine:

1. Machine name and model number (e.g. "Rikon 10-3061 14-Inch Band Saw")
2. Manufacturer spec sheet URL, or just the model number so you can locate the spec sheet yourself
3. Target affiliate retailers for this entry (e.g. "Rockler, Amazon") — if not specified, determine which of the affiliate programs listed below carry the machine

That is all. Research everything else yourself. For a batch, work through machines one at a time, completing and verifying each row before moving to the next.

---

## Research Process

**Step 1 — Manufacturer specs**

Search for the machine's official product page or spec sheet. Pull the exact published numbers. Do not estimate or interpolate. If a spec is not published, leave the field blank rather than guessing. Verify the following fields at minimum:

- Motor horsepower
- Amperage
- Blade speed (FPM or RPM)
- Max cut height (resaw capacity)
- Max cut width (throat capacity)
- Blade length and width range
- Table dimensions and material
- Weight
- Dust port diameter
- Voltage
- Included accessories

**Step 2 — Community sourcing**

Search the following sources for owner feedback on this specific model:

- Reddit: r/woodworking, r/handtools, r/DIY (search "[model name] reddit")
- Sawmill Creek forum (sawmillcreek.org)
- LumberJocks forum (lumberjocks.com)
- Amazon verified purchase reviews (filter to verified purchase, sort by most helpful)
- YouTube comment sections on review videos for this model

You are looking for:
- Specific things owners consistently praise (not generic positives -- specific observations)
- Specific things owners consistently report as limitations or complaints
- Upgrade and accessory notes (what blades fit, what fence upgrades work, common modifications)

**Step 3 — Flag thin data**

If you cannot find at least 5 distinct owner voices discussing this specific model, note it explicitly in the `notes` field and set `status` to Draft. Do not pad the owner_praise or owner_limitations fields with weak or generic content. Thin data noted honestly is better than fabricated consensus.

---

## The Eight Entry Fields

Draft each of these in order:

**1. Machine identity fields**
Factual. No interpretation. Pulled from manufacturer documentation.

**2. Manufacturer specs**
Exact published numbers only. See Step 1 above.

**3. Tier placement**
Assign one tier from the five-tier framework below. One tier only.

**4. Who it's for**
2-4 sentences. Answer three questions: What work does this machine handle well? Who is the right buyer? Who should look elsewhere? Be specific. Do not hedge. Do not use filler phrases like "a great choice for" or "perfect for beginners."

**5. Owner praise**
3-5 points. Each point is one specific observation sourced from community discussion. Use pipe characters ( | ) to separate points in the sheet field. Do not use bullet points. Specific only -- no generic positives.

**6. Owner limitations**
3-5 points. Same format as owner praise. This section is where the entry earns trust. Every machine has real limitations. Surface them honestly. Do not soften or omit limitations to be kind to the manufacturer.

**7. Upgrade and accessory compatibility**
Prose or pipe-separated points. Cover: compatible blade sizes and brands, fence upgrade options, dust collection compatibility, common owner modifications, any known incompatibilities.

**8. Alternatives**
2-3 direct competitors at a similar price point. One sentence per alternative explaining how it compares. Include the competitor's machine_slug (lowercase, hyphenated, no special characters) for internal linking.

**How alternatives generate comparison pages**

Hugo reads the `compare_1_slug`, `compare_2_slug`, and `compare_3_slug` fields and automatically generates a static comparison page for each pairing at:
`machfolio.com/compare/[category-slug]/[machine-slug-a]-vs-[machine-slug-b]`

Comparison pages render a spec table (price, tier, HP, cut capacities, table dimensions, weight, dust port, voltage), the `who_its_for` field trimmed to two sentences per machine, affiliate links for both machines, and links to both full entries. No winner is designated on any spec -- the table presents numbers neutrally and lets the buyer decide.

Before assigning compare slugs, read the current contents of the Google Sheet to see which entries already exist. Only populate compare slugs for machines that already have entries in the sheet or are being added in the same batch. A comparison slug pointing to a non-existent entry will generate a broken page. If the competitor entry doesn't exist yet, leave the compare field blank and add it when the entry is live.

---

## Five-Tier Framework

Assign one tier per entry. Price is the starting point; community perception and build quality signals determine the final assignment. When in doubt, tier down rather than up.

**Weekend Warrior (under $200)**
Entry-level machines built for light, infrequent use. Typically sold through mass-market retailers (Harbor Freight, Home Depot, Walmart). Plastic or lightweight cast aluminum construction. Motors at or under 1/2 HP on benchtop tools. No meaningful upgrade path -- when the buyer outgrows it, they replace it entirely. If community consensus frames a machine as "good enough to learn on" or "a stepping stone," it is Weekend Warrior.

**Hobbyist ($200--$500)**
Regular hobby use in a home shop. Cast iron or heavier cast aluminum on key surfaces. Sold primarily through woodworking specialty retailers and Amazon. Some upgrade path exists -- better blades, aftermarket fences, mobile bases. The buyer has committed to woodworking as a hobby but hasn't yet prioritized shop-grade equipment.

**Serious Hobbyist ($500--$1,000)**
The most important tier for this database. This buyer has a dedicated shop space, uses equipment regularly, and is making a considered, researched purchase. Cast iron tables standard. Meaningful fence and accessory ecosystem. Community frames these machines as long-term keepers -- owners discuss upgrades rather than replacements. Highest affiliate conversion potential and densest community discussion of any tier.

**Semi-Pro ($1,000--$2,000)**
Near-daily use, production work, or buyers who prioritize accuracy above all else. Typically purchased by serious hobbyists who have outgrown the previous tier, small cabinet shops, or woodworking teachers. Heavy cast iron, precision-ground surfaces, substantial motor capacity. Community discussions focus on fine-tuning and optimization rather than limitations. Machines at this tier are expected to last decades.

**Professional ($2,000+)**
Industrial or commercial use. Continuous duty motors, industrial-grade construction, often three-phase power options. Buyers are professional woodworkers, production shops, or institutions. Community discussion is sparse relative to lower tiers. Included for database completeness and coverage of high-value search queries.

**Edge case rules**

- *Price overlap:* When a machine falls at a tier boundary, community perception breaks the tie. A $480 machine the community consistently treats as a serious hobbyist tool gets tiered up. A $520 machine described as "a good starter saw" gets tiered down.
- *House brands at any price:* Harbor Freight Bauer, Ryobi, and similar mass-market house brands are capped at Hobbyist tier regardless of price. Community perception does not support Serious Hobbyist placement even when price might suggest it.
- *Vintage and discontinued machines:* Tier based on original positioning and community reputation, not current used market price. A vintage Powermatic 66 selling used for $800 is still a Semi-Pro machine.

---

## Standing Rules

These apply to every entry without exception:

- **Confirm the model is the correct woodworking machine before researching it.** Model numbers can be ambiguous — a manufacturer may use a similar number for an unrelated tool. (Example: the Rikon 10-308 is a meat saw with grinder, not a woodworking band saw.) Verify the model is the intended woodworking tool in the correct category before populating an entry. If the model number returns a different tool type, flag it to the operator rather than guessing at the intended model.
- Never fabricate specs. If it is not published by the manufacturer, leave the field blank.
- Never fabricate community consensus. If owners have not documented it publicly, do not invent it.
- Always flag thin community data in the notes field rather than padding entry fields.
- The framing is always "owners consistently report" -- never "in our testing" or any language implying first-hand use.
- Specs must be verified against the manufacturer's own product page or manual, not third-party retailer pages, which are often outdated or incorrect.
- Set status to Draft for any entry where community data is thin or specs could not be verified.
- Set status to Live only when all spec fields are verified and community sourcing is substantive.

---

## Google Sheet Location

**Edit URL:** https://docs.google.com/spreadsheets/d/1rP3yuVYIA0NjGi7QDYF-it4TxI6BWr4El8GeyTS-FM4/edit?usp=sharing

**Hugo data source (CSV export):** https://docs.google.com/spreadsheets/d/1rP3yuVYIA0NjGi7QDYF-it4TxI6BWr4El8GeyTS-FM4/export?format=csv&gid=0

**Sheet name/tab:** Entries (gid=0)

---

## URL Structure

URLs are permanent once entries are live. Use these structures exactly -- do not deviate.

**Machine entries:** `machfolio.com/[category-slug]/[machine-slug]`
**Comparison pages:** `machfolio.com/compare/[category-slug]/[machine-slug-a]-vs-[machine-slug-b]`
**Category pages:** `machfolio.com/[category-slug]`

**Category slugs (locked -- do not change)**

| Display name | URL slug | Sheet category value |
|---|---|---|
| Band Saw | band-saws | Band Saw |
| Table Saw | table-saws | Table Saw |
| Jointer | jointers | Jointer |
| Planer | planers | Planer |
| Miter Saw | miter-saws | Miter Saw |
| Router | routers | Router |
| Dust Collector | dust-collectors | Dust Collector |

The `machine_slug` field in the Google Sheet becomes the final segment of the entry URL. It must be lowercase, hyphens only, no special characters, and unique across all entries. Hugo constructs the full URL as `[category-slug]/[machine-slug]` at build time.

---

## Writing to the Google Sheet — Column Alignment

This is the most error-prone part of the task. A past batch had column misalignment because data was written as a delimited block and blank fields in the middle of a row caused every following value to shift into the wrong column. Follow these rules exactly.

**Preferred method: write via Apps Script.** The most reliable way to populate rows is a Google Apps Script that sets each cell individually with `setValue` calls (one per field, 37 per row after the June 2026 schema update). This guarantees every value lands in its exact column position and blank fields stay as genuinely empty cells. A batch of 10 machines is 370 setValue calls and completes in seconds. This method eliminated the alignment problem entirely in batch 2 and is the standard approach for any batch.

If writing through any other method, the rules below still apply:

1. **Write cell by cell, not as a pasted delimited block.** Place each value in its specific column position. Do not paste a tab-separated or comma-separated string across a row.

2. **Every one of the 37 columns must get a value, even if that value is empty.** A blank field is an intentional empty cell in its correct column — not a skipped column. If a machine has only one affiliate link, the cells for affiliate_link_2, affiliate_retailer_2, affiliate_price_2, affiliate_link_3, affiliate_retailer_3, and affiliate_price_3 must still exist as empty cells. Never let a blank field collapse and pull later values leftward.

3. **After writing each row, verify alignment by spot-checking three anchor columns:**
   - Column AI must contain the status (Draft or Live)
   - Column AJ must contain the date (YYYY-MM-DD)
   - Column AK must contain notes (or be empty)
   If status is not in AI, the row is misaligned — fix it before continuing to the next machine.

4. **Confirm every row has exactly 37 columns of data (A through AK) before moving on.**

---

## Google Sheet Column Schema

**Current schema as of June 2026 migration (37 columns, A through AK).** `current_price` has been removed. Prices now live in per-retailer `affiliate_price` fields. The header price displayed on entry pages is auto-derived as the lowest non-empty retailer price at build time.

Populate columns in this exact order. Column headers are in row 1. Each new entry is a new row. Empty fields stay as empty cells in their correct position.

| Column | Field name | Data type | Notes |
|---|---|---|---|
| A | machine_slug | Text | URL-safe ID. Lowercase, hyphens only. E.g. "rikon-10-3061". Must be unique. |
| B | machine_name | Text | Full display name. E.g. "Rikon 10-3061 10-Inch Band Saw" |
| C | manufacturer | Text | Brand name only. E.g. "Rikon" |
| D | category | Select | Band Saw, Table Saw, Jointer, Planer, Miter Saw, Router, Dust Collector. Must match locked category values exactly. |
| E | release_year | Number | Four digits. E.g. 2023 |
| F | price_last_updated | Date | YYYY-MM-DD format. Update whenever any affiliate_price field is updated. |
| G | motor_hp | Number | Decimal, no "HP" text. E.g. 0.33 or 1.75. Leave empty if not published. |
| H | voltage | Text | 110V, 220V, or Dual |
| I | blade_size | Text | E.g. "93.5 inches" |
| J | cut_capacity_height | Number | Inches. Max resaw/cut height. |
| K | cut_capacity_width | Number | Inches. Throat capacity or max cut width. |
| L | table_dimensions | Text | E.g. "14 x 12.5 inches, cast iron" |
| M | weight_lbs | Number | Pounds. Leave empty (not "TBD") if not published. |
| N | dust_port_diameter | Number | Inches. E.g. 2.5 |
| O | tier | Select | Weekend Warrior, Hobbyist, Serious Hobbyist, Semi-Pro, Professional |
| P | who_its_for | Long text | 2-4 sentences. See field guidance above. |
| Q | owner_praise | Long text | 3-5 points separated by pipe characters ( | ) |
| R | owner_limitations | Long text | 3-5 points separated by pipe characters ( | ) |
| S | upgrade_compatibility | Long text | Prose or pipe-separated points. |
| T | affiliate_link_1 | URL | Primary affiliate link. Must use stable URL format (Amazon: amazon.com/dp/ASIN). |
| U | affiliate_retailer_1 | Text | E.g. "Rockler" |
| V | affiliate_price_1 | Number | Current price at retailer 1. USD, no formatting. E.g. 449.99. Verify against live retailer page. |
| W | affiliate_link_2 | URL | Secondary affiliate link. |
| X | affiliate_retailer_2 | Text | |
| Y | affiliate_price_2 | Number | Current price at retailer 2. Leave empty if retailer 2 not applicable. |
| Z | affiliate_link_3 | URL | Tertiary affiliate link. |
| AA | affiliate_retailer_3 | Text | |
| AB | affiliate_price_3 | Number | Current price at retailer 3. Leave empty if retailer 3 not applicable. |
| AC | compare_1_slug | Text | machine_slug of first competitor entry |
| AD | compare_1_note | Text | One sentence comparison |
| AE | compare_2_slug | Text | machine_slug of second competitor entry |
| AF | compare_2_note | Text | One sentence comparison |
| AG | compare_3_slug | Text | machine_slug of third competitor entry (optional) |
| AH | compare_3_note | Text | One sentence comparison (optional) |
| AI | status | Select | Draft, Live, Needs Update |
| AJ | date_published | Date | YYYY-MM-DD format |
| AK | notes | Text | Internal only. Never rendered on site. Flag data quality issues, sourcing notes, QA reminders here. |

**Amazon link format:** Always use `https://www.amazon.com/dp/ASIN` format for Amazon links, where ASIN is the 10-character product identifier. This format is stable even when individual seller listings change. Do not use direct product listing URLs from Amazon search results.

---

## The category_specs Tab (Category-Specific Fields)

Some machine categories have specs that don't apply to others. A table saw has rip capacity; a band saw doesn't. A jointer has cutting width; a planer has max stock width. Rather than force all of these into the shared 37-column Entries schema, category-specific fields live on a separate tab called `category_specs`, joined to the main Entries tab by `machine_slug` at Hugo build time.

**How the join works:** Column A of `category_specs` is `machine_slug`, which must exactly match a `machine_slug` in the Entries tab. At build time, Hugo fetches the tab, builds a lookup keyed by slug, and pulls the matching category-specific fields into each entry page. The single.html template renders each category's rows only when they're populated, so an entry only shows the spec rows relevant to its category.

**Which categories use it:** Band saws use only the shared Entries schema and have no `category_specs` row. Table saws, jointers, and planers each have a row on this tab with their category-specific fields. A machine only populates the fields for its own category; all other columns on its row stay empty.

**One tab, extended per category.** New categories add their columns to this same tab rather than creating a new tab. This keeps a single join in the Hugo build. Each new category also needs its params added to the content adapter (`content/_content.gotmpl`) and its display rows added to `single.html`.

### Table Saw fields

| Field | Notes |
|---|---|
| saw_class | Jobsite, Contractor, Hybrid, or Cabinet |
| rip_capacity_right | Inches, right of blade. Most-searched table saw spec. |
| blade_size | Inches. Usually 10. |
| arbor_size | Inches. Usually 0.625 (5/8"). |
| max_cut_depth_90 | Inches. Max depth of cut at 90 degrees. |
| max_cut_depth_45 | Inches. Max depth of cut at 45 degrees. |
| blade_tilt | Left or Right |
| fence_type | E.g. T-square, Biesemeyer-style, aluminum rail |
| drive_type | Belt or Direct |

### Jointer fields

| Field | Notes |
|---|---|
| jointer_type | Benchtop, Open Stand, or Closed Stand |
| cutting_width | Inches. The headline jointer spec (e.g. 6, 8, 12). |
| cutterhead_type | Straight Knife, Helical, or Spiral |
| cutterhead_speed | RPM |
| knife_count | Number of knives, or insert rows for helical/spiral |
| table_length | Inches. Total bed length. |
| max_depth_of_cut | Inches |
| fence_size | Dimensions, e.g. "38 x 5 inches" |
| fence_tilt | Degrees range, e.g. "90 to 45" |

### Planer fields

| Field | Notes |
|---|---|
| planer_type | Benchtop/Lunchbox, or Stationary |
| max_stock_width | Inches. The headline planer spec (e.g. 13, 15, 20). |
| max_stock_thickness | Inches. |
| planer_cutterhead_type | Straight Knife, Helical, or Spiral |
| planer_cutterhead_speed | RPM |
| planer_knife_count | Number of knives, or insert rows for helical/spiral |
| max_depth_per_pass | Inches. |
| feed_rate | Feet per minute. Note if variable or two-speed, e.g. "26 / 32 (two-speed)". |

**Naming-collision rule.** Jointers and planers both have a cutterhead and knives. To keep their fields distinct on the shared tab, planer cutterhead fields carry a `planer_` prefix (`planer_cutterhead_type`, `planer_cutterhead_speed`, `planer_knife_count`), while the unprefixed versions (`cutterhead_type`, `cutterhead_speed`, `knife_count`) belong to jointers. When adding a future category that reuses a concept already on the tab, prefix the new category's version to avoid collisions.

**Snipe (planers):** Snipe, the shallow dip a planer can leave at board ends, is a major planer topic but rarely a published spec. It is not a `category_specs` field. Reflect it in the `owner_praise` or `owner_limitations` prose on the Entries row instead.

**Alignment:** Use Apps Script with individual `setValue` calls for `category_specs` rows, same as the Entries tab. After writing, confirm each row's `machine_slug` in column A exactly matches the corresponding Entries slug. A mismatch means the specs will not join and will not display on the entry page.

---

## Affiliate Programs

Use these programs when available for the machine being researched. Prioritize in the order listed. Check whether the machine is sold by each retailer before linking.

| Retailer | Commission | Priority |
|---|---|---|
| Rockler | 3% | 1 |
| Woodcraft | 3-5% | 2 |
| Acme Tools | 5% | 3 |
| Advanced Machinery | 5-7% | 4 |
| Amazon Associates | 3% | 5 |
| ToolsToday | 5% | 6 (blades and accessories only) |

Note: Highland Woodworking discontinued their affiliate program as of June 2026. Do not add Highland links to any entries. If existing entries have Highland links, flag them for removal.

If a machine is a house brand sold only through a single retailer (e.g. Bauer at Harbor Freight), link to that retailer directly. Note in the `notes` field that no affiliate program is available for this entry.

---

## Reporting

**After each machine,** confirm to the operator:

1. Machine name and slug added
2. Status set (Draft or Live) and why
3. Any fields left empty and why
4. Affiliate links verified as live and prices confirmed against retailer pages
5. Confirmation that status landed in column AI (alignment check passed)

**After a full batch,** provide a summary:

1. Total machines added
2. How many Live vs Draft
3. Any machines that need operator QA before going Live (price verification, thin data, spec discrepancies, broken links)
4. Confirmation that all rows passed the AI/AJ/AK alignment check

---

*Last updated: June 2026. Companion documents: MachFolio Strategy Document, MachFolio Design System, MachFolio Hugo Setup Brief, MachFolio Entry Template Brief, MachFolio Category Index Template Brief, MachFolio Homepage Template Brief, MachFolio Comparison Page Brief, MachFolio Domain Connection Walkthrough.*
