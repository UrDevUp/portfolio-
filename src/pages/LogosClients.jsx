import Loading from "@/layouts/Loading";
import React, { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";

const RollingGallery = lazy(() =>
  import("@/components/animation/RollingGallery")
);

const LogosClients = () => {
  const { t } = useTranslation();

  return (
    <section
      id="logos"
      className="flex flex-col items-center pt-20 pb-32 bg-[#f5f5f5] dark:bg-black relative h-[80dvh] md:h-screen w-full">
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-10 bg-gradient-to-r dark:from-white dark:via-[#000000] dark:to-[#000000] from-black  bg-clip-text text-transparent ">
        {t("sharedTrust")}
        <br />
        {t("measurableResults")}
      </h2>
      <Suspense fallback={<Loading />}>
        <RollingGallery
          images={[
            "./assets/images/beauty.webp",
            "./assets/images/carLuxe.webp",
            "./assets/images/dope.webp",
            // "./assets/images/beauty.webp",
            // "./assets/images/carLuxe.webp",
            // "./assets/images/dentiste.webp",
            "./assets/images/restaurent_logo.webp",
          ]}
          autoplay={true}
        />
      </Suspense>
    </section>
  );
};

export default LogosClients;
