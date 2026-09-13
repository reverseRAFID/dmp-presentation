/* ------------------------------------------------------------------
   One motion language for the whole deck.

   Slides cross-fade with a small vertical offset; the elements inside
   them rise 12px on a short stagger. Nothing bounces, nothing spins,
   and nothing delays reading by more than a fraction of a second.
   ------------------------------------------------------------------ */

export const EASE_OUT = [0.16, 1, 0.3, 1]
export const STAGGER = 0.045

export const slideMotion = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.42, ease: EASE_OUT },
}

/* Children opt in via <Reveal d={n}>; d is the stagger position. */
export function revealMotion(d = 0, distance = 12) {
  return {
    initial: { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: EASE_OUT, delay: d * STAGGER },
  }
}

export function scaleInMotion(d = 0) {
  return {
    initial: { opacity: 0, scale: 0.985 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.55, ease: EASE_OUT, delay: d * STAGGER },
  }
}
