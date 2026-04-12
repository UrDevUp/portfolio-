"use client";

import { useEffect } from "react";
import Header from "@/pages/Header";
import Hero from "@/pages/Hero";

import Footer from "@/pages/Footer";
import useLenis from "@/hooks/useLenis";
import HorizontalSection from "./HorizontalSection";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/homestyle.css";
import { lazy, Suspense } from "react";
import Loading from "@/layouts/Loading";
import { useTheme } from "@/theme";
import Meet from "./Meet";
const LogosClients = lazy(() => import("@/pages/LogosClients"));
const Branding = lazy(() => import("@/pages/Branding"));
const Projets = lazy(() => import("@/pages/Projets"));
const Contact = lazy(() => import("@/pages/Contact"));

export default function Home() {
  useLenis();
  const { themeName } = useTheme();

  useEffect(() => {
    const initHorizontalScroll = () => {
      gsap.registerPlugin(ScrollTrigger);

      // Only run horizontal scroll logic on md and up
      if (window.innerWidth >= 768) {
        const contents = gsap.utils.toArray("#horizontal .content ");
        const horizontal = document.getElementById("horizontal");
        if (horizontal && contents.length > 0) {
          horizontal.style.width = `${100 * contents.length}vw`;
          gsap.to(contents, {
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
        }
      }
    };

    let idleId;
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(initHorizontalScroll, {
        timeout: 1200,
      });
    } else {
      window.setTimeout(initHorizontalScroll, 0);
    }

    return () => {
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      <Header />
      <Hero />
      <div id="container__horizontal">
        <HorizontalSection />
      </div>
      <Suspense fallback={<Loading />}>
        <LogosClients />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <Branding />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <Projets />
      </Suspense>
      <Meet />
      <Suspense fallback={<Loading />}>
        <Contact />
      </Suspense>
      <Footer />
    </div>
  );
}
