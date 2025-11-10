module.exports = [
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.1.10_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u2zmpkhncvre7oykq4cyi6lewa/node_modules/@langchain/langgraph-sdk/dist/singletons/fetch.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ // Wrap the default fetch call due to issues with illegal invocations
// in some environments:
// https://stackoverflow.com/questions/69876859/why-does-bind-fix-failed-to-execute-fetch-on-window-illegal-invocation-err
// @ts-expect-error Broad typing to support a range of fetch implementations
__turbopack_context__.s([
    "_getFetchImplementation",
    ()=>_getFetchImplementation,
    "overrideFetchImplementation",
    ()=>overrideFetchImplementation
]);
const DEFAULT_FETCH_IMPLEMENTATION = (...args)=>fetch(...args);
const LANGSMITH_FETCH_IMPLEMENTATION_KEY = Symbol.for("lg:fetch_implementation");
const overrideFetchImplementation = (fetch1)=>{
    globalThis[LANGSMITH_FETCH_IMPLEMENTATION_KEY] = fetch1;
};
const _getFetchImplementation = ()=>{
    return globalThis[LANGSMITH_FETCH_IMPLEMENTATION_KEY] ?? DEFAULT_FETCH_IMPLEMENTATION;
};
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.1.10_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u2zmpkhncvre7oykq4cyi6lewa/node_modules/@langchain/langgraph-sdk/dist/utils/async_caller.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AsyncCaller",
    ()=>AsyncCaller
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$p$2d$retry$40$4$2e$6$2e$2$2f$node_modules$2f$p$2d$retry$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/p-retry@4.6.2/node_modules/p-retry/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$p$2d$queue$40$6$2e$6$2e$2$2f$node_modules$2f$p$2d$queue$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/p-queue@6.6.2/node_modules/p-queue/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$singletons$2f$fetch$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.1.10_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u2zmpkhncvre7oykq4cyi6lewa/node_modules/@langchain/langgraph-sdk/dist/singletons/fetch.js [app-route] (ecmascript)");
;
;
;
const STATUS_NO_RETRY = [
    400,
    401,
    402,
    403,
    404,
    405,
    406,
    407,
    408,
    409,
    422
];
/**
 * Do not rely on globalThis.Response, rather just
 * do duck typing
 */ function isResponse(x) {
    if (x == null || typeof x !== "object") return false;
    return "status" in x && "statusText" in x && "text" in x;
}
/**
 * Utility error to properly handle failed requests
 */ class HTTPError extends Error {
    constructor(status, message, response){
        super(`HTTP ${status}: ${message}`);
        Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "text", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "response", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.status = status;
        this.text = message;
        this.response = response;
    }
    static async fromResponse(response, options) {
        try {
            return new HTTPError(response.status, await response.text(), options?.includeResponse ? response : undefined);
        } catch  {
            return new HTTPError(response.status, response.statusText, options?.includeResponse ? response : undefined);
        }
    }
}
class AsyncCaller {
    constructor(params){
        Object.defineProperty(this, "maxConcurrency", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "maxRetries", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "queue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "onFailedResponseHook", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "customFetch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.maxConcurrency = params.maxConcurrency ?? Infinity;
        this.maxRetries = params.maxRetries ?? 4;
        if ("default" in __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$p$2d$queue$40$6$2e$6$2e$2$2f$node_modules$2f$p$2d$queue$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.queue = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$p$2d$queue$40$6$2e$6$2e$2$2f$node_modules$2f$p$2d$queue$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].default({
                concurrency: this.maxConcurrency
            });
        } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.queue = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$p$2d$queue$40$6$2e$6$2e$2$2f$node_modules$2f$p$2d$queue$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]({
                concurrency: this.maxConcurrency
            });
        }
        this.onFailedResponseHook = params?.onFailedResponseHook;
        this.customFetch = params.fetch;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    call(callable, ...args) {
        const { onFailedResponseHook } = this;
        return this.queue.add(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f$p$2d$retry$40$4$2e$6$2e$2$2f$node_modules$2f$p$2d$retry$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(()=>callable(...args).catch(async (error)=>{
                    // eslint-disable-next-line no-instanceof/no-instanceof
                    if (error instanceof Error) {
                        throw error;
                    } else if (isResponse(error)) {
                        throw await HTTPError.fromResponse(error, {
                            includeResponse: !!onFailedResponseHook
                        });
                    } else {
                        throw new Error(error);
                    }
                }), {
                async onFailedAttempt (error) {
                    if (error.message.startsWith("Cancel") || error.message.startsWith("TimeoutError") || error.message.startsWith("AbortError")) {
                        throw error;
                    }
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    if (error?.code === "ECONNABORTED") {
                        throw error;
                    }
                    // eslint-disable-next-line no-instanceof/no-instanceof
                    if (error instanceof HTTPError) {
                        if (STATUS_NO_RETRY.includes(error.status)) {
                            throw error;
                        }
                        if (onFailedResponseHook && error.response) {
                            await onFailedResponseHook(error.response);
                        }
                    }
                },
                // If needed we can change some of the defaults here,
                // but they're quite sensible.
                retries: this.maxRetries,
                randomize: true
            }), {
            throwOnTimeout: true
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callWithOptions(options, callable, ...args) {
        // Note this doesn't cancel the underlying request,
        // when available prefer to use the signal option of the underlying call
        if (options.signal) {
            return Promise.race([
                this.call(callable, ...args),
                new Promise((_, reject)=>{
                    options.signal?.addEventListener("abort", ()=>{
                        reject(new Error("AbortError"));
                    });
                })
            ]);
        }
        return this.call(callable, ...args);
    }
    fetch(...args) {
        const fetchFn = this.customFetch ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$singletons$2f$fetch$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_getFetchImplementation"])();
        return this.call(()=>fetchFn(...args).then((res)=>res.ok ? res : Promise.reject(res)));
    }
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.1.10_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u2zmpkhncvre7oykq4cyi6lewa/node_modules/@langchain/langgraph-sdk/dist/utils/env.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getEnvironmentVariable",
    ()=>getEnvironmentVariable
]);
function getEnvironmentVariable(name) {
    // Certain setups (Deno, frontend) will throw an error if you try to access environment variables
    try {
        return typeof process !== "undefined" ? process.env?.[name] : undefined;
    } catch (e) {
        return undefined;
    }
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.1.10_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u2zmpkhncvre7oykq4cyi6lewa/node_modules/@langchain/langgraph-sdk/dist/utils/signals.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mergeSignals",
    ()=>mergeSignals
]);
function mergeSignals(...signals) {
    const nonZeroSignals = signals.filter((signal)=>signal != null);
    if (nonZeroSignals.length === 0) return undefined;
    if (nonZeroSignals.length === 1) return nonZeroSignals[0];
    const controller = new AbortController();
    for (const signal of signals){
        if (signal?.aborted) {
            controller.abort(signal.reason);
            return controller.signal;
        }
        signal?.addEventListener("abort", ()=>controller.abort(signal.reason), {
            once: true
        });
    }
    return controller.signal;
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.1.10_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u2zmpkhncvre7oykq4cyi6lewa/node_modules/@langchain/langgraph-sdk/dist/utils/sse.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BytesLineDecoder",
    ()=>BytesLineDecoder,
    "SSEDecoder",
    ()=>SSEDecoder
]);
const CR = "\r".charCodeAt(0);
const LF = "\n".charCodeAt(0);
const NULL = "\0".charCodeAt(0);
const COLON = ":".charCodeAt(0);
const SPACE = " ".charCodeAt(0);
const TRAILING_NEWLINE = [
    CR,
    LF
];
function BytesLineDecoder() {
    let buffer = [];
    let trailingCr = false;
    return new TransformStream({
        start () {
            buffer = [];
            trailingCr = false;
        },
        transform (chunk, controller) {
            // See https://docs.python.org/3/glossary.html#term-universal-newlines
            let text = chunk;
            // Handle trailing CR from previous chunk
            if (trailingCr) {
                text = joinArrays([
                    [
                        CR
                    ],
                    text
                ]);
                trailingCr = false;
            }
            // Check for trailing CR in current chunk
            if (text.length > 0 && text.at(-1) === CR) {
                trailingCr = true;
                text = text.subarray(0, -1);
            }
            if (!text.length) return;
            const trailingNewline = TRAILING_NEWLINE.includes(text.at(-1));
            const lastIdx = text.length - 1;
            const { lines } = text.reduce((acc, cur, idx)=>{
                if (acc.from > idx) return acc;
                if (cur === CR || cur === LF) {
                    acc.lines.push(text.subarray(acc.from, idx));
                    if (cur === CR && text[idx + 1] === LF) {
                        acc.from = idx + 2;
                    } else {
                        acc.from = idx + 1;
                    }
                }
                if (idx === lastIdx && acc.from <= lastIdx) {
                    acc.lines.push(text.subarray(acc.from));
                }
                return acc;
            }, {
                lines: [],
                from: 0
            });
            if (lines.length === 1 && !trailingNewline) {
                buffer.push(lines[0]);
                return;
            }
            if (buffer.length) {
                // Include existing buffer in first line
                buffer.push(lines[0]);
                lines[0] = joinArrays(buffer);
                buffer = [];
            }
            if (!trailingNewline) {
                // If the last segment is not newline terminated,
                // buffer it for the next chunk
                if (lines.length) buffer = [
                    lines.pop()
                ];
            }
            // Enqueue complete lines
            for (const line of lines){
                controller.enqueue(line);
            }
        },
        flush (controller) {
            if (buffer.length) {
                controller.enqueue(joinArrays(buffer));
            }
        }
    });
}
function SSEDecoder() {
    let event = "";
    let data = [];
    let lastEventId = "";
    let retry = null;
    const decoder = new TextDecoder();
    return new TransformStream({
        transform (chunk, controller) {
            // Handle empty line case
            if (!chunk.length) {
                if (!event && !data.length && !lastEventId && retry == null) return;
                const sse = {
                    id: lastEventId || undefined,
                    event,
                    data: data.length ? decodeArraysToJson(decoder, data) : null
                };
                // NOTE: as per the SSE spec, do not reset lastEventId
                event = "";
                data = [];
                retry = null;
                controller.enqueue(sse);
                return;
            }
            // Ignore comments
            if (chunk[0] === COLON) return;
            const sepIdx = chunk.indexOf(COLON);
            if (sepIdx === -1) return;
            const fieldName = decoder.decode(chunk.subarray(0, sepIdx));
            let value = chunk.subarray(sepIdx + 1);
            if (value[0] === SPACE) value = value.subarray(1);
            if (fieldName === "event") {
                event = decoder.decode(value);
            } else if (fieldName === "data") {
                data.push(value);
            } else if (fieldName === "id") {
                if (value.indexOf(NULL) === -1) lastEventId = decoder.decode(value);
            } else if (fieldName === "retry") {
                const retryNum = Number.parseInt(decoder.decode(value), 10);
                if (!Number.isNaN(retryNum)) retry = retryNum;
            }
        },
        flush (controller) {
            if (event) {
                controller.enqueue({
                    id: lastEventId || undefined,
                    event,
                    data: data.length ? decodeArraysToJson(decoder, data) : null
                });
            }
        }
    });
}
function joinArrays(data) {
    const totalLength = data.reduce((acc, curr)=>acc + curr.length, 0);
    const merged = new Uint8Array(totalLength);
    let offset = 0;
    for (const c of data){
        merged.set(c, offset);
        offset += c.length;
    }
    return merged;
}
function decodeArraysToJson(decoder, data) {
    return JSON.parse(decoder.decode(joinArrays(data)));
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.1.10_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u2zmpkhncvre7oykq4cyi6lewa/node_modules/@langchain/langgraph-sdk/dist/utils/stream.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Support async iterator syntax for ReadableStreams in all environments.
 * Source: https://github.com/MattiasBuelens/web-streams-polyfill/pull/122#issuecomment-1627354490
 */ __turbopack_context__.s([
    "IterableReadableStream",
    ()=>IterableReadableStream
]);
class IterableReadableStream extends ReadableStream {
    constructor(){
        super(...arguments);
        Object.defineProperty(this, "reader", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    ensureReader() {
        if (!this.reader) {
            this.reader = this.getReader();
        }
    }
    async next() {
        this.ensureReader();
        try {
            const result = await this.reader.read();
            if (result.done) {
                this.reader.releaseLock(); // release lock when stream becomes closed
                return {
                    done: true,
                    value: undefined
                };
            } else {
                return {
                    done: false,
                    value: result.value
                };
            }
        } catch (e) {
            this.reader.releaseLock(); // release lock when stream becomes errored
            throw e;
        }
    }
    async return() {
        this.ensureReader();
        // If wrapped in a Node stream, cancel is already called.
        if (this.locked) {
            const cancelPromise = this.reader.cancel(); // cancel first, but don't await yet
            this.reader.releaseLock(); // release lock first
            await cancelPromise; // now await it
        }
        return {
            done: true,
            value: undefined
        };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async throw(e) {
        this.ensureReader();
        if (this.locked) {
            const cancelPromise = this.reader.cancel(); // cancel first, but don't await yet
            this.reader.releaseLock(); // release lock first
            await cancelPromise; // now await it
        }
        throw e;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Not present in Node 18 types, required in latest Node 22
    async [Symbol.asyncDispose]() {
        await this.return();
    }
    [Symbol.asyncIterator]() {
        return this;
    }
    static fromReadableStream(stream) {
        // From https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams#reading_the_stream
        const reader = stream.getReader();
        return new IterableReadableStream({
            start (controller) {
                return pump();
                //TURBOPACK unreachable
                ;
                function pump() {
                    return reader.read().then(({ done, value })=>{
                        // When no more data needs to be consumed, close the stream
                        if (done) {
                            controller.close();
                            return;
                        }
                        // Enqueue the next data chunk into our target stream
                        controller.enqueue(value);
                        return pump();
                    });
                }
            },
            cancel () {
                reader.releaseLock();
            }
        });
    }
    static fromAsyncGenerator(generator) {
        return new IterableReadableStream({
            async pull (controller) {
                const { value, done } = await generator.next();
                // When no more data needs to be consumed, close the stream
                if (done) {
                    controller.close();
                }
                // Fix: `else if (value)` will hang the streaming when nullish value (e.g. empty string) is pulled
                controller.enqueue(value);
            },
            async cancel (reason) {
                await generator.return(reason);
            }
        });
    }
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.1.10_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u2zmpkhncvre7oykq4cyi6lewa/node_modules/@langchain/langgraph-sdk/dist/client.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssistantsClient",
    ()=>AssistantsClient,
    "Client",
    ()=>Client,
    "CronsClient",
    ()=>CronsClient,
    "RunsClient",
    ()=>RunsClient,
    "StoreClient",
    ()=>StoreClient,
    "ThreadsClient",
    ()=>ThreadsClient,
    "getApiKey",
    ()=>getApiKey,
    "getClientConfigHash",
    ()=>getClientConfigHash
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$utils$2f$async_caller$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.1.10_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u2zmpkhncvre7oykq4cyi6lewa/node_modules/@langchain/langgraph-sdk/dist/utils/async_caller.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$utils$2f$env$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.1.10_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u2zmpkhncvre7oykq4cyi6lewa/node_modules/@langchain/langgraph-sdk/dist/utils/env.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$utils$2f$signals$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.1.10_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u2zmpkhncvre7oykq4cyi6lewa/node_modules/@langchain/langgraph-sdk/dist/utils/signals.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$utils$2f$sse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.1.10_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u2zmpkhncvre7oykq4cyi6lewa/node_modules/@langchain/langgraph-sdk/dist/utils/sse.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$utils$2f$stream$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.1.10_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u2zmpkhncvre7oykq4cyi6lewa/node_modules/@langchain/langgraph-sdk/dist/utils/stream.js [app-route] (ecmascript)");
;
;
;
;
;
function* iterateHeaders(headers) {
    let iter;
    let shouldClear = false;
    // eslint-disable-next-line no-instanceof/no-instanceof
    if (headers instanceof Headers) {
        const entries = [];
        headers.forEach((value, name)=>{
            entries.push([
                name,
                value
            ]);
        });
        iter = entries;
    } else if (Array.isArray(headers)) {
        iter = headers;
    } else {
        shouldClear = true;
        iter = Object.entries(headers ?? {});
    }
    for (const item of iter){
        const name = item[0];
        if (typeof name !== "string") throw new TypeError(`Expected header name to be a string, got ${typeof name}`);
        const values = Array.isArray(item[1]) ? item[1] : [
            item[1]
        ];
        let didClear = false;
        for (const value of values){
            if (value === undefined) continue;
            // New object keys should always overwrite older headers
            // Yield a null to clear the header in the headers object
            // before adding the new value
            if (shouldClear && !didClear) {
                didClear = true;
                yield [
                    name,
                    null
                ];
            }
            yield [
                name,
                value
            ];
        }
    }
}
function mergeHeaders(...headerObjects) {
    const outputHeaders = new Headers();
    for (const headers of headerObjects){
        if (!headers) continue;
        for (const [name, value] of iterateHeaders(headers)){
            if (value === null) outputHeaders.delete(name);
            else outputHeaders.append(name, value);
        }
    }
    const headerEntries = [];
    outputHeaders.forEach((value, name)=>{
        headerEntries.push([
            name,
            value
        ]);
    });
    return Object.fromEntries(headerEntries);
}
function getApiKey(apiKey) {
    if (apiKey) {
        return apiKey;
    }
    const prefixes = [
        "LANGGRAPH",
        "LANGSMITH",
        "LANGCHAIN"
    ];
    for (const prefix of prefixes){
        const envKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$utils$2f$env$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEnvironmentVariable"])(`${prefix}_API_KEY`);
        if (envKey) {
            // Remove surrounding quotes
            return envKey.trim().replace(/^["']|["']$/g, "");
        }
    }
    return undefined;
}
const REGEX_RUN_METADATA = /(\/threads\/(?<thread_id>.+))?\/runs\/(?<run_id>.+)/;
function getRunMetadataFromResponse(response) {
    const contentLocation = response.headers.get("Content-Location");
    if (!contentLocation) return undefined;
    const match = REGEX_RUN_METADATA.exec(contentLocation);
    if (!match?.groups?.run_id) return undefined;
    return {
        run_id: match.groups.run_id,
        thread_id: match.groups.thread_id || undefined
    };
}
class BaseClient {
    constructor(config){
        Object.defineProperty(this, "asyncCaller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timeoutMs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "apiUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "defaultHeaders", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "onRequest", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const callerOptions = {
            maxRetries: 4,
            maxConcurrency: 4,
            ...config?.callerOptions
        };
        let defaultApiUrl = "http://localhost:8123";
        if (!config?.apiUrl && typeof globalThis === "object" && globalThis != null) {
            const fetchSmb = Symbol.for("langgraph_api:fetch");
            const urlSmb = Symbol.for("langgraph_api:url");
            const global = globalThis;
            if (global[fetchSmb]) callerOptions.fetch ??= global[fetchSmb];
            if (global[urlSmb]) defaultApiUrl = global[urlSmb];
        }
        this.asyncCaller = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$utils$2f$async_caller$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsyncCaller"](callerOptions);
        this.timeoutMs = config?.timeoutMs;
        // default limit being capped by Chrome
        // https://github.com/nodejs/undici/issues/1373
        // Regex to remove trailing slash, if present
        this.apiUrl = config?.apiUrl?.replace(/\/$/, "") || defaultApiUrl;
        this.defaultHeaders = config?.defaultHeaders || {};
        this.onRequest = config?.onRequest;
        const apiKey = getApiKey(config?.apiKey);
        if (apiKey) {
            this.defaultHeaders["x-api-key"] = apiKey;
        }
    }
    prepareFetchOptions(path, options) {
        const mutatedOptions = {
            ...options,
            headers: mergeHeaders(this.defaultHeaders, options?.headers)
        };
        if (mutatedOptions.json) {
            mutatedOptions.body = JSON.stringify(mutatedOptions.json);
            mutatedOptions.headers = mergeHeaders(mutatedOptions.headers, {
                "content-type": "application/json"
            });
            delete mutatedOptions.json;
        }
        if (mutatedOptions.withResponse) {
            delete mutatedOptions.withResponse;
        }
        let timeoutSignal = null;
        if (typeof options?.timeoutMs !== "undefined") {
            if (options.timeoutMs != null) {
                timeoutSignal = AbortSignal.timeout(options.timeoutMs);
            }
        } else if (this.timeoutMs != null) {
            timeoutSignal = AbortSignal.timeout(this.timeoutMs);
        }
        mutatedOptions.signal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$utils$2f$signals$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mergeSignals"])(timeoutSignal, mutatedOptions.signal);
        const targetUrl = new URL(`${this.apiUrl}${path}`);
        if (mutatedOptions.params) {
            for (const [key, value] of Object.entries(mutatedOptions.params)){
                if (value == null) continue;
                const strValue = typeof value === "string" || typeof value === "number" ? value.toString() : JSON.stringify(value);
                targetUrl.searchParams.append(key, strValue);
            }
            delete mutatedOptions.params;
        }
        return [
            targetUrl,
            mutatedOptions
        ];
    }
    async fetch(path, options) {
        const [url, init] = this.prepareFetchOptions(path, options);
        let finalInit = init;
        if (this.onRequest) {
            finalInit = await this.onRequest(url, init);
        }
        const response = await this.asyncCaller.fetch(url, finalInit);
        const body = (()=>{
            if (response.status === 202 || response.status === 204) {
                return undefined;
            }
            return response.json();
        })();
        if (options?.withResponse) {
            return [
                await body,
                response
            ];
        }
        return body;
    }
}
class CronsClient extends BaseClient {
    /**
     *
     * @param threadId The ID of the thread.
     * @param assistantId Assistant ID to use for this cron job.
     * @param payload Payload for creating a cron job.
     * @returns The created background run.
     */ async createForThread(threadId, assistantId, payload) {
        const json = {
            schedule: payload?.schedule,
            input: payload?.input,
            config: payload?.config,
            context: payload?.context,
            metadata: payload?.metadata,
            assistant_id: assistantId,
            interrupt_before: payload?.interruptBefore,
            interrupt_after: payload?.interruptAfter,
            webhook: payload?.webhook,
            multitask_strategy: payload?.multitaskStrategy,
            if_not_exists: payload?.ifNotExists,
            checkpoint_during: payload?.checkpointDuring,
            durability: payload?.durability
        };
        return this.fetch(`/threads/${threadId}/runs/crons`, {
            method: "POST",
            json
        });
    }
    /**
     *
     * @param assistantId Assistant ID to use for this cron job.
     * @param payload Payload for creating a cron job.
     * @returns
     */ async create(assistantId, payload) {
        const json = {
            schedule: payload?.schedule,
            input: payload?.input,
            config: payload?.config,
            context: payload?.context,
            metadata: payload?.metadata,
            assistant_id: assistantId,
            interrupt_before: payload?.interruptBefore,
            interrupt_after: payload?.interruptAfter,
            webhook: payload?.webhook,
            multitask_strategy: payload?.multitaskStrategy,
            if_not_exists: payload?.ifNotExists,
            checkpoint_during: payload?.checkpointDuring,
            durability: payload?.durability
        };
        return this.fetch(`/runs/crons`, {
            method: "POST",
            json
        });
    }
    /**
     *
     * @param cronId Cron ID of Cron job to delete.
     */ async delete(cronId) {
        await this.fetch(`/runs/crons/${cronId}`, {
            method: "DELETE"
        });
    }
    /**
     *
     * @param query Query options.
     * @returns List of crons.
     */ async search(query) {
        return this.fetch("/runs/crons/search", {
            method: "POST",
            json: {
                assistant_id: query?.assistantId ?? undefined,
                thread_id: query?.threadId ?? undefined,
                limit: query?.limit ?? 10,
                offset: query?.offset ?? 0,
                sort_by: query?.sortBy ?? undefined,
                sort_order: query?.sortOrder ?? undefined,
                select: query?.select ?? undefined
            }
        });
    }
    /**
     * Count cron jobs matching filters.
     *
     * @param query.assistantId Assistant ID to filter by.
     * @param query.threadId Thread ID to filter by.
     * @returns Number of cron jobs matching the criteria.
     */ async count(query) {
        return this.fetch(`/runs/crons/count`, {
            method: "POST",
            json: {
                assistant_id: query?.assistantId ?? undefined,
                thread_id: query?.threadId ?? undefined
            }
        });
    }
}
class AssistantsClient extends BaseClient {
    /**
     * Get an assistant by ID.
     *
     * @param assistantId The ID of the assistant.
     * @returns Assistant
     */ async get(assistantId) {
        return this.fetch(`/assistants/${assistantId}`);
    }
    /**
     * Get the JSON representation of the graph assigned to a runnable
     * @param assistantId The ID of the assistant.
     * @param options.xray Whether to include subgraphs in the serialized graph representation. If an integer value is provided, only subgraphs with a depth less than or equal to the value will be included.
     * @returns Serialized graph
     */ async getGraph(assistantId, options) {
        return this.fetch(`/assistants/${assistantId}/graph`, {
            params: {
                xray: options?.xray
            }
        });
    }
    /**
     * Get the state and config schema of the graph assigned to a runnable
     * @param assistantId The ID of the assistant.
     * @returns Graph schema
     */ async getSchemas(assistantId) {
        return this.fetch(`/assistants/${assistantId}/schemas`);
    }
    /**
     * Get the schemas of an assistant by ID.
     *
     * @param assistantId The ID of the assistant to get the schema of.
     * @param options Additional options for getting subgraphs, such as namespace or recursion extraction.
     * @returns The subgraphs of the assistant.
     */ async getSubgraphs(assistantId, options) {
        if (options?.namespace) {
            return this.fetch(`/assistants/${assistantId}/subgraphs/${options.namespace}`, {
                params: {
                    recurse: options?.recurse
                }
            });
        }
        return this.fetch(`/assistants/${assistantId}/subgraphs`, {
            params: {
                recurse: options?.recurse
            }
        });
    }
    /**
     * Create a new assistant.
     * @param payload Payload for creating an assistant.
     * @returns The created assistant.
     */ async create(payload) {
        return this.fetch("/assistants", {
            method: "POST",
            json: {
                graph_id: payload.graphId,
                config: payload.config,
                context: payload.context,
                metadata: payload.metadata,
                assistant_id: payload.assistantId,
                if_exists: payload.ifExists,
                name: payload.name,
                description: payload.description
            }
        });
    }
    /**
     * Update an assistant.
     * @param assistantId ID of the assistant.
     * @param payload Payload for updating the assistant.
     * @returns The updated assistant.
     */ async update(assistantId, payload) {
        return this.fetch(`/assistants/${assistantId}`, {
            method: "PATCH",
            json: {
                graph_id: payload.graphId,
                config: payload.config,
                context: payload.context,
                metadata: payload.metadata,
                name: payload.name,
                description: payload.description
            }
        });
    }
    /**
     * Delete an assistant.
     *
     * @param assistantId ID of the assistant.
     */ async delete(assistantId) {
        return this.fetch(`/assistants/${assistantId}`, {
            method: "DELETE"
        });
    }
    /**
     * List assistants.
     * @param query Query options.
     * @returns List of assistants.
     */ async search(query) {
        return this.fetch("/assistants/search", {
            method: "POST",
            json: {
                graph_id: query?.graphId ?? undefined,
                metadata: query?.metadata ?? undefined,
                limit: query?.limit ?? 10,
                offset: query?.offset ?? 0,
                sort_by: query?.sortBy ?? undefined,
                sort_order: query?.sortOrder ?? undefined,
                select: query?.select ?? undefined
            }
        });
    }
    /**
     * Count assistants matching filters.
     *
     * @param query.metadata Metadata to filter by. Exact match for each key/value.
     * @param query.graphId Optional graph id to filter by.
     * @returns Number of assistants matching the criteria.
     */ async count(query) {
        return this.fetch(`/assistants/count`, {
            method: "POST",
            json: {
                metadata: query?.metadata ?? undefined,
                graph_id: query?.graphId ?? undefined
            }
        });
    }
    /**
     * List all versions of an assistant.
     *
     * @param assistantId ID of the assistant.
     * @returns List of assistant versions.
     */ async getVersions(assistantId, payload) {
        return this.fetch(`/assistants/${assistantId}/versions`, {
            method: "POST",
            json: {
                metadata: payload?.metadata ?? undefined,
                limit: payload?.limit ?? 10,
                offset: payload?.offset ?? 0
            }
        });
    }
    /**
     * Change the version of an assistant.
     *
     * @param assistantId ID of the assistant.
     * @param version The version to change to.
     * @returns The updated assistant.
     */ async setLatest(assistantId, version) {
        return this.fetch(`/assistants/${assistantId}/latest`, {
            method: "POST",
            json: {
                version
            }
        });
    }
}
class ThreadsClient extends BaseClient {
    /**
     * Get a thread by ID.
     *
     * @param threadId ID of the thread.
     * @returns The thread.
     */ async get(threadId) {
        return this.fetch(`/threads/${threadId}`);
    }
    /**
     * Create a new thread.
     *
     * @param payload Payload for creating a thread.
     * @returns The created thread.
     */ async create(payload) {
        // Normalize ttl to an object if a number is provided
        const ttlPayload = typeof payload?.ttl === "number" ? {
            ttl: payload.ttl,
            strategy: "delete"
        } : payload?.ttl;
        return this.fetch(`/threads`, {
            method: "POST",
            json: {
                metadata: {
                    ...payload?.metadata,
                    graph_id: payload?.graphId
                },
                thread_id: payload?.threadId,
                if_exists: payload?.ifExists,
                supersteps: payload?.supersteps?.map((s)=>({
                        updates: s.updates.map((u)=>({
                                values: u.values,
                                command: u.command,
                                as_node: u.asNode
                            }))
                    })),
                ttl: ttlPayload
            }
        });
    }
    /**
     * Copy an existing thread
     * @param threadId ID of the thread to be copied
     * @returns Newly copied thread
     */ async copy(threadId) {
        return this.fetch(`/threads/${threadId}/copy`, {
            method: "POST"
        });
    }
    /**
     * Update a thread.
     *
     * @param threadId ID of the thread.
     * @param payload Payload for updating the thread.
     * @returns The updated thread.
     */ async update(threadId, payload) {
        const ttlPayload = typeof payload?.ttl === "number" ? {
            ttl: payload.ttl,
            strategy: "delete"
        } : payload?.ttl;
        return this.fetch(`/threads/${threadId}`, {
            method: "PATCH",
            json: {
                metadata: payload?.metadata,
                ttl: ttlPayload
            }
        });
    }
    /**
     * Delete a thread.
     *
     * @param threadId ID of the thread.
     */ async delete(threadId) {
        return this.fetch(`/threads/${threadId}`, {
            method: "DELETE"
        });
    }
    /**
     * List threads
     *
     * @param query Query options
     * @returns List of threads
     */ async search(query) {
        return this.fetch("/threads/search", {
            method: "POST",
            json: {
                metadata: query?.metadata ?? undefined,
                ids: query?.ids ?? undefined,
                limit: query?.limit ?? 10,
                offset: query?.offset ?? 0,
                status: query?.status,
                sort_by: query?.sortBy,
                sort_order: query?.sortOrder,
                select: query?.select ?? undefined
            }
        });
    }
    /**
     * Count threads matching filters.
     *
     * @param query.metadata Thread metadata to filter on.
     * @param query.values State values to filter on.
     * @param query.status Thread status to filter on.
     * @returns Number of threads matching the criteria.
     */ async count(query) {
        return this.fetch(`/threads/count`, {
            method: "POST",
            json: {
                metadata: query?.metadata ?? undefined,
                values: query?.values ?? undefined,
                status: query?.status ?? undefined
            }
        });
    }
    /**
     * Get state for a thread.
     *
     * @param threadId ID of the thread.
     * @returns Thread state.
     */ async getState(threadId, checkpoint, options) {
        if (checkpoint != null) {
            if (typeof checkpoint !== "string") {
                return this.fetch(`/threads/${threadId}/state/checkpoint`, {
                    method: "POST",
                    json: {
                        checkpoint,
                        subgraphs: options?.subgraphs
                    }
                });
            }
            // deprecated
            return this.fetch(`/threads/${threadId}/state/${checkpoint}`, {
                params: {
                    subgraphs: options?.subgraphs
                }
            });
        }
        return this.fetch(`/threads/${threadId}/state`, {
            params: {
                subgraphs: options?.subgraphs
            }
        });
    }
    /**
     * Add state to a thread.
     *
     * @param threadId The ID of the thread.
     * @returns
     */ async updateState(threadId, options) {
        return this.fetch(`/threads/${threadId}/state`, {
            method: "POST",
            json: {
                values: options.values,
                checkpoint_id: options.checkpointId,
                checkpoint: options.checkpoint,
                as_node: options?.asNode
            }
        });
    }
    /**
     * Patch the metadata of a thread.
     *
     * @param threadIdOrConfig Thread ID or config to patch the state of.
     * @param metadata Metadata to patch the state with.
     */ async patchState(threadIdOrConfig, metadata) {
        let threadId;
        if (typeof threadIdOrConfig !== "string") {
            if (typeof threadIdOrConfig.configurable?.thread_id !== "string") {
                throw new Error("Thread ID is required when updating state with a config.");
            }
            threadId = threadIdOrConfig.configurable.thread_id;
        } else {
            threadId = threadIdOrConfig;
        }
        return this.fetch(`/threads/${threadId}/state`, {
            method: "PATCH",
            json: {
                metadata
            }
        });
    }
    /**
     * Get all past states for a thread.
     *
     * @param threadId ID of the thread.
     * @param options Additional options.
     * @returns List of thread states.
     */ async getHistory(threadId, options) {
        return this.fetch(`/threads/${threadId}/history`, {
            method: "POST",
            json: {
                limit: options?.limit ?? 10,
                before: options?.before,
                metadata: options?.metadata,
                checkpoint: options?.checkpoint
            }
        });
    }
    async *joinStream(threadId, options) {
        let [url, init] = this.prepareFetchOptions(`/threads/${threadId}/stream`, {
            method: "GET",
            headers: options?.lastEventId ? {
                "Last-Event-ID": options.lastEventId
            } : undefined,
            params: options?.streamMode ? {
                stream_mode: options.streamMode
            } : undefined
        });
        if (this.onRequest != null) init = await this.onRequest(url, init);
        const response = await this.asyncCaller.fetch(url, init);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const stream = (response.body || new ReadableStream({
            start: (ctrl)=>ctrl.close()
        })).pipeThrough((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$utils$2f$sse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BytesLineDecoder"])()).pipeThrough((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$utils$2f$sse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SSEDecoder"])());
        yield* __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$utils$2f$stream$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IterableReadableStream"].fromReadableStream(stream);
    }
}
class RunsClient extends BaseClient {
    /**
     * Create a run and stream the results.
     *
     * @param threadId The ID of the thread.
     * @param assistantId Assistant ID to use for this run.
     * @param payload Payload for creating a run.
     */ async *stream(threadId, assistantId, payload) {
        const json = {
            input: payload?.input,
            command: payload?.command,
            config: payload?.config,
            context: payload?.context,
            metadata: payload?.metadata,
            stream_mode: payload?.streamMode,
            stream_subgraphs: payload?.streamSubgraphs,
            stream_resumable: payload?.streamResumable,
            feedback_keys: payload?.feedbackKeys,
            assistant_id: assistantId,
            interrupt_before: payload?.interruptBefore,
            interrupt_after: payload?.interruptAfter,
            checkpoint: payload?.checkpoint,
            checkpoint_id: payload?.checkpointId,
            webhook: payload?.webhook,
            multitask_strategy: payload?.multitaskStrategy,
            on_completion: payload?.onCompletion,
            on_disconnect: payload?.onDisconnect,
            after_seconds: payload?.afterSeconds,
            if_not_exists: payload?.ifNotExists,
            checkpoint_during: payload?.checkpointDuring,
            durability: payload?.durability
        };
        const endpoint = threadId == null ? `/runs/stream` : `/threads/${threadId}/runs/stream`;
        let [url, init] = this.prepareFetchOptions(endpoint, {
            method: "POST",
            json,
            timeoutMs: null,
            signal: payload?.signal
        });
        if (this.onRequest != null) init = await this.onRequest(url, init);
        const response = await this.asyncCaller.fetch(url, init);
        const runMetadata = getRunMetadataFromResponse(response);
        if (runMetadata) payload?.onRunCreated?.(runMetadata);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const stream = (response.body || new ReadableStream({
            start: (ctrl)=>ctrl.close()
        })).pipeThrough((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$utils$2f$sse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BytesLineDecoder"])()).pipeThrough((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$utils$2f$sse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SSEDecoder"])());
        yield* __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$utils$2f$stream$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IterableReadableStream"].fromReadableStream(stream);
    }
    /**
     * Create a run.
     *
     * @param threadId The ID of the thread.
     * @param assistantId Assistant ID to use for this run.
     * @param payload Payload for creating a run.
     * @returns The created run.
     */ async create(threadId, assistantId, payload) {
        const json = {
            input: payload?.input,
            command: payload?.command,
            config: payload?.config,
            context: payload?.context,
            metadata: payload?.metadata,
            stream_mode: payload?.streamMode,
            stream_subgraphs: payload?.streamSubgraphs,
            stream_resumable: payload?.streamResumable,
            assistant_id: assistantId,
            interrupt_before: payload?.interruptBefore,
            interrupt_after: payload?.interruptAfter,
            webhook: payload?.webhook,
            checkpoint: payload?.checkpoint,
            checkpoint_id: payload?.checkpointId,
            multitask_strategy: payload?.multitaskStrategy,
            after_seconds: payload?.afterSeconds,
            if_not_exists: payload?.ifNotExists,
            checkpoint_during: payload?.checkpointDuring,
            durability: payload?.durability,
            langsmith_tracer: payload?._langsmithTracer ? {
                project_name: payload?._langsmithTracer?.projectName,
                example_id: payload?._langsmithTracer?.exampleId
            } : undefined
        };
        const endpoint = threadId === null ? "/runs" : `/threads/${threadId}/runs`;
        const [run, response] = await this.fetch(endpoint, {
            method: "POST",
            json,
            signal: payload?.signal,
            withResponse: true
        });
        const runMetadata = getRunMetadataFromResponse(response);
        if (runMetadata) payload?.onRunCreated?.(runMetadata);
        return run;
    }
    /**
     * Create a batch of stateless background runs.
     *
     * @param payloads An array of payloads for creating runs.
     * @returns An array of created runs.
     */ async createBatch(payloads) {
        const filteredPayloads = payloads.map((payload)=>({
                ...payload,
                assistant_id: payload.assistantId
            })).map((payload)=>{
            return Object.fromEntries(Object.entries(payload).filter(([_, v])=>v !== undefined));
        });
        return this.fetch("/runs/batch", {
            method: "POST",
            json: filteredPayloads
        });
    }
    /**
     * Create a run and wait for it to complete.
     *
     * @param threadId The ID of the thread.
     * @param assistantId Assistant ID to use for this run.
     * @param payload Payload for creating a run.
     * @returns The last values chunk of the thread.
     */ async wait(threadId, assistantId, payload) {
        const json = {
            input: payload?.input,
            command: payload?.command,
            config: payload?.config,
            context: payload?.context,
            metadata: payload?.metadata,
            assistant_id: assistantId,
            interrupt_before: payload?.interruptBefore,
            interrupt_after: payload?.interruptAfter,
            checkpoint: payload?.checkpoint,
            checkpoint_id: payload?.checkpointId,
            webhook: payload?.webhook,
            multitask_strategy: payload?.multitaskStrategy,
            on_completion: payload?.onCompletion,
            on_disconnect: payload?.onDisconnect,
            after_seconds: payload?.afterSeconds,
            if_not_exists: payload?.ifNotExists,
            checkpoint_during: payload?.checkpointDuring,
            durability: payload?.durability,
            langsmith_tracer: payload?._langsmithTracer ? {
                project_name: payload?._langsmithTracer?.projectName,
                example_id: payload?._langsmithTracer?.exampleId
            } : undefined
        };
        const endpoint = threadId == null ? `/runs/wait` : `/threads/${threadId}/runs/wait`;
        const [run, response] = await this.fetch(endpoint, {
            method: "POST",
            json,
            timeoutMs: null,
            signal: payload?.signal,
            withResponse: true
        });
        const runMetadata = getRunMetadataFromResponse(response);
        if (runMetadata) payload?.onRunCreated?.(runMetadata);
        const raiseError = payload?.raiseError !== undefined ? payload.raiseError : true;
        if (raiseError && "__error__" in run && typeof run.__error__ === "object" && run.__error__ && "error" in run.__error__ && "message" in run.__error__) {
            throw new Error(`${run.__error__?.error}: ${run.__error__?.message}`);
        }
        return run;
    }
    /**
     * List all runs for a thread.
     *
     * @param threadId The ID of the thread.
     * @param options Filtering and pagination options.
     * @returns List of runs.
     */ async list(threadId, options) {
        return this.fetch(`/threads/${threadId}/runs`, {
            params: {
                limit: options?.limit ?? 10,
                offset: options?.offset ?? 0,
                status: options?.status ?? undefined,
                select: options?.select ?? undefined
            }
        });
    }
    /**
     * Get a run by ID.
     *
     * @param threadId The ID of the thread.
     * @param runId The ID of the run.
     * @returns The run.
     */ async get(threadId, runId) {
        return this.fetch(`/threads/${threadId}/runs/${runId}`);
    }
    /**
     * Cancel a run.
     *
     * @param threadId The ID of the thread.
     * @param runId The ID of the run.
     * @param wait Whether to block when canceling
     * @param action Action to take when cancelling the run. Possible values are `interrupt` or `rollback`. Default is `interrupt`.
     * @returns
     */ async cancel(threadId, runId, wait = false, action = "interrupt") {
        return this.fetch(`/threads/${threadId}/runs/${runId}/cancel`, {
            method: "POST",
            params: {
                wait: wait ? "1" : "0",
                action
            }
        });
    }
    /**
     * Block until a run is done.
     *
     * @param threadId The ID of the thread.
     * @param runId The ID of the run.
     * @returns
     */ async join(threadId, runId, options) {
        return this.fetch(`/threads/${threadId}/runs/${runId}/join`, {
            timeoutMs: null,
            signal: options?.signal
        });
    }
    /**
     * Stream output from a run in real-time, until the run is done.
     *
     * @param threadId The ID of the thread. Can be set to `null` | `undefined` for stateless runs.
     * @param runId The ID of the run.
     * @param options Additional options for controlling the stream behavior:
     *   - signal: An AbortSignal that can be used to cancel the stream request
     *   - lastEventId: The ID of the last event received. Can be used to reconnect to a stream without losing events.
     *   - cancelOnDisconnect: When true, automatically cancels the run if the client disconnects from the stream
     *   - streamMode: Controls what types of events to receive from the stream (can be a single mode or array of modes)
     *        Must be a subset of the stream modes passed when creating the run. Background runs default to having the union of all
     *        stream modes enabled.
     * @returns An async generator yielding stream parts.
     */ async *joinStream(threadId, runId, options) {
        const opts = typeof options === "object" && options != null && // eslint-disable-next-line no-instanceof/no-instanceof
        options instanceof AbortSignal ? {
            signal: options
        } : options;
        let [url, init] = this.prepareFetchOptions(threadId != null ? `/threads/${threadId}/runs/${runId}/stream` : `/runs/${runId}/stream`, {
            method: "GET",
            timeoutMs: null,
            signal: opts?.signal,
            headers: opts?.lastEventId ? {
                "Last-Event-ID": opts.lastEventId
            } : undefined,
            params: {
                cancel_on_disconnect: opts?.cancelOnDisconnect ? "1" : "0",
                stream_mode: opts?.streamMode
            }
        });
        if (this.onRequest != null) init = await this.onRequest(url, init);
        const response = await this.asyncCaller.fetch(url, init);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const stream = (response.body || new ReadableStream({
            start: (ctrl)=>ctrl.close()
        })).pipeThrough((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$utils$2f$sse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BytesLineDecoder"])()).pipeThrough((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$utils$2f$sse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SSEDecoder"])());
        yield* __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$utils$2f$stream$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IterableReadableStream"].fromReadableStream(stream);
    }
    /**
     * Delete a run.
     *
     * @param threadId The ID of the thread.
     * @param runId The ID of the run.
     * @returns
     */ async delete(threadId, runId) {
        return this.fetch(`/threads/${threadId}/runs/${runId}`, {
            method: "DELETE"
        });
    }
}
class StoreClient extends BaseClient {
    /**
     * Store or update an item.
     *
     * @param namespace A list of strings representing the namespace path.
     * @param key The unique identifier for the item within the namespace.
     * @param value A dictionary containing the item's data.
     * @param options.index Controls search indexing - null (use defaults), false (disable), or list of field paths to index.
     * @param options.ttl Optional time-to-live in minutes for the item, or null for no expiration.
     * @returns Promise<void>
     *
     * @example
     * ```typescript
     * await client.store.putItem(
     *   ["documents", "user123"],
     *   "item456",
     *   { title: "My Document", content: "Hello World" },
     *   { ttl: 60 } // expires in 60 minutes
     * );
     * ```
     */ async putItem(namespace, key, value, options) {
        namespace.forEach((label)=>{
            if (label.includes(".")) {
                throw new Error(`Invalid namespace label '${label}'. Namespace labels cannot contain periods ('.')`);
            }
        });
        const payload = {
            namespace,
            key,
            value,
            index: options?.index,
            ttl: options?.ttl
        };
        return this.fetch("/store/items", {
            method: "PUT",
            json: payload
        });
    }
    /**
     * Retrieve a single item.
     *
     * @param namespace A list of strings representing the namespace path.
     * @param key The unique identifier for the item.
     * @param options.refreshTtl Whether to refresh the TTL on this read operation. If null, uses the store's default behavior.
     * @returns Promise<Item>
     *
     * @example
     * ```typescript
     * const item = await client.store.getItem(
     *   ["documents", "user123"],
     *   "item456",
     *   { refreshTtl: true }
     * );
     * console.log(item);
     * // {
     * //   namespace: ["documents", "user123"],
     * //   key: "item456",
     * //   value: { title: "My Document", content: "Hello World" },
     * //   createdAt: "2024-07-30T12:00:00Z",
     * //   updatedAt: "2024-07-30T12:00:00Z"
     * // }
     * ```
     */ async getItem(namespace, key, options) {
        namespace.forEach((label)=>{
            if (label.includes(".")) {
                throw new Error(`Invalid namespace label '${label}'. Namespace labels cannot contain periods ('.')`);
            }
        });
        const params = {
            namespace: namespace.join("."),
            key
        };
        if (options?.refreshTtl !== undefined) {
            params.refresh_ttl = options.refreshTtl;
        }
        const response = await this.fetch("/store/items", {
            params
        });
        return response ? {
            ...response,
            createdAt: response.created_at,
            updatedAt: response.updated_at
        } : null;
    }
    /**
     * Delete an item.
     *
     * @param namespace A list of strings representing the namespace path.
     * @param key The unique identifier for the item.
     * @returns Promise<void>
     */ async deleteItem(namespace, key) {
        namespace.forEach((label)=>{
            if (label.includes(".")) {
                throw new Error(`Invalid namespace label '${label}'. Namespace labels cannot contain periods ('.')`);
            }
        });
        return this.fetch("/store/items", {
            method: "DELETE",
            json: {
                namespace,
                key
            }
        });
    }
    /**
     * Search for items within a namespace prefix.
     *
     * @param namespacePrefix List of strings representing the namespace prefix.
     * @param options.filter Optional dictionary of key-value pairs to filter results.
     * @param options.limit Maximum number of items to return (default is 10).
     * @param options.offset Number of items to skip before returning results (default is 0).
     * @param options.query Optional search query.
     * @param options.refreshTtl Whether to refresh the TTL on items returned by this search. If null, uses the store's default behavior.
     * @returns Promise<SearchItemsResponse>
     *
     * @example
     * ```typescript
     * const results = await client.store.searchItems(
     *   ["documents"],
     *   {
     *     filter: { author: "John Doe" },
     *     limit: 5,
     *     refreshTtl: true
     *   }
     * );
     * console.log(results);
     * // {
     * //   items: [
     * //     {
     * //       namespace: ["documents", "user123"],
     * //       key: "item789",
     * //       value: { title: "Another Document", author: "John Doe" },
     * //       createdAt: "2024-07-30T12:00:00Z",
     * //       updatedAt: "2024-07-30T12:00:00Z"
     * //     },
     * //     // ... additional items ...
     * //   ]
     * // }
     * ```
     */ async searchItems(namespacePrefix, options) {
        const payload = {
            namespace_prefix: namespacePrefix,
            filter: options?.filter,
            limit: options?.limit ?? 10,
            offset: options?.offset ?? 0,
            query: options?.query,
            refresh_ttl: options?.refreshTtl
        };
        const response = await this.fetch("/store/items/search", {
            method: "POST",
            json: payload
        });
        return {
            items: response.items.map((item)=>({
                    ...item,
                    createdAt: item.created_at,
                    updatedAt: item.updated_at
                }))
        };
    }
    /**
     * List namespaces with optional match conditions.
     *
     * @param options.prefix Optional list of strings representing the prefix to filter namespaces.
     * @param options.suffix Optional list of strings representing the suffix to filter namespaces.
     * @param options.maxDepth Optional integer specifying the maximum depth of namespaces to return.
     * @param options.limit Maximum number of namespaces to return (default is 100).
     * @param options.offset Number of namespaces to skip before returning results (default is 0).
     * @returns Promise<ListNamespaceResponse>
     */ async listNamespaces(options) {
        const payload = {
            prefix: options?.prefix,
            suffix: options?.suffix,
            max_depth: options?.maxDepth,
            limit: options?.limit ?? 100,
            offset: options?.offset ?? 0
        };
        return this.fetch("/store/namespaces", {
            method: "POST",
            json: payload
        });
    }
}
class UiClient extends BaseClient {
    static getOrCached(key, fn) {
        if (UiClient.promiseCache[key] != null) {
            return UiClient.promiseCache[key];
        }
        const promise = fn();
        UiClient.promiseCache[key] = promise;
        return promise;
    }
    async getComponent(assistantId, agentName) {
        return UiClient.getOrCached(`${this.apiUrl}-${assistantId}-${agentName}`, async ()=>{
            let [url, init] = this.prepareFetchOptions(`/ui/${assistantId}`, {
                headers: {
                    Accept: "text/html",
                    "Content-Type": "application/json"
                },
                method: "POST",
                json: {
                    name: agentName
                }
            });
            if (this.onRequest != null) init = await this.onRequest(url, init);
            const response = await this.asyncCaller.fetch(url, init);
            return response.text();
        });
    }
}
Object.defineProperty(UiClient, "promiseCache", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: {}
});
class Client {
    constructor(config){
        /**
         * The client for interacting with assistants.
         */ Object.defineProperty(this, "assistants", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The client for interacting with threads.
         */ Object.defineProperty(this, "threads", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The client for interacting with runs.
         */ Object.defineProperty(this, "runs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The client for interacting with cron runs.
         */ Object.defineProperty(this, "crons", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The client for interacting with the KV store.
         */ Object.defineProperty(this, "store", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The client for interacting with the UI.
         * @internal Used by LoadExternalComponent and the API might change in the future.
         */ Object.defineProperty(this, "~ui", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * @internal Used to obtain a stable key representing the client.
         */ Object.defineProperty(this, "~configHash", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this["~configHash"] = (()=>JSON.stringify({
                apiUrl: config?.apiUrl,
                apiKey: config?.apiKey,
                timeoutMs: config?.timeoutMs,
                defaultHeaders: config?.defaultHeaders,
                maxConcurrency: config?.callerOptions?.maxConcurrency,
                maxRetries: config?.callerOptions?.maxRetries,
                callbacks: {
                    onFailedResponseHook: config?.callerOptions?.onFailedResponseHook != null,
                    onRequest: config?.onRequest != null,
                    fetch: config?.callerOptions?.fetch != null
                }
            }))();
        this.assistants = new AssistantsClient(config);
        this.threads = new ThreadsClient(config);
        this.runs = new RunsClient(config);
        this.crons = new CronsClient(config);
        this.store = new StoreClient(config);
        this["~ui"] = new UiClient(config);
    }
}
function getClientConfigHash(client) {
    return client["~configHash"];
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.1.10_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u2zmpkhncvre7oykq4cyi6lewa/node_modules/@langchain/langgraph-sdk/dist/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.1.10_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u2zmpkhncvre7oykq4cyi6lewa/node_modules/@langchain/langgraph-sdk/dist/client.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$singletons$2f$fetch$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.1.10_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u2zmpkhncvre7oykq4cyi6lewa/node_modules/@langchain/langgraph-sdk/dist/singletons/fetch.js [app-route] (ecmascript)");
;
;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.1.10_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u2zmpkhncvre7oykq4cyi6lewa/node_modules/@langchain/langgraph-sdk/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.1.10_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u2zmpkhncvre7oykq4cyi6lewa/node_modules/@langchain/langgraph-sdk/dist/index.js [app-route] (ecmascript) <locals>");
;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.1.10_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u2zmpkhncvre7oykq4cyi6lewa/node_modules/@langchain/langgraph-sdk/dist/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Client",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Client"],
    "getApiKey",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getApiKey"],
    "overrideFetchImplementation",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$singletons$2f$fetch$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["overrideFetchImplementation"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.1.10_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u2zmpkhncvre7oykq4cyi6lewa/node_modules/@langchain/langgraph-sdk/dist/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.1.10_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u2zmpkhncvre7oykq4cyi6lewa/node_modules/@langchain/langgraph-sdk/dist/client.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$langchain$2b$langgraph$2d$sdk$40$0$2e$1$2e$10_$40$langchain$2b$core$40$0$2e$3$2e$79_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_openai$40$4$2e$104$2e$_u2zmpkhncvre7oykq4cyi6lewa$2f$node_modules$2f40$langchain$2f$langgraph$2d$sdk$2f$dist$2f$singletons$2f$fetch$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.1.10_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u2zmpkhncvre7oykq4cyi6lewa/node_modules/@langchain/langgraph-sdk/dist/singletons/fetch.js [app-route] (ecmascript)");
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.0.70_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u75jt5v4tp43i24oso6uflm6he/node_modules/@langchain/langgraph-sdk/dist/singletons/fetch.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._getFetchImplementation = exports.overrideFetchImplementation = void 0;
// Wrap the default fetch call due to issues with illegal invocations
// in some environments:
// https://stackoverflow.com/questions/69876859/why-does-bind-fix-failed-to-execute-fetch-on-window-illegal-invocation-err
// @ts-expect-error Broad typing to support a range of fetch implementations
const DEFAULT_FETCH_IMPLEMENTATION = (...args)=>fetch(...args);
const LANGSMITH_FETCH_IMPLEMENTATION_KEY = Symbol.for("lg:fetch_implementation");
/**
 * Overrides the fetch implementation used for LangSmith calls.
 * You should use this if you need to use an implementation of fetch
 * other than the default global (e.g. for dealing with proxies).
 * @param fetch The new fetch function to use.
 */ const overrideFetchImplementation = (fetch1)=>{
    globalThis[LANGSMITH_FETCH_IMPLEMENTATION_KEY] = fetch1;
};
exports.overrideFetchImplementation = overrideFetchImplementation;
/**
 * @internal
 */ const _getFetchImplementation = ()=>{
    return globalThis[LANGSMITH_FETCH_IMPLEMENTATION_KEY] ?? DEFAULT_FETCH_IMPLEMENTATION;
};
exports._getFetchImplementation = _getFetchImplementation;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.0.70_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u75jt5v4tp43i24oso6uflm6he/node_modules/@langchain/langgraph-sdk/dist/utils/async_caller.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AsyncCaller = void 0;
const p_retry_1 = __importDefault(__turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/p-retry@4.6.2/node_modules/p-retry/index.js [app-route] (ecmascript)"));
const p_queue_1 = __importDefault(__turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/p-queue@6.6.2/node_modules/p-queue/dist/index.js [app-route] (ecmascript)"));
const fetch_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.0.70_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u75jt5v4tp43i24oso6uflm6he/node_modules/@langchain/langgraph-sdk/dist/singletons/fetch.cjs [app-route] (ecmascript)");
const STATUS_NO_RETRY = [
    400,
    401,
    402,
    403,
    404,
    405,
    406,
    407,
    408,
    409,
    422
];
/**
 * Do not rely on globalThis.Response, rather just
 * do duck typing
 */ function isResponse(x) {
    if (x == null || typeof x !== "object") return false;
    return "status" in x && "statusText" in x && "text" in x;
}
/**
 * Utility error to properly handle failed requests
 */ class HTTPError extends Error {
    constructor(status, message, response){
        super(`HTTP ${status}: ${message}`);
        Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "text", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "response", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.status = status;
        this.text = message;
        this.response = response;
    }
    static async fromResponse(response, options) {
        try {
            return new HTTPError(response.status, await response.text(), options?.includeResponse ? response : undefined);
        } catch  {
            return new HTTPError(response.status, response.statusText, options?.includeResponse ? response : undefined);
        }
    }
}
/**
 * A class that can be used to make async calls with concurrency and retry logic.
 *
 * This is useful for making calls to any kind of "expensive" external resource,
 * be it because it's rate-limited, subject to network issues, etc.
 *
 * Concurrent calls are limited by the `maxConcurrency` parameter, which defaults
 * to `Infinity`. This means that by default, all calls will be made in parallel.
 *
 * Retries are limited by the `maxRetries` parameter, which defaults to 5. This
 * means that by default, each call will be retried up to 5 times, with an
 * exponential backoff between each attempt.
 */ class AsyncCaller {
    constructor(params){
        Object.defineProperty(this, "maxConcurrency", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "maxRetries", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "queue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "onFailedResponseHook", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "customFetch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.maxConcurrency = params.maxConcurrency ?? Infinity;
        this.maxRetries = params.maxRetries ?? 4;
        if ("default" in p_queue_1.default) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.queue = new p_queue_1.default.default({
                concurrency: this.maxConcurrency
            });
        } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.queue = new p_queue_1.default({
                concurrency: this.maxConcurrency
            });
        }
        this.onFailedResponseHook = params?.onFailedResponseHook;
        this.customFetch = params.fetch;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    call(callable, ...args) {
        const onFailedResponseHook = this.onFailedResponseHook;
        return this.queue.add(()=>(0, p_retry_1.default)(()=>callable(...args).catch(async (error)=>{
                    // eslint-disable-next-line no-instanceof/no-instanceof
                    if (error instanceof Error) {
                        throw error;
                    } else if (isResponse(error)) {
                        throw await HTTPError.fromResponse(error, {
                            includeResponse: !!onFailedResponseHook
                        });
                    } else {
                        throw new Error(error);
                    }
                }), {
                async onFailedAttempt (error) {
                    if (error.message.startsWith("Cancel") || error.message.startsWith("TimeoutError") || error.message.startsWith("AbortError")) {
                        throw error;
                    }
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    if (error?.code === "ECONNABORTED") {
                        throw error;
                    }
                    if (error instanceof HTTPError) {
                        if (STATUS_NO_RETRY.includes(error.status)) {
                            throw error;
                        }
                        if (onFailedResponseHook && error.response) {
                            await onFailedResponseHook(error.response);
                        }
                    }
                },
                // If needed we can change some of the defaults here,
                // but they're quite sensible.
                retries: this.maxRetries,
                randomize: true
            }), {
            throwOnTimeout: true
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callWithOptions(options, callable, ...args) {
        // Note this doesn't cancel the underlying request,
        // when available prefer to use the signal option of the underlying call
        if (options.signal) {
            return Promise.race([
                this.call(callable, ...args),
                new Promise((_, reject)=>{
                    options.signal?.addEventListener("abort", ()=>{
                        reject(new Error("AbortError"));
                    });
                })
            ]);
        }
        return this.call(callable, ...args);
    }
    fetch(...args) {
        const fetchFn = this.customFetch ?? (0, fetch_js_1._getFetchImplementation)();
        return this.call(()=>fetchFn(...args).then((res)=>res.ok ? res : Promise.reject(res)));
    }
}
exports.AsyncCaller = AsyncCaller;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.0.70_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u75jt5v4tp43i24oso6uflm6he/node_modules/@langchain/langgraph-sdk/dist/utils/env.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getEnvironmentVariable = void 0;
function getEnvironmentVariable(name) {
    // Certain setups (Deno, frontend) will throw an error if you try to access environment variables
    try {
        return typeof process !== "undefined" ? process.env?.[name] : undefined;
    } catch (e) {
        return undefined;
    }
}
exports.getEnvironmentVariable = getEnvironmentVariable;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.0.70_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u75jt5v4tp43i24oso6uflm6he/node_modules/@langchain/langgraph-sdk/dist/utils/signals.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mergeSignals = void 0;
function mergeSignals(...signals) {
    const nonZeroSignals = signals.filter((signal)=>signal != null);
    if (nonZeroSignals.length === 0) return undefined;
    if (nonZeroSignals.length === 1) return nonZeroSignals[0];
    const controller = new AbortController();
    for (const signal of signals){
        if (signal?.aborted) {
            controller.abort(signal.reason);
            return controller.signal;
        }
        signal?.addEventListener("abort", ()=>controller.abort(signal.reason), {
            once: true
        });
    }
    return controller.signal;
}
exports.mergeSignals = mergeSignals;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.0.70_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u75jt5v4tp43i24oso6uflm6he/node_modules/@langchain/langgraph-sdk/dist/utils/sse.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SSEDecoder = exports.BytesLineDecoder = void 0;
const CR = "\r".charCodeAt(0);
const LF = "\n".charCodeAt(0);
const NULL = "\0".charCodeAt(0);
const COLON = ":".charCodeAt(0);
const SPACE = " ".charCodeAt(0);
const TRAILING_NEWLINE = [
    CR,
    LF
];
class BytesLineDecoder extends TransformStream {
    constructor(){
        let buffer = [];
        let trailingCr = false;
        super({
            start () {
                buffer = [];
                trailingCr = false;
            },
            transform (chunk, controller) {
                // See https://docs.python.org/3/glossary.html#term-universal-newlines
                let text = chunk;
                // Handle trailing CR from previous chunk
                if (trailingCr) {
                    text = joinArrays([
                        [
                            CR
                        ],
                        text
                    ]);
                    trailingCr = false;
                }
                // Check for trailing CR in current chunk
                if (text.length > 0 && text.at(-1) === CR) {
                    trailingCr = true;
                    text = text.subarray(0, -1);
                }
                if (!text.length) return;
                const trailingNewline = TRAILING_NEWLINE.includes(text.at(-1));
                const lastIdx = text.length - 1;
                const { lines } = text.reduce((acc, cur, idx)=>{
                    if (acc.from > idx) return acc;
                    if (cur === CR || cur === LF) {
                        acc.lines.push(text.subarray(acc.from, idx));
                        if (cur === CR && text[idx + 1] === LF) {
                            acc.from = idx + 2;
                        } else {
                            acc.from = idx + 1;
                        }
                    }
                    if (idx === lastIdx && acc.from <= lastIdx) {
                        acc.lines.push(text.subarray(acc.from));
                    }
                    return acc;
                }, {
                    lines: [],
                    from: 0
                });
                if (lines.length === 1 && !trailingNewline) {
                    buffer.push(lines[0]);
                    return;
                }
                if (buffer.length) {
                    // Include existing buffer in first line
                    buffer.push(lines[0]);
                    lines[0] = joinArrays(buffer);
                    buffer = [];
                }
                if (!trailingNewline) {
                    // If the last segment is not newline terminated,
                    // buffer it for the next chunk
                    if (lines.length) buffer = [
                        lines.pop()
                    ];
                }
                // Enqueue complete lines
                for (const line of lines){
                    controller.enqueue(line);
                }
            },
            flush (controller) {
                if (buffer.length) {
                    controller.enqueue(joinArrays(buffer));
                }
            }
        });
    }
}
exports.BytesLineDecoder = BytesLineDecoder;
class SSEDecoder extends TransformStream {
    constructor(){
        let event = "";
        let data = [];
        let lastEventId = "";
        let retry = null;
        const decoder = new TextDecoder();
        super({
            transform (chunk, controller) {
                // Handle empty line case
                if (!chunk.length) {
                    if (!event && !data.length && !lastEventId && retry == null) return;
                    const sse = {
                        event,
                        data: data.length ? decodeArraysToJson(decoder, data) : null
                    };
                    // NOTE: as per the SSE spec, do not reset lastEventId
                    event = "";
                    data = [];
                    retry = null;
                    controller.enqueue(sse);
                    return;
                }
                // Ignore comments
                if (chunk[0] === COLON) return;
                const sepIdx = chunk.indexOf(COLON);
                if (sepIdx === -1) return;
                const fieldName = decoder.decode(chunk.subarray(0, sepIdx));
                let value = chunk.subarray(sepIdx + 1);
                if (value[0] === SPACE) value = value.subarray(1);
                if (fieldName === "event") {
                    event = decoder.decode(value);
                } else if (fieldName === "data") {
                    data.push(value);
                } else if (fieldName === "id") {
                    if (value.indexOf(NULL) === -1) lastEventId = decoder.decode(value);
                } else if (fieldName === "retry") {
                    const retryNum = Number.parseInt(decoder.decode(value));
                    if (!Number.isNaN(retryNum)) retry = retryNum;
                }
            },
            flush (controller) {
                if (event) {
                    controller.enqueue({
                        event,
                        data: data.length ? decodeArraysToJson(decoder, data) : null
                    });
                }
            }
        });
    }
}
exports.SSEDecoder = SSEDecoder;
function joinArrays(data) {
    const totalLength = data.reduce((acc, curr)=>acc + curr.length, 0);
    let merged = new Uint8Array(totalLength);
    let offset = 0;
    for (const c of data){
        merged.set(c, offset);
        offset += c.length;
    }
    return merged;
}
function decodeArraysToJson(decoder, data) {
    return JSON.parse(decoder.decode(joinArrays(data)));
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.0.70_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u75jt5v4tp43i24oso6uflm6he/node_modules/@langchain/langgraph-sdk/dist/utils/stream.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IterableReadableStream = void 0;
/*
 * Support async iterator syntax for ReadableStreams in all environments.
 * Source: https://github.com/MattiasBuelens/web-streams-polyfill/pull/122#issuecomment-1627354490
 */ class IterableReadableStream extends ReadableStream {
    constructor(){
        super(...arguments);
        Object.defineProperty(this, "reader", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    ensureReader() {
        if (!this.reader) {
            this.reader = this.getReader();
        }
    }
    async next() {
        this.ensureReader();
        try {
            const result = await this.reader.read();
            if (result.done) {
                this.reader.releaseLock(); // release lock when stream becomes closed
                return {
                    done: true,
                    value: undefined
                };
            } else {
                return {
                    done: false,
                    value: result.value
                };
            }
        } catch (e) {
            this.reader.releaseLock(); // release lock when stream becomes errored
            throw e;
        }
    }
    async return() {
        this.ensureReader();
        // If wrapped in a Node stream, cancel is already called.
        if (this.locked) {
            const cancelPromise = this.reader.cancel(); // cancel first, but don't await yet
            this.reader.releaseLock(); // release lock first
            await cancelPromise; // now await it
        }
        return {
            done: true,
            value: undefined
        };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async throw(e) {
        this.ensureReader();
        if (this.locked) {
            const cancelPromise = this.reader.cancel(); // cancel first, but don't await yet
            this.reader.releaseLock(); // release lock first
            await cancelPromise; // now await it
        }
        throw e;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Not present in Node 18 types, required in latest Node 22
    async [Symbol.asyncDispose]() {
        await this.return();
    }
    [Symbol.asyncIterator]() {
        return this;
    }
    static fromReadableStream(stream) {
        // From https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams#reading_the_stream
        const reader = stream.getReader();
        return new IterableReadableStream({
            start (controller) {
                return pump();
                //TURBOPACK unreachable
                ;
                function pump() {
                    return reader.read().then(({ done, value })=>{
                        // When no more data needs to be consumed, close the stream
                        if (done) {
                            controller.close();
                            return;
                        }
                        // Enqueue the next data chunk into our target stream
                        controller.enqueue(value);
                        return pump();
                    });
                }
            },
            cancel () {
                reader.releaseLock();
            }
        });
    }
    static fromAsyncGenerator(generator) {
        return new IterableReadableStream({
            async pull (controller) {
                const { value, done } = await generator.next();
                // When no more data needs to be consumed, close the stream
                if (done) {
                    controller.close();
                }
                // Fix: `else if (value)` will hang the streaming when nullish value (e.g. empty string) is pulled
                controller.enqueue(value);
            },
            async cancel (reason) {
                await generator.return(reason);
            }
        });
    }
}
exports.IterableReadableStream = IterableReadableStream;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.0.70_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u75jt5v4tp43i24oso6uflm6he/node_modules/@langchain/langgraph-sdk/dist/client.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Client = exports.StoreClient = exports.RunsClient = exports.ThreadsClient = exports.AssistantsClient = exports.CronsClient = exports.getApiKey = void 0;
const async_caller_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.0.70_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u75jt5v4tp43i24oso6uflm6he/node_modules/@langchain/langgraph-sdk/dist/utils/async_caller.cjs [app-route] (ecmascript)");
const env_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.0.70_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u75jt5v4tp43i24oso6uflm6he/node_modules/@langchain/langgraph-sdk/dist/utils/env.cjs [app-route] (ecmascript)");
const signals_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.0.70_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u75jt5v4tp43i24oso6uflm6he/node_modules/@langchain/langgraph-sdk/dist/utils/signals.cjs [app-route] (ecmascript)");
const sse_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.0.70_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u75jt5v4tp43i24oso6uflm6he/node_modules/@langchain/langgraph-sdk/dist/utils/sse.cjs [app-route] (ecmascript)");
const stream_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.0.70_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u75jt5v4tp43i24oso6uflm6he/node_modules/@langchain/langgraph-sdk/dist/utils/stream.cjs [app-route] (ecmascript)");
/**
 * Get the API key from the environment.
 * Precedence:
 *   1. explicit argument
 *   2. LANGGRAPH_API_KEY
 *   3. LANGSMITH_API_KEY
 *   4. LANGCHAIN_API_KEY
 *
 * @param apiKey - Optional API key provided as an argument
 * @returns The API key if found, otherwise undefined
 */ function getApiKey(apiKey) {
    if (apiKey) {
        return apiKey;
    }
    const prefixes = [
        "LANGGRAPH",
        "LANGSMITH",
        "LANGCHAIN"
    ];
    for (const prefix of prefixes){
        const envKey = (0, env_js_1.getEnvironmentVariable)(`${prefix}_API_KEY`);
        if (envKey) {
            // Remove surrounding quotes
            return envKey.trim().replace(/^["']|["']$/g, "");
        }
    }
    return undefined;
}
exports.getApiKey = getApiKey;
class BaseClient {
    constructor(config){
        Object.defineProperty(this, "asyncCaller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timeoutMs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "apiUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "defaultHeaders", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const callerOptions = {
            maxRetries: 4,
            maxConcurrency: 4,
            ...config?.callerOptions
        };
        let defaultApiUrl = "http://localhost:8123";
        if (!config?.apiUrl && typeof globalThis === "object" && globalThis != null) {
            const fetchSmb = Symbol.for("langgraph_api:fetch");
            const urlSmb = Symbol.for("langgraph_api:url");
            const global = globalThis;
            if (global[fetchSmb]) callerOptions.fetch ??= global[fetchSmb];
            if (global[urlSmb]) defaultApiUrl = global[urlSmb];
        }
        this.asyncCaller = new async_caller_js_1.AsyncCaller(callerOptions);
        this.timeoutMs = config?.timeoutMs;
        // default limit being capped by Chrome
        // https://github.com/nodejs/undici/issues/1373
        // Regex to remove trailing slash, if present
        this.apiUrl = config?.apiUrl?.replace(/\/$/, "") || defaultApiUrl;
        this.defaultHeaders = config?.defaultHeaders || {};
        const apiKey = getApiKey(config?.apiKey);
        if (apiKey) {
            this.defaultHeaders["X-Api-Key"] = apiKey;
        }
    }
    prepareFetchOptions(path, options) {
        const mutatedOptions = {
            ...options,
            headers: {
                ...this.defaultHeaders,
                ...options?.headers
            }
        };
        if (mutatedOptions.json) {
            mutatedOptions.body = JSON.stringify(mutatedOptions.json);
            mutatedOptions.headers = {
                ...mutatedOptions.headers,
                "Content-Type": "application/json"
            };
            delete mutatedOptions.json;
        }
        let timeoutSignal = null;
        if (typeof options?.timeoutMs !== "undefined") {
            if (options.timeoutMs != null) {
                timeoutSignal = AbortSignal.timeout(options.timeoutMs);
            }
        } else if (this.timeoutMs != null) {
            timeoutSignal = AbortSignal.timeout(this.timeoutMs);
        }
        mutatedOptions.signal = (0, signals_js_1.mergeSignals)(timeoutSignal, mutatedOptions.signal);
        const targetUrl = new URL(`${this.apiUrl}${path}`);
        if (mutatedOptions.params) {
            for (const [key, value] of Object.entries(mutatedOptions.params)){
                if (value == null) continue;
                let strValue = typeof value === "string" || typeof value === "number" ? value.toString() : JSON.stringify(value);
                targetUrl.searchParams.append(key, strValue);
            }
            delete mutatedOptions.params;
        }
        return [
            targetUrl,
            mutatedOptions
        ];
    }
    async fetch(path, options) {
        const response = await this.asyncCaller.fetch(...this.prepareFetchOptions(path, options));
        if (response.status === 202 || response.status === 204) {
            return undefined;
        }
        return response.json();
    }
}
class CronsClient extends BaseClient {
    /**
     *
     * @param threadId The ID of the thread.
     * @param assistantId Assistant ID to use for this cron job.
     * @param payload Payload for creating a cron job.
     * @returns The created background run.
     */ async createForThread(threadId, assistantId, payload) {
        const json = {
            schedule: payload?.schedule,
            input: payload?.input,
            config: payload?.config,
            metadata: payload?.metadata,
            assistant_id: assistantId,
            interrupt_before: payload?.interruptBefore,
            interrupt_after: payload?.interruptAfter,
            webhook: payload?.webhook,
            multitask_strategy: payload?.multitaskStrategy,
            if_not_exists: payload?.ifNotExists
        };
        return this.fetch(`/threads/${threadId}/runs/crons`, {
            method: "POST",
            json
        });
    }
    /**
     *
     * @param assistantId Assistant ID to use for this cron job.
     * @param payload Payload for creating a cron job.
     * @returns
     */ async create(assistantId, payload) {
        const json = {
            schedule: payload?.schedule,
            input: payload?.input,
            config: payload?.config,
            metadata: payload?.metadata,
            assistant_id: assistantId,
            interrupt_before: payload?.interruptBefore,
            interrupt_after: payload?.interruptAfter,
            webhook: payload?.webhook,
            multitask_strategy: payload?.multitaskStrategy,
            if_not_exists: payload?.ifNotExists
        };
        return this.fetch(`/runs/crons`, {
            method: "POST",
            json
        });
    }
    /**
     *
     * @param cronId Cron ID of Cron job to delete.
     */ async delete(cronId) {
        await this.fetch(`/runs/crons/${cronId}`, {
            method: "DELETE"
        });
    }
    /**
     *
     * @param query Query options.
     * @returns List of crons.
     */ async search(query) {
        return this.fetch("/runs/crons/search", {
            method: "POST",
            json: {
                assistant_id: query?.assistantId ?? undefined,
                thread_id: query?.threadId ?? undefined,
                limit: query?.limit ?? 10,
                offset: query?.offset ?? 0
            }
        });
    }
}
exports.CronsClient = CronsClient;
class AssistantsClient extends BaseClient {
    /**
     * Get an assistant by ID.
     *
     * @param assistantId The ID of the assistant.
     * @returns Assistant
     */ async get(assistantId) {
        return this.fetch(`/assistants/${assistantId}`);
    }
    /**
     * Get the JSON representation of the graph assigned to a runnable
     * @param assistantId The ID of the assistant.
     * @param options.xray Whether to include subgraphs in the serialized graph representation. If an integer value is provided, only subgraphs with a depth less than or equal to the value will be included.
     * @returns Serialized graph
     */ async getGraph(assistantId, options) {
        return this.fetch(`/assistants/${assistantId}/graph`, {
            params: {
                xray: options?.xray
            }
        });
    }
    /**
     * Get the state and config schema of the graph assigned to a runnable
     * @param assistantId The ID of the assistant.
     * @returns Graph schema
     */ async getSchemas(assistantId) {
        return this.fetch(`/assistants/${assistantId}/schemas`);
    }
    /**
     * Get the schemas of an assistant by ID.
     *
     * @param assistantId The ID of the assistant to get the schema of.
     * @param options Additional options for getting subgraphs, such as namespace or recursion extraction.
     * @returns The subgraphs of the assistant.
     */ async getSubgraphs(assistantId, options) {
        if (options?.namespace) {
            return this.fetch(`/assistants/${assistantId}/subgraphs/${options.namespace}`, {
                params: {
                    recurse: options?.recurse
                }
            });
        }
        return this.fetch(`/assistants/${assistantId}/subgraphs`, {
            params: {
                recurse: options?.recurse
            }
        });
    }
    /**
     * Create a new assistant.
     * @param payload Payload for creating an assistant.
     * @returns The created assistant.
     */ async create(payload) {
        return this.fetch("/assistants", {
            method: "POST",
            json: {
                graph_id: payload.graphId,
                config: payload.config,
                metadata: payload.metadata,
                assistant_id: payload.assistantId,
                if_exists: payload.ifExists,
                name: payload.name,
                description: payload.description
            }
        });
    }
    /**
     * Update an assistant.
     * @param assistantId ID of the assistant.
     * @param payload Payload for updating the assistant.
     * @returns The updated assistant.
     */ async update(assistantId, payload) {
        return this.fetch(`/assistants/${assistantId}`, {
            method: "PATCH",
            json: {
                graph_id: payload.graphId,
                config: payload.config,
                metadata: payload.metadata,
                name: payload.name,
                description: payload.description
            }
        });
    }
    /**
     * Delete an assistant.
     *
     * @param assistantId ID of the assistant.
     */ async delete(assistantId) {
        return this.fetch(`/assistants/${assistantId}`, {
            method: "DELETE"
        });
    }
    /**
     * List assistants.
     * @param query Query options.
     * @returns List of assistants.
     */ async search(query) {
        return this.fetch("/assistants/search", {
            method: "POST",
            json: {
                graph_id: query?.graphId ?? undefined,
                metadata: query?.metadata ?? undefined,
                limit: query?.limit ?? 10,
                offset: query?.offset ?? 0
            }
        });
    }
    /**
     * List all versions of an assistant.
     *
     * @param assistantId ID of the assistant.
     * @returns List of assistant versions.
     */ async getVersions(assistantId, payload) {
        return this.fetch(`/assistants/${assistantId}/versions`, {
            method: "POST",
            json: {
                metadata: payload?.metadata ?? undefined,
                limit: payload?.limit ?? 10,
                offset: payload?.offset ?? 0
            }
        });
    }
    /**
     * Change the version of an assistant.
     *
     * @param assistantId ID of the assistant.
     * @param version The version to change to.
     * @returns The updated assistant.
     */ async setLatest(assistantId, version) {
        return this.fetch(`/assistants/${assistantId}/latest`, {
            method: "POST",
            json: {
                version
            }
        });
    }
}
exports.AssistantsClient = AssistantsClient;
class ThreadsClient extends BaseClient {
    /**
     * Get a thread by ID.
     *
     * @param threadId ID of the thread.
     * @returns The thread.
     */ async get(threadId) {
        return this.fetch(`/threads/${threadId}`);
    }
    /**
     * Create a new thread.
     *
     * @param payload Payload for creating a thread.
     * @returns The created thread.
     */ async create(payload) {
        return this.fetch(`/threads`, {
            method: "POST",
            json: {
                metadata: {
                    ...payload?.metadata,
                    graph_id: payload?.graphId
                },
                thread_id: payload?.threadId,
                if_exists: payload?.ifExists,
                supersteps: payload?.supersteps?.map((s)=>({
                        updates: s.updates.map((u)=>({
                                values: u.values,
                                command: u.command,
                                as_node: u.asNode
                            }))
                    }))
            }
        });
    }
    /**
     * Copy an existing thread
     * @param threadId ID of the thread to be copied
     * @returns Newly copied thread
     */ async copy(threadId) {
        return this.fetch(`/threads/${threadId}/copy`, {
            method: "POST"
        });
    }
    /**
     * Update a thread.
     *
     * @param threadId ID of the thread.
     * @param payload Payload for updating the thread.
     * @returns The updated thread.
     */ async update(threadId, payload) {
        return this.fetch(`/threads/${threadId}`, {
            method: "PATCH",
            json: {
                metadata: payload?.metadata
            }
        });
    }
    /**
     * Delete a thread.
     *
     * @param threadId ID of the thread.
     */ async delete(threadId) {
        return this.fetch(`/threads/${threadId}`, {
            method: "DELETE"
        });
    }
    /**
     * List threads
     *
     * @param query Query options
     * @returns List of threads
     */ async search(query) {
        return this.fetch("/threads/search", {
            method: "POST",
            json: {
                metadata: query?.metadata ?? undefined,
                limit: query?.limit ?? 10,
                offset: query?.offset ?? 0,
                status: query?.status,
                sort_by: query?.sortBy,
                sort_order: query?.sortOrder
            }
        });
    }
    /**
     * Get state for a thread.
     *
     * @param threadId ID of the thread.
     * @returns Thread state.
     */ async getState(threadId, checkpoint, options) {
        if (checkpoint != null) {
            if (typeof checkpoint !== "string") {
                return this.fetch(`/threads/${threadId}/state/checkpoint`, {
                    method: "POST",
                    json: {
                        checkpoint,
                        subgraphs: options?.subgraphs
                    }
                });
            }
            // deprecated
            return this.fetch(`/threads/${threadId}/state/${checkpoint}`, {
                params: {
                    subgraphs: options?.subgraphs
                }
            });
        }
        return this.fetch(`/threads/${threadId}/state`, {
            params: {
                subgraphs: options?.subgraphs
            }
        });
    }
    /**
     * Add state to a thread.
     *
     * @param threadId The ID of the thread.
     * @returns
     */ async updateState(threadId, options) {
        return this.fetch(`/threads/${threadId}/state`, {
            method: "POST",
            json: {
                values: options.values,
                checkpoint_id: options.checkpointId,
                checkpoint: options.checkpoint,
                as_node: options?.asNode
            }
        });
    }
    /**
     * Patch the metadata of a thread.
     *
     * @param threadIdOrConfig Thread ID or config to patch the state of.
     * @param metadata Metadata to patch the state with.
     */ async patchState(threadIdOrConfig, metadata) {
        let threadId;
        if (typeof threadIdOrConfig !== "string") {
            if (typeof threadIdOrConfig.configurable?.thread_id !== "string") {
                throw new Error("Thread ID is required when updating state with a config.");
            }
            threadId = threadIdOrConfig.configurable.thread_id;
        } else {
            threadId = threadIdOrConfig;
        }
        return this.fetch(`/threads/${threadId}/state`, {
            method: "PATCH",
            json: {
                metadata: metadata
            }
        });
    }
    /**
     * Get all past states for a thread.
     *
     * @param threadId ID of the thread.
     * @param options Additional options.
     * @returns List of thread states.
     */ async getHistory(threadId, options) {
        return this.fetch(`/threads/${threadId}/history`, {
            method: "POST",
            json: {
                limit: options?.limit ?? 10,
                before: options?.before,
                metadata: options?.metadata,
                checkpoint: options?.checkpoint
            }
        });
    }
}
exports.ThreadsClient = ThreadsClient;
class RunsClient extends BaseClient {
    /**
     * Create a run and stream the results.
     *
     * @param threadId The ID of the thread.
     * @param assistantId Assistant ID to use for this run.
     * @param payload Payload for creating a run.
     */ async *stream(threadId, assistantId, payload) {
        const json = {
            input: payload?.input,
            command: payload?.command,
            config: payload?.config,
            metadata: payload?.metadata,
            stream_mode: payload?.streamMode,
            stream_subgraphs: payload?.streamSubgraphs,
            feedback_keys: payload?.feedbackKeys,
            assistant_id: assistantId,
            interrupt_before: payload?.interruptBefore,
            interrupt_after: payload?.interruptAfter,
            checkpoint: payload?.checkpoint,
            checkpoint_id: payload?.checkpointId,
            webhook: payload?.webhook,
            multitask_strategy: payload?.multitaskStrategy,
            on_completion: payload?.onCompletion,
            on_disconnect: payload?.onDisconnect,
            after_seconds: payload?.afterSeconds,
            if_not_exists: payload?.ifNotExists
        };
        const endpoint = threadId == null ? `/runs/stream` : `/threads/${threadId}/runs/stream`;
        const response = await this.asyncCaller.fetch(...this.prepareFetchOptions(endpoint, {
            method: "POST",
            json,
            timeoutMs: null,
            signal: payload?.signal
        }));
        const stream = (response.body || new ReadableStream({
            start: (ctrl)=>ctrl.close()
        })).pipeThrough(new sse_js_1.BytesLineDecoder()).pipeThrough(new sse_js_1.SSEDecoder());
        yield* stream_js_1.IterableReadableStream.fromReadableStream(stream);
    }
    /**
     * Create a run.
     *
     * @param threadId The ID of the thread.
     * @param assistantId Assistant ID to use for this run.
     * @param payload Payload for creating a run.
     * @returns The created run.
     */ async create(threadId, assistantId, payload) {
        const json = {
            input: payload?.input,
            command: payload?.command,
            config: payload?.config,
            metadata: payload?.metadata,
            stream_mode: payload?.streamMode,
            stream_subgraphs: payload?.streamSubgraphs,
            assistant_id: assistantId,
            interrupt_before: payload?.interruptBefore,
            interrupt_after: payload?.interruptAfter,
            webhook: payload?.webhook,
            checkpoint: payload?.checkpoint,
            checkpoint_id: payload?.checkpointId,
            multitask_strategy: payload?.multitaskStrategy,
            after_seconds: payload?.afterSeconds,
            if_not_exists: payload?.ifNotExists
        };
        return this.fetch(`/threads/${threadId}/runs`, {
            method: "POST",
            json,
            signal: payload?.signal
        });
    }
    /**
     * Create a batch of stateless background runs.
     *
     * @param payloads An array of payloads for creating runs.
     * @returns An array of created runs.
     */ async createBatch(payloads) {
        const filteredPayloads = payloads.map((payload)=>({
                ...payload,
                assistant_id: payload.assistantId
            })).map((payload)=>{
            return Object.fromEntries(Object.entries(payload).filter(([_, v])=>v !== undefined));
        });
        return this.fetch("/runs/batch", {
            method: "POST",
            json: filteredPayloads
        });
    }
    /**
     * Create a run and wait for it to complete.
     *
     * @param threadId The ID of the thread.
     * @param assistantId Assistant ID to use for this run.
     * @param payload Payload for creating a run.
     * @returns The last values chunk of the thread.
     */ async wait(threadId, assistantId, payload) {
        const json = {
            input: payload?.input,
            command: payload?.command,
            config: payload?.config,
            metadata: payload?.metadata,
            assistant_id: assistantId,
            interrupt_before: payload?.interruptBefore,
            interrupt_after: payload?.interruptAfter,
            checkpoint: payload?.checkpoint,
            checkpoint_id: payload?.checkpointId,
            webhook: payload?.webhook,
            multitask_strategy: payload?.multitaskStrategy,
            on_completion: payload?.onCompletion,
            on_disconnect: payload?.onDisconnect,
            after_seconds: payload?.afterSeconds,
            if_not_exists: payload?.ifNotExists
        };
        const endpoint = threadId == null ? `/runs/wait` : `/threads/${threadId}/runs/wait`;
        const response = await this.fetch(endpoint, {
            method: "POST",
            json,
            timeoutMs: null,
            signal: payload?.signal
        });
        const raiseError = payload?.raiseError !== undefined ? payload.raiseError : true;
        if (raiseError && "__error__" in response && typeof response.__error__ === "object" && response.__error__ && "error" in response.__error__ && "message" in response.__error__) {
            throw new Error(`${response.__error__?.error}: ${response.__error__?.message}`);
        }
        return response;
    }
    /**
     * List all runs for a thread.
     *
     * @param threadId The ID of the thread.
     * @param options Filtering and pagination options.
     * @returns List of runs.
     */ async list(threadId, options) {
        return this.fetch(`/threads/${threadId}/runs`, {
            params: {
                limit: options?.limit ?? 10,
                offset: options?.offset ?? 0,
                status: options?.status ?? undefined
            }
        });
    }
    /**
     * Get a run by ID.
     *
     * @param threadId The ID of the thread.
     * @param runId The ID of the run.
     * @returns The run.
     */ async get(threadId, runId) {
        return this.fetch(`/threads/${threadId}/runs/${runId}`);
    }
    /**
     * Cancel a run.
     *
     * @param threadId The ID of the thread.
     * @param runId The ID of the run.
     * @param wait Whether to block when canceling
     * @param action Action to take when cancelling the run. Possible values are `interrupt` or `rollback`. Default is `interrupt`.
     * @returns
     */ async cancel(threadId, runId, wait = false, action = "interrupt") {
        return this.fetch(`/threads/${threadId}/runs/${runId}/cancel`, {
            method: "POST",
            params: {
                wait: wait ? "1" : "0",
                action: action
            }
        });
    }
    /**
     * Block until a run is done.
     *
     * @param threadId The ID of the thread.
     * @param runId The ID of the run.
     * @returns
     */ async join(threadId, runId, options) {
        return this.fetch(`/threads/${threadId}/runs/${runId}/join`, {
            timeoutMs: null,
            signal: options?.signal
        });
    }
    /**
     * Stream output from a run in real-time, until the run is done.
     * Output is not buffered, so any output produced before this call will
     * not be received here.
     *
     * @param threadId The ID of the thread.
     * @param runId The ID of the run.
     * @param options Additional options for controlling the stream behavior:
     *   - signal: An AbortSignal that can be used to cancel the stream request
     *   - cancelOnDisconnect: When true, automatically cancels the run if the client disconnects from the stream
     *   - streamMode: Controls what types of events to receive from the stream (can be a single mode or array of modes)
     *        Must be a subset of the stream modes passed when creating the run. Background runs default to having the union of all
     *        stream modes enabled.
     * @returns An async generator yielding stream parts.
     */ async *joinStream(threadId, runId, options) {
        const opts = typeof options === "object" && options != null && options instanceof AbortSignal ? {
            signal: options
        } : options;
        const response = await this.asyncCaller.fetch(...this.prepareFetchOptions(`/threads/${threadId}/runs/${runId}/stream`, {
            method: "GET",
            timeoutMs: null,
            signal: opts?.signal,
            params: {
                cancel_on_disconnect: opts?.cancelOnDisconnect ? "1" : "0",
                stream_mode: opts?.streamMode
            }
        }));
        const stream = (response.body || new ReadableStream({
            start: (ctrl)=>ctrl.close()
        })).pipeThrough(new sse_js_1.BytesLineDecoder()).pipeThrough(new sse_js_1.SSEDecoder());
        yield* stream_js_1.IterableReadableStream.fromReadableStream(stream);
    }
    /**
     * Delete a run.
     *
     * @param threadId The ID of the thread.
     * @param runId The ID of the run.
     * @returns
     */ async delete(threadId, runId) {
        return this.fetch(`/threads/${threadId}/runs/${runId}`, {
            method: "DELETE"
        });
    }
}
exports.RunsClient = RunsClient;
class StoreClient extends BaseClient {
    /**
     * Store or update an item.
     *
     * @param namespace A list of strings representing the namespace path.
     * @param key The unique identifier for the item within the namespace.
     * @param value A dictionary containing the item's data.
     * @param options.index Controls search indexing - null (use defaults), false (disable), or list of field paths to index.
     * @param options.ttl Optional time-to-live in minutes for the item, or null for no expiration.
     * @returns Promise<void>
     *
     * @example
     * ```typescript
     * await client.store.putItem(
     *   ["documents", "user123"],
     *   "item456",
     *   { title: "My Document", content: "Hello World" },
     *   { ttl: 60 } // expires in 60 minutes
     * );
     * ```
     */ async putItem(namespace, key, value, options) {
        namespace.forEach((label)=>{
            if (label.includes(".")) {
                throw new Error(`Invalid namespace label '${label}'. Namespace labels cannot contain periods ('.')`);
            }
        });
        const payload = {
            namespace,
            key,
            value,
            index: options?.index,
            ttl: options?.ttl
        };
        return this.fetch("/store/items", {
            method: "PUT",
            json: payload
        });
    }
    /**
     * Retrieve a single item.
     *
     * @param namespace A list of strings representing the namespace path.
     * @param key The unique identifier for the item.
     * @param options.refreshTtl Whether to refresh the TTL on this read operation. If null, uses the store's default behavior.
     * @returns Promise<Item>
     *
     * @example
     * ```typescript
     * const item = await client.store.getItem(
     *   ["documents", "user123"],
     *   "item456",
     *   { refreshTtl: true }
     * );
     * console.log(item);
     * // {
     * //   namespace: ["documents", "user123"],
     * //   key: "item456",
     * //   value: { title: "My Document", content: "Hello World" },
     * //   createdAt: "2024-07-30T12:00:00Z",
     * //   updatedAt: "2024-07-30T12:00:00Z"
     * // }
     * ```
     */ async getItem(namespace, key, options) {
        namespace.forEach((label)=>{
            if (label.includes(".")) {
                throw new Error(`Invalid namespace label '${label}'. Namespace labels cannot contain periods ('.')`);
            }
        });
        const params = {
            namespace: namespace.join("."),
            key
        };
        if (options?.refreshTtl !== undefined) {
            params.refresh_ttl = options.refreshTtl;
        }
        const response = await this.fetch("/store/items", {
            params
        });
        return response ? {
            ...response,
            createdAt: response.created_at,
            updatedAt: response.updated_at
        } : null;
    }
    /**
     * Delete an item.
     *
     * @param namespace A list of strings representing the namespace path.
     * @param key The unique identifier for the item.
     * @returns Promise<void>
     */ async deleteItem(namespace, key) {
        namespace.forEach((label)=>{
            if (label.includes(".")) {
                throw new Error(`Invalid namespace label '${label}'. Namespace labels cannot contain periods ('.')`);
            }
        });
        return this.fetch("/store/items", {
            method: "DELETE",
            json: {
                namespace,
                key
            }
        });
    }
    /**
     * Search for items within a namespace prefix.
     *
     * @param namespacePrefix List of strings representing the namespace prefix.
     * @param options.filter Optional dictionary of key-value pairs to filter results.
     * @param options.limit Maximum number of items to return (default is 10).
     * @param options.offset Number of items to skip before returning results (default is 0).
     * @param options.query Optional search query.
     * @param options.refreshTtl Whether to refresh the TTL on items returned by this search. If null, uses the store's default behavior.
     * @returns Promise<SearchItemsResponse>
     *
     * @example
     * ```typescript
     * const results = await client.store.searchItems(
     *   ["documents"],
     *   {
     *     filter: { author: "John Doe" },
     *     limit: 5,
     *     refreshTtl: true
     *   }
     * );
     * console.log(results);
     * // {
     * //   items: [
     * //     {
     * //       namespace: ["documents", "user123"],
     * //       key: "item789",
     * //       value: { title: "Another Document", author: "John Doe" },
     * //       createdAt: "2024-07-30T12:00:00Z",
     * //       updatedAt: "2024-07-30T12:00:00Z"
     * //     },
     * //     // ... additional items ...
     * //   ]
     * // }
     * ```
     */ async searchItems(namespacePrefix, options) {
        const payload = {
            namespace_prefix: namespacePrefix,
            filter: options?.filter,
            limit: options?.limit ?? 10,
            offset: options?.offset ?? 0,
            query: options?.query,
            refresh_ttl: options?.refreshTtl
        };
        const response = await this.fetch("/store/items/search", {
            method: "POST",
            json: payload
        });
        return {
            items: response.items.map((item)=>({
                    ...item,
                    createdAt: item.created_at,
                    updatedAt: item.updated_at
                }))
        };
    }
    /**
     * List namespaces with optional match conditions.
     *
     * @param options.prefix Optional list of strings representing the prefix to filter namespaces.
     * @param options.suffix Optional list of strings representing the suffix to filter namespaces.
     * @param options.maxDepth Optional integer specifying the maximum depth of namespaces to return.
     * @param options.limit Maximum number of namespaces to return (default is 100).
     * @param options.offset Number of namespaces to skip before returning results (default is 0).
     * @returns Promise<ListNamespaceResponse>
     */ async listNamespaces(options) {
        const payload = {
            prefix: options?.prefix,
            suffix: options?.suffix,
            max_depth: options?.maxDepth,
            limit: options?.limit ?? 100,
            offset: options?.offset ?? 0
        };
        return this.fetch("/store/namespaces", {
            method: "POST",
            json: payload
        });
    }
}
exports.StoreClient = StoreClient;
class UiClient extends BaseClient {
    static getOrCached(key, fn) {
        if (UiClient.promiseCache[key] != null) {
            return UiClient.promiseCache[key];
        }
        const promise = fn();
        UiClient.promiseCache[key] = promise;
        return promise;
    }
    async getComponent(assistantId, agentName) {
        return UiClient["getOrCached"](`${this.apiUrl}-${assistantId}-${agentName}`, async ()=>{
            const response = await this.asyncCaller.fetch(...this.prepareFetchOptions(`/ui/${assistantId}`, {
                headers: {
                    Accept: "text/html",
                    "Content-Type": "application/json"
                },
                method: "POST",
                json: {
                    name: agentName
                }
            }));
            return response.text();
        });
    }
}
Object.defineProperty(UiClient, "promiseCache", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: {}
});
class Client {
    constructor(config){
        /**
         * The client for interacting with assistants.
         */ Object.defineProperty(this, "assistants", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The client for interacting with threads.
         */ Object.defineProperty(this, "threads", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The client for interacting with runs.
         */ Object.defineProperty(this, "runs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The client for interacting with cron runs.
         */ Object.defineProperty(this, "crons", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The client for interacting with the KV store.
         */ Object.defineProperty(this, "store", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The client for interacting with the UI.
         * @internal Used by LoadExternalComponent and the API might change in the future.
         */ Object.defineProperty(this, "~ui", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.assistants = new AssistantsClient(config);
        this.threads = new ThreadsClient(config);
        this.runs = new RunsClient(config);
        this.crons = new CronsClient(config);
        this.store = new StoreClient(config);
        this["~ui"] = new UiClient(config);
    }
}
exports.Client = Client;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.0.70_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u75jt5v4tp43i24oso6uflm6he/node_modules/@langchain/langgraph-sdk/dist/index.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.overrideFetchImplementation = exports.Client = void 0;
var client_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.0.70_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u75jt5v4tp43i24oso6uflm6he/node_modules/@langchain/langgraph-sdk/dist/client.cjs [app-route] (ecmascript)");
Object.defineProperty(exports, "Client", {
    enumerable: true,
    get: function() {
        return client_js_1.Client;
    }
});
var fetch_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.0.70_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u75jt5v4tp43i24oso6uflm6he/node_modules/@langchain/langgraph-sdk/dist/singletons/fetch.cjs [app-route] (ecmascript)");
Object.defineProperty(exports, "overrideFetchImplementation", {
    enumerable: true,
    get: function() {
        return fetch_js_1.overrideFetchImplementation;
    }
});
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.0.70_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u75jt5v4tp43i24oso6uflm6he/node_modules/@langchain/langgraph-sdk/index.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+langgraph-sdk@0.0.70_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104._u75jt5v4tp43i24oso6uflm6he/node_modules/@langchain/langgraph-sdk/dist/index.cjs [app-route] (ecmascript)");
}),
];

//# sourceMappingURL=5fd8e__pnpm_00d3dffd._.js.map