"use client";
import Loading from "@/layouts/Loading";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Code2,
  Palette,
  ShoppingCart,
  Smartphone,
  Gauge,
  MessageCircle,
} from "lucide-react";
const LogoAnimation = lazy(
  () => import("@/components/animation/LogoAnimation"),
);

export default function About() {
  const { i18n } = useTranslation();
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const isFrench = (i18n.resolvedLanguage || i18n.language || "en")
    .toLowerCase()
    .startsWith("fr");

  const aboutTitle = isFrench
    ? "Construire Votre Présence Digitale"
    : "Building Your Digital Presence";
  const aboutDescription = isFrench
    ? "chez urdevup nous proposons des solutions digitales modernes et efficaces, conçues pour développer votre présence en ligne, attirer plus de clients et améliorer votre image de marque."
    : "At UrDevUp, we deliver modern and high-performing digital solutions to grow your online presence, attract more customers, and elevate your brand.";

  const aboutServices = [
    {
      icon: Code2,
      title: isFrench ? "Developpement Web" : "Web Development",
      description: isFrench
        ? "Creation de sites modernes et rapides adaptes a votre activite."
        : "Creation of modern and fast websites tailored to your business.",
    },
    {
      icon: Palette,
      title: isFrench ? "Design UI/UX" : "UI/UX Design",
      description: isFrench
        ? "Des interfaces simples, elegantes et faciles a utiliser."
        : "Simple, elegant, and user-friendly interfaces.",
    },
    {
      icon: ShoppingCart,
      title: isFrench ? "Creation de Store" : "Store Creation",
      description: isFrench
        ? "Boutiques en ligne pour vendre vos produits facilement."
        : "Online stores to sell your products with ease.",
    },
    {
      icon: Smartphone,
      title: isFrench ? "Site Responsive" : "Responsive Website",
      description: isFrench
        ? "Un site optimise pour mobile, tablette et ordinateur."
        : "A website optimized for mobile, tablet, and desktop.",
    },
    {
      icon: Gauge,
      title: isFrench ? "Optimisation" : "Optimization",
      description: isFrench
        ? "Amelioration de la vitesse et des performances du site."
        : "Improving speed and overall website performance.",
    },
    {
      icon: MessageCircle,
      title: isFrench ? "Integration WhatsApp" : "WhatsApp Integration",
      description: isFrench
        ? "Permettez a vos clients de vous contacter rapidement."
        : "Allow your clients to contact you quickly.",
    },
  ];

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

  const serviceVariants = {
    enter: { opacity: 0, y: 28, scale: 0.98 },
    center: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -28,
      scale: 0.98,
      transition: {
        duration: 0.35,
        ease: "easeIn",
      },
    },
  };

  useEffect(() => {
    if (aboutServices.length < 2) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveServiceIndex((currentIndex) =>
        currentIndex === aboutServices.length - 1 ? 0 : currentIndex + 1,
      );
    }, 2400);

    return () => window.clearInterval(intervalId);
  }, [aboutServices.length]);

  return (
    <section
      id="about"
      className="pt-12 pb-0 px-2 sm:py-20 sm:px-6 bg-white dark:bg-[#111213] w-full z-10 overflow-hidden"
    >
      <svg
        className="absolute h-0 w-0 overflow-hidden"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient
            id="service-icon-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#bfc2c7" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#eceff3" />
          </linearGradient>
        </defs>
      </svg>
      <div className="w-full max-w-full sm:max-w-6xl mx-auto">
        <motion.div
          className="grid gap-0 md:grid-cols-2 md:gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-center"
          >
            <div className="mb-3 text-center md:text-left">
              <h2 className="bg-gradient-to-r from-black via-black/80 to-black/60 dark:from-white/20 dark:via-white/80 dark:to-white bg-clip-text text-3xl font-bold leading-none text-transparent sm:text-4xl md:text-5xl">
                {aboutTitle}
              </h2>
            </div>

            <motion.p
              className="mx-auto md:mx-0 max-w-xl text-center md:text-left text-base sm:text-lg text-black/80 dark:text-white/80 mb-6"
              variants={itemVariants}
            >
              {aboutDescription}
            </motion.p>

            <motion.div
              className="relative mx-auto md:mx-0 flex h-[120px] sm:h-[230px] w-full max-w-md items-center justify-center"
              variants={statsVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <AnimatePresence mode="wait">
                {aboutServices.map((service, index) => {
                  if (index !== activeServiceIndex) {
                    return null;
                  }

                  const Icon = service.icon;

                  return (
                    <motion.div
                      key={service.title}
                      variants={serviceVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      whileHover={{
                        y: -6,
                        scale: 1.02,
                        boxShadow: "0 14px 30px white/10, 0 4px 8px white/8",
                      }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="star-border-button star-border-button--double group absolute inset-0 flex flex-col justify-center  border border-transparent bg-white p-4 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.08)] dark:bg-[#151515] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.12)] sm:p-5"
                    >
                      <div className="relative z-10">
                        <div className="relative mb-2.5 flex items-center justify-center gap-2">
                          <motion.div
                            animate={{ y: [0, -1.5, 0] }}
                            transition={{
                              duration: 2.2,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: index * 0.12,
                            }}
                          >
                            <Icon
                              color="url(#service-icon-gradient)"
                              className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                              aria-hidden="true"
                            />
                          </motion.div>
                          <h3 className="bg-gradient-to-r from-black via-black/80 to-black/60 dark:from-white/20 dark:via-white/80 dark:to-white bg-clip-text text-base font-semibold text-transparent sm:text-[1.02rem]">
                            {service.title}
                          </h3>
                        </div>
                        <p className="text-black/75 dark:text-white/75 text-[0.8rem] sm:text-sm leading-snug">
                          {service.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative -mt-32 flex justify-center md:mt-0 md:justify-start"
            variants={modelVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="flex w-full max-w-[120px] items-center justify-center p-0 sm:max-w-none sm:p-8">
              <Suspense fallback={<Loading />}>
                <LogoAnimation />
              </Suspense>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
