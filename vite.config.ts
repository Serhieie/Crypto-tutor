import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Crypto-tutor",
  build: {
    outDir: "dist",
    assetsDir: ".",
  },
});
