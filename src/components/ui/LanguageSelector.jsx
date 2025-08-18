"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FR, GB, US } from "country-flag-icons/react/3x2";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Set English as default language
i18next.use(LanguageDetector).init({
  fallbackLng: "en",
  // ...other i18next config
});

const languages = [
  { code: "fr", label: "Français", flagCode: "FR" },
  { code: "en", label: "English", flagCode: "US" },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [openLang, setOpenLang] = useState(false);

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
        className="flex items-center bg-white/80 dark:bg-black/80 border-2 border-black dark:border-[#D5C05C] rounded-full px-2 py-1 text-sm font-semibold shadow focus:outline-none focus:ring-2 focus:ring-[#D5C05C] transition-all duration-200">
        <span className="w-6 h-4">
          {(() => {
            const currentLang = languages.find((l) => l.code === i18n.language);
            const flagMap = { FR, GB, US };
            const FlagComponent = flagMap[currentLang?.flagCode];
            return FlagComponent ? (
              <FlagComponent title={currentLang.label} />
            ) : null;
          })()}
        </span>
        <svg
          className="w-4 h-4 ml-1 text-black dark:text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {openLang && (
        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-black rounded-xl shadow-lg border-[0.5px] border-[#D5C05C] z-50">
          {languages.map((lang) => {
            const flagMap = { FR, GB, US };
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
            ${i18n.language === lang.code ? "font-bold text-[#D5C05C]" : ""}
          `}>
                <span className="w-6 h-4">
                  {FlagComponent && <FlagComponent title={lang.label} />}
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
