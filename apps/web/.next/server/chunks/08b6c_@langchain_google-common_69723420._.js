module.exports = [
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/safety.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GoogleAISafetyError = void 0;
class GoogleAISafetyError extends Error {
    constructor(response, message){
        super(message);
        Object.defineProperty(this, "response", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "reply", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        this.response = response;
    }
}
exports.GoogleAISafetyError = GoogleAISafetyError;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/types-anthropic.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/types.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GeminiToolAttributes = exports.GeminiSearchToolAttributes = exports.GoogleAISafetyMethod = exports.GoogleAISafetyThreshold = exports.GoogleAISafetyCategory = void 0;
__exportStar(__turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/types-anthropic.cjs [app-route] (ecmascript)"), exports);
exports.GoogleAISafetyCategory = {
    Harassment: "HARM_CATEGORY_HARASSMENT",
    HARASSMENT: "HARM_CATEGORY_HARASSMENT",
    HARM_CATEGORY_HARASSMENT: "HARM_CATEGORY_HARASSMENT",
    HateSpeech: "HARM_CATEGORY_HATE_SPEECH",
    HATE_SPEECH: "HARM_CATEGORY_HATE_SPEECH",
    HARM_CATEGORY_HATE_SPEECH: "HARM_CATEGORY_HATE_SPEECH",
    SexuallyExplicit: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    SEXUALLY_EXPLICIT: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    HARM_CATEGORY_SEXUALLY_EXPLICIT: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    Dangerous: "HARM_CATEGORY_DANGEROUS",
    DANGEROUS: "HARM_CATEGORY_DANGEROUS",
    HARM_CATEGORY_DANGEROUS: "HARM_CATEGORY_DANGEROUS",
    CivicIntegrity: "HARM_CATEGORY_CIVIC_INTEGRITY",
    CIVIC_INTEGRITY: "HARM_CATEGORY_CIVIC_INTEGRITY",
    HARM_CATEGORY_CIVIC_INTEGRITY: "HARM_CATEGORY_CIVIC_INTEGRITY"
};
exports.GoogleAISafetyThreshold = {
    None: "BLOCK_NONE",
    NONE: "BLOCK_NONE",
    BLOCK_NONE: "BLOCK_NONE",
    Few: "BLOCK_ONLY_HIGH",
    FEW: "BLOCK_ONLY_HIGH",
    BLOCK_ONLY_HIGH: "BLOCK_ONLY_HIGH",
    Some: "BLOCK_MEDIUM_AND_ABOVE",
    SOME: "BLOCK_MEDIUM_AND_ABOVE",
    BLOCK_MEDIUM_AND_ABOVE: "BLOCK_MEDIUM_AND_ABOVE",
    Most: "BLOCK_LOW_AND_ABOVE",
    MOST: "BLOCK_LOW_AND_ABOVE",
    BLOCK_LOW_AND_ABOVE: "BLOCK_LOW_AND_ABOVE",
    Off: "OFF",
    OFF: "OFF",
    BLOCK_OFF: "OFF"
};
exports.GoogleAISafetyMethod = {
    Severity: "SEVERITY",
    Probability: "PROBABILITY"
};
exports.GeminiSearchToolAttributes = [
    "googleSearchRetrieval",
    "googleSearch"
];
exports.GeminiToolAttributes = [
    "functionDeclaration",
    "retrieval",
    ...exports.GeminiSearchToolAttributes
];
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/zod_to_gemini_parameters.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable @typescript-eslint/no-unused-vars */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.jsonSchemaToGeminiParameters = exports.zodToGeminiParameters = exports.removeAdditionalProperties = void 0;
const zod_to_json_schema_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/zod-to-json-schema@3.24.6_zod@3.25.76/node_modules/zod-to-json-schema/dist/cjs/index.js [app-route] (ecmascript)");
function removeAdditionalProperties(// eslint-disable-next-line @typescript-eslint/no-explicit-any
obj) {
    if (typeof obj === "object" && obj !== null) {
        const newObj = {
            ...obj
        };
        if ("additionalProperties" in newObj) {
            delete newObj.additionalProperties;
        }
        for(const key in newObj){
            if (key in newObj) {
                if (Array.isArray(newObj[key])) {
                    newObj[key] = newObj[key].map(removeAdditionalProperties);
                } else if (typeof newObj[key] === "object" && newObj[key] !== null) {
                    newObj[key] = removeAdditionalProperties(newObj[key]);
                }
            }
        }
        return newObj;
    }
    return obj;
}
exports.removeAdditionalProperties = removeAdditionalProperties;
function zodToGeminiParameters(// eslint-disable-next-line @typescript-eslint/no-explicit-any
zodObj) {
    // Gemini doesn't accept either the $schema or additionalProperties
    // attributes, so we need to explicitly remove them.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const jsonSchema = removeAdditionalProperties((0, zod_to_json_schema_1.zodToJsonSchema)(zodObj));
    const { $schema, ...rest } = jsonSchema;
    return rest;
}
exports.zodToGeminiParameters = zodToGeminiParameters;
function jsonSchemaToGeminiParameters(// eslint-disable-next-line @typescript-eslint/no-explicit-any
schema) {
    // Gemini doesn't accept either the $schema or additionalProperties
    // attributes, so we need to explicitly remove them.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const jsonSchema = removeAdditionalProperties(schema);
    const { $schema, ...rest } = jsonSchema;
    return rest;
}
exports.jsonSchemaToGeminiParameters = jsonSchemaToGeminiParameters;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/gemini.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isModelGemini = exports.validateGeminiParams = exports.getGeminiAPI = exports.MessageGeminiSafetyHandler = exports.DefaultGeminiSafetyHandler = void 0;
const uuid_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/uuid@10.0.0/node_modules/uuid/dist/esm-node/index.js [app-route] (ecmascript)");
const messages_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/messages.cjs [app-route] (ecmascript)");
const outputs_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/outputs.cjs [app-route] (ecmascript)");
const function_calling_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/utils/function_calling.cjs [app-route] (ecmascript)");
const safety_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/safety.cjs [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/types.cjs [app-route] (ecmascript)");
const zod_to_gemini_parameters_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/zod_to_gemini_parameters.cjs [app-route] (ecmascript)");
class DefaultGeminiSafetyHandler {
    constructor(settings){
        Object.defineProperty(this, "errorFinish", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "SAFETY",
                "RECITATION",
                "OTHER"
            ]
        });
        this.errorFinish = settings?.errorFinish ?? this.errorFinish;
    }
    handleDataPromptFeedback(response, data) {
        // Check to see if our prompt was blocked in the first place
        const promptFeedback = data?.promptFeedback;
        const blockReason = promptFeedback?.blockReason;
        if (blockReason) {
            throw new safety_js_1.GoogleAISafetyError(response, `Prompt blocked: ${blockReason}`);
        }
        return data;
    }
    handleDataFinishReason(response, data) {
        const firstCandidate = data?.candidates?.[0];
        const finishReason = firstCandidate?.finishReason;
        if (this.errorFinish.includes(finishReason)) {
            throw new safety_js_1.GoogleAISafetyError(response, `Finish reason: ${finishReason}`);
        }
        return data;
    }
    handleData(response, data) {
        let ret = data;
        ret = this.handleDataPromptFeedback(response, ret);
        ret = this.handleDataFinishReason(response, ret);
        return ret;
    }
    handle(response) {
        let newdata;
        if ("nextChunk" in response.data) {
            // TODO: This is a stream. How to handle?
            newdata = response.data;
        } else if (Array.isArray(response.data)) {
            // If it is an array, try to handle every item in the array
            try {
                newdata = response.data.map((item)=>this.handleData(response, item));
            } catch (xx) {
                // eslint-disable-next-line no-instanceof/no-instanceof
                if (xx instanceof safety_js_1.GoogleAISafetyError) {
                    throw new safety_js_1.GoogleAISafetyError(response, xx.message);
                } else {
                    throw xx;
                }
            }
        } else {
            const data = response.data;
            newdata = this.handleData(response, data);
        }
        return {
            ...response,
            data: newdata
        };
    }
}
exports.DefaultGeminiSafetyHandler = DefaultGeminiSafetyHandler;
class MessageGeminiSafetyHandler extends DefaultGeminiSafetyHandler {
    constructor(settings){
        super(settings);
        Object.defineProperty(this, "msg", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "forceNewMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        this.msg = settings?.msg ?? this.msg;
        this.forceNewMessage = settings?.forceNewMessage ?? this.forceNewMessage;
    }
    setMessage(data) {
        const ret = data;
        if (this.forceNewMessage || !data?.candidates?.[0]?.content?.parts?.length) {
            ret.candidates = data.candidates ?? [];
            ret.candidates[0] = data.candidates[0] ?? {};
            ret.candidates[0].content = data.candidates[0].content ?? {};
            ret.candidates[0].content = {
                role: "model",
                parts: [
                    {
                        text: this.msg
                    }
                ]
            };
        }
        return ret;
    }
    handleData(response, data) {
        try {
            return super.handleData(response, data);
        } catch (xx) {
            return this.setMessage(data);
        }
    }
}
exports.MessageGeminiSafetyHandler = MessageGeminiSafetyHandler;
const extractMimeType = (str)=>{
    if (str.startsWith("data:")) {
        return {
            mimeType: str.split(":")[1].split(";")[0],
            data: str.split(",")[1]
        };
    }
    return null;
};
function getGeminiAPI(config) {
    function messageContentText(content) {
        if (content?.text && content?.text.length > 0) {
            return {
                text: content.text
            };
        } else {
            return null;
        }
    }
    function messageContentImageUrl(content) {
        const url = typeof content.image_url === "string" ? content.image_url : content.image_url.url;
        if (!url) {
            throw new Error("Missing Image URL");
        }
        const mimeTypeAndData = extractMimeType(url);
        if (mimeTypeAndData) {
            return {
                inlineData: mimeTypeAndData
            };
        } else {
            // FIXME - need some way to get mime type
            return {
                fileData: {
                    mimeType: "image/png",
                    fileUri: url
                }
            };
        }
    }
    async function blobToFileData(blob) {
        return {
            fileData: {
                fileUri: blob.path,
                mimeType: blob.mimetype
            }
        };
    }
    async function fileUriContentToBlob(uri) {
        return config?.mediaManager?.getMediaBlob(uri);
    }
    async function messageContentMedia(// eslint-disable-next-line @typescript-eslint/no-explicit-any
    content) {
        if ("mimeType" in content && "data" in content) {
            return {
                inlineData: {
                    mimeType: content.mimeType,
                    data: content.data
                }
            };
        } else if ("mimeType" in content && "fileUri" in content) {
            return {
                fileData: {
                    mimeType: content.mimeType,
                    fileUri: content.fileUri
                }
            };
        } else {
            const uri = content.fileUri;
            const blob = await fileUriContentToBlob(uri);
            if (blob) {
                return await blobToFileData(blob);
            }
        }
        throw new Error(`Invalid media content: ${JSON.stringify(content, null, 1)}`);
    }
    async function messageContentComplexToPart(content) {
        switch(content.type){
            case "text":
                if ("text" in content) {
                    return messageContentText(content);
                }
                break;
            case "image_url":
                if ("image_url" in content) {
                    // Type guard for MessageContentImageUrl
                    return messageContentImageUrl(content);
                }
                break;
            case "media":
                return await messageContentMedia(content);
            default:
                throw new Error(`Unsupported type "${content.type}" received while converting message to message parts: ${content}`);
        }
        throw new Error(`Cannot coerce "${content.type}" message part into a string.`);
    }
    async function messageContentComplexToParts(content) {
        const contents = content.map(messageContentComplexToPart);
        return Promise.all(contents);
    }
    async function messageContentToParts(content) {
        // Convert a string to a text type MessageContent if needed
        const messageContent = typeof content === "string" ? [
            {
                type: "text",
                text: content
            }
        ] : content;
        // Get all of the parts, even those that don't correctly resolve
        const allParts = await messageContentComplexToParts(messageContent);
        // Remove any invalid parts
        const parts = allParts.reduce((acc, val)=>{
            if (val) {
                return [
                    ...acc,
                    val
                ];
            } else {
                return acc;
            }
        }, []);
        return parts;
    }
    function messageToolCallsToParts(toolCalls) {
        if (!toolCalls || toolCalls.length === 0) {
            return [];
        }
        return toolCalls.map((tool)=>{
            let args = {};
            if (tool?.function?.arguments) {
                const argStr = tool.function.arguments;
                args = JSON.parse(argStr);
            }
            return {
                functionCall: {
                    name: tool.function.name,
                    args
                }
            };
        });
    }
    function messageKwargsToParts(kwargs) {
        const ret = [];
        if (kwargs?.tool_calls) {
            ret.push(...messageToolCallsToParts(kwargs.tool_calls));
        }
        return ret;
    }
    async function roleMessageToContent(role, message) {
        const contentParts = await messageContentToParts(message.content);
        let toolParts;
        if ((0, messages_1.isAIMessage)(message) && !!message.tool_calls?.length) {
            toolParts = message.tool_calls.map((toolCall)=>({
                    functionCall: {
                        name: toolCall.name,
                        args: toolCall.args
                    }
                }));
        } else {
            toolParts = messageKwargsToParts(message.additional_kwargs);
        }
        const parts = [
            ...contentParts,
            ...toolParts
        ];
        return [
            {
                role,
                parts
            }
        ];
    }
    async function systemMessageToContent(message) {
        return config?.useSystemInstruction ? roleMessageToContent("system", message) : [
            ...await roleMessageToContent("user", message),
            ...await roleMessageToContent("model", new messages_1.AIMessage("Ok"))
        ];
    }
    function toolMessageToContent(message, prevMessage) {
        const contentStr = typeof message.content === "string" ? message.content : message.content.reduce((acc, content)=>{
            if (content.type === "text") {
                return acc + content.text;
            } else {
                return acc;
            }
        }, "");
        // Hacky :(
        const responseName = ((0, messages_1.isAIMessage)(prevMessage) && !!prevMessage.tool_calls?.length ? prevMessage.tool_calls[0].name : prevMessage.name) ?? message.tool_call_id;
        try {
            const content = JSON.parse(contentStr);
            return [
                {
                    role: "function",
                    parts: [
                        {
                            functionResponse: {
                                name: responseName,
                                response: {
                                    content
                                }
                            }
                        }
                    ]
                }
            ];
        } catch (_) {
            return [
                {
                    role: "function",
                    parts: [
                        {
                            functionResponse: {
                                name: responseName,
                                response: {
                                    content: contentStr
                                }
                            }
                        }
                    ]
                }
            ];
        }
    }
    async function baseMessageToContent(message, prevMessage) {
        const type = message._getType();
        switch(type){
            case "system":
                return systemMessageToContent(message);
            case "human":
                return roleMessageToContent("user", message);
            case "ai":
                return roleMessageToContent("model", message);
            case "tool":
                if (!prevMessage) {
                    throw new Error("Tool messages cannot be the first message passed to the model.");
                }
                return toolMessageToContent(message, prevMessage);
            default:
                console.log(`Unsupported message type: ${type}`);
                return [];
        }
    }
    function textPartToMessageContent(part) {
        return {
            type: "text",
            text: part.text
        };
    }
    function inlineDataPartToMessageContent(part) {
        return {
            type: "image_url",
            image_url: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`
        };
    }
    function fileDataPartToMessageContent(part) {
        return {
            type: "image_url",
            image_url: part.fileData.fileUri
        };
    }
    function partsToMessageContent(parts) {
        return parts.map((part)=>{
            if (part === undefined || part === null) {
                return null;
            } else if ("text" in part) {
                return textPartToMessageContent(part);
            } else if ("inlineData" in part) {
                return inlineDataPartToMessageContent(part);
            } else if ("fileData" in part) {
                return fileDataPartToMessageContent(part);
            } else {
                return null;
            }
        }).reduce((acc, content)=>{
            if (content) {
                acc.push(content);
            }
            return acc;
        }, []);
    }
    function toolRawToTool(raw) {
        return {
            id: raw.id,
            type: raw.type,
            function: {
                name: raw.function.name,
                arguments: JSON.stringify(raw.function.arguments)
            }
        };
    }
    function functionCallPartToToolRaw(part) {
        return {
            id: (0, uuid_1.v4)().replace(/-/g, ""),
            type: "function",
            function: {
                name: part.functionCall.name,
                arguments: part.functionCall.args ?? {}
            }
        };
    }
    function partsToToolsRaw(parts) {
        return parts.map((part)=>{
            if (part === undefined || part === null) {
                return null;
            } else if ("functionCall" in part) {
                return functionCallPartToToolRaw(part);
            } else {
                return null;
            }
        }).reduce((acc, content)=>{
            if (content) {
                acc.push(content);
            }
            return acc;
        }, []);
    }
    function toolsRawToTools(raws) {
        return raws.map((raw)=>toolRawToTool(raw));
    }
    function responseToGenerateContentResponseData(response) {
        if ("nextChunk" in response.data) {
            throw new Error("Cannot convert Stream to GenerateContentResponseData");
        } else if (Array.isArray(response.data)) {
            // Collapse the array of response data as if it was a single one
            return response.data.reduce((acc, val)=>{
                // Add all the parts
                // FIXME: Handle other candidates?
                const valParts = val?.candidates?.[0]?.content?.parts ?? [];
                acc.candidates[0].content.parts.push(...valParts);
                // FIXME: Merge promptFeedback and safety settings
                acc.promptFeedback = val.promptFeedback;
                return acc;
            });
        } else {
            return response.data;
        }
    }
    function responseToParts(response) {
        const responseData = responseToGenerateContentResponseData(response);
        const parts = responseData?.candidates?.[0]?.content?.parts ?? [];
        return parts;
    }
    function partToText(part) {
        return "text" in part ? part.text : "";
    }
    function responseToString(response) {
        const parts = responseToParts(response);
        const ret = parts.reduce((acc, part)=>{
            const val = partToText(part);
            return acc + val;
        }, "");
        return ret;
    }
    function safeResponseTo(response, responseTo) {
        const safetyHandler = config?.safetyHandler ?? new DefaultGeminiSafetyHandler();
        try {
            const safeResponse = safetyHandler.handle(response);
            return responseTo(safeResponse);
        } catch (xx) {
            // eslint-disable-next-line no-instanceof/no-instanceof
            if (xx instanceof safety_js_1.GoogleAISafetyError) {
                const ret = responseTo(xx.response);
                xx.reply = ret;
            }
            throw xx;
        }
    }
    function safeResponseToString(response) {
        return safeResponseTo(response, responseToString);
    }
    function logprobResultToLogprob(result) {
        const token = result?.token;
        const logprob = result?.logProbability;
        const encoder = new TextEncoder();
        const bytes = Array.from(encoder.encode(token));
        return {
            token,
            logprob,
            bytes
        };
    }
    function candidateToLogprobs(candidate) {
        const logprobs = candidate?.logprobsResult;
        const chosenTokens = logprobs?.chosenCandidates ?? [];
        const topTokens = logprobs?.topCandidates ?? [];
        const content = [];
        for(let co = 0; co < chosenTokens.length; co += 1){
            const chosen = chosenTokens[co];
            const top = topTokens[co]?.candidates ?? [];
            const logprob = logprobResultToLogprob(chosen);
            logprob.top_logprobs = top.map((l)=>logprobResultToLogprob(l));
            content.push(logprob);
        }
        return {
            content
        };
    }
    function responseToGenerationInfo(response) {
        if (!Array.isArray(response.data)) {
            return {};
        }
        const data = response.data[0];
        return {
            usage_metadata: {
                prompt_token_count: data.usageMetadata?.promptTokenCount,
                candidates_token_count: data.usageMetadata?.candidatesTokenCount,
                total_token_count: data.usageMetadata?.totalTokenCount
            },
            safety_ratings: data.candidates[0]?.safetyRatings?.map((rating)=>({
                    category: rating.category,
                    probability: rating.probability,
                    probability_score: rating.probabilityScore,
                    severity: rating.severity,
                    severity_score: rating.severityScore
                })),
            citation_metadata: data.candidates[0]?.citationMetadata,
            grounding_metadata: data.candidates[0]?.groundingMetadata,
            finish_reason: data.candidates[0]?.finishReason,
            avgLogprobs: data.candidates[0]?.avgLogprobs,
            logprobs: candidateToLogprobs(data.candidates[0])
        };
    }
    function responseToChatGeneration(response) {
        return new outputs_1.ChatGenerationChunk({
            text: responseToString(response),
            message: partToMessageChunk(responseToParts(response)[0]),
            generationInfo: responseToGenerationInfo(response)
        });
    }
    function safeResponseToChatGeneration(response) {
        return safeResponseTo(response, responseToChatGeneration);
    }
    function chunkToString(chunk) {
        if (chunk === null) {
            return "";
        } else if (typeof chunk.content === "string") {
            return chunk.content;
        } else if (chunk.content.length === 0) {
            return "";
        } else if (chunk.content[0].type === "text") {
            return chunk.content[0].text;
        } else {
            throw new Error(`Unexpected chunk: ${chunk}`);
        }
    }
    function partToMessageChunk(part) {
        const fields = partsToBaseMessageChunkFields([
            part
        ]);
        if (typeof fields.content === "string") {
            return new messages_1.AIMessageChunk(fields);
        } else if (fields.content.every((item)=>item.type === "text")) {
            const newContent = fields.content.map((item)=>"text" in item ? item.text : "").join("");
            return new messages_1.AIMessageChunk({
                ...fields,
                content: newContent
            });
        }
        return new messages_1.AIMessageChunk(fields);
    }
    function partToChatGeneration(part) {
        const message = partToMessageChunk(part);
        const text = partToText(part);
        return new outputs_1.ChatGenerationChunk({
            text,
            message
        });
    }
    function groundingSupportByPart(groundingSupports) {
        const ret = [];
        if (!groundingSupports || groundingSupports.length === 0) {
            return [];
        }
        groundingSupports?.forEach((groundingSupport)=>{
            const segment = groundingSupport?.segment;
            const partIndex = segment?.partIndex ?? 0;
            if (ret[partIndex]) {
                ret[partIndex].push(groundingSupport);
            } else {
                ret[partIndex] = [
                    groundingSupport
                ];
            }
        });
        return ret;
    }
    function responseToGroundedChatGenerations(response) {
        const parts = responseToParts(response);
        if (parts.length === 0) {
            return [];
        }
        // Citation and grounding information connected to each part / ChatGeneration
        // to make sure they are available in downstream filters.
        const candidate = response?.data?.candidates?.[0];
        const groundingMetadata = candidate?.groundingMetadata;
        const citationMetadata = candidate?.citationMetadata;
        const groundingParts = groundingSupportByPart(groundingMetadata?.groundingSupports);
        const ret = parts.map((part, index)=>{
            const gen = partToChatGeneration(part);
            if (!gen.generationInfo) {
                gen.generationInfo = {};
            }
            if (groundingMetadata) {
                gen.generationInfo.groundingMetadata = groundingMetadata;
                const groundingPart = groundingParts[index];
                if (groundingPart) {
                    gen.generationInfo.groundingSupport = groundingPart;
                }
            }
            if (citationMetadata) {
                gen.generationInfo.citationMetadata = citationMetadata;
            }
            return gen;
        });
        return ret;
    }
    function responseToChatGenerations(response) {
        let ret = responseToGroundedChatGenerations(response);
        if (ret.length === 0) {
            return [];
        }
        if (ret.every((item)=>typeof item.message.content === "string")) {
            const combinedContent = ret.map((item)=>item.message.content).join("");
            const combinedText = ret.map((item)=>item.text).join("");
            const toolCallChunks = ret[ret.length - 1]?.message.additional_kwargs?.tool_calls?.map((toolCall, i)=>({
                    name: toolCall.function.name,
                    args: toolCall.function.arguments,
                    id: toolCall.id,
                    index: i,
                    type: "tool_call_chunk"
                }));
            let usageMetadata;
            if ("usageMetadata" in response.data) {
                usageMetadata = {
                    input_tokens: response.data.usageMetadata.promptTokenCount,
                    output_tokens: response.data.usageMetadata.candidatesTokenCount,
                    total_tokens: response.data.usageMetadata.totalTokenCount
                };
            }
            ret = [
                new outputs_1.ChatGenerationChunk({
                    message: new messages_1.AIMessageChunk({
                        content: combinedContent,
                        additional_kwargs: ret[ret.length - 1]?.message.additional_kwargs,
                        tool_call_chunks: toolCallChunks,
                        usage_metadata: usageMetadata
                    }),
                    text: combinedText,
                    generationInfo: ret[ret.length - 1].generationInfo
                })
            ];
        }
        // Add logprobs information to the message
        const candidate = response?.data?.candidates?.[0];
        const avgLogprobs = candidate?.avgLogprobs;
        const logprobs = candidateToLogprobs(candidate);
        if ("TURBOPACK compile-time truthy", 1) {
            ret[0].message.response_metadata = {
                ...ret[0].message.response_metadata,
                logprobs,
                avgLogprobs
            };
        }
        return ret;
    }
    function responseToBaseMessageFields(response) {
        const parts = responseToParts(response);
        return partsToBaseMessageChunkFields(parts);
    }
    function partsToBaseMessageChunkFields(parts) {
        const fields = {
            content: partsToMessageContent(parts),
            tool_call_chunks: [],
            tool_calls: [],
            invalid_tool_calls: []
        };
        const rawTools = partsToToolsRaw(parts);
        if (rawTools.length > 0) {
            const tools = toolsRawToTools(rawTools);
            for (const tool of tools){
                fields.tool_call_chunks?.push({
                    name: tool.function.name,
                    args: tool.function.arguments,
                    id: tool.id,
                    type: "tool_call_chunk"
                });
                try {
                    fields.tool_calls?.push({
                        name: tool.function.name,
                        args: JSON.parse(tool.function.arguments),
                        id: tool.id
                    });
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (e) {
                    fields.invalid_tool_calls?.push({
                        name: tool.function.name,
                        args: tool.function.arguments,
                        id: tool.id,
                        error: e.message,
                        type: "invalid_tool_call"
                    });
                }
            }
            fields.additional_kwargs = {
                tool_calls: tools
            };
        }
        return fields;
    }
    function responseToBaseMessage(response) {
        const fields = responseToBaseMessageFields(response);
        return new messages_1.AIMessage(fields);
    }
    function safeResponseToBaseMessage(response) {
        return safeResponseTo(response, responseToBaseMessage);
    }
    function responseToChatResult(response) {
        const generations = responseToChatGenerations(response);
        return {
            generations,
            llmOutput: responseToGenerationInfo(response)
        };
    }
    function safeResponseToChatResult(response) {
        return safeResponseTo(response, responseToChatResult);
    }
    function inputType(input) {
        if (typeof input === "string") {
            return "MessageContent";
        } else {
            const firstItem = input[0];
            if (Object.hasOwn(firstItem, "content")) {
                return "BaseMessageArray";
            } else {
                return "MessageContent";
            }
        }
    }
    async function formatMessageContents(input, _parameters) {
        const parts = await messageContentToParts(input);
        const contents = [
            {
                role: "user",
                parts
            }
        ];
        return contents;
    }
    async function formatBaseMessageContents(input, _parameters) {
        const inputPromises = input.map((msg, i)=>baseMessageToContent(msg, input[i - 1]));
        const inputs = await Promise.all(inputPromises);
        return inputs.reduce((acc, cur)=>{
            // Filter out the system content
            if (cur.every((content)=>content.role === "system")) {
                return acc;
            }
            // Combine adjacent function messages
            if (cur[0]?.role === "function" && acc.length > 0 && acc[acc.length - 1].role === "function") {
                acc[acc.length - 1].parts = [
                    ...acc[acc.length - 1].parts,
                    ...cur[0].parts
                ];
            } else {
                acc.push(...cur);
            }
            return acc;
        }, []);
    }
    async function formatContents(input, parameters) {
        const it = inputType(input);
        switch(it){
            case "MessageContent":
                return formatMessageContents(input, parameters);
            case "BaseMessageArray":
                return formatBaseMessageContents(input, parameters);
            default:
                throw new Error(`Unknown input type "${it}": ${input}`);
        }
    }
    function formatGenerationConfig(parameters) {
        const ret = {
            temperature: parameters.temperature,
            topK: parameters.topK,
            topP: parameters.topP,
            presencePenalty: parameters.presencePenalty,
            frequencyPenalty: parameters.frequencyPenalty,
            maxOutputTokens: parameters.maxOutputTokens,
            stopSequences: parameters.stopSequences,
            responseMimeType: parameters.responseMimeType
        };
        // Add the logprobs if explicitly set
        if (typeof parameters.logprobs !== "undefined") {
            ret.responseLogprobs = parameters.logprobs;
            if (parameters.logprobs && typeof parameters.topLogprobs !== "undefined") {
                ret.logprobs = parameters.topLogprobs;
            }
        }
        return ret;
    }
    function formatSafetySettings(parameters) {
        return parameters.safetySettings ?? [];
    }
    async function formatBaseMessageSystemInstruction(input) {
        let ret = {};
        for(let index = 0; index < input.length; index += 1){
            const message = input[index];
            if (message._getType() === "system") {
                // For system types, we only want it if it is the first message,
                // if it appears anywhere else, it should be an error.
                if (index === 0) {
                    // eslint-disable-next-line prefer-destructuring
                    ret = (await baseMessageToContent(message, undefined))[0];
                } else {
                    throw new Error("System messages are only permitted as the first passed message.");
                }
            }
        }
        return ret;
    }
    async function formatSystemInstruction(input) {
        if (!config?.useSystemInstruction) {
            return {};
        }
        const it = inputType(input);
        switch(it){
            case "BaseMessageArray":
                return formatBaseMessageSystemInstruction(input);
            default:
                return {};
        }
    }
    function structuredToolToFunctionDeclaration(tool) {
        const jsonSchema = (0, zod_to_gemini_parameters_js_1.zodToGeminiParameters)(tool.schema);
        return {
            name: tool.name,
            description: tool.description ?? `A function available to call.`,
            parameters: jsonSchema
        };
    }
    function searchToolName(tool) {
        for (const name of types_js_1.GeminiSearchToolAttributes){
            if (name in tool) {
                return name;
            }
        }
        return undefined;
    }
    function cleanGeminiTool(tool) {
        const orig = searchToolName(tool);
        const adj = config?.googleSearchToolAdjustment;
        if (orig && adj && adj !== orig) {
            return {
                [adj]: {}
            };
        } else {
            return tool;
        }
    }
    function formatTools(parameters) {
        const tools = parameters?.tools;
        if (!tools || tools.length === 0) {
            return [];
        }
        // Group all LangChain tools into a single functionDeclarations array.
        // Gemini Tools may be normalized to different tool names
        const langChainTools = [];
        const otherTools = [];
        tools.forEach((tool)=>{
            if ((0, function_calling_1.isLangChainTool)(tool)) {
                langChainTools.push(tool);
            } else {
                otherTools.push(cleanGeminiTool(tool));
            }
        });
        const result = [
            ...otherTools
        ];
        if (langChainTools.length > 0) {
            result.push({
                functionDeclarations: langChainTools.map(structuredToolToFunctionDeclaration)
            });
        }
        return result;
    }
    function formatToolConfig(parameters) {
        if (!parameters.tool_choice || typeof parameters.tool_choice !== "string") {
            return undefined;
        }
        if ([
            "auto",
            "any",
            "none"
        ].includes(parameters.tool_choice)) {
            return {
                functionCallingConfig: {
                    mode: parameters.tool_choice,
                    allowedFunctionNames: parameters.allowed_function_names
                }
            };
        }
        // force tool choice to be a single function name in case of structured output
        return {
            functionCallingConfig: {
                mode: "any",
                allowedFunctionNames: [
                    parameters.tool_choice
                ]
            }
        };
    }
    async function formatData(input, parameters) {
        const typedInput = input;
        const contents = await formatContents(typedInput, parameters);
        const generationConfig = formatGenerationConfig(parameters);
        const tools = formatTools(parameters);
        const toolConfig = formatToolConfig(parameters);
        const safetySettings = formatSafetySettings(parameters);
        const systemInstruction = await formatSystemInstruction(typedInput);
        const ret = {
            contents,
            generationConfig
        };
        if (tools && tools.length) {
            ret.tools = tools;
        }
        if (toolConfig) {
            ret.toolConfig = toolConfig;
        }
        if (safetySettings && safetySettings.length) {
            ret.safetySettings = safetySettings;
        }
        if (systemInstruction?.role && systemInstruction?.parts && systemInstruction?.parts?.length) {
            ret.systemInstruction = systemInstruction;
        }
        return ret;
    }
    return {
        messageContentToParts,
        baseMessageToContent,
        responseToString: safeResponseToString,
        responseToChatGeneration: safeResponseToChatGeneration,
        chunkToString,
        responseToBaseMessage: safeResponseToBaseMessage,
        responseToChatResult: safeResponseToChatResult,
        formatData
    };
}
exports.getGeminiAPI = getGeminiAPI;
function validateGeminiParams(params) {
    if (params.maxOutputTokens && params.maxOutputTokens < 0) {
        throw new Error("`maxOutputTokens` must be a positive integer");
    }
    if (params.temperature && (params.temperature < 0 || params.temperature > 2)) {
        throw new Error("`temperature` must be in the range of [0.0,2.0]");
    }
    if (params.topP && (params.topP < 0 || params.topP > 1)) {
        throw new Error("`topP` must be in the range of [0.0,1.0]");
    }
    if (params.topK && params.topK < 0) {
        throw new Error("`topK` must be a positive integer");
    }
}
exports.validateGeminiParams = validateGeminiParams;
function isModelGemini(modelName) {
    return modelName.toLowerCase().startsWith("gemini");
}
exports.isModelGemini = isModelGemini;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/anthropic.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isModelClaude = exports.validateClaudeParams = exports.getAnthropicAPI = void 0;
const outputs_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/outputs.cjs [app-route] (ecmascript)");
const messages_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/messages.cjs [app-route] (ecmascript)");
function getAnthropicAPI(config) {
    function partToString(part) {
        return "text" in part ? part.text : "";
    }
    function messageToString(message) {
        const content = message?.content ?? [];
        const ret = content.reduce((acc, part)=>{
            const str = partToString(part);
            return acc + str;
        }, "");
        return ret;
    }
    function responseToString(response) {
        const data = response.data;
        switch(data?.type){
            case "message":
                return messageToString(data);
            default:
                throw Error(`Unknown type: ${data?.type}`);
        }
    }
    /**
     * Normalize the AIMessageChunk.
     * If the fields are just a string - use that as content.
     * If the content is an array of just text fields, turn them into a string.
     * @param fields
     */ function newAIMessageChunk(fields) {
        if (typeof fields === "string") {
            return new messages_1.AIMessageChunk(fields);
        }
        const ret = {
            ...fields
        };
        if (Array.isArray(fields?.content)) {
            let str = "";
            fields.content.forEach((val)=>{
                if (str !== undefined && val.type === "text") {
                    str = `${str}${val.text}`;
                } else {
                    str = undefined;
                }
            });
            if (str) {
                ret.content = str;
            }
        }
        return new messages_1.AIMessageChunk(ret);
    }
    function textContentToMessageFields(textContent) {
        return {
            content: [
                textContent
            ]
        };
    }
    function toolUseContentToMessageFields(toolUseContent) {
        const tool = {
            id: toolUseContent.id,
            name: toolUseContent.name,
            type: "tool_call",
            args: toolUseContent.input
        };
        return {
            content: [],
            tool_calls: [
                tool
            ]
        };
    }
    function anthropicContentToMessageFields(anthropicContent) {
        const type = anthropicContent?.type;
        switch(type){
            case "text":
                return textContentToMessageFields(anthropicContent);
            case "tool_use":
                return toolUseContentToMessageFields(anthropicContent);
            default:
                return undefined;
        }
    }
    function contentToMessage(anthropicContent) {
        const complexContent = [];
        const toolCalls = [];
        anthropicContent.forEach((ac)=>{
            const messageFields = anthropicContentToMessageFields(ac);
            if (messageFields?.content) {
                complexContent.push(...messageFields.content);
            }
            if (messageFields?.tool_calls) {
                toolCalls.push(...messageFields.tool_calls);
            }
        });
        const ret = {
            content: complexContent,
            tool_calls: toolCalls
        };
        return newAIMessageChunk(ret);
    }
    function messageToGenerationInfo(message) {
        const usage = message?.usage;
        const usageMetadata = {
            input_tokens: usage?.input_tokens ?? 0,
            output_tokens: usage?.output_tokens ?? 0,
            total_tokens: (usage?.input_tokens ?? 0) + (usage?.output_tokens ?? 0)
        };
        return {
            usage_metadata: usageMetadata,
            finish_reason: message.stop_reason
        };
    }
    function messageToChatGeneration(responseMessage) {
        const content = responseMessage?.content ?? [];
        const text = messageToString(responseMessage);
        const message = contentToMessage(content);
        const generationInfo = messageToGenerationInfo(responseMessage);
        return new outputs_1.ChatGenerationChunk({
            text,
            message,
            generationInfo
        });
    }
    function messageStartToChatGeneration(event) {
        const responseMessage = event.message;
        return messageToChatGeneration(responseMessage);
    }
    function messageDeltaToChatGeneration(event) {
        const responseMessage = event.delta;
        return messageToChatGeneration(responseMessage);
    }
    function contentBlockStartTextToChatGeneration(event) {
        const content = event.content_block;
        const message = contentToMessage([
            content
        ]);
        if (!message) {
            return null;
        }
        const text = "text" in content ? content.text : "";
        return new outputs_1.ChatGenerationChunk({
            message,
            text
        });
    }
    function contentBlockStartToolUseToChatGeneration(event) {
        const contentBlock = event.content_block;
        const text = "";
        const toolChunk = {
            type: "tool_call_chunk",
            index: event.index,
            name: contentBlock.name,
            id: contentBlock.id
        };
        if (typeof contentBlock.input === "object" && Object.keys(contentBlock.input).length > 0) {
            toolChunk.args = JSON.stringify(contentBlock.input);
        }
        const toolChunks = [
            toolChunk
        ];
        const content = [
            {
                index: event.index,
                ...contentBlock
            }
        ];
        const messageFields = {
            content,
            tool_call_chunks: toolChunks
        };
        const message = newAIMessageChunk(messageFields);
        return new outputs_1.ChatGenerationChunk({
            message,
            text
        });
    }
    function contentBlockStartToChatGeneration(event) {
        switch(event.content_block.type){
            case "text":
                return contentBlockStartTextToChatGeneration(event);
            case "tool_use":
                return contentBlockStartToolUseToChatGeneration(event);
            default:
                console.warn(`Unexpected start content_block type: ${JSON.stringify(event)}`);
                return null;
        }
    }
    function contentBlockDeltaTextToChatGeneration(event) {
        const delta = event.delta;
        const text = delta?.text;
        const message = newAIMessageChunk(text);
        return new outputs_1.ChatGenerationChunk({
            message,
            text
        });
    }
    function contentBlockDeltaInputJsonDeltaToChatGeneration(event) {
        const delta = event.delta;
        const text = "";
        const toolChunks = [
            {
                index: event.index,
                args: delta.partial_json
            }
        ];
        const content = [
            {
                index: event.index,
                ...delta
            }
        ];
        const messageFields = {
            content,
            tool_call_chunks: toolChunks
        };
        const message = newAIMessageChunk(messageFields);
        return new outputs_1.ChatGenerationChunk({
            message,
            text
        });
    }
    function contentBlockDeltaToChatGeneration(event) {
        switch(event.delta.type){
            case "text_delta":
                return contentBlockDeltaTextToChatGeneration(event);
            case "input_json_delta":
                return contentBlockDeltaInputJsonDeltaToChatGeneration(event);
            default:
                console.warn(`Unexpected delta content_block type: ${JSON.stringify(event)}`);
                return null;
        }
    }
    function responseToChatGeneration(response) {
        const data = response.data;
        switch(data.type){
            case "message":
                return messageToChatGeneration(data);
            case "message_start":
                return messageStartToChatGeneration(data);
            case "message_delta":
                return messageDeltaToChatGeneration(data);
            case "content_block_start":
                return contentBlockStartToChatGeneration(data);
            case "content_block_delta":
                return contentBlockDeltaToChatGeneration(data);
            case "ping":
            case "message_stop":
            case "content_block_stop":
                // These are ignorable
                return null;
            case "error":
                throw new Error(`Error while streaming results: ${JSON.stringify(data)}`);
            default:
                // We don't know what type this is, but Anthropic may have added
                // new ones without telling us. Don't error, but don't use them.
                console.warn("Unknown data for responseToChatGeneration", data);
                // throw new Error(`Unknown response type: ${data.type}`);
                return null;
        }
    }
    function chunkToString(chunk) {
        if (chunk === null) {
            return "";
        } else if (typeof chunk.content === "string") {
            return chunk.content;
        } else if (chunk.content.length === 0) {
            return "";
        } else if (chunk.content[0].type === "text") {
            return chunk.content[0].text;
        } else {
            throw new Error(`Unexpected chunk: ${chunk}`);
        }
    }
    function responseToBaseMessage(response) {
        const data = response.data;
        const content = data?.content ?? [];
        return contentToMessage(content);
    }
    function responseToChatResult(response) {
        const message = response.data;
        const generations = [];
        const gen = responseToChatGeneration(response);
        if (gen) {
            generations.push(gen);
        }
        const llmOutput = messageToGenerationInfo(message);
        return {
            generations,
            llmOutput
        };
    }
    function formatAnthropicVersion() {
        return config?.version ?? "vertex-2023-10-16";
    }
    function textContentToAnthropicContent(content) {
        return content;
    }
    function extractMimeType(str) {
        if (str.startsWith("data:")) {
            return {
                media_type: str.split(":")[1].split(";")[0],
                data: str.split(",")[1]
            };
        }
        return null;
    }
    function imageContentToAnthropicContent(content) {
        const dataUrl = content.image_url;
        const url = typeof dataUrl === "string" ? dataUrl : dataUrl?.url;
        const urlInfo = extractMimeType(url);
        if (!urlInfo) {
            return undefined;
        }
        return {
            type: "image",
            source: {
                type: "base64",
                ...urlInfo
            }
        };
    }
    function contentComplexToAnthropicContent(content) {
        const type = content?.type;
        switch(type){
            case "text":
                return textContentToAnthropicContent(content);
            case "image_url":
                return imageContentToAnthropicContent(content);
            default:
                console.warn(`Unexpected content type: ${type}`);
                return undefined;
        }
    }
    function contentToAnthropicContent(content) {
        const ret = [];
        const ca = typeof content === "string" ? [
            {
                type: "text",
                text: content
            }
        ] : content;
        ca.forEach((complex)=>{
            const ac = contentComplexToAnthropicContent(complex);
            if (ac) {
                ret.push(ac);
            }
        });
        return ret;
    }
    function baseRoleToAnthropicMessage(base, role) {
        const content = contentToAnthropicContent(base.content);
        return {
            role,
            content
        };
    }
    function toolMessageToAnthropicMessage(base) {
        const role = "user";
        const toolUseId = base.tool_call_id;
        const toolContent = contentToAnthropicContent(base.content);
        const content = [
            {
                type: "tool_result",
                tool_use_id: toolUseId,
                content: toolContent
            }
        ];
        return {
            role,
            content
        };
    }
    function baseToAnthropicMessage(base) {
        const type = base._getType();
        switch(type){
            case "human":
                return baseRoleToAnthropicMessage(base, "user");
            case "ai":
                return baseRoleToAnthropicMessage(base, "assistant");
            case "tool":
                return toolMessageToAnthropicMessage(base);
            default:
                return undefined;
        }
    }
    function formatMessages(input) {
        const ret = [];
        input.forEach((baseMessage)=>{
            const anthropicMessage = baseToAnthropicMessage(baseMessage);
            if (anthropicMessage) {
                ret.push(anthropicMessage);
            }
        });
        return ret;
    }
    function formatSettings(parameters) {
        const ret = {
            stream: parameters?.streaming ?? false,
            max_tokens: parameters?.maxOutputTokens ?? 8192
        };
        if (parameters.topP) {
            ret.top_p = parameters.topP;
        }
        if (parameters.topK) {
            ret.top_k = parameters.topK;
        }
        if (parameters.temperature) {
            ret.temperature = parameters.temperature;
        }
        if (parameters.stopSequences) {
            ret.stop_sequences = parameters.stopSequences;
        }
        return ret;
    }
    function contentComplexArrayToText(contentArray) {
        let ret = "";
        contentArray.forEach((content)=>{
            const contentType = content?.type;
            if (contentType === "text") {
                const textContent = content;
                ret = `${ret}\n${textContent.text}`;
            }
        });
        return ret;
    }
    function formatSystem(input) {
        let ret = "";
        input.forEach((message)=>{
            if (message._getType() === "system") {
                const content = message?.content;
                const contentString = typeof content === "string" ? content : contentComplexArrayToText(content);
                ret = `${ret}\n${contentString}`;
            }
        });
        return ret;
    }
    function formatGeminiTool(tool) {
        if (Object.hasOwn(tool, "functionDeclarations")) {
            const funcs = tool?.functionDeclarations ?? [];
            return funcs.map((func)=>{
                const inputSchema = func.parameters;
                return {
                    // type: "tool",  // This may only be valid for models 20241022+
                    name: func.name,
                    description: func.description,
                    input_schema: inputSchema
                };
            });
        } else {
            console.warn(`Unable to format GeminiTool: ${JSON.stringify(tool, null, 1)}`);
            return [];
        }
    }
    function formatTool(tool) {
        if (Object.hasOwn(tool, "name")) {
            return [
                tool
            ];
        } else {
            return formatGeminiTool(tool);
        }
    }
    function formatTools(parameters) {
        const tools = parameters?.tools ?? [];
        const ret = [];
        tools.forEach((tool)=>{
            const anthropicTools = formatTool(tool);
            anthropicTools.forEach((anthropicTool)=>{
                if (anthropicTool) {
                    ret.push(anthropicTool);
                }
            });
        });
        return ret;
    }
    function formatToolChoice(parameters) {
        const choice = parameters?.tool_choice;
        if (!choice) {
            return undefined;
        } else if (typeof choice === "object") {
            return choice;
        } else {
            switch(choice){
                case "any":
                case "auto":
                    return {
                        type: choice
                    };
                case "none":
                    return undefined;
                default:
                    return {
                        type: "tool",
                        name: choice
                    };
            }
        }
    }
    async function formatData(input, parameters) {
        const typedInput = input;
        const anthropicVersion = formatAnthropicVersion();
        const messages = formatMessages(typedInput);
        const settings = formatSettings(parameters);
        const system = formatSystem(typedInput);
        const tools = formatTools(parameters);
        const toolChoice = formatToolChoice(parameters);
        const ret = {
            anthropic_version: anthropicVersion,
            messages,
            ...settings
        };
        if (tools && tools.length && parameters?.tool_choice !== "none") {
            ret.tools = tools;
        }
        if (toolChoice) {
            ret.tool_choice = toolChoice;
        }
        if (system?.length) {
            ret.system = system;
        }
        return ret;
    }
    return {
        responseToString,
        responseToChatGeneration,
        chunkToString,
        responseToBaseMessage,
        responseToChatResult,
        formatData
    };
}
exports.getAnthropicAPI = getAnthropicAPI;
function validateClaudeParams(_params) {
// FIXME - validate the parameters
}
exports.validateClaudeParams = validateClaudeParams;
function isModelClaude(modelName) {
    return modelName.toLowerCase().startsWith("claude");
}
exports.isModelClaude = isModelClaude;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/common.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.copyAndValidateModelParamsInto = exports.validateModelParams = exports.modelToPublisher = exports.modelToFamily = exports.copyAIModelParamsInto = exports.convertToGeminiTools = exports.copyAIModelParams = void 0;
const base_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/language_models/base.cjs [app-route] (ecmascript)");
const function_calling_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/utils/function_calling.cjs [app-route] (ecmascript)");
const gemini_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/gemini.cjs [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/types.cjs [app-route] (ecmascript)");
const zod_to_gemini_parameters_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/zod_to_gemini_parameters.cjs [app-route] (ecmascript)");
const anthropic_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/anthropic.cjs [app-route] (ecmascript)");
function copyAIModelParams(params, options) {
    return copyAIModelParamsInto(params, options, {});
}
exports.copyAIModelParams = copyAIModelParams;
function processToolChoice(toolChoice, allowedFunctionNames) {
    if (!toolChoice) {
        if (allowedFunctionNames) {
            // Allowed func names is passed, return 'any' so it forces the model to use a tool.
            return {
                tool_choice: "any",
                allowed_function_names: allowedFunctionNames
            };
        }
        return undefined;
    }
    if (toolChoice === "any" || toolChoice === "auto" || toolChoice === "none") {
        return {
            tool_choice: toolChoice,
            allowed_function_names: allowedFunctionNames
        };
    }
    if (typeof toolChoice === "string") {
        // String representing the function name.
        // Return any to force the model to predict the specified function call.
        return {
            tool_choice: "any",
            allowed_function_names: [
                ...allowedFunctionNames ?? [],
                toolChoice
            ]
        };
    }
    throw new Error("Object inputs for tool_choice not supported.");
}
function isGeminiTool(tool) {
    for (const toolAttribute of types_js_1.GeminiToolAttributes){
        if (toolAttribute in tool) {
            return true;
        }
    }
    return false;
}
function isGeminiNonFunctionTool(tool) {
    return isGeminiTool(tool) && !("functionDeclaration" in tool);
}
function convertToGeminiTools(tools) {
    const geminiTools = [];
    let functionDeclarationsIndex = -1;
    tools.forEach((tool)=>{
        if (isGeminiNonFunctionTool(tool)) {
            geminiTools.push(tool);
        } else {
            if (functionDeclarationsIndex === -1) {
                geminiTools.push({
                    functionDeclarations: []
                });
                functionDeclarationsIndex = geminiTools.length - 1;
            }
            if ("functionDeclarations" in tool && Array.isArray(tool.functionDeclarations)) {
                const funcs = tool.functionDeclarations;
                geminiTools[functionDeclarationsIndex].functionDeclarations.push(...funcs);
            } else if ((0, function_calling_1.isLangChainTool)(tool)) {
                const jsonSchema = (0, zod_to_gemini_parameters_js_1.zodToGeminiParameters)(tool.schema);
                geminiTools[functionDeclarationsIndex].functionDeclarations.push({
                    name: tool.name,
                    description: tool.description ?? `A function available to call.`,
                    parameters: jsonSchema
                });
            } else if ((0, base_1.isOpenAITool)(tool)) {
                geminiTools[functionDeclarationsIndex].functionDeclarations.push({
                    name: tool.function.name,
                    description: tool.function.description ?? `A function available to call.`,
                    parameters: (0, zod_to_gemini_parameters_js_1.jsonSchemaToGeminiParameters)(tool.function.parameters)
                });
            } else {
                throw new Error(`Received invalid tool: ${JSON.stringify(tool)}`);
            }
        }
    });
    return geminiTools;
}
exports.convertToGeminiTools = convertToGeminiTools;
function copyAIModelParamsInto(params, options, target) {
    const ret = target || {};
    const model = options?.model ?? params?.model ?? target.model;
    ret.modelName = model ?? options?.modelName ?? params?.modelName ?? target.modelName;
    ret.model = model;
    ret.temperature = options?.temperature ?? params?.temperature ?? target.temperature;
    ret.maxOutputTokens = options?.maxOutputTokens ?? params?.maxOutputTokens ?? target.maxOutputTokens;
    ret.topP = options?.topP ?? params?.topP ?? target.topP;
    ret.topK = options?.topK ?? params?.topK ?? target.topK;
    ret.presencePenalty = options?.presencePenalty ?? params?.presencePenalty ?? target.presencePenalty;
    ret.frequencyPenalty = options?.frequencyPenalty ?? params?.frequencyPenalty ?? target.frequencyPenalty;
    ret.stopSequences = options?.stopSequences ?? params?.stopSequences ?? target.stopSequences;
    ret.safetySettings = options?.safetySettings ?? params?.safetySettings ?? target.safetySettings;
    ret.logprobs = options?.logprobs ?? params?.logprobs ?? target.logprobs;
    ret.topLogprobs = options?.topLogprobs ?? params?.topLogprobs ?? target.topLogprobs;
    ret.convertSystemMessageToHumanContent = options?.convertSystemMessageToHumanContent ?? params?.convertSystemMessageToHumanContent ?? target?.convertSystemMessageToHumanContent;
    ret.responseMimeType = options?.responseMimeType ?? params?.responseMimeType ?? target?.responseMimeType;
    ret.streaming = options?.streaming ?? params?.streaming ?? target?.streaming;
    const toolChoice = processToolChoice(options?.tool_choice, options?.allowed_function_names);
    if (toolChoice) {
        ret.tool_choice = toolChoice.tool_choice;
        ret.allowed_function_names = toolChoice.allowed_function_names;
    }
    const tools = options?.tools;
    if (tools) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ret.tools = convertToGeminiTools(tools);
    }
    return ret;
}
exports.copyAIModelParamsInto = copyAIModelParamsInto;
function modelToFamily(modelName) {
    if (!modelName) {
        return null;
    } else if ((0, gemini_js_1.isModelGemini)(modelName)) {
        return "gemini";
    } else if ((0, anthropic_js_1.isModelClaude)(modelName)) {
        return "claude";
    } else {
        return null;
    }
}
exports.modelToFamily = modelToFamily;
function modelToPublisher(modelName) {
    const family = modelToFamily(modelName);
    switch(family){
        case "gemini":
        case "palm":
            return "google";
        case "claude":
            return "anthropic";
        default:
            return "unknown";
    }
}
exports.modelToPublisher = modelToPublisher;
function validateModelParams(params) {
    const testParams = params ?? {};
    const model = testParams.model ?? testParams.modelName;
    switch(modelToFamily(model)){
        case "gemini":
            return (0, gemini_js_1.validateGeminiParams)(testParams);
        case "claude":
            return (0, anthropic_js_1.validateClaudeParams)(testParams);
        default:
            throw new Error(`Unable to verify model params: ${JSON.stringify(params)}`);
    }
}
exports.validateModelParams = validateModelParams;
function copyAndValidateModelParamsInto(params, target) {
    copyAIModelParamsInto(params, undefined, target);
    validateModelParams(target);
    return target;
}
exports.copyAndValidateModelParamsInto = copyAndValidateModelParamsInto;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/failed_handler.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ensureParams = exports.failedAttemptHandler = void 0;
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
    409
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function failedAttemptHandler(error) {
    const status = error?.response?.status ?? 0;
    if (status === 0) {
        // What is this?
        console.error("failedAttemptHandler", error);
        throw error;
    }
    // What errors shouldn't be retried?
    if (STATUS_NO_RETRY.includes(+status)) {
        throw error;
    }
}
exports.failedAttemptHandler = failedAttemptHandler;
function ensureParams(params) {
    const base = params ?? {};
    return {
        onFailedAttempt: failedAttemptHandler,
        ...base
    };
}
exports.ensureParams = ensureParams;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/palm.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/stream.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReadableSseJsonStream = exports.SseJsonStream = exports.ReadableSseStream = exports.SseStream = exports.ReadableJsonStream = exports.ReadableAbstractStream = exports.ComplexJsonStream = exports.JsonStream = exports.simpleValue = exports.complexValue = void 0;
function complexValue(value) {
    if (value === null || typeof value === "undefined") {
        // I dunno what to put here. An error, probably
        return undefined;
    } else if (typeof value === "object") {
        if (Array.isArray(value)) {
            return {
                list_val: value.map((avalue)=>complexValue(avalue))
            };
        } else {
            const ret = {};
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const v = value;
            Object.keys(v).forEach((key)=>{
                ret[key] = complexValue(v[key]);
            });
            return {
                struct_val: ret
            };
        }
    } else if (typeof value === "number") {
        if (Number.isInteger(value)) {
            return {
                int_val: value
            };
        } else {
            return {
                float_val: value
            };
        }
    } else {
        return {
            string_val: [
                value
            ]
        };
    }
}
exports.complexValue = complexValue;
function simpleValue(val) {
    if (val && typeof val === "object" && !Array.isArray(val)) {
        // eslint-disable-next-line no-prototype-builtins
        if (val.hasOwnProperty("stringVal")) {
            return val.stringVal[0];
        // eslint-disable-next-line no-prototype-builtins
        } else if (val.hasOwnProperty("boolVal")) {
            return val.boolVal[0];
        // eslint-disable-next-line no-prototype-builtins
        } else if (val.hasOwnProperty("listVal")) {
            const { listVal } = val;
            return listVal.map((aval)=>simpleValue(aval));
        // eslint-disable-next-line no-prototype-builtins
        } else if (val.hasOwnProperty("structVal")) {
            const ret = {};
            const struct = val.structVal;
            Object.keys(struct).forEach((key)=>{
                ret[key] = simpleValue(struct[key]);
            });
            return ret;
        } else {
            const ret = {};
            const struct = val;
            Object.keys(struct).forEach((key)=>{
                ret[key] = simpleValue(struct[key]);
            });
            return ret;
        }
    } else if (Array.isArray(val)) {
        return val.map((aval)=>simpleValue(aval));
    } else {
        return val;
    }
}
exports.simpleValue = simpleValue;
class JsonStream {
    constructor(){
        Object.defineProperty(this, "_buffer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "_bufferOpen", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "_firstRun", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        // Set up a potential Promise that the handler can resolve.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "_chunkResolution", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // If there is no Promise (it is null), the handler must add it to the queue
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "_chunkPending", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        // A queue that will collect chunks while there is no Promise
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "_chunkQueue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    /**
     * Add data to the buffer. This may cause chunks to be generated, if available.
     * @param data
     */ appendBuffer(data) {
        this._buffer += data;
        // Our first time, skip to the opening of the array
        if (this._firstRun) {
            this._skipTo("[");
            this._firstRun = false;
        }
        this._parseBuffer();
    }
    /**
     * Indicate there is no more data that will be added to the text buffer.
     * This should be called when all the data has been read and added to indicate
     * that we should process everything remaining in the buffer.
     */ closeBuffer() {
        this._bufferOpen = false;
        this._parseBuffer();
    }
    /**
     * Skip characters in the buffer till we get to the start of an object.
     * Then attempt to read a full object.
     * If we do read a full object, turn it into a chunk and send it to the chunk handler.
     * Repeat this for as much as we can.
     */ _parseBuffer() {
        let obj = null;
        do {
            this._skipTo("{");
            obj = this._getFullObject();
            if (obj !== null) {
                const chunk = this._simplifyObject(obj);
                this._handleChunk(chunk);
            }
        }while (obj !== null)
        if (!this._bufferOpen) {
            // No more data will be added, and we have parsed everything we could,
            // so everything else is garbage.
            this._handleChunk(null);
            this._buffer = "";
        }
    }
    /**
     * If the string is present, move the start of the buffer to the first occurrence
     * of that string. This is useful for skipping over elements or parts that we're not
     * really interested in parsing. (ie - the opening characters, comma separators, etc.)
     * @param start The string to start the buffer with
     */ _skipTo(start) {
        const index = this._buffer.indexOf(start);
        if (index > 0) {
            this._buffer = this._buffer.slice(index);
        }
    }
    /**
     * Given what is in the buffer, parse a single object out of it.
     * If a complete object isn't available, return null.
     * Assumes that we are at the start of an object to parse.
     */ _getFullObject() {
        let ret = null;
        // Loop while we don't have something to return AND we have something in the buffer
        let index = 0;
        while(ret === null && this._buffer.length > index){
            // Advance to the next close bracket after our current index
            index = this._buffer.indexOf("}", index + 1);
            // If we don't find one, exit with null
            if (index === -1) {
                return null;
            }
            // If we have one, try to turn it into an object to return
            try {
                const objStr = this._buffer.substring(0, index + 1);
                ret = JSON.parse(objStr);
                // We only get here if it parsed it ok
                // If we did turn it into an object, remove it from the buffer
                this._buffer = this._buffer.slice(index + 1);
            } catch (xx) {
            // It didn't parse it correctly, so we swallow the exception and continue
            }
        }
        return ret;
    }
    _simplifyObject(obj) {
        return obj;
    }
    /**
     * Register that we have another chunk available for consumption.
     * If we are waiting for a chunk, resolve the promise waiting for it immediately.
     * If not, then add it to the queue.
     * @param chunk
     */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _handleChunk(chunk) {
        if (this._chunkPending) {
            this._chunkResolution(chunk);
            this._chunkPending = null;
        } else {
            this._chunkQueue.push(chunk);
        }
    }
    /**
     * Get the next chunk that is coming from the stream.
     * This chunk may be null, usually indicating the last chunk in the stream.
     */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async nextChunk() {
        if (this._chunkQueue.length > 0) {
            // If there is data in the queue, return the next queue chunk
            return this._chunkQueue.shift();
        } else {
            // Otherwise, set up a promise that handleChunk will cause to be resolved
            this._chunkPending = new Promise((resolve)=>{
                this._chunkResolution = resolve;
            });
            return this._chunkPending;
        }
    }
    /**
     * Is the stream done?
     * A stream is only done if all of the following are true:
     * - There is no more data to be added to the text buffer
     * - There is no more data in the text buffer
     * - There are no chunks that are waiting to be consumed
     */ get streamDone() {
        return !this._bufferOpen && this._buffer.length === 0 && this._chunkQueue.length === 0 && this._chunkPending === null;
    }
}
exports.JsonStream = JsonStream;
class ComplexJsonStream extends JsonStream {
    _simplifyObject(obj) {
        return simpleValue(obj);
    }
}
exports.ComplexJsonStream = ComplexJsonStream;
class ReadableAbstractStream {
    constructor(baseStream, body){
        Object.defineProperty(this, "baseStream", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "decoder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.baseStream = baseStream;
        this.decoder = new TextDecoder("utf-8");
        if (body) {
            void this.run(body);
        } else {
            console.error("Unexpected empty body while streaming");
        }
    }
    appendBuffer(data) {
        return this.baseStream.appendBuffer(data);
    }
    closeBuffer() {
        return this.baseStream.closeBuffer();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nextChunk() {
        return this.baseStream.nextChunk();
    }
    get streamDone() {
        return this.baseStream.streamDone;
    }
    async run(body) {
        const reader = body.getReader();
        let isDone = false;
        while(!isDone){
            const { value, done } = await reader.read();
            if (!done) {
                const svalue = this.decoder.decode(value, {
                    stream: true
                });
                this.appendBuffer(svalue);
            } else {
                isDone = done;
                this.closeBuffer();
            }
        }
    }
}
exports.ReadableAbstractStream = ReadableAbstractStream;
class ReadableJsonStream extends ReadableAbstractStream {
    constructor(body){
        super(new JsonStream(), body);
    }
}
exports.ReadableJsonStream = ReadableJsonStream;
class SseStream {
    constructor(){
        Object.defineProperty(this, "_buffer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "_bufferOpen", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        // Set up a potential Promise that the handler can resolve.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "_chunkResolution", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // If there is no Promise (it is null), the handler must add it to the queue
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "_chunkPending", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        // A queue that will collect chunks while there is no Promise
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "_chunkQueue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    appendBuffer(data) {
        this._buffer += data;
        this._parseBuffer();
    }
    closeBuffer() {
        this._bufferOpen = false;
        this._parseBuffer();
    }
    /**
     * Attempt to load an entire event.
     * For each entire event we load,
     * send them to be handled.
     */ _parseBuffer() {
        const events = this._buffer.split(/\n\n/);
        this._buffer = events.pop() ?? "";
        events.forEach((event)=>this._handleEvent(event.trim()));
        if (!this._bufferOpen) {
            // No more data will be added, and we have parsed
            // everything. So dump the rest.
            this._handleEvent(null);
            this._buffer = "";
        }
    }
    /**
     * Given an event string, get all the fields
     * in the event. It is assumed there is one field
     * per line, but that field names can be duplicated,
     * indicating to append the new value to the previous value
     * @param event
     */ _parseEvent(event) {
        if (!event || event.trim() === "") {
            return null;
        }
        const ret = {};
        const lines = event.split(/\n/);
        lines.forEach((line)=>{
            const match = line.match(/^([^:]+): \s*(.+)\n*$/);
            if (match && match.length === 3) {
                const key = match[1];
                const val = match[2];
                const cur = ret[key] ?? "";
                ret[key] = `${cur}${val}`;
            }
        });
        return ret;
    }
    _handleEvent(event) {
        const chunk = this._parseEvent(event);
        if (this._chunkPending) {
            this._chunkResolution(chunk);
            this._chunkPending = null;
        } else {
            this._chunkQueue.push(chunk);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async nextChunk() {
        if (this._chunkQueue.length > 0) {
            // If there is data in the queue, return the next queue chunk
            return this._chunkQueue.shift();
        } else {
            // Otherwise, set up a promise that handleChunk will cause to be resolved
            this._chunkPending = new Promise((resolve)=>{
                this._chunkResolution = resolve;
            });
            return this._chunkPending;
        }
    }
    get streamDone() {
        return !this._bufferOpen && this._buffer.length === 0 && this._chunkQueue.length === 0 && this._chunkPending === null;
    }
}
exports.SseStream = SseStream;
class ReadableSseStream extends ReadableAbstractStream {
    constructor(body){
        super(new SseStream(), body);
    }
}
exports.ReadableSseStream = ReadableSseStream;
class SseJsonStream extends SseStream {
    constructor(jsonAttribute){
        super();
        Object.defineProperty(this, "_jsonAttribute", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "data"
        });
        this._jsonAttribute = jsonAttribute ?? this._jsonAttribute;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async nextChunk() {
        const eventRecord = await super.nextChunk();
        const json = eventRecord?.[this._jsonAttribute];
        if (!json) {
            return null;
        } else {
            return JSON.parse(json);
        }
    }
}
exports.SseJsonStream = SseJsonStream;
class ReadableSseJsonStream extends ReadableAbstractStream {
    constructor(body){
        super(new SseJsonStream(), body);
    }
}
exports.ReadableSseJsonStream = ReadableSseJsonStream;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/index.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/common.cjs [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/failed_handler.cjs [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/gemini.cjs [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/zod_to_gemini_parameters.cjs [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/palm.cjs [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/safety.cjs [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/stream.cjs [app-route] (ecmascript)"), exports);
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/connection.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GoogleRequestRecorder = exports.GoogleRequestLogger = exports.GoogleRequestCallbackHandler = exports.AbstractGoogleLLMConnection = exports.GoogleAIConnection = exports.GoogleRawConnection = exports.GoogleHostConnection = exports.GoogleConnection = void 0;
const env_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/utils/env.cjs [app-route] (ecmascript)");
const base_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/callbacks/base.cjs [app-route] (ecmascript)");
const index_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/index.cjs [app-route] (ecmascript)");
const anthropic_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/anthropic.cjs [app-route] (ecmascript)");
class GoogleConnection {
    constructor(caller, client, streaming){
        Object.defineProperty(this, "caller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "streaming", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.caller = caller;
        this.client = client;
        this.streaming = streaming ?? false;
    }
    async _clientInfoHeaders() {
        const { userAgent, clientLibraryVersion } = await this._getClientInfo();
        return {
            "User-Agent": userAgent,
            "Client-Info": clientLibraryVersion
        };
    }
    async _getClientInfo() {
        const env = await (0, env_1.getRuntimeEnvironment)();
        const langchain = env?.library ?? "langchain-js";
        // TODO: Add an API for getting the current LangChain version
        const langchainVersion = "0";
        const moduleName = await this._moduleName();
        let clientLibraryVersion = `${langchain}/${langchainVersion}`;
        if (moduleName && moduleName.length) {
            clientLibraryVersion = `${clientLibraryVersion}-${moduleName}`;
        }
        return {
            userAgent: clientLibraryVersion,
            clientLibraryVersion: `${langchainVersion}-${moduleName}`
        };
    }
    async _moduleName() {
        return this.constructor.name;
    }
    async additionalHeaders() {
        return {};
    }
    async _buildOpts(data, _options, requestHeaders = {}) {
        const url = await this.buildUrl();
        const method = this.buildMethod();
        const infoHeaders = await this._clientInfoHeaders() ?? {};
        const additionalHeaders = await this.additionalHeaders() ?? {};
        const headers = {
            ...infoHeaders,
            ...additionalHeaders,
            ...requestHeaders
        };
        const opts = {
            url,
            method,
            headers
        };
        if (data && method === "POST") {
            opts.data = data;
        }
        if (this.streaming) {
            opts.responseType = "stream";
        } else {
            opts.responseType = "json";
        }
        return opts;
    }
    async _request(data, options, requestHeaders = {}) {
        const opts = await this._buildOpts(data, options, requestHeaders);
        const callResponse = await this.caller.callWithOptions({
            signal: options?.signal
        }, async ()=>this.client.request(opts));
        const response = callResponse; // Done for typecast safety, I guess
        return response;
    }
}
exports.GoogleConnection = GoogleConnection;
class GoogleHostConnection extends GoogleConnection {
    constructor(fields, caller, client, streaming){
        super(caller, client, streaming);
        // This does not default to a value intentionally.
        // Use the "platform" getter if you need this.
        Object.defineProperty(this, "platformType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_endpoint", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_location", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "apiVersion", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "v1"
        });
        this.caller = caller;
        this.platformType = fields?.platformType;
        this._endpoint = fields?.endpoint;
        this._location = fields?.location;
        this.apiVersion = fields?.apiVersion ?? this.apiVersion;
        this.client = client;
    }
    get platform() {
        return this.platformType ?? this.computedPlatformType;
    }
    get computedPlatformType() {
        return "gcp";
    }
    get location() {
        return this._location ?? this.computedLocation;
    }
    get computedLocation() {
        return "us-central1";
    }
    get endpoint() {
        return this._endpoint ?? this.computedEndpoint;
    }
    get computedEndpoint() {
        return `${this.location}-aiplatform.googleapis.com`;
    }
    buildMethod() {
        return "POST";
    }
}
exports.GoogleHostConnection = GoogleHostConnection;
class GoogleRawConnection extends GoogleHostConnection {
    async _buildOpts(data, _options, requestHeaders = {}) {
        const opts = await super._buildOpts(data, _options, requestHeaders);
        opts.responseType = "blob";
        return opts;
    }
}
exports.GoogleRawConnection = GoogleRawConnection;
class GoogleAIConnection extends GoogleHostConnection {
    constructor(fields, caller, client, streaming){
        super(fields, caller, client, streaming);
        Object.defineProperty(this, "model", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "modelName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_apiName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "apiConfig", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.client = client;
        this.modelName = fields?.model ?? fields?.modelName ?? this.model;
        this.model = this.modelName;
        this._apiName = fields?.apiName;
        this.apiConfig = {
            safetyHandler: fields?.safetyHandler,
            ...fields?.apiConfig
        };
    }
    get modelFamily() {
        return (0, index_js_1.modelToFamily)(this.model);
    }
    get modelPublisher() {
        return (0, index_js_1.modelToPublisher)(this.model);
    }
    get computedAPIName() {
        // At least at the moment, model publishers and APIs map the same
        return this.modelPublisher;
    }
    get apiName() {
        return this._apiName ?? this.computedAPIName;
    }
    get api() {
        switch(this.apiName){
            case "google":
                return (0, index_js_1.getGeminiAPI)(this.apiConfig);
            case "anthropic":
                return (0, anthropic_js_1.getAnthropicAPI)(this.apiConfig);
            default:
                throw new Error(`Unknown API: ${this.apiName}`);
        }
    }
    get computedPlatformType() {
        if (this.client.clientType === "apiKey") {
            return "gai";
        } else {
            return "gcp";
        }
    }
    get computedLocation() {
        switch(this.apiName){
            case "google":
                return super.computedLocation;
            case "anthropic":
                return "us-east5";
            default:
                throw new Error(`Unknown apiName: ${this.apiName}. Can't get location.`);
        }
    }
    async buildUrlGenerativeLanguage() {
        const method = await this.buildUrlMethod();
        const url = `https://generativelanguage.googleapis.com/${this.apiVersion}/models/${this.model}:${method}`;
        return url;
    }
    async buildUrlVertex() {
        const projectId = await this.client.getProjectId();
        const method = await this.buildUrlMethod();
        const publisher = this.modelPublisher;
        const url = `https://${this.endpoint}/${this.apiVersion}/projects/${projectId}/locations/${this.location}/publishers/${publisher}/models/${this.model}:${method}`;
        return url;
    }
    async buildUrl() {
        switch(this.platform){
            case "gai":
                return this.buildUrlGenerativeLanguage();
            default:
                return this.buildUrlVertex();
        }
    }
    async request(input, parameters, options, runManager) {
        const moduleName = this.constructor.name;
        const streamingParameters = {
            ...parameters,
            streaming: this.streaming
        };
        const data = await this.formatData(input, streamingParameters);
        await runManager?.handleCustomEvent(`google-request-${moduleName}`, {
            data,
            parameters: streamingParameters,
            options,
            connection: {
                ...this,
                url: await this.buildUrl(),
                urlMethod: await this.buildUrlMethod(),
                modelFamily: this.modelFamily,
                modelPublisher: this.modelPublisher,
                computedPlatformType: this.computedPlatformType
            }
        });
        const response = await this._request(data, options);
        await runManager?.handleCustomEvent(`google-response-${moduleName}`, {
            response
        });
        return response;
    }
}
exports.GoogleAIConnection = GoogleAIConnection;
class AbstractGoogleLLMConnection extends GoogleAIConnection {
    async buildUrlMethodGemini() {
        return this.streaming ? "streamGenerateContent" : "generateContent";
    }
    async buildUrlMethodClaude() {
        return this.streaming ? "streamRawPredict" : "rawPredict";
    }
    async buildUrlMethod() {
        switch(this.modelFamily){
            case "gemini":
                return this.buildUrlMethodGemini();
            case "claude":
                return this.buildUrlMethodClaude();
            default:
                throw new Error(`Unknown model family: ${this.modelFamily}`);
        }
    }
    async formatData(input, parameters) {
        return this.api.formatData(input, parameters);
    }
}
exports.AbstractGoogleLLMConnection = AbstractGoogleLLMConnection;
class GoogleRequestCallbackHandler extends base_1.BaseCallbackHandler {
    customEventInfo(eventName) {
        const names = eventName.split("-");
        return {
            subEvent: names[1],
            module: names[2]
        };
    }
    handleCustomEvent(eventName, data, runId, tags, metadata) {
        if (!eventName) {
            return undefined;
        }
        const eventInfo = this.customEventInfo(eventName);
        switch(eventInfo.subEvent){
            case "request":
                return this.handleCustomRequestEvent(eventName, eventInfo, data, runId, tags, metadata);
            case "response":
                return this.handleCustomResponseEvent(eventName, eventInfo, data, runId, tags, metadata);
            case "chunk":
                return this.handleCustomChunkEvent(eventName, eventInfo, data, runId, tags, metadata);
            default:
                console.error(`Unexpected eventInfo for ${eventName} ${JSON.stringify(eventInfo, null, 1)}`);
        }
    }
}
exports.GoogleRequestCallbackHandler = GoogleRequestCallbackHandler;
class GoogleRequestLogger extends GoogleRequestCallbackHandler {
    constructor(){
        super(...arguments);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "GoogleRequestLogger"
        });
    }
    log(eventName, data, tags) {
        const tagStr = tags ? `[${tags}]` : "[]";
        console.log(`${eventName} ${tagStr} ${JSON.stringify(data, null, 1)}`);
    }
    handleCustomRequestEvent(eventName, _eventInfo, data, _runId, tags, _metadata) {
        this.log(eventName, data, tags);
    }
    handleCustomResponseEvent(eventName, _eventInfo, data, _runId, tags, _metadata) {
        this.log(eventName, data, tags);
    }
    handleCustomChunkEvent(eventName, _eventInfo, data, _runId, tags, _metadata) {
        this.log(eventName, data, tags);
    }
}
exports.GoogleRequestLogger = GoogleRequestLogger;
class GoogleRequestRecorder extends GoogleRequestCallbackHandler {
    constructor(){
        super(...arguments);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "GoogleRequestRecorder"
        });
        Object.defineProperty(this, "request", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "response", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "chunk", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    handleCustomRequestEvent(_eventName, _eventInfo, data, _runId, _tags, _metadata) {
        this.request = data;
    }
    handleCustomResponseEvent(_eventName, _eventInfo, data, _runId, _tags, _metadata) {
        this.response = data;
    }
    handleCustomChunkEvent(_eventName, _eventInfo, data, _runId, _tags, _metadata) {
        this.chunk.push(data);
    }
}
exports.GoogleRequestRecorder = GoogleRequestRecorder;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/auth.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ensureAuthOptionScopes = exports.aiPlatformScope = exports.ApiKeyGoogleAuth = exports.GoogleAbstractedFetchClient = void 0;
const stream_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/stream.cjs [app-route] (ecmascript)");
class GoogleAbstractedFetchClient {
    async _buildData(res, opts) {
        switch(opts.responseType){
            case "json":
                return res.json();
            case "stream":
                return new stream_js_1.ReadableJsonStream(res.body);
            default:
                return res.blob();
        }
    }
    async _request(url, opts, additionalHeaders) {
        if (url == null) throw new Error("Missing URL");
        const fetchOptions = {
            method: opts.method,
            headers: {
                "Content-Type": "application/json",
                ...opts.headers ?? {},
                ...additionalHeaders ?? {}
            }
        };
        if (opts.data !== undefined) {
            if (typeof opts.data === "string") {
                fetchOptions.body = opts.data;
            } else {
                fetchOptions.body = JSON.stringify(opts.data);
            }
        }
        const res = await fetch(url, fetchOptions);
        if (!res.ok) {
            const resText = await res.text();
            const error = new Error(`Google request failed with status code ${res.status}: ${resText}`);
            /* eslint-disable @typescript-eslint/no-explicit-any */ error.response = res;
            error.details = {
                url,
                opts,
                fetchOptions,
                result: res
            };
            /* eslint-enable @typescript-eslint/no-explicit-any */ throw error;
        }
        const data = await this._buildData(res, opts);
        return {
            data,
            config: {},
            status: res.status,
            statusText: res.statusText,
            headers: res.headers,
            request: {
                responseURL: res.url
            }
        };
    }
}
exports.GoogleAbstractedFetchClient = GoogleAbstractedFetchClient;
class ApiKeyGoogleAuth extends GoogleAbstractedFetchClient {
    constructor(apiKey){
        super();
        Object.defineProperty(this, "apiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.apiKey = apiKey;
    }
    get clientType() {
        return "apiKey";
    }
    getProjectId() {
        throw new Error("APIs that require a project ID cannot use an API key");
    // Perhaps we could implement this if needed:
    // https://cloud.google.com/docs/authentication/api-keys#get-info
    }
    request(opts) {
        const authHeader = {
            "X-Goog-Api-Key": this.apiKey
        };
        return this._request(opts.url, opts, authHeader);
    }
}
exports.ApiKeyGoogleAuth = ApiKeyGoogleAuth;
function aiPlatformScope(platform) {
    switch(platform){
        case "gai":
            return [
                "https://www.googleapis.com/auth/generative-language"
            ];
        default:
            return [
                "https://www.googleapis.com/auth/cloud-platform"
            ];
    }
}
exports.aiPlatformScope = aiPlatformScope;
function ensureAuthOptionScopes(authOption, scopeProperty, scopesOrPlatform) {
    // If the property is already set, return it
    if (authOption && Object.hasOwn(authOption, scopeProperty)) {
        return authOption;
    }
    // Otherwise add it
    const scopes = Array.isArray(scopesOrPlatform) ? scopesOrPlatform : aiPlatformScope(scopesOrPlatform ?? "gcp");
    return {
        [scopeProperty]: scopes,
        ...authOption ?? {}
    };
}
exports.ensureAuthOptionScopes = ensureAuthOptionScopes;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/chat_models.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChatGoogleBase = exports.ChatConnection = void 0;
const env_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/utils/env.cjs [app-route] (ecmascript)");
const chat_models_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/language_models/chat_models.cjs [app-route] (ecmascript)");
const outputs_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/outputs.cjs [app-route] (ecmascript)");
const messages_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/messages.cjs [app-route] (ecmascript)");
const runnables_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/runnables.cjs [app-route] (ecmascript)");
const openai_tools_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/output_parsers/openai_tools.cjs [app-route] (ecmascript)");
const stream_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/utils/stream.cjs [app-route] (ecmascript)");
const common_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/common.cjs [app-route] (ecmascript)");
const connection_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/connection.cjs [app-route] (ecmascript)");
const gemini_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/gemini.cjs [app-route] (ecmascript)");
const auth_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/auth.cjs [app-route] (ecmascript)");
const failed_handler_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/failed_handler.cjs [app-route] (ecmascript)");
const zod_to_gemini_parameters_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/zod_to_gemini_parameters.cjs [app-route] (ecmascript)");
class ChatConnection extends connection_js_1.AbstractGoogleLLMConnection {
    constructor(fields, caller, client, streaming){
        super(fields, caller, client, streaming);
        Object.defineProperty(this, "convertSystemMessageToHumanContent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.convertSystemMessageToHumanContent = fields?.convertSystemMessageToHumanContent;
    }
    get useSystemInstruction() {
        return typeof this.convertSystemMessageToHumanContent === "boolean" ? !this.convertSystemMessageToHumanContent : this.computeUseSystemInstruction;
    }
    get computeUseSystemInstruction() {
        // This works on models from April 2024 and later
        //   Vertex AI: gemini-1.5-pro and gemini-1.0-002 and later
        //   AI Studio: gemini-1.5-pro-latest
        if (this.modelFamily === "palm") {
            return false;
        } else if (this.modelName === "gemini-1.0-pro-001") {
            return false;
        } else if (this.modelName.startsWith("gemini-pro-vision")) {
            return false;
        } else if (this.modelName.startsWith("gemini-1.0-pro-vision")) {
            return false;
        } else if (this.modelName === "gemini-pro" && this.platform === "gai") {
            // on AI Studio gemini-pro is still pointing at gemini-1.0-pro-001
            return false;
        }
        return true;
    }
    computeGoogleSearchToolAdjustmentFromModel() {
        if (this.modelName.startsWith("gemini-1.0")) {
            return "googleSearchRetrieval";
        } else if (this.modelName.startsWith("gemini-1.5")) {
            return "googleSearchRetrieval";
        } else {
            return "googleSearch";
        }
    }
    computeGoogleSearchToolAdjustment(apiConfig) {
        const adj = apiConfig.googleSearchToolAdjustment;
        if (adj === undefined || adj === true) {
            return this.computeGoogleSearchToolAdjustmentFromModel();
        } else {
            return adj;
        }
    }
    buildGeminiAPI() {
        const apiConfig = this.apiConfig ?? {};
        const googleSearchToolAdjustment = this.computeGoogleSearchToolAdjustment(apiConfig);
        const geminiConfig = {
            useSystemInstruction: this.useSystemInstruction,
            googleSearchToolAdjustment,
            ...apiConfig
        };
        return (0, gemini_js_1.getGeminiAPI)(geminiConfig);
    }
    get api() {
        switch(this.apiName){
            case "google":
                return this.buildGeminiAPI();
            default:
                return super.api;
        }
    }
}
exports.ChatConnection = ChatConnection;
/**
 * Integration with a Google chat model.
 */ class ChatGoogleBase extends chat_models_1.BaseChatModel {
    // Used for tracing, replace with the same name as your class
    static lc_name() {
        return "ChatGoogle";
    }
    get lc_secrets() {
        return {
            authOptions: "GOOGLE_AUTH_OPTIONS"
        };
    }
    constructor(fields){
        super((0, failed_handler_js_1.ensureParams)(fields));
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        // Set based on modelName
        Object.defineProperty(this, "model", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "modelName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "gemini-pro"
        });
        Object.defineProperty(this, "temperature", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0.7
        });
        Object.defineProperty(this, "maxOutputTokens", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1024
        });
        Object.defineProperty(this, "topP", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0.8
        });
        Object.defineProperty(this, "topK", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 40
        });
        Object.defineProperty(this, "presencePenalty", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "frequencyPenalty", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "stopSequences", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "logprobs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "topLogprobs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "safetySettings", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        // May intentionally be undefined, meaning to compute this.
        Object.defineProperty(this, "convertSystemMessageToHumanContent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "safetyHandler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "streamUsage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "streaming", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "connection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "streamedConnection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        (0, common_js_1.copyAndValidateModelParamsInto)(fields, this);
        this.safetyHandler = fields?.safetyHandler ?? new gemini_js_1.DefaultGeminiSafetyHandler();
        this.streamUsage = fields?.streamUsage ?? this.streamUsage;
        const client = this.buildClient(fields);
        this.buildConnection(fields ?? {}, client);
    }
    getLsParams(options) {
        const params = this.invocationParams(options);
        return {
            ls_provider: "google_vertexai",
            ls_model_name: this.model,
            ls_model_type: "chat",
            ls_temperature: params.temperature ?? undefined,
            ls_max_tokens: params.maxOutputTokens ?? undefined,
            ls_stop: options.stop
        };
    }
    buildApiKeyClient(apiKey) {
        return new auth_js_1.ApiKeyGoogleAuth(apiKey);
    }
    buildApiKey(fields) {
        if (fields?.platformType !== "gcp") {
            return fields?.apiKey ?? (0, env_1.getEnvironmentVariable)("GOOGLE_API_KEY");
        } else {
            // GCP doesn't support API Keys
            return undefined;
        }
    }
    buildClient(fields) {
        const apiKey = this.buildApiKey(fields);
        if (apiKey) {
            return this.buildApiKeyClient(apiKey);
        } else {
            return this.buildAbstractedClient(fields);
        }
    }
    buildConnection(fields, client) {
        this.connection = new ChatConnection({
            ...fields,
            ...this
        }, this.caller, client, false);
        this.streamedConnection = new ChatConnection({
            ...fields,
            ...this
        }, this.caller, client, true);
    }
    get platform() {
        return this.connection.platform;
    }
    bindTools(tools, kwargs) {
        return this.bind({
            tools: (0, common_js_1.convertToGeminiTools)(tools),
            ...kwargs
        });
    }
    // Replace
    _llmType() {
        return "chat_integration";
    }
    /**
     * Get the parameters used to invoke the model
     */ invocationParams(options) {
        return (0, common_js_1.copyAIModelParams)(this, options);
    }
    async _generate(messages, options, runManager) {
        const parameters = this.invocationParams(options);
        if (this.streaming) {
            const stream = this._streamResponseChunks(messages, options, runManager);
            let finalChunk = null;
            for await (const chunk of stream){
                finalChunk = !finalChunk ? chunk : (0, stream_1.concat)(finalChunk, chunk);
            }
            if (!finalChunk) {
                throw new Error("No chunks were returned from the stream.");
            }
            return {
                generations: [
                    finalChunk
                ]
            };
        }
        const response = await this.connection.request(messages, parameters, options, runManager);
        const ret = this.connection.api.responseToChatResult(response);
        const chunk = ret?.generations?.[0];
        if (chunk) {
            await runManager?.handleLLMNewToken(chunk.text || "");
        }
        return ret;
    }
    async *_streamResponseChunks(_messages, options, runManager) {
        // Make the call as a streaming request
        const parameters = this.invocationParams(options);
        const response = await this.streamedConnection.request(_messages, parameters, options, runManager);
        // Get the streaming parser of the response
        const stream = response.data;
        let usageMetadata;
        // Loop until the end of the stream
        // During the loop, yield each time we get a chunk from the streaming parser
        // that is either available or added to the queue
        while(!stream.streamDone){
            const output = await stream.nextChunk();
            await runManager?.handleCustomEvent(`google-chunk-${this.constructor.name}`, {
                output
            });
            if (output && output.usageMetadata && this.streamUsage !== false && options.streamUsage !== false) {
                usageMetadata = {
                    input_tokens: output.usageMetadata.promptTokenCount,
                    output_tokens: output.usageMetadata.candidatesTokenCount,
                    total_tokens: output.usageMetadata.totalTokenCount
                };
            }
            const chunk = output !== null ? this.connection.api.responseToChatGeneration({
                data: output
            }) : new outputs_1.ChatGenerationChunk({
                text: "",
                generationInfo: {
                    finishReason: "stop"
                },
                message: new messages_1.AIMessageChunk({
                    content: "",
                    usage_metadata: usageMetadata
                })
            });
            if (chunk) {
                yield chunk;
                await runManager?.handleLLMNewToken(chunk.text ?? "", undefined, undefined, undefined, undefined, {
                    chunk
                });
            }
        }
    }
    /** @ignore */ _combineLLMOutput() {
        return [];
    }
    withStructuredOutput(outputSchema, config) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const schema = outputSchema;
        const name = config?.name;
        const method = config?.method;
        const includeRaw = config?.includeRaw;
        if (method === "jsonMode") {
            throw new Error(`Google only supports "functionCalling" as a method.`);
        }
        let functionName = name ?? "extract";
        let outputParser;
        let tools;
        if (isZodSchema(schema)) {
            const jsonSchema = (0, zod_to_gemini_parameters_js_1.zodToGeminiParameters)(schema);
            tools = [
                {
                    functionDeclarations: [
                        {
                            name: functionName,
                            description: jsonSchema.description ?? "A function available to call.",
                            parameters: jsonSchema
                        }
                    ]
                }
            ];
            outputParser = new openai_tools_1.JsonOutputKeyToolsParser({
                returnSingle: true,
                keyName: functionName,
                zodSchema: schema
            });
        } else {
            let geminiFunctionDefinition;
            if (typeof schema.name === "string" && typeof schema.parameters === "object" && schema.parameters != null) {
                geminiFunctionDefinition = schema;
                functionName = schema.name;
            } else {
                geminiFunctionDefinition = {
                    name: functionName,
                    description: schema.description ?? "",
                    parameters: schema
                };
            }
            tools = [
                {
                    functionDeclarations: [
                        geminiFunctionDefinition
                    ]
                }
            ];
            outputParser = new openai_tools_1.JsonOutputKeyToolsParser({
                returnSingle: true,
                keyName: functionName
            });
        }
        const llm = this.bind({
            tools,
            tool_choice: functionName
        });
        if (!includeRaw) {
            return llm.pipe(outputParser).withConfig({
                runName: "ChatGoogleStructuredOutput"
            });
        }
        const parserAssign = runnables_1.RunnablePassthrough.assign({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            parsed: (input, config)=>outputParser.invoke(input.raw, config)
        });
        const parserNone = runnables_1.RunnablePassthrough.assign({
            parsed: ()=>null
        });
        const parsedWithFallback = parserAssign.withFallbacks({
            fallbacks: [
                parserNone
            ]
        });
        return runnables_1.RunnableSequence.from([
            {
                raw: llm
            },
            parsedWithFallback
        ]).withConfig({
            runName: "StructuredOutputRunnable"
        });
    }
}
exports.ChatGoogleBase = ChatGoogleBase;
function isZodSchema(// eslint-disable-next-line @typescript-eslint/no-explicit-any
input) {
    // Check for a characteristic method of Zod schemas
    return typeof input?.parse === "function";
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/llms.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GoogleBaseLLM = void 0;
const manager_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/callbacks/manager.cjs [app-route] (ecmascript)");
const llms_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/language_models/llms.cjs [app-route] (ecmascript)");
const outputs_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/outputs.cjs [app-route] (ecmascript)");
const env_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/utils/env.cjs [app-route] (ecmascript)");
const connection_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/connection.cjs [app-route] (ecmascript)");
const common_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/common.cjs [app-route] (ecmascript)");
const gemini_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/gemini.cjs [app-route] (ecmascript)");
const auth_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/auth.cjs [app-route] (ecmascript)");
const failed_handler_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/failed_handler.cjs [app-route] (ecmascript)");
const chat_models_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/chat_models.cjs [app-route] (ecmascript)");
class GoogleLLMConnection extends connection_js_1.AbstractGoogleLLMConnection {
    async formatContents(input, _parameters) {
        const parts = await this.api.messageContentToParts(input);
        const contents = [
            {
                role: "user",
                parts
            }
        ];
        return contents;
    }
}
class ProxyChatGoogle extends chat_models_js_1.ChatGoogleBase {
    constructor(fields){
        super(fields);
    }
    buildAbstractedClient(fields) {
        return fields.connection.client;
    }
}
/**
 * Integration with an LLM.
 */ class GoogleBaseLLM extends llms_1.LLM {
    // Used for tracing, replace with the same name as your class
    static lc_name() {
        return "GoogleLLM";
    }
    get lc_secrets() {
        return {
            authOptions: "GOOGLE_AUTH_OPTIONS"
        };
    }
    constructor(fields){
        super((0, failed_handler_js_1.ensureParams)(fields));
        Object.defineProperty(this, "originalFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "modelName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "gemini-pro"
        });
        Object.defineProperty(this, "model", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "gemini-pro"
        });
        Object.defineProperty(this, "temperature", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0.7
        });
        Object.defineProperty(this, "maxOutputTokens", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1024
        });
        Object.defineProperty(this, "topP", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0.8
        });
        Object.defineProperty(this, "topK", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 40
        });
        Object.defineProperty(this, "stopSequences", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "safetySettings", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "safetyHandler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "responseMimeType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "text/plain"
        });
        Object.defineProperty(this, "connection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "streamedConnection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.originalFields = fields;
        (0, common_js_1.copyAndValidateModelParamsInto)(fields, this);
        this.safetyHandler = fields?.safetyHandler ?? new gemini_js_1.DefaultGeminiSafetyHandler();
        const client = this.buildClient(fields);
        this.buildConnection(fields ?? {}, client);
    }
    buildApiKeyClient(apiKey) {
        return new auth_js_1.ApiKeyGoogleAuth(apiKey);
    }
    buildApiKey(fields) {
        return fields?.apiKey ?? (0, env_1.getEnvironmentVariable)("GOOGLE_API_KEY");
    }
    buildClient(fields) {
        const apiKey = this.buildApiKey(fields);
        if (apiKey) {
            return this.buildApiKeyClient(apiKey);
        } else {
            return this.buildAbstractedClient(fields);
        }
    }
    buildConnection(fields, client) {
        this.connection = new GoogleLLMConnection({
            ...fields,
            ...this
        }, this.caller, client, false);
        this.streamedConnection = new GoogleLLMConnection({
            ...fields,
            ...this
        }, this.caller, client, true);
    }
    get platform() {
        return this.connection.platform;
    }
    // Replace
    _llmType() {
        return "googlellm";
    }
    formatPrompt(prompt) {
        return prompt;
    }
    /**
     * For some given input string and options, return a string output.
     *
     * Despite the fact that `invoke` is overridden below, we still need this
     * in order to handle public APi calls to `generate()`.
     */ async _call(prompt, options) {
        const parameters = (0, common_js_1.copyAIModelParams)(this, options);
        const result = await this.connection.request(prompt, parameters, options);
        const ret = this.connection.api.responseToString(result);
        return ret;
    }
    // Normally, you should not override this method and instead should override
    // _streamResponseChunks. We are doing so here to allow for multimodal inputs into
    // the LLM.
    async *_streamIterator(input, options) {
        // TODO: Refactor callback setup and teardown code into core
        const prompt = llms_1.BaseLLM._convertInputToPromptValue(input);
        const [runnableConfig, callOptions] = this._separateRunnableConfigFromCallOptions(options);
        const callbackManager_ = await manager_1.CallbackManager.configure(runnableConfig.callbacks, this.callbacks, runnableConfig.tags, this.tags, runnableConfig.metadata, this.metadata, {
            verbose: this.verbose
        });
        const extra = {
            options: callOptions,
            invocation_params: this?.invocationParams(callOptions),
            batch_size: 1
        };
        const runManagers = await callbackManager_?.handleLLMStart(this.toJSON(), [
            prompt.toString()
        ], undefined, undefined, extra, undefined, undefined, runnableConfig.runName);
        let generation = new outputs_1.GenerationChunk({
            text: ""
        });
        const proxyChat = this.createProxyChat();
        try {
            for await (const chunk of proxyChat._streamIterator(input, options)){
                const stringValue = this.connection.api.chunkToString(chunk);
                const generationChunk = new outputs_1.GenerationChunk({
                    text: stringValue
                });
                generation = generation.concat(generationChunk);
                yield stringValue;
            }
        } catch (err) {
            await Promise.all((runManagers ?? []).map((runManager)=>runManager?.handleLLMError(err)));
            throw err;
        }
        await Promise.all((runManagers ?? []).map((runManager)=>runManager?.handleLLMEnd({
                generations: [
                    [
                        generation
                    ]
                ]
            })));
    }
    async predictMessages(messages, options, _callbacks) {
        const { content } = messages[0];
        const result = await this.connection.request(content, {}, options);
        const ret = this.connection.api.responseToBaseMessage(result);
        return ret;
    }
    /**
     * Internal implementation detail to allow Google LLMs to support
     * multimodal input by delegating to the chat model implementation.
     *
     * TODO: Replace with something less hacky.
     */ createProxyChat() {
        return new ProxyChatGoogle({
            ...this.originalFields,
            connection: this.connection
        });
    }
    // TODO: Remove the need to override this - we are doing it to
    // allow the LLM to handle multimodal types of input.
    async invoke(input, options) {
        const stream = await this._streamIterator(input, options);
        let generatedOutput = "";
        for await (const chunk of stream){
            generatedOutput += chunk;
        }
        return generatedOutput;
    }
}
exports.GoogleBaseLLM = GoogleBaseLLM;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/embeddings.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BaseGoogleEmbeddings = void 0;
const embeddings_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/embeddings.cjs [app-route] (ecmascript)");
const chunk_array_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/utils/chunk_array.cjs [app-route] (ecmascript)");
const env_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/utils/env.cjs [app-route] (ecmascript)");
const connection_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/connection.cjs [app-route] (ecmascript)");
const auth_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/auth.cjs [app-route] (ecmascript)");
class EmbeddingsConnection extends connection_js_1.GoogleAIConnection {
    constructor(fields, caller, client, streaming){
        super(fields, caller, client, streaming);
        Object.defineProperty(this, "convertSystemMessageToHumanContent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    async buildUrlMethod() {
        return "predict";
    }
    get modelPublisher() {
        // All the embedding models are currently published by "google"
        return "google";
    }
    async formatData(input, parameters) {
        return {
            instances: input,
            parameters
        };
    }
}
/**
 * Enables calls to Google APIs for generating
 * text embeddings.
 */ class BaseGoogleEmbeddings extends embeddings_1.Embeddings {
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "model", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "connection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.model = fields.model;
        this.connection = new EmbeddingsConnection({
            ...fields,
            ...this
        }, this.caller, this.buildClient(fields), false);
    }
    buildApiKeyClient(apiKey) {
        return new auth_js_1.ApiKeyGoogleAuth(apiKey);
    }
    buildApiKey(fields) {
        return fields?.apiKey ?? (0, env_1.getEnvironmentVariable)("GOOGLE_API_KEY");
    }
    buildClient(fields) {
        const apiKey = this.buildApiKey(fields);
        if (apiKey) {
            return this.buildApiKeyClient(apiKey);
        } else {
            return this.buildAbstractedClient(fields);
        }
    }
    /**
     * Takes an array of documents as input and returns a promise that
     * resolves to a 2D array of embeddings for each document. It splits the
     * documents into chunks and makes requests to the Google Vertex AI API to
     * generate embeddings.
     * @param documents An array of documents to be embedded.
     * @returns A promise that resolves to a 2D array of embeddings for each document.
     */ async embedDocuments(documents) {
        const instanceChunks = (0, chunk_array_1.chunkArray)(documents.map((document)=>({
                content: document
            })), 5); // Vertex AI accepts max 5 instances per prediction
        const parameters = {};
        const options = {};
        const responses = await Promise.all(instanceChunks.map((instances)=>this.connection.request(instances, parameters, options)));
        const result = responses?.map((response)=>response?.data?.predictions?.map(// eslint-disable-next-line @typescript-eslint/no-explicit-any
            (result)=>result.embeddings?.values) ?? []).flat() ?? [];
        return result;
    }
    /**
     * Takes a document as input and returns a promise that resolves to an
     * embedding for the document. It calls the embedDocuments method with the
     * document as the input.
     * @param document A document to be embedded.
     * @returns A promise that resolves to an embedding for the document.
     */ async embedQuery(document) {
        const data = await this.embedDocuments([
            document
        ]);
        return data[0];
    }
}
exports.BaseGoogleEmbeddings = BaseGoogleEmbeddings;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/output_parsers.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MarkdownGoogleSearchOutputParser = exports.SimpleGoogleSearchOutputParser = exports.BaseGoogleSearchOutputParser = void 0;
const output_parsers_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/output_parsers.cjs [app-route] (ecmascript)");
class BaseGoogleSearchOutputParser extends output_parsers_1.BaseLLMOutputParser {
    constructor(){
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "google_common",
                "output_parsers"
            ]
        });
    }
    generationToGroundingInfo(generation) {
        if ("message" in generation) {
            const responseMetadata = generation?.message?.response_metadata;
            const metadata = responseMetadata?.groundingMetadata;
            const supports = responseMetadata?.groundingSupport ?? metadata?.groundingSupports ?? [];
            if (metadata) {
                return {
                    metadata,
                    supports
                };
            }
        }
        return undefined;
    }
    generationsToGroundingInfo(generations) {
        for (const generation of generations){
            const info = this.generationToGroundingInfo(generation);
            if (info !== undefined) {
                return info;
            }
        }
        return undefined;
    }
    generationToString(generation) {
        if ("message" in generation) {
            const content = generation?.message?.content;
            if (typeof content === "string") {
                return content;
            } else {
                return content.map((c)=>{
                    if (c?.type === "text") {
                        return c?.text ?? "";
                    } else {
                        return "";
                    }
                }).reduce((previousValue, currentValue)=>`${previousValue}${currentValue}`);
            }
        }
        return generation.text;
    }
    generationsToString(generations) {
        return generations.map((generation)=>this.generationToString(generation)).reduce((previousValue, currentValue)=>`${previousValue}${currentValue}`);
    }
    annotateSegment(text, grounding, support, index) {
        const start = support.segment.startIndex ?? 0;
        const end = support.segment.endIndex;
        const textBefore = text.substring(0, start);
        const textSegment = text.substring(start, end);
        const textAfter = text.substring(end);
        const textPrefix = this.segmentPrefix(grounding, support, index) ?? "";
        const textSuffix = this.segmentSuffix(grounding, support, index) ?? "";
        return `${textBefore}${textPrefix}${textSegment}${textSuffix}${textAfter}`;
    }
    annotateTextSegments(text, grounding) {
        // Go through each support info in reverse, since the segment info
        // is sorted, and we won't need to adjust string indexes this way.
        let ret = text;
        for(let co = grounding.supports.length - 1; co >= 0; co -= 1){
            const support = grounding.supports[co];
            ret = this.annotateSegment(ret, grounding, support, co);
        }
        return ret;
    }
    /**
     * Google requires us to
     * "Display the Search Suggestion exactly as provided without any modifications"
     * So this will typically be called from the textSuffix() method to get
     * a string that renders HTML.
     * See https://ai.google.dev/gemini-api/docs/grounding/search-suggestions
     * @param grounding
     */ searchSuggestion(grounding) {
        return grounding?.metadata?.searchEntryPoint?.renderedContent ?? "";
    }
    annotateText(text, grounding) {
        const prefix = this.textPrefix(text, grounding) ?? "";
        const suffix = this.textSuffix(text, grounding) ?? "";
        const body = this.annotateTextSegments(text, grounding);
        return `${prefix}${body}${suffix}`;
    }
    async parseResult(generations, _callbacks) {
        const text = this.generationsToString(generations);
        const grounding = this.generationsToGroundingInfo(generations);
        if (!grounding) {
            return text;
        }
        return this.annotateText(text, grounding);
    }
}
exports.BaseGoogleSearchOutputParser = BaseGoogleSearchOutputParser;
class SimpleGoogleSearchOutputParser extends BaseGoogleSearchOutputParser {
    segmentPrefix(_grounding, _support, _index) {
        return undefined;
    }
    segmentSuffix(_grounding, support, _index) {
        const indices = support.groundingChunkIndices.map((i)=>i + 1);
        return ` [${indices.join(", ")}]`;
    }
    textPrefix(_text, _grounding) {
        return "Google Says:\n";
    }
    chunkToString(chunk, index) {
        const info = chunk.retrievedContext ?? chunk.web;
        return `${index + 1}. ${info.title} - ${info.uri}`;
    }
    textSuffix(_text, grounding) {
        let ret = "\n";
        const chunks = grounding?.metadata?.groundingChunks ?? [];
        chunks.forEach((chunk, index)=>{
            ret = `${ret}${this.chunkToString(chunk, index)}\n`;
        });
        return ret;
    }
}
exports.SimpleGoogleSearchOutputParser = SimpleGoogleSearchOutputParser;
class MarkdownGoogleSearchOutputParser extends BaseGoogleSearchOutputParser {
    segmentPrefix(_grounding, _support, _index) {
        return undefined;
    }
    chunkLink(grounding, index) {
        const chunk = grounding.metadata.groundingChunks[index];
        const url = chunk.retrievedContext?.uri ?? chunk.web?.uri;
        const num = index + 1;
        return `[[${num}](${url})]`;
    }
    segmentSuffix(grounding, support, _index) {
        let ret = "";
        support.groundingChunkIndices.forEach((chunkIndex)=>{
            const link = this.chunkLink(grounding, chunkIndex);
            ret = `${ret}${link}`;
        });
        return ret;
    }
    textPrefix(_text, _grounding) {
        return undefined;
    }
    chunkSuffixLink(chunk, index) {
        const num = index + 1;
        const info = chunk.retrievedContext ?? chunk.web;
        const url = info.uri;
        const site = info.title;
        return `${num}. [${site}](${url})`;
    }
    textSuffix(_text, grounding) {
        let ret = "\n**Search Sources**\n";
        const chunks = grounding.metadata.groundingChunks;
        chunks.forEach((chunk, index)=>{
            ret = `${ret}${this.chunkSuffixLink(chunk, index)}\n`;
        });
        const search = this.searchSuggestion(grounding);
        ret = `${ret}\n${search}`;
        return ret;
    }
}
exports.MarkdownGoogleSearchOutputParser = MarkdownGoogleSearchOutputParser;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/index.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/chat_models.cjs [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/llms.cjs [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/embeddings.cjs [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/output_parsers.cjs [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/auth.cjs [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/connection.cjs [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/types.cjs [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/stream.cjs [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/common.cjs [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/zod_to_gemini_parameters.cjs [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/utils/safety.cjs [app-route] (ecmascript)"), exports);
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/index.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/index.cjs [app-route] (ecmascript)");
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/experimental/utils/media_core.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MediaManager = exports.DataBlobStore = exports.SimpleWebBlobStore = exports.ReadThroughBlobStore = exports.BackedBlobStore = exports.BlobStore = exports.MediaBlob = void 0;
const uuid_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/uuid@10.0.0/node_modules/uuid/dist/esm-node/index.js [app-route] (ecmascript)"); // FIXME - it is importing the wrong uuid, so v6 and v7 aren't implemented
const stores_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/stores.cjs [app-route] (ecmascript)");
const serializable_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/load/serializable.cjs [app-route] (ecmascript)");
function bytesToString(dataArray) {
    // Need to handle the array in smaller chunks to deal with stack size limits
    let ret = "";
    const chunkSize = 102400;
    for(let i = 0; i < dataArray.length; i += chunkSize){
        const chunk = dataArray.subarray(i, i + chunkSize);
        ret += String.fromCharCode(...chunk);
    }
    return ret;
}
/**
 * Represents a chunk of data that can be identified by the path where the
 * data is (or will be) located, along with optional metadata about the data.
 */ class MediaBlob extends serializable_1.Serializable {
    constructor(params){
        super(params);
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "google_common",
                "experimental",
                "utils",
                "media_core"
            ]
        });
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                value: "",
                type: "text/plain"
            }
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "metadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "path", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.data = params.data ?? this.data;
        this.metadata = params.metadata;
        this.path = params.path;
    }
    get size() {
        return this.asBytes.length;
    }
    get dataType() {
        return this.data?.type ?? "";
    }
    get encoding() {
        const charsetEquals = this.dataType.indexOf("charset=");
        return charsetEquals === -1 ? "utf-8" : this.dataType.substring(charsetEquals + 8);
    }
    get mimetype() {
        const semicolon = this.dataType.indexOf(";");
        return semicolon === -1 ? this.dataType : this.dataType.substring(0, semicolon);
    }
    get asBytes() {
        if (!this.data) {
            return Uint8Array.from([]);
        }
        const binString = atob(this.data?.value);
        const ret = new Uint8Array(binString.length);
        for(let co = 0; co < binString.length; co += 1){
            ret[co] = binString.charCodeAt(co);
        }
        return ret;
    }
    async asString() {
        return bytesToString(this.asBytes);
    }
    async asBase64() {
        return this.data?.value ?? "";
    }
    async asDataUrl() {
        return `data:${this.mimetype};base64,${await this.asBase64()}`;
    }
    async asUri() {
        return this.path ?? await this.asDataUrl();
    }
    async encode() {
        const dataUrl = await this.asDataUrl();
        const comma = dataUrl.indexOf(",");
        const encoded = dataUrl.substring(comma + 1);
        const encoding = dataUrl.indexOf("base64") > -1 ? "base64" : "8bit";
        return {
            encoded,
            encoding
        };
    }
    static fromDataUrl(url) {
        if (!url.startsWith("data:")) {
            throw new Error("Not a data: URL");
        }
        const colon = url.indexOf(":");
        const semicolon = url.indexOf(";");
        const mimeType = url.substring(colon + 1, semicolon);
        const comma = url.indexOf(",");
        const base64Data = url.substring(comma + 1);
        const data = {
            type: mimeType,
            value: base64Data
        };
        return new MediaBlob({
            data,
            path: url
        });
    }
    static async fromBlob(blob, other) {
        const valueBuffer = await blob.arrayBuffer();
        const valueArray = new Uint8Array(valueBuffer);
        const valueStr = bytesToString(valueArray);
        const value = btoa(valueStr);
        return new MediaBlob({
            ...other,
            data: {
                value,
                type: blob.type
            }
        });
    }
}
exports.MediaBlob = MediaBlob;
/**
 * A specialized Store that is designed to handle MediaBlobs and use the
 * key that is included in the blob to determine exactly how it is stored.
 *
 * The full details of a MediaBlob may be changed when it is stored.
 * For example, it may get additional or different Metadata. This should be
 * what is returned when the store() method is called.
 *
 * Although BlobStore extends BaseStore, not all of the methods from
 * BaseStore may be implemented (or even possible). Those that are not
 * implemented should be documented and throw an Error if called.
 */ class BlobStore extends stores_1.BaseStore {
    constructor(opts){
        super(opts);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "langchain",
                "google-common"
            ]
        }); // FIXME - What should this be? And why?
        Object.defineProperty(this, "defaultStoreOptions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "defaultFetchOptions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.defaultStoreOptions = opts?.defaultStoreOptions ?? {};
        this.defaultFetchOptions = opts?.defaultFetchOptions ?? {};
    }
    async _realKey(key) {
        return typeof key === "string" ? key : await key.asUri();
    }
    /**
     * Is the path supported by this BlobStore?
     *
     * Although this is async, this is expected to be a relatively fast operation
     * (ie - you shouldn't make network calls).
     *
     * @param path The path to check
     * @param opts Any options (if needed) that may be used to determine if it is valid
     * @return If the path is supported
     */ hasValidPath(path, opts) {
        const prefix = opts?.pathPrefix ?? "";
        const isPrefixed = typeof path !== "undefined" && path.startsWith(prefix);
        return Promise.resolve(isPrefixed);
    }
    _blobPathSuffix(blob) {
        // Get the path currently set and make sure we treat it as a string
        const blobPath = `${blob.path}`;
        // Advance past the first set of /
        let pathStart = blobPath.indexOf("/") + 1;
        while(blobPath.charAt(pathStart) === "/"){
            pathStart += 1;
        }
        // We will use the rest as the path for a replacement
        return blobPath.substring(pathStart);
    }
    async _newBlob(oldBlob, newPath) {
        const oldPath = oldBlob.path;
        const metadata = oldBlob?.metadata ?? {};
        metadata.langchainOldPath = oldPath;
        const newBlob = new MediaBlob({
            ...oldBlob,
            metadata
        });
        if (newPath) {
            newBlob.path = newPath;
        } else if (newBlob.path) {
            delete newBlob.path;
        }
        return newBlob;
    }
    async _validBlobPrefixPath(blob, opts) {
        const prefix = opts?.pathPrefix ?? "";
        const suffix = this._blobPathSuffix(blob);
        const newPath = `${prefix}${suffix}`;
        return this._newBlob(blob, newPath);
    }
    _validBlobPrefixUuidFunction(name) {
        switch(name){
            case "prefixUuid1":
                return (0, uuid_1.v1)();
            case "prefixUuid4":
                return (0, uuid_1.v4)();
            // case "prefixUuid6": return v6();
            // case "prefixUuid7": return v7();
            default:
                throw new Error(`Unknown uuid function: ${name}`);
        }
    }
    async _validBlobPrefixUuid(blob, opts) {
        const prefix = opts?.pathPrefix ?? "";
        const suffix = this._validBlobPrefixUuidFunction(opts?.actionIfInvalid ?? "prefixUuid4");
        const newPath = `${prefix}${suffix}`;
        return this._newBlob(blob, newPath);
    }
    async _validBlobRemovePath(blob, _opts) {
        return this._newBlob(blob, undefined);
    }
    /**
     * Based on the blob and options, return a blob that has a valid path
     * that can be saved.
     * @param blob
     * @param opts
     */ async _validStoreBlob(blob, opts) {
        if (await this.hasValidPath(blob.path, opts)) {
            return blob;
        }
        switch(opts?.actionIfInvalid){
            case "ignore":
                return blob;
            case "prefixPath":
                return this._validBlobPrefixPath(blob, opts);
            case "prefixUuid1":
            case "prefixUuid4":
            case "prefixUuid6":
            case "prefixUuid7":
                return this._validBlobPrefixUuid(blob, opts);
            case "removePath":
                return this._validBlobRemovePath(blob, opts);
            default:
                return undefined;
        }
    }
    async store(blob, opts = {}) {
        const allOpts = {
            ...this.defaultStoreOptions,
            ...opts
        };
        const validBlob = await this._validStoreBlob(blob, allOpts);
        if (typeof validBlob !== "undefined") {
            const validKey = await validBlob.asUri();
            await this.mset([
                [
                    validKey,
                    validBlob
                ]
            ]);
            const savedKey = await validBlob.asUri();
            return await this.fetch(savedKey);
        }
        return undefined;
    }
    async _missingFetchBlobEmpty(path, _opts) {
        return new MediaBlob({
            path
        });
    }
    async _missingFetchBlob(path, opts) {
        switch(opts?.actionIfBlobMissing){
            case "emptyBlob":
                return this._missingFetchBlobEmpty(path, opts);
            default:
                return undefined;
        }
    }
    async fetch(key, opts = {}) {
        const allOpts = {
            ...this.defaultFetchOptions,
            ...opts
        };
        const realKey = await this._realKey(key);
        const ret = await this.mget([
            realKey
        ]);
        return ret?.[0] ?? await this._missingFetchBlob(realKey, allOpts);
    }
}
exports.BlobStore = BlobStore;
class BackedBlobStore extends BlobStore {
    constructor(opts){
        super(opts);
        Object.defineProperty(this, "backingStore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.backingStore = opts.backingStore;
    }
    mdelete(keys) {
        return this.backingStore.mdelete(keys);
    }
    mget(keys) {
        return this.backingStore.mget(keys);
    }
    mset(keyValuePairs) {
        return this.backingStore.mset(keyValuePairs);
    }
    yieldKeys(prefix) {
        return this.backingStore.yieldKeys(prefix);
    }
}
exports.BackedBlobStore = BackedBlobStore;
class ReadThroughBlobStore extends BlobStore {
    constructor(opts){
        super(opts);
        Object.defineProperty(this, "baseStore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "backingStore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.baseStore = opts.baseStore;
        this.backingStore = opts.backingStore;
    }
    async store(blob, opts = {}) {
        const originalUri = await blob.asUri();
        const newBlob = await this.backingStore.store(blob, opts);
        if (newBlob) {
            await this.baseStore.mset([
                [
                    originalUri,
                    newBlob
                ]
            ]);
        }
        return newBlob;
    }
    mdelete(keys) {
        return this.baseStore.mdelete(keys);
    }
    mget(keys) {
        return this.baseStore.mget(keys);
    }
    mset(_keyValuePairs) {
        throw new Error("Do not call ReadThroughBlobStore.mset directly");
    }
    yieldKeys(prefix) {
        return this.baseStore.yieldKeys(prefix);
    }
}
exports.ReadThroughBlobStore = ReadThroughBlobStore;
class SimpleWebBlobStore extends BlobStore {
    _notImplementedException() {
        throw new Error("Not implemented for SimpleWebBlobStore");
    }
    async hasValidPath(path, _opts) {
        return await super.hasValidPath(path, {
            pathPrefix: "https://"
        }) || await super.hasValidPath(path, {
            pathPrefix: "http://"
        });
    }
    async _fetch(url) {
        const ret = new MediaBlob({
            path: url
        });
        const metadata = {};
        const fetchOptions = {
            method: "GET"
        };
        const res = await fetch(url, fetchOptions);
        metadata.status = res.status;
        const headers = {};
        for (const [key, value] of res.headers.entries()){
            headers[key] = value;
        }
        metadata.headers = headers;
        metadata.ok = res.ok;
        if (res.ok) {
            const resMediaBlob = await MediaBlob.fromBlob(await res.blob());
            ret.data = resMediaBlob.data;
        }
        ret.metadata = metadata;
        return ret;
    }
    async mget(keys) {
        const blobMap = keys.map(this._fetch);
        return await Promise.all(blobMap);
    }
    async mdelete(_keys) {
        this._notImplementedException();
    }
    async mset(_keyValuePairs) {
        this._notImplementedException();
    }
    async *yieldKeys(_prefix) {
        this._notImplementedException();
        yield "";
    }
}
exports.SimpleWebBlobStore = SimpleWebBlobStore;
/**
 * A blob "store" that works with data: URLs that will turn the URL into
 * a blob.
 */ class DataBlobStore extends BlobStore {
    _notImplementedException() {
        throw new Error("Not implemented for DataBlobStore");
    }
    hasValidPath(path, _opts) {
        return super.hasValidPath(path, {
            pathPrefix: "data:"
        });
    }
    _fetch(url) {
        return MediaBlob.fromDataUrl(url);
    }
    async mget(keys) {
        const blobMap = keys.map(this._fetch);
        return blobMap;
    }
    async mdelete(_keys) {
        this._notImplementedException();
    }
    async mset(_keyValuePairs) {
        this._notImplementedException();
    }
    async *yieldKeys(_prefix) {
        this._notImplementedException();
        yield "";
    }
}
exports.DataBlobStore = DataBlobStore;
/**
 * Responsible for converting a URI (typically a web URL) into a MediaBlob.
 * Allows for aliasing / caching of the requested URI and what it resolves to.
 * This MediaBlob is expected to be usable to provide to an LLM, either
 * through the Base64 of the media or through a canonical URI that the LLM
 * supports.
 */ class MediaManager {
    constructor(config){
        Object.defineProperty(this, "store", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "resolvers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.store = config.store;
        this.resolvers = config.resolvers;
    }
    defaultResolvers() {
        return [
            new DataBlobStore({}),
            new SimpleWebBlobStore({})
        ];
    }
    async _isInvalid(blob) {
        return typeof blob === "undefined";
    }
    /**
     * Given the public URI, load what is at this URI and save it
     * in the store.
     * @param uri The URI to resolve using the resolver
     * @return A canonical MediaBlob for this URI
     */ async _resolveAndSave(uri) {
        let resolvedBlob;
        const resolvers = this.resolvers || this.defaultResolvers();
        for(let co = 0; co < resolvers.length; co += 1){
            const resolver = resolvers[co];
            if (await resolver.hasValidPath(uri)) {
                resolvedBlob = await resolver.fetch(uri);
            }
        }
        if (resolvedBlob) {
            return await this.store.store(resolvedBlob);
        } else {
            return new MediaBlob({});
        }
    }
    async getMediaBlob(uri) {
        const aliasBlob = await this.store.fetch(uri);
        const ret = await this._isInvalid(aliasBlob) ? await this._resolveAndSave(uri) : aliasBlob;
        return ret;
    }
}
exports.MediaManager = MediaManager;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/experimental/media.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BlobStoreAIStudioFileBase = exports.AIStudioFileDownloadConnection = exports.AIStudioFileUploadConnection = exports.AIStudioMediaBlob = exports.BlobStoreGoogleCloudStorageBase = exports.GoogleCloudStorageRawConnection = exports.GoogleCloudStorageDownloadConnection = exports.GoogleCloudStorageUploadConnection = exports.GoogleCloudStorageUri = exports.BlobStoreGoogle = exports.GoogleDownloadRawConnection = exports.GoogleDownloadConnection = exports.GoogleMultipartUploadConnection = void 0;
const async_caller_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/utils/async_caller.cjs [app-route] (ecmascript)");
const env_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_ws@8.18.3_zod@3.25.76_/node_modules/@langchain/core/utils/env.cjs [app-route] (ecmascript)");
const media_core_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/experimental/utils/media_core.cjs [app-route] (ecmascript)");
const connection_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/connection.cjs [app-route] (ecmascript)");
const auth_js_1 = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/auth.cjs [app-route] (ecmascript)");
class GoogleMultipartUploadConnection extends connection_js_1.GoogleHostConnection {
    constructor(fields, caller, client){
        super(fields, caller, client);
    }
    async _body(separator, data, metadata) {
        const contentType = data.mimetype;
        const { encoded, encoding } = await data.encode();
        const body = [
            `--${separator}`,
            "Content-Type: application/json; charset=UTF-8",
            "",
            JSON.stringify(metadata),
            "",
            `--${separator}`,
            `Content-Type: ${contentType}`,
            `Content-Transfer-Encoding: ${encoding}`,
            "",
            encoded,
            `--${separator}--`
        ];
        return body.join("\n");
    }
    async request(data, metadata, options) {
        const separator = `separator-${Date.now()}`;
        const body = await this._body(separator, data, metadata);
        const requestHeaders = {
            "Content-Type": `multipart/related; boundary=${separator}`,
            "X-Goog-Upload-Protocol": "multipart"
        };
        const response = this._request(body, options, requestHeaders);
        return response;
    }
}
exports.GoogleMultipartUploadConnection = GoogleMultipartUploadConnection;
class GoogleDownloadConnection extends connection_js_1.GoogleHostConnection {
    async request(options) {
        return this._request(undefined, options);
    }
}
exports.GoogleDownloadConnection = GoogleDownloadConnection;
class GoogleDownloadRawConnection extends connection_js_1.GoogleRawConnection {
    buildMethod() {
        return "GET";
    }
    async request(options) {
        return this._request(undefined, options);
    }
}
exports.GoogleDownloadRawConnection = GoogleDownloadRawConnection;
class BlobStoreGoogle extends media_core_js_1.BlobStore {
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "caller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.caller = new async_caller_1.AsyncCaller(fields ?? {});
        this.client = this.buildClient(fields);
    }
    async _set(keyValuePair) {
        const [, blob] = keyValuePair;
        const setMetadata = this.buildSetMetadata(keyValuePair);
        const metadata = setMetadata;
        const options = {};
        const connection = this.buildSetConnection(keyValuePair);
        const response = await connection.request(blob, metadata, options);
        return response;
    }
    async mset(keyValuePairs) {
        const ret = keyValuePairs.map((keyValue)=>this._set(keyValue));
        await Promise.all(ret);
    }
    async _getMetadata(key) {
        const connection = this.buildGetMetadataConnection(key);
        const options = {};
        const response = await connection.request(options);
        return response.data;
    }
    async _getData(key) {
        const connection = this.buildGetDataConnection(key);
        const options = {};
        const response = await connection.request(options);
        return response.data;
    }
    _getMimetypeFromMetadata(metadata) {
        return metadata.contentType;
    }
    async _get(key) {
        const metadata = await this._getMetadata(key);
        const data = await this._getData(key);
        if (data && metadata) {
            const ret = await media_core_js_1.MediaBlob.fromBlob(data, {
                metadata,
                path: key
            });
            return ret;
        } else {
            return undefined;
        }
    }
    async mget(keys) {
        const ret = keys.map((key)=>this._get(key));
        return await Promise.all(ret);
    }
    async _del(key) {
        const connection = this.buildDeleteConnection(key);
        const options = {};
        await connection.request(options);
    }
    async mdelete(keys) {
        const ret = keys.map((key)=>this._del(key));
        await Promise.all(ret);
    }
    // eslint-disable-next-line require-yield
    async *yieldKeys(_prefix) {
        // TODO: Implement. Most have an implementation that uses nextToken.
        throw new Error("yieldKeys is not implemented");
    }
}
exports.BlobStoreGoogle = BlobStoreGoogle;
class GoogleCloudStorageUri {
    constructor(uri){
        Object.defineProperty(this, "bucket", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "path", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const bucketAndPath = GoogleCloudStorageUri.uriToBucketAndPath(uri);
        this.bucket = bucketAndPath.bucket;
        this.path = bucketAndPath.path;
    }
    get uri() {
        return `gs://${this.bucket}/${this.path}`;
    }
    get isValid() {
        return typeof this.bucket !== "undefined" && typeof this.path !== "undefined";
    }
    static uriToBucketAndPath(uri) {
        const match = this.uriRegexp.exec(uri);
        if (!match) {
            throw new Error(`Invalid gs:// URI: ${uri}`);
        }
        return {
            bucket: match[1],
            path: match[2]
        };
    }
    static isValidUri(uri) {
        return this.uriRegexp.test(uri);
    }
}
exports.GoogleCloudStorageUri = GoogleCloudStorageUri;
Object.defineProperty(GoogleCloudStorageUri, "uriRegexp", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /gs:\/\/([a-z0-9][a-z0-9._-]+[a-z0-9])\/(.*)/
});
class GoogleCloudStorageUploadConnection extends GoogleMultipartUploadConnection {
    constructor(fields, caller, client){
        super(fields, caller, client);
        Object.defineProperty(this, "uri", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.uri = new GoogleCloudStorageUri(fields.uri);
    }
    async buildUrl() {
        return `https://storage.googleapis.com/upload/storage/${this.apiVersion}/b/${this.uri.bucket}/o?uploadType=multipart`;
    }
}
exports.GoogleCloudStorageUploadConnection = GoogleCloudStorageUploadConnection;
class GoogleCloudStorageDownloadConnection extends GoogleDownloadConnection {
    constructor(fields, caller, client){
        super(fields, caller, client);
        Object.defineProperty(this, "uri", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "method", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "alt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.uri = new GoogleCloudStorageUri(fields.uri);
        this.method = fields.method;
        this.alt = fields.alt;
    }
    buildMethod() {
        return this.method;
    }
    async buildUrl() {
        const path = encodeURIComponent(this.uri.path);
        const ret = `https://storage.googleapis.com/storage/${this.apiVersion}/b/${this.uri.bucket}/o/${path}`;
        return this.alt ? `${ret}?alt=${this.alt}` : ret;
    }
}
exports.GoogleCloudStorageDownloadConnection = GoogleCloudStorageDownloadConnection;
class GoogleCloudStorageRawConnection extends GoogleDownloadRawConnection {
    constructor(fields, caller, client){
        super(fields, caller, client);
        Object.defineProperty(this, "uri", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.uri = new GoogleCloudStorageUri(fields.uri);
    }
    async buildUrl() {
        const path = encodeURIComponent(this.uri.path);
        const ret = `https://storage.googleapis.com/storage/${this.apiVersion}/b/${this.uri.bucket}/o/${path}?alt=media`;
        return ret;
    }
}
exports.GoogleCloudStorageRawConnection = GoogleCloudStorageRawConnection;
class BlobStoreGoogleCloudStorageBase extends BlobStoreGoogle {
    constructor(fields){
        super(fields);
        Object.defineProperty(this, "params", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.params = fields;
        this.defaultStoreOptions = {
            ...this.defaultStoreOptions,
            pathPrefix: fields.uriPrefix.uri
        };
    }
    buildSetConnection([key, _blob]) {
        const params = {
            ...this.params,
            uri: key
        };
        return new GoogleCloudStorageUploadConnection(params, this.caller, this.client);
    }
    buildSetMetadata([key, blob]) {
        const uri = new GoogleCloudStorageUri(key);
        const ret = {
            name: uri.path,
            metadata: blob.metadata,
            contentType: blob.mimetype
        };
        return ret;
    }
    buildGetMetadataConnection(key) {
        const params = {
            uri: key,
            method: "GET",
            alt: undefined
        };
        return new GoogleCloudStorageDownloadConnection(params, this.caller, this.client);
    }
    buildGetDataConnection(key) {
        const params = {
            uri: key
        };
        return new GoogleCloudStorageRawConnection(params, this.caller, this.client);
    }
    buildDeleteConnection(key) {
        const params = {
            uri: key,
            method: "DELETE",
            alt: undefined
        };
        return new GoogleCloudStorageDownloadConnection(params, this.caller, this.client);
    }
}
exports.BlobStoreGoogleCloudStorageBase = BlobStoreGoogleCloudStorageBase;
class AIStudioMediaBlob extends media_core_js_1.MediaBlob {
    _valueAsDate(value) {
        if (!value) {
            return new Date(0);
        }
        return new Date(value);
    }
    _metadataFieldAsDate(field) {
        return this._valueAsDate(this.metadata?.[field]);
    }
    get createDate() {
        return this._metadataFieldAsDate("createTime");
    }
    get updateDate() {
        return this._metadataFieldAsDate("updateTime");
    }
    get expirationDate() {
        return this._metadataFieldAsDate("expirationTime");
    }
    get isExpired() {
        const now = new Date().toISOString();
        const exp = this.metadata?.expirationTime ?? now;
        return exp <= now;
    }
}
exports.AIStudioMediaBlob = AIStudioMediaBlob;
class AIStudioFileUploadConnection extends GoogleMultipartUploadConnection {
    constructor(){
        super(...arguments);
        Object.defineProperty(this, "apiVersion", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "v1beta"
        });
    }
    async buildUrl() {
        return `https://generativelanguage.googleapis.com/upload/${this.apiVersion}/files`;
    }
}
exports.AIStudioFileUploadConnection = AIStudioFileUploadConnection;
class AIStudioFileDownloadConnection extends GoogleDownloadConnection {
    constructor(fields, caller, client){
        super(fields, caller, client);
        Object.defineProperty(this, "method", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "apiVersion", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "v1beta"
        });
        this.method = fields.method;
        this.name = fields.name;
    }
    buildMethod() {
        return this.method;
    }
    async buildUrl() {
        return `https://generativelanguage.googleapis.com/${this.apiVersion}/files/${this.name}`;
    }
}
exports.AIStudioFileDownloadConnection = AIStudioFileDownloadConnection;
class BlobStoreAIStudioFileBase extends BlobStoreGoogle {
    constructor(fields){
        const params = {
            defaultStoreOptions: {
                pathPrefix: "https://generativelanguage.googleapis.com/v1beta/files/",
                actionIfInvalid: "removePath"
            },
            ...fields
        };
        super(params);
        Object.defineProperty(this, "params", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "retryTime", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1000
        });
        this.params = params;
        this.retryTime = params?.retryTime ?? this.retryTime ?? 1000;
    }
    _pathToName(path) {
        return path.split("/").pop() ?? path;
    }
    buildApiKeyClient(apiKey) {
        return new auth_js_1.ApiKeyGoogleAuth(apiKey);
    }
    buildApiKey(fields) {
        return fields?.apiKey ?? (0, env_1.getEnvironmentVariable)("GOOGLE_API_KEY");
    }
    buildClient(fields) {
        const apiKey = this.buildApiKey(fields);
        if (apiKey) {
            return this.buildApiKeyClient(apiKey);
        } else {
            // TODO: Test that you can use OAuth to access
            return this.buildAbstractedClient(fields);
        }
    }
    async _regetMetadata(key) {
        // Sleep for some time period
        // eslint-disable-next-line no-promise-executor-return
        await new Promise((resolve)=>setTimeout(resolve, this.retryTime));
        // Fetch the latest metadata
        return this._getMetadata(key);
    }
    async _set([key, blob]) {
        const response = await super._set([
            key,
            blob
        ]);
        let file = response.data?.file ?? {
            state: "FAILED"
        };
        while(file.state === "PROCESSING" && file.uri && this.retryTime > 0){
            file = await this._regetMetadata(file.uri);
        }
        // The response should contain the name (and valid URI), so we need to
        // update the blob with this. We can't return a new blob, since mset()
        // doesn't return anything.
        /* eslint-disable no-param-reassign */ blob.path = file.uri;
        blob.metadata = {
            ...blob.metadata,
            ...file
        };
        /* eslint-enable no-param-reassign */ return response;
    }
    buildSetConnection([_key, _blob]) {
        return new AIStudioFileUploadConnection(this.params, this.caller, this.client);
    }
    buildSetMetadata([_key, _blob]) {
        return {};
    }
    buildGetMetadataConnection(key) {
        const params = {
            ...this.params,
            method: "GET",
            name: this._pathToName(key)
        };
        return new AIStudioFileDownloadConnection(params, this.caller, this.client);
    }
    buildGetDataConnection(_key) {
        throw new Error("AI Studio File API does not provide data");
    }
    async _get(key) {
        const metadata = await this._getMetadata(key);
        if (metadata) {
            const contentType = metadata?.mimeType ?? "application/octet-stream";
            // TODO - Get the actual data (and other metadata) from an optional backing store
            const data = {
                value: "",
                type: contentType
            };
            return new media_core_js_1.MediaBlob({
                path: key,
                data,
                metadata
            });
        } else {
            return undefined;
        }
    }
    buildDeleteConnection(key) {
        const params = {
            ...this.params,
            method: "DELETE",
            name: this._pathToName(key)
        };
        return new AIStudioFileDownloadConnection(params, this.caller, this.client);
    }
}
exports.BlobStoreAIStudioFileBase = BlobStoreAIStudioFileBase;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/experimental/media.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@langchain+google-common@0.1.8_@langchain+core@0.3.79_@opentelemetry+api@1.9.0_openai@4.104.0_p74e3ocf6yl7zbg5mpb7dahriu/node_modules/@langchain/google-common/dist/experimental/media.cjs [app-route] (ecmascript)");
}),
];

//# sourceMappingURL=08b6c_%40langchain_google-common_69723420._.js.map