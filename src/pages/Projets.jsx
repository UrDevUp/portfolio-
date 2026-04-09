import React, { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import Loading from "@/layouts/Loading";
import { projects } from "@/data/galleryData";
import { motion } from "framer-motion";
const InfiniteMenu = lazy(() => import("@/components/animation/InfiniteMenu"));

const headingVariant = {
  hidden: { opacity: 0, y: 80, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
  },
};

const headingContentVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const headingItemVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const menuVariant = {
  hidden: { opacity: 0, y: 100, scale: 0.9, rotateX: 10 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
  },
};

const Projets = () => {
  const { t } = useTranslation();

  return (
    <section
      id="projects"
      className="min-h-[120vh] sm:min-h-screen py-12 px-2 sm:py-20 sm:px-6 w-full z-10 overflow-hidden bg-white dark:bg-[#131313]"
    >
      <motion.div
        className="relative z-10 pt-12 sm:pt-20 pb-8 px-6"
        variants={headingVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.45 }}
      >
        <motion.div
          className="max-w-7xl mx-auto text-center"
          variants={headingContentVariant}
        >
          <motion.h2
            variants={headingItemVariant}
            className="bg-gradient-to-r from-black via-black/80 to-black/60 dark:from-white/20 dark:via-white/80 dark:to-white text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent"
          >
            {t("ourProjects")}
          </motion.h2>
          <motion.p
            variants={headingItemVariant}
            className="text-lg md:text-xl text-black/80 max-w-3xl mx-auto mb-8"
          >
            {t("projectsIntro")}
          </motion.p>
          <motion.div
            variants={headingItemVariant}
            className="flex flex-wrap justify-center gap-4 text-sm text-black/60 dark:text-white/60"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#D5C05C] rounded-full animate-pulse"></span>
              {t("dragToExplore")}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        className="h-[80vh] sm:h-[70vh]"
        variants={menuVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <Suspense fallback={<Loading />}>
          <InfiniteMenu
            items={
              projects != []
                ? projects
                : [
                    {
                      id: 0,
                      title: "No Project available",
                      image: "/assets/images/logo.svg",
                      description:
                        "we are updating our projects, please check back later.",
                      links: {},
                    },
                  ]
            }
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
          />
        </Suspense>
      </motion.div>
    </section>
  );
};

export default Projets;
