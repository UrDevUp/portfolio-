"use client";
import { useEffect } from "react";

export default function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    const saveData = navigator.connection?.saveData;
    const lowCpu = (navigator.hardwareConcurrency || 8) <= 4;

    if (window.innerWidth < 1024 || prefersReducedMotion || saveData || lowCpu) {
      return undefined;
    }

    let lenis = null;
    let cancelled = false;
    let rafId = null;

    function raf(time) {
      if (!lenis) return;
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    const initLenis = async () => {
      const { default: Lenis } = await import("@studio-freight/lenis");
      if (cancelled) {
        return;
      }

      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
      });

      rafId = requestAnimationFrame(raf);
    };

    void initLenis();

    const handleVisibility = () => {
      if (document.hidden && rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      } else if (!document.hidden && !rafId) {
        rafId = requestAnimationFrame(raf);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelled = true;
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      document.removeEventListener("visibilitychange", handleVisibility);
      lenis?.destroy();
    };
  }, []);
}
