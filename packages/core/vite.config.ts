import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import terser from "@rollup/plugin-terser";

export default defineConfig({
  plugins: [
    dts({
      outDir: "dist",
      rollupTypes: true,
      include: "./src",
      exclude: ["vite.config.ts"],
    }),
    terser({
      format: {
        comments: false,
        beautify: false,
        semicolons: false,
        braces: false,
        shorthand: true,
      },
      compress: {
        arguments: true,
        dead_code: true,
        drop_console: true,
        drop_debugger: true,
        passes: 6,
      },
      mangle: {
        toplevel: true,
        eval: true,
        keep_classnames: false,
        keep_fnames: false,
      },
    }),
  ],
  build: {
    minify: false,
    lib: {
      entry: "./src/index.ts",
      name: "onion-interceptor",
      fileName: "index",
      formats: ["es", "cjs"],
    },
  },
});
