const path = require("path");
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cesium from "vite-plugin-cesium";

export default ({ mode }) => {
  return defineConfig({
    // server: {
    //   open: true,
    // },
    plugins: [react(), cesium()],
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
    },
    resolve: {
      // 配置路径别名
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  });
};
