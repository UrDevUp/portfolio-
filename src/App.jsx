import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./theme";
import { lazy, Suspense } from "react";
const Home = lazy(() => import("./pages/Home"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService.jsx"));
import "./i18n";
import Loading from "./layouts/Loading";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
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
      </Router>
    </ThemeProvider>
  );
};

export default App;
