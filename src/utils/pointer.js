/**
 * Shared, mutable pointer state. It lives outside React on purpose: it is
 * updated on every pointer move and read inside the render loop, so keeping it
 * out of state avoids re-rendering anything.
 *
 *   x, y     target position in the canvas' normalised device coords (-1..1)
 *   sx, sy   smoothed position used by the shaders / head rotation
 *   active   0..1 smoothed "cursor is over the experience" factor
 */
export const pointer = {
  x: 0,
  y: 0,
  sx: 0,
  sy: 0,
  active: 0,
  target: 0,
  lastMove: -1e9,
  coarse: false,
};

/** Attach listeners; returns a cleanup function. `getRect` returns the canvas rect. */
export function attachPointer(getRect) {
  pointer.coarse = !!window.matchMedia?.("(pointer: coarse)").matches;

  const onMove = (e) => {
    const r = getRect();
    if (!r || r.width === 0) return;
    pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
    pointer.target = 1;
    pointer.lastMove = performance.now();
  };
  const onLeave = () => {
    pointer.target = 0;
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerdown", onMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeave);
  window.addEventListener("blur", onLeave);
  return () => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerdown", onMove);
    document.documentElement.removeEventListener("pointerleave", onLeave);
    window.removeEventListener("blur", onLeave);
  };
}

/** Advance the smoothed values. `t` is the elapsed time in seconds. */
export function updatePointer(t, dt) {
  const idle = performance.now() - pointer.lastMove > 3500;
  let tx = pointer.x;
  let ty = pointer.y;
  let ta = pointer.target;

  // On touch screens (or after a long idle) a ghost cursor drifts over the
  // portrait so the interaction is discoverable without a mouse.
  if (idle && pointer.coarse) {
    tx = Math.sin(t * 0.55) * 0.45 + 0.35;
    ty = Math.cos(t * 0.4) * 0.3 + 0.1;
    ta = 0.75;
  }
  const k = 1 - Math.exp(-dt * 7);
  pointer.sx += (tx - pointer.sx) * k;
  pointer.sy += (ty - pointer.sy) * k;
  pointer.active += (ta - pointer.active) * (1 - Math.exp(-dt * 5));
}
