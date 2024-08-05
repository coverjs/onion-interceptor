import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
      outDir: "dist",
      include: ".",
      exclude: "vite.config.ts",
    }),
  ],
  build: {
    lib: {
      entry: "./index.ts",
      name: "@onion-interceptor/pipes",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["onion-interceptor"],
    },
  },
});
