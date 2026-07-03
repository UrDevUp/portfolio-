"use client";

import { useEffect } from "react";
import Header from "@/pages/Header";
import Hero from "@/pages/Hero";

import Footer from "@/pages/Footer";
import useLenis from "@/hooks/useLenis";
import HorizontalSection from "./HorizontalSection";
import "../styles/homestyle.css";
import { lazy, Suspense } from "react";
import Loading from "@/layouts/Loading";
import { useTheme } from "@/theme";
const Branding = lazy(() => import("@/pages/Branding"));
const Projets = lazy(() => import("@/pages/Projets"));
const Contact = lazy(() => import("@/pages/Contact"));
const Meet = lazy(() => import("./Meet"));

export default function Home() {
  useLenis();
  const { themeName } = useTheme();

  useEffect(() => {
    if (typeof window === "undefined" || window.location.hash !== "#projects") {
      return;
    }

    const scrollToProjects = () => {
      const projectsSection = document.getElementById("projects");
      if (!projectsSection) return;

      const offsetPosition =
        projectsSection.getBoundingClientRect().top + window.pageYOffset + 50;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    };

    const timeoutId = window.setTimeout(scrollToProjects, 100);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    let idleId;
    let timeoutId;
    let cleanupTween = () => {};
    let isCancelled = false;

    const initHorizontalScroll = async () => {
      if (window.innerWidth < 768 || isCancelled) {
        return;
      }

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (isCancelled) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const contents = gsap.utils.toArray("#horizontal .content ");
      const horizontal = document.getElementById("horizontal");

      if (!horizontal || contents.length === 0) {
        return;
      }

      horizontal.style.width = `${100 * contents.length}vw`;
      const tween = gsap.to(contents, {
        xPercent: -100 * (contents.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: "#horizontal",
          pin: true,
          scrub: 0.3,
          snap: 1 / (contents.length - 1),
          start: "top top",
          end: () => `+=${window.innerWidth * contents.length}`,
        },
      });

      cleanupTween = () => {
        tween?.scrollTrigger?.kill();
        tween?.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(
        () => {
          void initHorizontalScroll();
        },
        {
          timeout: 1200,
        },
      );
    } else {
      timeoutId = window.setTimeout(() => {
        void initHorizontalScroll();
      }, 150);
    }

    return () => {
      isCancelled = true;
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      cleanupTween();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#111213] text-white overflow-x-hidden">
      <Header />
      <Hero />
      <div id="container__horizontal">
        <HorizontalSection />
      </div>

      <section id="branding" className="w-full">
        <Suspense fallback={<Loading />}>
          <Branding />
        </Suspense>
      </section>

      <section id="projects" className="w-full">
        <Suspense fallback={<Loading />}>
          <Projets />
        </Suspense>
      </section>

      {/* <Suspense fallback={<div className="min-h-[220px]" />}>
        <Meet />
      </Suspense> */}

      <Suspense fallback={<Loading />}>
        <Contact />
      </Suspense>

      <Footer />
    </div>
  );
}
