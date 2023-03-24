const path = require("path");
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import reactRefresh from "@vitejs/plugin-react-refresh";
import cesium from "vite-plugin-cesium";
import { visualizer } from "rollup-plugin-visualizer";
import gzipPlugin from "rollup-plugin-gzip";

export default ({ mode }) => {
  return defineConfig({
    // base: "./",
    // cors: true, // 默认启⽤并允许任何源
    // open: true, // 在服务器启动时⾃动在浏览器中打开应⽤程序
    //反向代理配置，注意rewrite写法，开始没看⽂档在这⾥踩了坑
    // proxy: {},
    // port: 8080,
    hmr: true, //开启热更新
    plugins: [
      react(),
      // reactRefresh(),
      // 设置开启生产打包分析文件大小功能
      // visualizer({
      //   open: true, //注意这里要设置为true，否则无效
      //   gzipSize: true,
      //   brotliSize: true,
      // }),
      cesium({
        // rebuildCesium: true,
      }),
    ],
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
    },
    resolve: {
      // 配置路径别名
      alias: {
        "@": path.resolve(__dirname, "./src"),
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
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          // 默认是 false。移除 console
          drop_console: mode === "prod",
          // 默认是 true。移除 debugger
          drop_debugger: mode === "prod",
        },
      },
      rollupOptions: {
        plugins: [gzipPlugin()],
      },
    },
  });
};
