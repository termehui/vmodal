import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import copy from "rollup-plugin-copy";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        dts({ rollupTypes: true }),
        copy({
            hook: "writeBundle",
            targets: [
                { src: "src/termeh.scss", dest: "dist", rename: "style.scss" },
            ],
        }),
    ],
    resolve: {
        preserveSymlinks: true,
    },
    build: {
        cssCodeSplit: true,
        sourcemap: true,
        lib: {
            entry: resolve(__dirname, "src", "index.ts"),
            name: "vModal",
            fileName: (format) => `vmodal.${format}.js`,
        },
        rollupOptions: {
            external: ["vue", "animejs", "shortid"],
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === "index.css") return "style.css";
                    return assetInfo.name || "";
                },
                globals: { vue: "Vue" },
            },
        },
    },
});
