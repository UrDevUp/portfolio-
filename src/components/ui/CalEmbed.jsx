import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/theme";

const CAL_LINK = "urdevup-0sxvr1/30min";

/**
 * Embed Cal.com charge a la demande.
 *
 * Un iframe Cal.com tire plusieurs centaines de kB de tiers. On ne le monte
 * qu'a l'approche du viewport (IntersectionObserver), pour qu'il ne pese ni sur
 * le first paint ni sur le LCP. Tant qu'il n'est pas charge, on affiche un
 * bouton reel : si JS ou le tiers echoue, le visiteur garde un lien cliquable.
 */
export default function CalEmbed({ className = "" }) {
  const { t } = useTranslation();
  const { themeName } = useTheme();
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || visible) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  const src = `https://cal.com/${CAL_LINK}?theme=${themeName}&layout=month_view`;
  const fallbackHref = `https://cal.com/${CAL_LINK}`;

  return (
    <div ref={containerRef} className={className}>
      {visible ? (
        <iframe
          key={themeName}
          src={src}
          title={t("bookACall")}
          width="100%"
          height="700"
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full rounded-2xl border border-black/10 dark:border-white/10"
          style={{ border: "none", minHeight: 700 }}
        />
      ) : (
        <div className="flex min-h-[700px] w-full items-center justify-center rounded-2xl border border-black/10 bg-black/[0.03] p-8 text-center dark:border-white/10 dark:bg-white/[0.04]">
          <div className="max-w-sm space-y-4">
            <p className="text-lg font-medium text-black dark:text-white">
              {t("bookACall")}
            </p>
            <a
              href={fallbackHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              {t("openCalendar")}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
