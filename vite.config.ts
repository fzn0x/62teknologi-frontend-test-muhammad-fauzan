import { dependencies } from "./package.json";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression2";

const exclVendors = ["react", "react-router-dom", "react-dom"];

function renderChunks(deps) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (exclVendors.includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteCompression()],
  optimizeDeps: {
    // 👈 optimizedeps
    esbuildOptions: {
      target: "esnext",
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      supported: {
        bigint: true,
      },
    },
  },
  build: {
    target: ["esnext"], // 👈 build.target
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          ...renderChunks(dependencies),
        },
      },
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        warn(warning);
      },
    },
  },
});
