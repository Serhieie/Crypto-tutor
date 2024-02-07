import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: { watch: { usePolling: true } },
  plugins: [react()],
  base: process.env.NODE_ENV === "production" ? "/Crypto-tutor/" : "/",
  build: {
    outDir: "dist",
    assetsDir: ".",
  },

  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
