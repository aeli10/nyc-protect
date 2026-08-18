/* ===========================================================
   NYC Protect — Centralized Source Data
   -----------------------------------------------------------
   This is the ONE place every official government link and its
   "last verified" date live. The Official Resources page reads
   this file and builds its own display from it — and going
   forward, any other page that cites one of these sources should
   pull the URL from here too, instead of re-typing it.

   Why a .js file instead of a .json file? A .json file would
   need to be loaded with fetch(), and fetch() of local files is
   blocked by the browser when previewing a page by double-
   clicking it (no web server) — the same reason we used a plain
   JS variable for the header/footer back in Step 3. A .js file
   with the data stored as a JavaScript array works everywhere,
   with no server required.

   To update a source later: change it here once. Every page that
   reads from this file updates automatically the next time it
   loads.
   =========================================================== */

const OFFICIAL_SOURCES = [

  // --- NYPD: NYC Firearms Licensing ---
  {
    category: "NYPD — NYC Firearms Licensing",
    title: "NYPD License Division — Firearms Licensing",
    url: "https://www.nyc.gov/site/nypd/services/law-enforcement/permits-licenses-firearms.page",
    note: "The main official overview of NYC handgun licenses and rifle/shotgun permits.",
    lastVerified: "2026-08-17"
  },
  {
    category: "NYPD — NYC Firearms Licensing",
    title: "NYPD Online Licensing Portal",
    url: "https://licensing.nypdonline.org/new-app-instruction/",
    note: "Where applications are actually filed. Paper applications have not been accepted since 2018.",
    lastVerified: "2026-08-17"
  },
  {
    category: "NYPD — NYC Firearms Licensing",
    title: "NYC311 — Gun Permit",
    url: "https://portal.311.nyc.gov/article/?kanumber=KA-01683",
    note: "A plain-language government summary of the gun permit process, useful as a quick cross-check.",
    lastVerified: "2026-08-17"
  },

  // --- New York State ---
  {
    category: "New York State",
    title: "NYS Police — Pistol Permit Recertification",
    url: "https://firearms.troopers.ny.gov/pprecert/",
    note: "The state system used outside NYC — NYC residents renew through the NYPD instead, not here.",
    lastVerified: "2026-08-17"
  },
  {
    category: "New York State",
    title: "NY.gov Gun Safety — Resources for Gun Owners",
    url: "https://gunsafety.ny.gov/resources-gun-owners",
    note: "State-level safety and storage resources.",
    lastVerified: "2026-08-17"
  },
  {
    category: "New York State",
    title: "NY.gov Gun Safety — Concealed Carry Law FAQ",
    url: "https://gunsafety.ny.gov/frequently-asked-questions-new-concealed-carry-law",
    note: "Official FAQ on the Concealed Carry Improvement Act (CCIA), including sensitive locations.",
    lastVerified: "2026-08-17"
  },

  // --- Official Statutes (the actual legal text) ---
  {
    category: "Official Statutes",
    title: "New York Penal Law § 400.00",
    url: "https://www.nysenate.gov/legislation/laws/PEN/400.00",
    note: "The statute governing firearms license eligibility, including the \"good moral character\" requirement.",
    lastVerified: "2026-08-17"
  },
  {
    category: "Official Statutes",
    title: "New York Penal Law § 265.45",
    url: "https://www.nysenate.gov/legislation/laws/PEN/265.45",
    note: "The statute governing safe storage of firearms.",
    lastVerified: "2026-08-17"
  }

];
