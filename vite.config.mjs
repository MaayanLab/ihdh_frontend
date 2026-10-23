import { defineConfig, transformWithOxc } from "vite";
import react from "@vitejs/plugin-react";

const legacyJsx = {
  name: "legacy-jsx-in-js",
  enforce: "pre",
  async transform(code, id) {
    if (!id.includes("/src/") || !id.endsWith(".js")) return null;
    return transformWithOxc(code, id, {
      lang: "jsx",
      jsx: { runtime: "automatic" },
    });
  },
};

export default defineConfig({
  plugins: [legacyJsx, react()],
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});
