// https://vitejs.dev/config/
import { defineConfig, loadEnv } from "vite";
import type { ConfigEnv } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue(),
      // -- 浏览器兼容
      legacy({
        targets: ["defaults", "not IE 11"],
      }),
      // -- 组件按需加载
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        assets: resolve(__dirname, "src/assets"),
        comps: resolve(__dirname, "src/components"),
      },
    },
    server: {
      open: true,
      //配置自定义代理规则
      [env.VITE_APP_BASE_API]: {
        target: env.VITE_APP_BASE_URL,
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
      },
    },
    build: {
      sourcemap: env.VITE_ENV !== "prod",
      // -- chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 2000,
      // -- 启用/禁用 gzip 压缩大小报告
      reportCompressedSize: false,
    },
  };
});
