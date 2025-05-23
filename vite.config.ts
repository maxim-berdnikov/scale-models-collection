import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [tailwindcss(), tsconfigPaths(), react()],
  base: "https://maxim-berdnikov.github.io/scale-models-collection/",
});
