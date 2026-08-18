/* ===========================================================
   NYC Protect — ZIP Resource Data
   -----------------------------------------------------------
   Firearms licensing itself is CENTRALIZED — every NYC handgun
   and rifle/shotgun applicant goes through the same NYPD License
   Division, regardless of borough. So instead of guessing at a
   fake "your local licensing office" (which would be inaccurate
   and potentially misleading), this tool does something honest
   and still useful: identify your borough from your ZIP code,
   always show the one real centralized License Division contact,
   and point to the NYPD's own official precinct finder for
   anything precinct-specific.

   BOROUGH_ZIP_RANGES uses well-known, stable USPS ZIP code
   ranges for each borough — this is general geographic public
   knowledge, not a legal claim, so it doesn't need the same kind
   of official citation the licensing content does. If a ZIP
   isn't recognized, the tool says so honestly instead of
   guessing.
   =========================================================== */

const BOROUGH_ZIP_RANGES = [
  { borough: "Manhattan", ranges: [[10001, 10282]] },
  { borough: "Bronx", ranges: [[10451, 10475]] },
  { borough: "Staten Island", ranges: [[10301, 10314]] },
  { borough: "Brooklyn", ranges: [[11201, 11256]] },
  { borough: "Queens", ranges: [[11004, 11005], [11101, 11109], [11351, 11386], [11411, 11436], [11691, 11697]] }
];

const LICENSE_DIVISION_CONTACT = {
  address: "NYPD License Division, One Police Plaza, Room 110A, New York, NY 10038",
  hours: "Monday–Friday, 8:30 AM – 3:30 PM",
  handgunPhone: "(646) 610-5560",
  rifleShotgunPhone: "(718) 520-9300",
  portalUrl: "https://licensing.nypdonline.org/new-app-instruction/",
  overviewUrl: "https://www.nyc.gov/site/nypd/services/law-enforcement/permits-licenses-firearms.page",
  lastVerified: "2026-08-18"
};

const PRECINCT_FINDER_URL = "https://www.nyc.gov/site/nypd/bureaus/patrol/find-your-precinct.page";

function findBoroughForZip(zip) {
  const zipNumber = parseInt(zip, 10);
  if (isNaN(zipNumber)) {
    return null;
  }
  for (const entry of BOROUGH_ZIP_RANGES) {
    for (const [start, end] of entry.ranges) {
      if (zipNumber >= start && zipNumber <= end) {
        return entry.borough;
      }
    }
  }
  return null;
}
