import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-white dark:bg-[#111213] flex flex-col justify-center items-center px-6">
      <div className="text-center max-w-md">
        <p className="text-8xl sm:text-9xl font-bold text-black/15 dark:text-white/20 mb-2 select-none">
          404
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-black dark:text-white mb-4">
          {t("notFoundTitle")}
        </h1>
        <p className="text-lg text-black/70 dark:text-white/70 mb-8">
          {t("notFoundDescription")}
        </p>
        <Link
          to="/"
          className="inline-block bg-black text-white dark:bg-white dark:text-black px-8 py-3 rounded-full font-medium transition-colors hover:bg-gray-800 dark:hover:bg-white/90"
        >
          {t("backToHome")}
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
