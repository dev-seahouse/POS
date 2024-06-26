import { defineConfig } from "vite";

import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: "localhost",
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./src/testing/setup-tests.ts"],
  },
});
