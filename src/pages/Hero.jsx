"use client";
import CardSwap, { Card } from "./CardSwap";
import { useTranslation } from "react-i18next";

import React from "react";

import TextType from "./TextType";
import StarBorderButton from "../components/ui/StarBorderButton";
export default function Hero() {
  const { t } = useTranslation();

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
          <TextType
            text={t("heroTypeWords", { returnObjects: true })}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            textColors={["#000000"]}
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
            {t("getInTouch")}
          </StarBorderButton>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center">
        <CardSwap
          cardDistance={40}
          verticalDistance={50}
          delay={5000}
          pauseOnHover={false}
        >
          <Card>
            <video
              src="/Web.mp4"
              autoPlay
              preload="auto"
              will-change="transform"
              muted
              loop
              playsInline
              width="1280"
              height="720"
              className="w-full h-full object-cover"
            ></video>
          </Card>

          <Card>
            <video
              src="/Hotel.mp4"
              autoPlay
              preload="metadata"
              will-change="transform"
              muted
              loop
              playsInline
              width="1280"
              height="720"
              className="w-full h-full object-cover"
            ></video>
          </Card>

          <Card>
            <video
              src="/Immediate.mp4"
              autoPlay
              preload="metadata"
              will-change="transform"
              muted
              loop
              playsInline
              width="1280"
              height="720"
              className="w-full h-full object-cover"
            ></video>
          </Card>
          <Card>
            <video
              src="/Pallet.mp4"
              autoPlay
              preload="metadata"
              will-change="transform"
              muted
              loop
              playsInline
              width="1280"
              height="720"
              className="w-full h-full object-cover"
            ></video>
          </Card>
          <Card>
            <video
              src="/Elyse.mp4"
              autoPlay
              preload="metadata"
              will-change="transform"
              muted
              loop
              playsInline
              width="1280"
              height="720"
              className="w-full h-full object-cover"
            ></video>
          </Card>
        </CardSwap>
      </div>
    </div>
  );
}
