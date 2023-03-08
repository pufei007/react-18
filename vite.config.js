const path = require("path");
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cesium from "vite-plugin-cesium";

export default ({ mode }) => {
  return defineConfig({
    // server: {
    //   open: true,
    // port: 8080
    // },
    plugins: [
      react(),
      cesium({
        rebuildCesium: true,
      }),
    ],
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
    },
    resolve: {
      // 配置路径别名
      alias: {
        "@": path.resolve(__dirname, "./src"),
        utils: path.resolve(__dirname, "src/utils"),
      },
    },
    css: {
      // 配置 less ，vite 不用安装 less 只要配置
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  });
};
