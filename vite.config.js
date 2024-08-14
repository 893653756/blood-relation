import { defineConfig } from "vite";

export default defineConfig({
  server: {
    open: true,
  },
  build: {
    lib: {
      entry: "./lib/index.js",
      name: "BloodRelation",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["@antv/g6"],
    },
  },
});
