"use client";

import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";

const CalEmbed = lazy(() => import("@/components/ui/CalEmbed"));

const EMAIL = "urdevup@gmail.com";
const PHONE = "+212638686444";
const PHONE_DISPLAY = "+212 638-686-444";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="relative bg-white dark:bg-[#111213] min-h-screen"
    >
      <div className="max-w-5xl mx-auto relative z-10 py-20 px-6">
        <div className="text-center mb-12">
          <h2 className="bg-gradient-to-r from-black via-black/80 to-black/60 dark:from-white/20 dark:via-white/80 dark:to-white text-4xl font-bold mb-4 bg-clip-text text-transparent">
            {t("getInTouch")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {t("bookingIntro")}
          </p>
        </div>

        {/* Les coordonnees restent visibles : tout le monde ne veut pas
            reserver un appel, et le calendrier ne doit pas etre le seul
            point d'entree. */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <a
            href={`mailto:${EMAIL}`}
            className="rounded-2xl border border-black/10 bg-black/[0.02] p-5 transition-colors hover:bg-black/[0.05] dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
          >
            <p className="mb-1 text-sm font-medium text-black/50 dark:text-white/50">
              {t("email")}
            </p>
            <p className="break-all font-medium text-black dark:text-white">
              {EMAIL}
            </p>
          </a>

          <a
            href={`tel:${PHONE}`}
            className="rounded-2xl border border-black/10 bg-black/[0.02] p-5 transition-colors hover:bg-black/[0.05] dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
          >
            <p className="mb-1 text-sm font-medium text-black/50 dark:text-white/50">
              {t("phone")}
            </p>
            <p className="font-medium text-black dark:text-white">
              {PHONE_DISPLAY}
            </p>
          </a>

          <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.03]">
            <p className="mb-1 text-sm font-medium text-black/50 dark:text-white/50">
              {t("office")}
            </p>
            <p className="font-medium text-black dark:text-white">
              Errachidia, Morocco
            </p>
          </div>
        </div>

        <Suspense fallback={<div className="min-h-[700px]" />}>
          <CalEmbed />
        </Suspense>
      </div>
    </section>
  );
}
