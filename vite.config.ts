import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: "src/client", // React app lives here
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/client"), // 🔧 updated to point to React source
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:4000", // NestJS backend
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist"), // full path to keep it consistent
    emptyOutDir: true,
  },
});
