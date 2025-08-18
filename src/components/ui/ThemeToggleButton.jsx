import React from "react";
import { useTheme } from "../../theme";
import Sun from "lucide-react/dist/esm/icons/sun";
import Moon from "lucide-react/dist/esm/icons/moon";

const ThemeToggleButton = () => {
  const { themeName, toggleTheme } = useTheme();
  const isDarkMode = themeName === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex items-center justify-center p-2 rounded-full transition-colors duration-300 shadow-md border-none focus:outline-none ${
        isDarkMode ? "bg-gray-800 text-[#D5C05C]" : "bg-gray-200 text-gray-800"
      }`}
      style={{ width: 44, height: 44 }}>
      {isDarkMode ? (
        <Moon size={24} className="mx-auto" />
      ) : (
        <Sun size={24} className="mx-auto" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
