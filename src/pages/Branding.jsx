import React, { useEffect, useState } from "react";
import ScrollStack, {
  ScrollStackItem,
} from "@/components/animation/ScrollStack";
import { useTranslation } from "react-i18next";
import Loading from "@/layouts/Loading";

const brandingItems = [
  {
    src: "./assets/images/menu2.webp",
    alt: "Branding preview Betty",
    galleryItems: [
      {
        src: "./assets/images/menu1.webp",
        alt: "Branding gallery Betty 2",
      },
      {
        src: "./assets/images/menu2.webp",
        alt: "Branding gallery Betty CD",
      },
    ],
  },
  // {
  //   src: "./assets/images/kio2.webp",
  //   alt: "Branding preview Kio",
  //   galleryItems: [
  //     {
  //       src: "./assets/images/kio.webp",
  //       alt: "Branding gallery Kio",
  //     },
  //     {
  //       src: "./assets/images/ph_H.webp",
  //       alt: "Branding gallery Kio PH",
  //     },
  //   ],
  // },
  // {
  //   src: "./assets/images/luxydev.webp",
  //   alt: "Branding preview LuxyDev",
  //   galleryItems: [
  //     {
  //       src: "./assets/images/logo_dev.webp",
  //       alt: "Branding gallery LuxyDev logo",
  //     },
  //     {
  //       src: "./assets/images/menu1.webp",
  //       alt: "Branding gallery LuxyDev menu",
  //     },
  //   ],
  // },
  // {
  //   src: "./assets/images/logo_luxy.webp",
  //   alt: "Branding preview logo Luxy",
  //   galleryItems: [
  //     {
  //       src: "./assets/images/menu2.webp",
  //       alt: "Branding gallery Luxy menu",
  //     },
  //     {
  //       src: "./assets/images/ph_F.webp",
  //       alt: "Branding gallery Luxy PH",
  //     },
  //   ],
  // },
];

const Branding = () => {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const activeGalleryItems =
    selectedIndex === null ? [] : brandingItems[selectedIndex].galleryItems;

  const openGallery = (index) => {
    setSelectedIndex(index);
    setPreviewIndex(0);
    setIsPreviewLoading(true);
  };
  const closeGallery = () => {
    setSelectedIndex(null);
    setPreviewIndex(0);
    setIsPreviewLoading(false);
  };

  const goToPrevious = () => {
    setPreviewIndex((prev) =>
      activeGalleryItems.length <= 1
        ? 0
        : (prev - 1 + activeGalleryItems.length) % activeGalleryItems.length,
    );
  };

  const goToNext = () => {
    setPreviewIndex((prev) =>
      activeGalleryItems.length <= 1
        ? 0
        : (prev + 1) % activeGalleryItems.length,
    );
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowLeft") goToPrevious();
      if (event.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIndex, activeGalleryItems.length]);

  useEffect(() => {
    if (selectedIndex !== null) {
      setIsPreviewLoading(true);
    }
  }, [previewIndex, selectedIndex]);

  return (
    <section
      id="branding"
      className="relative w-full overflow-hidden bg-[#f5f5f5] px-4 pb-24 pt-14 text-black sm:px-6 md:px-10"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-10 flex items-center justify-center md:mb-14">
          <h2 className="text-center text-4xl sm:text-5xl md:text-6xl font-bold mb-8 sm:mb-10 bg-gradient-to-r dark:from-white dark:via-[#000000] dark:to-[#000000] from-black bg-clip-text text-transparent">
            {t("branding")}
          </h2>
        </div>

        <ScrollStack
          className="mx-auto max-w-4xl pb-20"
          useWindowScroll={true}
          itemDistance={90}
          itemScale={0.035}
          itemStackDistance={26}
          stackPosition="18%"
          scaleEndPosition="12%"
          baseScale={0.87}
          rotationAmount={1.2}
          blurAmount={0.4}
        >
          {brandingItems.map((item, index) => (
            <ScrollStackItem
              key={`${item.src}-${index}`}
              itemClassName="group border border-black/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.14)]"
            >
              <button
                type="button"
                onClick={() => openGallery(index)}
                className="block w-full text-left"
                aria-label={`Open ${item.alt}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-[190px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[240px] md:h-[290px]"
                  loading="lazy"
                />
              </button>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>

      {selectedIndex !== null && activeGalleryItems.length > 0 ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeGallery}
        >
          <div
            className="w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
              {isPreviewLoading ? (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/90">
                  <Loading />
                </div>
              ) : null}

              <img
                src={activeGalleryItems[previewIndex].src}
                alt={activeGalleryItems[previewIndex].alt}
                className="h-[52vh] w-full object-contain sm:h-[62vh]"
                onLoad={() => setIsPreviewLoading(false)}
                onError={() => setIsPreviewLoading(false)}
              />
              <button
                type="button"
                onClick={closeGallery}
                className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-black"
              >
                X
              </button>
              <button
                type="button"
                onClick={goToPrevious}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-xl font-bold text-black"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-xl font-bold text-black"
                aria-label="Next image"
              >
                ›
              </button>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {activeGalleryItems.map((item, index) => (
                <button
                  type="button"
                  key={`${item.src}-thumb`}
                  onClick={() => setPreviewIndex(index)}
                  className={`shrink-0 overflow-hidden rounded-lg border-2 ${
                    index === previewIndex ? "border-white" : "border-white/30"
                  }`}
                  aria-label={`Show ${item.alt}`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-16 w-24 object-cover sm:h-20 sm:w-28"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Branding;
