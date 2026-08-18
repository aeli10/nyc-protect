/* ===========================================================
   NYC Protect — Document Checklist Logic
   -----------------------------------------------------------
   This is the site's first genuinely interactive tool, and it
   introduces a new idea: localStorage.

   localStorage is a small storage locker built into every
   browser. Anything we save there stays on the visitor's own
   device — it is NOT sent to us, NOT sent to any server, and
   survives even if they close the tab and come back tomorrow.
   That's exactly what requirement #17 from our original plan
   asked for.

   localStorage can only store TEXT. So to save a list of which
   checkboxes are checked, we:
     1. Keep the checked item ids in a normal JavaScript array
     2. Convert that array to a text string with JSON.stringify()
     3. Save that string with localStorage.setItem()
   And to load it back later, we do the reverse with
   JSON.parse().
   =========================================================== */

const STORAGE_KEY = "nycprotect_checklist_v1";

/* ---- Reading and writing localStorage ---- */

function loadCheckedIds() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return []; // Nothing saved yet — nothing is checked.
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    // If the saved data is ever corrupted for some reason, fail
    // safely instead of breaking the whole page.
    return [];
  }
}

function saveCheckedIds(checkedIds) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedIds));
}

/* ---- Rendering ---- */

function renderChecklist() {
  const container = document.getElementById("checklist-container");
  if (!container || typeof CHECKLIST_ITEMS === "undefined") {
    return;
  }

  const checkedIds = loadCheckedIds();

  const categories = [];
  CHECKLIST_ITEMS.forEach((item) => {
    if (!categories.includes(item.category)) {
      categories.push(item.category);
    }
  });

  const html = categories.map((category) => {
    const itemsInCategory = CHECKLIST_ITEMS.filter((i) => i.category === category);
    const itemsHtml = itemsInCategory.map((item) => {
      const isChecked = checkedIds.includes(item.id);
      const noteHtml = item.note ? `<br><span class="text-muted">${item.note}</span>` : "";
      const conditionalTag = item.conditional
        ? `<span class="checklist-item__tag">If applicable</span> `
        : "";
      return `
        <label class="checklist-item">
          <input type="checkbox" data-item-id="${item.id}" ${isChecked ? "checked" : ""}>
          <span>${conditionalTag}${item.label}${noteHtml}</span>
        </label>
      `;
    }).join("");

    return `
      <div class="checklist-group">
        <h2>${category}</h2>
        ${itemsHtml}
      </div>
    `;
  }).join("");

  container.innerHTML = html;

  // Now that the checkboxes exist in the page, listen for clicks
  // on each one and save the new state immediately.
  container.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckboxChange);
  });

  updateProgress();
}

function handleCheckboxChange(event) {
  const itemId = event.target.getAttribute("data-item-id");
  let checkedIds = loadCheckedIds();

  if (event.target.checked) {
    if (!checkedIds.includes(itemId)) {
      checkedIds.push(itemId);
    }
  } else {
    checkedIds = checkedIds.filter((id) => id !== itemId);
  }

  saveCheckedIds(checkedIds);
  updateProgress();
}

function updateProgress() {
  const totalCount = CHECKLIST_ITEMS.length;
  const checkedCount = loadCheckedIds().length;
  const percent = totalCount === 0 ? 0 : Math.round((checkedCount / totalCount) * 100);

  const fill = document.getElementById("progress-fill");
  const label = document.getElementById("progress-label");

  if (fill) {
    fill.style.width = percent + "%";
  }
  if (label) {
    label.textContent = `${checkedCount} of ${totalCount} items checked`;
  }
}

function handleResetClick() {
  const confirmed = window.confirm("Clear every checked item? This can't be undone.");
  if (!confirmed) {
    return;
  }
  localStorage.removeItem(STORAGE_KEY);
  renderChecklist();
}

/* ---- Light personalization from the Start Here wizard ----
   The wizard (js/wizard.js) saves its answers under the key
   "nycprotect_wizard_v1". Since localStorage is shared across
   every page on the same site — not just reloads of one page —
   this page can read those same answers and use them to show a
   relevant note. We never HIDE any checklist item this way,
   only highlight one that's likely to matter. */
function showWizardPersonalizationNote() {
  const noteBox = document.getElementById("wizard-personalization-note");
  if (!noteBox) {
    return;
  }

  const savedAnswers = localStorage.getItem("nycprotect_wizard_v1");
  if (!savedAnswers) {
    return; // They haven't done the Start Here questionnaire — say nothing.
  }

  let answers;
  try {
    answers = JSON.parse(savedAnswers);
  } catch (error) {
    return;
  }

  if (answers.licenseType === "carry") {
    noteBox.innerHTML = `<p>Based on your <a href="start-here.html">Start Here</a> answers, you're applying for a <strong>Carry License</strong> — pay extra attention to the "If Applying for a Carry License" section below.</p>`;
    noteBox.hidden = false;
  } else if (answers.licenseType === "rifle-shotgun") {
    noteBox.innerHTML = `<p>Based on your <a href="start-here.html">Start Here</a> answers, you're applying for a <strong>Rifle/Shotgun Permit</strong> — this list is written primarily for handgun licenses, so double-check requirements for this permit type directly with the NYPD.</p>`;
    noteBox.hidden = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderChecklist();
  showWizardPersonalizationNote();
  const resetButton = document.getElementById("reset-checklist");
  if (resetButton) {
    resetButton.addEventListener("click", handleResetClick);
  }
});
