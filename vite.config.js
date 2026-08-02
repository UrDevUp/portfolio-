import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

const enableAnalyzer = process.env.ANALYZE === "true";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), enableAnalyzer && visualizer({ open: true })].filter(
    Boolean,
  ),
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("gsap")) return "vendor_gsap";
          if (id.includes("lucide-react")) return "vendor_icons";
          if (id.includes("framer-motion")) return "vendor_motion";
          if (id.includes("i18next")) return "vendor_i18n";
          if (id.includes("ogl")) return "vendor_fx";
          if (id.includes("lenis")) return "vendor_lenis";
          // react-router change bien plus souvent que react lui-meme : le
          // separer evite d'invalider le gros chunk react a chaque mise a jour.
          if (id.includes("react-router")) return "vendor_router";
          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("scheduler")
          ) {
            return "vendor_react";
          }
          return "vendor";
        },
      },
    },
    minify: "esbuild",
  },
  // `esbuild` est une option racine de Vite : imbriquee sous `build`, elle est ignoree
  // silencieusement et les console.* partent en production.
  esbuild: {
    drop: ["console", "debugger"],
  },
});
