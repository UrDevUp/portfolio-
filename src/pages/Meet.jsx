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
          style={{
            color: themeName === "dark" ? "#ffffff" : "#000000",
            fontSize: "2rem",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          {t("meetTitle")}
        </h1>
        <iframe
          src="https://cal.com/luxydev-wobxgk/30min"
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
