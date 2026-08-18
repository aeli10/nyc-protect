/* ===========================================================
   NYC Protect — ZIP Resource Finder Logic
   -----------------------------------------------------------
   Looks up the visitor's borough from their ZIP code (using
   findBoroughForZip() from data/zip-resources.js) and always
   shows the real, centralized NYPD License Division contact —
   because that's the actual correct answer for every borough.
   =========================================================== */

function renderResourceResults(zip) {
  const resultsBox = document.getElementById("finder-results");
  if (!resultsBox) {
    return;
  }

  if (!zip) {
    resultsBox.innerHTML = "";
    resultsBox.hidden = true;
    return;
  }

  const borough = findBoroughForZip(zip);
  const boroughLine = borough
    ? `<p>ZIP code <strong>${zip}</strong> is in <strong>${borough}</strong>.</p>`
    : `<p>We didn't recognize <strong>${zip}</strong> as an NYC ZIP code. Double-check it, or use the official precinct finder below.</p>`;

  resultsBox.innerHTML = `
    <div class="card stack">
      ${boroughLine}
      <div>
        <h2>NYPD License Division</h2>
        <p class="text-muted">Firearms licensing is handled centrally for all of NYC — this is the correct office regardless of your borough.</p>
        <p>${LICENSE_DIVISION_CONTACT.address}</p>
        <p>${LICENSE_DIVISION_CONTACT.hours}</p>
        <p>Handgun Section: ${LICENSE_DIVISION_CONTACT.handgunPhone}<br>Rifle/Shotgun Section: ${LICENSE_DIVISION_CONTACT.rifleShotgunPhone}</p>
        <p><a href="${LICENSE_DIVISION_CONTACT.overviewUrl}" target="_blank" rel="noopener">NYPD License Division — official page</a></p>
        <p class="text-muted">Last verified: ${LICENSE_DIVISION_CONTACT.lastVerified}</p>
      </div>
      <div>
        <h2>Your Local Precinct</h2>
        <p>For anything precinct-specific (not licensing), use the NYPD's own official lookup tool:</p>
        <p><a href="${PRECINCT_FINDER_URL}" target="_blank" rel="noopener">Find Your Precinct and Sector — official NYPD tool →</a></p>
      </div>
    </div>
  `;
  resultsBox.hidden = false;
}

function handleFinderSubmit(event) {
  event.preventDefault();
  const zipInput = document.getElementById("finder-zip");
  if (zipInput) {
    renderResourceResults(zipInput.value.trim());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("finder-form");
  if (form) {
    form.addEventListener("submit", handleFinderSubmit);
  }
});
