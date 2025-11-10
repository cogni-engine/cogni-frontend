(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-ICIK2BSB.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/utils/dev-console.ts
__turbopack_context__.s([
    "shouldShowDevConsole",
    ()=>shouldShowDevConsole
]);
function isLocalhost() {
    if (typeof window === "undefined") return false;
    return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname === "0.0.0.0";
}
function shouldShowDevConsole(showDevConsole) {
    if (showDevConsole !== void 0) {
        return showDevConsole;
    }
    return isLocalhost();
}
;
 //# sourceMappingURL=chunk-ICIK2BSB.mjs.map
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-SKC7AJIV.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__async",
    ()=>__async,
    "__objRest",
    ()=>__objRest,
    "__restKey",
    ()=>__restKey,
    "__spreadProps",
    ()=>__spreadProps,
    "__spreadValues",
    ()=>__spreadValues
]);
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __spreadValues = (a, b)=>{
    for(var prop in b || (b = {}))if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)){
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
    return a;
};
var __spreadProps = (a, b)=>__defProps(a, __getOwnPropDescs(b));
var __restKey = (key)=>typeof key === "symbol" ? key : key + "";
var __objRest = (source, exclude)=>{
    var target = {};
    for(var prop in source)if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols) for (var prop of __getOwnPropSymbols(source)){
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop)) target[prop] = source[prop];
    }
    return target;
};
var __async = (__this, __arguments, generator)=>{
    return new Promise((resolve, reject)=>{
        var fulfilled = (value)=>{
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        };
        var rejected = (value)=>{
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        };
        var step = (x)=>x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
        step((generator = generator.apply(__this, __arguments)).next());
    });
};
;
 //# sourceMappingURL=chunk-SKC7AJIV.mjs.map
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-EFL5OBKN.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastProvider",
    ()=>ToastProvider,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-SKC7AJIV.mjs [app-client] (ecmascript)");
// src/components/toast/toast-provider.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+shared@1.10.6/node_modules/@copilotkit/shared/dist/chunk-XLQ2EIPH.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
var ToastContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(void 0);
function getErrorSeverity(error) {
    if (error.severity) {
        switch(error.severity){
            case __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Severity"].CRITICAL:
                return "critical";
            case __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Severity"].WARNING:
                return "warning";
            case __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Severity"].INFO:
                return "info";
            default:
                return "info";
        }
    }
    const message = error.message.toLowerCase();
    if (message.includes("api key") || message.includes("401") || message.includes("unauthorized") || message.includes("authentication") || message.includes("incorrect api key")) {
        return "critical";
    }
    return "info";
}
function getErrorColors(severity) {
    switch(severity){
        case "critical":
            return {
                background: "#fee2e2",
                border: "#dc2626",
                text: "#7f1d1d",
                icon: "#dc2626"
            };
        case "warning":
            return {
                background: "#fef3c7",
                border: "#d97706",
                text: "#78350f",
                icon: "#d97706"
            };
        case "info":
            return {
                background: "#dbeafe",
                border: "#2563eb",
                text: "#1e3a8a",
                icon: "#2563eb"
            };
    }
}
function useToast() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
function ToastProvider(param) {
    let { enabled, children } = param;
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [bannerError, setBannerErrorState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const removeToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[removeToast]": (id)=>{
            setToasts({
                "ToastProvider.useCallback[removeToast]": (prev)=>prev.filter({
                        "ToastProvider.useCallback[removeToast]": (toast)=>toast.id !== id
                    }["ToastProvider.useCallback[removeToast]"])
            }["ToastProvider.useCallback[removeToast]"]);
        }
    }["ToastProvider.useCallback[removeToast]"], []);
    const addToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[addToast]": (toast)=>{
            var _a;
            if (!enabled) {
                return;
            }
            const id = (_a = toast.id) != null ? _a : Math.random().toString(36).substring(2, 9);
            setToasts({
                "ToastProvider.useCallback[addToast]": (currentToasts)=>{
                    if (currentToasts.find({
                        "ToastProvider.useCallback[addToast]": (toast2)=>toast2.id === id
                    }["ToastProvider.useCallback[addToast]"])) return currentToasts;
                    return [
                        ...currentToasts,
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])({}, toast), {
                            id
                        })
                    ];
                }
            }["ToastProvider.useCallback[addToast]"]);
            if (toast.duration) {
                setTimeout({
                    "ToastProvider.useCallback[addToast]": ()=>{
                        removeToast(id);
                    }
                }["ToastProvider.useCallback[addToast]"], toast.duration);
            }
        }
    }["ToastProvider.useCallback[addToast]"], [
        enabled,
        removeToast
    ]);
    const setBannerError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[setBannerError]": (error)=>{
            if (!enabled && error !== null) {
                return;
            }
            setBannerErrorState(error);
        }
    }["ToastProvider.useCallback[setBannerError]"], [
        enabled
    ]);
    const addGraphQLErrorsToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[addGraphQLErrorsToast]": (errors)=>{
            console.warn("addGraphQLErrorsToast is deprecated. All errors now show as banners.");
        }
    }["ToastProvider.useCallback[addGraphQLErrorsToast]"], []);
    const value = {
        toasts,
        addToast,
        addGraphQLErrorsToast,
        removeToast,
        enabled,
        bannerError,
        setBannerError
    };
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(ToastContext.Provider, {
        value,
        children: [
            bannerError && (()=>{
                const severity = getErrorSeverity(bannerError);
                const colors = getErrorColors(severity);
                return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    style: {
                        position: "fixed",
                        bottom: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 9999,
                        backgroundColor: colors.background,
                        border: "1px solid ".concat(colors.border),
                        borderLeft: "4px solid ".concat(colors.border),
                        borderRadius: "8px",
                        padding: "12px 16px",
                        fontSize: "13px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                        backdropFilter: "blur(8px)",
                        maxWidth: "min(90vw, 700px)",
                        width: "100%",
                        boxSizing: "border-box",
                        overflow: "hidden"
                    },
                    children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        style: {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "10px"
                        },
                        children: [
                            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    flex: 1,
                                    minWidth: 0
                                },
                                children: [
                                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                        style: {
                                            width: "12px",
                                            height: "12px",
                                            borderRadius: "50%",
                                            backgroundColor: colors.border,
                                            flexShrink: 0
                                        }
                                    }),
                                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            flex: 1,
                                            minWidth: 0
                                        },
                                        children: [
                                            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                                style: {
                                                    color: colors.text,
                                                    lineHeight: "1.4",
                                                    fontWeight: "400",
                                                    fontSize: "13px",
                                                    flex: 1,
                                                    wordBreak: "break-all",
                                                    overflowWrap: "break-word",
                                                    maxWidth: "550px",
                                                    overflow: "hidden",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 10,
                                                    WebkitBoxOrient: "vertical"
                                                },
                                                children: (()=>{
                                                    let message = bannerError.message;
                                                    const jsonMatch = message.match(/'message':\s*'([^']+)'/);
                                                    if (jsonMatch) {
                                                        return jsonMatch[1];
                                                    }
                                                    message = message.split(" - ")[0];
                                                    message = message.split(": Error code")[0];
                                                    message = message.replace(/:\s*\d{3}$/, "");
                                                    message = message.replace(/See more:.*$/g, "");
                                                    message = message.trim();
                                                    return message || "Configuration error occurred.";
                                                })()
                                            }),
                                            (()=>{
                                                const message = bannerError.message;
                                                const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                                                const plainUrlRegex = /(https?:\/\/[^\s)]+)/g;
                                                let url = null;
                                                let buttonText = "See More";
                                                const markdownMatch = markdownLinkRegex.exec(message);
                                                if (markdownMatch) {
                                                    url = markdownMatch[2];
                                                    buttonText = "See More";
                                                } else {
                                                    const urlMatch = plainUrlRegex.exec(message);
                                                    if (urlMatch) {
                                                        url = urlMatch[0].replace(/[.,;:'"]*$/, "");
                                                        buttonText = "See More";
                                                    }
                                                }
                                                if (!url) return null;
                                                return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
                                                    onClick: ()=>window.open(url, "_blank", "noopener,noreferrer"),
                                                    style: {
                                                        background: colors.border,
                                                        color: "white",
                                                        border: "none",
                                                        borderRadius: "5px",
                                                        padding: "4px 10px",
                                                        fontSize: "11px",
                                                        fontWeight: "500",
                                                        cursor: "pointer",
                                                        transition: "all 0.2s ease",
                                                        flexShrink: 0
                                                    },
                                                    onMouseEnter: (e)=>{
                                                        e.currentTarget.style.opacity = "0.9";
                                                        e.currentTarget.style.transform = "translateY(-1px)";
                                                    },
                                                    onMouseLeave: (e)=>{
                                                        e.currentTarget.style.opacity = "1";
                                                        e.currentTarget.style.transform = "translateY(0)";
                                                    },
                                                    children: buttonText
                                                });
                                            })()
                                        ]
                                    })
                                ]
                            }),
                            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
                                onClick: ()=>setBannerError(null),
                                style: {
                                    background: "transparent",
                                    border: "none",
                                    color: colors.text,
                                    cursor: "pointer",
                                    padding: "2px",
                                    borderRadius: "3px",
                                    fontSize: "14px",
                                    lineHeight: "1",
                                    opacity: 0.6,
                                    transition: "all 0.2s ease",
                                    flexShrink: 0
                                },
                                title: "Dismiss",
                                onMouseEnter: (e)=>{
                                    e.currentTarget.style.opacity = "1";
                                    e.currentTarget.style.background = "rgba(0, 0, 0, 0.05)";
                                },
                                onMouseLeave: (e)=>{
                                    e.currentTarget.style.opacity = "0.6";
                                    e.currentTarget.style.background = "transparent";
                                },
                                children: "\xD7"
                            })
                        ]
                    })
                });
            })(),
            children
        ]
    });
}
;
 //# sourceMappingURL=chunk-EFL5OBKN.mjs.map
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-EUX2P2E7.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CopilotContext",
    ()=>CopilotContext,
    "useCopilotContext",
    ()=>useCopilotContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-SKC7AJIV.mjs [app-client] (ecmascript)");
// src/context/copilot-context.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
var emptyCopilotContext = {
    actions: {},
    setAction: ()=>{},
    removeAction: ()=>{},
    coAgentStateRenders: {},
    setCoAgentStateRender: ()=>{},
    removeCoAgentStateRender: ()=>{},
    chatComponentsCache: {
        current: {
            actions: {},
            coAgentStateRenders: {}
        }
    },
    getContextString: (documents, categories)=>returnAndThrowInDebug(""),
    addContext: ()=>"",
    removeContext: ()=>{},
    getAllContext: ()=>[],
    getFunctionCallHandler: ()=>returnAndThrowInDebug(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__async"])(void 0, null, function*() {})),
    isLoading: false,
    setIsLoading: ()=>returnAndThrowInDebug(false),
    chatInstructions: "",
    setChatInstructions: ()=>returnAndThrowInDebug(""),
    additionalInstructions: [],
    setAdditionalInstructions: ()=>returnAndThrowInDebug([]),
    getDocumentsContext: (categories)=>returnAndThrowInDebug([]),
    addDocumentContext: ()=>returnAndThrowInDebug(""),
    removeDocumentContext: ()=>{},
    runtimeClient: {},
    copilotApiConfig: new class {
        get chatApiEndpoint() {
            throw new Error("Remember to wrap your app in a `<CopilotKit> {...} </CopilotKit>` !!!");
        }
        get headers() {
            return {};
        }
        get body() {
            return {};
        }
    }(),
    chatSuggestionConfiguration: {},
    addChatSuggestionConfiguration: ()=>{},
    removeChatSuggestionConfiguration: ()=>{},
    showDevConsole: false,
    coagentStates: {},
    setCoagentStates: ()=>{},
    coagentStatesRef: {
        current: {}
    },
    setCoagentStatesWithRef: ()=>{},
    agentSession: null,
    setAgentSession: ()=>{},
    forwardedParameters: {},
    agentLock: null,
    threadId: "",
    setThreadId: ()=>{},
    runId: null,
    setRunId: ()=>{},
    chatAbortControllerRef: {
        current: null
    },
    availableAgents: [],
    extensions: {},
    setExtensions: ()=>{},
    langGraphInterruptAction: null,
    setLangGraphInterruptAction: ()=>{},
    removeLangGraphInterruptAction: ()=>{},
    onError: ()=>{},
    bannerError: null,
    setBannerError: ()=>{},
    internalErrorHandlers: {},
    setInternalErrorHandler: ()=>{},
    removeInternalErrorHandler: ()=>{}
};
var CopilotContext = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createContext(emptyCopilotContext);
function useCopilotContext() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useContext(CopilotContext);
    if (context === emptyCopilotContext) {
        throw new Error("Remember to wrap your app in a `<CopilotKit> {...} </CopilotKit>` !!!");
    }
    return context;
}
function returnAndThrowInDebug(_value) {
    throw new Error("Remember to wrap your app in a `<CopilotKit> {...} </CopilotKit>` !!!");
}
;
 //# sourceMappingURL=chunk-EUX2P2E7.mjs.map
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-ZLQVRPDS.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/context/copilot-messages-context.tsx
__turbopack_context__.s([
    "CopilotMessagesContext",
    ()=>CopilotMessagesContext,
    "useCopilotMessagesContext",
    ()=>useCopilotMessagesContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var emptyCopilotContext = {
    messages: [],
    setMessages: ()=>[],
    // suggestions state
    suggestions: [],
    setSuggestions: ()=>[]
};
var CopilotMessagesContext = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createContext(emptyCopilotContext);
function useCopilotMessagesContext() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useContext(CopilotMessagesContext);
    if (context === emptyCopilotContext) {
        throw new Error("A messages consuming component was not wrapped with `<CopilotMessages> {...} </CopilotMessages>`");
    }
    return context;
}
;
 //# sourceMappingURL=chunk-ZLQVRPDS.mjs.map
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-C6IANC2R.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CopilotMessages",
    ()=>CopilotMessages,
    "MessagesTapProvider",
    ()=>MessagesTapProvider,
    "useMessagesTap",
    ()=>useMessagesTap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$ICIK2BSB$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-ICIK2BSB.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$EFL5OBKN$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-EFL5OBKN.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$EUX2P2E7$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-EUX2P2E7.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$ZLQVRPDS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-ZLQVRPDS.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-SKC7AJIV.mjs [app-client] (ecmascript)");
// src/components/copilot-provider/copilot-messages.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$runtime$2d$client$2d$gql$40$1$2e$10$2e$6_graphql$40$16$2e$12$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$TDZBGVZB$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+runtime-client-gql@1.10.6_graphql@16.12.0_react@19.1.0/node_modules/@copilotkit/runtime-client-gql/dist/chunk-TDZBGVZB.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+shared@1.10.6/node_modules/@copilotkit/shared/dist/chunk-XLQ2EIPH.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
var MessagesTapContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function useMessagesTap() {
    const tap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(MessagesTapContext);
    if (!tap) throw new Error("useMessagesTap must be used inside <MessagesTapProvider>");
    return tap;
}
function MessagesTapProvider(param) {
    let { children } = param;
    const messagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const tapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        getMessagesFromTap: {
            "MessagesTapProvider.useRef[tapRef]": ()=>messagesRef.current
        }["MessagesTapProvider.useRef[tapRef]"],
        updateTapMessages: {
            "MessagesTapProvider.useRef[tapRef]": (messages)=>{
                messagesRef.current = messages;
            }
        }["MessagesTapProvider.useRef[tapRef]"]
    });
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(MessagesTapContext.Provider, {
        value: tapRef.current,
        children
    });
}
function CopilotMessages(param) {
    let { children } = param;
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const lastLoadedThreadId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])();
    const lastLoadedAgentName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])();
    const lastLoadedMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])();
    const { updateTapMessages } = useMessagesTap();
    const { threadId, agentSession, runtimeClient, showDevConsole, onError, copilotApiConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$EUX2P2E7$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCopilotContext"])();
    const { setBannerError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$EFL5OBKN$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const traceUIError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CopilotMessages.useCallback[traceUIError]": (error, originalError)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__async"])(this, null, {
                "CopilotMessages.useCallback[traceUIError]": function*() {
                    if (!onError || !copilotApiConfig.publicApiKey) return;
                    try {
                        const traceEvent = {
                            type: "error",
                            timestamp: Date.now(),
                            context: {
                                source: "ui",
                                request: {
                                    operation: "loadAgentState",
                                    url: copilotApiConfig.chatApiEndpoint,
                                    startTime: Date.now()
                                },
                                technical: {
                                    environment: "browser",
                                    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : void 0,
                                    stackTrace: originalError instanceof Error ? originalError.stack : void 0
                                }
                            },
                            error
                        };
                        yield onError(traceEvent);
                    } catch (traceError) {
                        console.error("Error in CopilotMessages onError handler:", traceError);
                    }
                }
            }["CopilotMessages.useCallback[traceUIError]"])
    }["CopilotMessages.useCallback[traceUIError]"], [
        onError,
        copilotApiConfig.publicApiKey,
        copilotApiConfig.chatApiEndpoint
    ]);
    const createStructuredError = (gqlError)=>{
        const extensions = gqlError.extensions;
        const originalError = extensions == null ? void 0 : extensions.originalError;
        if (originalError == null ? void 0 : originalError.stack) {
            if (originalError.stack.includes("CopilotApiDiscoveryError")) {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotKitApiDiscoveryError"]({
                    message: originalError.message
                });
            }
            if (originalError.stack.includes("CopilotKitRemoteEndpointDiscoveryError")) {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotKitRemoteEndpointDiscoveryError"]({
                    message: originalError.message
                });
            }
            if (originalError.stack.includes("CopilotKitAgentDiscoveryError")) {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotKitAgentDiscoveryError"]({
                    agentName: "",
                    availableAgents: []
                });
            }
        }
        const message = (originalError == null ? void 0 : originalError.message) || gqlError.message;
        const code = extensions == null ? void 0 : extensions.code;
        if (code) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotKitError"]({
                message,
                code
            });
        }
        return null;
    };
    const handleGraphQLErrors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CopilotMessages.useCallback[handleGraphQLErrors]": (error)=>{
            var _a;
            if ((_a = error.graphQLErrors) == null ? void 0 : _a.length) {
                const graphQLErrors = error.graphQLErrors;
                const routeError = {
                    "CopilotMessages.useCallback[handleGraphQLErrors].routeError": (gqlError)=>{
                        const extensions = gqlError.extensions;
                        const visibility = extensions == null ? void 0 : extensions.visibility;
                        const isDev = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$ICIK2BSB$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldShowDevConsole"])(showDevConsole);
                        if (!isDev) {
                            console.error("CopilotKit Error (hidden in production):", gqlError.message);
                            return;
                        }
                        if (visibility === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorVisibility"].SILENT) {
                            console.error("CopilotKit Silent Error:", gqlError.message);
                            return;
                        }
                        const ckError = createStructuredError(gqlError);
                        if (ckError) {
                            setBannerError(ckError);
                            traceUIError(ckError, gqlError);
                        } else {
                            const fallbackError = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotKitError"]({
                                message: gqlError.message,
                                code: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotKitErrorCode"].UNKNOWN
                            });
                            setBannerError(fallbackError);
                            traceUIError(fallbackError, gqlError);
                        }
                    }
                }["CopilotMessages.useCallback[handleGraphQLErrors].routeError"];
                graphQLErrors.forEach(routeError);
            } else {
                const isDev = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$ICIK2BSB$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldShowDevConsole"])(showDevConsole);
                if (!isDev) {
                    console.error("CopilotKit Error (hidden in production):", error);
                } else {
                    const fallbackError = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotKitError"]({
                        message: (error == null ? void 0 : error.message) || String(error),
                        code: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotKitErrorCode"].UNKNOWN
                    });
                    setBannerError(fallbackError);
                    traceUIError(fallbackError, error);
                }
            }
        }
    }["CopilotMessages.useCallback[handleGraphQLErrors]"], [
        setBannerError,
        showDevConsole,
        traceUIError
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CopilotMessages.useEffect": ()=>{
            if (!threadId || threadId === lastLoadedThreadId.current) return;
            if (threadId === lastLoadedThreadId.current && (agentSession == null ? void 0 : agentSession.agentName) === lastLoadedAgentName.current) {
                return;
            }
            const fetchMessages = {
                "CopilotMessages.useEffect.fetchMessages": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__async"])(this, null, {
                        "CopilotMessages.useEffect.fetchMessages": function*() {
                            var _a, _b, _c;
                            if (!(agentSession == null ? void 0 : agentSession.agentName)) return;
                            const result = yield runtimeClient.loadAgentState({
                                threadId,
                                agentName: agentSession == null ? void 0 : agentSession.agentName
                            });
                            if (result.error) {
                                lastLoadedThreadId.current = threadId;
                                lastLoadedAgentName.current = agentSession == null ? void 0 : agentSession.agentName;
                                handleGraphQLErrors(result.error);
                                return;
                            }
                            const newMessages = (_b = (_a = result.data) == null ? void 0 : _a.loadAgentState) == null ? void 0 : _b.messages;
                            if (newMessages === lastLoadedMessages.current) return;
                            if ((_c = result.data) == null ? void 0 : _c.loadAgentState) {
                                lastLoadedMessages.current = newMessages;
                                lastLoadedThreadId.current = threadId;
                                lastLoadedAgentName.current = agentSession == null ? void 0 : agentSession.agentName;
                                const messages2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$runtime$2d$client$2d$gql$40$1$2e$10$2e$6_graphql$40$16$2e$12$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$TDZBGVZB$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadMessagesFromJsonRepresentation"])(JSON.parse(newMessages || "[]"));
                                setMessages(messages2);
                            }
                        }
                    }["CopilotMessages.useEffect.fetchMessages"])
            }["CopilotMessages.useEffect.fetchMessages"];
            void fetchMessages();
        }
    }["CopilotMessages.useEffect"], [
        threadId,
        agentSession == null ? void 0 : agentSession.agentName
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CopilotMessages.useEffect": ()=>{
            updateTapMessages(messages);
        }
    }["CopilotMessages.useEffect"], [
        messages,
        updateTapMessages
    ]);
    const memoizedChildren = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CopilotMessages.useMemo[memoizedChildren]": ()=>children
    }["CopilotMessages.useMemo[memoizedChildren]"], [
        children
    ]);
    const [suggestions, setSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$ZLQVRPDS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotMessagesContext"].Provider, {
        value: {
            messages,
            setMessages,
            suggestions,
            setSuggestions
        },
        children: memoizedChildren
    });
}
;
 //# sourceMappingURL=chunk-C6IANC2R.mjs.map
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-PMAFHQ7P.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StatusChecker",
    ()=>StatusChecker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-SKC7AJIV.mjs [app-client] (ecmascript)");
// src/lib/status-checker.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$GYZIHHE6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+shared@1.10.6/node_modules/@copilotkit/shared/dist/chunk-GYZIHHE6.mjs [app-client] (ecmascript)");
;
;
var STATUS_CHECK_INTERVAL = 1e3 * 60 * 5;
var StatusChecker = class {
    start(publicApiKey, onUpdate) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__async"])(this, null, function*() {
            this.instanceCount++;
            if (this.activeKey === publicApiKey) return;
            if (this.intervalId) clearInterval(this.intervalId);
            const checkStatus = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__async"])(this, null, function*() {
                    try {
                        const response = yield fetch("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$GYZIHHE6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COPILOT_CLOUD_API_URL"], "/ciu"), {
                            method: "GET",
                            headers: {
                                [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$GYZIHHE6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COPILOT_CLOUD_PUBLIC_API_KEY_HEADER"]]: publicApiKey
                            }
                        }).then((response2)=>response2.json());
                        this.lastResponse = response;
                        onUpdate == null ? void 0 : onUpdate(response);
                        return response;
                    } catch (error) {
                        return null;
                    }
                });
            const initialResponse = yield checkStatus();
            this.intervalId = setInterval(checkStatus, STATUS_CHECK_INTERVAL);
            this.activeKey = publicApiKey;
            return initialResponse;
        });
    }
    getLastResponse() {
        return this.lastResponse;
    }
    stop() {
        this.instanceCount--;
        if (this.instanceCount === 0) {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
                this.activeKey = null;
                this.lastResponse = null;
            }
        }
    }
    constructor(){
        this.activeKey = null;
        this.intervalId = null;
        this.instanceCount = 0;
        this.lastResponse = null;
    }
};
;
 //# sourceMappingURL=chunk-PMAFHQ7P.mjs.map
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-O7ARI5CV.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/components/toast/exclamation-mark-icon.tsx
__turbopack_context__.s([
    "ExclamationMarkIcon",
    ()=>ExclamationMarkIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
var ExclamationMarkIcon = (param)=>{
    let { className, style } = param;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: "lucide lucide-circle-alert ".concat(className ? className : ""),
        style,
        children: [
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("circle", {
                cx: "12",
                cy: "12",
                r: "10"
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("line", {
                x1: "12",
                x2: "12",
                y1: "8",
                y2: "12"
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("line", {
                x1: "12",
                x2: "12.01",
                y1: "16",
                y2: "16"
            })
        ]
    });
};
;
 //# sourceMappingURL=chunk-O7ARI5CV.mjs.map
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-N4WEHORG.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorToast",
    ()=>ErrorToast,
    "useAsyncCallback",
    ()=>useAsyncCallback,
    "useErrorToast",
    ()=>useErrorToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$O7ARI5CV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-O7ARI5CV.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$EFL5OBKN$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-EFL5OBKN.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-SKC7AJIV.mjs [app-client] (ecmascript)");
// src/components/error-boundary/error-utils.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$react$2d$markdown$40$8$2e$0$2e$7_$40$types$2b$react$40$19$2e$2$2e$2_react$40$19$2e$1$2e$0$2f$node_modules$2f$react$2d$markdown$2f$lib$2f$react$2d$markdown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ReactMarkdown__as__default$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/react-markdown@8.0.7_@types+react@19.2.2_react@19.1.0/node_modules/react-markdown/lib/react-markdown.js [app-client] (ecmascript) <export ReactMarkdown as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
;
;
function ErrorToast(param) {
    let { errors } = param;
    const errorsToRender = errors.map((error, idx)=>{
        var _a, _b, _c;
        const originalError = "extensions" in error ? (_a = error.extensions) == null ? void 0 : _a.originalError : {};
        const message = (_b = originalError == null ? void 0 : originalError.message) != null ? _b : error.message;
        const code = "extensions" in error ? (_c = error.extensions) == null ? void 0 : _c.code : null;
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            style: {
                marginTop: idx === 0 ? 0 : 10,
                marginBottom: 14
            },
            children: [
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$O7ARI5CV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExclamationMarkIcon"], {
                    style: {
                        marginBottom: 4
                    }
                }),
                code && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                    style: {
                        fontWeight: "600",
                        marginBottom: 4
                    },
                    children: [
                        "Copilot Runtime Error:",
                        " ",
                        /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            style: {
                                fontFamily: "monospace",
                                fontWeight: "normal"
                            },
                            children: code
                        })
                    ]
                }),
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$react$2d$markdown$40$8$2e$0$2e$7_$40$types$2b$react$40$19$2e$2$2e$2_react$40$19$2e$1$2e$0$2f$node_modules$2f$react$2d$markdown$2f$lib$2f$react$2d$markdown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ReactMarkdown__as__default$3e$__["default"], {
                    children: message
                })
            ]
        }, idx);
    });
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        style: {
            fontSize: "13px",
            maxWidth: "600px"
        },
        children: [
            errorsToRender,
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                style: {
                    fontSize: "11px",
                    opacity: 0.75
                },
                children: "NOTE: This error only displays during local development."
            })
        ]
    });
}
function useErrorToast() {
    const { addToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$EFL5OBKN$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useErrorToast.useCallback": (error)=>{
            const errorId = error.map({
                "useErrorToast.useCallback.errorId": (err)=>{
                    var _a, _b;
                    const message = "extensions" in err ? ((_b = (_a = err.extensions) == null ? void 0 : _a.originalError) == null ? void 0 : _b.message) || err.message : err.message;
                    const stack = err.stack || "";
                    return btoa(message + stack).slice(0, 32);
                }
            }["useErrorToast.useCallback.errorId"]).join("|");
            addToast({
                type: "error",
                id: errorId,
                // Toast libraries typically dedupe by id
                message: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ErrorToast, {
                    errors: error
                })
            });
        }
    }["useErrorToast.useCallback"], [
        addToast
    ]);
}
function useAsyncCallback(callback, deps) {
    var _this = this;
    const addErrorToast = useErrorToast();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAsyncCallback.useCallback": function() {
            for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                args[_key] = arguments[_key];
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__async"])(_this, null, {
                "useAsyncCallback.useCallback": function*() {
                    try {
                        return yield callback(...args);
                    } catch (error) {
                        console.error("Error in async callback:", error);
                        addErrorToast([
                            error
                        ]);
                        throw error;
                    }
                }
            }["useAsyncCallback.useCallback"]);
        }
    }["useAsyncCallback.useCallback"], deps);
}
;
 //# sourceMappingURL=chunk-N4WEHORG.mjs.map
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-6ZLPNY7X.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/components/usage-banner.tsx
__turbopack_context__.s([
    "UsageBanner",
    ()=>UsageBanner,
    "getErrorActions",
    ()=>getErrorActions,
    "renderCopilotKitUsage",
    ()=>renderCopilotKitUsage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+shared@1.10.6/node_modules/@copilotkit/shared/dist/chunk-XLQ2EIPH.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
function UsageBanner(param) {
    let { severity = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Severity"].CRITICAL, message = "", onClose, actions } = param;
    if (!message || !severity) {
        return null;
    }
    const themes = {
        [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Severity"].INFO]: {
            bg: "#f8fafc",
            border: "#e2e8f0",
            text: "#475569",
            accent: "#3b82f6"
        },
        [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Severity"].WARNING]: {
            bg: "#fffbeb",
            border: "#fbbf24",
            text: "#92400e",
            accent: "#f59e0b"
        },
        [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Severity"].CRITICAL]: {
            bg: "#fef2f2",
            border: "#fecaca",
            text: "#dc2626",
            accent: "#ef4444"
        }
    };
    const theme = themes[severity];
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("style", {
                children: "\n          @keyframes slideUp {\n            from { opacity: 0; transform: translateX(-50%) translateY(8px); }\n            to { opacity: 1; transform: translateX(-50%) translateY(0); }\n          }\n          \n          .usage-banner {\n            position: fixed;\n            bottom: 24px;\n            left: 50%;\n            transform: translateX(-50%);\n            width: min(600px, calc(100vw - 32px));\n            z-index: 10000;\n            animation: slideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1);\n          }\n          \n          .banner-content {\n            background: linear-gradient(135deg, ".concat(theme.bg, " 0%, ").concat(theme.bg, "f5 100%);\n            border: 1px solid ").concat(theme.border, ";\n            border-radius: 12px;\n            padding: 18px 20px;\n            box-shadow: \n              0 4px 24px rgba(0, 0, 0, 0.08),\n              0 2px 8px rgba(0, 0, 0, 0.04),\n              inset 0 1px 0 rgba(255, 255, 255, 0.7);\n            display: flex;\n            align-items: center;\n            gap: 16px;\n            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;\n            backdrop-filter: blur(12px);\n            position: relative;\n            overflow: hidden;\n          }\n          \n          .banner-content::before {\n            content: '';\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n            height: 1px;\n            background: linear-gradient(90deg, transparent, ").concat(theme.accent, "40, transparent);\n          }\n          \n          .banner-message {\n            color: ").concat(theme.text, ";\n            font-size: 14px;\n            line-height: 1.5;\n            font-weight: 500;\n            flex: 1;\n            letter-spacing: -0.01em;\n          }\n          \n          .close-btn {\n            background: rgba(0, 0, 0, 0.05);\n            border: none;\n            color: ").concat(theme.text, ";\n            cursor: pointer;\n            padding: 0;\n            border-radius: 6px;\n            opacity: 0.6;\n            transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);\n            font-size: 14px;\n            line-height: 1;\n            flex-shrink: 0;\n            width: 24px;\n            height: 24px;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n          }\n          \n          .close-btn:hover {\n            opacity: 1;\n            background: rgba(0, 0, 0, 0.08);\n            transform: scale(1.05);\n          }\n          \n          .btn-primary {\n            background: linear-gradient(135deg, ").concat(theme.accent, " 0%, ").concat(theme.accent, "e6 100%);\n            color: white;\n            border: none;\n            border-radius: 8px;\n            padding: 10px 18px;\n            font-size: 13px;\n            font-weight: 600;\n            cursor: pointer;\n            transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);\n            font-family: inherit;\n            flex-shrink: 0;\n            box-shadow: \n              0 2px 8px ").concat(theme.accent, "30,\n              inset 0 1px 0 rgba(255, 255, 255, 0.2);\n            letter-spacing: -0.01em;\n          }\n          \n          .btn-primary:hover {\n            transform: translateY(-1px) scale(1.02);\n            box-shadow: \n              0 4px 12px ").concat(theme.accent, "40,\n              inset 0 1px 0 rgba(255, 255, 255, 0.25);\n          }\n          \n          .btn-primary:active {\n            transform: translateY(0) scale(0.98);\n            transition: all 0.08s cubic-bezier(0.16, 1, 0.3, 1);\n          }\n          \n          @media (max-width: 640px) {\n            .usage-banner {\n              width: calc(100vw - 24px);\n            }\n            \n            .banner-content {\n              padding: 16px;\n              gap: 12px;\n            }\n            \n            .banner-message {\n              font-size: 13px;\n              line-height: 1.45;\n            }\n            \n            .btn-primary {\n              padding: 8px 14px;\n              font-size: 12px;\n            }\n            \n            .close-btn {\n              width: 22px;\n              height: 22px;\n              font-size: 12px;\n            }\n          }\n        ")
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: "usage-banner",
                children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                    className: "banner-content",
                    children: [
                        /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                            className: "banner-message",
                            children: message
                        }),
                        (actions == null ? void 0 : actions.primary) && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
                            className: "btn-primary",
                            onClick: actions.primary.onClick,
                            children: actions.primary.label
                        }),
                        onClose && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
                            className: "close-btn",
                            onClick: onClose,
                            title: "Close",
                            children: "\xD7"
                        })
                    ]
                })
            })
        ]
    });
}
var getErrorActions = (error)=>{
    switch(error.code){
        case __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotKitErrorCode"].MISSING_PUBLIC_API_KEY_ERROR:
            return {
                primary: {
                    label: "Show me how",
                    onClick: ()=>window.open("https://docs.copilotkit.ai/premium#how-do-i-get-access-to-premium-features", "_blank", "noopener,noreferrer")
                }
            };
        case __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotKitErrorCode"].UPGRADE_REQUIRED_ERROR:
            return {
                primary: {
                    label: "Upgrade",
                    onClick: ()=>window.open("https://cloud.copilotkit.ai", "_blank", "noopener,noreferrer")
                }
            };
        default:
            return void 0;
    }
};
function renderCopilotKitUsage(error, onClose) {
    if (error.visibility !== __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorVisibility"].BANNER) {
        return null;
    }
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(UsageBanner, {
        severity: error.severity || __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Severity"].CRITICAL,
        message: error.message,
        onClose,
        actions: getErrorActions(error)
    });
}
;
 //# sourceMappingURL=chunk-6ZLPNY7X.mjs.map
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-N4VN2B5S.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CopilotErrorBoundary",
    ()=>CopilotErrorBoundary,
    "ErrorToast",
    ()=>ErrorToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$PMAFHQ7P$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-PMAFHQ7P.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$N4WEHORG$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-N4WEHORG.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$6ZLPNY7X$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-6ZLPNY7X.mjs [app-client] (ecmascript)");
// src/components/error-boundary/error-boundary.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+shared@1.10.6/node_modules/@copilotkit/shared/dist/chunk-XLQ2EIPH.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
;
;
var statusChecker = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$PMAFHQ7P$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusChecker"]();
var CopilotErrorBoundary = class extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Component {
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error
        };
    }
    componentDidMount() {
        if (this.props.publicApiKey) {
            statusChecker.start(this.props.publicApiKey, (newStatus)=>{
                this.setState((prevState)=>{
                    var _a;
                    if ((newStatus == null ? void 0 : newStatus.severity) !== ((_a = prevState.status) == null ? void 0 : _a.severity)) {
                        return {
                            status: newStatus != null ? newStatus : void 0
                        };
                    }
                    return null;
                });
            });
        }
    }
    componentWillUnmount() {
        statusChecker.stop();
    }
    componentDidCatch(error, errorInfo) {
        console.error("CopilotKit Error:", error, errorInfo);
    }
    render() {
        var _a, _b, _c, _d;
        if (this.state.hasError) {
            if (this.state.error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotKitError"]) {
                return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        this.props.children,
                        this.props.showUsageBanner && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$6ZLPNY7X$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UsageBanner"], {
                            severity: (_b = (_a = this.state.status) == null ? void 0 : _a.severity) != null ? _b : this.state.error.severity,
                            message: (_d = (_c = this.state.status) == null ? void 0 : _c.message) != null ? _d : this.state.error.message,
                            actions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$6ZLPNY7X$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getErrorActions"])(this.state.error)
                        })
                    ]
                });
            }
            throw this.state.error;
        }
        return this.props.children;
    }
    constructor(props){
        super(props);
        this.state = {
            hasError: false
        };
    }
};
function ErrorToast(param) {
    let { error, children } = param;
    const addErrorToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$N4WEHORG$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useErrorToast"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ErrorToast.useEffect": ()=>{
            if (error) {
                addErrorToast([
                    error
                ]);
            }
        }
    }["ErrorToast.useEffect"], [
        error,
        addErrorToast
    ]);
    if (!error) throw error;
    return children;
}
;
 //# sourceMappingURL=chunk-N4VN2B5S.mjs.map
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-PIF5KJYI.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/components/dev-console/icons.tsx
__turbopack_context__.s([
    "CheckIcon",
    ()=>CheckIcon,
    "ChevronDownIcon",
    ()=>ChevronDownIcon,
    "CopilotKitIcon",
    ()=>CopilotKitIcon,
    "ExclamationMarkIcon",
    ()=>ExclamationMarkIcon,
    "ExclamationMarkTriangleIcon",
    ()=>ExclamationMarkTriangleIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
var ExclamationMarkTriangleIcon = ()=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        width: "13.3967723px",
        height: "12px",
        viewBox: "0 0 13.3967723 12",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
            id: "Page-1",
            stroke: "none",
            strokeWidth: "1",
            fill: "none",
            fillRule: "evenodd",
            children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
                id: "exclamation-triangle",
                fill: "#CD2121",
                children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                    d: "M5.39935802,0.75 C5.97670802,-0.25 7.42007802,-0.25 7.99742802,0.75 L13.193588,9.75 C13.770888,10.75 13.049288,12 11.894588,12 L1.50223802,12 C0.34753802,12 -0.37414898,10.75 0.20319802,9.75 L5.39935802,0.75 Z M6.69838802,2.5 C7.11260802,2.5 7.44838802,2.83579 7.44838802,3.25 L7.44838802,6.25 C7.44838802,6.66421 7.11260802,7 6.69838802,7 C6.28417802,7 5.94838802,6.66421 5.94838802,6.25 L5.94838802,3.25 C5.94838802,2.83579 6.28417802,2.5 6.69838802,2.5 Z M6.69838802,10.5 C7.25067802,10.5 7.69838802,10.0523 7.69838802,9.5 C7.69838802,8.9477 7.25067802,8.5 6.69838802,8.5 C6.14610802,8.5 5.69838802,8.9477 5.69838802,9.5 C5.69838802,10.0523 6.14610802,10.5 6.69838802,10.5 Z",
                    id: "Shape"
                })
            })
        })
    });
var ExclamationMarkIcon = ()=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        width: "14px",
        height: "14px",
        viewBox: "0 0 14 14",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
            id: "Page-1",
            stroke: "none",
            strokeWidth: "1",
            fill: "none",
            fillRule: "evenodd",
            children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
                id: "exclamation-circle",
                fill: "#EC662C",
                children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                    d: "M7,14 C10.866,14 14,10.866 14,7 C14,3.13401 10.866,0 7,0 C3.13401,0 0,3.13401 0,7 C0,10.866 3.13401,14 7,14 Z M7,3 C7.41421,3 7.75,3.33579 7.75,3.75 L7.75,6.75 C7.75,7.16421 7.41421,7.5 7,7.5 C6.58579,7.5 6.25,7.16421 6.25,6.75 L6.25,3.75 C6.25,3.33579 6.58579,3 7,3 Z M7,11 C7.55228,11 8,10.5523 8,10 C8,9.4477 7.55228,9 7,9 C6.44772,9 6,9.4477 6,10 C6,10.5523 6.44772,11 7,11 Z",
                    id: "Shape"
                })
            })
        })
    });
var ChevronDownIcon = ()=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        width: "7px",
        height: "4px",
        viewBox: "0 0 7 4",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "currentColor",
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
            id: "Page-1",
            stroke: "none",
            strokeWidth: "1",
            fill: "none",
            fillRule: "evenodd",
            children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
                id: "Group",
                fill: "currentColor",
                fillRule: "nonzero",
                children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                    d: "M3.71690723,3.90271086 C3.59268176,4.03242971 3.39143629,4.03242971 3.26721082,3.90271086 L0.0853966595,0.57605615 C-0.0314221035,0.444981627 -0.0279751448,0.240725043 0.0931934622,0.114040675 C0.214362069,-0.0126436935 0.409725445,-0.0162475626 0.535093061,0.105888951 L3.49205902,3.19746006 L6.44902499,0.105888951 C6.52834574,0.0168884389 6.64780588,-0.0197473458 6.7605411,0.0103538404 C6.87327633,0.0404550266 6.96130636,0.132492308 6.99009696,0.250359396 C7.01888756,0.368226483 6.98384687,0.493124608 6.89872139,0.57605615 L3.71690723,3.90271086 Z",
                    id: "Path"
                })
            })
        })
    });
var CheckIcon = ()=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        width: "14px",
        height: "14px",
        viewBox: "0 0 14 14",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
            id: "Page-1",
            stroke: "none",
            strokeWidth: "1",
            fill: "none",
            fillRule: "evenodd",
            children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
                id: "Group-2",
                transform: "translate(-118, 0)",
                fill: "#1BC030",
                fillRule: "nonzero",
                children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
                    id: "Group",
                    transform: "translate(118, 0)",
                    children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                        d: "M0,7 C0,3.13384615 3.13384615,0 7,0 C10.8661538,0 14,3.13384615 14,7 C14,10.8661538 10.8661538,14 7,14 C3.13384615,14 0,10.8661538 0,7 Z M9.59179487,5.69764103 C9.70905818,5.54139023 9.73249341,5.33388318 9.65303227,5.15541491 C9.57357113,4.97694665 9.40367989,4.85551619 9.20909814,4.83811118 C9.01451638,4.82070616 8.82577109,4.91005717 8.71589744,5.07158974 L6.39261538,8.32389744 L5.22666667,7.15794872 C5.01450582,6.96025518 4.68389046,6.9660885 4.47883563,7.17114332 C4.27378081,7.37619815 4.26794748,7.70681351 4.46564103,7.91897436 L6.08102564,9.53435897 C6.19289944,9.64614839 6.3482622,9.70310251 6.50588106,9.69010587 C6.66349993,9.67710922 6.80743532,9.59547613 6.89948718,9.46687179 L9.59179487,5.69764103 L9.59179487,5.69764103 Z",
                        id: "Shape"
                    })
                })
            })
        })
    });
var CopilotKitIcon = ()=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        width: "33px",
        height: "35px",
        viewBox: "0 0 33 35",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("title", {
                children: "bd5c9079-929b-4d55-bdc9-16d1c8181b71"
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
                id: "Page-1",
                stroke: "none",
                strokeWidth: "1",
                fill: "none",
                fillRule: "evenodd",
                children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("image", {
                    x: "0",
                    y: "0",
                    width: "33",
                    height: "35",
                    xlinkHref: "data:image/png;base64,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"
                })
            })
        ]
    });
;
 //# sourceMappingURL=chunk-PIF5KJYI.mjs.map
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-OKCYPO4I.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DeveloperConsoleModal",
    ()=>DeveloperConsoleModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$PIF5KJYI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-PIF5KJYI.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$EUX2P2E7$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-EUX2P2E7.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$ZLQVRPDS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-ZLQVRPDS.mjs [app-client] (ecmascript)");
// src/components/dev-console/developer-console-modal.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+shared@1.10.6/node_modules/@copilotkit/shared/dist/chunk-XLQ2EIPH.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
;
;
function DeveloperConsoleModal(param) {
    let { isOpen, onClose, hasApiKey } = param;
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$EUX2P2E7$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCopilotContext"])();
    const messagesContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$ZLQVRPDS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCopilotMessagesContext"])();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("actions");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DeveloperConsoleModal.useEffect": ()=>{
            const handleEscape = {
                "DeveloperConsoleModal.useEffect.handleEscape": (e)=>{
                    if (e.key === "Escape") {
                        onClose();
                    }
                }
            }["DeveloperConsoleModal.useEffect.handleEscape"];
            if (isOpen) {
                document.addEventListener("keydown", handleEscape);
                document.body.style.overflow = "hidden";
            }
            return ({
                "DeveloperConsoleModal.useEffect": ()=>{
                    document.removeEventListener("keydown", handleEscape);
                    document.body.style.overflow = "unset";
                }
            })["DeveloperConsoleModal.useEffect"];
        }
    }["DeveloperConsoleModal.useEffect"], [
        isOpen,
        onClose
    ]);
    if (!isOpen) return null;
    const displayContext = hasApiKey ? context : {
        actions: {
            search_web: {
                name: "search_web",
                description: "Search the web for information"
            },
            send_email: {
                name: "send_email",
                description: "Send an email to a contact"
            },
            create_document: {
                name: "create_document",
                description: "Create a new document"
            },
            analyze_code: {
                name: "analyze_code",
                description: "Analyze code for issues and improvements"
            },
            generate_tests: {
                name: "generate_tests",
                description: "Generate unit tests for functions"
            }
        },
        getAllContext: ()=>[
                {
                    content: "User preferences: dark mode enabled, TypeScript preferred",
                    metadata: {
                        source: "settings"
                    }
                },
                {
                    content: "Current project: Building a React application with CopilotKit",
                    metadata: {
                        source: "project"
                    }
                },
                {
                    content: "Recent activity: Implemented authentication system",
                    metadata: {
                        source: "activity"
                    }
                },
                {
                    content: "Development environment: VS Code, Node.js 18, React 18",
                    metadata: {
                        source: "environment"
                    }
                }
            ],
        coagentStates: {
            "main-agent": {
                status: "active",
                lastUpdate: Date.now()
            },
            "code-assistant": {
                status: "active",
                lastUpdate: Date.now() - 15e3
            },
            "search-agent": {
                status: "idle",
                lastUpdate: Date.now() - 6e4
            }
        },
        getDocumentsContext: ()=>[
                {
                    content: "README.md: Project setup and installation instructions",
                    metadata: {
                        type: "documentation"
                    }
                },
                {
                    content: "API Documentation: CopilotKit integration guide",
                    metadata: {
                        type: "documentation"
                    }
                },
                {
                    content: "package.json: Project dependencies and scripts",
                    metadata: {
                        type: "configuration"
                    }
                }
            ]
    };
    const displayMessagesContext = hasApiKey ? messagesContext : {
        messages: [
            {
                id: "1",
                role: "user",
                content: "Help me implement a todo list with drag and drop functionality"
            },
            {
                id: "2",
                role: "assistant",
                content: "I'll help you create a todo list with drag and drop. Let me start by setting up the basic components and then add the drag and drop functionality using React DnD."
            },
            {
                id: "3",
                role: "user",
                content: "Can you also add priority levels and due dates?"
            },
            {
                id: "4",
                role: "assistant",
                content: "Absolutely! I'll enhance the todo items with priority levels (high, medium, low) and due date functionality. This will make your todo list much more powerful for task management."
            },
            {
                id: "5",
                role: "user",
                content: "Perfect! How about adding categories or tags?"
            }
        ]
    };
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        style: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px"
        },
        onClick: onClose,
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            style: {
                width: "1152px",
                maxWidth: "95vw",
                height: "80vh",
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                position: "relative"
            },
            onClick: (e)=>e.stopPropagation(),
            children: [
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "24px",
                        borderBottom: "1px solid #e5e7eb",
                        minHeight: "73px",
                        flexShrink: 0,
                        filter: !hasApiKey ? "blur(0.3px)" : "none",
                        opacity: !hasApiKey ? 0.95 : 1
                    },
                    children: [
                        /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "12px"
                            },
                            children: [
                                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$PIF5KJYI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotKitIcon"], {}),
                                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("h1", {
                                    style: {
                                        fontWeight: "bold",
                                        fontSize: "20px",
                                        color: "#1f2937",
                                        margin: 0
                                    },
                                    children: "Inspector"
                                }),
                                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                                    style: {
                                        fontSize: "14px",
                                        color: "#6b7280",
                                        backgroundColor: "#f3f4f6",
                                        padding: "4px 8px",
                                        borderRadius: "4px"
                                    },
                                    children: [
                                        "v",
                                        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COPILOTKIT_VERSION"]
                                    ]
                                })
                            ]
                        }),
                        /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
                            onClick: onClose,
                            style: {
                                color: "#9ca3af",
                                fontSize: "24px",
                                fontWeight: "300",
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                padding: "4px"
                            },
                            onMouseEnter: (e)=>e.currentTarget.style.color = "#4b5563",
                            onMouseLeave: (e)=>e.currentTarget.style.color = "#9ca3af",
                            children: "\xD7"
                        })
                    ]
                }),
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    style: {
                        display: "flex",
                        borderBottom: "1px solid #e5e7eb",
                        backgroundColor: "#f9fafb",
                        minHeight: "50px",
                        flexShrink: 0,
                        filter: !hasApiKey ? "blur(0.3px)" : "none",
                        opacity: !hasApiKey ? 0.9 : 1
                    },
                    children: [
                        {
                            id: "actions",
                            label: "Actions",
                            count: Object.keys(displayContext.actions).length
                        },
                        {
                            id: "readables",
                            label: "Readables",
                            count: displayContext.getAllContext().length
                        },
                        {
                            id: "agent",
                            label: "Agent Status",
                            count: Object.keys(displayContext.coagentStates).length
                        },
                        {
                            id: "messages",
                            label: "Messages",
                            count: displayMessagesContext.messages.length
                        },
                        {
                            id: "context",
                            label: "Context",
                            count: displayContext.getDocumentsContext([]).length
                        }
                    ].map((tab)=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("button", {
                            onClick: ()=>setActiveTab(tab.id),
                            style: {
                                padding: "12px 24px",
                                fontSize: "14px",
                                fontWeight: "500",
                                border: "none",
                                cursor: "pointer",
                                backgroundColor: activeTab === tab.id ? "white" : "transparent",
                                color: activeTab === tab.id ? "#2563eb" : "#6b7280",
                                borderBottom: activeTab === tab.id ? "2px solid #2563eb" : "none",
                                transition: "all 0.2s"
                            },
                            onMouseEnter: (e)=>{
                                if (activeTab !== tab.id) {
                                    e.currentTarget.style.color = "#1f2937";
                                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                                }
                            },
                            onMouseLeave: (e)=>{
                                if (activeTab !== tab.id) {
                                    e.currentTarget.style.color = "#6b7280";
                                    e.currentTarget.style.backgroundColor = "transparent";
                                }
                            },
                            children: [
                                tab.label,
                                tab.count > 0 && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                    style: {
                                        marginLeft: "8px",
                                        backgroundColor: "#e5e7eb",
                                        color: "#374151",
                                        padding: "2px 8px",
                                        borderRadius: "9999px",
                                        fontSize: "12px"
                                    },
                                    children: tab.count
                                })
                            ]
                        }, tab.id))
                }),
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                    style: {
                        height: "calc(100% - 142px)",
                        overflow: "auto",
                        padding: "24px",
                        backgroundColor: "#f9fafb",
                        filter: !hasApiKey ? "blur(0.3px)" : "none",
                        opacity: !hasApiKey ? 0.85 : 1
                    },
                    children: [
                        activeTab === "actions" && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ActionsTab, {
                            context: displayContext
                        }),
                        activeTab === "readables" && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ReadablesTab, {
                            context: displayContext
                        }),
                        activeTab === "agent" && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(AgentStatusTab, {
                            context: displayContext
                        }),
                        activeTab === "messages" && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(MessagesTab, {
                            messagesContext: displayMessagesContext
                        }),
                        activeTab === "context" && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ContextTab, {
                            context: displayContext
                        })
                    ]
                }),
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                    style: {
                        padding: "16px 24px",
                        borderTop: "1px solid #e5e7eb",
                        backgroundColor: "white",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        minHeight: "57px",
                        flexShrink: 0,
                        filter: !hasApiKey ? "blur(0.3px)" : "none",
                        opacity: !hasApiKey ? 0.9 : 1
                    },
                    children: [
                        /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                            style: {
                                fontSize: "14px",
                                color: "#6b7280"
                            },
                            children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("a", {
                                href: "https://github.com/CopilotKit/CopilotKit/issues",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                style: {
                                    color: "#2563eb",
                                    textDecoration: "none"
                                },
                                onMouseEnter: (e)=>e.currentTarget.style.textDecoration = "underline",
                                onMouseLeave: (e)=>e.currentTarget.style.textDecoration = "none",
                                children: "Report an issue"
                            })
                        }),
                        /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                            style: {
                                fontSize: "14px",
                                color: "#6b7280"
                            },
                            children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("a", {
                                href: "https://mcp.copilotkit.ai/",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                style: {
                                    color: "#2563eb",
                                    textDecoration: "none"
                                },
                                onMouseEnter: (e)=>e.currentTarget.style.textDecoration = "underline",
                                onMouseLeave: (e)=>e.currentTarget.style.textDecoration = "none",
                                children: "Add MCP Server \u2192"
                            })
                        })
                    ]
                }),
                !hasApiKey && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    style: {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(2px)",
                        WebkitBackdropFilter: "blur(2px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "12px",
                        zIndex: 10
                    },
                    onClick: (e)=>e.stopPropagation(),
                    children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("button", {
                        onClick: ()=>window.open("https://cloud.copilotkit.ai/sign-in", "_blank"),
                        style: {
                            // Following button system specifications
                            height: "48px",
                            padding: "12px 24px",
                            backgroundColor: "#030507",
                            // textPrimary token
                            color: "#FFFFFF",
                            borderRadius: "12px",
                            // Medium radius token
                            border: "none",
                            cursor: "pointer",
                            fontSize: "14px",
                            // Medium Semi Bold typography
                            fontWeight: "600",
                            fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                            lineHeight: "22px",
                            boxShadow: "0 4px 16px rgba(3, 5, 7, 0.2), 0 1px 3px rgba(3, 5, 7, 0.1)",
                            transition: "all 200ms ease",
                            // 200ms ease as per specs
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px"
                        },
                        onMouseEnter: (e)=>{
                            e.currentTarget.style.backgroundColor = "#575758";
                            e.currentTarget.style.transform = "translateY(-1px)";
                            e.currentTarget.style.boxShadow = "0 6px 20px rgba(3, 5, 7, 0.25), 0 2px 4px rgba(3, 5, 7, 0.15)";
                        },
                        onMouseLeave: (e)=>{
                            e.currentTarget.style.backgroundColor = "#030507";
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 16px rgba(3, 5, 7, 0.2), 0 1px 3px rgba(3, 5, 7, 0.1)";
                        },
                        onMouseDown: (e)=>{
                            e.currentTarget.style.backgroundColor = "#858589";
                            e.currentTarget.style.transform = "translateY(0)";
                        },
                        onMouseUp: (e)=>{
                            e.currentTarget.style.backgroundColor = "#575758";
                            e.currentTarget.style.transform = "translateY(-1px)";
                        },
                        onFocus: (e)=>{
                            e.currentTarget.style.outline = "2px solid #BEC9FF";
                            e.currentTarget.style.outlineOffset = "2px";
                        },
                        onBlur: (e)=>{
                            e.currentTarget.style.outline = "none";
                        },
                        children: [
                            "Get License Key",
                            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                style: {
                                    fontSize: "16px",
                                    marginLeft: "-4px"
                                },
                                children: "\u2192"
                            })
                        ]
                    })
                })
            ]
        })
    });
}
function ActionsTab(param) {
    let { context } = param;
    const actions = Object.values(context.actions);
    if (actions.length === 0) {
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            style: {
                textAlign: "center",
                padding: "48px 0",
                color: "#6b7280"
            },
            children: [
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                    style: {
                        fontSize: "18px",
                        margin: "0 0 8px 0"
                    },
                    children: "No actions available"
                }),
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                    style: {
                        fontSize: "14px",
                        margin: 0
                    },
                    children: "Actions will appear here when registered"
                })
            ]
        });
    }
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            gap: "16px"
        },
        children: actions.map((action, index)=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                style: {
                    backgroundColor: "white",
                    padding: "16px",
                    borderRadius: "8px",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e5e7eb"
                },
                children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                    style: {
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between"
                    },
                    children: [
                        /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            style: {
                                flex: 1
                            },
                            children: [
                                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("h3", {
                                    style: {
                                        fontWeight: "600",
                                        color: "#1f2937",
                                        margin: "0 0 4px 0"
                                    },
                                    children: action.name
                                }),
                                action.description && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                                    style: {
                                        fontSize: "14px",
                                        color: "#4b5563",
                                        margin: "0 0 12px 0"
                                    },
                                    children: action.description
                                }),
                                action.parameters && action.parameters.length > 0 && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                    style: {
                                        marginTop: "12px"
                                    },
                                    children: [
                                        /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                                            style: {
                                                fontSize: "12px",
                                                fontWeight: "500",
                                                color: "#6b7280",
                                                textTransform: "uppercase",
                                                margin: "0 0 4px 0"
                                            },
                                            children: "Parameters:"
                                        }),
                                        /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                            style: {
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "4px"
                                            },
                                            children: action.parameters.map((param, pIndex)=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                                    style: {
                                                        fontSize: "14px"
                                                    },
                                                    children: [
                                                        /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                            style: {
                                                                fontFamily: "monospace",
                                                                color: "#374151"
                                                            },
                                                            children: param.name
                                                        }),
                                                        param.required && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                            style: {
                                                                marginLeft: "4px",
                                                                fontSize: "12px",
                                                                color: "#ef4444"
                                                            },
                                                            children: "*required"
                                                        }),
                                                        param.type && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                                                            style: {
                                                                marginLeft: "8px",
                                                                fontSize: "12px",
                                                                color: "#6b7280"
                                                            },
                                                            children: [
                                                                "(",
                                                                param.type,
                                                                ")"
                                                            ]
                                                        })
                                                    ]
                                                }, pIndex))
                                        })
                                    ]
                                })
                            ]
                        }),
                        /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                            style: {
                                marginLeft: "16px"
                            },
                            children: action.status === "available" ? /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$PIF5KJYI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CheckIcon"], {}) : /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$PIF5KJYI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExclamationMarkTriangleIcon"], {})
                        })
                    ]
                })
            }, index))
    });
}
function ReadablesTab(param) {
    let { context } = param;
    const readables = context.getAllContext();
    if (readables.length === 0) {
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            style: {
                textAlign: "center",
                padding: "48px 0",
                color: "#6b7280"
            },
            children: [
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                    style: {
                        fontSize: "18px",
                        margin: "0 0 8px 0"
                    },
                    children: "No readable context available"
                }),
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                    style: {
                        fontSize: "14px",
                        margin: 0
                    },
                    children: "Readable context will appear here when provided"
                })
            ]
        });
    }
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            gap: "16px"
        },
        children: readables.map((readable, index)=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                style: {
                    backgroundColor: "white",
                    padding: "16px",
                    borderRadius: "8px",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e5e7eb"
                },
                children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    style: {
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between"
                    },
                    children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        style: {
                            flex: 1
                        },
                        children: [
                            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("h3", {
                                style: {
                                    fontWeight: "600",
                                    color: "#1f2937",
                                    margin: "0 0 4px 0"
                                },
                                children: readable.name || "Readable ".concat(index + 1)
                            }),
                            readable.description && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                                style: {
                                    fontSize: "14px",
                                    color: "#4b5563",
                                    margin: "0 0 12px 0"
                                },
                                children: readable.description
                            }),
                            readable.value && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("pre", {
                                style: {
                                    marginTop: "12px",
                                    padding: "8px",
                                    backgroundColor: "#f9fafb",
                                    borderRadius: "4px",
                                    fontSize: "12px",
                                    overflowX: "auto",
                                    margin: "12px 0 0 0"
                                },
                                children: JSON.stringify(readable.value, null, 2)
                            })
                        ]
                    })
                })
            }, index))
    });
}
function AgentStatusTab(param) {
    let { context } = param;
    const agentStates = context.coagentStates || {};
    const agentStateEntries = Object.entries(agentStates);
    if (agentStateEntries.length === 0) {
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            style: {
                textAlign: "center",
                padding: "48px 0",
                color: "#6b7280"
            },
            children: [
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                    style: {
                        fontSize: "18px",
                        margin: "0 0 8px 0"
                    },
                    children: "No agent states available"
                }),
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                    style: {
                        fontSize: "14px",
                        margin: 0
                    },
                    children: "Agent states will appear here when agents are active"
                })
            ]
        });
    }
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            gap: "24px"
        },
        children: agentStateEntries.map((param)=>{
            let [agentName, state] = param;
            return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                style: {
                    backgroundColor: "white",
                    padding: "24px",
                    borderRadius: "8px",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e5e7eb"
                },
                children: [
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "16px"
                        },
                        children: [
                            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("h3", {
                                style: {
                                    fontWeight: "600",
                                    fontSize: "18px",
                                    color: "#1f2937",
                                    margin: 0
                                },
                                children: agentName
                            }),
                            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                style: {
                                    padding: "4px 12px",
                                    borderRadius: "9999px",
                                    fontSize: "12px",
                                    fontWeight: "500",
                                    backgroundColor: state.status === "running" ? "#dcfce7" : state.status === "complete" ? "#dbeafe" : "#f3f4f6",
                                    color: state.status === "running" ? "#166534" : state.status === "complete" ? "#1e40af" : "#1f2937"
                                },
                                children: state.status || "idle"
                            })
                        ]
                    }),
                    state.state && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        style: {
                            marginBottom: "12px"
                        },
                        children: [
                            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                                style: {
                                    fontSize: "12px",
                                    fontWeight: "500",
                                    color: "#6b7280",
                                    textTransform: "uppercase",
                                    margin: "0 0 4px 0"
                                },
                                children: "Current State:"
                            }),
                            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("pre", {
                                style: {
                                    padding: "12px",
                                    backgroundColor: "#f9fafb",
                                    borderRadius: "4px",
                                    fontSize: "12px",
                                    overflowX: "auto",
                                    margin: 0
                                },
                                children: JSON.stringify(state.state, null, 2)
                            })
                        ]
                    }),
                    state.running && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        style: {
                            marginTop: "16px",
                            display: "flex",
                            alignItems: "center",
                            fontSize: "14px",
                            color: "#4b5563"
                        },
                        children: [
                            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                style: {
                                    marginRight: "8px"
                                },
                                children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
                                    width: "16",
                                    height: "16",
                                    viewBox: "0 0 16 16",
                                    style: {
                                        animation: "spin 1s linear infinite"
                                    },
                                    children: [
                                        /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("style", {
                                            children: "@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }"
                                        }),
                                        /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("circle", {
                                            cx: "8",
                                            cy: "8",
                                            r: "6",
                                            fill: "none",
                                            stroke: "#4b5563",
                                            strokeWidth: "2",
                                            strokeDasharray: "9 3"
                                        })
                                    ]
                                })
                            }),
                            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                children: "Agent is currently running..."
                            })
                        ]
                    })
                ]
            }, agentName);
        })
    });
}
function MessagesTab(param) {
    let { messagesContext } = param;
    const messages = messagesContext.messages || [];
    if (messages.length === 0) {
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            style: {
                textAlign: "center",
                padding: "48px 0",
                color: "#6b7280"
            },
            children: [
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                    style: {
                        fontSize: "18px",
                        margin: "0 0 8px 0"
                    },
                    children: "No messages yet"
                }),
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                    style: {
                        fontSize: "14px",
                        margin: 0
                    },
                    children: "Messages will appear here as the conversation progresses"
                })
            ]
        });
    }
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            gap: "16px"
        },
        children: messages.map((message, index)=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                style: {
                    padding: "16px",
                    borderRadius: "8px",
                    backgroundColor: message.role === "user" ? "#eff6ff" : message.role === "assistant" ? "#f9fafb" : "#fefce8",
                    border: "1px solid ".concat(message.role === "user" ? "#c7d2fe" : message.role === "assistant" ? "#e5e7eb" : "#fde047"),
                    marginLeft: message.role === "user" ? "48px" : "0",
                    marginRight: message.role === "assistant" ? "48px" : "0"
                },
                children: [
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            marginBottom: "8px"
                        },
                        children: [
                            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                style: {
                                    fontWeight: "500",
                                    fontSize: "14px",
                                    color: "#374151",
                                    textTransform: "capitalize"
                                },
                                children: message.role || "system"
                            }),
                            message.timestamp && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                style: {
                                    fontSize: "12px",
                                    color: "#6b7280"
                                },
                                children: new Date(message.timestamp).toLocaleTimeString()
                            })
                        ]
                    }),
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        style: {
                            fontSize: "14px",
                            color: "#1f2937",
                            whiteSpace: "pre-wrap"
                        },
                        children: message.content || ""
                    })
                ]
            }, index))
    });
}
function ContextTab(param) {
    let { context } = param;
    const documents = context.getDocumentsContext([]);
    if (documents.length === 0) {
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            style: {
                textAlign: "center",
                padding: "48px 0",
                color: "#6b7280"
            },
            children: [
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                    style: {
                        fontSize: "18px",
                        margin: "0 0 8px 0"
                    },
                    children: "No document context available"
                }),
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                    style: {
                        fontSize: "14px",
                        margin: 0
                    },
                    children: "Document context will appear here when provided"
                })
            ]
        });
    }
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            gap: "16px"
        },
        children: documents.map((doc, index)=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                style: {
                    backgroundColor: "white",
                    padding: "16px",
                    borderRadius: "8px",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e5e7eb"
                },
                children: [
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("h3", {
                        style: {
                            fontWeight: "600",
                            color: "#1f2937",
                            margin: "0 0 8px 0"
                        },
                        children: doc.name || "Document ".concat(index + 1)
                    }),
                    doc.content && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("pre", {
                        style: {
                            padding: "12px",
                            backgroundColor: "#f9fafb",
                            borderRadius: "4px",
                            fontSize: "12px",
                            overflowX: "auto",
                            margin: 0
                        },
                        children: doc.content
                    })
                ]
            }, index))
    });
}
;
 //# sourceMappingURL=chunk-OKCYPO4I.mjs.map
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-DXEQPN43.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConsoleTrigger",
    ()=>ConsoleTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$OKCYPO4I$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-OKCYPO4I.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$PIF5KJYI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-PIF5KJYI.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$EUX2P2E7$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-EUX2P2E7.mjs [app-client] (ecmascript)");
// src/components/dev-console/console-trigger.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
;
var INSPECTOR_HIDE_KEY = "cpk:inspector:hidden";
function ConsoleTrigger(param) {
    let { position = "bottom-right" } = param;
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$EUX2P2E7$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCopilotContext"])();
    const hasApiKey = Boolean(context.copilotApiConfig.publicApiKey);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [buttonPosition, setButtonPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isHidden, setIsHidden] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const dragRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const buttonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConsoleTrigger.useEffect": ()=>{
            setMounted(true);
            try {
                const hidden = typeof window !== "undefined" ? localStorage.getItem(INSPECTOR_HIDE_KEY) : null;
                if (hidden === "1" || hidden === "true") {
                    setIsHidden(true);
                }
            } catch (e) {}
            if (typeof window !== "undefined" && !buttonPosition) {
                const buttonSize = 60;
                const margin = 24;
                const initialPosition = {
                    x: margin,
                    y: window.innerHeight - buttonSize - margin
                };
                setButtonPosition(initialPosition);
            }
        }
    }["ConsoleTrigger.useEffect"], [
        position
    ]);
    const handleMouseDown = (e)=>{
        e.preventDefault();
        if (!buttonPosition) return;
        dragRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            buttonX: buttonPosition.x,
            buttonY: buttonPosition.y
        };
        setIsDragging(true);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConsoleTrigger.useEffect": ()=>{
            if (!isDragging) return;
            const handleMouseMove = {
                "ConsoleTrigger.useEffect.handleMouseMove": (e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    if (!dragRef.current) return;
                    const deltaX = e.clientX - dragRef.current.startX;
                    const deltaY = e.clientY - dragRef.current.startY;
                    let newX = dragRef.current.buttonX + deltaX;
                    let newY = dragRef.current.buttonY + deltaY;
                    newX = Math.max(0, Math.min(newX, window.innerWidth - 60));
                    newY = Math.max(0, Math.min(newY, window.innerHeight - 60));
                    setButtonPosition({
                        x: newX,
                        y: newY
                    });
                }
            }["ConsoleTrigger.useEffect.handleMouseMove"];
            const handleMouseUp = {
                "ConsoleTrigger.useEffect.handleMouseUp": (e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDragging(false);
                    dragRef.current = null;
                }
            }["ConsoleTrigger.useEffect.handleMouseUp"];
            document.addEventListener("mousemove", handleMouseMove, {
                capture: true,
                passive: false
            });
            document.addEventListener("mouseup", handleMouseUp, {
                capture: true,
                passive: false
            });
            return ({
                "ConsoleTrigger.useEffect": ()=>{
                    document.removeEventListener("mousemove", handleMouseMove, {
                        capture: true
                    });
                    document.removeEventListener("mouseup", handleMouseUp, {
                        capture: true
                    });
                }
            })["ConsoleTrigger.useEffect"];
        }
    }["ConsoleTrigger.useEffect"], [
        isDragging
    ]);
    if (!mounted || !buttonPosition || isHidden) {
        return null;
    }
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("button", {
                ref: buttonRef,
                onClick: (e)=>{
                    if (!isDragging) {
                        if (e.metaKey || e.altKey) {
                            try {
                                localStorage.setItem(INSPECTOR_HIDE_KEY, "1");
                            } catch (e2) {}
                            setIsHidden(true);
                            return;
                        }
                        setIsModalOpen(true);
                    }
                },
                onContextMenu: (e)=>{
                    e.preventDefault();
                    try {
                        localStorage.setItem(INSPECTOR_HIDE_KEY, "1");
                    } catch (e2) {}
                    setIsHidden(true);
                },
                onMouseDown: handleMouseDown,
                onMouseEnter: ()=>setIsHovered(true),
                onMouseLeave: ()=>setIsHovered(false),
                style: {
                    position: "fixed",
                    left: "".concat(buttonPosition.x, "px"),
                    top: "".concat(buttonPosition.y, "px"),
                    zIndex: 2147483647,
                    width: "60px",
                    height: "60px",
                    background: isDragging ? "#000000" : isHovered ? "#111111" : "#000000",
                    color: "white",
                    borderRadius: "50%",
                    boxShadow: isDragging ? "0 8px 32px rgba(0, 0, 0, 0.6), 0 4px 16px rgba(0, 0, 0, 0.4)" : isHovered ? "0 12px 40px rgba(0, 0, 0, 0.7), 0 6px 20px rgba(0, 0, 0, 0.5)" : "0 6px 20px rgba(0, 0, 0, 0.5), 0 3px 10px rgba(0, 0, 0, 0.3)",
                    transition: isDragging ? "none" : "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    cursor: isDragging ? "grabbing" : "grab",
                    opacity: 1,
                    userSelect: "none",
                    transform: isDragging ? "scale(1.05)" : isHovered ? "scale(1.1)" : "scale(1)",
                    backdropFilter: "blur(10px)",
                    pointerEvents: "auto",
                    isolation: "isolate"
                },
                title: hasApiKey ? "Open Inspector (Drag to move)" : "Inspector (License Key Required, Drag to move)",
                children: [
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        onClick: (e)=>{
                            e.preventDefault();
                            e.stopPropagation();
                            try {
                                localStorage.setItem(INSPECTOR_HIDE_KEY, "1");
                            } catch (e2) {}
                            setIsHidden(true);
                        },
                        style: {
                            position: "absolute",
                            bottom: "2px",
                            right: "2px",
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            background: "#ffffff",
                            color: "#ef4444",
                            fontSize: "14px",
                            lineHeight: "18px",
                            textAlign: "center",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
                            cursor: "pointer",
                            border: "1px solid #e5e7eb",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 1
                        },
                        title: "Hide Inspector",
                        children: "\xD7"
                    }),
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        style: {
                            width: "28px",
                            height: "28px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
                        },
                        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$PIF5KJYI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotKitIcon"], {})
                    }),
                    !hasApiKey && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        style: {
                            position: "absolute",
                            top: "-2px",
                            right: "-2px",
                            width: "18px",
                            height: "18px",
                            background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 2px 8px rgba(255, 107, 107, 0.4)",
                            border: "2px solid white"
                        },
                        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            style: {
                                fontSize: "10px",
                                color: "white",
                                fontWeight: "bold"
                            },
                            children: "!"
                        })
                    })
                ]
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$OKCYPO4I$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DeveloperConsoleModal"], {
                isOpen: isModalOpen,
                onClose: ()=>setIsModalOpen(false),
                hasApiKey
            })
        ]
    });
}
;
 //# sourceMappingURL=chunk-DXEQPN43.mjs.map
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-RKTVJRK7.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "use_tree_default",
    ()=>use_tree_default
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-SKC7AJIV.mjs [app-client] (ecmascript)");
// src/hooks/use-tree.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$VNNKZIFB$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+shared@1.10.6/node_modules/@copilotkit/shared/dist/chunk-VNNKZIFB.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
;
var removeNode = (nodes, id)=>{
    return nodes.reduce((result, node)=>{
        if (node.id !== id) {
            const newNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])({}, node), {
                children: removeNode(node.children, id)
            });
            result.push(newNode);
        }
        return result;
    }, []);
};
var addNode = (nodes, newNode, parentId)=>{
    if (!parentId) {
        return [
            ...nodes,
            newNode
        ];
    }
    return nodes.map((node)=>{
        if (node.id === parentId) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])({}, node), {
                children: [
                    ...node.children,
                    newNode
                ]
            });
        } else if (node.children.length) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])({}, node), {
                children: addNode(node.children, newNode, parentId)
            });
        }
        return node;
    });
};
var treeIndentationRepresentation = (index, indentLevel)=>{
    if (indentLevel === 0) {
        return (index + 1).toString();
    } else if (indentLevel === 1) {
        return String.fromCharCode(65 + index);
    } else if (indentLevel === 2) {
        return String.fromCharCode(97 + index);
    } else {
        return "-";
    }
};
var printNode = function(node) {
    let prefix = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", indentLevel = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    const indent = " ".repeat(3).repeat(indentLevel);
    const prefixPlusIndentLength = prefix.length + indent.length;
    const subsequentLinesPrefix = " ".repeat(prefixPlusIndentLength);
    const valueLines = node.value.split("\n");
    const outputFirstLine = "".concat(indent).concat(prefix).concat(valueLines[0]);
    const outputSubsequentLines = valueLines.slice(1).map((line)=>"".concat(subsequentLinesPrefix).concat(line)).join("\n");
    let output = "".concat(outputFirstLine, "\n");
    if (outputSubsequentLines) {
        output += "".concat(outputSubsequentLines, "\n");
    }
    const childPrePrefix = " ".repeat(prefix.length);
    node.children.forEach((child, index)=>output += printNode(child, "".concat(childPrePrefix).concat(treeIndentationRepresentation(index, indentLevel + 1), ". "), indentLevel + 1));
    return output;
};
function treeReducer(state, action) {
    switch(action.type){
        case "ADD_NODE":
            {
                const { value, parentId, id: newNodeId } = action;
                const newNode = {
                    id: newNodeId,
                    value,
                    children: [],
                    categories: new Set(action.categories)
                };
                try {
                    return addNode(state, newNode, parentId);
                } catch (error) {
                    console.error("Error while adding node with id ".concat(newNodeId, ": ").concat(error));
                    return state;
                }
            }
        case "REMOVE_NODE":
            return removeNode(state, action.id);
        default:
            return state;
    }
}
var useTree = ()=>{
    const [tree, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(treeReducer, []);
    const addElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTree.useCallback[addElement]": (value, categories, parentId)=>{
            const newNodeId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$VNNKZIFB$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["randomId"])();
            dispatch({
                type: "ADD_NODE",
                value,
                parentId,
                id: newNodeId,
                categories
            });
            return newNodeId;
        }
    }["useTree.useCallback[addElement]"], []);
    const removeElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTree.useCallback[removeElement]": (id)=>{
            dispatch({
                type: "REMOVE_NODE",
                id
            });
        }
    }["useTree.useCallback[removeElement]"], []);
    const getAllElements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTree.useCallback[getAllElements]": ()=>{
            return tree;
        }
    }["useTree.useCallback[getAllElements]"], [
        tree
    ]);
    const printTree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTree.useCallback[printTree]": (categories)=>{
            const categoriesSet = new Set(categories);
            let output = "";
            tree.forEach({
                "useTree.useCallback[printTree]": (node, index)=>{
                    if (!setsHaveIntersection(categoriesSet, node.categories)) {
                        return;
                    }
                    if (index !== 0) {
                        output += "\n";
                    }
                    output += printNode(node, "".concat(treeIndentationRepresentation(index, 0), ". "));
                }
            }["useTree.useCallback[printTree]"]);
            return output;
        }
    }["useTree.useCallback[printTree]"], [
        tree
    ]);
    return {
        tree,
        addElement,
        printTree,
        removeElement,
        getAllElements
    };
};
var use_tree_default = useTree;
function setsHaveIntersection(setA, setB) {
    const [smallerSet, largerSet] = setA.size <= setB.size ? [
        setA,
        setB
    ] : [
        setB,
        setA
    ];
    for (let item of smallerSet){
        if (largerSet.has(item)) {
            return true;
        }
    }
    return false;
}
;
 //# sourceMappingURL=chunk-RKTVJRK7.mjs.map
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-5FHSUKQL.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/hooks/use-flat-category-store.ts
__turbopack_context__.s([
    "use_flat_category_store_default",
    ()=>use_flat_category_store_default
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$VNNKZIFB$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+shared@1.10.6/node_modules/@copilotkit/shared/dist/chunk-VNNKZIFB.mjs [app-client] (ecmascript)");
;
;
var useFlatCategoryStore = ()=>{
    const [elements, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(flatCategoryStoreReducer, /* @__PURE__ */ new Map());
    const addElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFlatCategoryStore.useCallback[addElement]": (value, categories)=>{
            const newId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$VNNKZIFB$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["randomId"])();
            dispatch({
                type: "ADD_ELEMENT",
                value,
                id: newId,
                categories
            });
            return newId;
        }
    }["useFlatCategoryStore.useCallback[addElement]"], []);
    const removeElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFlatCategoryStore.useCallback[removeElement]": (id)=>{
            dispatch({
                type: "REMOVE_ELEMENT",
                id
            });
        }
    }["useFlatCategoryStore.useCallback[removeElement]"], []);
    const allElements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFlatCategoryStore.useCallback[allElements]": (categories)=>{
            const categoriesSet = new Set(categories);
            const result = [];
            elements.forEach({
                "useFlatCategoryStore.useCallback[allElements]": (element)=>{
                    if (setsHaveIntersection(categoriesSet, element.categories)) {
                        result.push(element.value);
                    }
                }
            }["useFlatCategoryStore.useCallback[allElements]"]);
            return result;
        }
    }["useFlatCategoryStore.useCallback[allElements]"], [
        elements
    ]);
    return {
        addElement,
        removeElement,
        allElements
    };
};
var use_flat_category_store_default = useFlatCategoryStore;
function flatCategoryStoreReducer(state, action) {
    switch(action.type){
        case "ADD_ELEMENT":
            {
                const { value, id, categories } = action;
                const newElement = {
                    id,
                    value,
                    categories: new Set(categories)
                };
                const newState = new Map(state);
                newState.set(id, newElement);
                return newState;
            }
        case "REMOVE_ELEMENT":
            {
                const newState = new Map(state);
                newState.delete(action.id);
                return newState;
            }
        default:
            return state;
    }
}
function setsHaveIntersection(setA, setB) {
    const [smallerSet, largerSet] = setA.size <= setB.size ? [
        setA,
        setB
    ] : [
        setB,
        setA
    ];
    for (let item of smallerSet){
        if (largerSet.has(item)) {
            return true;
        }
    }
    return false;
}
;
 //# sourceMappingURL=chunk-5FHSUKQL.mjs.map
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-6ESSSQ7Q.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCopilotRuntimeClient",
    ()=>useCopilotRuntimeClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$EFL5OBKN$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-EFL5OBKN.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-SKC7AJIV.mjs [app-client] (ecmascript)");
// src/hooks/use-copilot-runtime-client.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$runtime$2d$client$2d$gql$40$1$2e$10$2e$6_graphql$40$16$2e$12$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$SYV4LIDU$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+runtime-client-gql@1.10.6_graphql@16.12.0_react@19.1.0/node_modules/@copilotkit/runtime-client-gql/dist/chunk-SYV4LIDU.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+shared@1.10.6/node_modules/@copilotkit/shared/dist/chunk-XLQ2EIPH.mjs [app-client] (ecmascript)");
;
;
;
;
;
var useCopilotRuntimeClient = (options)=>{
    const { setBannerError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$EFL5OBKN$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const _a = options, { showDevConsole, onError } = _a, runtimeOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__objRest"])(_a, [
        "showDevConsole",
        "onError"
    ]);
    const lastStructuredErrorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const traceUIError = (error, originalError)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__async"])(void 0, null, function*() {
            try {
                const errorEvent = {
                    type: "error",
                    timestamp: Date.now(),
                    context: {
                        source: "ui",
                        request: {
                            operation: "runtimeClient",
                            url: runtimeOptions.url,
                            startTime: Date.now()
                        },
                        technical: {
                            environment: "browser",
                            userAgent: typeof navigator !== "undefined" ? navigator.userAgent : void 0,
                            stackTrace: originalError instanceof Error ? originalError.stack : void 0
                        }
                    },
                    error
                };
                yield onError(errorEvent);
            } catch (error2) {
                console.error("Error in onError handler:", error2);
            }
        });
    const runtimeClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useCopilotRuntimeClient.useMemo[runtimeClient]": ()=>{
            return new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$runtime$2d$client$2d$gql$40$1$2e$10$2e$6_graphql$40$16$2e$12$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$SYV4LIDU$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotRuntimeClient"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])({}, runtimeOptions), {
                handleGQLErrors: {
                    "useCopilotRuntimeClient.useMemo[runtimeClient]": (error)=>{
                        var _a2;
                        if ((_a2 = error.graphQLErrors) == null ? void 0 : _a2.length) {
                            const graphQLErrors = error.graphQLErrors;
                            const routeError = {
                                "useCopilotRuntimeClient.useMemo[runtimeClient].routeError": (gqlError)=>{
                                    const extensions = gqlError.extensions;
                                    const visibility = extensions == null ? void 0 : extensions.visibility;
                                    if (visibility === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorVisibility"].SILENT) {
                                        console.error("CopilotKit Silent Error:", gqlError.message);
                                        return;
                                    }
                                    const now = Date.now();
                                    const errorMessage = gqlError.message;
                                    if (lastStructuredErrorRef.current && lastStructuredErrorRef.current.message === errorMessage && now - lastStructuredErrorRef.current.timestamp < 150) {
                                        return;
                                    }
                                    lastStructuredErrorRef.current = {
                                        message: errorMessage,
                                        timestamp: now
                                    };
                                    const ckError = createStructuredError(gqlError);
                                    if (ckError) {
                                        setBannerError(ckError);
                                        traceUIError(ckError, gqlError);
                                    } else {
                                        const fallbackError = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotKitError"]({
                                            message: gqlError.message,
                                            code: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotKitErrorCode"].UNKNOWN
                                        });
                                        setBannerError(fallbackError);
                                        traceUIError(fallbackError, gqlError);
                                    }
                                }
                            }["useCopilotRuntimeClient.useMemo[runtimeClient].routeError"];
                            graphQLErrors.forEach(routeError);
                        } else {
                            const fallbackError = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotKitError"]({
                                message: (error == null ? void 0 : error.message) || String(error),
                                code: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotKitErrorCode"].UNKNOWN
                            });
                            setBannerError(fallbackError);
                            traceUIError(fallbackError, error);
                        }
                    }
                }["useCopilotRuntimeClient.useMemo[runtimeClient]"],
                handleGQLWarning: {
                    "useCopilotRuntimeClient.useMemo[runtimeClient]": (message)=>{
                        console.warn(message);
                        const warningError = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotKitError"]({
                            message,
                            code: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotKitErrorCode"].UNKNOWN
                        });
                        setBannerError(warningError);
                    }
                }["useCopilotRuntimeClient.useMemo[runtimeClient]"]
            }));
        }
    }["useCopilotRuntimeClient.useMemo[runtimeClient]"], [
        runtimeOptions,
        setBannerError,
        onError
    ]);
    return runtimeClient;
};
function createStructuredError(gqlError) {
    var _a, _b, _c;
    const extensions = gqlError.extensions;
    const originalError = extensions == null ? void 0 : extensions.originalError;
    const message = (originalError == null ? void 0 : originalError.message) || gqlError.message;
    const code = extensions == null ? void 0 : extensions.code;
    if (code) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotKitError"]({
            message,
            code
        });
    }
    if ((_a = originalError == null ? void 0 : originalError.stack) == null ? void 0 : _a.includes("CopilotApiDiscoveryError")) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotKitApiDiscoveryError"]({
            message
        });
    }
    if ((_b = originalError == null ? void 0 : originalError.stack) == null ? void 0 : _b.includes("CopilotKitRemoteEndpointDiscoveryError")) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotKitRemoteEndpointDiscoveryError"]({
            message
        });
    }
    if ((_c = originalError == null ? void 0 : originalError.stack) == null ? void 0 : _c.includes("CopilotKitAgentDiscoveryError")) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotKitAgentDiscoveryError"]({
            agentName: "",
            availableAgents: []
        });
    }
    return null;
}
;
 //# sourceMappingURL=chunk-6ESSSQ7Q.mjs.map
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-CI4KD357.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CopilotKit",
    ()=>CopilotKit,
    "CopilotKitInternal",
    ()=>CopilotKitInternal,
    "defaultCopilotContextCategories",
    ()=>defaultCopilotContextCategories,
    "extract",
    ()=>extract,
    "reloadSuggestions",
    ()=>reloadSuggestions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$C6IANC2R$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-C6IANC2R.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$N4VN2B5S$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-N4VN2B5S.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$ICIK2BSB$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-ICIK2BSB.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$DXEQPN43$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-DXEQPN43.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$RKTVJRK7$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-RKTVJRK7.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$5FHSUKQL$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-5FHSUKQL.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$6ESSSQ7Q$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-6ESSSQ7Q.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$EFL5OBKN$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-EFL5OBKN.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$6ZLPNY7X$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-6ZLPNY7X.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$EUX2P2E7$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-EUX2P2E7.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-SKC7AJIV.mjs [app-client] (ecmascript)");
// src/utils/extract.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$2KQ6HEWZ$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+shared@1.10.6/node_modules/@copilotkit/shared/dist/chunk-2KQ6HEWZ.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$runtime$2d$client$2d$gql$40$1$2e$10$2e$6_graphql$40$16$2e$12$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$VVFJT2PN$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+runtime-client-gql@1.10.6_graphql@16.12.0_react@19.1.0/node_modules/@copilotkit/runtime-client-gql/dist/chunk-VVFJT2PN.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$runtime$2d$client$2d$gql$40$1$2e$10$2e$6_graphql$40$16$2e$12$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$TDZBGVZB$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+runtime-client-gql@1.10.6_graphql@16.12.0_react@19.1.0/node_modules/@copilotkit/runtime-client-gql/dist/chunk-TDZBGVZB.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$runtime$2d$client$2d$gql$40$1$2e$10$2e$6_graphql$40$16$2e$12$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$OBDQ5BWD$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+runtime-client-gql@1.10.6_graphql@16.12.0_react@19.1.0/node_modules/@copilotkit/runtime-client-gql/dist/chunk-OBDQ5BWD.mjs [app-client] (ecmascript)");
// src/components/copilot-provider/copilotkit.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$GYZIHHE6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+shared@1.10.6/node_modules/@copilotkit/shared/dist/chunk-GYZIHHE6.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$VNNKZIFB$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+shared@1.10.6/node_modules/@copilotkit/shared/dist/chunk-VNNKZIFB.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+shared@1.10.6/node_modules/@copilotkit/shared/dist/chunk-XLQ2EIPH.mjs [app-client] (ecmascript)");
// src/components/copilot-provider/copilotkit.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
var reloadSuggestions = (context, chatSuggestionConfiguration, setCurrentSuggestions, abortControllerRef)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__async"])(void 0, null, function*() {
        const abortController = abortControllerRef.current;
        if (abortController == null ? void 0 : abortController.signal.aborted) {
            return;
        }
        const setSuggestionsIfNotAborted = (suggestions)=>{
            if (!(abortController == null ? void 0 : abortController.signal.aborted) && abortControllerRef.current === abortController) {
                setCurrentSuggestions(suggestions);
            }
        };
        try {
            const tools = JSON.stringify(Object.values(context.actions).map((action)=>({
                    name: action.name,
                    description: action.description,
                    jsonSchema: JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$2KQ6HEWZ$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["actionParametersToJsonSchema"])(action.parameters))
                })));
            const allSuggestions = [];
            let hasSuccessfulSuggestions = false;
            let hasErrors = false;
            let lastError = null;
            const enabledConfigs = Object.values(chatSuggestionConfiguration).filter((config)=>config.instructions && config.instructions.trim().length > 0);
            if (enabledConfigs.length === 0) {
                return;
            }
            setSuggestionsIfNotAborted([]);
            for (const config of enabledConfigs){
                if (abortController == null ? void 0 : abortController.signal.aborted) {
                    setSuggestionsIfNotAborted([]);
                    return;
                }
                try {
                    const result = yield extract({
                        context,
                        instructions: "Suggest what the user could say next. Provide clear, highly relevant suggestions. Do not literally suggest function calls. ",
                        data: "".concat(config.instructions, "\n\nAvailable tools: ").concat(tools, "\n\n"),
                        requestType: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$runtime$2d$client$2d$gql$40$1$2e$10$2e$6_graphql$40$16$2e$12$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$OBDQ5BWD$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotRequestType"].Task,
                        parameters: [
                            {
                                name: "suggestions",
                                type: "object[]",
                                attributes: [
                                    {
                                        name: "title",
                                        description: "The title of the suggestion. This is shown as a button and should be short.",
                                        type: "string"
                                    },
                                    {
                                        name: "message",
                                        description: "The message to send when the suggestion is clicked. This should be a clear, complete sentence and will be sent as an instruction to the AI.",
                                        type: "string"
                                    }
                                ]
                            }
                        ],
                        include: {
                            messages: true,
                            readable: true
                        },
                        abortSignal: abortController == null ? void 0 : abortController.signal,
                        stream: (param)=>{
                            let { status, args } = param;
                            if (abortController == null ? void 0 : abortController.signal.aborted) {
                                return;
                            }
                            const suggestions = args.suggestions || [];
                            const newSuggestions = [];
                            for(let i = 0; i < suggestions.length; i++){
                                if (config.maxSuggestions !== void 0 && i >= config.maxSuggestions) {
                                    break;
                                }
                                const suggestion = suggestions[i];
                                if (!suggestion || typeof suggestion !== "object") {
                                    continue;
                                }
                                const { title, message } = suggestion;
                                const hasValidTitle = title && typeof title === "string" && title.trim().length > 0;
                                const hasValidMessage = message && typeof message === "string" && message.trim().length > 0;
                                if (!hasValidTitle) {
                                    continue;
                                }
                                const partial = i === suggestions.length - 1 && status !== "complete";
                                newSuggestions.push({
                                    title: title.trim(),
                                    message: hasValidMessage ? message.trim() : "",
                                    // Use title as fallback
                                    partial,
                                    className: config.className
                                });
                            }
                            setSuggestionsIfNotAborted([
                                ...allSuggestions,
                                ...newSuggestions
                            ]);
                        }
                    });
                    if ((result == null ? void 0 : result.suggestions) && Array.isArray(result.suggestions)) {
                        const validSuggestions = result.suggestions.filter((suggestion)=>suggestion && typeof suggestion.title === "string" && suggestion.title.trim().length > 0).map((suggestion)=>({
                                title: suggestion.title.trim(),
                                message: suggestion.message && typeof suggestion.message === "string" && suggestion.message.trim() ? suggestion.message.trim() : suggestion.title.trim()
                            }));
                        if (validSuggestions.length > 0) {
                            allSuggestions.push(...validSuggestions);
                            hasSuccessfulSuggestions = true;
                        }
                    }
                } catch (error) {
                    hasErrors = true;
                    lastError = error instanceof Error ? error : new Error(String(error));
                }
            }
            if (hasSuccessfulSuggestions && allSuggestions.length > 0) {
                const uniqueSuggestions = allSuggestions.filter((suggestion, index, self)=>index === self.findIndex((s)=>s.message === suggestion.message));
                setSuggestionsIfNotAborted(uniqueSuggestions);
            } else if (hasErrors) {
                const errorMessage = lastError ? lastError.message : "Failed to generate suggestions due to API errors";
                throw new Error(errorMessage);
            }
        } catch (error) {
            throw error;
        }
    });
;
function CopilotKit(_a) {
    var _b = _a, { children } = _b, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__objRest"])(_b, [
        "children"
    ]);
    const enabled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$ICIK2BSB$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldShowDevConsole"])(props.showDevConsole);
    const publicApiKey = props.publicApiKey || props.publicLicenseKey;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$EFL5OBKN$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastProvider"], {
        enabled,
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$N4VN2B5S$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotErrorBoundary"], {
            publicApiKey,
            showUsageBanner: enabled,
            children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(CopilotKitInternal, (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])({}, props), {
                children
            }))
        })
    });
}
function CopilotKitInternal(cpkProps) {
    var _b;
    const _a = cpkProps, { children } = _a, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__objRest"])(_a, [
        "children"
    ]);
    validateProps(cpkProps);
    const publicApiKey = props.publicLicenseKey || props.publicApiKey;
    const chatApiEndpoint = props.runtimeUrl || __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$GYZIHHE6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COPILOT_CLOUD_CHAT_URL"];
    const [actions, setActions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [coAgentStateRenders, setCoAgentStateRenders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const chatComponentsCache = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        actions: {},
        coAgentStateRenders: {}
    });
    const { addElement, removeElement, printTree, getAllElements } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$RKTVJRK7$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use_tree_default"])();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [chatInstructions, setChatInstructions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [authStates, setAuthStates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [extensions, setExtensions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [additionalInstructions, setAdditionalInstructions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const { addElement: addDocument, removeElement: removeDocument, allElements: allDocuments } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$5FHSUKQL$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use_flat_category_store_default"])();
    const setAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CopilotKitInternal.useCallback[setAction]": (id, action)=>{
            setActions({
                "CopilotKitInternal.useCallback[setAction]": (prevPoints)=>{
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])({}, prevPoints), {
                        [id]: action
                    });
                }
            }["CopilotKitInternal.useCallback[setAction]"]);
        }
    }["CopilotKitInternal.useCallback[setAction]"], []);
    const removeAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CopilotKitInternal.useCallback[removeAction]": (id)=>{
            setActions({
                "CopilotKitInternal.useCallback[removeAction]": (prevPoints)=>{
                    const newPoints = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])({}, prevPoints);
                    delete newPoints[id];
                    return newPoints;
                }
            }["CopilotKitInternal.useCallback[removeAction]"]);
        }
    }["CopilotKitInternal.useCallback[removeAction]"], []);
    const setCoAgentStateRender = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CopilotKitInternal.useCallback[setCoAgentStateRender]": (id, stateRender)=>{
            setCoAgentStateRenders({
                "CopilotKitInternal.useCallback[setCoAgentStateRender]": (prevPoints)=>{
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])({}, prevPoints), {
                        [id]: stateRender
                    });
                }
            }["CopilotKitInternal.useCallback[setCoAgentStateRender]"]);
        }
    }["CopilotKitInternal.useCallback[setCoAgentStateRender]"], []);
    const removeCoAgentStateRender = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CopilotKitInternal.useCallback[removeCoAgentStateRender]": (id)=>{
            setCoAgentStateRenders({
                "CopilotKitInternal.useCallback[removeCoAgentStateRender]": (prevPoints)=>{
                    const newPoints = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])({}, prevPoints);
                    delete newPoints[id];
                    return newPoints;
                }
            }["CopilotKitInternal.useCallback[removeCoAgentStateRender]"]);
        }
    }["CopilotKitInternal.useCallback[removeCoAgentStateRender]"], []);
    const getContextString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CopilotKitInternal.useCallback[getContextString]": (documents, categories)=>{
            const documentsString = documents.map({
                "CopilotKitInternal.useCallback[getContextString].documentsString": (document)=>{
                    return "".concat(document.name, " (").concat(document.sourceApplication, "):\n").concat(document.getContents());
                }
            }["CopilotKitInternal.useCallback[getContextString].documentsString"]).join("\n\n");
            const nonDocumentStrings = printTree(categories);
            return "".concat(documentsString, "\n\n").concat(nonDocumentStrings);
        }
    }["CopilotKitInternal.useCallback[getContextString]"], [
        printTree
    ]);
    const addContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CopilotKitInternal.useCallback[addContext]": function(context, parentId) {
            let categories = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : defaultCopilotContextCategories;
            return addElement(context, categories, parentId);
        }
    }["CopilotKitInternal.useCallback[addContext]"], [
        addElement
    ]);
    const removeContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CopilotKitInternal.useCallback[removeContext]": (id)=>{
            removeElement(id);
        }
    }["CopilotKitInternal.useCallback[removeContext]"], [
        removeElement
    ]);
    const getAllContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CopilotKitInternal.useCallback[getAllContext]": ()=>{
            return getAllElements();
        }
    }["CopilotKitInternal.useCallback[getAllContext]"], [
        getAllElements
    ]);
    const getFunctionCallHandler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CopilotKitInternal.useCallback[getFunctionCallHandler]": (customEntryPoints)=>{
            return entryPointsToFunctionCallHandler(Object.values(customEntryPoints || actions));
        }
    }["CopilotKitInternal.useCallback[getFunctionCallHandler]"], [
        actions
    ]);
    const getDocumentsContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CopilotKitInternal.useCallback[getDocumentsContext]": (categories)=>{
            return allDocuments(categories);
        }
    }["CopilotKitInternal.useCallback[getDocumentsContext]"], [
        allDocuments
    ]);
    const addDocumentContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CopilotKitInternal.useCallback[addDocumentContext]": function(documentPointer) {
            let categories = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : defaultCopilotContextCategories;
            return addDocument(documentPointer, categories);
        }
    }["CopilotKitInternal.useCallback[addDocumentContext]"], [
        addDocument
    ]);
    const removeDocumentContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CopilotKitInternal.useCallback[removeDocumentContext]": (documentId)=>{
            removeDocument(documentId);
        }
    }["CopilotKitInternal.useCallback[removeDocumentContext]"], [
        removeDocument
    ]);
    const copilotApiConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CopilotKitInternal.useMemo[copilotApiConfig]": ()=>{
            var _a2, _b2;
            let cloud = void 0;
            if (publicApiKey) {
                cloud = {
                    guardrails: {
                        input: {
                            restrictToTopic: {
                                enabled: Boolean(props.guardrails_c),
                                validTopics: ((_a2 = props.guardrails_c) == null ? void 0 : _a2.validTopics) || [],
                                invalidTopics: ((_b2 = props.guardrails_c) == null ? void 0 : _b2.invalidTopics) || []
                            }
                        }
                    }
                };
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])({
                publicApiKey
            }, cloud ? {
                cloud
            } : {}), {
                chatApiEndpoint,
                headers: props.headers || {},
                properties: props.properties || {},
                transcribeAudioUrl: props.transcribeAudioUrl,
                textToSpeechUrl: props.textToSpeechUrl,
                credentials: props.credentials
            });
        }
    }["CopilotKitInternal.useMemo[copilotApiConfig]"], [
        publicApiKey,
        props.headers,
        props.properties,
        props.transcribeAudioUrl,
        props.textToSpeechUrl,
        props.credentials,
        props.cloudRestrictToTopic,
        props.guardrails_c
    ]);
    const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CopilotKitInternal.useMemo[headers]": ()=>{
            const authHeaders = Object.values(authStates || {}).reduce({
                "CopilotKitInternal.useMemo[headers].authHeaders": (acc, state)=>{
                    if (state.status === "authenticated" && state.authHeaders) {
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])({}, acc), Object.entries(state.authHeaders).reduce({
                            "CopilotKitInternal.useMemo[headers].authHeaders": (headers2, param)=>{
                                let [key, value] = param;
                                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])({}, headers2), {
                                    [key.startsWith("X-Custom-") ? key : "X-Custom-".concat(key)]: value
                                });
                            }
                        }["CopilotKitInternal.useMemo[headers].authHeaders"], {}));
                    }
                    return acc;
                }
            }["CopilotKitInternal.useMemo[headers].authHeaders"], {});
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])({}, copilotApiConfig.headers || {}), copilotApiConfig.publicApiKey ? {
                [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$GYZIHHE6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COPILOT_CLOUD_PUBLIC_API_KEY_HEADER"]]: copilotApiConfig.publicApiKey
            } : {}), authHeaders);
        }
    }["CopilotKitInternal.useMemo[headers]"], [
        copilotApiConfig.headers,
        copilotApiConfig.publicApiKey,
        authStates
    ]);
    const [internalErrorHandlers, _setInternalErrorHandler] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const setInternalErrorHandler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CopilotKitInternal.useCallback[setInternalErrorHandler]": (handler)=>{
            _setInternalErrorHandler({
                "CopilotKitInternal.useCallback[setInternalErrorHandler]": (prev)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])({}, prev), handler)
            }["CopilotKitInternal.useCallback[setInternalErrorHandler]"]);
        }
    }["CopilotKitInternal.useCallback[setInternalErrorHandler]"], []);
    const removeInternalErrorHandler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CopilotKitInternal.useCallback[removeInternalErrorHandler]": (key)=>{
            _setInternalErrorHandler({
                "CopilotKitInternal.useCallback[removeInternalErrorHandler]": (prev)=>{
                    const _a2 = prev, { [key]: _removed } = _a2, rest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__objRest"])(_a2, [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__restKey"])(key)
                    ]);
                    return rest;
                }
            }["CopilotKitInternal.useCallback[removeInternalErrorHandler]"]);
        }
    }["CopilotKitInternal.useCallback[removeInternalErrorHandler]"], []);
    const onErrorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(props.onError);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CopilotKitInternal.useEffect": ()=>{
            onErrorRef.current = props.onError;
        }
    }["CopilotKitInternal.useEffect"], [
        props.onError
    ]);
    const internalHandlersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CopilotKitInternal.useEffect": ()=>{
            internalHandlersRef.current = internalErrorHandlers;
        }
    }["CopilotKitInternal.useEffect"], [
        internalErrorHandlers
    ]);
    const handleErrors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CopilotKitInternal.useCallback[handleErrors]": (error)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__async"])(this, null, {
                "CopilotKitInternal.useCallback[handleErrors]": function*() {
                    if (copilotApiConfig.publicApiKey && onErrorRef.current) {
                        try {
                            yield onErrorRef.current(error);
                        } catch (e) {
                            console.error("Error in public onError handler:", e);
                        }
                    }
                    const handlers = Object.values(internalHandlersRef.current);
                    yield Promise.all(handlers.map({
                        "CopilotKitInternal.useCallback[handleErrors]": (h)=>Promise.resolve(h(error)).catch({
                                "CopilotKitInternal.useCallback[handleErrors]": (e)=>console.error("Error in internal error handler:", e)
                            }["CopilotKitInternal.useCallback[handleErrors]"])
                    }["CopilotKitInternal.useCallback[handleErrors]"]));
                }
            }["CopilotKitInternal.useCallback[handleErrors]"])
    }["CopilotKitInternal.useCallback[handleErrors]"], [
        copilotApiConfig.publicApiKey
    ]);
    const runtimeClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$6ESSSQ7Q$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCopilotRuntimeClient"])({
        url: copilotApiConfig.chatApiEndpoint,
        publicApiKey,
        headers,
        credentials: copilotApiConfig.credentials,
        showDevConsole: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$ICIK2BSB$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldShowDevConsole"])(props.showDevConsole),
        onError: handleErrors
    });
    const [chatSuggestionConfiguration, setChatSuggestionConfiguration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const addChatSuggestionConfiguration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CopilotKitInternal.useCallback[addChatSuggestionConfiguration]": (id, suggestion)=>{
            setChatSuggestionConfiguration({
                "CopilotKitInternal.useCallback[addChatSuggestionConfiguration]": (prev)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])({}, prev), {
                        [id]: suggestion
                    })
            }["CopilotKitInternal.useCallback[addChatSuggestionConfiguration]"]);
        }
    }["CopilotKitInternal.useCallback[addChatSuggestionConfiguration]"], [
        setChatSuggestionConfiguration
    ]);
    const removeChatSuggestionConfiguration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CopilotKitInternal.useCallback[removeChatSuggestionConfiguration]": (id)=>{
            setChatSuggestionConfiguration({
                "CopilotKitInternal.useCallback[removeChatSuggestionConfiguration]": (prev)=>{
                    const _a2 = prev, { [id]: _ } = _a2, rest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__objRest"])(_a2, [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__restKey"])(id)
                    ]);
                    return rest;
                }
            }["CopilotKitInternal.useCallback[removeChatSuggestionConfiguration]"]);
        }
    }["CopilotKitInternal.useCallback[removeChatSuggestionConfiguration]"], [
        setChatSuggestionConfiguration
    ]);
    const [availableAgents, setAvailableAgents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [coagentStates, setCoagentStates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const coagentStatesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const setCoagentStatesWithRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CopilotKitInternal.useCallback[setCoagentStatesWithRef]": (value)=>{
            const newValue = typeof value === "function" ? value(coagentStatesRef.current) : value;
            coagentStatesRef.current = newValue;
            setCoagentStates({
                "CopilotKitInternal.useCallback[setCoagentStatesWithRef]": (prev)=>{
                    return newValue;
                }
            }["CopilotKitInternal.useCallback[setCoagentStatesWithRef]"]);
        }
    }["CopilotKitInternal.useCallback[setCoagentStatesWithRef]"], []);
    const hasLoadedAgents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CopilotKitInternal.useEffect": ()=>{
            if (hasLoadedAgents.current) return;
            const fetchData = {
                "CopilotKitInternal.useEffect.fetchData": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__async"])(this, null, {
                        "CopilotKitInternal.useEffect.fetchData": function*() {
                            var _a2;
                            const result = yield runtimeClient.availableAgents();
                            if ((_a2 = result.data) == null ? void 0 : _a2.availableAgents) {
                                setAvailableAgents(result.data.availableAgents.agents);
                            }
                            hasLoadedAgents.current = true;
                        }
                    }["CopilotKitInternal.useEffect.fetchData"])
            }["CopilotKitInternal.useEffect.fetchData"];
            void fetchData();
        }
    }["CopilotKitInternal.useEffect"], []);
    let initialAgentSession = null;
    if (props.agent) {
        initialAgentSession = {
            agentName: props.agent
        };
    }
    const [agentSession, setAgentSession] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialAgentSession);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CopilotKitInternal.useEffect": ()=>{
            if (props.agent) {
                setAgentSession({
                    agentName: props.agent
                });
            } else {
                setAgentSession(null);
            }
        }
    }["CopilotKitInternal.useEffect"], [
        props.agent
    ]);
    const [internalThreadId, setInternalThreadId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(props.threadId || (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$VNNKZIFB$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["randomUUID"])());
    const setThreadId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CopilotKitInternal.useCallback[setThreadId]": (value)=>{
            if (props.threadId) {
                throw new Error("Cannot call setThreadId() when threadId is provided via props.");
            }
            setInternalThreadId(value);
        }
    }["CopilotKitInternal.useCallback[setThreadId]"], [
        props.threadId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CopilotKitInternal.useEffect": ()=>{
            if (props.threadId !== void 0) {
                setInternalThreadId(props.threadId);
            }
        }
    }["CopilotKitInternal.useEffect"], [
        props.threadId
    ]);
    const [runId, setRunId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const chatAbortControllerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const showDevConsole = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$ICIK2BSB$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldShowDevConsole"])(props.showDevConsole);
    const [langGraphInterruptActions, _setLangGraphInterruptAction] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const setLangGraphInterruptAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CopilotKitInternal.useCallback[setLangGraphInterruptAction]": (threadId, action)=>{
            _setLangGraphInterruptAction({
                "CopilotKitInternal.useCallback[setLangGraphInterruptAction]": (prev)=>{
                    var _a2, _b2, _c;
                    if (action == null) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])({}, prev), {
                        [threadId]: null
                    });
                    let event = (_a2 = prev[threadId]) == null ? void 0 : _a2.event;
                    if (action.event) {
                        event = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])({}, ((_b2 = prev[threadId]) == null ? void 0 : _b2.event) || {}), action.event);
                    }
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])({}, prev), {
                        [threadId]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])({}, (_c = prev[threadId]) != null ? _c : {}), action), {
                            event
                        })
                    });
                }
            }["CopilotKitInternal.useCallback[setLangGraphInterruptAction]"]);
        }
    }["CopilotKitInternal.useCallback[setLangGraphInterruptAction]"], []);
    const removeLangGraphInterruptAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CopilotKitInternal.useCallback[removeLangGraphInterruptAction]": (threadId)=>{
            setLangGraphInterruptAction(threadId, null);
        }
    }["CopilotKitInternal.useCallback[removeLangGraphInterruptAction]"], []);
    const memoizedChildren = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CopilotKitInternal.useMemo[memoizedChildren]": ()=>children
    }["CopilotKitInternal.useMemo[memoizedChildren]"], [
        children
    ]);
    const [bannerError, setBannerError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const agentLock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CopilotKitInternal.useMemo[agentLock]": ()=>{
            var _a2;
            return (_a2 = props.agent) != null ? _a2 : null;
        }
    }["CopilotKitInternal.useMemo[agentLock]"], [
        props.agent
    ]);
    const forwardedParameters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CopilotKitInternal.useMemo[forwardedParameters]": ()=>{
            var _a2;
            return (_a2 = props.forwardedParameters) != null ? _a2 : {};
        }
    }["CopilotKitInternal.useMemo[forwardedParameters]"], [
        props.forwardedParameters
    ]);
    const updateExtensions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CopilotKitInternal.useCallback[updateExtensions]": (newExtensions)=>{
            setExtensions({
                "CopilotKitInternal.useCallback[updateExtensions]": (prev)=>{
                    const resolved = typeof newExtensions === "function" ? newExtensions(prev) : newExtensions;
                    const isSameLength = Object.keys(resolved).length === Object.keys(prev).length;
                    const isEqual = isSameLength && // @ts-ignore
                    Object.entries(resolved).every({
                        "CopilotKitInternal.useCallback[updateExtensions]": (param)=>{
                            let [key, value] = param;
                            return prev[key] === value;
                        }
                    }["CopilotKitInternal.useCallback[updateExtensions]"]);
                    return isEqual ? prev : resolved;
                }
            }["CopilotKitInternal.useCallback[updateExtensions]"]);
        }
    }["CopilotKitInternal.useCallback[updateExtensions]"], [
        setExtensions
    ]);
    const updateAuthStates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CopilotKitInternal.useCallback[updateAuthStates]": (newAuthStates)=>{
            setAuthStates({
                "CopilotKitInternal.useCallback[updateAuthStates]": (prev)=>{
                    const resolved = typeof newAuthStates === "function" ? newAuthStates(prev) : newAuthStates;
                    const isSameLength = Object.keys(resolved).length === Object.keys(prev).length;
                    const isEqual = isSameLength && // @ts-ignore
                    Object.entries(resolved).every({
                        "CopilotKitInternal.useCallback[updateAuthStates]": (param)=>{
                            let [key, value] = param;
                            return prev[key] === value;
                        }
                    }["CopilotKitInternal.useCallback[updateAuthStates]"]);
                    return isEqual ? prev : resolved;
                }
            }["CopilotKitInternal.useCallback[updateAuthStates]"]);
        }
    }["CopilotKitInternal.useCallback[updateAuthStates]"], [
        setAuthStates
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$EUX2P2E7$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotContext"].Provider, {
        value: {
            actions,
            chatComponentsCache,
            getFunctionCallHandler,
            setAction,
            removeAction,
            coAgentStateRenders,
            setCoAgentStateRender,
            removeCoAgentStateRender,
            getContextString,
            addContext,
            removeContext,
            getAllContext,
            getDocumentsContext,
            addDocumentContext,
            removeDocumentContext,
            copilotApiConfig,
            isLoading,
            setIsLoading,
            chatSuggestionConfiguration,
            addChatSuggestionConfiguration,
            removeChatSuggestionConfiguration,
            chatInstructions,
            setChatInstructions,
            additionalInstructions,
            setAdditionalInstructions,
            showDevConsole,
            coagentStates,
            setCoagentStates,
            coagentStatesRef,
            setCoagentStatesWithRef,
            agentSession,
            setAgentSession,
            runtimeClient,
            forwardedParameters,
            agentLock,
            threadId: internalThreadId,
            setThreadId,
            runId,
            setRunId,
            chatAbortControllerRef,
            availableAgents,
            authConfig_c: props.authConfig_c,
            authStates_c: authStates,
            setAuthStates_c: updateAuthStates,
            extensions,
            setExtensions: updateExtensions,
            langGraphInterruptAction: (_b = langGraphInterruptActions[internalThreadId]) != null ? _b : null,
            setLangGraphInterruptAction,
            removeLangGraphInterruptAction,
            bannerError,
            setBannerError,
            onError: handleErrors,
            internalErrorHandlers,
            setInternalErrorHandler,
            removeInternalErrorHandler
        },
        children: [
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$C6IANC2R$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MessagesTapProvider"], {
                children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$C6IANC2R$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotMessages"], {
                    children: [
                        memoizedChildren,
                        showDevConsole && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$DXEQPN43$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConsoleTrigger"], {})
                    ]
                })
            }),
            bannerError && showDevConsole && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$6ZLPNY7X$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UsageBanner"], {
                severity: bannerError.severity,
                message: bannerError.message,
                onClose: ()=>setBannerError(null),
                actions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$6ZLPNY7X$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getErrorActions"])(bannerError)
            })
        ]
    });
}
var defaultCopilotContextCategories = [
    "global"
];
function entryPointsToFunctionCallHandler(actions) {
    return (_0)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__async"])(this, [
            _0
        ], function*(param) {
            let { name, args } = param;
            let actionsByFunctionName = {};
            for (let action2 of actions){
                actionsByFunctionName[action2.name] = action2;
            }
            const action = actionsByFunctionName[name];
            let result = void 0;
            if (action) {
                yield new Promise((resolve, reject)=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSync"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__async"])(this, null, function*() {
                            var _a;
                            try {
                                result = yield (_a = action.handler) == null ? void 0 : _a.call(action, args);
                                resolve();
                            } catch (error) {
                                reject(error);
                            }
                        }));
                });
                yield new Promise((resolve)=>setTimeout(resolve, 20));
            }
            return result;
        });
}
function formatFeatureName(featureName) {
    return featureName.replace(/_c$/, "").split("_").map((word)=>word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}
function validateProps(props) {
    const cloudFeatures = Object.keys(props).filter((key)=>key.endsWith("_c"));
    const hasApiKey = props.publicApiKey || props.publicLicenseKey;
    if (!props.runtimeUrl && !hasApiKey) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfigurationError"]("Missing required prop: 'runtimeUrl' or 'publicApiKey' or 'publicLicenseKey'");
    }
    if (cloudFeatures.length > 0 && !hasApiKey) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$XLQ2EIPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MissingPublicApiKeyError"]("Missing required prop: 'publicApiKey' or 'publicLicenseKey' to use cloud features: ".concat(cloudFeatures.map(formatFeatureName).join(", ")));
    }
}
;
function extract(_0) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__async"])(this, arguments, function*(param) {
        let { context, instructions, parameters, include, data, abortSignal, stream, requestType = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$runtime$2d$client$2d$gql$40$1$2e$10$2e$6_graphql$40$16$2e$12$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$OBDQ5BWD$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopilotRequestType"].Task, forwardedParameters } = param;
        var _a, _b;
        const { messages } = context;
        const action = {
            name: "extract",
            description: instructions,
            parameters,
            handler: (args)=>{}
        };
        const includeReadable = (_a = include == null ? void 0 : include.readable) != null ? _a : false;
        const includeMessages = (_b = include == null ? void 0 : include.messages) != null ? _b : false;
        let contextString = "";
        if (data) {
            contextString = (typeof data === "string" ? data : JSON.stringify(data)) + "\n\n";
        }
        if (includeReadable) {
            contextString += context.getContextString([], defaultCopilotContextCategories);
        }
        const systemMessage = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$runtime$2d$client$2d$gql$40$1$2e$10$2e$6_graphql$40$16$2e$12$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$VVFJT2PN$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextMessage"]({
            content: makeSystemMessage(contextString, instructions),
            role: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$runtime$2d$client$2d$gql$40$1$2e$10$2e$6_graphql$40$16$2e$12$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$VVFJT2PN$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Role"].System
        });
        const instructionsMessage = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$runtime$2d$client$2d$gql$40$1$2e$10$2e$6_graphql$40$16$2e$12$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$VVFJT2PN$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextMessage"]({
            content: makeInstructionsMessage(instructions),
            role: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$runtime$2d$client$2d$gql$40$1$2e$10$2e$6_graphql$40$16$2e$12$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$VVFJT2PN$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Role"].User
        });
        const response = context.runtimeClient.asStream(context.runtimeClient.generateCopilotResponse({
            data: {
                frontend: {
                    actions: [
                        {
                            name: action.name,
                            description: action.description || "",
                            jsonSchema: JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$shared$40$1$2e$10$2e$6$2f$node_modules$2f40$copilotkit$2f$shared$2f$dist$2f$chunk$2d$2KQ6HEWZ$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["actionParametersToJsonSchema"])(action.parameters || []))
                        }
                    ],
                    url: window.location.href
                },
                messages: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$runtime$2d$client$2d$gql$40$1$2e$10$2e$6_graphql$40$16$2e$12$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$TDZBGVZB$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertMessagesToGqlInput"])(includeMessages ? [
                    systemMessage,
                    instructionsMessage,
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$runtime$2d$client$2d$gql$40$1$2e$10$2e$6_graphql$40$16$2e$12$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$TDZBGVZB$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["filterAgentStateMessages"])(messages)
                ] : [
                    systemMessage,
                    instructionsMessage
                ]),
                metadata: {
                    requestType
                },
                forwardedParameters: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$SKC7AJIV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__spreadValues"])({}, forwardedParameters != null ? forwardedParameters : {}), {
                    toolChoice: "function",
                    toolChoiceFunctionName: action.name
                })
            },
            properties: context.copilotApiConfig.properties,
            signal: abortSignal
        }));
        const reader = response.getReader();
        let isInitial = true;
        let actionExecutionMessage = void 0;
        while(true){
            const { done, value } = yield reader.read();
            if (done) {
                break;
            }
            if (abortSignal == null ? void 0 : abortSignal.aborted) {
                throw new Error("Aborted");
            }
            actionExecutionMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$runtime$2d$client$2d$gql$40$1$2e$10$2e$6_graphql$40$16$2e$12$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$runtime$2d$client$2d$gql$2f$dist$2f$chunk$2d$TDZBGVZB$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertGqlOutputToMessages"])(value.generateCopilotResponse.messages).find((msg)=>msg.isActionExecutionMessage());
            if (!actionExecutionMessage) {
                continue;
            }
            stream == null ? void 0 : stream({
                status: isInitial ? "initial" : "inProgress",
                args: actionExecutionMessage.arguments
            });
            isInitial = false;
        }
        if (!actionExecutionMessage) {
            throw new Error("extract() failed: No function call occurred");
        }
        stream == null ? void 0 : stream({
            status: "complete",
            args: actionExecutionMessage.arguments
        });
        return actionExecutionMessage.arguments;
    });
}
function makeInstructionsMessage(instructions) {
    return "\nThe user has given you the following task to complete:\n\n```\n".concat(instructions, "\n```\n\nAny additional messages provided are for providing context only and should not be used to ask questions or engage in conversation.\n");
}
function makeSystemMessage(contextString, instructions) {
    return "\nPlease act as an efficient, competent, conscientious, and industrious professional assistant.\n\nHelp the user achieve their goals, and you do so in a way that is as efficient as possible, without unnecessary fluff, but also without sacrificing professionalism.\nAlways be polite and respectful, and prefer brevity over verbosity.\n\nThe user has provided you with the following context:\n```\n".concat(contextString, "\n```\n\nThey have also provided you with a function called extract you MUST call to initiate actions on their behalf.\n\nPlease assist them as best you can.\n\nThis is not a conversation, so please do not ask questions. Just call the function without saying anything else.\n");
}
;
 //# sourceMappingURL=chunk-CI4KD357.mjs.map
}),
]);

//# sourceMappingURL=a0d49_%40copilotkit_react-core_dist_fd42d917._.js.map