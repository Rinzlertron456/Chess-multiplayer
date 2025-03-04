import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// import path from "path";
// https://vite.dev/config/
export default defineConfig({
  // root: path.join(__dirname, "src"), // Update this path if your index.html is in a different directory
  plugins: [react(), tailwindcss()],
  // build: {
  //   rollupOptions: {
  //     input: {
  //       main: path.resolve(__dirname, "./index.html"), // Update this path if your index.html is in a different directory
  //     },
  //   },
  // },
});
