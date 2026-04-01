"use client";
import CardSwap, { Card } from "./CardSwap";
import { useIsMdUp } from "@/hooks/useIsMdUp";
import { useTranslation } from "react-i18next";

import React, { useState } from "react";

import TextType from "./TextType";
import StarBorderButton from "../components/ui/StarBorderButton";

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
  const heroHighlights = Array.isArray(heroWords)
    ? heroWords.map((word) => word.trim()).join(" · ")
    : heroWords;

  const markReady = (index) => {
    setReadyVideos((prev) => (prev[index] ? prev : { ...prev, [index]: true }));
  };

  return (
    <div
      id="hero"
      className="dark:bg-black bg-white min-h-dvh flex flex-col-reverse md:flex-row items-center justify-center gap-32 md:gap-0 px-4 py-8 md:py-0"
    >
      <div className="w-full md:w-1/2 md:pl-20">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r dark:from-white dark:via-[#000000] dark:to-[#000000] from-black  bg-clip-text text-transparent text-center md:text-left">
          Creative
          <span className="block sm:inline sm:ml-3 bg-gradient-to-r from-[#000000] to-[#000000] bg-clip-text text-transparent">
            UrDevUp
          </span>
        </h1>

        <div className="text-base sm:text-lg md:text-xl text-black/70 mb-8 sm:mb-12 leading-relaxed text-center md:text-left">
          {t("heroDescriptionBase")}
          {isMdUp ? (
            <TextType
              text={heroWords}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              textColors={["#000000"]}
              className="font-semibold"
            />
          ) : (
            <span className="block font-semibold text-black dark:text-white mt-1">
              {heroHighlights}
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-black/90 dark:hover:bg-white/90 transition-all transform hover:scale-105 font-medium text-sm sm:text-base"
          >
            {t("viewWork")}
          </button>
          <StarBorderButton
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            color="#d4af37"
            speed="6s"
            thickness={1}
            className="star-border-button--double w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 !text-black dark:!text-black transition-all font-medium text-sm sm:text-base"
          >
            {t("viewCatalog")}
          </StarBorderButton>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center">
        {isMdUp ? (
          <CardSwap
            cardDistance={40}
            verticalDistance={50}
            delay={5000}
            pauseOnHover={false}
          >
            {CARD_SWAP_VIDEOS.map((src, index) => (
              <Card key={`${src}-${index}`}>
                <div className="relative h-full w-full bg-white dark:bg-zinc-900">
                  {!readyVideos[index] ? (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/92 dark:bg-zinc-800/90">
                      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#D5C05C]/35 border-t-[#D5C05C]" />
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
        ) : (
          <div className="relative w-full max-w-[360px] overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-zinc-900">
            <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-transparent to-black/20" />
            <img
              src="/assets/images/beauty.webp"
              alt="UrDevUp preview"
              className="h-full w-full object-cover aspect-[4/5]"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="text-sm uppercase tracking-[0.22em] text-white/70">
                Mobile preview
              </p>
              <p className="mt-2 text-xl font-semibold">
                Fast, lightweight, and responsive.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
