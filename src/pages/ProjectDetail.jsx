import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { projects } from "@/data/galleryData";
import "@fortawesome/fontawesome-free/css/all.css";

const techStackStyles = `
  @keyframes techFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-4px); }
  }
  @keyframes techGlow {
    0%, 100% { box-shadow: 0 0 8px rgba(255, 255, 255, 0.1), inset 0 0 8px rgba(255, 255, 255, 0.05); }
    50% { box-shadow: 0 0 16px rgba(255, 255, 255, 0.2), inset 0 0 12px rgba(255, 255, 255, 0.1); }
  }
  .tech-badge {
    animation: techGlow 2s ease-in-out infinite;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .tech-badge:hover {
    animation: techFloat 1.5s ease-in-out infinite;
    transform: scale(1.08);
  }
  .tech-icon {
    display: inline-block;
    transition: transform 0.3s ease;
  }
  .tech-badge:hover .tech-icon {
    transform: scale(1.2) rotate(5deg);
  }
`;

const fallbackFeatures = [
  "Hero avec visuel principal",
  "Description courte du projet",
  "Bloc Problem / Solution",
  "Liste des fonctionnalités clés",
  "Technologies utilisées",
  "Section Images / video",
];

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches
    ) {
      navigate("/#projects");
      return;
    }

    navigate(-1);
  };

  const project = projects.find(
    (item) => item.slug === projectId || String(item.id) === projectId,
  );

  useEffect(() => {
    if (!project) return;
    document.title = `${project.title} | Projets`;
  }, [project]);

  // Ensure we show the top of the page (hero) when opening a project
  useEffect(() => {
    if (!project) return;
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#111213] px-6 py-20 text-white">
        <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.24em] text-white/45">
            Projet introuvable
          </p>
          <h1 className="text-4xl font-semibold sm:text-5xl">
            Cette fiche projet n&apos;existe pas.
          </h1>
          <p className="mt-4 max-w-xl text-white/65">
            Reviens à la galerie pour ouvrir une autre présentation de projet.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/15"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  const heroImage = project.detailImage || project.image;
  const mediaImages = project.media?.images?.length
    ? project.media.images
    : project.image
      ? [project.image]
      : [];
  const features = project.features?.length
    ? project.features
    : fallbackFeatures;
  const techStack = project.techStack?.length
    ? project.techStack
    : ["React", "Vite", "Tailwind CSS"];
  const clientLabel = project.client || project.title;
  const scopeLabel = project.scopeOfWork || techStack.slice(0, 3).join(" · ");

  return (
    <div className="min-h-screen bg-[#111213] text-white">
      <section className="relative overflow-hidden px-6 pb-14 pt-6 sm:pb-18 sm:pt-8 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(164,67,38,0.35),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(42,93,156,0.32),_transparent_40%)]" />
        <div className="relative mx-auto max-w-5xl">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handleBackClick}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10"
            >
              ← Back
            </button>

            <div className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/45 sm:inline-flex">
              Project Detail
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-5xl sm:mt-10">
            <div className="flex flex-col items-center gap-3 text-center">
              <h1 className="mt-1 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                {project.title}
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
                {project.shortDescription || project.description}
              </p>
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-8 text-center sm:grid-cols-3 sm:gap-10">
            <div>
              <p className="text-sm text-white/45">Client</p>
              <p className="mt-3 text-2xl font-medium tracking-tight sm:text-[2rem]">
                {clientLabel}
              </p>
            </div>
            <div>
              <p className="text-sm text-white/45">Year</p>
              <p className="mt-3 text-2xl font-medium tracking-tight sm:text-[2rem]">
                {project.links?.date || "2026"}
              </p>
            </div>
            <div>
              <p className="text-sm text-white/45">Scope of work</p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                {techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech.name || tech}
                    className="inline-flex items-center gap-1 text-xl font-medium tracking-tight sm:text-[2rem]"
                  >
                    {tech.icon ? (
                      <i className={`${tech.icon} text-lg sm:text-xl`}></i>
                    ) : null}
                    <span className="text-lg sm:text-2xl">
                      {tech.name || tech}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute right-2 top-2 z-20 block sm:-right-6 sm:-top-10">
              <a
                href={project.links?.website || "#"}
                target="_blank"
                rel="noreferrer"
                className="star-border-button star-border-button--double star-border-button--glass relative block h-20 w-20 transition hover:scale-110 sm:h-28 sm:w-28"
              >
                <svg
                  className="relative z-10 h-full w-full"
                  viewBox="0 0 120 120"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <path
                      id="circlePath"
                      d="M60,60 m -48,0 a48,48 0 1,0 96,0 a48,48 0 1,0 -96,0"
                      fill="none"
                    />
                  </defs>

                  <circle
                    cx="60"
                    cy="60"
                    r="55"
                    fill="rgba(0,0,0,0.42)"
                    stroke="rgba(255,255,255,0.14)"
                    strokeWidth="1"
                  />

                  <text
                    className="circular-text-rotator"
                    fill="#fff"
                    fontSize="6"
                    fontWeight="700"
                    letterSpacing="0.85"
                    textLength="252"
                    lengthAdjust="spacing"
                  >
                    <textPath
                      href="#circlePath"
                      startOffset="50%"
                      textAnchor="middle"
                    >
                      VISIT LIVE SITE • VISIT LIVE SITE •
                    </textPath>
                  </text>

                  <g transform="translate(60,60)">
                    <circle
                      cx="0"
                      cy="0"
                      r="26"
                      fill="rgba(255,255,255,0.08)"
                      stroke="rgba(255,255,255,0.14)"
                      strokeWidth="1"
                    />
                    <path d="M -6 -8 L 6 0 L -6 8 Z" fill="#fff" />
                  </g>
                </svg>
              </a>
            </div>

            <div className="overflow-hidden rounded-[36px] bg-gradient-to-br from-[#A44326]/20 via-[#4F8BCF]/10 to-[#111213] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-7">
              <div className="overflow-hidden rounded-[28px] border-[0.25px] border-white/10">
                {heroImage ? (
                  <img
                    src={heroImage}
                    alt={project.title}
                    className="relative h-[320px] w-full object-cover sm:h-[460px]"
                  />
                ) : (
                  <div className="flex h-[320px] items-center justify-center bg-black/20 text-white/45 sm:h-[460px]">
                    Hero image placeholder
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description / Problem / Solution section removed on user request */}

      <section className="px-6 pb-10 lg:px-10">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <article className="rounded-[28px] border border-white/10 bg-white/5 p-7 shadow-[0_10px_40px_rgba(0,0,0,0.15)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">
              Features
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-white/70 sm:text-base">
              {features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white/70" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[28px] border border-white/10 bg-white/5 p-7 shadow-[0_10px_40px_rgba(0,0,0,0.15)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">
              Tech stack
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {techStack.map((tech) => (
                <span
                  key={tech.name || tech}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80"
                >
                  {tech.icon ? <i className={tech.icon}></i> : null}
                  {tech.name || tech}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-10">
        <div className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-white/5 p-7 shadow-[0_10px_40px_rgba(0,0,0,0.15)] sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">
                Images / video
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Project visuals
              </h2>
            </div>
            {project.media?.video ? (
              <span className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/55 sm:inline-flex">
                Video available
              </span>
            ) : null}
          </div>

          <div className="mt-7 grid gap-6 lg:grid-cols-2">
            <div className="grid gap-6">
              {mediaImages.slice(0, 2).map((image, index) => (
                <div
                  key={image}
                  className="overflow-hidden rounded-[24px] border border-white/10 bg-black/20"
                >
                  <img
                    src={image}
                    alt={`${project.title} capture ${index + 1}`}
                    className="h-[260px] w-full object-cover sm:h-[320px]"
                  />
                </div>
              ))}
            </div>

            <div className="grid gap-6">
              {project.media?.video ? (
                <div className="overflow-hidden rounded-[24px] border border-white/10 bg-black/20">
                  {project.media.video.includes("youtube") ? (
                    <iframe
                      title={`${project.title} video`}
                      src={project.media.video.replace("watch?v=", "embed/")}
                      className="aspect-video w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      controls
                      className="aspect-video w-full object-cover"
                      src={project.media.video}
                    />
                  )}
                </div>
              ) : (
                <div className="flex min-h-[260px] items-center justify-center rounded-[24px] border border-dashed border-white/15 bg-black/10 px-6 text-center text-white/55 sm:min-h-[320px]">
                  {/* Ajoute une vidéo si disponible pour enrichir cette section. */}
                </div>
              )}

              {mediaImages.slice(2, 4).map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="overflow-hidden rounded-[24px] border border-white/10 bg-black/20"
                >
                  <img
                    src={image}
                    alt={`${project.title} capture ${index + 3}`}
                    className="h-[220px] w-full object-cover sm:h-[260px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
