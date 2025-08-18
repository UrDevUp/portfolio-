"use client";
import CardSwap, { Card } from "./CardSwap";
import { useTranslation } from "react-i18next";

import React from "react";

import TextType from "./TextType";
export default function Hero() {
  const { t } = useTranslation();

  return (
    <div
      id="hero"
      className="dark:bg-black bg-white min-h-dvh flex flex-col-reverse md:flex-row items-center justify-center gap-32 md:gap-0 px-4 py-8 md:py-0"
    >
      <div className="w-full md:w-1/2 md:pl-20">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 dark:text-white text-black text-center md:text-left">
          Creative
          <span className="block sm:inline sm:ml-3 bg-gradient-to-r from-[#D5C05C] to-[#47412B] bg-clip-text text-transparent">
            LuxyDev
          </span>
        </h1>

        <div className="text-base sm:text-lg md:text-xl dark:text-white/80 text-black/80 mb-8 sm:mb-12 leading-relaxed text-center md:text-left">
          {t("heroDescriptionBase")}
          <TextType
            text={t("heroTypeWords", { returnObjects: true })}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            textColors={["#D5C05C"]}
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
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 dark:border-white border-black dark:text-white text-black rounded-full dark:hover:bg-white/10 hover:bg-black/10 transition-all font-medium text-sm sm:text-base"
          >
            {t("getInTouch")}
          </button>
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
              willchange="transform"
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            ></video>
          </Card>

          <Card>
            <video
              src="/Hotel.mp4"
              autoPlay
              willchange="transform"
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            ></video>
          </Card>

          <Card>
            <video
              src="/Immediate.mp4"
              autoPlay
              willchange="transform"
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            ></video>
          </Card>
          <Card>
            <video
              src="/Pallet.mp4"
              autoPlay
              willchange="transform"
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            ></video>
          </Card>
          <Card>
            <video
              src="/Elyse.mp4"
              autoPlay
              willchange="transform"
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            ></video>
          </Card>
        </CardSwap>
      </div>
    </div>
  );
}
