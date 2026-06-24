# Intro startup sound (optional)

The cinematic intro (`src/components/site/IntroOverlay.tsx`) is **sound-ready**
but **muted by default**.

To enable a subtle engine/startup cue:

1. Drop an audio file here named **`startup.mp3`** (keep it short — ~1–2s — and
   lightweight, e.g. < 80 KB).
2. That's it. A speaker toggle appears in the intro; visitors opt in to sound.
   Playback is gated behind that toggle (browsers block autoplay with sound),
   and a missing file is a safe no-op.

Recommended: a short, low-volume luxury "ignition"/whoosh. Avoid anything loud
or long — it should feel premium, not gimmicky.
