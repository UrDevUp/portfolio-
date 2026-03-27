import { useEffect, useState } from "react";

const INTRO_EXIT_DELAY_MS = 1700;
const INTRO_TOTAL_MS = 2500;

const FirstVisitIntro = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
    }, INTRO_EXIT_DELAY_MS);

    const completeTimer = window.setTimeout(() => {
      onComplete?.();
    }, INTRO_TOTAL_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-black transition-all duration-700 ease-out ${
        isExiting ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
      role="dialog"
      aria-label="UrDevUp introduction"
      aria-modal="true"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(213,192,92,0.22),_transparent_58%)]" />
      <div className="relative z-10 flex flex-col items-center gap-5">
        <img
          src="/assets/images/logo.svg"
          alt="URDEVUP logo"
          className="first-visit-logo-enter h-20 w-20 sm:h-24 sm:w-24"
          draggable={false}
        />
        <p className="first-visit-logo-enter text-2xl font-bold tracking-[0.35em] text-white sm:text-3xl">
          URDEVUP
        </p>
      </div>
    </div>
  );
};

export default FirstVisitIntro;
