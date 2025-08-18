"use client";
import React, { useState, useRef, useEffect } from "react";
import { FastAverageColor } from "fast-average-color";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Team() {
  const { t } = useTranslation();
  const team = [
    {
      name: "Abd ellah IKKOU",
      role: "Full Stack Developer & Testing Specialist",
      image: "/assets/images/Samurai.webp",
      bio: "2 years in digital development with a passion for user-centered experiences.",
      instagram: "https://instagram.com/abdellahikkou",
      linkedin: "https://linkedin.com/in/abd-ellah-ikkou-44a3482b3",
      experience: "2 years - Backend, Testing, Node.js, API design",
      skills: [
        "Node.js",
        "Express",
        "Python",
        "Laravel",
        "PHP",
        "API",
        "MongoDB",
      ],
      bgGradient:
        "radial-gradient(circle at 60% 40%, #ffe066 60%, #ffd60a 100%)", // jaune
      github: "https://github.com/Devkioto",
    },
    {
      name: "Ibtissam BDM",
      role: "UX Designer & FullStack Developer, Project Manager",
      image: "/assets/images/betty.webp",
      bio: "Creative UX designer and full-stack developer with a knack for project management.",
      instagram: "https://instagram.com/bassma_b01",
      linkedin: "https://www.linkedin.com/in/ebtessam-bassma-3543b6331",
      experience: "2 years - UX, UI, Project Management",
      skills: [
        "UX Research",
        "React",
        "JavaScript",
        "UI Design",
        "Figma",
        "Project Management",
        "HTML/CSS",
      ],
      bgGradient:
        "radial-gradient(circle at 60% 40%, #a78bfa 60%, #7c3aed 100%)", // violet
      github: "https://github.com/ibtissamD",
    },
  ];

  const [selectedMember, setSelectedMember] = useState(null);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: { opacity: 0, scale: 0.9 },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="team"
      className="min-h-screen flex items-center justify-center py-12 px-2 sm:py-10 sm:px-6 bg-[#f5f5f5] dark:bg-[#1a1a1a] w-full overflow-hidden">
      <div className="w-full max-w-full sm:max-w-6xl mx-auto flex flex-col items-center justify-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={titleVariants}
          className="text-center mb-10 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#D5C05C] to-[#47412B] bg-clip-text text-transparent">
            {t("meetOurTeam")}
          </h2>
          <motion.p
            className="text-base sm:text-lg text-neutral-700 dark:text-white/80 max-w-xl sm:max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}>
            {t("teamIntro")}
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto w-full">
          {team.map((member, index) => {
            const imgRef = useRef(null);
            const [bgColor, setBgColor] = useState("#ffe066");

            useEffect(() => {
              const fac = new FastAverageColor();
              const img = imgRef.current;
              if (!img) return;
              if (!img.complete) {
                img.onload = () => {
                  try {
                    const color = fac.getColor(img, {
                      algorithm: "dominant",
                    }).hex;
                    setBgColor(color);
                  } catch {}
                };
              } else {
                try {
                  const color = fac.getColor(img, {
                    algorithm: "dominant",
                  }).hex;
                  setBgColor(color);
                } catch {}
              }
              // Clean up
              return () => {
                if (img) img.onload = null;
              };
            }, [member.image]);

            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setSelectedMember(member)}>
                <div className="relative flex items-center justify-center h-40 sm:h-48 mb-4">
                  <motion.div
                    className="absolute inset-0 rounded-xl shadow-lg scale-90 group-hover:scale-100 transition-all duration-300 opacity-75 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at 60% 40%, ${bgColor} 60%, #000 100%)`,
                    }}
                    whileHover={{ scale: 1.05 }}
                  />
                  <motion.img
                    ref={imgRef}
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    crossOrigin="anonymous"
                    className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white/90 shadow-lg transition-all duration-300 group-hover:border-[#47412B] group-hover:scale-110"
                    whileHover={{ rotate: 5, transition: { duration: 0.3 } }}
                  />
                </div>
                <motion.h3
                  className="text-xl sm:text-2xl font-bold mb-2 text-center bg-gradient-to-r dark:from-white dark:via-[#D5C05C] dark:to-[#47412B] from-black via-[#D5C05C] to-[#47412B] bg-clip-text text-transparent transition-colors"
                  whileHover={{ scale: 1.03 }}>
                  {member.name}
                </motion.h3>
                <motion.p
                  className="text-[#82743d] mb-3 sm:mb-4 text-sm sm:text-base text-center font-medium"
                  whileHover={{ scale: 1.03 }}>
                  {member.role}
                </motion.p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Modal for member profile */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedMember(null);
              }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}>
            <motion.div
              className="bg-neutral-900/95 backdrop-blur-xl shadow-2xl max-w-2xl w-full p-8 relative border border-purple-500/20 rounded-2xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit">
              <motion.button
                className="absolute top-4 right-4 text-neutral-400 hover:text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 transition-all"
                onClick={() => setSelectedMember(null)}
                aria-label="Close"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                ×
              </motion.button>
              <motion.div
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}>
                <motion.img
                  src={selectedMember.image || "/placeholder.svg"}
                  alt={selectedMember.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-[#D5C05C] shadow-lg mb-2"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
                <motion.h3
                  className="text-2xl font-extrabold text-white text-center tracking-tight"
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}>
                  {selectedMember.name}
                </motion.h3>
                <motion.p
                  className="text-[#D5C05C] text-base font-medium text-center mb-1"
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}>
                  {selectedMember.role}
                </motion.p>
                <motion.div
                  className="w-full border-t border-neutral-700 my-2"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <div className="w-full flex flex-col gap-2">
                  <motion.div
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}>
                    <span className="text-neutral-400 font-semibold min-w-[30px] text-sm">
                      {t("bio")}
                    </span>
                    <span className="text-neutral-200 text-sm">
                      {selectedMember.bio}
                    </span>
                  </motion.div>
                  <motion.div
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}>
                    <span className="text-neutral-400 font-semibold min-w-[50px] text-sm">
                      {t("experience")}
                    </span>
                    <span className="text-neutral-200 ps-2 text-sm">
                      {selectedMember.experience}
                    </span>
                  </motion.div>
                  {/* Skills */}
                  <motion.div
                    className="flex items-start gap-2 flex-wrap"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}>
                    <span className="text-neutral-400 font-semibold min-w-[50px] text-sm mt-1">
                      {t("skills")}
                    </span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedMember.skills &&
                        selectedMember.skills.map((skill, idx) => (
                          <motion.span
                            key={idx}
                            className="bg-[#47412B]/40 text-[#D5C05C] px-2 py-0.5 rounded-full text-xs font-medium border border-[#D5C05C] shadow-sm"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              delay: 0.45 + idx * 0.05,
                            }}>
                            {skill}
                          </motion.span>
                        ))}
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-4 mt-2 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}>
                    <a
                      href={selectedMember.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-pink-400 hover:text-pink-300 transition-colors text-sm">
                      <svg
                        width="18"
                        height="18"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1 0 2a1 1 0 0 1 0-2z" />
                      </svg>
                      Instagram
                    </a>
                    <a
                      href={selectedMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors text-sm">
                      <svg
                        width="18"
                        height="18"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.04 0 3.601 2.002 3.601 4.604v5.592z" />
                      </svg>
                      LinkedIn
                    </a>
                    {selectedMember.github && (
                      <a
                        href={selectedMember.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-300 transition-colors text-sm">
                        <svg
                          width="18"
                          height="18"
                          fill="currentColor"
                          viewBox="0 0 24 24">
                          <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                        </svg>
                        GitHub
                      </a>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
