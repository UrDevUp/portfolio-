import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

const enableAnalyzer = process.env.ANALYZE === "true";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), enableAnalyzer && visualizer({ open: true })].filter(
    Boolean
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
          if (id.includes("@fortawesome")) return "vendor_icons_fa";
          if (id.includes("framer-motion")) return "vendor_motion";
          if (id.includes("i18next")) return "vendor_i18n";
          if (id.includes("react-router-dom")) return "vendor_router";
          if (id.includes("ogl") || id.includes("animejs")) return "vendor_fx";
          return "vendor";
        },
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
      },
      format: {
        comments: false,
      },
    },
  },
});
