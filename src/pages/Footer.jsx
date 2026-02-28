"use client";

import Aurora from "@/components/animation/Aurora";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import Mail from "lucide-react/dist/esm/icons/mail";
import Phone from "lucide-react/dist/esm/icons/phone";
import Instagram from "lucide-react/dist/esm/icons/instagram";
import Linkedin from "lucide-react/dist/esm/icons/linkedin";
import Github from "lucide-react/dist/esm/icons/github";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="relative py-20 px-6 bg-white dark:bg-black border-t border-gray-200 dark:border-white/10 overflow-hidden"
    >
      {/* Aurora animation at the bottom */}
      <div className="absolute left-0 right-0 bottom-0 h-1/2 z-0 pointer-events-none hidden dark:block">
        <Aurora
          colorStops={["#FFF1B1", "#D5C05C", "#D5C05C", "#47412B"]}
          blend={0.3}
          amplitude={0.5}
          speed={0.3}
          direction="bottom"
          className="w-full h-full"
        />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 space-x-2 mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <span>
                  <img
                    src="assets/images/logo_dev.webp"
                    alt="UrDevUp logo"
                    loading="lazy"
                    decoding="async"
                  />
                </span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#000000] to-[#000000] bg-clip-text text-transparent">
                UrDevUp
              </span>
            </div>
            <p className="text-black/70 dark:text-white/70 mb-6">
              {t("footerDescription")}
            </p>
            <div className="flex space-x-4">
              <a
                title="GitHub_link"
                href="https://github.com/UrDevUpDigital/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                title="LinkedIn_link"
                href="https://www.linkedin.com/in/urdevup-digital-a45b9a378"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                title="Instagram_link"
                href="https://www.instagram.com/urdevup.ma/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-black dark:text-white">
              {t("services")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#team"
                  className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors"
                >
                  {t("seoOptimization")}
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors"
                >
                  {t("customWebsiteDevelopment")}
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors"
                >
                  {t("uxuiDesign")}
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors"
                >
                  {t("branding")}
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors"
                >
                  {t("consulting")}
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-black dark:text-white">
              {t("company")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors"
                >
                  {t("about")}
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors"
                >
                  {t("team")}
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors"
                >
                  {t("projects")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors"
                >
                  {t("careers")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors"
                >
                  {t("blog")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-black dark:text-white">
              {t("getInTouch")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-black/60 dark:text-white/60" />
                <a
                  href="mailto:urdevupdigital@gmail.com"
                  className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors"
                >
                  urdevup@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-black/60 dark:text-white/60" />
                <a
                  href="tel:+212638686444"
                  className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors"
                >
                  +212 638-686-444
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin
                  size={16}
                  className="text-black/60 dark:text-white/60"
                />
                <span className="text-black/70 dark:text-white/70">
                  Morocco, Errachidia
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-black/60 dark:text-white/60 text-sm mb-4 md:mb-0">
            © {currentYear} UrDevUp. {t("allRightsReserved")}
          </p>
          <div className="flex space-x-6">
            <Link
              to="/PrivacyPolicy"
              className="text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors text-sm"
            >
              {t("privacyPolicy")}
            </Link>
            <Link
              to="/terms"
              className="text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors text-sm"
            >
              {t("termsOfService")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
