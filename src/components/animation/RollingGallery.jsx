import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { useTheme } from "@/theme";

const DEFAULT_PROJECTS = [
  {
    id: "shop",
    category: "E-COMMERCE",
    year: "2023",
    title: "Boutique Artisanale",
    description:
      "Plateforme e-commerce complete avec gestion des stocks, paiement securise et panneau admin.",
    tags: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
    status: "En cours",
    statusColor: "#F59E0B",
    href: "#",
    topGradient: "from-[#A44326] via-[#C96E4E] to-[#D98566]",
  },
  {
    id: "assistant-ai",
    category: "IA & API",
    year: "2025",
    title: "Assistant IA Multilingue",
    description:
      "Chatbot intelligent integrant plusieurs LLMs avec memoire contextuelle et historique persistant.",
    tags: ["Python", "FastAPI", "OpenAI", "Redis"],
    status: "En ligne",
    statusColor: "#10B981",
    href: "#",
    topGradient: "from-[#2A5D9C] via-[#4F8BCF] to-[#6EA8E6]",
  },
];

const RollingGallery = ({
  autoplay = false,
  pauseOnHover = false,
  images = [],
  projects = [],
  grayscale = false,
  logoOnly = false,
}) => {
  const { themeName } = useTheme();
  const isDarkMode = themeName === "dark";
  const cardProjects =
    projects.length > 0
      ? projects
      : images.map((url, index) => ({
          id: `image-${index}`,
          category: "Projet",
          year: "",
          title: `Projet ${index + 1}`,
          description: "",
          tags: [],
          status: "",
          statusColor: "#9CA3AF",
          href: "#",
          image: url,
          topGradient: "from-[#3F3F46] via-[#52525B] to-[#71717A]",
        }));

  const cards = cardProjects.length > 0 ? cardProjects : DEFAULT_PROJECTS;

  return (
    <div className="relative mx-auto w-full max-w-7xl px-2 sm:px-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((project, index) => (
          <Link
            key={project.id || index}
            to={project.href || "#"}
            className="group block"
            aria-label={`Ouvrir ${project.title || "le projet"}`}
          >
            <motion.article
              initial={{ opacity: 0, y: 32, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
              className={`relative h-full overflow-hidden rounded-[32px] transition-all duration-500 ${
                isDarkMode
                  ? "border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_16px_48px_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.32)]"
                  : "border border-black/10 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
              }`}
            >
              {/* Premium gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/[0.02] to-white/0" />

              {/* Hero image section with premium effects */}
              <div
                className={`relative h-[280px] overflow-hidden bg-gradient-to-br ${project.topGradient || "from-[#3F3F46] via-[#52525B] to-[#71717A]"}`}
              >
                {project.image ? (
                  <>
                    <img
                      src={project.image}
                      alt={project.title || "project"}
                      className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${
                        grayscale ? "grayscale" : ""
                      } ${logoOnly ? "opacity-80" : "opacity-100"}`}
                    />
                    {/* Premium overlay gradient */}
                    <div
                      className={`absolute inset-0 opacity-100 group-hover:opacity-70 transition-opacity duration-500 ${
                        isDarkMode
                          ? "bg-gradient-to-t from-black/60 via-black/30 to-transparent"
                          : "bg-gradient-to-t from-black/30 via-black/10 to-transparent"
                      }`}
                    />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                )}

                {/* Icon button with premium styling */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full border px-0 text-2xl backdrop-blur-sm ${
                      isDarkMode
                        ? "border-white/30 bg-black/40 text-white"
                        : "border-black/10 bg-white/90 text-black"
                    }`}
                  >
                    <ArrowUpRight
                      size={22}
                      strokeWidth={2.25}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Accent line top removed per request */}
              </div>

              {/* Content section matching the reference: dark strip with title and badge */}
              <div
                className={`relative z-20 flex items-center justify-between gap-4 px-4 py-5 sm:px-5 ${
                  isDarkMode ? "bg-[#232325]" : "bg-white"
                }`}
              >
                <h3
                  className={`min-w-0 text-[1.15rem] font-semibold leading-tight tracking-[-0.02em] sm:text-[1.35rem] ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {project.title}
                </h3>

                <span
                  className={`shrink-0 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] transition-all duration-300 ${
                    isDarkMode
                      ? "border-white/16 bg-transparent text-white/80 shadow-[0_6px_18px_rgba(255,255,255,0.03)] group-hover:border-white/30 group-hover:shadow-[0_10px_28px_rgba(255,255,255,0.05)]"
                      : "border-black/10 bg-black/5 text-black/70 shadow-[0_6px_18px_rgba(0,0,0,0.04)] group-hover:border-black/20 group-hover:shadow-[0_10px_28px_rgba(0,0,0,0.06)]"
                  }`}
                >
                  {project.category || "PROJET"}
                </span>
              </div>

              {/* Premium border glow effect on hover */}
              <div className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border border-white/20 shadow-[inset_0_0_40px_rgba(255,255,255,0.1)]" />
            </motion.article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RollingGallery;
