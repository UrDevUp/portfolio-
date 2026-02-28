"use client";
import Loading from "@/layouts/Loading";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
const CountUp = lazy(() => import("@/components/animation/CountUp"));
const LogoAnimation = lazy(() =>
  import("@/components/animation/LogoAnimation")
);

export default function About() {
  const { t } = useTranslation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const modelVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  return (
    <section
      id="about"
      className="py-12 px-2 sm:py-20 sm:px-6 bg-white dark:bg-black w-full z-10 overflow-hidden">
      <div className="w-full max-w-full sm:max-w-6xl mx-auto">
        <motion.div
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center md:text-left bg-gradient-to-r dark:from-white dark:via-[#000000] dark:to-[#000000] from-black  bg-clip-text text-transparent "
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}>
              {t("meetTheMinds")}
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg text-black/80 dark:text-white/80 mb-6"
              variants={itemVariants}>
              {t("teamDescription")}
            </motion.p>

            <motion.div
              className="grid grid-cols-2 gap-4 sm:gap-6"
              variants={statsVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}>
              <motion.div variants={itemVariants}>
                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r dark:from-white dark:via-[#D5C05C] dark:to-[#47412B] from-[#D5C05C] to-[#47412B] bg-clip-text text-transparent transition-colors mb-2">
                  <Suspense fallback={null}>
                    <CountUp to={5} duration={2} />
                  </Suspense>
                </h3>
                <p className="text-black/80 dark:text-white/80 text-sm sm:text-base">
                  {t("projectsCompleted")}
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r dark:from-white dark:via-[#D5C05C] dark:to-[#47412B] from-[#D5C05C] to-[#47412B] bg-clip-text text-transparent transition-colors mb-2">
                  <Suspense fallback={null}>
                    <CountUp to={100} duration={2} />%
                  </Suspense>
                </h3>
                <p className="text-black/80 dark:text-white/80 text-sm sm:text-base">
                  {t("happyClients")}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            variants={modelVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}>
            <div className="aspect-square bg-gradient-to-br rounded-2xl p-4 sm:p-8">
              <div className="w-full h-full bg-transparent dark:bg-black/40 rounded-xl flex items-center justify-center">
                <Suspense fallback={<Loading />}>
                  <LogoAnimation />
                </Suspense>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
