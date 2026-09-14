import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/hubs": { target: "http://localhost:5062", ws: true },
      "/api": { target: "http://localhost:5062" },
    },
  },
});
