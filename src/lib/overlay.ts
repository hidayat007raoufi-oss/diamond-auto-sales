/**
 * Tiny global signal so full-screen overlays (mobile menu, modals, gallery
 * lightbox) can tell the floating UI (sticky CTA bar, AI button) to hide.
 */
export function pushOverlay() {
  if (typeof window !== "undefined")
    window.dispatchEvent(new CustomEvent("diamond:overlay", { detail: 1 }));
}
export function popOverlay() {
  if (typeof window !== "undefined")
    window.dispatchEvent(new CustomEvent("diamond:overlay", { detail: -1 }));
}
