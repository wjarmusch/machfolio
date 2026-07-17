/**
 * MachFolio — populate 20 planers into the Entries tab and category_specs tab.
 *
 * PREREQUISITE: run addPlanerColumns() (from add-planer-columns.gs) FIRST so the
 * 8 planer columns exist on category_specs.
 *
 * Run order from Extensions > Apps Script:
 *   1. writePlanerEntries()       -> appends 20 rows to the Entries tab
 *   2. writePlanerCategorySpecs() -> appends 20 matching rows to category_specs
 *
 * Both write by HEADER NAME (not fixed column index), so values land in the right
 * columns even though Entries has an extra last_updated column beyond A-AK.
 * Both append after the last row and DO NOT overwrite existing rows. Re-running
 * appends duplicates, so run each once.
 */

var TODAY = '2026-07-16';

/* ---- 20 planers. Prose follows the 6 live-facing style rules. ---- */
var PLANERS = [
  // ===== Weekend Warrior =====
  {
    slug:'wen-6550t', name:'WEN 6550T 12.5-Inch Benchtop Thickness Planer', mfr:'WEN', tier:'Weekend Warrior',
    hp:'', volt:'110V', wt:'', dust:'',
    who:"This is a first planer for someone who wants to flatten and thickness boards without spending much. The granite table and 15-amp motor handle typical hobby stock, softwoods and moderate hardwoods in shorter lengths. If you plan to run a lot of wide hardwood or want the cleanest possible finish, a three-knife or spiral machine will serve you better.",
    praise:"Owners say the granite table adds enough mass that the planer stays put and doesn't wobble even when it isn't bolted down | The auto-feed rollers pull boards through smoothly without stalling on normal passes | For a sub-300-dollar planer, owners rate it competitive with pricier benchtop units on cut quality | Blade changes are quick since the double-edged knives just flip or drop in",
    limits:"Snipe shows up at board ends the way it does on most lunchbox planers, and owners handle it with sacrificial lead-in boards or by planing long and cutting to length | It's loud in use, the usual universal-motor whine | With only two knives it takes more passes on hard or figured stock than a three-knife head | The fan-assisted port throws chips everywhere if you don't hook up a collector",
    upg:"Takes WEN's BP122M HSS replacement blades. Owners who want quieter cuts and less tearout bolt in a Sheartak spiral cutterhead, a common upgrade for this model. The dust port adapts to a standard shop-vac or 4-inch hose, and the blades don't interchange with the 13-inch 6552T.",
    a1l:'https://www.amazon.com/dp/B07KKY27KL', a1r:'Amazon', a1p:300,
    c1s:'wen-6552t', c1n:"The WEN 6552T is the 13-inch three-blade version, wider and smoother-cutting for a small step up in price.",
    c2s:'craftsman-cmew320', c2n:"The Craftsman CMEW320 is a similar 12.5-inch two-knife benchtop, often found cheaper on sale.",
    c3s:'porter-cable-pc305tp', c3n:"The Porter-Cable PC305TP is a comparable 12.5-inch benchtop with a stable four-column design, though it snipes more.",
    status:'Live', notes:"Weight and dust port not published by WEN; left blank. Amazon B07KKY27KL. Verify price before publish.",
    ptype:'Benchtop/Lunchbox', pw:'12.5', pt:'6', pch:'Straight Knife', ps:'', pk:'2', pd:'3/32', pf:'26'
  },
  {
    slug:'wen-6552t', name:'WEN 6552T 13-Inch Three-Blade Benchtop Thickness Planer', mfr:'WEN', tier:'Weekend Warrior',
    hp:'', volt:'110V', wt:'66', dust:'2.5',
    who:"The 6552T is for a hobbyist who wants 13 inches of width and a three-knife finish at the low end of the price range. Owners get smooth results that often skip straight to light sanding, and the material-removal gauge helps dial in passes. It sits at the top of the budget tier, so if quality control worries you, spend up to a DeWalt or a spiral benchtop.",
    praise:"The three-blade head leaves a consistently smooth finish, smooth enough that owners often skip heavy sanding | The onboard removal gauge makes it easy to set pass depth | Owners find it easy to set up and use even as a first planer | The blades hold up in hardwood with repeatable cuts, and depth adjustment is fine enough for careful work",
    limits:"Owners report mild snipe at the start and sometimes the end of a board, usually described as easy to sand out, and the tables have leveling screws to reduce it | Quality control is the common complaint, with some units arriving with damaged or broken parts | Fasteners work loose over time, so owners check and retighten screws periodically | Earlier 6552 units had bearing and motor failures, and while the T revision improved things, occasional failures still turn up",
    upg:"Sheartak sells a 13-inch spiral cutterhead made for the 6552T, a popular quieter-cut upgrade. Straight-knife replacements use WEN's 3-blade 13-inch set, not the 12.5-inch 6550T blades. The included stepped adapter fits 2.5-inch and 4-inch hoses, and it drops onto WEN's 6588T stand.",
    a1l:'https://www.amazon.com/dp/B07KL4L9KM', a1r:'Amazon', a1p:349,
    c1s:'wen-6550t', c1n:"The WEN 6550T is the smaller 12.5-inch two-knife model, cheaper if you don't need 13-inch width or the third blade.",
    c2s:'porter-cable-pc305tp', c2n:"The Porter-Cable PC305TP is a 12.5-inch two-knife benchtop, steadier but with only two knives and more snipe.",
    c3s:'dewalt-dw734', c3n:"The DeWalt DW734 steps up to a heavier three-knife machine with a finer finish for more money.",
    status:'Live', notes:"Amazon B07KL4L9KM. Sits at the top of the Weekend Warrior ceiling (~$349). Verify price before publish.",
    ptype:'Benchtop/Lunchbox', pw:'13', pt:'6', pch:'Straight Knife', ps:'8500', pk:'3', pd:'3/32', pf:'26'
  },
  {
    slug:'craftsman-cmew320', name:'Craftsman CMEW320 15-Amp Benchtop Thickness Planer', mfr:'Craftsman', tier:'Weekend Warrior',
    hp:'', volt:'110V', wt:'62', dust:'4',
    who:"This Craftsman is a casual and beginner planer that shows up often on sale pricing. The 15-amp motor and cast-aluminum base give steady stock removal for a benchtop, and the quick-change reversible knives keep maintenance simple. It rewards careful setup, so someone who wants a set-and-forget tool should look at a three-knife DeWalt instead.",
    praise:"Owners say the 15-amp motor removes stock confidently for a benchtop machine | The cast-aluminum base gives it stability and keeps vibration down | The quick-change two-knife head uses reversible double-edged knives that owners like for cutting life | At sale pricing owners consider it a solid beginner and light-hobby planer",
    limits:"Snipe at both ends is a recurring complaint, and owners say adjustments reduce it but don't fully remove it, so plan on sacrificial boards | Factory screws are very tight and setup can be fiddly, with some units marking stock until dialed in | Owners say good results take careful attention, it isn't a set-and-forget planer | There's no stand included and it's heavy to move on and off a bench repeatedly",
    upg:"Replacement knives are Craftsman's CMZW320-2 set. It shares the Delta-derived platform with the Porter-Cable PC305TP, so behavior and mods line up. The port takes a 4-inch collector hose, and there's no helical head sold for it, so owners stick with straight-knife replacements.",
    a1l:'', a1r:'', a1p:'',
    c1s:'porter-cable-pc305tp', c1n:"The Porter-Cable PC305TP shares the same platform and adds a four-column head, at a similar price.",
    c2s:'wen-6550t', c2n:"The WEN 6550T is a comparable 12.5-inch two-knife benchtop with a granite table.",
    c3s:'bauer-63445', c3n:"The Bauer 63445 is a cheaper Harbor Freight two-knife benchtop if budget is the priority.",
    status:'Live', notes:"No Amazon ASIN confirmed; carried by Lowe's and Acme, operator to add affiliate link. Thinnest WW community but over 5 voices. Verify price before publish.",
    ptype:'Benchtop/Lunchbox', pw:'12.5', pt:'6', pch:'Straight Knife', ps:'8000', pk:'2', pd:'1/16', pf:'26'
  },
  {
    slug:'porter-cable-pc305tp', name:'Porter-Cable PC305TP 12.5-Inch Benchtop Thickness Planer', mfr:'Porter-Cable', tier:'Weekend Warrior',
    hp:'', volt:'110V', wt:'65', dust:'',
    who:"The PC305TP is an easy-to-set-up benchtop for dimensioning and light hobby work, and owners rate its cut as good as anything in its class thanks to four precision columns. The 15-amp motor even handles glued-up panels. Its weak spot is snipe, so someone who wants to avoid building infeed tables should look at a planer with adjustable feed-roller tension.",
    praise:"Owners find it easy to set up out of the box, which first-time buyers appreciate | The four precision-ground columns give a stable, repeatable cut that owners rate as good as any in its class | The 15-amp motor handles dimensioning and even glued-up panels | It holds a high owner rating over years of use, with long-term owners still satisfied",
    limits:"Snipe is well documented and one of the top gripes, about 2 to 3 inches at each end, and because this model has no feed-roller pressure adjustment some owners can't tune it out, so infeed and outfeed tables plus sacrificial boards are the fix | No dust hood is included, so owners add the Delta 305-style hood for a 4-inch port | With two straight knives it needs more passes on hard or figured stock, and the knives nick on grit | It's a heavier lunchbox unit and not the quietest",
    upg:"It accepts the Delta TP305 dust hood to convert the rear opening to a 4-inch collector port. It uses standard double-edged reversible quick-change knives. There's no factory helical option, and it shares its platform with the Craftsman CMEW320. The lack of feed-roller tension adjustment is the one thing you can't mod around.",
    a1l:'https://www.amazon.com/dp/B003RUHQLG', a1r:'Amazon', a1p:330,
    c1s:'craftsman-cmew320', c1n:"The Craftsman CMEW320 is the same underlying platform, often cheaper on sale pricing.",
    c2s:'wen-6552t', c2n:"The WEN 6552T adds a third blade and 13-inch width for a smoother finish at a similar price.",
    c3s:'delta-22-555', c3n:"The Delta 22-555 is a 13-inch benchtop with grippy poly feed rollers, a step up in width.",
    status:'Live', notes:"Amazon B003RUHQLG. Verify price before publish.",
    ptype:'Benchtop/Lunchbox', pw:'12.5', pt:'6', pch:'Straight Knife', ps:'8000', pk:'2', pd:'3/32', pf:'26.2'
  },
  {
    slug:'bauer-63445', name:'Bauer 63445 12.5-Inch Portable Thickness Planer', mfr:'Bauer', tier:'Weekend Warrior',
    hp:'', volt:'120V', wt:'64.7', dust:'',
    who:"The Bauer is the lowest-cost way into a benchtop planer, sold only at Harbor Freight, and owners get solid results on a wide range of hardwoods and softwoods when they take light passes. Owners regularly report years of steady use out of it. It's an entry-level machine that depends on careful setup, so anyone planning aggressive full-width hardwood work should step up a tier.",
    praise:"Owners consistently call it strong value, with a nice finish for the money | It holds up in sustained use, with owners reporting a few years of regular work without issues | Owners run everything from pine and cedar to oak, walnut, maple, and purpleheart with good results | Several owners have gone through multiple sets of blades with the machine still running strong",
    limits:"Snipe is present but owners call it manageable, largely handled with careful infeed and outfeed setup and light passes | Chip and dust ejection is weak without a collector attached, so it makes a mess run bare | It's a two-knife straight head with no helical option, so finish and knife life trail helical machines | Results depend heavily on setup and light depth of cut, it isn't built for aggressive hardwood passes",
    upg:"It uses common 12.5-inch lunchbox knives, and aftermarket HSS sets that fit the Delta 22-560, WEN 6550, and Porter-Cable PC305TP are cross-listed for it. There's no helical upgrade for this model. Replacement knives and rollers come straight from Harbor Freight.",
    a1l:'https://www.harborfreight.com/15-amp-12-12-in-portable-thickness-planer-63445.html', a1r:'Harbor Freight', a1p:350,
    c1s:'wen-6550t', c1n:"The WEN 6550T is a similar-price 12.5-inch benchtop with a granite table and a helical-upgrade path.",
    c2s:'craftsman-cmew320', c2n:"The Craftsman CMEW320 is a comparable two-knife benchtop with a cast-aluminum base.",
    c3s:'porter-cable-pc305tp', c3n:"The Porter-Cable PC305TP is a stable four-column benchtop in the same class.",
    status:'Live', notes:"House brand, Harbor Freight only, no affiliate program applies. Moved to Weekend Warrior per operator. Verify price ($350 sale / $549 regular) before publish.",
    ptype:'Benchtop/Lunchbox', pw:'12.5', pt:'6', pch:'Straight Knife', ps:'9400', pk:'2', pd:'3/32', pf:''
  },

  // ===== Hobbyist =====
  {
    slug:'dewalt-dw734', name:'DeWalt DW734 12.5-Inch Benchtop Thickness Planer', mfr:'DeWalt', tier:'Hobbyist',
    hp:'', volt:'110V', wt:'80', dust:'2.5',
    who:"The DW734 is a strong three-knife benchtop for a hobbyist who wants a clean finish and buy-once durability without stepping up to the two-speed DW735. Its 96-cuts-per-inch head and long cast tables give smooth, stable results on hardwood. If you want the finest finish and better dust handling, the DW735 is the step up, and if width matters, note this one caps at 12.5 inches.",
    praise:"Owners say the 96-cuts-per-inch three-knife head leaves one of the finest surfaces of any lunchbox planer, with little sanding needed | The 15-amp motor handles hardwood without bogging down | The long cast infeed and outfeed tables give good support and stability | The reversible disposable knives are cheap and fast to swap, and owners find the knife life claim holds up",
    limits:"The carriage lock reduces snipe but owners still see it on hardwood, and say the fix is supporting the board ends, running long and trimming, or sacrificial boards | It has a single feed speed, with no fine finishing mode like the DW735 | There's no fan-assisted chip blower, so dust collection is weaker and owners add the DW7331 hood and a shop vac | It's heavy at 80 pounds and loud, and the 2.5-inch port makes 4-inch collection awkward without the accessory hood",
    upg:"Owners fit an aftermarket Byrd Shelix helical head for quieter, tearout-free cuts. DW7342 disposable knives are the OEM replacement, and the DW7331 hood adds 4-inch dust collection. Common tweaks are leveling the tables and adding a Wixey depth readout. There's no variable-feed option.",
    a1l:'https://www.amazon.com/dp/B0000CCXU6', a1r:'Amazon', a1p:449,
    c1s:'dewalt-dw735x', c1n:"The DeWalt DW735X is the step up, adding a two-speed head, a chip blower, and 13-inch width.",
    c2s:'ridgid-r4331', c2n:"The Ridgid R4331 is a 13-inch three-knife rival with a strong chip-impeller dust system.",
    c3s:'delta-22-555', c3n:"The Delta 22-555 is a 13-inch two-knife benchtop, cheaper but coarser on figured wood.",
    status:'Live', notes:"Amazon B0000CCXU6. Verify price before publish.",
    ptype:'Benchtop/Lunchbox', pw:'12.5', pt:'6', pch:'Straight Knife', ps:'10000', pk:'3', pd:'1/8', pf:'26'
  },
  {
    slug:'ridgid-r4331', name:'Ridgid R4331 13-Inch Thickness Planer', mfr:'Ridgid', tier:'Hobbyist',
    hp:'', volt:'110V', wt:'73', dust:'2.5',
    who:"The R4331 is a 13-inch three-knife benchtop sold through Home Depot, and its standout is the chip-impeller dust system that owners rate highly. The three-blade head leaves a clean finish and the lifetime service agreement adds real long-term value. Feed and snipe consistency vary unit to unit, so it rewards careful table setup.",
    praise:"Owners praise the chip-impeller dust system as excellent at clearing chips and dust | The three-blade head leaves a smooth finish and owners say it improved over the older R4330, holding height better and bogging less | The lifetime service agreement, with free parts and service after registration, is a major draw | The 13-inch width and repeat-cut depth stops make repeatable thicknessing easy",
    limits:"Snipe experience is mixed, with some owners calling it terrible and just trimming the ends while others level the tables and eliminate it | Some owners report blade indexing or slipping issues that cause uneven thickness across the width | The threaded-post lock nuts can vibrate loose and produce tapered boards | Feed can pause or run inconsistently, and the 2.5-inch port needs an aftermarket adapter for many collectors",
    upg:"It uses dual-edge quick-change OEM blades. Because the 2.5-inch port is non-standard, aftermarket dust adapters are common. There's no widely available helical retrofit, and it's single feed speed.",
    a1l:'', a1r:'', a1p:'',
    c1s:'dewalt-dw734', c1n:"The DeWalt DW734 is a comparable three-knife benchtop with excellent finish, sold more widely.",
    c2s:'delta-22-555', c2n:"The Delta 22-555 is a 13-inch two-knife benchtop at a similar price with grippy feed rollers.",
    c3s:'wen-6552t', c3n:"The WEN 6552T is a cheaper 13-inch three-blade option if you want to spend less.",
    status:'Live', notes:"Home Depot exclusive (model 27263); no ASIN or affiliate found, operator to add Home Depot link. Verify price before publish.",
    ptype:'Benchtop/Lunchbox', pw:'13', pt:'6.125', pch:'Straight Knife', ps:'9000', pk:'3', pd:'1/8', pf:'23.5'
  },
  {
    slug:'delta-22-555', name:'Delta 22-555 13-Inch Portable Thickness Planer', mfr:'Delta', tier:'Hobbyist',
    hp:'', volt:'110V', wt:'58', dust:'2',
    who:"The Delta 22-555 is a 13-inch benchtop with a stable four-column design and grippy poly feed rollers that owners say give clean, no-slip results. It suits a hobbyist doing small to medium projects. The two-knife head and shallower depth of cut make it a lighter-duty choice than the three-knife DeWalt and Ridgid, and snipe is hit or miss.",
    praise:"The four-column design gives good rigidity for the price and owners cite smooth, accurate results | The two poly feed rollers sit close to the cutterhead and grip well, so owners get no-slip feeding and a clean finish | The quick-change dual-edge disposable knives are easy to swap with no alignment jig | The 15-amp motor handles small-shop demands and the stainless bed reduces friction",
    limits:"Snipe is the most common complaint and experience splits, with some owners getting very little and others unable to control it even with table adjustment and shop-made beds | The two-knife head limits cuts per inch, so finish on figured wood is coarser than three-knife rivals | Max depth of cut is shallower at 3/32 inch versus 1/8 inch on the DeWalt and Ridgid | Some owners report feed and roller problems, and the roughly 2-inch port needs an adapter for standard hoses",
    upg:"It uses dual-edge disposable OEM knives with quick-change. There's little in the way of a helical retrofit, and the roughly 2-inch non-standard port usually needs an adapter for 2.5 or 4-inch hoses. Single feed speed.",
    a1l:'', a1r:'', a1p:'',
    c1s:'ridgid-r4331', c1n:"The Ridgid R4331 is a 13-inch three-knife rival with a better dust system and a lifetime service plan.",
    c2s:'dewalt-dw734', c2n:"The DeWalt DW734 is a three-knife benchtop with a finer finish and deeper cut.",
    c3s:'porter-cable-pc305tp', c3n:"The Porter-Cable PC305TP is a cheaper 12.5-inch benchtop on the same kind of four-column design.",
    status:'Live', notes:"No ASIN confirmed; Amazon and Acme carry it, operator to add link. Verify price before publish.",
    ptype:'Benchtop/Lunchbox', pw:'13', pt:'6', pch:'Straight Knife', ps:'', pk:'2', pd:'3/32', pf:''
  },

  // ===== Serious Hobbyist =====
  {
    slug:'dewalt-dw735x', name:'DeWalt DW735X 13-Inch Two-Speed Thickness Planer', mfr:'DeWalt', tier:'Serious Hobbyist',
    hp:'', volt:'110V', wt:'92', dust:'4',
    who:"The DW735X is the benchmark benchtop planer, a 13-inch three-knife machine with a two-speed head and a fan-assisted chip blower that owners rate best in class. The X kit adds infeed and outfeed tables plus spare knives. It's the pick for someone who wants near-stationary finish quality on a bench, as long as you can live with the weight and noise.",
    praise:"The two-speed gearbox and 179-cuts-per-inch finish mode give a glass-smooth surface owners rate best in class | The fan-assisted blower ejects chips forcefully and owners call it the best dust handling of any lunchbox planer | The automatic carriage lock and rigid cast-aluminum base keep vibration low and cuts consistent | The turret depth stop and removal gauge make repeatable thicknessing easy, and owners lean on it for heavy hardwood work",
    limits:"The auto carriage lock reduces snipe but owners still measure a few thousandths near the ends, so leveling the kit's tables and supporting the board are the fixes | The internal blower can fight an external dust collector, and owners sometimes add the DW7350 chip-ejection accessory | It's heavy at 92 pounds and very loud | The stock knives are disposable HSS, which pushes heavy users toward a helical upgrade",
    upg:"The most popular upgrade is a Byrd Shelix helical head for quieter cuts and no tearout on figured wood. The DW7350 accessory helps with chip ejection, the DW735X already includes the folding tables, and a Wixey WR510 depth readout is a common add. Watch the blower and collector interaction noted above.",
    a1l:'https://www.amazon.com/dp/B003OX9KME', a1r:'Amazon', a1p:669,
    c1s:'dewalt-dw734', c1n:"The DeWalt DW734 is the single-speed sibling, cheaper and 12.5 inches wide without the chip blower.",
    c2s:'makita-2012nb', c2n:"The Makita 2012NB is quieter and lighter but narrower at 12 inches and only two knives.",
    c3s:'cutech-40200hc-ct', c3n:"The Cutech 40200HC-CT trades the DeWalt's straight knives for a spiral carbide head that resists tearout.",
    status:'Live', notes:"Amazon B003OX9KME. Verify price before publish.",
    ptype:'Benchtop/Lunchbox', pw:'13', pt:'6', pch:'Straight Knife', ps:'10000', pk:'3', pd:'1/8', pf:''
  },
  {
    slug:'makita-2012nb', name:'Makita 2012NB 12-Inch Benchtop Thickness Planer', mfr:'Makita', tier:'Serious Hobbyist',
    hp:'', volt:'120V', wt:'62', dust:'3',
    who:"The Makita 2012NB is the quiet one, a 12-inch benchtop that owners pick when noise and low snipe matter more than raw width. Its Interna-Lok head clamp measurably reduces snipe and it's the lightest machine in its class. The trade-offs are a 12-inch width, only two straight knives, and an odd dust port, so figured-grain and helical fans should look at the Cutech or a Shelix-upgraded DeWalt.",
    praise:"Owners consistently call it notably quiet for a lunchbox planer, its number-one praise over the DeWalt | At about 62 pounds it's the lightest in class and easy to move and store | Blade changes are the fastest around, with disposable double-edge knives that flip or swap in minutes | Owners report excellent finish quality, and one running it near-daily for three years reports excellent results with the optional dust hood",
    limits:"Snipe is among the lowest of any lunchbox planer thanks to the Interna-Lok clamp, though owners note it reduces rather than fully removes snipe and end support still helps | The 12-inch width and straight knives mean it tears out figured grain more than a helical head and handles narrower stock than 13-inch rivals | The roughly 3-inch dust port is an odd size and needs a custom adapter, and the hood isn't included | The disposable knives can't be resharpened, so there's an ongoing consumable cost",
    upg:"The upgrade path is limited, mainly replacement double-edge knife sets and the optional Makita dust hood plus shop-built infeed and outfeed support. There's no practical helical retrofit for its small head, which is the main trade-off against the DeWalt and the spiral benchtops.",
    a1l:'https://www.amazon.com/dp/B000051ZOO', a1r:'Amazon', a1p:550,
    c1s:'dewalt-dw735x', c1n:"The DeWalt DW735X is wider, three-knife, and two-speed, but heavier and much louder.",
    c2s:'rikon-25-130h', c2n:"The Rikon 25-130H offers an insert head for better figured-grain results in a 13-inch benchtop.",
    c3s:'dewalt-dw734', c3n:"The DeWalt DW734 is a 12.5-inch three-knife machine with a finer finish but more noise.",
    status:'Live', notes:"Amazon B000051ZOO. Streets slightly below the Serious Hobbyist band; placed on community perception. Verify price before publish.",
    ptype:'Benchtop/Lunchbox', pw:'12', pt:'6', pch:'Straight Knife', ps:'8500', pk:'2', pd:'1/8', pf:'28'
  },
  {
    slug:'rikon-25-130h', name:'Rikon 25-130H 13-Inch Benchtop Planer with Insert Head', mfr:'Rikon', tier:'Serious Hobbyist',
    hp:'', volt:'115V', wt:'73', dust:'4',
    who:"The Rikon 25-130H brings an insert cutterhead to a 13-inch benchtop, so instead of setting knives you rotate or replace individual inserts, and owners say it handles figured stock better than straight knives. It runs quiet and leaves faint mill marks. Just know the head is a segmented straight-row design, not a true angled helical, so tearout control is better than knives but not equal to a Shelix or spiral head.",
    praise:"The insert head means no knife setting and easy upkeep, since owners rotate or replace individual inserts | Owners say it runs quietly and leaves very small, almost invisible mill marks | A full insert set is inexpensive and owners report inserts lasting years with regular use | It handles figured stock with less tearout than straight knives, which is why owners choose it over the DeWalt",
    limits:"Snipe is mixed, with some units arriving with almost none while others need the tables re-shimmed when the adjustment screws vibrate loose | The head is segmented straight-row rather than true helical, so owners say tearout is only modestly better than straight knives | The inserts are two-sided HSS rather than four-sided carbide, so fewer fresh edges per insert | Owners point to the table adjustment hardware as the weak spot, and the older 25-130H is single feed speed",
    upg:"Since the insert head is the selling point, the main upkeep is replacement two-edge inserts, with Rockler-sold carbide inserts fitting the family. Rikon's 25-410 stand and dust adapters are common adds, and Rikon calls for at least 650 CFM of collection. The current 25-135H successor adds a two-speed feed.",
    a1l:'https://www.amazon.com/dp/B00SOR3YV8', a1r:'Amazon', a1p:600,
    c1s:'cutech-40200hc-ct', c1n:"The Cutech 40200HC-CT has a true spiral carbide head, a step past the Rikon's segmented straight-row inserts.",
    c2s:'dewalt-dw735x', c2n:"The DeWalt DW735X is a straight-knife benchtop with a finer finish and two-speed head, but more tearout on figured wood.",
    c3s:'makita-2012nb', c3n:"The Makita 2012NB is a quieter, lighter straight-knife 12-inch machine without an insert head.",
    status:'Live', notes:"Current successor is the 25-135H (adds two-speed feed). Amazon B00SOR3YV8. Verify price and availability before publish.",
    ptype:'Benchtop/Lunchbox', pw:'13', pt:'6', pch:'Segmented Insert', ps:'10000', pk:'26', pd:'1/8', pf:'26'
  },
  {
    slug:'cutech-40200hc-ct', name:'Cutech 40200HC-CT 13-Inch Spiral Cutterhead Benchtop Planer', mfr:'Cutech', tier:'Serious Hobbyist',
    hp:'', volt:'120V', wt:'78', dust:'4',
    who:"The Cutech 40200HC-CT puts a true spiral carbide head on a 13-inch benchtop, and owners say it solves the tearout that frustrates straight-knife owners on curly and figured wood. Its Snipe Lock keeps end snipe very low in practice. The trade-off is a smaller brand with a narrower support and community footprint than DeWalt or Makita, and a single feed speed.",
    praise:"Owners say the true spiral carbide head gives noticeably better results on curly maple and figured species and solves straight-knife tearout | It leaves a surface smooth enough to need little sanding, with only faint insert lines | Owners report very low snipe in practice, helped by the Snipe Lock | The 26 two-sided carbide inserts rotate individually for cheap, low-downtime upkeep, and owners praise the tech support",
    limits:"Snipe is usually very low, but at least one owner reported noticeable tearout on the exit side, so results depend on setup and insert alignment | Faint parallel lines can show where insert rows don't fully overlap, which is inherent to the segmented spiral geometry | Effective depth of cut drops to about 1/16 inch at the full 13-inch width | It's a smaller brand with fewer owner data points and less dealer presence, and it's single feed speed",
    upg:"Since it ships with the spiral carbide head, upkeep is replacement two-sided carbide inserts, with Cutech's PS200 toolkit available. Dust hooks up through the dual 2.5 and 4-inch port, and owners commonly mount it on a rolling miter-saw stand for portability.",
    a1l:'https://www.amazon.com/dp/B01F89FSVS', a1r:'Amazon', a1p:650,
    c1s:'rikon-25-130h', c1n:"The Rikon 25-130H uses a segmented straight-row insert head rather than the Cutech's true spiral, at a similar price.",
    c2s:'dewalt-dw735x', c2n:"The DeWalt DW735X is the straight-knife benchmark, wider and two-speed but more prone to tearout on figured stock.",
    c3s:'makita-2012nb', c3n:"The Makita 2012NB is a quiet straight-knife benchtop, cheaper but without a spiral head.",
    status:'Live', notes:"Current equivalent is the 40200H (~$669). Amazon B01F89FSVS. Thinnest Serious Hobbyist community (~5 voices). Verify price before publish.",
    ptype:'Benchtop/Lunchbox', pw:'13', pt:'6', pch:'Spiral', ps:'10000', pk:'26', pd:'1/8', pf:'26'
  },

  // ===== Semi-Pro =====
  {
    slug:'grizzly-g0453', name:'Grizzly G0453 15-Inch Planer', mfr:'Grizzly', tier:'Semi-Pro',
    hp:'3', volt:'240V', wt:'655', dust:'4',
    who:"The G0453 is an entry into stationary 15-inch planing at the bottom of the semi-pro range, a heavy cast-iron machine with a three-knife straight head and a 3-HP motor. Owners recommend it as a strong mid-size value, and some specifically prefer resharpenable straight knives over carbide inserts. If you work a lot of figured wood or want the quietest cut, the spiral G0453Z on the same chassis is the upgrade.",
    praise:"Owners repeatedly recommend it as a strong mid-size value and say you won't be disappointed | The straight HSS knives can be resharpened locally and cheaply, which some owners prefer over buying inserts | With proper knife setup it leaves a clean finish on a solid cast-iron build | It uses the same heavy, proven 655-pound chassis as the G0453Z",
    limits:"Owners hit snipe and say the fix is dropping the bed rollers to about 0.002 inch, since setting them higher produced snipe | Straight knives run louder and tear out figured wood more than a spiral or helical head | Knife changes and alignment take time compared with indexable inserts, even with the included jig | It's heavy and its high chip output needs a dedicated dust collector",
    upg:"A popular path is retrofitting a Byrd Shelix helical head to turn it into effectively a spiral machine, or stepping up to the factory G0453Z. Replacement 15-inch HSS knife sets (Grizzly G6701) are cheap. It has a built-in mobile base, and the 4-inch port wants a 400-plus CFM collector.",
    a1l:'https://www.amazon.com/dp/B000E3067K', a1r:'Amazon', a1p:1495,
    c1s:'grizzly-g0453z', c1n:"The Grizzly G0453Z is the same 15-inch machine with a spiral carbide head, quieter and better on figured wood.",
    c2s:'dewalt-dw735x', c2n:"The DeWalt DW735X is a benchtop alternative, far cheaper and portable but only 13 inches and straight-knife.",
    c3s:'grizzly-g0454z', c3n:"The Grizzly G0454Z steps up to a 20-inch spiral machine with much more capacity and weight.",
    status:'Live', notes:"Amazon B000E3067K. Bottom of the Semi-Pro band (~$1495). Verify price before publish.",
    ptype:'Stationary', pw:'15', pt:'8', pch:'Straight Knife', ps:'4800', pk:'3', pd:'3/32', pf:'16 / 30 (two-speed)'
  },
  {
    slug:'grizzly-g0453z', name:'Grizzly G0453Z 15-Inch Planer with Spiral Cutterhead', mfr:'Grizzly', tier:'Semi-Pro',
    hp:'3', volt:'240V', wt:'655', dust:'4',
    who:"The G0453Z is the spiral-carbide version of Grizzly's 15-inch planer, and owners describe the cut as smooth as silk and notably quieter than straight-knife machines. It handles figured and curly stock with much less tearout, and a WOOD Magazine test ranked it ahead of other 15-inch planers for clean cuts and snipe control. It's a heavy cast-iron machine that needs real dust collection and two people to move.",
    praise:"Owners say the spiral carbide head runs smooth as silk and much quieter than straight-knife planers | Long-term owners report being extremely happy, with fit and finish better than expected for the price | Many owners needed no roller adjustment out of the crate, with no vibration or unusual noise | A WOOD Magazine test ranked it ahead of other 15-inch planers for clean cuts and snipe control, and it handles figured stock with greatly reduced tearout",
    limits:"Owners report occasional snipe, mainly when stock isn't supported on exit, fixed by lowering the bed rollers and aligning the tables, which is fiddly with feeler gauges | At 655 pounds it's a two-person-plus job to move despite the mobile base | The 74 carbide inserts must eventually be rotated or replaced, which means a lot of Torx screws | It needs a real dust collector, since high chip volume can clog undersized collection",
    upg:"The head is already spiral carbide, so upkeep is rotating and replacing the 74 indexable inserts, which Grizzly and third parties stock. It has a built-in mobile base, the 4-inch port wants around 400-plus CFM, and it shares the G0453 chassis so parts interchange.",
    a1l:'https://www.amazon.com/dp/B0017IF2RU', a1r:'Amazon', a1p:2095,
    c1s:'grizzly-g0453', c1n:"The Grizzly G0453 is the straight-knife version on the same chassis, cheaper with resharpenable knives.",
    c2s:'grizzly-g0454z', c2n:"The Grizzly G0454Z is the 20-inch spiral big brother, wider and heavier for more money.",
    c3s:'powermatic-209hh', c3n:"The Powermatic 209HH is a 20-inch industrial helical machine well above this price and capacity.",
    status:'Live', notes:"Amazon B0017IF2RU. Verify price before publish.",
    ptype:'Stationary', pw:'15', pt:'8', pch:'Spiral', ps:'4800', pk:'74', pd:'3/32', pf:'16 / 30 (two-speed)'
  },
  {
    slug:'shop-fox-w1742h', name:'Shop Fox W1742H 15-Inch Planer with Helical Cutterhead', mfr:'Shop Fox', tier:'Semi-Pro',
    hp:'3', volt:'240V', wt:'600', dust:'4',
    who:"The Shop Fox W1742H is a 15-inch helical planer with a five-row, 75-insert head, the highest insert count in this group, on a full cast-iron cabinet build. On paper it's a lot of machine for the money and a natural replacement for an aging 15-inch planer. Owner data is thin, though, so it's worth confirming setup and support expectations before you commit.",
    praise:"The five-row helical head carries 75 carbide inserts, the highest insert count among comparable 15-inch machines | It's a full cast-iron build around 600 pounds with cast-iron extension wings and an enclosed cabinet stand | It offers 8 inches of thickness capacity and a built-in mobile base | It shares the Woodstock and Grizzly design lineage behind the well-regarded 15-inch machines",
    limits:"There's little model-specific owner snipe data, and general guidance is to manage snipe with bed-roller height and table alignment | Owners of the newer enclosed-head W-series note the support posts moved closer together as a cost reduction, seen as potentially less stable | Sparse community means less peer troubleshooting than Grizzly or Jet, and it's often backordered | It sits at or above the 3,000-dollar mark with a shorter 2-year warranty than the Jet",
    upg:"The factory five-row helical head is maintained by rotating and replacing the 75 indexable inserts, which Shop Fox stocks. It has a built-in mobile base, the 4-inch port wants around 400-plus CFM, and parts and manual are shared with the straight-knife W1742.",
    a1l:'', a1r:'', a1p:'',
    c1s:'grizzly-g0453z', c1n:"The Grizzly G0453Z is a better-documented 15-inch spiral planer at a lower price.",
    c2s:'grizzly-g0454z', c2n:"The Grizzly G0454Z is a 20-inch spiral machine for more capacity at a similar price.",
    c3s:'powermatic-209hh', c3n:"The Powermatic 209HH is a 20-inch industrial helical planer well above this tier.",
    status:'Draft', notes:"THIN DATA (under 5 owner voices) - Draft until community sourcing confirmed. No ASIN; Acme carries it, operator to add link. Verify price before publish.",
    ptype:'Stationary', pw:'15', pt:'8', pch:'Helical', ps:'4800', pk:'75', pd:'3/32', pf:'16 / 30 (two-speed)'
  },
  {
    slug:'jet-jwp-15bhh', name:'Jet JWP-15BHH 15-Inch Helical Cutterhead Planer', mfr:'Jet', tier:'Semi-Pro',
    hp:'3', volt:'230V', wt:'286', dust:'4',
    who:"The Jet JWP-15BHH is a 15-inch helical planer whose gas-strut head system owners credit with keeping snipe very low, and it carries the longest warranty in this group at five years. It's lighter than the cast-iron Grizzly and Shop Fox machines, which makes it easier to place but less massive. It prices just above the semi-pro band and competes on head design and warranty rather than value.",
    praise:"Owners credit the dual gas-strut head system with minimizing snipe, reporting negligible snipe | Owners describe an incredible finish for a planer, with very little finish-sanding needed | It assembles and sets up easily and runs quiet like most helical carbide machines | The 5-year warranty is the longest in this group, and the lighter weight makes it easier to position",
    limits:"Snipe isn't fully eliminated, and owners note a little now and then, especially without supporting the board | There are no top-mounted board-return rollers, which one owner missed for two-person feeding | It caps at 6 inches of thickness, less than the 8 inches on the Grizzly and Shop Fox, on a lighter, less rigid build | It prices above the semi-pro band, so it competes on head design and warranty rather than value",
    upg:"The factory helical head uses 48 four-sided carbide inserts that owners rotate and replace. There's no built-in mobile base, so the Jet JMB-UMB universal base is the common add. The 4-inch port needs a dedicated collector around 400-plus CFM.",
    a1l:'https://www.amazon.com/dp/B07QTF7CMT', a1r:'Amazon', a1p:3200,
    c1s:'grizzly-g0453z', c1n:"The Grizzly G0453Z is a heavier cast-iron 15-inch spiral planer at a lower price, though with a shorter warranty.",
    c2s:'grizzly-g0454z', c2n:"The Grizzly G0454Z is a 20-inch spiral machine with more capacity for around the same money.",
    c3s:'powermatic-209hh', c3n:"The Powermatic 209HH is a 20-inch industrial helical planer a big step up in size and price.",
    status:'Draft', notes:"Borderline community (~5 voices) and priced above the Semi-Pro ceiling (~$3200) - Draft pending confirmation. Amazon B07QTF7CMT. Verify price before publish.",
    ptype:'Stationary', pw:'15', pt:'6', pch:'Helical', ps:'5200', pk:'48', pd:'1/8', pf:'16 / 20 (two-speed)'
  },

  // ===== Professional =====
  {
    slug:'powermatic-209hh', name:'Powermatic 209HH 20-Inch Planer with Helical Head', mfr:'Powermatic', tier:'Professional',
    hp:'5', volt:'230V', wt:'880', dust:'5',
    who:"The Powermatic 209HH is a 20-inch industrial planer with a Byrd Shelix helical head, built for shops that dimension wide, hard stock daily. Owners say it planes big knots and hard maple cleanly and runs surprisingly quiet for its size, with top-notch fit and finish. It's a premium over the near-identical Jet, and some owners feel it's only slightly better for the money.",
    praise:"Owners say it runs very quiet for a 20-inch machine | It planes large knots and hard maple cleanly without tearout or chunking | Owners call the fit and finish top notch and the operation smooth, with one Byrd-head owner calling it a beast that met every expectation | The two-speed gearbox, with optional slow-speed gears, is praised for figured stock, and owners like the longer bed and built-in mobile base over the Jet",
    limits:"Several owners report more snipe than expected, with the fix being to crank down the head lock clamps and support long stock | Quality control varies, with reports of a crushed belt housing or a dead switch on arrival and untapped outfeed-table holes | Owners rate dust pickup weaker than expected despite the 5-inch port | The small non-swiveling wheels are nearly useless for positioning, and owners say the premium over the Jet isn't always worth it",
    upg:"It ships with the Byrd Shelix head, and replacement four-sided carbide inserts are widely available. A factory 3-phase model (209HH-3) is available for 230 or 460V. The 5-inch port wants 400-plus CFM, and common mods are an aftermarket mobile base and a Wixey digital height readout.",
    a1l:'https://www.amazon.com/dp/B001GOGLUC', a1r:'Amazon', a1p:5999,
    c1s:'grizzly-g0454z', c1n:"The Grizzly G0454Z is a 20-inch spiral planer at roughly half the price, heavier but built in China.",
    c2s:'grizzly-g0453z', c2n:"The Grizzly G0453Z is a 15-inch spiral machine, narrower and far cheaper for smaller shops.",
    c3s:'', c3n:'',
    status:'Live', notes:"Amazon B001GOGLUC. Best-documented Professional model. Verify price before publish.",
    ptype:'Stationary', pw:'20', pt:'8', pch:'Helical', ps:'5000', pk:'100', pd:'', pf:'24 / 31 (two-speed)'
  },
  {
    slug:'jet-jwp-208hh-1', name:'Jet JWP-208HH-1 20-Inch Helical Cutterhead Planer', mfr:'Jet', tier:'Professional',
    hp:'5', volt:'230V', wt:'753', dust:'5',
    who:"The Jet JWP-208HH-1 is a 20-inch helical planer widely seen as the value pick against the near-identical Powermatic 209HH, often selling for less. Owners report a perfect face after a couple of passes and a notably quieter cut than straight-knife 20-inch machines. Long-term owner reports are sparse, so durability consensus is harder to pin down.",
    praise:"One long-time woodworker reports an absolute perfect face after two or three passes, a big step up from a 13-inch lunchbox | Owners say the helical head is notably quieter than straight-knife 20-inch machines | The large cast-iron table and extension wings are praised for support and flatness | It's widely regarded as the value pick against the near-identical Powermatic 209HH",
    limits:"Owners say it's low-snipe only after fussing with table alignment, and the serrated outfeed roller can leave faint marks on finish passes | The infeed and outfeed extension tables take real effort to dial in | Long-term owner reports are sparse, making durability consensus hard to establish | It's heavy and awkward to move, with no factory mobile base on the -1 unlike the Powermatic",
    upg:"The helical head's inserts are user-rotatable with four edges and stocked by Jet and third parties. The 5-inch port wants at least 400 CFM. There's no native 3-phase on the -1, and common adds are a Wixey readout, a mobile base, and spare insert packs.",
    a1l:'https://www.amazon.com/dp/B0011TKF2M', a1r:'Amazon', a1p:4799,
    c1s:'powermatic-209hh', c1n:"The Powermatic 209HH is the near-identical premium sibling with a Shelix head and a built-in mobile base.",
    c2s:'grizzly-g0454z', c2n:"The Grizzly G0454Z is a 20-inch spiral planer at a much lower price with a heavier cast build.",
    c3s:'grizzly-g0453z', c3n:"The Grizzly G0453Z is a 15-inch spiral machine for smaller shops at a fraction of the price.",
    status:'Draft', notes:"THIN DATA (~4 voices) - Draft until community sourcing confirmed. Amazon B0011TKF2M. Verify price before publish.",
    ptype:'Stationary', pw:'20', pt:'8', pch:'Helical', ps:'5000', pk:'92', pd:'3/32', pf:'24 / 31 (two-speed)'
  },
  {
    slug:'grizzly-g0454z', name:'Grizzly G0454Z 20-Inch Planer with Spiral Cutterhead', mfr:'Grizzly', tier:'Professional',
    hp:'5', volt:'240V', wt:'932', dust:'5',
    who:"The G0454Z is the most affordable way into a 20-inch spiral planer, an all-cast-iron machine that one owner ran about 30,000 linear feet over four years without significant issues. The spiral head gives a silky finish and cuts tearout on figured stock. It's built in China rather than Taiwan like Grizzly's pricier G1033X, which some owners weigh as a QC concern, and at 930 pounds it's a chore to move.",
    praise:"One owner ran about 30,000 linear feet over four years with no significant issues, a strong durability data point | Owners call it a great machine for the money with a heavy all-cast-iron and steel build and almost no plastic | The spiral head delivers a silky finish and greatly reduces tearout in figured and curly stock | The precision-ground cast-iron table and wings give over 55 inches of support, and inserts are cheap and easy to rotate",
    limits:"Snipe is manageable but needs setup, with owners running the bed rollers low and keeping the bed waxed and slick | Owners report uneven insert tracks when carbide is indexed without a properly calibrated torque wrench, an installation issue rather than a defect | It's built in China rather than Taiwan like the G1033X, which some owners cite as a QC and perception concern | At around 930 pounds it's a real chore to move, and some units arrive with minor cosmetic scrapes",
    upg:"The spiral head is standard, and German-made replacement inserts are stocked by Grizzly. Byrd Shelix drop-in heads are also sold aftermarket for this frame. It's single-voltage 240V single-phase, so 3-phase would need a motor swap and VFD. The 5-inch port wants 400-plus CFM.",
    a1l:'https://www.amazon.com/dp/B000TUKARO', a1r:'Amazon', a1p:3195,
    c1s:'powermatic-209hh', c1n:"The Powermatic 209HH is a premium 20-inch Shelix machine with better fit and finish for roughly double the price.",
    c2s:'grizzly-g0453z', c2n:"The Grizzly G0453Z is the 15-inch spiral version, narrower and lighter for smaller shops.",
    c3s:'', c3n:'',
    status:'Live', notes:"Community low-moderate (~6 voices); leaning Live per operator, QA flag. Amazon B000TUKARO. Verify price before publish.",
    ptype:'Stationary', pw:'20', pt:'8', pch:'Spiral', ps:'4800', pk:'98', pd:'3/16', pf:'16 / 20 (two-speed)'
  },
  {
    slug:'grizzly-g0544', name:'Grizzly G0544 20-Inch Planer with Spiral Cutterhead', mfr:'Grizzly', tier:'Professional',
    hp:'5', volt:'240V', wt:'900', dust:'5',
    who:"The G0544 is Grizzly's pro-feature 20-inch spiral planer, with a segmented chip breaker, variable feed speed from a separate 2-HP feed motor, and lever-adjustable bed rollers on a heavier build. When it's dialed in, owners get clean tearout-free results on figured wood. The catch is a feeding quirk that shows up in owner reports, and thin community data overall, so plan on careful setup.",
    praise:"The pro feature set stands out, with a segmented chip breaker, variable feed speed, and lever-adjustable bed rollers | It's a heavier build, around 1,040 pounds shipping, with a higher 5,200-RPM head than the G0454Z | When dialed in, owners get clean tearout-free results on figured wood | It comes with adjustable bed rollers and a 5-inch dust port standard",
    limits:"Feeding is the dominant complaint, with boards hanging up or stalling past the infeed roller, worse on the left side where the roller can dig a divot | Owners say the fixes are running the bed rollers all the way down, keeping the bed waxed, and setting the feed rollers, pressure bar, and chipbreaker just below the knife arc | One owner reported a table flatness issue of about 0.002 inch toward the center that contributed to feed problems | It's setup-sensitive and community data is thin, so it's hard to gauge how representative the feeding complaints are",
    upg:"The spiral head is standard, and Byrd Shelix replacement heads are sold aftermarket for the G0544, with inserts stocked by Grizzly. It's single-voltage 240V single-phase, so 3-phase isn't a factory option. The 5-inch port wants 400-plus CFM, and common owner fixes are anti-friction bed treatment and re-shimming the rollers and pressure bar.",
    a1l:'https://www.amazon.com/dp/B00012YK3K', a1r:'Amazon', a1p:5700,
    c1s:'grizzly-g0454z', c1n:"The Grizzly G0454Z is Grizzly's lighter, cheaper 20-inch spiral planer without the variable feed and segmented chip breaker.",
    c2s:'powermatic-209hh', c2n:"The Powermatic 209HH is a premium 20-inch Shelix machine with a stronger community and support.",
    c3s:'grizzly-g0453z', c3n:"The Grizzly G0453Z is a 15-inch spiral machine for shops that don't need 20-inch width.",
    status:'Draft', notes:"THIN DATA (~4-5 voices) with feeding complaints - Draft until community sourcing and setup confirmed. Amazon B00012YK3K. Verify price before publish.",
    ptype:'Stationary', pw:'20', pt:'7', pch:'Spiral', ps:'5200', pk:'96', pd:'1/8', pf:'17 to 26 (variable)'
  }
];

/* ================= writers ================= */

function _findByHeader_(requiredHeaders, forbiddenHeaders) {
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getLastColumn() < 1) continue;
    var hdr = sheets[i].getRange(1, 1, 1, sheets[i].getLastColumn()).getValues()[0];
    var ok = true;
    for (var r = 0; r < requiredHeaders.length; r++) if (hdr.indexOf(requiredHeaders[r]) === -1) ok = false;
    if (forbiddenHeaders) for (var f = 0; f < forbiddenHeaders.length; f++) if (hdr.indexOf(forbiddenHeaders[f]) !== -1) ok = false;
    if (ok) return sheets[i];
  }
  return null;
}

function _headerIndex_(sheet) {
  var hdr = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var idx = {};
  for (var c = 0; c < hdr.length; c++) idx[hdr[c]] = c;
  return { hdr: hdr, idx: idx };
}

function writePlanerEntries() {
  var sheet = _findByHeader_(['machine_slug', 'machine_name', 'category'], null);
  if (!sheet) throw new Error('Entries tab not found (needs machine_slug + machine_name + category).');
  var meta = _headerIndex_(sheet);
  var idx = meta.idx, ncols = meta.hdr.length;

  var set = function (row, header, val) { if (idx[header] !== undefined) row[idx[header]] = val; };

  var rows = [];
  for (var p = 0; p < PLANERS.length; p++) {
    var m = PLANERS[p];
    var row = [];
    for (var c = 0; c < ncols; c++) row.push('');
    set(row, 'machine_slug', m.slug);
    set(row, 'machine_name', m.name);
    set(row, 'manufacturer', m.mfr);
    set(row, 'category', 'Planer');
    set(row, 'release_year', '');
    set(row, 'price_last_updated', TODAY);
    set(row, 'motor_hp', m.hp);
    set(row, 'voltage', m.volt);
    set(row, 'weight_lbs', m.wt);
    set(row, 'dust_port_diameter', m.dust);
    set(row, 'tier', m.tier);
    set(row, 'who_its_for', m.who);
    set(row, 'owner_praise', m.praise);
    set(row, 'owner_limitations', m.limits);
    set(row, 'upgrade_compatibility', m.upg);
    set(row, 'affiliate_link_1', m.a1l);
    set(row, 'affiliate_retailer_1', m.a1r);
    set(row, 'affiliate_price_1', m.a1p);
    set(row, 'compare_1_slug', m.c1s);
    set(row, 'compare_1_note', m.c1n);
    set(row, 'compare_2_slug', m.c2s);
    set(row, 'compare_2_note', m.c2n);
    set(row, 'compare_3_slug', m.c3s);
    set(row, 'compare_3_note', m.c3n);
    set(row, 'status', m.status);
    set(row, 'date_published', TODAY);
    set(row, 'notes', m.notes);
    set(row, 'last_updated', TODAY);
    rows.push(row);
  }

  var start = sheet.getLastRow() + 1;
  sheet.getRange(start, 1, rows.length, ncols).setValues(rows);

  // Alignment spot-check: status must land in its column for the first new row.
  var statusCol = idx['status'];
  var check = sheet.getRange(start, statusCol + 1).getValue();
  SpreadsheetApp.getActiveSpreadsheet().toast('Wrote ' + rows.length + ' planer entries. First status cell = "' + check + '".', 'MachFolio', 6);
}

function writePlanerCategorySpecs() {
  var sheet = _findByHeader_(['machine_slug', 'saw_class'], ['machine_name']);
  if (!sheet) throw new Error('category_specs tab not found (needs saw_class + machine_slug, no machine_name).');
  var meta = _headerIndex_(sheet);
  var idx = meta.idx, ncols = meta.hdr.length;

  if (idx['planer_type'] === undefined || idx['feed_rate'] === undefined) {
    throw new Error('Planer columns missing on category_specs. Run addPlanerColumns() (add-planer-columns.gs) first.');
  }

  var set = function (row, header, val) { if (idx[header] !== undefined) row[idx[header]] = val; };

  var rows = [];
  for (var p = 0; p < PLANERS.length; p++) {
    var m = PLANERS[p];
    var row = [];
    for (var c = 0; c < ncols; c++) row.push('');
    set(row, 'machine_slug', m.slug);
    set(row, 'planer_type', m.ptype);
    set(row, 'max_stock_width', m.pw);
    set(row, 'max_stock_thickness', m.pt);
    set(row, 'planer_cutterhead_type', m.pch);
    set(row, 'planer_cutterhead_speed', m.ps);
    set(row, 'planer_knife_count', m.pk);
    set(row, 'max_depth_per_pass', m.pd);
    set(row, 'feed_rate', m.pf);
    rows.push(row);
  }

  var start = sheet.getLastRow() + 1;
  sheet.getRange(start, 1, rows.length, ncols).setValues(rows);
  SpreadsheetApp.getActiveSpreadsheet().toast('Wrote ' + rows.length + ' planer category_specs rows.', 'MachFolio', 6);
}
