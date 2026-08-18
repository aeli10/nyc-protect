/* ===========================================================
   NYC Protect — Official Resources Page Renderer
   -----------------------------------------------------------
   This script takes the OFFICIAL_SOURCES array (defined in
   data/sources.js) and builds the visible list on the Resources
   page from it — grouped by category, each with a link, a short
   note, and its last-verified date.

   This page must load data/sources.js FIRST (as a separate
   <script> tag), so that the OFFICIAL_SOURCES variable already
   exists by the time this file runs.
   =========================================================== */

function formatDate(isoDateString) {
  // Turns "2026-08-17" into "August 17, 2026" for a friendlier read.
  const options = { year: "numeric", month: "long", day: "numeric" };
  // Adding a time avoids a timezone edge case shifting the date by a day.
  return new Date(isoDateString + "T00:00:00").toLocaleDateString("en-US", options);
}

function renderResourceItem(source) {
  return `
    <li class="resource-item">
      <a href="${source.url}" target="_blank" rel="noopener" class="resource-item__title">${source.title}</a>
      <p class="resource-item__note">${source.note}</p>
      <p class="resource-item__meta text-muted">Last verified: ${formatDate(source.lastVerified)}</p>
    </li>
  `;
}

function renderResourceList() {
  const container = document.getElementById("resource-list");
  if (!container || typeof OFFICIAL_SOURCES === "undefined") {
    return;
  }

  // Build an ordered list of unique categories, in the order they
  // first appear in the data — no need to hard-code the category
  // names anywhere.
  const categories = [];
  OFFICIAL_SOURCES.forEach((source) => {
    if (!categories.includes(source.category)) {
      categories.push(source.category);
    }
  });

  const html = categories.map((category) => {
    const itemsInCategory = OFFICIAL_SOURCES.filter((s) => s.category === category);
    const itemsHtml = itemsInCategory.map(renderResourceItem).join("");
    return `
      <div class="resource-group">
        <h2>${category}</h2>
        <ul class="resource-items">${itemsHtml}</ul>
      </div>
    `;
  }).join("");

  container.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", renderResourceList);
