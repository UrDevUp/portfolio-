"use client";

import { useState, useEffect, useRef } from "react";
import Menu from "lucide-react/dist/esm/icons/menu";
import X from "lucide-react/dist/esm/icons/x";
import LanguageSelector from "@/components/ui/LanguageSelector";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);
  const rafIdRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;

      tickingRef.current = true;
      rafIdRef.current = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollYRef.current;

        if (currentScrollY < 40) {
          setShowNavbar(true);
        } else if (delta > 10 && currentScrollY > 120) {
          setShowNavbar(false);
        } else if (delta < -6) {
          setShowNavbar(true);
        }

        lastScrollYRef.current = currentScrollY;
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const sectionIds = [
      "hero",
      "about",
      "branding",
      "logos",
      "projects",
      "contact",
    ];
    const elements = sectionIds
      .map((id) => ({ id, element: document.getElementById(id) }))
      .filter((entry) => entry.element);

    if (elements.length === 0) return;

    const visibleRatios = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          visibleRatios.set(
            id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        });

        if (window.scrollY < 120) {
          setActiveSection("hero");
          return;
        }

        let current = "hero";
        let maxRatio = 0;
        visibleRatios.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            current = id;
          }
        });

        setActiveSection(current);
      },
      {
        root: null,
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      },
    );

    elements.forEach(({ element }) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    if (sectionId === "hero") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setIsMenuOpen(false);
      return;
    }

    const element = document.getElementById(
      sectionId === "team" ? "about" : sectionId,
    );
    if (element) {
      // Calculate the position with offset
      let offset = 50;
      if (sectionId === "about") {
        offset = -50;
      }
      if (sectionId === "branding") {
        offset = -30;
      }

      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
    setShowNavbar(true);
  };

  const getNavLinkClass = (sectionId, isMobile = false) => {
    const isActive = activeSection === sectionId;
    const baseClass = isMobile
      ? "text-left"
      : "text-[17px] font-medium tracking-[-0.01em]";
    const stateClass = isActive
      ? "text-white underline decoration-white decoration-2 underline-offset-[10px]"
      : "text-white/70 hover:text-white";

    return `${baseClass} ${stateClass} transition-colors`;
  };

  // Show navbar when menu is opened (mobile)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setShowNavbar(true);
  };

  return (
    <header
      className={`fixed top-4 left-1/2 z-50 w-[calc(100%-1.5rem)] -translate-x-1/2 rounded-[2rem] border border-white/10 bg-[#111213]/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-transform duration-300 md:w-[calc(100%-6rem)] ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 py-4 md:px-6">
        <div className="flex items-center justify-between md:relative">
          {/* Logo */}
          <div
            className="flex items-center gap-2 space-x-2"
            aria-label="UrDevUp logo"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center">
              <img
                src="assets/images/logo_dev.webp"
                alt="UrDevUp logo"
                width="48"
                height="48"
                className="h-full w-full object-contain dark:brightness-0 dark:invert"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            {/* <span className="text-xl font-bold bg-gradient-to-r from-[#D5C05C] to-[#47412B] bg-clip-text text-transparent"> */}
            <span className="font-brand text-[1.35rem] md:text-2xl font-semibold tracking-[-0.04em] text-white">
              UrDevUp.
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-10 xl:space-x-12 md:absolute md:left-1/2 md:-translate-x-1/2"
            aria-label="Primary"
          >
            <button
              onClick={() => scrollToSection("hero")}
              className={getNavLinkClass("hero")}
            >
              {t("home")}
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={getNavLinkClass("about")}
            >
              {t("about")}
            </button>

            <button
              onClick={() => scrollToSection("branding")}
              className={getNavLinkClass("branding")}
            >
              {t("branding")}
            </button>

            <button
              onClick={() => scrollToSection("logos")}
              className={getNavLinkClass("logos")}
            >
              {t("logos")}
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className={getNavLinkClass("projects")}
            >
              {t("projects")}
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <div className="relative" style={{ minWidth: 110, maxWidth: 130 }}>
              <LanguageSelector />
            </div>

            <button
              onClick={() => scrollToSection("contact")}
              className="bg-[#111213] text-white px-6 py-2 rounded-full hover:bg-[#151515] dark:bg-white dark:text-black dark:hover:bg-white/90 transition-colors"
            >
              {t("contact")}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            <div
              className="relative mr-0"
              style={{ minWidth: 84, maxWidth: 96 }}
            >
              <LanguageSelector />
            </div>
            <button
              onClick={toggleMenu}
              className="text-black dark:text-white"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
            >
              {isMenuOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav
            id="mobile-menu"
            className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("hero")}
                className={getNavLinkClass("hero", true)}
              >
                {t("home")}
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className={getNavLinkClass("about", true)}
              >
                {t("about")}
              </button>

              <button
                onClick={() => scrollToSection("branding")}
                className={getNavLinkClass("branding", true)}
              >
                {t("branding")}
              </button>

              <button
                onClick={() => scrollToSection("logos")}
                className={getNavLinkClass("logos", true)}
              >
                {t("logos")}
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className={getNavLinkClass("projects", true)}
              >
                {t("projects")}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-white text-black dark:bg-[#111213] dark:text-white px-6 py-2 rounded-full hover:bg-white/90 dark:hover:bg-[#151515] transition-colors text-center"
              >
                {t("contact")}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
