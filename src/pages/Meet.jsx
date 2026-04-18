"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/theme";
import { useTranslation } from "react-i18next";

export default function Meet() {
  const { themeName } = useTheme();
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);

  useEffect(() => {
    if (!containerRef.current || shouldLoadIframe) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadIframe(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [shouldLoadIframe]);

  return (
    <div ref={containerRef} className="min-h-screen text-white">
      <div
        style={{
          backgroundColor: themeName === "dark" ? "#000000" : "#ffffff",
          padding: "20px",
        }}
      >
        <h1
          className="bg-gradient-to-r from-black via-black/80 to-black/60 dark:from-white/20 dark:via-white/80 dark:to-white text-center mb-4 bg-clip-text text-transparent"
          style={{ fontSize: "2.5rem", fontWeight: 700 }}
        >
          {t("meetTitle")}
        </h1>
        {shouldLoadIframe ? (
          <iframe
            src="https://cal.com/urdevup-0sxvr1/30min"
            width="100%"
            height="700"
            loading="lazy"
            referrerPolicy="no-referrer"
            style={{
              border: "none",
              borderRadius: "8px",
            }}
            allow="camera; microphone; fullscreen"
          ></iframe>
        ) : (
          <div className="mx-auto flex min-h-[700px] w-full max-w-5xl items-center justify-center rounded-xl border border-black/10 bg-[#151515]/5 p-8 text-center text-black dark:border-white/10 dark:bg-[#151515]/70 dark:text-white">
            <div className="max-w-xl space-y-4">
              <p className="text-lg font-medium">
                The booking widget will load when you reach this section.
              </p>
              <p className="text-sm text-black/60 dark:text-white/60">
                This keeps the page lighter on first paint and avoids loading
                third-party content before it is needed.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
