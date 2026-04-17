"use client";
import CardSwap, { Card } from "./CardSwap";
import { useIsMdUp } from "@/hooks/useIsMdUp";
import { useTranslation } from "react-i18next";

import React, {
  lazy,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useState,
  Suspense,
} from "react";

import TextType from "./TextType";
import StarBorderButton from "../components/ui/StarBorderButton";

const LightRays = lazy(() => import("@/components/animation/LightRays"));

const CARD_SWAP_VIDEOS = [
  "/Web.mp4",
  "/Hotel.mp4",
  "/Immediate.mp4",
  "/Pallet.mp4",
  "/Elyse.mp4",
];

const HeroContent = () => {
  const { t } = useTranslation();
  const isMdUp = useIsMdUp();
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [enableVisualFx, setEnableVisualFx] = useState(false);
  const videoRefs = useRef([]);
  const heroWords = t("heroTypeWords", { returnObjects: true });

  const isLowPowerDevice = useMemo(() => {
    if (typeof window === "undefined") return false;
    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    const saveData = navigator.connection?.saveData;
    const lowMemory = (navigator.deviceMemory || 8) <= 4;
    const lowCpu = (navigator.hardwareConcurrency || 8) <= 4;
    return prefersReducedMotion || saveData || lowMemory || lowCpu;
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeVideoIndex) {
        const playPromise = video.play();
        if (playPromise?.catch) {
          playPromise.catch(() => {});
        }
      } else {
        video.pause();
      }
    });
  }, [activeVideoIndex]);

  useEffect(() => {
    if (typeof window === "undefined" || isLowPowerDevice) {
      return;
    }

    let timerId;
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(() => setEnableVisualFx(true), {
        timeout: 1200,
      });
    } else {
      timerId = window.setTimeout(() => setEnableVisualFx(true), 600);
    }

    return () => {
      if (timerId) {
        window.clearTimeout(timerId);
      }
    };
  }, [isLowPowerDevice]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const preloadTimer = window.setTimeout(() => {
      videoRefs.current.forEach((video, index) => {
        if (!video || index === activeVideoIndex || video.readyState >= 1) {
          return;
        }

        video.preload = "metadata";
        video.load();
      });
    }, 2400);

    return () => window.clearTimeout(preloadTimer);
  }, []);

  const handleProjectsClick = useCallback(() => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleContactClick = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleOrderChange = useCallback((order) => {
    setActiveVideoIndex(order[0] ?? 0);
  }, []);

  return (
    <div
      id="hero"
      className="relative overflow-hidden dark:bg-[#131313] bg-white min-h-dvh flex flex-col md:flex-row items-center justify-start md:justify-center gap-2 sm:gap-8 md:gap-0 px-4 pt-36 pb-10 md:py-0"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {!isLowPowerDevice && enableVisualFx ? (
          <Suspense fallback={null}>
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffff"
              raysSpeed={1.5}
              lightSpread={0.8}
              rayLength={1.5}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0.1}
              distortion={0.05}
              className="h-full w-full opacity-100 transition-opacity duration-300 md:opacity-100"
            />
          </Suspense>
        ) : null}
      </div>
      <div className="relative z-10 w-full md:w-1/2 md:pl-20 max-w-[620px] md:max-w-none">
        <h1 className="bg-gradient-to-r from-black via-black/80 to-black/60 dark:from-white/20 dark:via-white/80 dark:to-white text-4xl sm:text-5xl md:text-6xl font-bold leading-none mb-4 sm:mb-6 text-center md:text-left bg-clip-text text-transparent">
          Creative
          <span className="font-brand block sm:inline sm:ml-3 bg-gradient-to-r from-black via-black/80 to-black/60 dark:from-white/20 dark:via-white/80 dark:to-white bg-clip-text text-transparent">
            UrDevUp
          </span>
        </h1>

        <div className="text-base sm:text-lg md:text-xl text-white/75 dark:text-white/75 mb-8 sm:mb-12 leading-relaxed text-center md:text-left">
          {t("heroDescriptionBase")}
          <TextType
            text={heroWords}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            textColors={["#ffffff"]}
            className="font-semibold"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button
            onClick={handleProjectsClick}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#151515] dark:bg-white text-white dark:text-black rounded-full hover:bg-[#131313] dark:hover:bg-white/90 transition-all transform hover:scale-105 font-medium text-sm sm:text-base"
          >
            {t("viewWork")}
          </button>
          <StarBorderButton
            onClick={handleContactClick}
            color="#ffffff"
            speed="6s"
            thickness={1}
            className="star-border-button--double star-border-button--glass w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 !text-white transition-all font-medium text-sm sm:text-base"
          >
            {t("viewCatalog")}
          </StarBorderButton>
        </div>
      </div>

      <div className="relative z-10 w-full md:w-1/2 flex justify-center items-center">
        <div className="relative">
          <CardSwap
            width={isMdUp ? 500 : 420}
            height={isMdUp ? 400 : 330}
            cardDistance={isMdUp ? 40 : 30}
            verticalDistance={isMdUp ? 50 : 36}
            delay={5000}
            pauseOnHover={false}
            onOrderChange={handleOrderChange}
          >
            {CARD_SWAP_VIDEOS.map((src, index) => (
              <Card key={`${src}-${index}`}>
                <div className="relative h-full w-full bg-black dark:bg-black">
                  <video
                    src={src}
                    ref={(node) => {
                      videoRefs.current[index] = node;
                    }}
                    autoPlay={activeVideoIndex === index}
                    preload={activeVideoIndex === index ? "metadata" : "none"}
                    muted
                    loop={activeVideoIndex === index}
                    playsInline
                    width="1280"
                    height="720"
                    className="h-full w-full object-cover opacity-100"
                  ></video>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HeroContent);
