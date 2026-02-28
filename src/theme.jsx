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
  const theme = "light";

  // Force light mode only
  React.useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }, []);

  const toggleTheme = () => {
    // No-op: light theme only
  };

  const currentTheme = themes.light;

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
