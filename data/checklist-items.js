/* ===========================================================
   NYC Protect — Document Checklist Data
   -----------------------------------------------------------
   One array, one place to update. Sourced from the NYPD's own
   official handgun license application instructions. Grouped
   items marked "conditional: true" only apply in some
   situations (noted in each item's text) — not every applicant
   needs every item.

   Each item needs a stable, never-reused "id" — that id is what
   we use as the localStorage key for its checked/unchecked
   state, so changing an id later would make existing users'
   saved progress for that item disappear.
   =========================================================== */

const CHECKLIST_ITEMS = [

  // --- Identity & Citizenship ---
  { id: "birth-certificate", category: "Identity & Citizenship",
    label: "Birth certificate (or U.S. passport, military record, or baptismal certificate as alternate proof)" },
  { id: "citizenship-evidence", category: "Identity & Citizenship",
    label: "Naturalization papers or other citizenship evidence", conditional: true, note: "If you were born outside the U.S." },
  { id: "alien-registration", category: "Identity & Citizenship",
    label: "Alien Registration Card", conditional: true, note: "If applicable to your immigration status" },
  { id: "social-security-card", category: "Identity & Citizenship",
    label: "Original Social Security card" },

  // --- Proof of Residence ---
  { id: "residence-proof", category: "Proof of Residence",
    label: "Real estate tax bill, co-op/condo ownership shares, or a signed lease" },
  { id: "state-id", category: "Proof of Residence",
    label: "New York State driver's license or non-driver ID" },
  { id: "utility-bill", category: "Proof of Residence",
    label: "A recent utility bill", note: "May be requested as additional proof of address" },

  // --- Photos & Fees ---
  { id: "photos", category: "Photos & Fees",
    label: "Two recent color photographs, 1½ × 1½ inches, chest-up view", note: "See the Photo Tool" },
  { id: "application-fee", category: "Photos & Fees",
    label: "Application fee payment ready", note: "See the Fee Calculator for the current amount" },

  // --- If You Have a Criminal History ---
  { id: "arrest-disposition", category: "If You Have a Criminal History",
    label: "Certificate of disposition for each arrest", conditional: true },
  { id: "arrest-statement", category: "If You Have a Criminal History",
    label: "A written statement explaining the circumstances of each arrest", conditional: true },
  { id: "relief-certificate", category: "If You Have a Criminal History",
    label: "Certificate of Relief from Disabilities", conditional: true, note: "If you were convicted of or pled guilty to a felony" },

  // --- If You Have Military Service ---
  { id: "military-discharge", category: "If You Have Military Service",
    label: "Separation papers (DD-214) or other discharge documentation", conditional: true },

  // --- If Applying Through a Business ---
  { id: "business-ownership", category: "If Applying Through a Business",
    label: "Proof of business ownership (corporate filing, business certificate, or partnership agreement)", conditional: true },
  { id: "business-address", category: "If Applying Through a Business",
    label: "Proof of business address (a recent utility bill or lease)", conditional: true },

  // --- If Applying for a Carry License ---
  { id: "letter-of-necessity", category: "If Applying for a Carry License",
    label: "Completed \"Letter of Necessity\" form", conditional: true }

];
