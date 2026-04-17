import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./theme";
import SeoHead from "@/components/seo/SeoHead";
import WhatsAppFloatingButton from "@/components/ui/WhatsAppFloatingButton";
import Home from "./pages/Home";
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService.jsx"));
import "./i18n";
import Loading from "./layouts/Loading";

const App = () => {
  useEffect(() => {
    const preloadRoutes = () => {
      void import("./pages/PrivacyPolicy");
      void import("./pages/TermsOfService.jsx");
    };

    if (typeof window === "undefined") return;

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(preloadRoutes, { timeout: 2000 });
      return;
    }

    const timer = window.setTimeout(preloadRoutes, 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <SeoHead />
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen dark:bg-[#131313]">
              <Loading />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            {/* Ajoutez d'autres routes ici */}
          </Routes>
        </Suspense>
        <WhatsAppFloatingButton />
      </Router>
    </ThemeProvider>
  );
};

export default App;
