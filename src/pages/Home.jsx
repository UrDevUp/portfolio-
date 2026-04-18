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
import DeferRender from "@/components/ui/DeferRender";
const LogosClients = lazy(() => import("@/pages/LogosClients"));
const Branding = lazy(() => import("@/pages/Branding"));
const Projets = lazy(() => import("@/pages/Projets"));
const Contact = lazy(() => import("@/pages/Contact"));
const Meet = lazy(() => import("./Meet"));

export default function Home() {
  useLenis();
  const { themeName } = useTheme();

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
      <DeferRender placeholder={<div className="min-h-[260px]" />}>
        <div id="container__horizontal">
          <HorizontalSection />
        </div>
      </DeferRender>

      <DeferRender placeholder={<div className="min-h-[220px]" />}>
        <Suspense fallback={<Loading />}>
          <LogosClients />
        </Suspense>
      </DeferRender>

      <DeferRender placeholder={<div className="min-h-[320px]" />}>
        <Suspense fallback={<Loading />}>
          <Branding />
        </Suspense>
      </DeferRender>

      <DeferRender placeholder={<div className="min-h-[320px]" />}>
        <Suspense fallback={<Loading />}>
          <Projets />
        </Suspense>
      </DeferRender>

      <DeferRender placeholder={<div className="min-h-[220px]" />}>
        <Suspense fallback={<div className="min-h-[220px]" />}>
          <Meet />
        </Suspense>
      </DeferRender>

      <DeferRender placeholder={<div className="min-h-[260px]" />}>
        <Suspense fallback={<Loading />}>
          <Contact />
        </Suspense>
      </DeferRender>

      <DeferRender placeholder={<div className="min-h-[180px]" />}>
        <Footer />
      </DeferRender>
    </div>
  );
}
