/**
 * MachFolio — populate 20 miter saws into the Entries tab and category_specs tab.
 *
 * PREREQUISITE: run addMiterColumns() (from add-miter-columns.gs) FIRST so the
 * 7 miter columns exist on category_specs.
 *
 * Run order from Extensions > Apps Script:
 *   1. writeMiterEntries()        -> appends 20 rows to the Entries tab
 *   2. writeMiterCategorySpecs()  -> appends 20 matching rows to category_specs
 *
 * Both write by HEADER NAME, so values land in the right columns regardless of
 * extra columns (e.g. last_updated). Both append after the last row and do NOT
 * overwrite existing rows. Run each once.
 */

var TODAY = '2026-07-16';

var MITERS = [
  // ===== Weekend Warrior =====
  {
    slug:'metabo-hpt-c10fcgs', name:'Metabo HPT C10FCGS 10-Inch Compound Miter Saw', mfr:'Metabo HPT', tier:'Weekend Warrior',
    hp:'', volt:'120V', wt:'24.2', dust:'',
    who:"This is a first miter saw for trim, framing, and general DIY on a tight budget, and owners like that it tends to arrive square. It's a non-sliding 10-inch compound, so it crosscuts narrow stock cleanly but can't cross a wide board. Anyone who needs to cut wider boards or wants dual-bevel convenience should look at a slider.",
    praise:"Owners repeatedly say it arrives square, with one checking the fence against a machinist's square and finding it dead-on at 90 degrees out of the box | At 24 pounds it's light enough to carry one-handed and move on and off a truck | The 15-amp motor has enough power for hardwood and dimensional lumber at this price | The electric brake and thumb-actuated stops are quick and convenient",
    limits:"The detents snap in with confidence but owners report a tiny bit of play at the stops, so it's worth checking with a square before critical cuts | It doesn't slide, so crosscut width is limited to around 5 inches and it can't cross a wide board | There's no laser or cutline on this version, and the dust bag catches very little | The stock 24-tooth blade is coarse, and owners swap it for finer crosscut work",
    upg:"It takes any standard 10-inch, 5/8-inch arbor blade, so a Diablo or Freud finish blade is the usual first upgrade. It fits universal miter-saw stands, and a shop vac on the port improves the weak dust collection. There's no factory laser.",
    a1l:'https://www.amazon.com/dp/B07PX44JQM', a1r:'Amazon', a1p:129,
    c1s:'wen-mm1011', c1n:"The WEN MM1011 is a sliding 10-inch that gets a 12-inch crosscut for a similar price, though its fence needs squaring.",
    c2s:'craftsman-cmxemar120', c2n:"The Craftsman CMXEMAR120 is a folding 10-inch compound at a similar price, easier to store but with reliability complaints.",
    c3s:'ryobi-tss103', c3n:"The Ryobi TSS103 is a 10-inch slider with an LED cutline and a real 12-inch crosscut for a bit more.",
    status:'Live', notes:"Amazon B07PX44JQM. Crosscut width and vertical capacity not published by Metabo; left blank. Verify price before publish.",
    mtype:'Compound', mblade:'10', mcross:'', mbevel:'Single, 0-45 left', mmiter:'52 left / 52 right', mvert:'', mstops:'9 (0, 15, 22.5, 31.6, 45 left and right)'
  },
  {
    slug:'wen-mm1011', name:'WEN MM1011 10-Inch Compact Sliding Compound Miter Saw', mfr:'WEN', tier:'Weekend Warrior',
    hp:'', volt:'120V', wt:'34.2', dust:'',
    who:"The MM1011 gets you a real 12-inch crosscut in a small, cheap package, which owners like for tight garages and shops. It's a single-bevel compact slider with a laser and a couple of table extensions in the box. You'll want to square the fence on setup, and crown folks should note the detents land on 30 degrees rather than the 31.6 spring angle.",
    praise:"Owners report accurate cuts once it's set up, and the onboard laser helps line up the blade | The compact slider gets a 12-inch crosscut in a small footprint, which suits tight shops | The 15-amp motor cuts hardwood and dense lumber without bogging for the price | It comes with two table extensions, a clamp, a laser, and a dust bag, so owners feel it's a lot of kit for around 120 dollars",
    limits:"The fence isn't dead-on from the factory, and the manual itself walks you through loosening the bolts to square it, and the laser needs aligning too | The detents are the 30-degree type rather than 31.6, so crown spring-angle cuts don't land on a true stop | Dust collection is weak and the bag catches little | It only bevels left, so you flip the workpiece for opposing bevels, and some owners see slider play on wider cuts",
    upg:"It takes standard 10-inch, 5/8-inch arbor blades, and a better blade is the common upgrade. WEN sells a matching folding stand and a replacement fence, and a shop vac improves capture over the bag. The laser is built in.",
    a1l:'https://www.amazon.com/dp/B07ZGH64YC', a1r:'Amazon', a1p:119,
    c1s:'ryobi-tss103', c1n:"The Ryobi TSS103 is a similar 10-inch slider with an LED shadow line instead of a laser, at a slightly higher price.",
    c2s:'metabo-hpt-c10fcgs', c2n:"The Metabo HPT C10FCGS is a non-sliding 10-inch compound, cheaper and known to arrive square but limited to narrow crosscuts.",
    c3s:'dewalt-dws715', c3n:"The DeWalt DWS715 steps up to a more powerful, more accurate 12-inch compound, though it doesn't slide.",
    status:'Live', notes:"Amazon B07ZGH64YC. Detents are the 30-degree type, not 31.6. Verify price before publish.",
    mtype:'Sliding Compound', mblade:'10', mcross:'12', mbevel:'Single, 0-45 left', mmiter:'45 left / 45 right', mvert:'6.75', mstops:'9 (0, 15, 22.5, 30, 45)'
  },
  {
    slug:'ryobi-tss103', name:'Ryobi TSS103 10-Inch Sliding Compound Miter Saw', mfr:'Ryobi', tier:'Weekend Warrior',
    hp:'', volt:'120V', wt:'37', dust:'1.25',
    who:"The TSS103 is the most-documented saw in this price range, a 10-inch slider with an LED shadow line that owners often prefer to a laser. It gets a genuine 12-inch crosscut for under 150 dollars. The cast fence and slider have real accuracy limits, so it's a solid DIY and light-trim saw rather than a fine-woodworking tool.",
    praise:"Owners like the LED shadow-line cutline, which needs no adjustment and works with any blade, better than a laser | The sliding head gives a real 12-inch crosscut on a sub-150-dollar saw | The 15-amp motor and electric brake are smooth and stop quickly | The tool-free detent override lets owners dial in in-between angles fast",
    limits:"Owners report the one-piece cast fence isn't straight all the way across, with one measuring a gap behind the work, and it can't be fully corrected | With the head extended, owners find the blade can shift as much as a quarter inch side to side, which shows up on wide cuts | A long-term owner says after a couple of years it struggles to make a straight cut on narrow pieces | The dust bag collects poorly, though the 1-1/4-inch port takes a shop vac well",
    upg:"It takes standard 10-inch, 5/8-inch arbor blades. It sells as a bundle with Ryobi's universal QuickStand or fits universal stands, and the 1-1/4-inch port hooks to a shop vac, which is the best dust setup of the budget saws. Owners often add an auxiliary fence to fix the fence squareness.",
    a1l:'', a1r:'', a1p:'',
    c1s:'wen-mm1011', c1n:"The WEN MM1011 is a comparable 10-inch compact slider with a laser at a slightly lower price.",
    c2s:'metabo-hpt-c10fcgs', c2n:"The Metabo HPT C10FCGS is a cheaper non-sliding compound that owners say arrives square, if you don't need the slide.",
    c3s:'ryobi-tss120l', c3n:"The Ryobi TSS120L is the 12-inch slider step up, with more capacity for more money.",
    status:'Live', notes:"Home Depot exclusive; no Amazon ASIN, operator to add HD link. Verify price before publish.",
    mtype:'Sliding Compound', mblade:'10', mcross:'12', mbevel:'Single, 0-45 left', mmiter:'47 left / 47 right', mvert:'', mstops:'9 (0, 15, 22.5, 31.6, 45)'
  },
  {
    slug:'craftsman-cmxemar120', name:'Craftsman CMXEMAR120 10-Inch Folding Compound Miter Saw', mfr:'Craftsman', tier:'Weekend Warrior',
    hp:'', volt:'120V', wt:'', dust:'',
    who:"This Craftsman folds its head and integrates a compact base, so owners like it for storing and moving between jobs. It's a single-bevel 10-inch compound with an adjustable laser, aimed at framing and molding. Reliability is the knock, so it's a light-duty pick rather than a saw for daily work.",
    praise:"The folding head and integrated base make it easy to store and carry, and owners like it for going job to job at under 28 pounds | The tool-less adjustable laser helps line up cuts | The 15-amp motor with electric brake handles framing and molding stock | The wide 55-degree right miter is handy for framing angles",
    limits:"It has a detent override for between-stop angles, but owners are mixed on how well it holds a set angle and it usually needs squaring on setup | Durability is the main complaint, with one owner reporting the motor spindle broke inside a year and the replacement arriving broken | The folding compound design limits crosscut width next to the sliders here | Dust collection through the bag is minimal, and the laser needs periodic re-alignment",
    upg:"It takes standard 10-inch, 5/8-inch arbor blades, and the folding base means no separate stand, though that also means it won't clamp onto a universal miter stand the way a flat-base saw does. A shop vac improves capture over the bag, and a finer blade helps cut quality.",
    a1l:'', a1r:'', a1p:'',
    c1s:'metabo-hpt-c10fcgs', c1n:"The Metabo HPT C10FCGS is a non-folding 10-inch compound at a similar price with a stronger reputation for arriving square.",
    c2s:'dewalt-dws715', c2n:"The DeWalt DWS715 is a more powerful, more accurate 12-inch compound for a step up in price.",
    c3s:'wen-mm1011', c3n:"The WEN MM1011 is a 10-inch slider that adds a 12-inch crosscut for around the same money.",
    status:'Live', notes:"Substitute for the nonexistent CMXEMAE0100. Lowe's/Ace, no Amazon ASIN, operator to add link. Price sits at the $150 boundary; verify before publish.",
    mtype:'Compound', mblade:'10', mcross:'', mbevel:'Single, 0-47 left', mmiter:'47 left / 55 right', mvert:'', mstops:'Miter 0, 15, 22.5, 31.6, 45 left and 55 right'
  },

  // ===== Hobbyist =====
  {
    slug:'dewalt-dws715', name:'DeWalt DWS715 12-Inch Compound Miter Saw', mfr:'DeWalt', tier:'Hobbyist',
    hp:'', volt:'120V', wt:'36', dust:'1.5',
    who:"The DWS715 is a 12-inch single-bevel compound that owners rate highly for power and out-of-box accuracy, and it's a common step up from a 10-inch saw. It chops wide dimensional lumber with ease. It doesn't slide, so crosscut width tops out around a 2x8, and the stock blade is worth replacing.",
    praise:"A hands-on test scored it top marks for precision, arriving square and drifting only about a tenth of a degree over a full test | Owners say it cuts 4x4s and even aluminum stock effortlessly, among the most powerful in its class | Dust capture is good for a miter saw when a vac is on the port | The XPS shadow-line worklight is an easy, well-liked bolt-on upgrade",
    limits:"Some owners get slightly arced or out-of-square crosscuts even after checking with a square, usually traced to the stock blade or arbor runout | The factory blade is widely called junk, and swapping it is the recurring fix for accuracy | The miter detents are solid but there are no positive bevel stops between 0 and 45, so odd bevel angles are set by hand | It's non-sliding, so crosscut is limited to about a 2x8, and there's no factory cutline indicator",
    upg:"It takes any 12-inch blade in 5/8 or 1-inch arbor, and a Freud or Diablo finish blade is the usual first move. DeWalt's DWS7085 LED, DW7187 laser, or DWS7058 XPS shadow-line all fit it, and the DWX723 and DWX725B stands work. A shop vac on the 1.5-inch port helps dust.",
    a1l:'https://www.amazon.com/dp/B07P8QTFRC', a1r:'Amazon', a1p:279,
    c1s:'metabo-hpt-c12fdhs', c1n:"The Metabo HPT C12FDHS is a dual-bevel 12-inch compound at a similar price, adding right-side bevels and a 5-year warranty.",
    c2s:'ridgid-r4123', c2n:"The Ridgid R4123 is a dual-bevel 12-inch compound with an LED cutline and a lifetime service plan for a bit more.",
    c3s:'dewalt-dws779', c3n:"The DeWalt DWS779 is the sliding version, adding wide-board crosscut capacity for more money.",
    status:'Live', notes:"Amazon B07P8QTFRC. Top edge of the Hobbyist band. Verify price before publish.",
    mtype:'Compound', mblade:'12', mcross:'8', mbevel:'Single, 0-48 left', mmiter:'50 left / 50 right', mvert:'5.5', mstops:'14 (0, 10, 15, 22.5, 31.6, 35.3, 45, 50)'
  },
  {
    slug:'metabo-hpt-c12fdhs', name:'Metabo HPT C12FDHS 12-Inch Dual-Bevel Compound Miter Saw', mfr:'Metabo HPT', tier:'Hobbyist',
    hp:'', volt:'120V', wt:'47.4', dust:'',
    who:"This Metabo HPT is a 12-inch dual-bevel compound with a well-liked micro-bevel adjustment, and it carries a 5-year pro warranty at a sub-300-dollar price. Owners report it cutting flooring and trim accurately for years. It's non-sliding and heavy, and the standard detents have some slop, so setup and a blade upgrade matter.",
    praise:"Owners report years of flawless use and say it cuts accurately right out of the box for flooring and trim | An owner making picture frames found the mitered corners dead-on, square both ways out of the box | The compact non-sliding footprint and smooth swing suit a miter station | The micro-bevel knob is well liked for dialing in and holding a precise bevel",
    limits:"Owners repeatedly report play in the standard detents, so it indexes but has a little slop and exactness-minded users watch the scale | Some units need the bevel and miter pointers re-squared out of the box, reaching a few thousandths only after loosening the lock bolts | One owner measured about a thirty-second of movement in the miter stops | Dust collection through the small bag is only average, and it's heavy and awkward at 47 pounds",
    upg:"It takes standard 12-inch, 1-inch arbor blades, and owners swap the 32-tooth blade for a higher-tooth trim blade. It fits any miter stand, the dust bag is replaceable or you can run a shop vac, and the laser is user-calibratable. The common first move is re-squaring the fence and using the micro-bevel.",
    a1l:'https://www.amazon.com/dp/B07RBC86ZD', a1r:'Amazon', a1p:279,
    c1s:'dewalt-dws715', c1n:"The DeWalt DWS715 is a single-bevel 12-inch compound at a similar price with strong out-of-box accuracy.",
    c2s:'ridgid-r4123', c2n:"The Ridgid R4123 is another dual-bevel 12-inch compound, adding an LED shadow line and a lifetime service plan.",
    c3s:'metabo-hpt-c12rsh2s', c3n:"The Metabo HPT C12RSH2S is the sliding dual-bevel step up, adding wide-crosscut capacity for more.",
    status:'Live', notes:"Amazon B07RBC86ZD. Verify price before publish.",
    mtype:'Compound', mblade:'12', mcross:'8', mbevel:'Dual, 0-48 left and right', mmiter:'52 left / 52 right', mvert:'5.125', mstops:'Miter 0, 15, 22.5, 31.6, 45'
  },
  {
    slug:'ryobi-tss120l', name:'Ryobi TSS120L 12-Inch Sliding Compound Miter Saw', mfr:'Ryobi', tier:'Hobbyist',
    hp:'', volt:'120V', wt:'', dust:'1.5',
    who:"The TSS120L is the cheapest 12-inch slider that owners don't write off, and reviewers report it cutting accurately out of the box with plenty of power. The tall fence handles most crown nested. It's single-bevel with some rail and fence limits, and the stock blade is loud, so it rewards a blade upgrade.",
    praise:"A reviewer said it cut with outstanding accuracy out of the box and stayed accurate through the test, and an owner checked it dead-on both ways with a combo square | The tall aluminum fence lets you cut most crown nested with clean sightlines to the blade | The 15-amp motor plowed through cedar and pressure-treated 2x4s, with an electric brake that stops fast | It's the cheapest 12-inch slider in its class that owners consider worth buying",
    limits:"An owner cutting a 1x12 found the miter about a sixteenth out of square and reported a little wobble and slop in the rails | The plastic miter pointer is wide, so it's hard to set angles under a degree precisely | The single-cast fence angles back toward center on some units, throwing end cuts off a few degrees, and it can't be fully dialed out | It's single-bevel, the laser drifts when the head is pulled down, and the dust bag leaks",
    upg:"It takes standard 12-inch, 1-inch arbor blades, and owners say a quality blade basically makes it a new saw. The 1-1/2-inch port hooks to a shop vac, and it fits universal stands or its saw-and-stand bundle. It's mechanically single-bevel, so there's no dual-bevel conversion.",
    a1l:'https://www.amazon.com/dp/B01JD7B1Z8', a1r:'Amazon', a1p:269,
    c1s:'ryobi-tss103', c1n:"The Ryobi TSS103 is the smaller 10-inch slider, cheaper if you don't need 12-inch capacity.",
    c2s:'dewalt-dws779', c2n:"The DeWalt DWS779 is a dual-bevel 12-inch slider that's more accurate and better built for a step up in price.",
    c3s:'ridgid-r4123', c3n:"The Ridgid R4123 is a non-sliding dual-bevel 12-inch at a similar price, with a lifetime service plan.",
    status:'Live', notes:"Marked discontinued at Ryobi but stocked at Home Depot (~$269). Amazon B01JD7B1Z8. Verify availability and price before publish.",
    mtype:'Sliding Compound', mblade:'12', mcross:'13.5', mbevel:'Single, 0-45 left', mmiter:'45 left / 45 right', mvert:'5.5', mstops:'9 (0, 15, 22.5, 31.6, 45)'
  },
  {
    slug:'ridgid-r4123', name:'Ridgid R4123 12-Inch Dual-Bevel Compound Miter Saw', mfr:'Ridgid', tier:'Hobbyist',
    hp:'', volt:'120V', wt:'43', dust:'2.5',
    who:"The R4123 is a 12-inch dual-bevel compound with an internally powered LED shadow line and Ridgid's lifetime service agreement, which owners cite as a reason to buy. It chops thick stock smoothly and comes in at a hobbyist price. It doesn't arrive dialed in, and there's no blade brake, so plan on setup time.",
    praise:"Owners call it a great saw for the money and a solid alternative to the pricier 12-inch DeWalts | It cuts a rough 2x8 with a breeze, with smooth clean cuts through thick stock | Owners prefer the internally powered LED shadow line to a laser, since it needs no calibration and works with any blade | The lifetime service agreement, with free parts and service after registration, is a common reason owners pick it",
    limits:"One owner's miter detent-lock screw broke with hardly any force out of the box, compromising the positive stop, and the bypass instructions are vague | It doesn't arrive dialed in, so owners re-square the blade to the base and fence before trusting it | Owners report some blade wobble on spin-up, harmonic vibration, and cuts running a hundredth or two wide | There's no electric blade brake, so the blade coasts, and blade changes are awkward behind the guard",
    upg:"It takes standard 12-inch, 1-inch arbor blades, and a 60 to 80-tooth finish blade cuts tearout. It bolts to Ridgid's universal or compact stands, and the 2.5-inch port runs to a shop vac. The LED is a fixed internal unit, so there's no laser to retrofit.",
    a1l:'https://www.amazon.com/dp/B081NWBNQ2', a1r:'Amazon', a1p:299,
    c1s:'dewalt-dws715', c1n:"The DeWalt DWS715 is a single-bevel 12-inch compound at a similar price with a strong accuracy reputation.",
    c2s:'metabo-hpt-c12fdhs', c2n:"The Metabo HPT C12FDHS is a dual-bevel 12-inch compound with a well-liked micro-bevel and a 5-year warranty.",
    c3s:'ridgid-r4222', c3n:"The Ridgid R4222 is the sliding dual-bevel step up, adding wide-crosscut capacity and a 70-degree miter.",
    status:'Live', notes:"Amazon B081NWBNQ2. Current list ~$349 (sale ~$299), sits at the Hobbyist/Serious Hobbyist edge. Verify price before publish.",
    mtype:'Compound', mblade:'12', mcross:'8', mbevel:'Dual, 0-48 left and right', mmiter:'50 left / 50 right', mvert:'6.75', mstops:'9 miter (0, 15, 22.5, 31.6, 45) + 7 bevel'
  },

  // ===== Serious Hobbyist =====
  {
    slug:'dewalt-dws779', name:'DeWalt DWS779 12-Inch Dual-Bevel Sliding Compound Miter Saw', mfr:'DeWalt', tier:'Serious Hobbyist',
    hp:'', volt:'120V', wt:'56', dust:'1.25',
    who:"The DWS779 is one of the most popular 12-inch dual-bevel sliders, and owners rate it accurate out of the box at around 400 dollars. It's the value pick against DeWalt's own pricier DWS780. The main gap is dust collection and the lack of the DWS780's XPS cutline, and unit-to-unit accuracy can vary.",
    praise:"Owners say it's accurate out of the box, with the miter scale and bevel stops needing no adjustment | The miter table is flat and in line with the base, and both tall fences are square and in plane | Owners widely call it a great value against other 12-inch sliders at around 400 dollars | The cam-lock miter handle with detent override makes angle changes quick and repeatable",
    limits:"Out-of-box accuracy is generally good but varies unit to unit, and some owners must re-square the bevel and miter to hit true | The cam-lock miter has no fine micro-adjust knob, so dialing sub-degree angles between detents is fiddly | Dust collection is the weak point, since the factory boot is short and collapses under a vac, catching little | There's no built-in cutline guide like the pricier DWS780, and it's a bit heavy at 56 pounds for frequent moves",
    upg:"It takes 12-inch, 1-inch arbor blades, and a fine-crosscut blade beats the stock one. DeWalt's DWX723, DWX724, and DW7440RS stands fit it, and aftermarket dust adapters help the weak boot. Owners who want the shadow line step up to the DWS780.",
    a1l:'https://www.amazon.com/dp/B01ESCU5WS', a1r:'Amazon', a1p:399,
    c1s:'dewalt-dws780', c1n:"The DeWalt DWS780 is the pricier sibling, adding the XPS shadow-line cutline and a bit more capacity.",
    c2s:'metabo-hpt-c12rsh2s', c2n:"The Metabo HPT C12RSH2S is a compact-slide dual-bevel 12-inch at a similar price that sits closer to a wall.",
    c3s:'ridgid-r4222', c3n:"The Ridgid R4222 is a dual-bevel 12-inch slider at a similar price with a 70-degree miter and an LED cutline.",
    status:'Live', notes:"Marked discontinued by DeWalt but widely stocked. Amazon B01ESCU5WS. Verify availability and price before publish.",
    mtype:'Dual-Bevel Sliding Compound', mblade:'12', mcross:'14', mbevel:'Dual, 0-48 left and right', mmiter:'50 left / 60 right', mvert:'6.75', mstops:'10 (0, 15, 22.5, 31.6, 45, 60)'
  },
  {
    slug:'metabo-hpt-c12rsh2s', name:'Metabo HPT C12RSH2S 12-Inch Dual-Bevel Sliding Compound Miter Saw', mfr:'Metabo HPT', tier:'Serious Hobbyist',
    hp:'', volt:'120V', wt:'59', dust:'',
    who:"This Metabo HPT is a 12-inch dual-bevel slider with a compact fixed-rail design that lets it sit near a wall, which owners value for shop space. Pro Tool Reviews named it a best-for-the-money pro pick, and it carries a 5-year warranty. It arrives close to square rather than perfect, and the rear bevel lock undercuts the compact benefit a little.",
    praise:"Owners describe the detents as crisp with zero play and the table as rock solid | The compact fixed-rail slide cuts the footprint and lets the saw sit near a wall, a real shop-space win | Owners call the blade dead-on accurate, with balance and power that inspire confidence | It was named a best miter saw for the money for pros, and it backs that with a 5-year warranty",
    limits:"It arrives only respectably close to square and needs a few minutes of tuning with a straight edge to true up | It lacks the fine angular micro-adjustment of the older model, and the bevel-lock lever sits on the back, so you pull the saw off the wall for bevel cuts | The laser washes out before you finish the cut, so its practical value is limited | It's heavy at 59 pounds with a large footprint, and it only bevels 45 degrees to the left",
    upg:"It takes 12-inch, 1-inch arbor blades, an upgrade over the stock 60-tooth. It fits universal miter stands, and since only a bag is included, owners add a shop-vac adapter. The laser is tool-lessly adjustable.",
    a1l:'https://www.amazon.com/dp/B07R81WR89', a1r:'Amazon', a1p:399,
    c1s:'dewalt-dws779', c1n:"The DeWalt DWS779 is a more widely stocked dual-bevel 12-inch slider at a similar price.",
    c2s:'ridgid-r4222', c2n:"The Ridgid R4222 is a dual-bevel 12-inch slider at a similar price with a wider 70-degree miter range.",
    c3s:'makita-ls1018', c3n:"The Makita LS1018 is a lighter 10-inch dual-bevel slider with strong dust collection for a bit more.",
    status:'Live', notes:"Amazon B07R81WR89. Community right at 5 voices. Successor is C12RSH3. Verify price before publish.",
    mtype:'Dual-Bevel Sliding Compound', mblade:'12', mcross:'12.25', mbevel:'Dual, 0-45 left and right', mmiter:'45 left / 57 right', mvert:'7.5', mstops:'0, 15, 22.5, 31.6, 45 left and right'
  },
  {
    slug:'ridgid-r4222', name:'Ridgid R4222 12-Inch Dual-Bevel Sliding Compound Miter Saw', mfr:'Ridgid', tier:'Serious Hobbyist',
    hp:'', volt:'120V', wt:'64', dust:'1.5',
    who:"The R4222 is a 12-inch dual-bevel slider with an industry-leading 70-degree miter range and an LED shadow line, and owners call it a tank for framing and thick stock. Ridgid's lifetime service agreement adds value. It's very heavy, dust collection is average, and the miter-stop hardware has some reported weak points, so it leans construction over fine furniture.",
    praise:"Owners call it a tank that eats 4x4s, 2x8s, and engineered headers with the stock blade | The 70-degree miter both directions, with a large set of positive stops and a bypass, leads the class | Owners like the LED shadow-line cutline for showing the cut and lighting the work | It arrives close to square, with one owner dialing it within half a degree, and the lifetime service agreement is a draw",
    limits:"The miter-stop spring can be defective so the saw slides past the detents, and the miter lock can loosen under heavy use and need a re-tighten | It's fine for framing but tight furniture miters can frustrate, with some blade wobble reported and trouble reaching a fine cut on melamine | It's very heavy at 64 pounds, hard to load, and one owner said the weight bent the stand's wheels | Dust collection is mediocre at around 65 percent even with a shop vac",
    upg:"It takes 12-inch blades, and owners strongly recommend replacing the stock blade for fine work. It fits Ridgid's stands or universal stands, the 1-1/2-inch port runs to a shop vac, and a model-specific aftermarket dust chute is available. The LED is built in, so there's no laser to add.",
    a1l:'', a1r:'', a1p:'',
    c1s:'dewalt-dws779', c1n:"The DeWalt DWS779 is a dual-bevel 12-inch slider at a similar price that's lighter and more widely stocked.",
    c2s:'metabo-hpt-c12rsh2s', c2n:"The Metabo HPT C12RSH2S is a compact-slide dual-bevel 12-inch that sits closer to a wall.",
    c3s:'ridgid-r4123', c3n:"The Ridgid R4123 is the non-sliding dual-bevel version, cheaper if you don't need wide crosscuts.",
    status:'Live', notes:"Home Depot exclusive; no reliable Amazon ASIN, operator to add link. Verify price before publish.",
    mtype:'Dual-Bevel Sliding Compound', mblade:'12', mcross:'16', mbevel:'Dual, 0-48 left and right', mmiter:'70 left / 70 right', mvert:'4', mstops:'13 miter + 9 bevel'
  },
  {
    slug:'makita-ls1018', name:'Makita LS1018 10-Inch Dual-Bevel Sliding Compound Miter Saw', mfr:'Makita', tier:'Serious Hobbyist',
    hp:'', volt:'120V', wt:'43.7', dust:'1.25',
    who:"The LS1018 is a light, compact 10-inch dual-bevel slider that owners praise for smooth, precise action and strong dust collection. It's a good fit for a shop that wants furniture-quality cuts without a heavy 12-inch saw. The trade-offs are a modest fence height that limits tall stock and a 13-amp motor that's a touch less grunty than the 15-amp rivals.",
    praise:"Owners get dead-on, furniture-quality cuts after minor fence and bevel-stop tuning | The direct-drive motor with soft-start and electric brake gives a very smooth, precise slide-and-chop with no belts to slip | At around 44 pounds it's light and compact for a 10-inch slider, easy to move and store | Dust collection is strong, with owners capturing around 90 percent of chips on the 1-1/4-inch port",
    limits:"It isn't perfect out of the box and needs minor fence and bevel-stop tuning to reach true square | The bevel has positive stops only at 0 and 45, so intermediate bevels rely on the scale | The fence height and rear blade clearance are modest, which limits tall baseboard and large crown vertical cuts | The 13-amp motor is slightly less grunty than 15-amp rivals, and the 10-inch blade means smaller capacity than the 12-inch saws",
    upg:"It takes 10-inch, 5/8-inch arbor blades, and a fine-tooth crosscut blade is the usual upgrade. Makita's WST06 and WST07 stands fit, and the 1-1/4-inch port already collects well on a shop vac. The laser version is the LS1018L if you want a line.",
    a1l:'https://www.amazon.com/dp/B00K1AXGW8', a1r:'Amazon', a1p:429,
    c1s:'metabo-hpt-c12rsh2s', c1n:"The Metabo HPT C12RSH2S is a 12-inch dual-bevel slider with more capacity at a similar price.",
    c2s:'makita-ls1019l', c2n:"The Makita LS1019L is the newer, higher-capacity 10-inch dual-bevel slider for more money.",
    c3s:'dewalt-dws779', c3n:"The DeWalt DWS779 is a 12-inch dual-bevel slider with more crosscut capacity at a similar price.",
    status:'Live', notes:"Amazon B00K1AXGW8. Older model; successor is LS1019. Community ~5 voices. Verify price before publish.",
    mtype:'Dual-Bevel Sliding Compound', mblade:'10', mcross:'12', mbevel:'Dual, 0-45 left and right', mmiter:'47 left / 60 right', mvert:'', mstops:'Miter 0, 15, 22.5, 31.6, 45; bevel 0 and 45'
  },

  // ===== Semi-Pro =====
  {
    slug:'dewalt-dws780', name:'DeWalt DWS780 12-Inch Dual-Bevel Sliding Compound Miter Saw', mfr:'DeWalt', tier:'Semi-Pro',
    hp:'', volt:'120V', wt:'56', dust:'2.5',
    who:"The DWS780 is the benchmark 12-inch dual-bevel slider, and its XPS shadow line is the feature owners rave about since it shows the true kerf with no calibration. It's a capable production and trim saw with big capacity for its weight. The known catch is that the 45-degree detents can come up shy of a true 45, so wide casing miters need a check.",
    praise:"The XPS LED shadow line is the standout, casting the blade's true kerf with no calibration and working in sunlight | It has good capacity for a 56-pound 12-inch slider, with a generous 50 and 60-degree miter range | Calibration is easy, since you loosen the four detent-plate screws to square the miter scale | The detent override lets you glide past stops to reduce wear, and long-term owners report no deflection running a sharp 100-tooth blade",
    limits:"Squared at 0, some owners find both 45-degree detents come up a third of a degree shy, and because the detents are machined into one plate it's hard to correct, which bites on wide casing | The detent plate can slide out of pitch, so 90 is perfect while a 45 is off, and owners shim the plate to fix it | It usually needs a squareness adjustment out of the box, and the vertical bevel stop can drift, so owners check before critical cuts | There's head flex and slide slop at full extension, and the table isn't always coplanar with the base",
    upg:"It takes 12-inch, 1-inch arbor blades, with a Freud 80-tooth or Diablo a common upgrade. The DWX723 folding and DWX726 rolling stands fit, and a shop vac helps the 2.5-inch port. It uses the XPS shadow line rather than a laser, so an aftermarket laser is redundant, and owners often shim the detent plate.",
    a1l:'https://www.amazon.com/dp/B00540JS7C', a1r:'Amazon', a1p:599,
    c1s:'dewalt-dws779', c1n:"The DeWalt DWS779 is the value sibling, dropping the XPS cutline for a lower price.",
    c2s:'bosch-gcm12sd', c2n:"The Bosch GCM12SD is an axial-glide 12-inch dual-bevel that sits flush to a wall, at a similar price.",
    c3s:'makita-ls1019l', c3n:"The Makita LS1019L is a premium 10-inch dual-bevel slider with a big table for a bit more.",
    status:'Live', notes:"Amazon B00540JS7C. Known 45-degree detent shy-of-true issue noted in limitations. Verify price before publish.",
    mtype:'Dual-Bevel Sliding Compound', mblade:'12', mcross:'14', mbevel:'Dual, 0-49 left and right', mmiter:'50 left / 60 right', mvert:'6.75', mstops:'10 (0, 15, 22.5, 31.6, 45, 60)'
  },
  {
    slug:'makita-ls1019l', name:'Makita LS1019L 10-Inch Dual-Bevel Sliding Compound Miter Saw', mfr:'Makita', tier:'Semi-Pro',
    hp:'', volt:'120V', wt:'57.9', dust:'',
    who:"The LS1019L is Makita's premium 10-inch dual-bevel slider, with a two-rail design that sits flush to a wall and a big rotating table owners love. It cuts very smoothly and, once dialed in, holds accuracy across a wide crosscut. The catch is a documented slide-tracking issue on some units where the blade doesn't stay coplanar as it slides, so it's best bought where returns are easy.",
    praise:"Owners single out the large aluminum rotating table as a standout versus competitors | The two-rail slide is smooth and rigid side to side, with owners calling it much smoother than their DeWalt | Dust collection through the dual ports is good for a miter saw, if not Kapex-level | The flush-to-wall two-rail design fixes the depth problem of older Makita sliders, and it has strong power on hardwood",
    limits:"A documented slide-tracking flaw means the blade can stay square on a chop but skew across the slide stroke, a carriage issue owners can't adjust out | It varies unit to unit out of the box, with some needing the bevel or the 90-degree detent ring reset | The sliding fence has limited adjustment and can't be fully trued at the outer casting, so results are better right of the blade | Dust collection is polarizing, and the single-sided laser often needs adjustment out of the box",
    upg:"It takes 10-inch, 5/8-inch arbor blades, an upgrade over the stock 60-tooth. The WST06 and WST07 stands fit, and because the dual ports are a non-standard size, owners add aftermarket or 3D-printed 2.5-inch adapters. The laser has left-right micro-adjust.",
    a1l:'https://www.amazon.com/dp/B073K99HWJ', a1r:'Amazon', a1p:739,
    c1s:'makita-ls1018', c1n:"The Makita LS1018 is the older, lighter 10-inch dual-bevel slider at a lower price.",
    c2s:'bosch-gcm12sd', c2n:"The Bosch GCM12SD is a 12-inch axial-glide dual-bevel with more crosscut capacity at a similar price.",
    c3s:'makita-ls1219l', c3n:"The Makita LS1219L is the 12-inch version with more capacity for more money.",
    status:'Live', notes:"Amazon B073K99HWJ. Slide-tracking accuracy varies by unit. Verify price before publish.",
    mtype:'Dual-Bevel Sliding Compound', mblade:'10', mcross:'12', mbevel:'Dual, 0-48 left and right', mmiter:'60 left / 60 right', mvert:'5.25', mstops:'0, 15, 22.5, 31.6, 45, 60 left and right'
  },
  {
    slug:'milwaukee-6955-20', name:'Milwaukee 6955-20 12-Inch Dual-Bevel Sliding Compound Miter Saw', mfr:'Milwaukee', tier:'Semi-Pro',
    hp:'', volt:'120V', wt:'65', dust:'',
    who:"The Milwaukee 6955-20 is a heavy 12-inch dual-bevel slider that owners call the smoothest-cutting saw they've used, with dust collection second only to a Kapex. Its digital miter readout is meant for repeatable angles. Two catches: the digital readout has a well-documented drift bug, and it needs a Milwaukee vacuum attachment for shop-vac hookup.",
    praise:"One owner called it one of the best purchases they've made, arriving set up perfectly with no adjustment needed | A trim carpenter called it the smoothest cutting saw they've ever used | Dust collection is repeatedly called best-in-class for a miter saw, second only to the Kapex | The digital miter readout in tenths is valued for repeatability, and owners find the preset angles accurate",
    limits:"The digital readout has a drift bug, reading several different values through the day even at zero, and Milwaukee's reset didn't fix it for one owner | The angle scale can be off half a degree, so some owners set angles with an external angle finder | Fence squareness varies out of the box, with a shopper finding several in-store units not meeting the table at 90 | It has no shop-vac hookup out of the box, needing a hard-to-source attachment, and it's heavy and loud",
    upg:"It takes 12-inch, 5/8-inch arbor blades, with a full-kerf blade recommended for square cuts in hardwood. Dust collection needs Milwaukee's 48-03-0200 vacuum attachment, and it uses third-party stands. It has dual work lights and the digital miter readout built in, and an add-on laser is available.",
    a1l:'https://www.amazon.com/dp/B001BBTZY4', a1r:'Amazon', a1p:749,
    c1s:'dewalt-dws780', c1n:"The DeWalt DWS780 is a 12-inch dual-bevel slider with the XPS cutline, often a bit cheaper.",
    c2s:'bosch-gcm12sd', c2n:"The Bosch GCM12SD is an axial-glide 12-inch dual-bevel with best-in-class dust collection at a similar price.",
    c3s:'makita-ls1019l', c3n:"The Makita LS1019L is a premium 10-inch dual-bevel slider that sits flush to a wall.",
    status:'Live', notes:"Amazon B001BBTZY4. Digital readout drift bug noted. Verify price before publish.",
    mtype:'Dual-Bevel Sliding Compound', mblade:'12', mcross:'13.5', mbevel:'Dual, 0-45 left and right', mmiter:'55 left / 60 right', mvert:'6.55', mstops:'0, 15, 22.5, 31.6, 45 left and right, 60 right (digital readout)'
  },
  {
    slug:'bosch-gcm12sd', name:'Bosch GCM12SD 12-Inch Axial-Glide Dual-Bevel Sliding Miter Saw', mfr:'Bosch', tier:'Semi-Pro',
    hp:'', volt:'120V', wt:'65', dust:'',
    who:"The GCM12SD is Bosch's axial-glide 12-inch dual-bevel saw, and owners consistently praise the glide action and the fact that it sits flush to a wall with no rear rails. Its SquareLock fences hold alignment over years once set. The recurring gripe is play in the plastic miter detent lever, so furniture-tight miters need care.",
    praise:"The axial-glide arm is widely called the smoothest gliding action with no side-to-side rail slop, and the no-rear-rail design saves space | One owner's unit arrived flat over a 24-inch straightedge with the table and fence dead square | Dust collection is category-best, up to around 90 percent on a 2x with a vacuum | It has big 14-inch crosscut capacity and expanding base extensions, and the pre-aligned SquareLock fences hold precision over time",
    limits:"The plastic miter detent lever can wobble when engaged, so the table locks at slightly varying angles, measured around a thirty-second off at the end of a 12-inch board | Some units need re-squaring out of the box, and one owner had two units with table-flatness and detent issues, with 45-degree detents reading closer to 46.5 | It's heavy at 65 pounds and best bench-mounted, and the articulated arm can show blade wander next to a solid-rail saw | There's no factory laser or LED, so you rely on the lower-guard sightline",
    upg:"It takes 12-inch blades, with a Forrest Chopmaster a popular upgrade over the stock 60-tooth. Bosch's T1B folding and T4B gravity-rise stands fit, along with crown and length stops. Aftermarket dust throat plates and adapters improve collection, and owners commonly work around the plastic safety button.",
    a1l:'https://www.amazon.com/dp/B004323NNC', a1r:'Amazon', a1p:679,
    c1s:'dewalt-dws780', c1n:"The DeWalt DWS780 is a 12-inch dual-bevel slider with the XPS shadow-line cutline at a similar price.",
    c2s:'makita-ls1019l', c2n:"The Makita LS1019L is a premium 10-inch dual-bevel slider with a big rotating table.",
    c3s:'festool-kapex-ks-120-reb', c3n:"The Festool Kapex KS 120 is a far pricier premium trim saw with finer scales and better dust extraction.",
    status:'Live', notes:"Amazon B004323NNC. Moved to Semi-Pro (streets ~$679, under $800). Verify price before publish.",
    mtype:'Dual-Bevel Sliding Compound', mblade:'12', mcross:'14', mbevel:'Dual, 0-47 left and right', mmiter:'52 left / 60 right', mvert:'6.75', mstops:'Miter 0, 15, 22.5, 31.6, 45, 60 right; bevel 0, 33.9, 45, 47'
  },

  // ===== Professional =====
  {
    slug:'festool-kapex-ks-120-reb', name:'Festool Kapex KS 120 REB Sliding Compound Miter Saw', mfr:'Festool', tier:'Professional',
    hp:'', volt:'120V', wt:'47', dust:'',
    who:"The Kapex KS 120 is Festool's premium trim saw, built around precise angle scales, excellent dust extraction, and a compact 47-pound body that trim carpenters love. It's the accuracy-and-dust benchmark when it's working right. The serious caveat is a well-documented history of motor failures, so buyers weigh that against the price.",
    praise:"Owners and pros widely praise the cut quality and rigidity, with precision to a fraction of a degree | The far-from-axis miter and bevel scales let you read and set fine angles very accurately | Dust extraction is best-in-class, capturing around 90 percent with the rear hood and a 36-millimeter hose | The hold-down clamp, counter-balanced bevel control, and dual lasers are singled out by owners, and at 47 pounds it's compact for a premium saw",
    limits:"Motor reliability is the dominant complaint, with documented armature and brush failures, and out-of-warranty repair reportedly running well into the hundreds | Despite the price, some owners struggle to dial in a square cut, with one thread calling it hard to true and another owner spending hours chasing square | The price is very high for the capacity, since it's a 10-inch blade with a smaller crosscut than 12-inch competitors | Repair turnaround and parts cost come up often",
    upg:"It takes 260-millimeter fine-tooth blades. The UG Kapex stand with extension wings and crown stops is the common setup, and it integrates with Festool MFT tables and CT extractors on 27 or 36-millimeter hoses. Brushes and the armature are replaceable service parts, which owners end up needing.",
    a1l:'', a1r:'', a1p:1500,
    c1s:'bosch-gcm12sd', c1n:"The Bosch GCM12SD is a much cheaper 12-inch axial-glide dual-bevel with bigger capacity, though without the fine Festool scales.",
    c2s:'festool-ksc-60-eb', c2n:"The Festool KSC 60 is the cordless Kapex-family saw, lighter and cheaper but with a smaller 8.5-inch blade.",
    c3s:'makita-ls1219l', c3n:"The Makita LS1219L is a 12-inch dual-bevel slider with far more capacity for roughly half the price.",
    status:'Live', notes:"Festool, dealer-only MAP pricing; no Amazon link, operator to add Woodcraft/Acme dealer link. Motor-reliability history noted. Verify price before publish.",
    mtype:'Dual-Bevel Sliding Compound', mblade:'10.25', mcross:'12', mbevel:'Dual, 47 left / 46 right', mmiter:'60 left / 60 right', mvert:'4.75', mstops:'Miter 0, 15, 22.5, 30, 45 (60 right); bevel 0 and 45'
  },
  {
    slug:'festool-ksc-60-eb', name:'Festool Kapex KSC 60 EB Cordless Sliding Compound Miter Saw', mfr:'Festool', tier:'Professional',
    hp:'', volt:'36V', wt:'38', dust:'',
    who:"The KSC 60 is Festool's cordless Kapex-family saw, giving Kapex-grade cut quality and dust collection off a 36-volt battery in a light 38-pound package. Trim carpenters like the portability and the chip bag that works without an extractor. The limits are a small 8.5-inch blade, no bevel detents, and a high price for the capacity.",
    praise:"Owners get Kapex-grade cut quality cordless, with a twin-column guide that gives wobble-free, precise cuts | Dust collection is called unbeatable even off a battery, thanks to the chip bag, and the electric blade brake is praised | At around 38 pounds it's light and genuinely portable for a premium trim saw | It runs all day on dual 18-volt packs with a brushless motor, and it keeps the fine Kapex scales and lasers",
    limits:"There are no detents on the bevel adjustment, so owners setting scarf joints want at least a 22.5 stop and don't get one | It won't take stock thicker than about 3/4 inch at a 45-degree right bevel, and the 8.5-inch blade limits capacity next to 12-inch saws, which some owners call a real drawback for crown | It's loud in use, and it's very expensive for an 8.5-inch saw | Flatness and squareness vary unit to unit, as owners note across the Kapex line",
    upg:"It takes 216-millimeter fine-tooth blades. The KS 60 stand with wings and crown stops is the common setup, it works with Festool CT extractors or the onboard chip bag, and the 18-volt AIRSTREAM batteries interchange across Festool's cordless line.",
    a1l:'', a1r:'', a1p:999,
    c1s:'festool-kapex-ks-120-reb', c1n:"The Festool Kapex KS 120 is the corded 10-inch Kapex with more capacity and bevel detents for more money.",
    c2s:'makita-xsl08', c2n:"The Makita XSL08 is a cordless 12-inch dual-bevel slider with far more capacity at a similar price.",
    c3s:'makita-ls1219l', c3n:"The Makita LS1219L is a corded 12-inch dual-bevel slider with much more capacity for less.",
    status:'Live', notes:"Festool cordless, dealer-only MAP; no Amazon link, operator to add dealer link. Community Festool-forum-centric (~5). Verify price before publish.",
    mtype:'Dual-Bevel Sliding Compound', mblade:'8.5', mcross:'12', mbevel:'Dual, 47 left / 46 right', mmiter:'60 left / 60 right', mvert:'', mstops:'Miter detents at common angles; no bevel detents'
  },
  {
    slug:'makita-ls1219l', name:'Makita LS1219L 12-Inch Dual-Bevel Sliding Compound Miter Saw', mfr:'Makita', tier:'Professional',
    hp:'', volt:'120V', wt:'65', dust:'2.5',
    who:"The LS1219L is Makita's 12-inch dual-bevel slider with the largest crosscut capacity in this group, a two-rail design that sits flush to a wall, and a big 8-inch nested crown capacity trim carpenters value. Dialed in, owners get excellent accuracy over a wide cut. The recurring issues are a plastic detent plate that wears and out-of-box fence and rail squareness that isn't user-adjustable on a bad unit.",
    praise:"Once dialed in, owners report excellent accuracy even over a 15-inch crosscut and nearly 7 inches of vertical, the largest capacity in this group | The two-rail slide lets it sit flush to a wall, saving space | The big vertical capacity, at 6-3/4 inches of baseboard and 8 inches of nested crown, is valued by trim carpenters | The direct-drive motor has strong power with soft start, and it includes a laser cutline",
    limits:"The plastic detent plate wears over time, which makes it harder to hold an angle consistently | Fence and rail squareness vary out of the box, with owners measuring the blade-to-fence distance changing as the head slides and cuts reading as a slight arc, and the rails aren't user-adjustable so a bad unit stays bad | The fence isn't perfectly flat on some units, with no adjustment to fix it | Stock dust collection is mediocre, so owners add aftermarket chutes, and QC varies unit to unit",
    upg:"It takes 12-inch, 1-inch arbor blades, with a 60 to 80-tooth crosscut blade the usual upgrade. The WST05 and WST06 stands fit, and aftermarket or 3D-printed 2.5-inch dust adapters are a popular fix for the mediocre collection. The laser is built in.",
    a1l:'https://www.amazon.com/dp/B07B3WF2Y2', a1r:'Amazon', a1p:819,
    c1s:'makita-xsl08', c1n:"The Makita XSL08 is the cordless version of essentially the same 12-inch saw for a step up in price.",
    c2s:'makita-ls1019l', c2n:"The Makita LS1019L is the smaller 10-inch dual-bevel slider, lighter and cheaper.",
    c3s:'festool-kapex-ks-120-reb', c3n:"The Festool Kapex KS 120 is a premium trim saw with finer scales but less capacity, at roughly double the price.",
    status:'Live', notes:"Amazon B07B3WF2Y2. ~$800, bottom of Professional. Verify price before publish.",
    mtype:'Dual-Bevel Sliding Compound', mblade:'12', mcross:'15', mbevel:'Dual, 0-48 left and right', mmiter:'60 left / 60 right', mvert:'6.75', mstops:'Miter 0, 15, 22.5, 31.6, 45, 60 left and right; bevel 0 and 45'
  },
  {
    slug:'makita-xsl08', name:'Makita XSL08 18V X2 (36V) 12-Inch Dual-Bevel Sliding Compound Miter Saw', mfr:'Makita', tier:'Professional',
    hp:'', volt:'36V', wt:'69.1', dust:'',
    who:"The XSL08 is Makita's cordless 36-volt 12-inch dual-bevel slider, a genuine production saw with class-leading capacity and front-mounted controls owners love. It cuts a full 15-inch crosscut and stands tall base and crown. The two catches are an aluminum detent plate that wears and develops play, and real weight at around 69 pounds with batteries.",
    praise:"A reviewer reported no blade wobble and perfectly consistent cuts, with the bevel dead-on out of the box | Owners love the front-mounted bevel and miter controls, since there's no reaching behind the saw | It has class-leading capacity, cutting a 15-inch crosscut at 90 and tall base and crown, exceeding the Bosch glide | The single-action rail lets it sit flush to a wall with no lost capacity, and it runs a full day of trim on one pair of packs",
    limits:"The aluminum detent plate wears at the stops over time, so play develops especially at 0 and 45 and miters stop fitting, which drives an aftermarket stainless-plate market | Some units arrive with about an eighth-inch miter offset that needs the plate loosened and re-squared before first use | It's very heavy at around 69 pounds with batteries, which cuts into real portability | The ergonomics favor right-handers, and the guide rail can surface-rust without added lubrication",
    upg:"It takes 12-inch, 1-inch arbor blades. An aftermarket stainless detent plate directly addresses the plate wear, it pairs with Makita AWS wireless dust extraction, and it fits the WST06 folding stand. It runs on any Makita 18-volt LXT batteries, using a matched pair for 36 volts.",
    a1l:'https://www.amazon.com/dp/B07RJGM39V', a1r:'Amazon', a1p:949,
    c1s:'makita-ls1219l', c1n:"The Makita LS1219L is the corded version of essentially the same 12-inch saw at a lower price.",
    c2s:'festool-kapex-ks-120-reb', c2n:"The Festool Kapex KS 120 is a premium corded trim saw with finer scales but a smaller blade and less capacity.",
    c3s:'dewalt-dws780', c3n:"The DeWalt DWS780 is a corded 12-inch dual-bevel slider with the XPS cutline for much less.",
    status:'Live', notes:"Amazon B07RJGM39V (XSL08PT kit). Cordless 36V. Verify price before publish.",
    mtype:'Dual-Bevel Sliding Compound', mblade:'12', mcross:'15', mbevel:'Dual, 0-48 left and right', mmiter:'60 left / 60 right', mvert:'6.75', mstops:'Miter 0, 15, 22.5, 31.6, 45, 60 left and right'
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

function writeMiterEntries() {
  var sheet = _findByHeader_(['machine_slug', 'machine_name', 'category'], null);
  if (!sheet) throw new Error('Entries tab not found (needs machine_slug + machine_name + category).');
  var meta = _headerIndex_(sheet);
  var idx = meta.idx, ncols = meta.hdr.length;
  var set = function (row, header, val) { if (idx[header] !== undefined) row[idx[header]] = val; };

  var rows = [];
  for (var p = 0; p < MITERS.length; p++) {
    var m = MITERS[p];
    var row = [];
    for (var c = 0; c < ncols; c++) row.push('');
    set(row, 'machine_slug', m.slug);
    set(row, 'machine_name', m.name);
    set(row, 'manufacturer', m.mfr);
    set(row, 'category', 'Miter Saw');
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
  var statusCol = idx['status'];
  var check = sheet.getRange(start, statusCol + 1).getValue();
  SpreadsheetApp.getActiveSpreadsheet().toast('Wrote ' + rows.length + ' miter entries. First status cell = "' + check + '".', 'MachFolio', 6);
}

function writeMiterCategorySpecs() {
  var sheet = _findByHeader_(['machine_slug', 'saw_class'], ['machine_name']);
  if (!sheet) throw new Error('category_specs tab not found (needs saw_class + machine_slug, no machine_name).');
  var meta = _headerIndex_(sheet);
  var idx = meta.idx, ncols = meta.hdr.length;

  if (idx['miter_saw_type'] === undefined || idx['positive_stops'] === undefined) {
    throw new Error('Miter columns missing on category_specs. Run addMiterColumns() (add-miter-columns.gs) first.');
  }

  var set = function (row, header, val) { if (idx[header] !== undefined) row[idx[header]] = val; };
  var rows = [];
  for (var p = 0; p < MITERS.length; p++) {
    var m = MITERS[p];
    var row = [];
    for (var c = 0; c < ncols; c++) row.push('');
    set(row, 'machine_slug', m.slug);
    set(row, 'miter_saw_type', m.mtype);
    set(row, 'miter_blade_size', m.mblade);
    set(row, 'max_crosscut_capacity', m.mcross);
    set(row, 'bevel_range', m.mbevel);
    set(row, 'miter_range', m.mmiter);
    set(row, 'max_vertical_capacity', m.mvert);
    set(row, 'positive_stops', m.mstops);
    rows.push(row);
  }

  var start = sheet.getLastRow() + 1;
  sheet.getRange(start, 1, rows.length, ncols).setValues(rows);
  SpreadsheetApp.getActiveSpreadsheet().toast('Wrote ' + rows.length + ' miter category_specs rows.', 'MachFolio', 6);
}
