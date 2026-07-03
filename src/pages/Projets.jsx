import React, { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import Loading from "@/layouts/Loading";
import { projects } from "@/data/galleryData";
import { motion } from "framer-motion";
const RollingGallery = lazy(
  () => import("@/components/animation/RollingGallery"),
);

const headingVariant = {
  hidden: { opacity: 0, y: 80, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const headingContentVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const headingItemVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const menuVariant = {
  hidden: { opacity: 0, y: 100, scale: 0.9, rotateX: 10 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
  },
};

const Projets = () => {
  const { t } = useTranslation();
  const projectCards = projects.map((project) => ({
    id: `project-${project.id}`,
    slug: project.slug || String(project.id),
    category: "PROJET WEB",
    year: project.links?.date || "2026",
    title: project.title,
    description: project.description,
    tags: ["React", "Vite", "Frontend"],
    status: project.links?.website ? "En ligne" : "En cours",
    statusColor: project.links?.website ? "#10B981" : "#F59E0B",
    href: `/projets/${project.slug || project.id}`,
    image: project.image,
    topGradient:
      Number(project.id) % 2 === 0
        ? "from-[#A44326] via-[#C96E4E] to-[#D98566]"
        : "from-[#2A5D9C] via-[#4F8BCF] to-[#6EA8E6]",
  }));

  return (
    <section className="min-h-[120vh] sm:min-h-screen py-12 px-2 sm:py-20 sm:px-6 w-full z-10 overflow-hidden bg-white dark:bg-[#111213]">
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
            className="mx-auto mt-3 max-w-3xl text-gray-700 dark:text-white/70 text-base sm:text-lg"
          >
            {t("projectsIntro") ||
              "Une sélection de projets récents montrant notre savoir-faire en design et développement web."}
          </motion.p>
        </motion.div>
      </motion.div>
      <motion.div
        className="min-h-[80vh]"
        variants={menuVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <Suspense fallback={<Loading />}>
          <div className="mx-auto max-w-6xl">
            <RollingGallery projects={projectCards} />
          </div>
        </Suspense>
      </motion.div>
    </section>
  );
};

export default Projets;
