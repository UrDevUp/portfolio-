"use client";

import { useState, useEffect, useRef } from "react";
import Menu from "lucide-react/dist/esm/icons/menu";
import X from "lucide-react/dist/esm/icons/x";
import ThemeToggleButton from "@/components/ui/ThemeToggleButton";
import LanguageSelector from "@/components/ui/LanguageSelector";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    let idleCallbackId;
    function setupScrollListener() {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }

        // Never hide navbar when at very top (scroll position 0)
        if (currentScrollY === 0) {
          setShowNavbar(true);
          return;
        }

        // Set timeout to hide navbar after 3s when not at top
        timeoutRef.current = setTimeout(() => {
          setShowNavbar(false);
        }, 3000);

        // Handle scroll direction when not at top
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down
          setShowNavbar(false);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up
          setShowNavbar(true);
        }

        setLastScrollY(currentScrollY);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }

    if ("requestIdleCallback" in window) {
      idleCallbackId = window.requestIdleCallback(setupScrollListener);
    } else {
      setTimeout(setupScrollListener, 0);
    }

    return () => {
      if ("cancelIdleCallback" in window && idleCallbackId) {
        window.cancelIdleCallback(idleCallbackId);
      }
      // Remove scroll listener if it was set
      window.removeEventListener("scroll", setupScrollListener);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [lastScrollY]);
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
      sectionId === "team" ? "about" : sectionId
    );
    if (element) {
      // Calculate the position with offset
      let offset = 50;
      if (sectionId === "about") {
        offset = -50;
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

    // Show navbar when clicking a nav item and reset timeout if not at top
    setShowNavbar(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (window.scrollY > 0) {
      timeoutRef.current = setTimeout(() => {
        setShowNavbar(false);
      }, 3000);
    }
  };

  // Show navbar when menu is opened (mobile)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setShowNavbar(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (window.scrollY > 0) {
      timeoutRef.current = setTimeout(() => {
        setShowNavbar(false);
      }, 3000);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-black/10 dark:border-white/10 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-2 space-x-2"
            aria-label="LuxyDev logo">
            <div className="w-5 h-5 rounded-full flex items-center justify-center">
              <span>
                <img
                  src="assets/images/logo_luxy.webp"
                  alt="LuxyDev logo"
                  loading="lazy"
                  decoding="async"
                />
              </span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#D5C05C] to-[#47412B] bg-clip-text text-transparent">
              LuxyDev
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-8"
            aria-label="Primary">
            <ThemeToggleButton />
            <div className="relative" style={{ minWidth: 110, maxWidth: 130 }}>
              <LanguageSelector />
            </div>
            <button
              onClick={() => scrollToSection("hero")}
              className="text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors">
              {t("home")}
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors">
              {t("about")}
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors">
              {t("team")}
            </button>
            <button
              onClick={() => scrollToSection("logos")}
              className="text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors">
              {t("logos")}
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors">
              {t("projects")}
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 transition-colors">
              {t("contact")}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-black dark:text-white"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}>
            {isMenuOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav
            id="mobile-menu"
            className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4"
            aria-label="Mobile navigation">
            <div className="flex items-center gap-4 mb-4 justify-between">
              <ThemeToggleButton />
              <div
                className="relative"
                style={{ minWidth: 110, maxWidth: 130 }}>
                <LanguageSelector />
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-black dark:text-white hover:text-black dark:hover:text-white transition-colors text-left">
                {t("home")}
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-black dark:text-white hover:text-black dark:hover:text-white transition-colors text-left">
                {t("about")}
              </button>
              <button
                onClick={() => scrollToSection("team")}
                className="text-black dark:text-white hover:text-black dark:hover:text-white transition-colors text-left">
                {t("team")}
              </button>
              <button
                onClick={() => scrollToSection("logos")}
                className="text-black dark:text-white hover:text-black dark:hover:text-white transition-colors text-left">
                {t("logos")}
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-black dark:text-white hover:text-black dark:hover:text-white transition-colors text-left">
                {t("projects")}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-white text-black dark:bg-black dark:text-white px-6 py-2 rounded-full hover:bg-white/90 dark:hover:bg-black/90 transition-colors text-center">
                {t("contact")}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
