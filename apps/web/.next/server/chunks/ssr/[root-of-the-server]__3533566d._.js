module.exports = [
"[project]/code/cogni/cogni-frontend/apps/web/src/lib/supabase/browserClient.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$7$2e$0_$40$supabase$2b$supabase$2d$js$40$2$2e$81$2e$0$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@supabase+ssr@0.7.0_@supabase+supabase-js@2.81.0/node_modules/@supabase/ssr/dist/module/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$7$2e$0_$40$supabase$2b$supabase$2d$js$40$2$2e$81$2e$0$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@supabase+ssr@0.7.0_@supabase+supabase-js@2.81.0/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-ssr] (ecmascript)");
;
function createClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$7$2e$0_$40$supabase$2b$supabase$2d$js$40$2$2e$81$2e$0$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://gtcwgwlgcphwhapmnerq.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0Y3dnd2xnY3Bod2hhcG1uZXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2Mzk0NjEsImV4cCI6MjA3NTIxNTQ2MX0.AiHX2waEz85_XnOtVnhfxXxCY2XJPWqYOyTOdR6_-hg"));
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/threadsApi.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createThread",
    ()=>createThread,
    "deleteThread",
    ()=>deleteThread,
    "getThread",
    ()=>getThread,
    "getThreads",
    ()=>getThreads,
    "updateThread",
    ()=>updateThread
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/supabase/browserClient.ts [app-ssr] (ecmascript)");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
async function getThreads(workspaceId) {
    const { data, error } = await supabase.from('threads').select('*').eq('workspace_id', workspaceId).order('updated_at', {
        ascending: false
    });
    if (error) throw error;
    return data || [];
}
async function getThread(id) {
    const { data, error } = await supabase.from('threads').select('*').eq('id', id).single();
    if (error) {
        if (error.code === 'PGRST116') {
            // Not found
            return null;
        }
        throw error;
    }
    return data;
}
async function createThread(workspaceId, title) {
    const { data, error } = await supabase.from('threads').insert({
        workspace_id: workspaceId,
        title
    }).select().single();
    if (error) throw error;
    return data;
}
async function updateThread(id, title) {
    const { data, error } = await supabase.from('threads').update({
        title,
        updated_at: new Date().toISOString()
    }).eq('id', id).select().single();
    if (error) throw error;
    return data;
}
async function deleteThread(id) {
    const { error } = await supabase.from('threads').delete().eq('id', id);
    if (error) throw error;
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/lib/cookies.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Utility functions for managing cookies on the client side
__turbopack_context__.s([
    "COOKIE_KEYS",
    ()=>COOKIE_KEYS,
    "clearAllUserCookies",
    ()=>clearAllUserCookies,
    "clearCurrentUserId",
    ()=>clearCurrentUserId,
    "clearPendingInviteToken",
    ()=>clearPendingInviteToken,
    "deleteCookie",
    ()=>deleteCookie,
    "getCookie",
    ()=>getCookie,
    "getCurrentUserId",
    ()=>getCurrentUserId,
    "getPendingInviteToken",
    ()=>getPendingInviteToken,
    "getPersonalWorkspaceId",
    ()=>getPersonalWorkspaceId,
    "setCookie",
    ()=>setCookie,
    "setCurrentUserId",
    ()=>setCurrentUserId
]);
const isBrowser = typeof document !== 'undefined';
function setCookie(name, value, days = 365) {
    if (!isBrowser) return;
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}
function getCookie(name) {
    if (!isBrowser) return null;
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++){
        let c = ca[i];
        while(c.charAt(0) === ' ')c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function deleteCookie(name) {
    if (!isBrowser) return;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}
const COOKIE_KEYS = {
    PERSONAL_WORKSPACE_ID: 'personal_workspace_id',
    PENDING_INVITE_TOKEN: 'pending_invite_token',
    CURRENT_USER_ID: 'current_user_id'
};
function getPersonalWorkspaceId() {
    const id = getCookie(COOKIE_KEYS.PERSONAL_WORKSPACE_ID);
    return id ? parseInt(id, 10) : null;
}
function getPendingInviteToken() {
    return getCookie(COOKIE_KEYS.PENDING_INVITE_TOKEN);
}
function clearPendingInviteToken() {
    deleteCookie(COOKIE_KEYS.PENDING_INVITE_TOKEN);
}
function getCurrentUserId() {
    return getCookie(COOKIE_KEYS.CURRENT_USER_ID);
}
function setCurrentUserId(userId) {
    setCookie(COOKIE_KEYS.CURRENT_USER_ID, userId);
}
function clearCurrentUserId() {
    deleteCookie(COOKIE_KEYS.CURRENT_USER_ID);
}
function clearAllUserCookies() {
    deleteCookie(COOKIE_KEYS.PERSONAL_WORKSPACE_ID);
    deleteCookie(COOKIE_KEYS.PENDING_INVITE_TOKEN);
    deleteCookie(COOKIE_KEYS.CURRENT_USER_ID);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/hooks/useThreads.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useNewThread",
    ()=>useNewThread,
    "useThread",
    ()=>useThread,
    "useThreadMutations",
    ()=>useThreadMutations,
    "useThreads",
    ()=>useThreads
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/swr@2.3.6_react@19.1.0/node_modules/swr/dist/index/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$threadsApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/threadsApi.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$cookies$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/cookies.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function useThreads() {
    const [threads, setThreads] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchThreads = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            setLoading(true);
            setError(null);
            const workspaceId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$cookies$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPersonalWorkspaceId"])();
            if (!workspaceId) {
                throw new Error('No personal workspace found');
            }
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$threadsApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getThreads"])(workspaceId);
            setThreads(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch threads');
            console.error('Error fetching threads:', err);
        } finally{
            setLoading(false);
        }
    }, []);
    const createNewThread = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (title)=>{
        try {
            setError(null);
            const workspaceId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$cookies$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPersonalWorkspaceId"])();
            if (!workspaceId) {
                throw new Error('No personal workspace found');
            }
            const newThread = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$threadsApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createThread"])(workspaceId, title);
            setThreads((prev)=>[
                    newThread,
                    ...prev
                ]);
            return newThread;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create thread');
            console.error('Error creating thread:', err);
            throw err;
        }
    }, []);
    const updateExistingThread = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id, title)=>{
        try {
            setError(null);
            const updatedThread = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$threadsApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateThread"])(id, title);
            setThreads((prev)=>prev.map((thread)=>thread.id === id ? updatedThread : thread));
            return updatedThread;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update thread');
            console.error('Error updating thread:', err);
            throw err;
        }
    }, []);
    const deleteExistingThread = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        try {
            setError(null);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$threadsApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteThread"])(id);
            setThreads((prev)=>prev.filter((thread)=>thread.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete thread');
            console.error('Error deleting thread:', err);
            throw err;
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchThreads();
    }, [
        fetchThreads
    ]);
    return {
        threads,
        loading,
        error,
        refetch: fetchThreads,
        createThread: createNewThread,
        updateThread: updateExistingThread,
        deleteThread: deleteExistingThread
    };
}
function useThread(id) {
    const { data, error, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$3$2e$6_react$40$19$2e$1$2e$0$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(`/threads/${id}`, ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$threadsApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getThread"])(id), {
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });
    return {
        thread: data,
        loading: isLoading,
        error
    };
}
function useNewThread() {
    const [thread, setThread] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const workspaceId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$cookies$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPersonalWorkspaceId"])();
        if (!workspaceId) {
            setLoading(false);
            return;
        }
        setThread({
            id: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            title: '',
            workspace_id: workspaceId
        });
        setLoading(false);
    }, []);
    return {
        thread,
        loading,
        error: null
    };
}
function useThreadMutations() {
    const create = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (title)=>{
        const workspaceId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$cookies$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPersonalWorkspaceId"])();
        if (!workspaceId) throw new Error('No personal workspace found');
        const newThread = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$threadsApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createThread"])(workspaceId, title);
        return newThread;
    }, []);
    const update = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id, title)=>{
        const updatedThread = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$threadsApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateThread"])(id, title);
        return updatedThread;
    }, []);
    const remove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$threadsApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteThread"])(id);
    }, []);
    return {
        create,
        update,
        remove
    };
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/contexts/ThreadContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThreadProvider",
    ()=>ThreadProvider,
    "useThreadContext",
    ()=>useThreadContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const ThreadContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ThreadProvider({ children }) {
    const [selectedThreadId, setSelectedThreadId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThreadContext.Provider, {
        value: {
            selectedThreadId,
            setSelectedThreadId
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/contexts/ThreadContext.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
function useThreadContext() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ThreadContext);
    if (context === undefined) {
        throw new Error('useThreadContext must be used within a ThreadProvider');
    }
    return context;
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/notificationsApi.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteNotification",
    ()=>deleteNotification,
    "getNotification",
    ()=>getNotification,
    "getNotifications",
    ()=>getNotifications,
    "getPastDueNotifications",
    ()=>getPastDueNotifications,
    "getScheduledNotifications",
    ()=>getScheduledNotifications,
    "getUnreadNotificationCount",
    ()=>getUnreadNotificationCount,
    "markMultipleNotificationsAsSent",
    ()=>markMultipleNotificationsAsSent,
    "markNotificationAsSent",
    ()=>markNotificationAsSent,
    "triggerNotification",
    ()=>triggerNotification,
    "updateNotificationStatus",
    ()=>updateNotificationStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/supabase/browserClient.ts [app-ssr] (ecmascript)");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
async function getNotifications(userId) {
    const { data, error } = await supabase.from('notifications').select('*').eq('user_id', userId).order('due_date', {
        ascending: true
    });
    if (error) throw error;
    return data || [];
}
async function getScheduledNotifications(userId) {
    const now = new Date().toISOString();
    const { data, error } = await supabase.from('notifications').select('*').eq('user_id', userId).eq('status', 'scheduled').lt('due_date', now).order('due_date', {
        ascending: true
    });
    if (error) throw error;
    return data || [];
}
async function getPastDueNotifications(userId) {
    const now = new Date().toISOString();
    const { data, error } = await supabase.from('notifications').select('*').eq('user_id', userId).in('status', [
        'scheduled',
        'sent'
    ]).lt('due_date', now).order('due_date', {
        ascending: true
    });
    if (error) throw error;
    return data || [];
}
async function getNotification(id) {
    const { data, error } = await supabase.from('notifications').select('*').eq('id', id).single();
    if (error) {
        if (error.code === 'PGRST116') {
            // Not found
            return null;
        }
        throw error;
    }
    return data;
}
async function markNotificationAsSent(id) {
    const { data, error } = await supabase.from('notifications').update({
        status: 'sent',
        updated_at: new Date().toISOString()
    }).eq('id', id).select().single();
    if (error) throw error;
    return data;
}
async function markMultipleNotificationsAsSent(ids) {
    if (ids.length === 0) return [];
    const { data, error } = await supabase.from('notifications').update({
        status: 'sent',
        updated_at: new Date().toISOString()
    }).in('id', ids).select();
    if (error) throw error;
    return data || [];
}
async function updateNotificationStatus(id, status) {
    const { data, error } = await supabase.from('notifications').update({
        status,
        updated_at: new Date().toISOString()
    }).eq('id', id).select().single();
    if (error) throw error;
    return data;
}
async function deleteNotification(id) {
    const { error } = await supabase.from('notifications').delete().eq('id', id);
    if (error) throw error;
}
async function getUnreadNotificationCount(userId) {
    const now = new Date().toISOString();
    const { count, error } = await supabase.from('notifications').select('*', {
        count: 'exact',
        head: true
    }).eq('user_id', userId).eq('status', 'scheduled').lt('due_date', now);
    if (error) throw error;
    return count || 0;
}
async function triggerNotification(notificationId, threadId) {
    const response = await fetch(`${("TURBOPACK compile-time value", "http://0.0.0.0:8000") || 'http://0.0.0.0:8000'}/api/cogno/notification/trigger`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            notification_id: notificationId,
            thread_id: threadId
        })
    });
    if (!response.ok) {
        throw new Error('Failed to trigger notification');
    }
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/hooks/useNotifications.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useNotifications",
    ()=>useNotifications
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notificationsApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/notificationsApi.ts [app-ssr] (ecmascript)");
'use client';
;
;
/**
 * Check if a notification is past its due date
 */ function isPastDue(dueDate) {
    return new Date(dueDate) < new Date();
}
/**
 * Format date for display
 */ function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}
function useNotifications(userId) {
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [unreadCount, setUnreadCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    /**
   * Fetch all notifications for the user
   */ const fetchNotifications = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!userId) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notificationsApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNotifications"])(userId);
            setNotifications(data);
        } catch (err) {
            console.error('Failed to fetch notifications:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch notifications');
        } finally{
            setLoading(false);
        }
    }, [
        userId
    ]);
    /**
   * Fetch scheduled notifications that are past their due date
   */ const fetchScheduledNotifications = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!userId) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notificationsApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getScheduledNotifications"])(userId);
            setNotifications(data);
        } catch (err) {
            console.error('Failed to fetch scheduled notifications:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch scheduled notifications');
        } finally{
            setLoading(false);
        }
    }, [
        userId
    ]);
    /**
   * Fetch past due notifications (scheduled or sent) for notification center
   */ const fetchPastDueNotifications = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!userId) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notificationsApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPastDueNotifications"])(userId);
            setNotifications(data);
        } catch (err) {
            console.error('Failed to fetch past due notifications:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch past due notifications');
        } finally{
            setLoading(false);
        }
    }, [
        userId
    ]);
    /**
   * Fetch unread notification count
   */ const fetchUnreadCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!userId) return;
        try {
            const count = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notificationsApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUnreadNotificationCount"])(userId);
            setUnreadCount(count);
        } catch (err) {
            console.error('Failed to fetch unread count:', err);
        }
    }, [
        userId
    ]);
    /**
   * Mark a notification as sent
   */ const markAsSent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        try {
            const updated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notificationsApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["markNotificationAsSent"])(id);
            setNotifications((prev)=>prev.map((n)=>n.id === id ? updated : n));
            await fetchUnreadCount();
        } catch (err) {
            console.error('Failed to mark notification as sent:', err);
            throw err;
        }
    }, [
        fetchUnreadCount
    ]);
    /**
   * Mark multiple notifications as sent
   */ const markMultipleAsSent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (ids)=>{
        if (ids.length === 0) return;
        try {
            const updated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notificationsApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["markMultipleNotificationsAsSent"])(ids);
            const updatedMap = new Map(updated.map((n)=>[
                    n.id,
                    n
                ]));
            setNotifications((prev)=>prev.map((n)=>updatedMap.get(n.id) || n));
            await fetchUnreadCount();
        } catch (err) {
            console.error('Failed to mark notifications as sent:', err);
            throw err;
        }
    }, [
        fetchUnreadCount
    ]);
    /**
   * Mark all scheduled past-due notifications as sent
   */ const markAllScheduledAsSent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        const scheduledIds = notifications.filter((n)=>n.status === 'scheduled' && isPastDue(n.due_date)).map((n)=>n.id);
        if (scheduledIds.length > 0) {
            await markMultipleAsSent(scheduledIds);
        }
    }, [
        notifications,
        markMultipleAsSent
    ]);
    /**
   * Update notification status
   */ const updateStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id, status)=>{
        try {
            const updated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notificationsApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateNotificationStatus"])(id, status);
            setNotifications((prev)=>prev.map((n)=>n.id === id ? updated : n));
            await fetchUnreadCount();
        } catch (err) {
            console.error('Failed to update notification status:', err);
            throw err;
        }
    }, [
        fetchUnreadCount
    ]);
    /**
   * Delete a notification
   */ const deleteNotif = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$notificationsApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteNotification"])(id);
            setNotifications((prev)=>prev.filter((n)=>n.id !== id));
            await fetchUnreadCount();
        } catch (err) {
            console.error('Failed to delete notification:', err);
            throw err;
        }
    }, [
        fetchUnreadCount
    ]);
    /**
   * Initial fetch on mount - REMOVED to prevent infinite loops
   * Each page/component should explicitly call fetch functions as needed
   */ // useEffect(() => {
    //   if (userId) {
    //     fetchNotifications();
    //     fetchUnreadCount();
    //   }
    // }, [userId, fetchNotifications, fetchUnreadCount]);
    return {
        notifications,
        unreadCount,
        loading,
        error,
        fetchNotifications,
        fetchScheduledNotifications,
        fetchPastDueNotifications,
        fetchUnreadCount,
        markAsSent,
        markMultipleAsSent,
        markAllScheduledAsSent,
        updateStatus,
        deleteNotif,
        formatDate,
        isPastDue
    };
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/contexts/UIContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UIProvider",
    ()=>UIProvider,
    "useUI",
    ()=>useUI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const UIContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function UIProvider({ children }) {
    const [isThreadSidebarOpen, setIsThreadSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isNotificationPanelOpen, setIsNotificationPanelOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isInputActive, setIsInputActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const toggleThreadSidebar = ()=>{
        setIsThreadSidebarOpen((prev)=>!prev);
        // Close notification panel if open
        if (!isThreadSidebarOpen && isNotificationPanelOpen) {
            setIsNotificationPanelOpen(false);
        }
    };
    const toggleNotificationPanel = ()=>{
        setIsNotificationPanelOpen((prev)=>!prev);
    };
    const closeThreadSidebar = ()=>setIsThreadSidebarOpen(false);
    const closeNotificationPanel = ()=>setIsNotificationPanelOpen(false);
    const setInputActive = (active)=>setIsInputActive(active);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UIContext.Provider, {
        value: {
            isThreadSidebarOpen,
            isNotificationPanelOpen,
            isInputActive,
            toggleThreadSidebar,
            toggleNotificationPanel,
            closeThreadSidebar,
            closeNotificationPanel,
            setInputActive
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/contexts/UIContext.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
function useUI() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/avatar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Avatar",
    ()=>Avatar,
    "AvatarFallback",
    ()=>AvatarFallback,
    "AvatarImage",
    ()=>AvatarImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$avatar$40$1$2e$1$2e$11_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$react$40$19$2e$2$2e$_h7vm5h5p6ysurilnz6o342r46m$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@radix-ui+react-avatar@1.1.11_@types+react-dom@19.2.2_@types+react@19.2.2__@types+react@19.2._h7vm5h5p6ysurilnz6o342r46m/node_modules/@radix-ui/react-avatar/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const Avatar = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$avatar$40$1$2e$1$2e$11_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$react$40$19$2e$2$2e$_h7vm5h5p6ysurilnz6o342r46m$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/20 bg-white/5 text-white', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/avatar.tsx",
        lineNumber: 13,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
Avatar.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$avatar$40$1$2e$1$2e$11_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$react$40$19$2e$2$2e$_h7vm5h5p6ysurilnz6o342r46m$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"].displayName;
const AvatarImageComponent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, src, alt, priority = false, sizes = '40px', quality = 85, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$avatar$40$1$2e$1$2e$11_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$react$40$19$2e$2$2e$_h7vm5h5p6ysurilnz6o342r46m$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Image"], {
        ref: ref,
        asChild: true,
        src: src,
        alt: alt,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('relative block h-full w-full overflow-hidden', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            src: src,
            alt: alt,
            fill: true,
            sizes: sizes,
            priority: priority,
            quality: quality,
            loading: priority ? undefined : 'lazy',
            className: "object-cover"
        }, void 0, false, {
            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/avatar.tsx",
            lineNumber: 58,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/avatar.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
AvatarImageComponent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$avatar$40$1$2e$1$2e$11_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$react$40$19$2e$2$2e$_h7vm5h5p6ysurilnz6o342r46m$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Image"].displayName;
const AvatarImage = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"](AvatarImageComponent, (prev, next)=>prev.src === next.src && prev.alt === next.alt && prev.priority === next.priority && prev.sizes === next.sizes && prev.quality === next.quality && prev.className === next.className);
const AvatarFallback = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$avatar$40$1$2e$1$2e$11_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$react$40$19$2e$2$2e$_h7vm5h5p6ysurilnz6o342r46m$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fallback"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex h-full w-full items-center justify-center rounded-full bg-white/10 text-sm font-medium', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/avatar.tsx",
        lineNumber: 89,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
AvatarFallback.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$avatar$40$1$2e$1$2e$11_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$react$40$19$2e$2$2e$_h7vm5h5p6ysurilnz6o342r46m$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fallback"].displayName;
;
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/dropdown-menu.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DropdownMenu",
    ()=>DropdownMenu,
    "DropdownMenuCheckboxItem",
    ()=>DropdownMenuCheckboxItem,
    "DropdownMenuContent",
    ()=>DropdownMenuContent,
    "DropdownMenuGroup",
    ()=>DropdownMenuGroup,
    "DropdownMenuItem",
    ()=>DropdownMenuItem,
    "DropdownMenuLabel",
    ()=>DropdownMenuLabel,
    "DropdownMenuPortal",
    ()=>DropdownMenuPortal,
    "DropdownMenuRadioGroup",
    ()=>DropdownMenuRadioGroup,
    "DropdownMenuRadioItem",
    ()=>DropdownMenuRadioItem,
    "DropdownMenuSeparator",
    ()=>DropdownMenuSeparator,
    "DropdownMenuShortcut",
    ()=>DropdownMenuShortcut,
    "DropdownMenuSub",
    ()=>DropdownMenuSub,
    "DropdownMenuSubContent",
    ()=>DropdownMenuSubContent,
    "DropdownMenuSubTrigger",
    ()=>DropdownMenuSubTrigger,
    "DropdownMenuTrigger",
    ()=>DropdownMenuTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$menu$40$2$2e$1$2e$16_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$reac_oayej2tnigxwil4s3li5427jxa$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@radix-ui+react-dropdown-menu@2.1.16_@types+react-dom@19.2.2_@types+react@19.2.2__@types+reac_oayej2tnigxwil4s3li5427jxa/node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/circle.js [app-ssr] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const DropdownMenu = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$menu$40$2$2e$1$2e$16_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$reac_oayej2tnigxwil4s3li5427jxa$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"];
const DropdownMenuTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$menu$40$2$2e$1$2e$16_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$reac_oayej2tnigxwil4s3li5427jxa$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"];
const DropdownMenuGroup = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$menu$40$2$2e$1$2e$16_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$reac_oayej2tnigxwil4s3li5427jxa$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"];
const DropdownMenuPortal = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$menu$40$2$2e$1$2e$16_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$reac_oayej2tnigxwil4s3li5427jxa$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"];
const DropdownMenuSub = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$menu$40$2$2e$1$2e$16_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$reac_oayej2tnigxwil4s3li5427jxa$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sub"];
const DropdownMenuRadioGroup = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$menu$40$2$2e$1$2e$16_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$reac_oayej2tnigxwil4s3li5427jxa$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroup"];
const DropdownMenuSubTrigger = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, inset, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$menu$40$2$2e$1$2e$16_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$reac_oayej2tnigxwil4s3li5427jxa$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SubTrigger"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm font-medium outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 data-[state=open]:bg-white/10', inset && 'pl-8', className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                className: "ml-auto h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/dropdown-menu.tsx",
                lineNumber: 37,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/dropdown-menu.tsx",
        lineNumber: 27,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
DropdownMenuSubTrigger.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$menu$40$2$2e$1$2e$16_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$reac_oayej2tnigxwil4s3li5427jxa$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SubTrigger"].displayName;
const DropdownMenuSubContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$menu$40$2$2e$1$2e$16_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$reac_oayej2tnigxwil4s3li5427jxa$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SubContent"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('z-50 min-w-[8rem] overflow-hidden rounded-md border border-white/10 bg-black/90 p-1 text-white shadow-lg backdrop-blur', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/dropdown-menu.tsx",
        lineNumber: 47,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
DropdownMenuSubContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$menu$40$2$2e$1$2e$16_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$reac_oayej2tnigxwil4s3li5427jxa$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SubContent"].displayName;
const DropdownMenuContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, sideOffset = 4, collisionPadding = 8, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$menu$40$2$2e$1$2e$16_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$reac_oayej2tnigxwil4s3li5427jxa$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$menu$40$2$2e$1$2e$16_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$reac_oayej2tnigxwil4s3li5427jxa$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
            ref: ref,
            sideOffset: sideOffset,
            collisionPadding: collisionPadding,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('z-50 min-w-[12rem] overflow-hidden rounded-lg border border-white/10 bg-black/90 p-1 text-white shadow-xl backdrop-blur', 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2', className),
            ...props
        }, void 0, false, {
            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/dropdown-menu.tsx",
            lineNumber: 64,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/dropdown-menu.tsx",
        lineNumber: 63,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
DropdownMenuContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$menu$40$2$2e$1$2e$16_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$reac_oayej2tnigxwil4s3li5427jxa$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"].displayName;
const DropdownMenuItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, inset, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$menu$40$2$2e$1$2e$16_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$reac_oayej2tnigxwil4s3li5427jxa$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Item"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50', inset && 'pl-8', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/dropdown-menu.tsx",
        lineNumber: 85,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
DropdownMenuItem.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$menu$40$2$2e$1$2e$16_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$reac_oayej2tnigxwil4s3li5427jxa$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Item"].displayName;
const DropdownMenuCheckboxItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, children, checked, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$menu$40$2$2e$1$2e$16_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$reac_oayej2tnigxwil4s3li5427jxa$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CheckboxItem"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50', className),
        checked: checked,
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$menu$40$2$2e$1$2e$16_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$reac_oayej2tnigxwil4s3li5427jxa$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/dropdown-menu.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/dropdown-menu.tsx",
                    lineNumber: 111,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/dropdown-menu.tsx",
                lineNumber: 110,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/dropdown-menu.tsx",
        lineNumber: 101,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
DropdownMenuCheckboxItem.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$menu$40$2$2e$1$2e$16_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$reac_oayej2tnigxwil4s3li5427jxa$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CheckboxItem"].displayName;
const DropdownMenuRadioItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$menu$40$2$2e$1$2e$16_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$reac_oayej2tnigxwil4s3li5427jxa$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioItem"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50', className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$menu$40$2$2e$1$2e$16_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$reac_oayej2tnigxwil4s3li5427jxa$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                        className: "h-2 w-2 fill-current"
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/dropdown-menu.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/dropdown-menu.tsx",
                    lineNumber: 134,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/dropdown-menu.tsx",
                lineNumber: 133,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/dropdown-menu.tsx",
        lineNumber: 125,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
DropdownMenuRadioItem.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$menu$40$2$2e$1$2e$16_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$reac_oayej2tnigxwil4s3li5427jxa$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioItem"].displayName;
const DropdownMenuLabel = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, inset, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$menu$40$2$2e$1$2e$16_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$reac_oayej2tnigxwil4s3li5427jxa$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('px-2 py-1.5 text-xs font-semibold text-white/70', inset && 'pl-8', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/dropdown-menu.tsx",
        lineNumber: 149,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
DropdownMenuLabel.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$menu$40$2$2e$1$2e$16_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$reac_oayej2tnigxwil4s3li5427jxa$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"].displayName;
const DropdownMenuSeparator = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$menu$40$2$2e$1$2e$16_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$reac_oayej2tnigxwil4s3li5427jxa$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('-mx-1 my-1 h-px bg-white/10', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/dropdown-menu.tsx",
        lineNumber: 165,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
DropdownMenuSeparator.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$menu$40$2$2e$1$2e$16_$40$types$2b$react$2d$dom$40$19$2e$2$2e$2_$40$types$2b$react$40$19$2e$2$2e$2_$5f40$types$2b$reac_oayej2tnigxwil4s3li5427jxa$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"].displayName;
const DropdownMenuShortcut = ({ className, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('ml-auto text-xs tracking-widest text-white/40', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/dropdown-menu.tsx",
        lineNumber: 178,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';
;
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])('inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background', {
    variants: {
        variant: {
            default: 'bg-white/10 text-white hover:bg-white/20 shadow-sm border border-white/10',
            secondary: 'bg-slate-900 text-white hover:bg-slate-800 border border-white/5',
            outline: 'border border-white/20 bg-transparent text-white hover:bg-white/10',
            ghost: 'text-white hover:bg-white/10',
            destructive: 'bg-red-600 text-white hover:bg-red-500 border border-red-500/80'
        },
        size: {
            default: 'h-9 px-4 py-2',
            sm: 'h-8 rounded-md px-3',
            lg: 'h-10 rounded-md px-8',
            icon: 'h-9 w-9'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/button.tsx",
        lineNumber: 49,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
Button.displayName = 'Button';
;
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/features/auth/api/supabaseAuth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "signIn",
    ()=>signIn,
    "signInWithGoogle",
    ()=>signInWithGoogle,
    "signOut",
    ()=>signOut,
    "signUp",
    ()=>signUp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/supabase/browserClient.ts [app-ssr] (ecmascript)");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
async function signUp(email, password, emailRedirectTo) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: emailRedirectTo || (("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : undefined)
        }
    });
    if (error) throw error;
    return data;
}
async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    if (error) throw error;
    return data;
}
async function signInWithGoogle(emailRedirectTo) {
    const redirectTo = emailRedirectTo || (("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : undefined);
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo,
            queryParams: {
                access_type: 'offline',
                prompt: 'consent'
            }
        }
    });
    if (error) throw error;
    return data;
}
async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/userProfilesApi.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createUserProfile",
    ()=>createUserProfile,
    "getUserProfile",
    ()=>getUserProfile,
    "removeUserAvatar",
    ()=>removeUserAvatar,
    "updateUserProfile",
    ()=>updateUserProfile,
    "uploadUserAvatar",
    ()=>uploadUserAvatar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/supabase/browserClient.ts [app-ssr] (ecmascript)");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
const AVATAR_BUCKET = 'avatars';
function extractStoragePathFromUrl(url) {
    try {
        const parsed = new URL(url);
        const parts = parsed.pathname.split('/');
        const bucketIndex = parts.findIndex((part)=>part === AVATAR_BUCKET);
        if (bucketIndex === -1) return null;
        return parts.slice(bucketIndex + 1).join('/');
    } catch (error) {
        console.warn('Failed to parse avatar URL', error);
        return null;
    }
}
async function getUserProfile(userId) {
    const { data, error } = await supabase.from('user_profiles').select('*').eq('id', userId).maybeSingle();
    if (error) throw error;
    return data ?? null;
}
async function createUserProfile(userId) {
    const { data, error } = await supabase.from('user_profiles').insert({
        id: userId
    }).select().single();
    if (error) throw error;
    return data;
}
async function updateUserProfile(userId, updates) {
    const payload = {
        ...updates,
        updated_at: new Date().toISOString()
    };
    const { data, error } = await supabase.from('user_profiles').update(payload).eq('id', userId).select().single();
    if (error) throw error;
    return data;
}
async function uploadUserAvatar(userId, file, previousAvatarUrl) {
    const fileExt = file instanceof File ? file.name.split('.').pop() : 'png';
    const extension = fileExt ? fileExt.replace(/[^a-zA-Z0-9]/g, '') || 'png' : 'png';
    const filePath = `${userId}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage.from(AVATAR_BUCKET).upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
    });
    if (uploadError) throw uploadError;
    const { data: { publicUrl } } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(filePath);
    if (previousAvatarUrl) {
        const oldPath = extractStoragePathFromUrl(previousAvatarUrl);
        if (oldPath) {
            void supabase.storage.from(AVATAR_BUCKET).remove([
                oldPath
            ]);
        }
    }
    return {
        avatarUrl: publicUrl,
        path: filePath
    };
}
async function removeUserAvatar(userId, currentAvatarUrl) {
    if (currentAvatarUrl) {
        const path = extractStoragePathFromUrl(currentAvatarUrl);
        if (path) {
            await supabase.storage.from(AVATAR_BUCKET).remove([
                path
            ]);
        }
    }
    return updateUserProfile(userId, {
        avatar_url: null
    });
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/hooks/useUserProfile.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUserProfile",
    ()=>useUserProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$userProfilesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/userProfilesApi.ts [app-ssr] (ecmascript)");
'use client';
;
;
function useUserProfile({ userId, loadOnInit = true }) {
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(!!userId && loadOnInit);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!userId) return null;
        try {
            setLoading(true);
            setError(null);
            let data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$userProfilesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserProfile"])(userId);
            if (!data) {
                data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$userProfilesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createUserProfile"])(userId);
            }
            setProfile(data);
            return data;
        } catch (err) {
            console.error('Failed to load user profile', err);
            setError(err instanceof Error ? err.message : 'Failed to load user profile');
            throw err;
        } finally{
            setLoading(false);
        }
    }, [
        userId
    ]);
    const updateProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (updates)=>{
        if (!userId) {
            throw new Error('Cannot update profile without a user id');
        }
        const updated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$userProfilesApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateUserProfile"])(userId, updates);
        setProfile(updated);
        return updated;
    }, [
        userId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (userId && loadOnInit) {
            void fetchProfile();
        }
    }, [
        userId,
        loadOnInit,
        fetchProfile
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            profile,
            loading,
            error
        }), [
        profile,
        loading,
        error
    ]);
    return {
        ...value,
        refresh: fetchProfile,
        updateProfile
    };
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/UserMenu.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserMenu",
    ()=>UserMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/log-out.js [app-ssr] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/settings.js [app-ssr] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/avatar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/dropdown-menu.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$features$2f$auth$2f$api$2f$supabaseAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/features/auth/api/supabaseAuth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/hooks/useUserProfile.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
function getInitials(profile, email) {
    const name = profile?.name;
    if (name && name.trim().length > 0) {
        const parts = name.trim().split(' ');
        if (parts.length === 1) {
            return parts[0]?.slice(0, 2).toUpperCase();
        }
        return `${parts[0]?.[0] ?? ''}${parts[1]?.[0] ?? ''}`.toUpperCase();
    }
    if (email) {
        return email.slice(0, 2).toUpperCase();
    }
    return 'ME';
}
function UserMenu({ user }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [open, setOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const [isSigningOut, setIsSigningOut] = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const hoverTimeoutRef = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const userId = user?.id ?? null;
    const { profile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserProfile"])({
        userId
    });
    const email = user?.email ?? 'Unknown user';
    const avatarUrl = profile?.avatar_url ?? null;
    const initials = getInitials(profile, email);
    const handleSelectSettings = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](()=>{
        setOpen(false);
        router.push('/user/settings');
    }, [
        router
    ]);
    const handleSignOut = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](async ()=>{
        setIsSigningOut(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$features$2f$auth$2f$api$2f$supabaseAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signOut"])();
            router.push('/login');
        } catch (error) {
            console.error('Failed to sign out', error);
        } finally{
            setIsSigningOut(false);
            setOpen(false);
        }
    }, [
        router
    ]);
    const clearHoverTimeout = ()=>{
        if (hoverTimeoutRef.current) {
            window.clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
    };
    const scheduleClose = ()=>{
        clearHoverTimeout();
        hoverTimeoutRef.current = window.setTimeout(()=>{
            setOpen(false);
        }, 120);
    };
    const handleMouseEnter = ()=>{
        clearHoverTimeout();
        setOpen(true);
    };
    const handleMouseLeave = ()=>{
        scheduleClose();
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        return ()=>clearHoverTimeout();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenu"], {
        open: open,
        onOpenChange: setOpen,
        modal: false,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            className: "relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                    asChild: true,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        size: "icon",
                        className: "h-10 w-10 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/15",
                        "aria-label": "Open user menu",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Avatar"], {
                            className: "h-9 w-9",
                            children: avatarUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                src: avatarUrl,
                                alt: profile?.name || email
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/UserMenu.tsx",
                                lineNumber: 114,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                children: initials
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/UserMenu.tsx",
                                lineNumber: 116,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/UserMenu.tsx",
                            lineNumber: 112,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/UserMenu.tsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/UserMenu.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                    align: "end",
                    sideOffset: 12,
                    onMouseEnter: handleMouseEnter,
                    onMouseLeave: handleMouseLeave,
                    className: "w-60",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuLabel"], {
                            className: "flex flex-col gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-semibold",
                                    children: profile?.name || initials
                                }, void 0, false, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/UserMenu.tsx",
                                    lineNumber: 129,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-white/60",
                                    children: email
                                }, void 0, false, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/UserMenu.tsx",
                                    lineNumber: 132,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/UserMenu.tsx",
                            lineNumber: 128,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/UserMenu.tsx",
                            lineNumber: 134,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                            onSelect: (event)=>{
                                event.preventDefault();
                                handleSelectSettings();
                            },
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/UserMenu.tsx",
                                    lineNumber: 142,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "User settings"
                                }, void 0, false, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/UserMenu.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/UserMenu.tsx",
                            lineNumber: 135,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/UserMenu.tsx",
                            lineNumber: 145,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                            onSelect: (event)=>{
                                event.preventDefault();
                                if (!isSigningOut) {
                                    handleSignOut();
                                }
                            },
                            className: "flex items-center gap-2 text-red-300",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/UserMenu.tsx",
                                    lineNumber: 155,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: isSigningOut ? 'Signing out…' : 'Log out'
                                }, void 0, false, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/UserMenu.tsx",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/UserMenu.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/UserMenu.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/UserMenu.tsx",
            lineNumber: 100,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/UserMenu.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/Header.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useThreads$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/hooks/useThreads.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$contexts$2f$ThreadContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/contexts/ThreadContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useNotifications$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/hooks/useNotifications.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$contexts$2f$UIContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/contexts/UIContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/supabase/browserClient.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$layout$2f$UserMenu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/UserMenu.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BellIcon$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/bell.js [app-ssr] (ecmascript) <export default as BellIcon>");
'use client';
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
function Header() {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const isHomePage = pathname === '/home';
    const pageTitleMap = {
        '/notes': 'Notes',
        '/workspace': 'Workspaces',
        '/personal': 'Personal',
        '/user/settings': 'User Settings'
    };
    const pageTitle = pageTitleMap[pathname] ?? null;
    const { createThread } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useThreads$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useThreads"])();
    const { setSelectedThreadId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$contexts$2f$ThreadContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useThreadContext"])();
    const { toggleThreadSidebar, toggleNotificationPanel } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$contexts$2f$UIContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUI"])();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isMounted, setIsMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentTime, setCurrentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    // Get notifications hook
    const userId = user?.id ?? null;
    const { unreadCount, fetchUnreadCount } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useNotifications$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNotifications"])(userId || undefined);
    // Initialize on mount: set mounted flag and get userId
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsMounted(true);
        const getUserData = async ()=>{
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
            }
        };
        getUserData();
    }, []);
    // Update time every minute
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const updateTime = ()=>{
            const now = new Date();
            const formatted = now.toLocaleString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).replace(/,/g, '');
            setCurrentTime(formatted);
        };
        updateTime();
        const interval = setInterval(updateTime, 60000); // Update every minute
        return ()=>clearInterval(interval);
    }, []);
    // Poll for unread notifications every 30 seconds
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!userId) return;
        fetchUnreadCount();
        const interval = setInterval(()=>{
            fetchUnreadCount();
        }, 30000);
        return ()=>clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        userId
    ]);
    const handleCreateThread = async ()=>{
        try {
            const now = new Date();
            const dateTimeTitle = now.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            const newThread = await createThread(dateTimeTitle);
            // Auto-select the newly created thread
            if (newThread && newThread.id) {
                setSelectedThreadId(newThread.id);
            }
        } catch (error) {
            console.error('Failed to create thread:', error);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "flex items-center justify-between px-4 md:px-6 py-3 border-b border-black bg-white/3 backdrop-blur-lg relative z-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4",
                children: [
                    isHomePage && isMounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleThreadSidebar,
                                className: "flex items-center gap-1.5 text-white/60 hover:text-white transition-colors group",
                                title: "Threads",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    strokeWidth: 2,
                                    stroke: "currentColor",
                                    className: "w-5 h-5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    }, void 0, false, {
                                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/Header.tsx",
                                        lineNumber: 131,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/Header.tsx",
                                    lineNumber: 123,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/Header.tsx",
                                lineNumber: 118,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleCreateThread,
                                className: "flex items-center gap-2 text-white/60 hover:text-white transition-colors group",
                                title: "New Thread",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    strokeWidth: 2,
                                    stroke: "currentColor",
                                    className: "w-5 h-5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                    }, void 0, false, {
                                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/Header.tsx",
                                        lineNumber: 153,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/Header.tsx",
                                    lineNumber: 145,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/Header.tsx",
                                lineNumber: 140,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-px h-5 bg-white/20"
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/Header.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/Header.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: `text-lg font-semibold text-white ${pathname === '/workspace' || pathname === '/notes' ? 'ml-2' : ''}`,
                        children: [
                            "Cogno",
                            pageTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-base text-white/60 font-normal",
                                children: [
                                    ' ',
                                    "| ",
                                    pageTitle
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/Header.tsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/Header.tsx",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/Header.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    isHomePage && isMounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: toggleNotificationPanel,
                        "data-notification-trigger": "true",
                        className: "flex items-center gap-2 text-white/60 hover:text-white transition-colors group relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-medium",
                                children: currentTime
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/Header.tsx",
                                lineNumber: 187,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BellIcon$3e$__["BellIcon"], {
                                className: "h-5 w-5"
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/Header.tsx",
                                lineNumber: 188,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: unreadCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[14px] h-[14px] flex items-center justify-center px-0.5 border border-black/50",
                                    children: unreadCount > 9 ? '9+' : unreadCount
                                }, void 0, false, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/Header.tsx",
                                    lineNumber: 195,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/Header.tsx",
                                lineNumber: 190,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/Header.tsx",
                        lineNumber: 182,
                        columnNumber: 11
                    }, this),
                    isMounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$layout$2f$UserMenu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserMenu"], {
                        user: user
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/Header.tsx",
                        lineNumber: 202,
                        columnNumber: 23
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/Header.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/Header.tsx",
        lineNumber: 112,
        columnNumber: 5
    }, this);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/BottomNav.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BottomNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$contexts$2f$UIContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/contexts/UIContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HomeIcon$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/house.js [app-ssr] (ecmascript) <export default as HomeIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$notebook$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Notebook$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/node_modules/lucide-react/dist/esm/icons/notebook.js [app-ssr] (ecmascript) <export default as Notebook>");
'use client';
;
;
;
;
;
;
function BottomNav() {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { closeThreadSidebar } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$contexts$2f$UIContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUI"])();
    // パスが/home以外になったらスレッドサイドバーを閉じる
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!pathname.startsWith('/home')) {
            closeThreadSidebar();
        }
    }, [
        pathname,
        closeThreadSidebar
    ]);
    const tabs = [
        {
            name: 'Chat',
            path: '/workspace',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                className: "w-6 h-6"
            }, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/BottomNav.tsx",
                lineNumber: 25,
                columnNumber: 13
            }, this)
        },
        {
            name: 'Cogno',
            path: '/home',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HomeIcon$3e$__["HomeIcon"], {
                className: "w-6 h-6"
            }, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/BottomNav.tsx",
                lineNumber: 27,
                columnNumber: 43
            }, this)
        },
        {
            name: 'Notes',
            path: '/notes',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$notebook$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Notebook$3e$__["Notebook"], {
                className: "w-6 h-6"
            }, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/BottomNav.tsx",
                lineNumber: 28,
                columnNumber: 44
            }, this)
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border-t border-black bg-white/1 backdrop-blur-lg relative z-100",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-around py-4 px-4",
            children: tabs.map((tab)=>{
                const isActive = pathname.startsWith(tab.path);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>router.push(tab.path),
                    className: `flex flex-col items-center gap-2 transition-all duration-300 group ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`,
                    children: [
                        tab.icon,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs font-medium",
                            children: tab.name
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/BottomNav.tsx",
                            lineNumber: 79,
                            columnNumber: 15
                        }, this)
                    ]
                }, tab.path, true, {
                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/BottomNav.tsx",
                    lineNumber: 38,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/BottomNav.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/BottomNav.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/features/thread/ThreadSidebar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ThreadSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useThreads$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/hooks/useThreads.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$contexts$2f$ThreadContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/contexts/ThreadContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$contexts$2f$UIContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/contexts/UIContext.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function ThreadSidebar() {
    const { threads, updateThread, deleteThread } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$hooks$2f$useThreads$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useThreads"])();
    const { selectedThreadId, setSelectedThreadId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$contexts$2f$ThreadContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useThreadContext"])();
    const { isThreadSidebarOpen, closeThreadSidebar } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$contexts$2f$UIContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUI"])();
    const [menuOpenId, setMenuOpenId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [renamingId, setRenamingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [renameValue, setRenameValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const handleSelectThread = (threadId)=>{
        setSelectedThreadId(threadId);
        closeThreadSidebar();
    };
    const handleRename = async (threadId)=>{
        if (!renameValue.trim()) return;
        try {
            await updateThread(threadId, renameValue.trim());
            setRenamingId(null);
            setRenameValue('');
            setMenuOpenId(null);
        } catch (error) {
            console.error('Failed to rename thread:', error);
        }
    };
    const handleDelete = async (threadId)=>{
        if (!confirm('このスレッドを削除してもよろしいですか？')) return;
        try {
            await deleteThread(threadId);
            setMenuOpenId(null);
        } catch (error) {
            console.error('Failed to delete thread:', error);
        }
    };
    const startRename = (thread)=>{
        setRenamingId(thread.id);
        setRenameValue(thread.title);
        setMenuOpenId(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `fixed top-0 left-0 h-full bg-white/5 backdrop-blur-xl border-r border-white/10 transition-all duration-300 ease-in-out z-40 ${isThreadSidebarOpen ? 'w-60 translate-x-0' : 'w-0 -translate-x-full'}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col h-full overflow-hidden pb-17",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between p-4 border-b border-white/10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-semibold text-white"
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/thread/ThreadSidebar.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/thread/ThreadSidebar.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/thread/ThreadSidebar.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto px-2 pt-5 pb-5",
                    children: threads.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-8 text-white/40 text-sm",
                        children: "スレッドがありません"
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/thread/ThreadSidebar.tsx",
                        lineNumber: 67,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: threads.map((thread)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `relative group rounded-lg transition-all duration-300 ${selectedThreadId === thread.id ? 'bg-white/15 border border-black shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)]' : 'bg-white/3 border border-black shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)]'}`,
                                children: renamingId === thread.id ? // Rename Mode
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: renameValue,
                                            onChange: (e)=>setRenameValue(e.target.value),
                                            onKeyDown: (e)=>{
                                                if (e.key === 'Enter') handleRename(thread.id);
                                                if (e.key === 'Escape') {
                                                    setRenamingId(null);
                                                    setRenameValue('');
                                                }
                                            },
                                            className: "w-full bg-black/30 text-white text-sm px-2 py-1 rounded border border-black focus:outline-none focus:border-black",
                                            autoFocus: true
                                        }, void 0, false, {
                                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/thread/ThreadSidebar.tsx",
                                            lineNumber: 84,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2 mt-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleRename(thread.id),
                                                    className: "flex-1 text-xs bg-white/10 hover:bg-white/20 text-white py-1 rounded transition-colors",
                                                    children: "Save"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/thread/ThreadSidebar.tsx",
                                                    lineNumber: 99,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setRenamingId(null);
                                                        setRenameValue('');
                                                    },
                                                    className: "flex-1 text-xs bg-white/5 hover:bg-white/10 text-white py-1 rounded transition-colors",
                                                    children: "Cancel"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/thread/ThreadSidebar.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/thread/ThreadSidebar.tsx",
                                            lineNumber: 98,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/thread/ThreadSidebar.tsx",
                                    lineNumber: 83,
                                    columnNumber: 21
                                }, this) : // Normal Mode
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between px-2 py-2.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleSelectThread(thread.id),
                                            className: `flex-1 text-left text-sm transition-colors truncate ${selectedThreadId === thread.id ? 'text-white/80 hover:text-white' : 'text-white/50 hover:text-white/70'}`,
                                            children: thread.title
                                        }, void 0, false, {
                                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/thread/ThreadSidebar.tsx",
                                            lineNumber: 119,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setMenuOpenId(menuOpenId === thread.id ? null : thread.id),
                                                    className: "p-1 text-white/40 hover:text-white/80 transition-colors",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        xmlns: "http://www.w3.org/2000/svg",
                                                        fill: "none",
                                                        viewBox: "0 0 24 24",
                                                        strokeWidth: 2,
                                                        stroke: "currentColor",
                                                        className: "w-4 h-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            d: "M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/thread/ThreadSidebar.tsx",
                                                            lineNumber: 148,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/thread/ThreadSidebar.tsx",
                                                        lineNumber: 140,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/thread/ThreadSidebar.tsx",
                                                    lineNumber: 132,
                                                    columnNumber: 25
                                                }, this),
                                                menuOpenId === thread.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute right-0 mt-1 w-32 bg-black/90 backdrop-blur-xl border border-black rounded-lg shadow-xl z-[100]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>startRename(thread),
                                                            className: "w-full text-left px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors rounded-t-lg",
                                                            children: "Rename"
                                                        }, void 0, false, {
                                                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/thread/ThreadSidebar.tsx",
                                                            lineNumber: 159,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleDelete(thread.id),
                                                            className: "w-full text-left px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/10 transition-colors rounded-b-lg",
                                                            children: "Delete"
                                                        }, void 0, false, {
                                                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/thread/ThreadSidebar.tsx",
                                                            lineNumber: 165,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/thread/ThreadSidebar.tsx",
                                                    lineNumber: 158,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/thread/ThreadSidebar.tsx",
                                            lineNumber: 131,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/thread/ThreadSidebar.tsx",
                                    lineNumber: 118,
                                    columnNumber: 21
                                }, this)
                            }, thread.id, false, {
                                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/thread/ThreadSidebar.tsx",
                                lineNumber: 73,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/thread/ThreadSidebar.tsx",
                        lineNumber: 71,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/thread/ThreadSidebar.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/thread/ThreadSidebar.tsx",
            lineNumber: 57,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/features/thread/ThreadSidebar.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs) <export default as path>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "path",
    ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs) <export default as proc>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "proc",
    ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$process__$5b$external$5d$__$28$process$2c$__cjs$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$process__$5b$external$5d$__$28$process$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/process [external] (process, cjs)");
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs) <export fileURLToPath as urlToPath>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "urlToPath",
    ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$url__$5b$external$5d$__$28$url$2c$__cjs$29$__["fileURLToPath"]
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$url__$5b$external$5d$__$28$url$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/url [external] (url, cjs)");
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/profileUtils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "normalizeWorkspaceMember",
    ()=>normalizeWorkspaceMember,
    "normalizeWorkspaceProfile",
    ()=>normalizeWorkspaceProfile
]);
function normalizeWorkspaceProfile(profile) {
    if (profile === undefined) {
        return undefined;
    }
    if (profile === null) {
        return null;
    }
    if (Array.isArray(profile)) {
        for (const entry of profile){
            const normalized = normalizeWorkspaceProfile(entry);
            if (normalized) {
                return normalized;
            }
        }
        return null;
    }
    return {
        id: profile.id,
        name: profile.name ?? null,
        avatar_url: profile.avatar_url ?? null
    };
}
function normalizeWorkspaceMember(member) {
    return {
        ...member,
        role: member.role ?? 'member',
        user_profile: normalizeWorkspaceProfile(member.user_profile) ?? null
    };
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/workspaceApi.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkWorkspaceMembership",
    ()=>checkWorkspaceMembership,
    "createWorkspace",
    ()=>createWorkspace,
    "deleteWorkspace",
    ()=>deleteWorkspace,
    "getPersonalWorkspace",
    ()=>getPersonalWorkspace,
    "getWorkspace",
    ()=>getWorkspace,
    "getWorkspaceMembers",
    ()=>getWorkspaceMembers,
    "getWorkspaces",
    ()=>getWorkspaces,
    "removeWorkspaceIcon",
    ()=>removeWorkspaceIcon,
    "updateWorkspace",
    ()=>updateWorkspace,
    "uploadWorkspaceIcon",
    ()=>uploadWorkspaceIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/supabase/browserClient.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$profileUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/profileUtils.ts [app-ssr] (ecmascript)");
;
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
const WORKSPACE_ICON_BUCKET = 'workspace_icon';
function extractStoragePathFromUrl(url) {
    try {
        const parsed = new URL(url);
        const parts = parsed.pathname.split('/');
        const bucketIndex = parts.findIndex((part)=>part === WORKSPACE_ICON_BUCKET);
        if (bucketIndex === -1) return null;
        return parts.slice(bucketIndex + 1).join('/');
    } catch (error) {
        console.warn('Failed to parse workspace icon URL', error);
        return null;
    }
}
async function getWorkspaces() {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        throw new Error('User not authenticated');
    }
    // Get workspace IDs where user is a member (to avoid RLS recursion)
    const { data: memberData, error: memberError } = await supabase.from('workspace_member').select('workspace_id, id, last_read_message_id').eq('user_id', user.id);
    if (memberError) throw memberError;
    // If user is not a member of any workspace, return empty array
    if (!memberData || memberData.length === 0) {
        return [];
    }
    const membershipRows = memberData ?? [];
    const workspaceIds = membershipRows.map((m)=>m.workspace_id);
    const { data, error } = await supabase.from('workspace').select('*').in('id', workspaceIds).eq('type', 'group').order('created_at', {
        ascending: false
    });
    if (error) throw error;
    if (!data || data.length === 0) {
        return [];
    }
    const membershipMap = new Map();
    for (const membership of membershipRows){
        membershipMap.set(membership.workspace_id, membership);
    }
    const workspacesWithCounts = await Promise.all(data.map(async (workspace)=>{
        const membership = membershipMap.get(workspace.id);
        if (!membership) {
            return {
                ...workspace,
                unread_count: 0
            };
        }
        let query = supabase.from('workspace_messages').select('id', {
            count: 'exact',
            head: true
        }).eq('workspace_id', workspace.id);
        if (membership.id != null) {
            query = query.neq('workspace_member_id', membership.id);
        }
        if (membership.last_read_message_id != null) {
            query = query.gt('id', membership.last_read_message_id);
        }
        const { count, error: countError } = await query;
        if (countError) {
            console.warn('Failed to fetch unread message count for workspace', workspace.id, countError);
            return {
                ...workspace,
                unread_count: 0
            };
        }
        return {
            ...workspace,
            unread_count: count ?? 0
        };
    }));
    return workspacesWithCounts;
}
async function getPersonalWorkspace() {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        throw new Error('User not authenticated');
    }
    // Query from workspace table and join with workspace_member
    const { data, error } = await supabase.from('workspace').select(`
      *,
      workspace_member!inner(user_id)
    `).eq('type', 'personal').eq('workspace_member.user_id', user.id).single();
    if (error) throw error;
    return data;
}
async function getWorkspace(id) {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        throw new Error('User not authenticated');
    }
    // Verify user is a member of this workspace
    const { data: memberData, error: memberError } = await supabase.from('workspace_member').select('workspace_id').eq('workspace_id', id).eq('user_id', user.id).single();
    if (memberError || !memberData) {
        throw new Error('Access denied or workspace not found');
    }
    // Fetch workspace with notes (avoiding workspace_member to prevent RLS recursion)
    const { data, error } = await supabase.from('workspace').select(`
      *,
      notes(*)
    `).eq('id', id).single();
    if (error) throw error;
    return data;
}
async function createWorkspace(title) {
    // Call the database function that creates workspace and adds user as member
    const { data, error } = await supabase.rpc('create_workspace_with_member', {
        p_title: title
    });
    if (error) throw error;
    // Fetch the created workspace to return it with full details
    if (data && data.length > 0 && data[0].workspace_id) {
        const { data: workspace, error: fetchError } = await supabase.from('workspace').select('*').eq('id', data[0].workspace_id).single();
        if (fetchError) throw fetchError;
        return workspace;
    }
    throw new Error('Failed to create workspace');
}
async function updateWorkspace(id, updates) {
    const { data, error } = await supabase.from('workspace').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
}
async function deleteWorkspace(id) {
    const { error } = await supabase.from('workspace').delete().eq('id', id);
    if (error) throw error;
}
async function uploadWorkspaceIcon(workspaceId, file, previousIconUrl) {
    const fileExt = file instanceof File ? file.name.split('.').pop() : 'png';
    const extension = fileExt ? fileExt.replace(/[^a-zA-Z0-9]/g, '') || 'png' : 'png';
    const filePath = `${workspaceId}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage.from(WORKSPACE_ICON_BUCKET).upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
    });
    if (uploadError) throw uploadError;
    const { data: { publicUrl } } = supabase.storage.from(WORKSPACE_ICON_BUCKET).getPublicUrl(filePath);
    if (previousIconUrl) {
        const oldPath = extractStoragePathFromUrl(previousIconUrl);
        if (oldPath) {
            void supabase.storage.from(WORKSPACE_ICON_BUCKET).remove([
                oldPath
            ]);
        }
    }
    return {
        iconUrl: publicUrl,
        path: filePath
    };
}
async function removeWorkspaceIcon(workspaceId, currentIconUrl) {
    if (currentIconUrl) {
        const path = extractStoragePathFromUrl(currentIconUrl);
        if (path) {
            await supabase.storage.from(WORKSPACE_ICON_BUCKET).remove([
                path
            ]);
        }
    }
    return updateWorkspace(workspaceId, {
        icon_url: null
    });
}
async function checkWorkspaceMembership(workspaceId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    const { data, error } = await supabase.from('workspace_member').select('workspace_id').eq('workspace_id', workspaceId).eq('user_id', user.id).maybeSingle();
    return !error && data !== null;
}
async function getWorkspaceMembers(workspaceId) {
    console.log('🔍 getWorkspaceMembers called with workspaceId:', workspaceId);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        throw new Error('User not authenticated');
    }
    // Fetch workspace members with their user profiles
    const { data, error } = await supabase.from('workspace_member').select(`
      id,
      created_at,
      user_id,
      workspace_id,
      role,
      user_profile:user_id(id, name, avatar_url)
    `).eq('workspace_id', workspaceId).order('created_at', {
        ascending: true
    });
    console.log('📦 getWorkspaceMembers raw response:', {
        data,
        error
    });
    if (error) {
        console.error('❌ getWorkspaceMembers error:', error);
        console.error('❌ Error details:', JSON.stringify(error, null, 2));
        throw error;
    }
    console.log('✅ getWorkspaceMembers data received:', data);
    console.log('📊 getWorkspaceMembers data length:', data?.length);
    const members = data ?? [];
    return members.map(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$profileUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeWorkspaceMember"]);
}
}),
"[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/layout.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/next@15.5.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.1_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$layout$2f$Header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/Header.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$layout$2f$BottomNav$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/components/layout/BottomNav.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$features$2f$thread$2f$ThreadSidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/features/thread/ThreadSidebar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$contexts$2f$ThreadContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/contexts/ThreadContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$contexts$2f$UIContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/contexts/UIContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$CI4KD357$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@copilotkit+react-core@1.10.6_@types+react@19.2.2_graphql@16.12.0_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/@copilotkit/react-core/dist/chunk-CI4KD357.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/supabase/browserClient.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$cookies$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/cookies.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/apps/web/src/lib/api/workspaceApi.ts [app-ssr] (ecmascript)");
'use client';
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
function LayoutContent({ children }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const { isInputActive } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$contexts$2f$UIContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUI"])();
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    // Setup user session after OAuth login
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const setupUserSession = async ()=>{
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;
                // Set user ID if not already set
                const currentUserId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$cookies$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentUserId"])();
                if (!currentUserId && user.id) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$cookies$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setCurrentUserId"])(user.id);
                }
                // Fetch and set personal workspace if not already set
                const personalWorkspaceId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$cookies$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCookie"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$cookies$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COOKIE_KEYS"].PERSONAL_WORKSPACE_ID);
                if (!personalWorkspaceId) {
                    try {
                        const personalWorkspace = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$api$2f$workspaceApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPersonalWorkspace"])();
                        if (personalWorkspace?.id) {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$cookies$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setCookie"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$lib$2f$cookies$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COOKIE_KEYS"].PERSONAL_WORKSPACE_ID, personalWorkspace.id.toString());
                        }
                    } catch (error) {
                        // Log but don't fail - workspace might not exist yet
                        console.warn('Failed to fetch personal workspace:', error);
                    }
                }
            } catch (error) {
                console.error('Error setting up user session:', error);
            }
        };
        setupUserSession();
    }, []);
    const showTopLevelChrome = pathname === '/home' || pathname === '/notes' || pathname === '/workspace' || pathname === '/personal' || pathname === '/user/settings';
    // モバイル判定（768px以下）
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const checkMobile = ()=>{
            setIsMobile(window.innerWidth < 768);
        };
        // 初回チェック
        checkMobile();
        // リサイズ時にチェック
        window.addEventListener('resize', checkMobile);
        return ()=>window.removeEventListener('resize', checkMobile);
    }, []);
    // モバイルかつ入力中の場合のみフッターを非表示、デスクトップでは常に表示
    const shouldShowFooter = showTopLevelChrome && (!isMobile || !isInputActive);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-screen bg-black text-gray-200 relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$features$2f$thread$2f$ThreadSidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/layout.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col h-screen",
                children: [
                    showTopLevelChrome && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$layout$2f$Header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/layout.tsx",
                        lineNumber: 101,
                        columnNumber: 32
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-1 overflow-hidden",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/layout.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    shouldShowFooter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$components$2f$layout$2f$BottomNav$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/layout.tsx",
                        lineNumber: 107,
                        columnNumber: 30
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/layout.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/layout.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
function DashboardLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$contexts$2f$ThreadContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThreadProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$apps$2f$web$2f$src$2f$contexts$2f$UIContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UIProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$copilotkit$2b$react$2d$core$40$1$2e$10$2e$6_$40$types$2b$react$40$19$2e$2$2e$2_graphql$40$16$2e$12$2e$0_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f40$copilotkit$2f$react$2d$core$2f$dist$2f$chunk$2d$CI4KD357$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CopilotKit"], {
                runtimeUrl: "/api/copilotkit",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$1_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LayoutContent, {
                    children: children
                }, void 0, false, {
                    fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/layout.tsx",
                    lineNumber: 122,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/layout.tsx",
                lineNumber: 121,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/layout.tsx",
            lineNumber: 120,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/code/cogni/cogni-frontend/apps/web/src/app/(private)/layout.tsx",
        lineNumber: 119,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3533566d._.js.map