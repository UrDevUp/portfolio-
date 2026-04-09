"use client";
import CardSwap, { Card } from "./CardSwap";
import { useIsMdUp } from "@/hooks/useIsMdUp";
import { useTranslation } from "react-i18next";

import React, { lazy, useState, Suspense } from "react";

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

export default function Hero() {
  const { t } = useTranslation();
  const isMdUp = useIsMdUp();
  const [readyVideos, setReadyVideos] = useState({});
  const heroWords = t("heroTypeWords", { returnObjects: true });

  const markReady = (index) => {
    setReadyVideos((prev) => (prev[index] ? prev : { ...prev, [index]: true }));
  };

  return (
    <div
      id="hero"
      className="relative overflow-hidden dark:bg-[#131313] bg-white min-h-dvh flex flex-col md:flex-row items-center justify-start md:justify-center gap-2 sm:gap-8 md:gap-0 px-4 pt-36 pb-10 md:py-0"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
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
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#151515] dark:bg-white text-white dark:text-black rounded-full hover:bg-[#131313] dark:hover:bg-white/90 transition-all transform hover:scale-105 font-medium text-sm sm:text-base"
          >
            {t("viewWork")}
          </button>
          <StarBorderButton
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
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
            width={isMdUp ? 500 : 360}
            height={isMdUp ? 400 : 290}
            cardDistance={isMdUp ? 40 : 26}
            verticalDistance={isMdUp ? 50 : 30}
            delay={5000}
            pauseOnHover={false}
          >
            {CARD_SWAP_VIDEOS.map((src, index) => (
              <Card key={`${src}-${index}`}>
                <div className="relative h-full w-full bg-white dark:bg-zinc-900">
                  {!readyVideos[index] ? (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/90 dark:bg-zinc-800/90">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#D5C05C]/35 border-t-[#414141]" />
                        <span className="text-xs font-medium tracking-wide text-black/60 dark:text-white/60">
                          Loading
                        </span>
                      </div>
                    </div>
                  ) : null}

                  <video
                    src={src}
                    autoPlay
                    preload={index === 0 ? "auto" : "metadata"}
                    will-change="transform"
                    muted
                    loop
                    playsInline
                    width="1280"
                    height="720"
                    className={
                      readyVideos[index]
                        ? "h-full w-full object-cover opacity-100 transition-opacity duration-300"
                        : "h-full w-full object-cover opacity-0"
                    }
                    onLoadedData={() => markReady(index)}
                    onCanPlay={() => markReady(index)}
                    onError={() => markReady(index)}
                  ></video>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </div>
  );
}
