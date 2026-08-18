/* ===========================================================
   NYC Protect — Start Here Wizard
   -----------------------------------------------------------
   A 4-question flow: show one question ("step") at a time,
   validate that it's been answered, then move to the next.
   At the end, we save the answers to localStorage (same trick
   as the Checklist) and build a short, personalized summary.

   Because it's saved to localStorage, a returning visitor who
   already answered these questions can skip straight to their
   results instead of re-answering — handled at the bottom of
   this file.
   =========================================================== */

const WIZARD_STORAGE_KEY = "nycprotect_wizard_v1";
const TOTAL_STEPS = 4;
let currentStep = 1;

function getStepElement(stepNumber) {
  return document.querySelector(`.wizard-step[data-step="${stepNumber}"]`);
}

function showStep(stepNumber) {
  for (let i = 1; i <= TOTAL_STEPS; i++) {
    const stepEl = getStepElement(i);
    if (stepEl) {
      stepEl.hidden = i !== stepNumber;
    }
  }

  currentStep = stepNumber;

  const progressLabel = document.getElementById("wizard-progress-text");
  const progressFill = document.getElementById("wizard-progress-fill");
  if (progressLabel) {
    progressLabel.textContent = `Question ${stepNumber} of ${TOTAL_STEPS}`;
  }
  if (progressFill) {
    progressFill.style.width = Math.round((stepNumber / TOTAL_STEPS) * 100) + "%";
  }

  const backButton = document.getElementById("wizard-back");
  const nextButton = document.getElementById("wizard-next");
  if (backButton) {
    backButton.style.visibility = stepNumber === 1 ? "hidden" : "visible";
  }
  if (nextButton) {
    nextButton.textContent = stepNumber === TOTAL_STEPS ? "See My Results" : "Next";
  }

  const message = document.getElementById("wizard-validation-message");
  if (message) {
    message.textContent = "";
  }
}

function validateStep(stepNumber) {
  // Step 4 (ZIP code) is optional, so it always passes.
  if (stepNumber === 4) {
    return true;
  }
  const stepEl = getStepElement(stepNumber);
  if (!stepEl) {
    return true;
  }
  const checkedInput = stepEl.querySelector('input[type="radio"]:checked');
  return Boolean(checkedInput);
}

function collectAnswers() {
  const residentInput = document.querySelector('input[name="resident"]:checked');
  const applicationTypeInput = document.querySelector('input[name="applicationType"]:checked');
  const licenseTypeInput = document.querySelector('input[name="licenseType"]:checked');
  const zipInput = document.getElementById("wizard-zip");

  return {
    resident: residentInput ? residentInput.value : null,
    applicationType: applicationTypeInput ? applicationTypeInput.value : null,
    licenseType: licenseTypeInput ? licenseTypeInput.value : null,
    zip: zipInput && zipInput.value.trim() ? zipInput.value.trim() : null
  };
}

function handleNextClick() {
  if (!validateStep(currentStep)) {
    const message = document.getElementById("wizard-validation-message");
    if (message) {
      message.textContent = "Please select an option to continue.";
    }
    return;
  }

  if (currentStep < TOTAL_STEPS) {
    showStep(currentStep + 1);
  } else {
    finishWizard();
  }
}

function handleBackClick() {
  if (currentStep > 1) {
    showStep(currentStep - 1);
  }
}

function finishWizard() {
  const answers = collectAnswers();
  localStorage.setItem(WIZARD_STORAGE_KEY, JSON.stringify(answers));
  showResults(answers);
}

/* ---- Building the personalized results screen ---- */

function describeResidency(answers) {
  if (answers.resident === "no") {
    return "NYC Protect focuses specifically on New York City's licensing process. Since you're outside the city, some steps may work differently for you — confirm the specifics with the NYPD or your county clerk before relying on anything here.";
  }
  return "Good — this whole site is built around New York City's process, so everything below applies directly to you.";
}

function describeLicenseType(answers) {
  switch (answers.licenseType) {
    case "premises":
      return "You're looking at a <strong>Premises License</strong>. The full Roadmap applies to you from Step 1 through Step 8.";
    case "carry":
      return "You're looking at a <strong>Carry License</strong>. Pay extra attention to Step 2 of the Roadmap, and remember: the Document Checklist has a \"Letter of Necessity\" item that only applies to carry applicants like you.";
    case "rifle-shotgun":
      return "You're looking at a <strong>Rifle/Shotgun Permit</strong>. This follows a related but separate NYPD process — most Roadmap steps still apply, but always confirm the specifics for this permit type directly with the NYPD.";
    default:
      return "You're not sure which license type fits yet — that's completely fine. The Legal &amp; Safety Concepts page explains the differences in plain English before you have to decide.";
  }
}

function describeApplicationType(answers) {
  if (answers.applicationType === "renewal") {
    return "Since you're renewing, remember: NYC licenses are renewed directly through the NYPD, not through the New York State recertification portal (that system is for permits issued outside NYC).";
  }
  return "Since this is your first time, start from Step 1 of the Roadmap: confirming your eligibility.";
}

function describeZip(answers) {
  if (answers.zip) {
    return `We've noted ZIP code <strong>${answers.zip}</strong>, saved only on this device. Once the ZIP Code Resource Finder tool is built, we'll use it to point you to the right local NYPD office.`;
  }
  return "You didn't enter a ZIP code, which is completely fine — you can always use the ZIP Code Resource Finder tool later on.";
}

function showResults(answers) {
  const wizardCard = document.getElementById("wizard-card");
  const resultsCard = document.getElementById("wizard-results");
  if (!resultsCard) {
    return;
  }

  resultsCard.innerHTML = `
    <h2>Your Personalized Starting Point</h2>
    <p>${describeResidency(answers)}</p>
    <p>${describeLicenseType(answers)}</p>
    <p>${describeApplicationType(answers)}</p>
    <p>${describeZip(answers)}</p>
    <div class="hero__actions" style="justify-content:flex-start;">
      <a href="roadmap.html" class="btn btn-primary">View the Roadmap</a>
      <a href="checklist.html" class="btn btn-secondary">Open the Document Checklist</a>
    </div>
    <p><button id="wizard-restart" class="btn btn-secondary" type="button" style="margin-top: var(--space-4);">Retake the Questionnaire</button></p>
  `;

  if (wizardCard) {
    wizardCard.hidden = true;
  }
  resultsCard.hidden = false;

  const restartButton = document.getElementById("wizard-restart");
  if (restartButton) {
    restartButton.addEventListener("click", restartWizard);
  }
}

function restartWizard() {
  const wizardCard = document.getElementById("wizard-card");
  const resultsCard = document.getElementById("wizard-results");
  if (wizardCard) {
    wizardCard.hidden = false;
  }
  if (resultsCard) {
    resultsCard.hidden = true;
  }
  // Clear any previously selected radio buttons so the form
  // starts fresh.
  document.querySelectorAll('.wizard-step input[type="radio"]').forEach((input) => {
    input.checked = false;
  });
  const zipInput = document.getElementById("wizard-zip");
  if (zipInput) {
    zipInput.value = "";
  }
  showStep(1);
}

/* ---- Startup ---- */

document.addEventListener("DOMContentLoaded", () => {
  const nextButton = document.getElementById("wizard-next");
  const backButton = document.getElementById("wizard-back");
  if (nextButton) {
    nextButton.addEventListener("click", handleNextClick);
  }
  if (backButton) {
    backButton.addEventListener("click", handleBackClick);
  }

  // Returning visitor who already answered these questions before?
  // Skip straight to their results instead of making them redo it.
  const savedAnswers = localStorage.getItem(WIZARD_STORAGE_KEY);
  if (savedAnswers) {
    try {
      showResults(JSON.parse(savedAnswers));
      return;
    } catch (error) {
      // If the saved data is ever corrupted, just fall through
      // and show the normal wizard instead.
    }
  }

  showStep(1);
});
