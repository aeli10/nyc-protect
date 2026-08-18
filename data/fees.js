/* ===========================================================
   NYC Protect — Official Fee Data
   -----------------------------------------------------------
   Sourced directly from the NYPD's own online licensing portal
   (the live, operational system — not an older PDF), which is
   the most current official source we found for these figures.

   Each fee item lists which situations it applies to, via
   "licenseTypes". The Fee Calculator adds up every item whose
   licenseTypes includes the option the visitor picked.

   These are GOVERNMENT fees. NYC Protect does not collect,
   process, or receive any of this money — we only help you
   estimate it ahead of time.
   =========================================================== */

const FEE_SOURCE_URL = "https://licensing.nypdonline.org/new-app-instruction/";
const FEE_LAST_VERIFIED = "2026-08-18";

const FEE_ITEMS = [
  {
    id: "handgun-application",
    licenseTypes: ["premises", "carry", "renewal"],
    label: "Handgun License Application Fee",
    amount: 340.00,
    note: "Applies to new handgun license applications and to renewals."
  },
  {
    id: "rifle-shotgun-application",
    licenseTypes: ["rifle-shotgun"],
    label: "Rifle/Shotgun Permit Application Fee",
    amount: 140.00,
    note: "Applies to rifle/shotgun permit applications."
  },
  {
    id: "fingerprint-fee",
    licenseTypes: ["premises", "carry", "renewal", "rifle-shotgun"],
    label: "Fingerprint Fee",
    amount: 88.25,
    note: "Applies to all applicants, regardless of license type."
  }
];

const FEE_LICENSE_TYPE_LABELS = {
  "premises": "Handgun — Premises License (new application)",
  "carry": "Handgun — Carry License (new application)",
  "rifle-shotgun": "Rifle / Shotgun Permit (new application)",
  "renewal": "Handgun License Renewal"
};
