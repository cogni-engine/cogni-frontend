module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/code/cogni/cogni-frontend/apps/web/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "build/chunks/5fd8e__pnpm_adbaa85d._.js",
  "build/chunks/[root-of-the-server]__f971f511._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/code/cogni/cogni-frontend/apps/web/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];