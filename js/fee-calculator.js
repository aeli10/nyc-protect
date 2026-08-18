/* ===========================================================
   NYC Protect — Fee Calculator Logic
   -----------------------------------------------------------
   Picks the fee items from data/fees.js that apply to whichever
   license type the visitor selects, then adds them up. Nothing
   here is submitted anywhere — it's just arithmetic, run
   entirely in the visitor's own browser.
   =========================================================== */

function formatCurrency(amount) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function renderFeeResults(licenseType) {
  const resultsBox = document.getElementById("fee-results");
  if (!resultsBox || typeof FEE_ITEMS === "undefined") {
    return;
  }

  if (!licenseType) {
    resultsBox.innerHTML = `<p class="text-muted">Choose a license type above to see an estimated fee breakdown.</p>`;
    return;
  }

  const applicableItems = FEE_ITEMS.filter((item) => item.licenseTypes.includes(licenseType));
  const total = applicableItems.reduce((sum, item) => sum + item.amount, 0);

  const itemsHtml = applicableItems.map((item) => `
    <div class="fee-item">
      <div>
        <div class="fee-item__label">${item.label}</div>
        <div class="text-muted">${item.note}</div>
      </div>
      <div class="fee-item__amount">${formatCurrency(item.amount)}</div>
    </div>
  `).join("");

  resultsBox.innerHTML = `
    <h2>${FEE_LICENSE_TYPE_LABELS[licenseType] || "Estimated Fees"}</h2>
    ${itemsHtml}
    <div class="fee-item fee-item--total">
      <div class="fee-item__label">Estimated Total</div>
      <div class="fee-item__amount">${formatCurrency(total)}</div>
    </div>
    <p class="text-muted">Official source: <a href="${FEE_SOURCE_URL}" target="_blank" rel="noopener">NYPD Online Licensing Portal</a> · Last verified: ${FEE_LAST_VERIFIED}</p>
  `;
}

function handleLicenseTypeChange(event) {
  renderFeeResults(event.target.value);
}

document.addEventListener("DOMContentLoaded", () => {
  const radios = document.querySelectorAll('input[name="fee-license-type"]');
  radios.forEach((radio) => {
    radio.addEventListener("change", handleLicenseTypeChange);
  });
  renderFeeResults(null); // Show the initial "choose a type" prompt.
});
