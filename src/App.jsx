import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./theme";
import { lazy, Suspense } from "react";
import SeoHead from "@/components/seo/SeoHead";
import WhatsAppFloatingButton from "@/components/ui/WhatsAppFloatingButton";
const Home = lazy(() => import("./pages/Home"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService.jsx"));
import "./i18n";
import Loading from "./layouts/Loading";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <SeoHead />
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen dark:bg-black">
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
