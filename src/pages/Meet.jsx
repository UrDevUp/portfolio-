"use client";

import { useTheme } from "@/theme";
import { useTranslation } from "react-i18next";

export default function Meet() {
  const { themeName } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen text-white">
      <div
        style={{
          backgroundColor: themeName === "dark" ? "#000000" : "#ffffff",
          padding: "20px",
        }}
      >
        <h1
          className="text-center mb-4 bg-gradient-to-r dark:from-white dark:via-[#000000] dark:to-[#000000] from-black bg-clip-text text-transparent"
          style={{ fontSize: "2.5rem", fontWeight: 700 }}
        >
          {t("meetTitle")}
        </h1>
        <iframe
          src="https://cal.com/urdevup-0sxvr1/30min"
          width="100%"
          height="700"
          style={{
            border: "none",
            borderRadius: "8px",
          }}
          allow="camera; microphone; fullscreen"
        ></iframe>
      </div>
    </div>
  );
}
