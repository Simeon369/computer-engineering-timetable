import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";
import icons from "./src/assets/icons.json";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],
      manifest: {
        name: "Timetable App",
        short_name: "Timetable",
        description: "A smart timetable management PWA",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "android/android-launchericon-512-512.png",
            sizes: "512x512",
          },
          {
            src: "android/android-launchericon-144-144.png",
            sizes: "144x144",
          },
        ],
      },
    }),
  ],
});
