/* ===========================================================
   NYC Protect — Photo Tool Logic
   -----------------------------------------------------------
   Everything here happens INSIDE the visitor's browser using the
   HTML5 <canvas> element — a drawable surface controlled entirely
   by JavaScript. The photo never leaves their device: it's never
   uploaded to a server, because there's no server call anywhere
   in this file at all.

   Flow: pick/take a photo → it's drawn onto a square canvas,
   scaled to fully cover the square → the visitor can drag to
   reposition and use a slider to zoom → "Download Photo" saves
   exactly what's inside the square.
   =========================================================== */

const canvas = document.getElementById("photo-canvas");
const ctx = canvas ? canvas.getContext("2d") : null;

const img = new Image();
let imageLoaded = false;
let baseScale = 1;  // the zoom level needed for the photo to fully cover the square
let zoom = 1;       // additional zoom the visitor controls with the slider
let offsetX = 0;
let offsetY = 0;

let dragging = false;
let dragStartX = 0;
let dragStartY = 0;
let dragStartOffsetX = 0;
let dragStartOffsetY = 0;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function redrawCanvas() {
  if (!ctx || !imageLoaded) {
    return;
  }

  const scale = baseScale * zoom;

  // Don't let the photo be dragged so far that empty space shows.
  const scaledWidth = img.width * scale;
  const scaledHeight = img.height * scale;
  const maxOffsetX = Math.max(0, (scaledWidth - canvas.width) / 2);
  const maxOffsetY = Math.max(0, (scaledHeight - canvas.height) / 2);
  offsetX = clamp(offsetX, -maxOffsetX, maxOffsetX);
  offsetY = clamp(offsetY, -maxOffsetY, maxOffsetY);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2 + offsetX, canvas.height / 2 + offsetY);
  ctx.scale(scale, scale);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);
  ctx.restore();
}

function handleFileChosen(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = (readerEvent) => {
    img.src = readerEvent.target.result;
  };
  reader.readAsDataURL(file);
}

img.onload = () => {
  imageLoaded = true;
  // "Cover" scaling: make the shorter dimension exactly fill the
  // square, so there's never an empty gap.
  baseScale = Math.max(canvas.width / img.width, canvas.height / img.height);
  zoom = 1;
  offsetX = 0;
  offsetY = 0;

  const zoomSlider = document.getElementById("zoom-slider");
  if (zoomSlider) {
    zoomSlider.value = 1;
  }

  document.getElementById("photo-editor").hidden = false;
  document.getElementById("photo-empty-state").hidden = true;
  redrawCanvas();
};

function handleZoomChange(event) {
  zoom = parseFloat(event.target.value);
  redrawCanvas();
}

/* ---- Dragging to reposition, using Pointer Events ----
   Pointer Events cover mouse, touch, and stylus with one set of
   event names, instead of writing separate mouse and touch
   handlers. */

function handlePointerDown(event) {
  if (!imageLoaded) {
    return;
  }
  dragging = true;
  dragStartX = event.clientX;
  dragStartY = event.clientY;
  dragStartOffsetX = offsetX;
  dragStartOffsetY = offsetY;
  canvas.setPointerCapture(event.pointerId);
}

function handlePointerMove(event) {
  if (!dragging) {
    return;
  }
  // Convert on-screen pixels to canvas pixels, in case the canvas
  // is displayed smaller than its actual resolution.
  const displayScale = canvas.width / canvas.getBoundingClientRect().width;
  offsetX = dragStartOffsetX + (event.clientX - dragStartX) * displayScale;
  offsetY = dragStartOffsetY + (event.clientY - dragStartY) * displayScale;
  redrawCanvas();
}

function handlePointerUp(event) {
  dragging = false;
  if (canvas.hasPointerCapture && canvas.hasPointerCapture(event.pointerId)) {
    canvas.releasePointerCapture(event.pointerId);
  }
}

function handleDownloadClick() {
  if (!imageLoaded) {
    return;
  }
  const link = document.createElement("a");
  link.download = "nyc-protect-photo.jpg";
  link.href = canvas.toDataURL("image/jpeg", 0.92);
  link.click();
}

document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("photo-input");
  const zoomSlider = document.getElementById("zoom-slider");
  const downloadButton = document.getElementById("download-photo");

  if (fileInput) {
    fileInput.addEventListener("change", handleFileChosen);
  }
  if (zoomSlider) {
    zoomSlider.addEventListener("input", handleZoomChange);
  }
  if (downloadButton) {
    downloadButton.addEventListener("click", handleDownloadClick);
  }
  if (canvas) {
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerUp);
  }
});
