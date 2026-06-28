/**
 * Bridge between GSAP ScrollTrigger (DOM) and the R3F canvas (its own render
 * loop). ScrollTrigger writes `progress` (0→1) as the hero is scrubbed; a
 * useFrame inside the canvas reads it and lerps the car's rotation toward it.
 * A plain module singleton crosses the React/R3F reconciler boundary that
 * context cannot.
 */
export const heroScroll = { progress: 0 };
