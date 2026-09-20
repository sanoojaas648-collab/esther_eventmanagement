// Lightweight bridge so components can request a smooth scroll without
// each one needing to know whether Lenis is currently mounted.
let activeLenis = null;

export function setLenis(instance) {
  activeLenis = instance;
}

export function getLenis() {
  return activeLenis;
}

/**
 * Scroll to an element (or id) using Lenis if it's running, falling back
 * to native smooth scrolling otherwise.
 */
export function scrollToTarget(target, { offset = -80, duration = 1.3 } = {}) {
  const el = typeof target === "string" ? document.getElementById(target) : target;
  if (!el) return;

  if (activeLenis) {
    activeLenis.scrollTo(el, { offset, duration, easing: (t) => 1 - Math.pow(1 - t, 3) });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
