import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "../lib/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

/**
 * Mounts once at the root of the app. Drives all scrolling through Lenis
 * and keeps GSAP's ScrollTrigger in sync with it, so pinned timelines and
 * scrub animations track the smoothed scroll position rather than the
 * raw (jumpy) native one.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    // Lenis already smooths the scroll itself — let gsap's ticker run at
    // native rate instead of catching up after tab-switches etc.
    gsap.ticker.lagSmoothing(0);

    // Any element with data-scroll-to="sectionId" scrolls via Lenis,
    // covering plain <a href="#id"> links anywhere in the tree too.
    const handleClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80, duration: 1.3 });
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      gsap.ticker.remove(tick);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return children;
}
