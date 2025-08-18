import React, { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import Loading from "@/layouts/Loading";
import { projects } from "@/data/galleryData";
const InfiniteMenu = lazy(() => import("@/components/animation/InfiniteMenu"));

const Projets = () => {
  const { t } = useTranslation();

  return (
    <section
      id="projects"
      className="min-h-[120vh] sm:min-h-screen py-12 px-2 sm:py-20 sm:px-6 bg-white dark:bg-[#1c1c1c] w-full z-10 overflow-hidden">
      <div className="relative z-10 pt-12 sm:pt-20 pb-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r dark:from-white dark:via-[#D5C05C] dark:to-[#47412B] from-black via-[#D5C05C] to-[#47412B] bg-clip-text text-transparent">
            {t("ourProjects")}
          </h2>
          <p className="text-lg md:text-xl text-black/80 dark:text-white/80 max-w-3xl mx-auto mb-8">
            {t("projectsIntro")}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-black/60 dark:text-white/60">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#D5C05C] rounded-full animate-pulse"></span>
              {t("dragToExplore")}
            </span>
          </div>
        </div>
      </div>
      <div className="h-[80vh] sm:h-[70vh]">
        <Suspense fallback={<Loading />}>
          <InfiniteMenu
            items={projects}
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
          />
        </Suspense>
      </div>
    </section>
  );
};

export default Projets;
