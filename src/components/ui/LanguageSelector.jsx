"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FR, GB, US } from "country-flag-icons/react/3x2";

const flagMap = { FR, GB, US };

const languages = [
  { code: "fr", label: "Français", flagCode: "FR" },
  { code: "en", label: "English", flagCode: "US" },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [openLang, setOpenLang] = useState(false);

  const currentCode = (i18n.resolvedLanguage || i18n.language || "en")
    .split("-")[0]
    .toLowerCase();
  const currentLang =
    languages.find((lang) => lang.code === currentCode) || languages[1];
  const CurrentFlag = flagMap[currentLang.flagCode];

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  // Hide language menu if header is hidden (on scroll down)
  useEffect(() => {
    if (!openLang) return;
    const header = document.querySelector("header");
    if (!header) return;
    const observer = new MutationObserver(() => {
      if (header.classList.contains("-translate-y-full")) {
        setOpenLang(false);
      }
    });
    observer.observe(header, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [openLang]);

  return (
    <div className="relative">
      <button
        aria-label="language dropdown menu"
        onClick={() => setOpenLang(!openLang)}
        className="flex items-center bg-white/80 dark:bg-[#151515]/80 border-2 border-black dark:border-[#2d2d2d] rounded-full px-2 py-1 text-sm font-semibold shadow focus:outline-none focus:ring-2 focus:ring-[#282828] transition-all duration-200"
      >
        <span className="w-6 h-4">
          {CurrentFlag ? (
            <CurrentFlag className="w-full h-full" title={currentLang.label} />
          ) : (
            <span className="inline-flex h-full w-full items-center justify-center text-xs leading-none">
              🌐
            </span>
          )}
        </span>
        <svg
          className="w-4 h-4 ml-1 text-black dark:text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {openLang && (
        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-[#151515] rounded-xl shadow-lg border-[1px] border-[#323232] z-50">
          {languages.map((lang) => {
            const FlagComponent = flagMap[lang.flagCode];
            return (
              <button
                key={lang.code}
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  setOpenLang(false); // hide menu after select
                }}
                className={`flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-[#D5C05C]/10 transition
            text-black dark:text-white
            ${currentCode === lang.code ? "font-bold text-[#303030]" : ""}
          `}
              >
                <span className="w-6 h-4">
                  {FlagComponent && (
                    <FlagComponent
                      className="w-full h-full"
                      title={lang.label}
                    />
                  )}
                </span>
                <span>{lang.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
