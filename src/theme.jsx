"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const themes = {
  light: {
    colors: {
      primary: "#007bff",
      secondary: "#6c757d",
      background: "#f5f5f5",
      text: "#000000",
      error: "#dc3545",
      success: "#28a745",
    },
    fonts: {
      body: "system-ui, sans-serif",
      heading: "system-ui, sans-serif",
    },
    spacing: {
      small: "0.5rem",
      medium: "1rem",
      large: "2rem",
    },
    borderRadius: {
      small: "0.25rem",
      medium: "0.5rem",
      large: "1rem",
    },
  },
  dark: {
    colors: {
      primary: "#0d6efd",
      secondary: "#495057",
      background: "#121212",
      text: "#ffffff",
      error: "#dc3545",
      success: "#28a745",
    },
    fonts: {
      body: "system-ui, sans-serif",
      heading: "system-ui, sans-serif",
    },
    spacing: {
      small: "0.5rem",
      medium: "1rem",
      large: "2rem",
    },
    borderRadius: {
      small: "0.25rem",
      medium: "0.5rem",
      large: "1rem",
    },
  },
};

const ThemeContext = createContext();

// Le script inline de index.html a deja pose la classe sur <html> avant le paint.
// On lit ce resultat pour que le premier rendu React soit deja dans le bon theme :
// plusieurs composants (Header, Hero) choisissent leurs classes via `themeName` en JS,
// donc un etat initial faux provoquerait un flash meme avec le CSS correct.
function getInitialTheme() {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("dark", theme === "dark");
    html.setAttribute("data-theme", theme);
  }, [theme]);

  // Tant que l'utilisateur n'a rien choisi explicitement, on continue de suivre
  // l'OS. Persister des le premier rendu figerait la preference et le site
  // ignorerait un passage ulterieur en mode sombre.
  useEffect(() => {
    let stored = null;
    try {
      stored = window.localStorage.getItem("theme");
    } catch {
      return;
    }
    if (stored === "dark" || stored === "light") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event) => setTheme(event.matches ? "dark" : "light");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = () => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      try {
        window.localStorage.setItem("theme", next);
      } catch {
        /* mode prive : le choix ne survivra pas au rechargement */
      }
      return next;
    });
  };

  const currentTheme = theme === "dark" ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider
      value={{ theme: currentTheme, themeName: theme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
