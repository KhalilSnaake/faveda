module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/produits/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "default",
    ()=>ProductsPage,
    "dynamic",
    ()=>dynamic,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/index.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$seed$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/seed.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductExplorer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductExplorer.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RitualPack$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RitualPack.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$catalog$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/catalog.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/storage.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/select.js [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$seed$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$seed$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
const dynamic = "force-dynamic";
const metadata = {
    title: "Boutique"
};
async function ProductsPage() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$seed$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureSeeded"])();
    const rows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeProductImages"])(await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"]).orderBy((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["asc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].id)));
    const packs = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$catalog$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ritualPacks"].map((pack)=>({
            ...pack,
            products: pack.slugs.map((slug)=>rows.find((product)=>product.slug === slug)).filter((product)=>Boolean(product))
        })).filter((pack)=>pack.products.length > 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "mx-auto max-w-7xl px-5 py-12 md:px-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs uppercase tracking-[0.22em] text-gold-deep",
                children: "Collection botanique"
            }, void 0, false, {
                fileName: "[project]/src/app/produits/page.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "mt-2 font-display text-5xl text-leaf-dark",
                children: "Tous les soins Faveda"
            }, void 0, false, {
                fileName: "[project]/src/app/produits/page.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 max-w-2xl text-muted",
                children: "Recherchez, filtrez, enregistrez vos favoris. Codes promo : FAVEDA10, NATURE15, LIVRAISON."
            }, void 0, false, {
                fileName: "[project]/src/app/produits/page.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            packs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 grid gap-4 md:grid-cols-2",
                children: packs.map((pack)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RitualPack$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RitualPack"], {
                        title: pack.title,
                        description: pack.description,
                        badge: pack.badge,
                        products: pack.products
                    }, pack.id, false, {
                        fileName: "[project]/src/app/produits/page.tsx",
                        lineNumber: 39,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/produits/page.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductExplorer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProductExplorer"], {
                products: rows
            }, void 0, false, {
                fileName: "[project]/src/app/produits/page.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/produits/page.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/app/produits/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/produits/page.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/components/ProductExplorer.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductExplorer",
    ()=>ProductExplorer
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ProductExplorer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ProductExplorer() from the server but ProductExplorer is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ProductExplorer.tsx", "ProductExplorer");
}),
"[project]/src/components/ProductExplorer.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductExplorer",
    ()=>ProductExplorer
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ProductExplorer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ProductExplorer() from the server but ProductExplorer is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ProductExplorer.tsx <module evaluation>", "ProductExplorer");
}),
"[project]/src/components/ProductExplorer.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductExplorer$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ProductExplorer.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductExplorer$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/ProductExplorer.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductExplorer$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/RitualPack.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RitualPack",
    ()=>RitualPack
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const RitualPack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call RitualPack() from the server but RitualPack is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/RitualPack.tsx", "RitualPack");
}),
"[project]/src/components/RitualPack.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RitualPack",
    ()=>RitualPack
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const RitualPack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call RitualPack() from the server but RitualPack is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/RitualPack.tsx <module evaluation>", "RitualPack");
}),
"[project]/src/components/RitualPack.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RitualPack$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/RitualPack.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RitualPack$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/RitualPack.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RitualPack$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/db/index.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "db",
    ()=>db,
    "isUsingSupabase",
    ()=>isUsingSupabase,
    "pool",
    ()=>pool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/node-postgres/driver.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/node_modules/pg)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
/**
 * Supabase is standard PostgreSQL. The application keeps using Drizzle while
 * switching transparently to Supabase whenever SUPABASE_DATABASE_URL is set.
 *
 * Recommended value: Supabase Shared Pooler / Session Pooler URL from the
 * Connect panel. Direct URLs also work for long-lived deployments and migrations.
 */ const databaseUrl = process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error("SUPABASE_DATABASE_URL or DATABASE_URL is required");
}
const isSupabase = databaseUrl.includes("supabase.co") || databaseUrl.includes("pooler.supabase.com") || Boolean(process.env.SUPABASE_DATABASE_URL);
const poolMax = Number(process.env.DB_POOL_MAX || (isSupabase ? "5" : "10"));
const useSsl = isSupabase || process.env.DATABASE_SSL === "true";
const globalForDb = globalThis;
const pool = globalForDb.__favedaPostgresPool ?? new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["Pool"]({
    connectionString: databaseUrl,
    max: Number.isFinite(poolMax) ? poolMax : 5,
    idleTimeoutMillis: 20_000,
    connectionTimeoutMillis: 10_000,
    ssl: useSsl ? {
        // Supabase offers its root certificate in the Connect panel. Set this
        // env var to true only when a matching CA is configured in the host.
        rejectUnauthorized: process.env.SUPABASE_SSL_REJECT_UNAUTHORIZED === "true"
    } : undefined
});
if ("TURBOPACK compile-time truthy", 1) {
    globalForDb.__favedaPostgresPool = pool;
}
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["drizzle"])(pool, {
    schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
});
const isUsingSupabase = isSupabase;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/db/schema.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminAuditLogs",
    ()=>adminAuditLogs,
    "adminUsers",
    ()=>adminUsers,
    "applications",
    ()=>applications,
    "drivers",
    ()=>drivers,
    "jobs",
    ()=>jobs,
    "messages",
    ()=>messages,
    "notifications",
    ()=>notifications,
    "orderItems",
    ()=>orderItems,
    "orders",
    ()=>orders,
    "products",
    ()=>products,
    "videos",
    ()=>videos
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/boolean.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/double-precision.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/integer.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/table.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/serial.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/text.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/timestamp.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/varchar.js [app-rsc] (ecmascript)");
;
const products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pgTable"])("products", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    slug: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("slug", {
        length: 120
    }).notNull().unique(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("name", {
        length: 200
    }).notNull(),
    subtitle: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("subtitle", {
        length: 240
    }).notNull(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("description").notNull(),
    usage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("usage").notNull(),
    ingredients: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("ingredients").notNull(),
    volume: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("volume", {
        length: 80
    }).notNull(),
    category: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("category", {
        length: 80
    }).notNull(),
    price: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["integer"])("price").notNull(),
    image: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("image", {
        length: 300
    }).notNull(),
    benefits: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("benefits").notNull().default("[]"),
    stock: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["integer"])("stock").notNull().default(40),
    featured: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["boolean"])("featured").notNull().default(false),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["timestamp"])("created_at").defaultNow().notNull()
});
const drivers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pgTable"])("drivers", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("name", {
        length: 120
    }).notNull(),
    phone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("phone", {
        length: 40
    }).notNull(),
    vehicle: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("vehicle", {
        length: 80
    }).notNull(),
    zone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("zone", {
        length: 120
    }).notNull(),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("status", {
        length: 30
    }).notNull().default("available"),
    username: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("username", {
        length: 60
    }).notNull().default(""),
    passwordHash: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("password_hash", {
        length: 200
    }).notNull().default(""),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["timestamp"])("created_at").defaultNow().notNull()
});
const orders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pgTable"])("orders", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    trackingCode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("tracking_code", {
        length: 20
    }).notNull().unique(),
    confirmationCode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("confirmation_code", {
        length: 4
    }).notNull(),
    customerName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("customer_name", {
        length: 160
    }).notNull(),
    customerPhone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("customer_phone", {
        length: 40
    }).notNull(),
    customerEmail: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("customer_email", {
        length: 160
    }),
    address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("address").notNull(),
    city: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("city", {
        length: 120
    }).notNull(),
    landmark: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("landmark", {
        length: 200
    }),
    notes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("notes"),
    latitude: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["doublePrecision"])("latitude"),
    longitude: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["doublePrecision"])("longitude"),
    paymentMethod: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("payment_method", {
        length: 40
    }).notNull(),
    paymentPhone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("payment_phone", {
        length: 40
    }),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("status", {
        length: 30
    }).notNull().default("pending"),
    driverId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["integer"])("driver_id").references(()=>drivers.id),
    subtotal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["integer"])("subtotal").notNull(),
    deliveryFee: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["integer"])("delivery_fee").notNull().default(1500),
    discount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["integer"])("discount").notNull().default(0),
    total: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["integer"])("total").notNull(),
    promoCode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("promo_code", {
        length: 40
    }),
    adminNotes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("admin_notes"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["timestamp"])("created_at").defaultNow().notNull(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").defaultNow().notNull(),
    deliveredAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["timestamp"])("delivered_at")
});
const messages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pgTable"])("messages", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("name", {
        length: 160
    }).notNull(),
    phone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("phone", {
        length: 40
    }),
    email: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("email", {
        length: 160
    }),
    kind: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("kind", {
        length: 30
    }).notNull().default("contact"),
    content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("content").notNull(),
    rating: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["integer"])("rating"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["timestamp"])("created_at").defaultNow().notNull()
});
const videos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pgTable"])("videos", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    slug: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("slug", {
        length: 120
    }).notNull().unique(),
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("title", {
        length: 200
    }).notNull(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("description").notNull(),
    category: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("category", {
        length: 60
    }).notNull(),
    thumbnail: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("thumbnail", {
        length: 400
    }).notNull(),
    videoUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("video_url", {
        length: 400
    }).notNull(),
    platform: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("platform", {
        length: 40
    }).notNull().default("faveda"),
    externalUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("external_url", {
        length: 400
    }),
    duration: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["integer"])("duration").notNull().default(0),
    views: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["integer"])("views").notNull().default(0),
    productSlug: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("product_slug", {
        length: 120
    }),
    featured: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["boolean"])("featured").notNull().default(false),
    published: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["boolean"])("published").notNull().default(true),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["timestamp"])("created_at").defaultNow().notNull()
});
const notifications = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pgTable"])("notifications", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    audience: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("audience", {
        length: 20
    }).notNull().default("admin"),
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("type", {
        length: 40
    }).notNull(),
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("title", {
        length: 200
    }).notNull(),
    body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("body").notNull(),
    orderId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["integer"])("order_id"),
    trackingCode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("tracking_code", {
        length: 20
    }),
    read: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["boolean"])("read").notNull().default(false),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["timestamp"])("created_at").defaultNow().notNull()
});
const adminUsers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pgTable"])("admin_users", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("name", {
        length: 120
    }).notNull(),
    username: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("username", {
        length: 60
    }).notNull().unique(),
    passwordHash: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("password_hash", {
        length: 200
    }).notNull(),
    role: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("role", {
        length: 30
    }).notNull().default("manager"),
    active: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["boolean"])("active").notNull().default(true),
    mustChangePassword: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["boolean"])("must_change_password").notNull().default(false),
    lastLoginAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["timestamp"])("last_login_at"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["timestamp"])("created_at").defaultNow().notNull()
});
const adminAuditLogs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pgTable"])("admin_audit_logs", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    actorAdminId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["integer"])("actor_admin_id").references(()=>adminUsers.id),
    action: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("action", {
        length: 80
    }).notNull(),
    entityType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("entity_type", {
        length: 40
    }).notNull(),
    entityId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("entity_id", {
        length: 80
    }),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("description").notNull(),
    meta: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("meta"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["timestamp"])("created_at").defaultNow().notNull()
});
const jobs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pgTable"])("jobs", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("title", {
        length: 200
    }).notNull(),
    department: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("department", {
        length: 120
    }).notNull(),
    location: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("location", {
        length: 120
    }).notNull(),
    contract: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("contract", {
        length: 80
    }).notNull(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("description").notNull(),
    requirements: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("requirements").notNull(),
    active: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["boolean"])("active").notNull().default(true),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["timestamp"])("created_at").defaultNow().notNull()
});
const applications = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pgTable"])("applications", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    jobId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["integer"])("job_id").references(()=>jobs.id, {
        onDelete: "set null"
    }),
    kind: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("kind", {
        length: 30
    }).notNull().default("spontaneous"),
    fullName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("full_name", {
        length: 160
    }).notNull(),
    email: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("email", {
        length: 160
    }),
    phone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("phone", {
        length: 40
    }),
    city: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("city", {
        length: 120
    }),
    experience: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("experience", {
        length: 120
    }),
    profileLink: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("profile_link", {
        length: 300
    }),
    message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("message").notNull(),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("status", {
        length: 30
    }).notNull().default("new"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["timestamp"])("created_at").defaultNow().notNull()
});
const orderItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pgTable"])("order_items", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    orderId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["integer"])("order_id").notNull().references(()=>orders.id, {
        onDelete: "cascade"
    }),
    productId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["integer"])("product_id").notNull().references(()=>products.id),
    productName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("product_name", {
        length: 200
    }).notNull(),
    productImage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["varchar"])("product_image", {
        length: 300
    }).notNull(),
    unitPrice: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["integer"])("unit_price").notNull(),
    quantity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["integer"])("quantity").notNull()
});
}),
"[project]/src/db/seed.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "ensureSeeded",
    ()=>ensureSeeded
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$functions$2f$aggregate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/functions/aggregate.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/index.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$catalog$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/catalog.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
async function ensureSeeded() {
    const [productStats] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].select({
        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$functions$2f$aggregate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["count"])()
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"]);
    if ((productStats?.value ?? 0) === 0) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"]).values(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$catalog$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["catalogProducts"].map((product)=>({
                ...product,
                benefits: JSON.stringify(product.benefits)
            })));
    }
    const [driverStats] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].select({
        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$functions$2f$aggregate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["count"])()
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["drivers"]);
    if ((driverStats?.value ?? 0) === 0) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["drivers"]).values(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$catalog$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["catalogDrivers"].map(({ password, ...driver })=>({
                ...driver,
                passwordHash: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hashPassword"])(password)
            })));
    }
    const [videoStats] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].select({
        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$functions$2f$aggregate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["count"])()
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["videos"]);
    if ((videoStats?.value ?? 0) === 0) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["videos"]).values(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$catalog$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["catalogVideos"]);
    }
    const [jobStats] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].select({
        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$functions$2f$aggregate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["count"])()
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jobs"]);
    if ((jobStats?.value ?? 0) === 0) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jobs"]).values(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$catalog$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["catalogJobs"]);
    }
    const [adminStats] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].select({
        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$functions$2f$aggregate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["count"])()
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminUsers"]);
    if ((adminStats?.value ?? 0) === 0) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminUsers"]).values({
            name: process.env.ADMIN_NAME || "Admin Faveda",
            username: process.env.ADMIN_USERNAME || "admin",
            passwordHash: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hashPassword"])(process.env.ADMIN_PASSWORD || "faveda2026"),
            role: "owner",
            active: true,
            mustChangePassword: false
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminCookieName",
    ()=>adminCookieName,
    "authenticationEnabled",
    ()=>authenticationEnabled,
    "driverCookieName",
    ()=>driverCookieName,
    "getAuthenticatedAdminId",
    ()=>getAuthenticatedAdminId,
    "getAuthenticatedDriverId",
    ()=>getAuthenticatedDriverId,
    "hashPassword",
    ()=>hashPassword,
    "isAdminAuthenticated",
    ()=>isAdminAuthenticated,
    "normalizeUsername",
    ()=>normalizeUsername,
    "signAdminToken",
    ()=>signAdminToken,
    "signDriverToken",
    ()=>signDriverToken,
    "verifyAdminToken",
    ()=>verifyAdminToken,
    "verifyDriverToken",
    ()=>verifyDriverToken,
    "verifyPassword",
    ()=>verifyPassword
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
;
const COOKIE_NAME = "faveda_admin";
const authenticationEnabled = process.env.APP_AUTH_ENABLED === "true";
function secret() {
    return process.env.ADMIN_SECRET || "faveda-admin-secret";
}
function signAdminToken(adminId) {
    const payload = String(adminId);
    const signature = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHmac"])("sha256", secret()).update(`admin:${payload}`).digest("hex");
    return `${payload}.${signature}`;
}
function verifyAdminToken(token) {
    if (!token) return null;
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return null;
    const expected = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHmac"])("sha256", secret()).update(`admin:${payload}`).digest("hex");
    const left = Buffer.from(signature);
    const right = Buffer.from(expected);
    if (left.length !== right.length) return null;
    if (!(0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["timingSafeEqual"])(left, right)) return null;
    const id = Number(payload);
    return Number.isFinite(id) ? id : null;
}
async function getAuthenticatedAdminId() {
    if (!authenticationEnabled) return null;
    const store = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    return verifyAdminToken(store.get(COOKIE_NAME)?.value);
}
async function isAdminAuthenticated() {
    return !authenticationEnabled || await getAuthenticatedAdminId() !== null;
}
function adminCookieName() {
    return COOKIE_NAME;
}
/* ---------- Driver authentication ---------- */ const DRIVER_COOKIE_NAME = "faveda_driver";
function signDriverToken(driverId) {
    const payload = String(driverId);
    const signature = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHmac"])("sha256", secret()).update(`driver:${payload}`).digest("hex");
    return `${payload}.${signature}`;
}
function verifyDriverToken(token) {
    if (!token) return null;
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return null;
    const expected = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHmac"])("sha256", secret()).update(`driver:${payload}`).digest("hex");
    const left = Buffer.from(signature);
    const right = Buffer.from(expected);
    if (left.length !== right.length) return null;
    if (!(0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["timingSafeEqual"])(left, right)) return null;
    const id = Number(payload);
    return Number.isFinite(id) ? id : null;
}
async function getAuthenticatedDriverId() {
    if (!authenticationEnabled) return null;
    const store = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    return verifyDriverToken(store.get(DRIVER_COOKIE_NAME)?.value);
}
function driverCookieName() {
    return DRIVER_COOKIE_NAME;
}
function hashPassword(password) {
    const salt = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomBytes"])(16).toString("hex");
    const derived = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["scryptSync"])(password, salt, 64).toString("hex");
    return `${salt}:${derived}`;
}
function verifyPassword(password, stored) {
    if (!stored || !stored.includes(":")) return false;
    const [salt, key] = stored.split(":");
    if (!salt || !key) return false;
    const derived = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["scryptSync"])(password, salt, 64).toString("hex");
    const left = Buffer.from(key);
    const right = Buffer.from(derived);
    if (left.length !== right.length) return false;
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["timingSafeEqual"])(left, right);
}
function normalizeUsername(value) {
    return value.trim().toLowerCase();
}
}),
"[project]/src/lib/catalog.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELIVERY_FEE",
    ()=>DELIVERY_FEE,
    "FREE_DELIVERY_FROM",
    ()=>FREE_DELIVERY_FROM,
    "applyPromo",
    ()=>applyPromo,
    "catalogDrivers",
    ()=>catalogDrivers,
    "catalogJobs",
    ()=>catalogJobs,
    "catalogProducts",
    ()=>catalogProducts,
    "catalogVideos",
    ()=>catalogVideos,
    "computeDeliveryFee",
    ()=>computeDeliveryFee,
    "faqs",
    ()=>faqs,
    "orderStatuses",
    ()=>orderStatuses,
    "paymentLabel",
    ()=>paymentLabel,
    "paymentMethods",
    ()=>paymentMethods,
    "promoCodes",
    ()=>promoCodes,
    "ritualPacks",
    ()=>ritualPacks,
    "socialLinks",
    ()=>socialLinks,
    "statusLabel",
    ()=>statusLabel,
    "testimonials",
    ()=>testimonials,
    "whatsappNumber",
    ()=>whatsappNumber
]);
const DELIVERY_FEE = 1500;
const FREE_DELIVERY_FROM = 25000;
const catalogProducts = [
    {
        slug: "traitement-ongles-teigne",
        name: "Traitement des ongles à la teigne",
        subtitle: "Solution végétale ciblée pour ongles fragilisés",
        description: "Formule Faveda à base d’extraits de plantes médicinales, conçue pour accompagner le soin des ongles atteints de teigne. Sa texture fluide pénètre facilement et respecte l’équilibre naturel de la peau autour de l’ongle.",
        usage: "Nettoyez l’ongle, appliquez quelques gouttes matin et soir jusqu’à nette amélioration. Évitez le contact avec les yeux. Usage externe uniquement.",
        ingredients: "Extraits de plantes médicinales, huiles végétales, eau florale, actifs botaniques Faveda.",
        volume: "1 L",
        category: "Soins ciblés",
        price: 8500,
        image: "/images/produits/ongles-teigne.jpg",
        benefits: [
            "Soin ciblé des ongles",
            "Formule 100 % végétale",
            "Texture fluide, facile à appliquer",
            "Idéal en cure régulière"
        ],
        stock: 48,
        featured: true
    },
    {
        slug: "tisane-ecorces-medicinales",
        name: "Tisane aux écorces médicinales",
        subtitle: "Infusion traditionnelle de plantes et d’écorces",
        description: "Mélange artisanal d’écorces et de plantes séchées, préparé selon le savoir-faire Faveda. Une tisane chaude, aromatique, pensée pour les rituels de détox douce et de bien-être quotidien.",
        usage: "Faites infuser une poignée dans 1 litre d’eau frémissante pendant 10 à 15 minutes. Filtrez. Buvez 1 à 2 tasses par jour, de préférence entre les repas.",
        ingredients: "Écorces médicinales, plantes séchées, racines aromatiques. Sans additif, sans colorant.",
        volume: "200 g",
        category: "Tisanes",
        price: 6500,
        image: "/images/produits/tisane-plantes.jpg",
        benefits: [
            "Rituel détox en douceur",
            "Plantes séchées à la main",
            "Goût boisé et authentique",
            "Sachet refermable"
        ],
        stock: 60,
        featured: true
    },
    {
        slug: "traitement-douleurs-ventre",
        name: "Traitement des douleurs au ventre",
        subtitle: "Formule concentrée pour le confort digestif",
        description: "Préparation végétale Faveda destinée à apaiser les tensions abdominales et à soutenir le confort digestif. Une formule concentrée, issue de plantes reconnues dans les soins traditionnels.",
        usage: "Selon les indications du livret : généralement une dose diluée dans un verre d’eau, 1 à 2 fois par jour. Ne pas dépasser la posologie recommandée.",
        ingredients: "Complexe de plantes digestives, extraits aqueux, actifs botaniques Faveda.",
        volume: "1 L",
        category: "Confort digestif",
        price: 9500,
        image: "/images/produits/douleurs-ventre.jpg",
        benefits: [
            "Confort abdominal",
            "Formule concentrée",
            "Plantes traditionnelles",
            "Usage quotidien possible"
        ],
        stock: 42,
        featured: true
    },
    {
        slug: "elixir-douleurs-ventre",
        name: "Élixir douleurs au ventre",
        subtitle: "Décoction liquide prête à l’emploi",
        description: "Grande bouteille d’élixir Faveda : une décoction ambrée de plantes, déjà infusée, pensée pour les cures plus longues. Le goût authentique des extraits végétaux, sans transformation industrielle.",
        usage: "Agitez avant emploi. Prenez un verre selon le livret d’accompagnement, de préférence après le repas. Conserver au frais après ouverture et consommer sous 15 jours.",
        ingredients: "Décoction de plantes médicinales, eau de source, extraits d’écorces et de feuilles.",
        volume: "1,5 L",
        category: "Confort digestif",
        price: 12000,
        image: "/images/produits/elixir-ventre.jpg",
        benefits: [
            "Prêt à l’emploi",
            "Idéal en cure",
            "Grande contenance",
            "Goût d’infusion authentique"
        ],
        stock: 36,
        featured: true
    },
    {
        slug: "soin-tete-noire",
        name: "Soin Tête noire sans prise de poids",
        subtitle: "Extrait traditionnel, formule légère",
        description: "Soin Faveda inspiré des recettes traditionnelles pour accompagner les déséquilibres dits « tête noire ». Une formule concentrée, pensée pour rester légère et ne pas favoriser la prise de poids.",
        usage: "Quelques gouttes selon le protocole indiqué dans le livret, de préférence le matin. Respectez la durée de cure recommandée. Demandez conseil en cas de grossesse.",
        ingredients: "Extraits de plantes sélectionnées, huile végétale porteuse, actifs botaniques Faveda.",
        volume: "50 ml",
        category: "Soins ciblés",
        price: 7500,
        image: "/images/produits/tete-noire.jpg",
        benefits: [
            "Recette traditionnelle",
            "Formule légère",
            "Sans prise de poids",
            "Flacon compte-gouttes"
        ],
        stock: 50,
        featured: false
    },
    {
        slug: "lotion-corporelle-plantes",
        name: "Lotion corporelle aux plantes",
        subtitle: "Soin quotidien nourrissant et apaisant",
        description: "Lotion corporelle Faveda aux extraits de plantes, karité et aloe. Elle hydrate, assouplit et laisse un voile satiné sans effet gras. Le geste simple d’un rituel beauté naturel, matin et soir.",
        usage: "Après la douche, appliquez sur peau encore humide en massages circulaires. Convient à toute la famille. Éviter le contour des yeux.",
        ingredients: "Beurre de karité, aloe vera, extraits de plantes, huiles végétales, eau florale.",
        volume: "250 ml",
        category: "Soins du corps",
        price: 5500,
        image: "/images/produits/lotion-corporelle.jpg",
        benefits: [
            "Hydratation longue durée",
            "Texture non grasse",
            "Parfum végétal subtil",
            "Peaux sensibles bienvenues"
        ],
        stock: 70,
        featured: true
    }
];
const catalogDrivers = [
    {
        name: "Aminata Diallo",
        phone: "+225 07 12 34 56 78",
        vehicle: "Scooter",
        zone: "Cocody · Plateau",
        status: "available",
        username: "aminata",
        password: "livreur123"
    },
    {
        name: "Koffi Mensah",
        phone: "+225 05 98 76 54 32",
        vehicle: "Moto",
        zone: "Yopougon · Adjamé",
        status: "available",
        username: "koffi",
        password: "livreur123"
    },
    {
        name: "Fatou Ndiaye",
        phone: "+225 01 45 23 67 89",
        vehicle: "Voiture",
        zone: "Marcory · Treichville",
        status: "available",
        username: "fatou",
        password: "livreur123"
    }
];
const paymentMethods = [
    {
        id: "cash",
        label: "Espèces à la livraison",
        hint: "Réglez directement au livreur"
    },
    {
        id: "orange",
        label: "Orange Money",
        hint: "Paiement mobile instantané"
    },
    {
        id: "mtn",
        label: "MTN Mobile Money",
        hint: "Paiement mobile instantané"
    },
    {
        id: "wave",
        label: "Wave",
        hint: "Transfert simple et rapide"
    },
    {
        id: "card",
        label: "Carte bancaire",
        hint: "Visa · Mastercard"
    }
];
const orderStatuses = [
    {
        id: "pending",
        label: "Nouvelle",
        tone: "sand"
    },
    {
        id: "confirmed",
        label: "Confirmée",
        tone: "leaf"
    },
    {
        id: "assigned",
        label: "Affectée",
        tone: "gold"
    },
    {
        id: "in_transit",
        label: "En livraison",
        tone: "gold"
    },
    {
        id: "delivered",
        label: "Livrée",
        tone: "leaf"
    },
    {
        id: "cancelled",
        label: "Annulée",
        tone: "muted"
    }
];
function statusLabel(status) {
    return orderStatuses.find((item)=>item.id === status)?.label ?? status;
}
function paymentLabel(method) {
    return paymentMethods.find((item)=>item.id === method)?.label ?? method;
}
function computeDeliveryFee(subtotal) {
    return subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
}
const promoCodes = {
    FAVEDA10: {
        label: "10 % de remise",
        type: "percent",
        value: 10
    },
    NATURE15: {
        label: "15 % dès 15 000 F",
        type: "percent",
        value: 15,
        min: 15000
    },
    LIVRAISON: {
        label: "Livraison offerte",
        type: "free_delivery",
        value: 0
    }
};
function applyPromo(subtotal, rawCode) {
    const deliveryFee = computeDeliveryFee(subtotal);
    const code = (rawCode || "").trim().toUpperCase();
    const promo = code ? promoCodes[code] : undefined;
    if (!code) {
        return {
            ok: true,
            code: "",
            label: "",
            discount: 0,
            deliveryFee,
            total: subtotal + deliveryFee
        };
    }
    if (!promo) {
        return {
            ok: false,
            code: "",
            label: "",
            discount: 0,
            deliveryFee,
            total: subtotal + deliveryFee,
            error: "Code promo inconnu"
        };
    }
    if (promo.min && subtotal < promo.min) {
        return {
            ok: false,
            code: "",
            label: "",
            discount: 0,
            deliveryFee,
            total: subtotal + deliveryFee,
            error: `Ce code s’applique dès ${promo.min.toLocaleString("fr-FR")} F CFA`
        };
    }
    const discount = promo.type === "percent" ? Math.round(subtotal * promo.value / 100) : 0;
    const nextDelivery = promo.type === "free_delivery" ? 0 : deliveryFee;
    return {
        ok: true,
        code,
        label: promo.label,
        discount,
        deliveryFee: nextDelivery,
        total: Math.max(0, subtotal - discount + nextDelivery)
    };
}
const testimonials = [
    {
        name: "Awa K.",
        city: "Cocody",
        text: "La lotion et la tisane sont devenues mon rituel du soir. Livraison claire, code secret rassurant."
    },
    {
        name: "Jean-Marc T.",
        city: "Yopougon",
        text: "Le traitement ventre m’a vraiment aidé. J’ai suivi la commande en un clic, nickel."
    },
    {
        name: "Mariam S.",
        city: "Marcory",
        text: "Produits authentiques, packaging soigné. J’ai partagé ma position, le livreur m’a trouvée facilement."
    }
];
const faqs = [
    {
        q: "Comment fonctionne le code secret ?",
        a: "À chaque commande, un code à 4 chiffres est généré. Vous le donnez uniquement au livreur Faveda pour confirmer la remise."
    },
    {
        q: "Quels sont les délais de livraison ?",
        a: "À Abidjan, comptez généralement 24 à 48 h. Hors zone, 48 à 72 h selon le quartier."
    },
    {
        q: "Puis-je payer à la livraison ?",
        a: "Oui, en espèces. Orange Money, MTN, Wave et carte sont aussi disponibles."
    },
    {
        q: "Les soins sont-ils 100 % naturels ?",
        a: "Oui : plantes, écorces et extraits botaniques, sans colorant superflu. Lisez toujours le livret d’utilisation."
    }
];
const ritualPacks = [
    {
        id: "rituel-ventre",
        title: "Rituel confort ventre",
        description: "Traitement + élixir pour une cure complète.",
        slugs: [
            "traitement-douleurs-ventre",
            "elixir-douleurs-ventre"
        ],
        badge: "Le plus demandé"
    },
    {
        id: "rituel-peau",
        title: "Rituel peau lumineuse",
        description: "Lotion corporelle + soin tête noire.",
        slugs: [
            "lotion-corporelle-plantes",
            "soin-tete-noire"
        ],
        badge: "Beauté"
    }
];
const whatsappNumber = "2250700112233";
const catalogJobs = [
    {
        title: "Livreur(se) — Abidjan",
        department: "Logistique",
        location: "Abidjan",
        contract: "Temps plein",
        description: "Vous assurez la livraison des commandes Faveda auprès de nos clients, avec soin et ponctualité. Vous gérez l'encaissement à la livraison et le code secret de confirmation avec le client.",
        requirements: "Moto ou scooter personnel\nSens du contact et ponctualité\nBonne connaissance des communes d'Abidjan\nSmartphone Android pour le suivi des courses",
        active: true
    },
    {
        title: "Community manager — contenus vidéo",
        department: "Communication",
        location: "Abidjan / hybride",
        contract: "Temps partiel",
        description: "Vous créez et publiez les vidéos TikTok, YouTube et Instagram de Faveda : tutoriels d'utilisation, coulisses de l'atelier et témoignages clients.",
        requirements: "Aisance en tournage et montage mobile\nSensibilité pour les produits naturels\nCréativité et régularité de publication",
        active: true
    },
    {
        title: "Préparateur(trice) en herboristerie",
        department: "Atelier",
        location: "Abidjan",
        contract: "Temps plein",
        description: "Au sein de l'atelier, vous participez à la sélection des plantes, au pilage, aux infusions et au conditionnement des soins Faveda dans le respect de nos recettes.",
        requirements: "Intérêt pour la phytothérapie traditionnelle\nRigueur et hygiène\nEsprit d'équipe",
        active: true
    }
];
const socialLinks = {
    tiktok: "https://www.tiktok.com/@faveda.ci",
    youtube: "https://www.youtube.com/@favedaci",
    instagram: "https://www.instagram.com/faveda.ci",
    facebook: "https://www.facebook.com/faveda.ci"
};
const catalogVideos = [
    {
        slug: "preparation-tisane-ecorces",
        title: "Comment préparer la tisane aux écorces",
        description: "Rituel complet : dosage, infusion 12 minutes, filtrage. Une tasse matin et soir pour une détox douce.",
        category: "Tutoriel",
        thumbnail: "https://images.pexels.com/videos/8507938/antique-art-artisan-arts-and-crafts-8507938.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630",
        videoUrl: "https://videos.pexels.com/video-files/8507938/8507938-hd_1080_1920_25fps.mp4",
        platform: "tiktok",
        externalUrl: "https://www.tiktok.com/@faveda.ci",
        duration: 13,
        views: 12400,
        productSlug: "tisane-ecorces-medicinales",
        featured: true
    },
    {
        slug: "application-lotion-corporelle",
        title: "Routine peau : la lotion corporelle Faveda",
        description: "Après la douche, sur peau humide. Mouvements circulaires, du bas vers le haut. Résultat : peau satinée toute la journée.",
        category: "Routine beauté",
        thumbnail: "https://images.pexels.com/videos/8406620/adult-beautiful-beauty-beauty-routine-8406620.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630",
        videoUrl: "https://videos.pexels.com/video-files/8406620/8406620-hd_1080_1920_24fps.mp4",
        platform: "youtube",
        externalUrl: "https://www.youtube.com/@favedaci",
        duration: 14,
        views: 8700,
        productSlug: "lotion-corporelle-plantes",
        featured: true
    },
    {
        slug: "pilage-plantes-atelier",
        title: "Dans l'atelier : pilage des plantes",
        description: "Chaque lot commence ici. Écorces sélectionnées, pilées au mortier, avant extraction. Le geste artisanal Faveda.",
        category: "Coulisses",
        thumbnail: "https://images.pexels.com/videos/7525923/alternative-aromatherapy-aromatic-background-7525923.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630",
        videoUrl: "https://videos.pexels.com/video-files/7525923/7525923-hd_1080_1920_30fps.mp4",
        platform: "tiktok",
        externalUrl: "https://www.tiktok.com/@faveda.ci",
        duration: 20,
        views: 23100,
        productSlug: null,
        featured: true
    },
    {
        slug: "huiles-essentielles-faveda",
        title: "Les huiles essentielles dans nos formules",
        description: "Pourquoi on choisit des huiles végétales plutôt que synthétiques. Focus sur la qualité des extraits.",
        category: "Savoir-faire",
        thumbnail: "https://images.pexels.com/videos/20395600/alternative-aromatherapy-aromatic-bottle-20395600.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630",
        videoUrl: "https://videos.pexels.com/video-files/20395600/20395600-uhd_2160_3840_50fps.mp4",
        platform: "youtube",
        externalUrl: "https://www.youtube.com/@favedaci",
        duration: 27,
        views: 5300,
        productSlug: "traitement-ongles-teigne",
        featured: false
    },
    {
        slug: "routine-soin-ventre",
        title: "Ma cure confort ventre — 1 semaine",
        description: "Témoignage : comment j'ai intégré l'élixir et le traitement ventre dans mon quotidien pendant 7 jours.",
        category: "Témoignage",
        thumbnail: "https://images.pexels.com/videos/7852600/aid-alternative-applying-aromatherapy-7852600.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630",
        videoUrl: "https://videos.pexels.com/video-files/7852600/7852600-hd_1080_1920_30fps.mp4",
        platform: "instagram",
        externalUrl: "https://www.instagram.com/faveda.ci",
        duration: 10,
        views: 15800,
        productSlug: "traitement-douleurs-ventre",
        featured: true
    },
    {
        slug: "infusion-plantes-sechees",
        title: "Infusion lente : le secret d'une bonne tisane",
        description: "Pas de bouilloire ! Eau frémissante, 12 à 15 minutes, filtrage doux. Tous les détails pour une infusion parfaite.",
        category: "Tutoriel",
        thumbnail: "https://images.pexels.com/videos/6956379/boiling-buddhism-buddhist-contemplation-6956379.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630",
        videoUrl: "https://videos.pexels.com/video-files/6956379/6956379-hd_1080_1920_25fps.mp4",
        platform: "tiktok",
        externalUrl: "https://www.tiktok.com/@faveda.ci",
        duration: 8,
        views: 9200,
        productSlug: "tisane-ecorces-medicinales",
        featured: false
    },
    {
        slug: "soin-peau-naturel",
        title: "Gommage & lotion : le combo peau douce",
        description: "Gommage doux aux plantes, suivi de la lotion Faveda. 5 minutes pour une peau rayonnante.",
        category: "Routine beauté",
        thumbnail: "https://images.pexels.com/videos/9335887/adult-aid-body-massage-family-9335887.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630",
        videoUrl: "https://videos.pexels.com/video-files/9335887/9335887-hd_1080_1920_25fps.mp4",
        platform: "instagram",
        externalUrl: "https://www.instagram.com/faveda.ci",
        duration: 10,
        views: 6100,
        productSlug: "lotion-corporelle-plantes",
        featured: false
    },
    {
        slug: "preparation-artisanale-elixir",
        title: "Comment naît l'élixir Faveda",
        description: "De l'écorce brute à la bouteille ambrée : découvrez la fabrication artisanale de l'élixir douleurs ventre.",
        category: "Coulisses",
        thumbnail: "https://images.pexels.com/videos/8391554/adult-art-artisan-arts-and-crafts-8391554.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630",
        videoUrl: "https://videos.pexels.com/video-files/8391554/8391554-hd_1080_1920_24fps.mp4",
        platform: "youtube",
        externalUrl: "https://www.youtube.com/@favedaci",
        duration: 17,
        views: 18400,
        productSlug: "elixir-douleurs-ventre",
        featured: true
    }
];
}),
"[project]/src/lib/storage.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "normalizeProductImage",
    ()=>normalizeProductImage,
    "normalizeProductImages",
    ()=>normalizeProductImages,
    "resolveSupabaseStorageUrl",
    ()=>resolveSupabaseStorageUrl
]);
function resolveSupabaseStorageUrl(value) {
    if (!value) return "";
    const trimmed = value.trim();
    if (!trimmed) return "";
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    const normalized = trimmed.replace(/\\/g, "/");
    if (normalized.startsWith("/images/") || normalized.startsWith("images/")) return normalized.startsWith("/") ? normalized : `/${normalized}`;
    const baseUrl = (process.env.SUPABASE_URL || "").replace(/\/+$/, "");
    if (!baseUrl) return trimmed;
    const bucket = (process.env.SUPABASE_STORAGE_BUCKET || "images").replace(/^\/+|\/+$/g, "");
    const productMatch = normalized.replace(/^\/+/, "").match(/^((?:images\/)?(?:produits|products)\/.*)$/i);
    if (!productMatch) return trimmed;
    return `${baseUrl}/storage/v1/object/public/${bucket}/${productMatch[1].replace(/^images\//i, "")}`;
}
function normalizeProductImage(product) {
    return {
        ...product,
        image: resolveSupabaseStorageUrl(product.image)
    };
}
function normalizeProductImages(productsList) {
    return productsList.map((product)=>normalizeProductImage(product));
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__180qrr7._.js.map