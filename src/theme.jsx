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

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, fallback to dark mode
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark";
  });

  // Set Tailwind dark mode class on <html> for global theme
  React.useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    // Save theme preference to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const currentTheme = themes[theme];

  return (
    <ThemeContext.Provider
      value={{ theme: currentTheme, themeName: theme, toggleTheme }}>
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
