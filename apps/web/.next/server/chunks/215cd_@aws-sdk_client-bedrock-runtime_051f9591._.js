module.exports = [
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/auth/httpAuthSchemeProvider.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultBedrockRuntimeHttpAuthSchemeParametersProvider",
    ()=>defaultBedrockRuntimeHttpAuthSchemeParametersProvider,
    "defaultBedrockRuntimeHttpAuthSchemeProvider",
    ()=>defaultBedrockRuntimeHttpAuthSchemeProvider,
    "resolveHttpAuthSchemeConfig",
    ()=>resolveHttpAuthSchemeConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$resolveAwsSdkSigV4Config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+core@3.927.0/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/resolveAwsSdkSigV4Config.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$util$2d$identity$2d$and$2d$auth$2f$memoizeIdentityProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+core@3.17.2/node_modules/@smithy/core/dist-es/util-identity-and-auth/memoizeIdentityProvider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$middleware$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$getSmithyContext$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+util-middleware@4.2.4/node_modules/@smithy/util-middleware/dist-es/getSmithyContext.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$middleware$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+util-middleware@4.2.4/node_modules/@smithy/util-middleware/dist-es/normalizeProvider.js [app-route] (ecmascript)");
;
;
;
const defaultBedrockRuntimeHttpAuthSchemeParametersProvider = async (config, context, input)=>{
    return {
        operation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$middleware$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$getSmithyContext$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSmithyContext"])(context).operation,
        region: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$middleware$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeProvider"])(config.region)() || (()=>{
            throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
        })()
    };
};
function createAwsAuthSigv4HttpAuthOption(authParameters) {
    return {
        schemeId: "aws.auth#sigv4",
        signingProperties: {
            name: "bedrock",
            region: authParameters.region
        },
        propertiesExtractor: (config, context)=>({
                signingProperties: {
                    config,
                    context
                }
            })
    };
}
function createSmithyApiHttpBearerAuthHttpAuthOption(authParameters) {
    return {
        schemeId: "smithy.api#httpBearerAuth",
        propertiesExtractor: ({ profile, filepath, configFilepath, ignoreCache }, context)=>({
                identityProperties: {
                    profile,
                    filepath,
                    configFilepath,
                    ignoreCache
                }
            })
    };
}
const defaultBedrockRuntimeHttpAuthSchemeProvider = (authParameters)=>{
    const options = [];
    switch(authParameters.operation){
        default:
            {
                options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
                options.push(createSmithyApiHttpBearerAuthHttpAuthOption(authParameters));
            }
    }
    return options;
};
const resolveHttpAuthSchemeConfig = (config)=>{
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$util$2d$identity$2d$and$2d$auth$2f$memoizeIdentityProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoizeIdentityProvider"])(config.token, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$util$2d$identity$2d$and$2d$auth$2f$memoizeIdentityProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isIdentityExpired"], __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$util$2d$identity$2d$and$2d$auth$2f$memoizeIdentityProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["doesIdentityRequireRefresh"]);
    const config_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$resolveAwsSdkSigV4Config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveAwsSdkSigV4Config"])(config);
    return Object.assign(config_0, {
        authSchemePreference: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$middleware$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeProvider"])(config.authSchemePreference ?? []),
        token
    });
};
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/endpoint/EndpointParameters.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "commonParams",
    ()=>commonParams,
    "resolveClientEndpointParameters",
    ()=>resolveClientEndpointParameters
]);
const resolveClientEndpointParameters = (options)=>{
    return Object.assign(options, {
        useDualstackEndpoint: options.useDualstackEndpoint ?? false,
        useFipsEndpoint: options.useFipsEndpoint ?? false,
        defaultSigningName: "bedrock"
    });
};
const commonParams = {
    UseFIPS: {
        type: "builtInParams",
        name: "useFipsEndpoint"
    },
    Endpoint: {
        type: "builtInParams",
        name: "endpoint"
    },
    Region: {
        type: "builtInParams",
        name: "region"
    },
    UseDualStack: {
        type: "builtInParams",
        name: "useDualstackEndpoint"
    }
};
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/package.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"name\":\"@aws-sdk/client-bedrock-runtime\",\"description\":\"AWS SDK for JavaScript Bedrock Runtime Client for Node.js, Browser and React Native\",\"version\":\"3.927.0\",\"scripts\":{\"build\":\"concurrently 'yarn:build:cjs' 'yarn:build:es' 'yarn:build:types'\",\"build:cjs\":\"node ../../scripts/compilation/inline client-bedrock-runtime\",\"build:es\":\"tsc -p tsconfig.es.json\",\"build:include:deps\":\"lerna run --scope $npm_package_name --include-dependencies build\",\"build:types\":\"tsc -p tsconfig.types.json\",\"build:types:downlevel\":\"downlevel-dts dist-types dist-types/ts3.4\",\"clean\":\"rimraf ./dist-* && rimraf *.tsbuildinfo\",\"extract:docs\":\"api-extractor run --local\",\"generate:client\":\"node ../../scripts/generate-clients/single-service --solo bedrock-runtime\"},\"main\":\"./dist-cjs/index.js\",\"types\":\"./dist-types/index.d.ts\",\"module\":\"./dist-es/index.js\",\"sideEffects\":false,\"dependencies\":{\"@aws-crypto/sha256-browser\":\"5.2.0\",\"@aws-crypto/sha256-js\":\"5.2.0\",\"@aws-sdk/core\":\"3.927.0\",\"@aws-sdk/credential-provider-node\":\"3.927.0\",\"@aws-sdk/eventstream-handler-node\":\"3.922.0\",\"@aws-sdk/middleware-eventstream\":\"3.922.0\",\"@aws-sdk/middleware-host-header\":\"3.922.0\",\"@aws-sdk/middleware-logger\":\"3.922.0\",\"@aws-sdk/middleware-recursion-detection\":\"3.922.0\",\"@aws-sdk/middleware-user-agent\":\"3.927.0\",\"@aws-sdk/middleware-websocket\":\"3.922.0\",\"@aws-sdk/region-config-resolver\":\"3.925.0\",\"@aws-sdk/token-providers\":\"3.927.0\",\"@aws-sdk/types\":\"3.922.0\",\"@aws-sdk/util-endpoints\":\"3.922.0\",\"@aws-sdk/util-user-agent-browser\":\"3.922.0\",\"@aws-sdk/util-user-agent-node\":\"3.927.0\",\"@smithy/config-resolver\":\"^4.4.2\",\"@smithy/core\":\"^3.17.2\",\"@smithy/eventstream-serde-browser\":\"^4.2.4\",\"@smithy/eventstream-serde-config-resolver\":\"^4.3.4\",\"@smithy/eventstream-serde-node\":\"^4.2.4\",\"@smithy/fetch-http-handler\":\"^5.3.5\",\"@smithy/hash-node\":\"^4.2.4\",\"@smithy/invalid-dependency\":\"^4.2.4\",\"@smithy/middleware-content-length\":\"^4.2.4\",\"@smithy/middleware-endpoint\":\"^4.3.6\",\"@smithy/middleware-retry\":\"^4.4.6\",\"@smithy/middleware-serde\":\"^4.2.4\",\"@smithy/middleware-stack\":\"^4.2.4\",\"@smithy/node-config-provider\":\"^4.3.4\",\"@smithy/node-http-handler\":\"^4.4.4\",\"@smithy/protocol-http\":\"^5.3.4\",\"@smithy/smithy-client\":\"^4.9.2\",\"@smithy/types\":\"^4.8.1\",\"@smithy/url-parser\":\"^4.2.4\",\"@smithy/util-base64\":\"^4.3.0\",\"@smithy/util-body-length-browser\":\"^4.2.0\",\"@smithy/util-body-length-node\":\"^4.2.1\",\"@smithy/util-defaults-mode-browser\":\"^4.3.5\",\"@smithy/util-defaults-mode-node\":\"^4.2.8\",\"@smithy/util-endpoints\":\"^3.2.4\",\"@smithy/util-middleware\":\"^4.2.4\",\"@smithy/util-retry\":\"^4.2.4\",\"@smithy/util-stream\":\"^4.5.5\",\"@smithy/util-utf8\":\"^4.2.0\",\"@smithy/uuid\":\"^1.1.0\",\"tslib\":\"^2.6.2\"},\"devDependencies\":{\"@tsconfig/node18\":\"18.2.4\",\"@types/node\":\"^18.19.69\",\"concurrently\":\"7.0.0\",\"downlevel-dts\":\"0.10.1\",\"rimraf\":\"3.0.2\",\"typescript\":\"~5.8.3\"},\"engines\":{\"node\":\">=18.0.0\"},\"typesVersions\":{\"<4.0\":{\"dist-types/*\":[\"dist-types/ts3.4/*\"]}},\"files\":[\"dist-*/**\"],\"author\":{\"name\":\"AWS SDK for JavaScript Team\",\"url\":\"https://aws.amazon.com/javascript/\"},\"license\":\"Apache-2.0\",\"browser\":{\"./dist-es/runtimeConfig\":\"./dist-es/runtimeConfig.browser\"},\"react-native\":{\"./dist-es/runtimeConfig\":\"./dist-es/runtimeConfig.native\"},\"homepage\":\"https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-bedrock-runtime\",\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/aws/aws-sdk-js-v3.git\",\"directory\":\"clients/client-bedrock-runtime\"}}"));}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/endpoint/ruleset.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ruleSet",
    ()=>ruleSet
]);
const s = "required", t = "fn", u = "argv", v = "ref";
const a = true, b = "isSet", c = "booleanEquals", d = "error", e = "endpoint", f = "tree", g = "PartitionResult", h = {
    [s]: false,
    "type": "string"
}, i = {
    [s]: true,
    "default": false,
    "type": "boolean"
}, j = {
    [v]: "Endpoint"
}, k = {
    [t]: c,
    [u]: [
        {
            [v]: "UseFIPS"
        },
        true
    ]
}, l = {
    [t]: c,
    [u]: [
        {
            [v]: "UseDualStack"
        },
        true
    ]
}, m = {}, n = {
    [t]: "getAttr",
    [u]: [
        {
            [v]: g
        },
        "supportsFIPS"
    ]
}, o = {
    [t]: c,
    [u]: [
        true,
        {
            [t]: "getAttr",
            [u]: [
                {
                    [v]: g
                },
                "supportsDualStack"
            ]
        }
    ]
}, p = [
    k
], q = [
    l
], r = [
    {
        [v]: "Region"
    }
];
const _data = {
    version: "1.0",
    parameters: {
        Region: h,
        UseDualStack: i,
        UseFIPS: i,
        Endpoint: h
    },
    rules: [
        {
            conditions: [
                {
                    [t]: b,
                    [u]: [
                        j
                    ]
                }
            ],
            rules: [
                {
                    conditions: p,
                    error: "Invalid Configuration: FIPS and custom endpoint are not supported",
                    type: d
                },
                {
                    rules: [
                        {
                            conditions: q,
                            error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                            type: d
                        },
                        {
                            endpoint: {
                                url: j,
                                properties: m,
                                headers: m
                            },
                            type: e
                        }
                    ],
                    type: f
                }
            ],
            type: f
        },
        {
            rules: [
                {
                    conditions: [
                        {
                            [t]: b,
                            [u]: r
                        }
                    ],
                    rules: [
                        {
                            conditions: [
                                {
                                    [t]: "aws.partition",
                                    [u]: r,
                                    assign: g
                                }
                            ],
                            rules: [
                                {
                                    conditions: [
                                        k,
                                        l
                                    ],
                                    rules: [
                                        {
                                            conditions: [
                                                {
                                                    [t]: c,
                                                    [u]: [
                                                        a,
                                                        n
                                                    ]
                                                },
                                                o
                                            ],
                                            rules: [
                                                {
                                                    rules: [
                                                        {
                                                            endpoint: {
                                                                url: "https://bedrock-runtime-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                                                properties: m,
                                                                headers: m
                                                            },
                                                            type: e
                                                        }
                                                    ],
                                                    type: f
                                                }
                                            ],
                                            type: f
                                        },
                                        {
                                            error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                                            type: d
                                        }
                                    ],
                                    type: f
                                },
                                {
                                    conditions: p,
                                    rules: [
                                        {
                                            conditions: [
                                                {
                                                    [t]: c,
                                                    [u]: [
                                                        n,
                                                        a
                                                    ]
                                                }
                                            ],
                                            rules: [
                                                {
                                                    rules: [
                                                        {
                                                            endpoint: {
                                                                url: "https://bedrock-runtime-fips.{Region}.{PartitionResult#dnsSuffix}",
                                                                properties: m,
                                                                headers: m
                                                            },
                                                            type: e
                                                        }
                                                    ],
                                                    type: f
                                                }
                                            ],
                                            type: f
                                        },
                                        {
                                            error: "FIPS is enabled but this partition does not support FIPS",
                                            type: d
                                        }
                                    ],
                                    type: f
                                },
                                {
                                    conditions: q,
                                    rules: [
                                        {
                                            conditions: [
                                                o
                                            ],
                                            rules: [
                                                {
                                                    rules: [
                                                        {
                                                            endpoint: {
                                                                url: "https://bedrock-runtime.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                                                properties: m,
                                                                headers: m
                                                            },
                                                            type: e
                                                        }
                                                    ],
                                                    type: f
                                                }
                                            ],
                                            type: f
                                        },
                                        {
                                            error: "DualStack is enabled but this partition does not support DualStack",
                                            type: d
                                        }
                                    ],
                                    type: f
                                },
                                {
                                    rules: [
                                        {
                                            endpoint: {
                                                url: "https://bedrock-runtime.{Region}.{PartitionResult#dnsSuffix}",
                                                properties: m,
                                                headers: m
                                            },
                                            type: e
                                        }
                                    ],
                                    type: f
                                }
                            ],
                            type: f
                        }
                    ],
                    type: f
                },
                {
                    error: "Invalid Configuration: Missing Region",
                    type: d
                }
            ],
            type: f
        }
    ]
};
const ruleSet = _data;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/endpoint/endpointResolver.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultEndpointResolver",
    ()=>defaultEndpointResolver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$util$2d$endpoints$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+util-endpoints@3.922.0/node_modules/@aws-sdk/util-endpoints/dist-es/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$util$2d$endpoints$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$aws$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+util-endpoints@3.922.0/node_modules/@aws-sdk/util-endpoints/dist-es/aws.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$endpoints$40$3$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$customEndpointFunctions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+util-endpoints@3.2.4/node_modules/@smithy/util-endpoints/dist-es/utils/customEndpointFunctions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$endpoints$40$3$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$cache$2f$EndpointCache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+util-endpoints@3.2.4/node_modules/@smithy/util-endpoints/dist-es/cache/EndpointCache.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$endpoints$40$3$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$resolveEndpoint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+util-endpoints@3.2.4/node_modules/@smithy/util-endpoints/dist-es/resolveEndpoint.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$ruleset$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/endpoint/ruleset.js [app-route] (ecmascript)");
;
;
;
const cache = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$endpoints$40$3$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$cache$2f$EndpointCache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EndpointCache"]({
    size: 50,
    params: [
        "Endpoint",
        "Region",
        "UseDualStack",
        "UseFIPS"
    ]
});
const defaultEndpointResolver = (endpointParams, context = {})=>{
    return cache.get(endpointParams, ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$endpoints$40$3$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$resolveEndpoint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveEndpoint"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$ruleset$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ruleSet"], {
            endpointParams: endpointParams,
            logger: context.logger
        }));
};
__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$endpoints$40$3$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$customEndpointFunctions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customEndpointFunctions"].aws = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$util$2d$endpoints$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$aws$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awsEndpointFunctions"];
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/runtimeConfig.shared.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRuntimeConfig",
    ()=>getRuntimeConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$AwsSdkSigV4Signer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+core@3.927.0/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/AwsSdkSigV4Signer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$util$2d$identity$2d$and$2d$auth$2f$httpAuthSchemes$2f$httpBearerAuth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+core@3.17.2/node_modules/@smithy/core/dist-es/util-identity-and-auth/httpAuthSchemes/httpBearerAuth.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$NoOpLogger$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/NoOpLogger.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$url$2d$parser$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$url$2d$parser$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+url-parser@4.2.4/node_modules/@smithy/url-parser/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$base64$40$4$2e$3$2e$0$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$fromBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+util-base64@4.3.0/node_modules/@smithy/util-base64/dist-es/fromBase64.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$base64$40$4$2e$3$2e$0$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$toBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+util-base64@4.3.0/node_modules/@smithy/util-base64/dist-es/toBase64.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$utf8$40$4$2e$2$2e$0$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$fromUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+util-utf8@4.2.0/node_modules/@smithy/util-utf8/dist-es/fromUtf8.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$utf8$40$4$2e$2$2e$0$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$toUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+util-utf8@4.2.0/node_modules/@smithy/util-utf8/dist-es/toUtf8.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$auth$2f$httpAuthSchemeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/auth/httpAuthSchemeProvider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$endpointResolver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/endpoint/endpointResolver.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
const getRuntimeConfig = (config)=>{
    return {
        apiVersion: "2023-09-30",
        base64Decoder: config?.base64Decoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$base64$40$4$2e$3$2e$0$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$fromBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromBase64"],
        base64Encoder: config?.base64Encoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$base64$40$4$2e$3$2e$0$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$toBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toBase64"],
        disableHostPrefix: config?.disableHostPrefix ?? false,
        endpointProvider: config?.endpointProvider ?? __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$endpointResolver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultEndpointResolver"],
        extensions: config?.extensions ?? [],
        httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$auth$2f$httpAuthSchemeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultBedrockRuntimeHttpAuthSchemeProvider"],
        httpAuthSchemes: config?.httpAuthSchemes ?? [
            {
                schemeId: "aws.auth#sigv4",
                identityProvider: (ipc)=>ipc.getIdentityProvider("aws.auth#sigv4"),
                signer: new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$AwsSdkSigV4Signer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AwsSdkSigV4Signer"]()
            },
            {
                schemeId: "smithy.api#httpBearerAuth",
                identityProvider: (ipc)=>ipc.getIdentityProvider("smithy.api#httpBearerAuth"),
                signer: new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$util$2d$identity$2d$and$2d$auth$2f$httpAuthSchemes$2f$httpBearerAuth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpBearerAuthSigner"]()
            }
        ],
        logger: config?.logger ?? new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$NoOpLogger$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NoOpLogger"](),
        serviceId: config?.serviceId ?? "Bedrock Runtime",
        urlParser: config?.urlParser ?? __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$url$2d$parser$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$url$2d$parser$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseUrl"],
        utf8Decoder: config?.utf8Decoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$utf8$40$4$2e$2$2e$0$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$fromUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromUtf8"],
        utf8Encoder: config?.utf8Encoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$utf8$40$4$2e$2$2e$0$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$toUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toUtf8"]
    };
};
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/runtimeConfig.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRuntimeConfig",
    ()=>getRuntimeConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$package$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/package.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$AwsSdkSigV4Signer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+core@3.927.0/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/AwsSdkSigV4Signer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$NODE_AUTH_SCHEME_PREFERENCE_OPTIONS$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+core@3.927.0/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/NODE_AUTH_SCHEME_PREFERENCE_OPTIONS.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$emitWarningIfUnsupportedVersion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+core@3.927.0/node_modules/@aws-sdk/core/dist-es/submodules/client/emitWarningIfUnsupportedVersion.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$node$2f$dist$2d$es$2f$defaultProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+credential-provider-node@3.927.0/node_modules/@aws-sdk/credential-provider-node/dist-es/defaultProvider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$eventstream$2d$handler$2d$node$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$eventstream$2d$handler$2d$node$2f$dist$2d$es$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+eventstream-handler-node@3.922.0/node_modules/@aws-sdk/eventstream-handler-node/dist-es/provider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$token$2d$providers$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$token$2d$providers$2f$dist$2d$es$2f$fromEnvSigningName$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+token-providers@3.927.0/node_modules/@aws-sdk/token-providers/dist-es/fromEnvSigningName.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$token$2d$providers$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$token$2d$providers$2f$dist$2d$es$2f$nodeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+token-providers@3.927.0/node_modules/@aws-sdk/token-providers/dist-es/nodeProvider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$util$2d$user$2d$agent$2d$node$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$nodeAppIdConfigOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+util-user-agent-node@3.927.0/node_modules/@aws-sdk/util-user-agent-node/dist-es/nodeAppIdConfigOptions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$util$2d$user$2d$agent$2d$node$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$defaultUserAgent$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+util-user-agent-node@3.927.0/node_modules/@aws-sdk/util-user-agent-node/dist-es/defaultUserAgent.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$config$2d$resolver$40$4$2e$4$2e$2$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+config-resolver@4.4.2/node_modules/@smithy/config-resolver/dist-es/regionConfig/config.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$config$2d$resolver$40$4$2e$4$2e$2$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$endpointsConfig$2f$NodeUseDualstackEndpointConfigOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+config-resolver@4.4.2/node_modules/@smithy/config-resolver/dist-es/endpointsConfig/NodeUseDualstackEndpointConfigOptions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$config$2d$resolver$40$4$2e$4$2e$2$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$endpointsConfig$2f$NodeUseFipsEndpointConfigOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+config-resolver@4.4.2/node_modules/@smithy/config-resolver/dist-es/endpointsConfig/NodeUseFipsEndpointConfigOptions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$util$2d$identity$2d$and$2d$auth$2f$httpAuthSchemes$2f$httpBearerAuth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+core@3.17.2/node_modules/@smithy/core/dist-es/util-identity-and-auth/httpAuthSchemes/httpBearerAuth.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$eventstream$2d$serde$2d$node$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$eventstream$2d$serde$2d$node$2f$dist$2d$es$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+eventstream-serde-node@4.2.4/node_modules/@smithy/eventstream-serde-node/dist-es/provider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$hash$2d$node$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$hash$2d$node$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+hash-node@4.2.4/node_modules/@smithy/hash-node/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$retry$40$4$2e$4$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+middleware-retry@4.4.6/node_modules/@smithy/middleware-retry/dist-es/configurations.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$node$2d$config$2d$provider$40$4$2e$3$2e$4$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+node-config-provider@4.3.4/node_modules/@smithy/node-config-provider/dist-es/configLoader.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$node$2d$http$2d$handler$40$4$2e$4$2e$4$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$node$2d$http2$2d$handler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+node-http-handler@4.4.4/node_modules/@smithy/node-http-handler/dist-es/node-http2-handler.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$node$2d$http$2d$handler$40$4$2e$4$2e$4$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$stream$2d$collector$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+node-http-handler@4.4.4/node_modules/@smithy/node-http-handler/dist-es/stream-collector/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$body$2d$length$2d$node$40$4$2e$2$2e$1$2f$node_modules$2f40$smithy$2f$util$2d$body$2d$length$2d$node$2f$dist$2d$es$2f$calculateBodyLength$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+util-body-length-node@4.2.1/node_modules/@smithy/util-body-length-node/dist-es/calculateBodyLength.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$retry$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+util-retry@4.2.4/node_modules/@smithy/util-retry/dist-es/config.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$runtimeConfig$2e$shared$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/runtimeConfig.shared.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$defaults$2d$mode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/defaults-mode.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$defaults$2d$mode$2d$node$40$4$2e$2$2e$8$2f$node_modules$2f40$smithy$2f$util$2d$defaults$2d$mode$2d$node$2f$dist$2d$es$2f$resolveDefaultsModeConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+util-defaults-mode-node@4.2.8/node_modules/@smithy/util-defaults-mode-node/dist-es/resolveDefaultsModeConfig.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$emitWarningIfUnsupportedVersion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/emitWarningIfUnsupportedVersion.js [app-route] (ecmascript)");
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
;
const getRuntimeConfig = (config)=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$emitWarningIfUnsupportedVersion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["emitWarningIfUnsupportedVersion"])(process.version);
    const defaultsMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$defaults$2d$mode$2d$node$40$4$2e$2$2e$8$2f$node_modules$2f40$smithy$2f$util$2d$defaults$2d$mode$2d$node$2f$dist$2d$es$2f$resolveDefaultsModeConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveDefaultsModeConfig"])(config);
    const defaultConfigProvider = ()=>defaultsMode().then(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$defaults$2d$mode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfigsForDefaultMode"]);
    const clientSharedValues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$runtimeConfig$2e$shared$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRuntimeConfig"])(config);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$emitWarningIfUnsupportedVersion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["emitWarningIfUnsupportedVersion"])(process.version);
    const loaderConfig = {
        profile: config?.profile,
        logger: clientSharedValues.logger,
        signingName: "bedrock"
    };
    return {
        ...clientSharedValues,
        ...config,
        runtime: "node",
        defaultsMode,
        authSchemePreference: config?.authSchemePreference ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$node$2d$config$2d$provider$40$4$2e$3$2e$4$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$NODE_AUTH_SCHEME_PREFERENCE_OPTIONS$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_AUTH_SCHEME_PREFERENCE_OPTIONS"], loaderConfig),
        bodyLengthChecker: config?.bodyLengthChecker ?? __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$body$2d$length$2d$node$40$4$2e$2$2e$1$2f$node_modules$2f40$smithy$2f$util$2d$body$2d$length$2d$node$2f$dist$2d$es$2f$calculateBodyLength$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateBodyLength"],
        credentialDefaultProvider: config?.credentialDefaultProvider ?? __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$node$2f$dist$2d$es$2f$defaultProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultProvider"],
        defaultUserAgentProvider: config?.defaultUserAgentProvider ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$util$2d$user$2d$agent$2d$node$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$defaultUserAgent$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createDefaultUserAgentProvider"])({
            serviceId: clientSharedValues.serviceId,
            clientVersion: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$package$2e$json__$28$json$29$__["default"].version
        }),
        eventStreamPayloadHandlerProvider: config?.eventStreamPayloadHandlerProvider ?? __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$eventstream$2d$handler$2d$node$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$eventstream$2d$handler$2d$node$2f$dist$2d$es$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eventStreamPayloadHandlerProvider"],
        eventStreamSerdeProvider: config?.eventStreamSerdeProvider ?? __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$eventstream$2d$serde$2d$node$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$eventstream$2d$serde$2d$node$2f$dist$2d$es$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eventStreamSerdeProvider"],
        httpAuthSchemes: config?.httpAuthSchemes ?? [
            {
                schemeId: "aws.auth#sigv4",
                identityProvider: (ipc)=>ipc.getIdentityProvider("aws.auth#sigv4"),
                signer: new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$AwsSdkSigV4Signer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AwsSdkSigV4Signer"]()
            },
            {
                schemeId: "smithy.api#httpBearerAuth",
                identityProvider: (ipc)=>ipc.getIdentityProvider("smithy.api#httpBearerAuth") || (async (idProps)=>{
                        try {
                            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$token$2d$providers$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$token$2d$providers$2f$dist$2d$es$2f$fromEnvSigningName$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromEnvSigningName"])({
                                signingName: "bedrock"
                            })();
                        } catch (error) {
                            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$token$2d$providers$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$token$2d$providers$2f$dist$2d$es$2f$nodeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["nodeProvider"])(idProps)(idProps);
                        }
                    }),
                signer: new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$util$2d$identity$2d$and$2d$auth$2f$httpAuthSchemes$2f$httpBearerAuth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpBearerAuthSigner"]()
            }
        ],
        maxAttempts: config?.maxAttempts ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$node$2d$config$2d$provider$40$4$2e$3$2e$4$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$retry$40$4$2e$4$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_MAX_ATTEMPT_CONFIG_OPTIONS"], config),
        region: config?.region ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$node$2d$config$2d$provider$40$4$2e$3$2e$4$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$config$2d$resolver$40$4$2e$4$2e$2$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_REGION_CONFIG_OPTIONS"], {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$config$2d$resolver$40$4$2e$4$2e$2$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_REGION_CONFIG_FILE_OPTIONS"],
            ...loaderConfig
        }),
        requestHandler: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$node$2d$http$2d$handler$40$4$2e$4$2e$4$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$node$2d$http2$2d$handler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NodeHttp2Handler"].create(config?.requestHandler ?? (async ()=>({
                ...await defaultConfigProvider(),
                disableConcurrentStreams: true
            }))),
        retryMode: config?.retryMode ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$node$2d$config$2d$provider$40$4$2e$3$2e$4$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfig"])({
            ...__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$retry$40$4$2e$4$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_RETRY_MODE_CONFIG_OPTIONS"],
            default: async ()=>(await defaultConfigProvider()).retryMode || __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$retry$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_RETRY_MODE"]
        }, config),
        sha256: config?.sha256 ?? __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$hash$2d$node$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$hash$2d$node$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Hash"].bind(null, "sha256"),
        streamCollector: config?.streamCollector ?? __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$node$2d$http$2d$handler$40$4$2e$4$2e$4$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$stream$2d$collector$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["streamCollector"],
        useDualstackEndpoint: config?.useDualstackEndpoint ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$node$2d$config$2d$provider$40$4$2e$3$2e$4$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$config$2d$resolver$40$4$2e$4$2e$2$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$endpointsConfig$2f$NodeUseDualstackEndpointConfigOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS"], loaderConfig),
        useFipsEndpoint: config?.useFipsEndpoint ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$node$2d$config$2d$provider$40$4$2e$3$2e$4$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$config$2d$resolver$40$4$2e$4$2e$2$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$endpointsConfig$2f$NodeUseFipsEndpointConfigOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS"], loaderConfig),
        userAgentAppId: config?.userAgentAppId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$node$2d$config$2d$provider$40$4$2e$3$2e$4$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$util$2d$user$2d$agent$2d$node$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$nodeAppIdConfigOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_APP_ID_CONFIG_OPTIONS"], loaderConfig)
    };
};
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/auth/httpAuthExtensionConfiguration.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getHttpAuthExtensionConfiguration",
    ()=>getHttpAuthExtensionConfiguration,
    "resolveHttpAuthRuntimeConfig",
    ()=>resolveHttpAuthRuntimeConfig
]);
const getHttpAuthExtensionConfiguration = (runtimeConfig)=>{
    const _httpAuthSchemes = runtimeConfig.httpAuthSchemes;
    let _httpAuthSchemeProvider = runtimeConfig.httpAuthSchemeProvider;
    let _credentials = runtimeConfig.credentials;
    let _token = runtimeConfig.token;
    return {
        setHttpAuthScheme (httpAuthScheme) {
            const index = _httpAuthSchemes.findIndex((scheme)=>scheme.schemeId === httpAuthScheme.schemeId);
            if (index === -1) {
                _httpAuthSchemes.push(httpAuthScheme);
            } else {
                _httpAuthSchemes.splice(index, 1, httpAuthScheme);
            }
        },
        httpAuthSchemes () {
            return _httpAuthSchemes;
        },
        setHttpAuthSchemeProvider (httpAuthSchemeProvider) {
            _httpAuthSchemeProvider = httpAuthSchemeProvider;
        },
        httpAuthSchemeProvider () {
            return _httpAuthSchemeProvider;
        },
        setCredentials (credentials) {
            _credentials = credentials;
        },
        credentials () {
            return _credentials;
        },
        setToken (token) {
            _token = token;
        },
        token () {
            return _token;
        }
    };
};
const resolveHttpAuthRuntimeConfig = (config)=>{
    return {
        httpAuthSchemes: config.httpAuthSchemes(),
        httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
        credentials: config.credentials(),
        token: config.token()
    };
};
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/runtimeExtensions.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveRuntimeExtensions",
    ()=>resolveRuntimeExtensions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$region$2d$config$2d$resolver$40$3$2e$925$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$region$2d$config$2d$resolver$2f$dist$2d$es$2f$extensions$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+region-config-resolver@3.925.0/node_modules/@aws-sdk/region-config-resolver/dist-es/extensions/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$protocol$2d$http$40$5$2e$3$2e$4$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$extensions$2f$httpExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+protocol-http@5.3.4/node_modules/@smithy/protocol-http/dist-es/extensions/httpExtensionConfiguration.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$extensions$2f$defaultExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/extensions/defaultExtensionConfiguration.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$auth$2f$httpAuthExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/auth/httpAuthExtensionConfiguration.js [app-route] (ecmascript)");
;
;
;
;
const resolveRuntimeExtensions = (runtimeConfig, extensions)=>{
    const extensionConfiguration = Object.assign((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$region$2d$config$2d$resolver$40$3$2e$925$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$region$2d$config$2d$resolver$2f$dist$2d$es$2f$extensions$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAwsRegionExtensionConfiguration"])(runtimeConfig), (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$extensions$2f$defaultExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultExtensionConfiguration"])(runtimeConfig), (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$protocol$2d$http$40$5$2e$3$2e$4$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$extensions$2f$httpExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHttpHandlerExtensionConfiguration"])(runtimeConfig), (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$auth$2f$httpAuthExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHttpAuthExtensionConfiguration"])(runtimeConfig));
    extensions.forEach((extension)=>extension.configure(extensionConfiguration));
    return Object.assign(runtimeConfig, (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$region$2d$config$2d$resolver$40$3$2e$925$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$region$2d$config$2d$resolver$2f$dist$2d$es$2f$extensions$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveAwsRegionExtensionConfiguration"])(extensionConfiguration), (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$extensions$2f$defaultExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveDefaultRuntimeConfig"])(extensionConfiguration), (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$protocol$2d$http$40$5$2e$3$2e$4$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$extensions$2f$httpExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveHttpHandlerRuntimeConfig"])(extensionConfiguration), (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$auth$2f$httpAuthExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveHttpAuthRuntimeConfig"])(extensionConfiguration));
};
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/BedrockRuntimeClient.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BedrockRuntimeClient",
    ()=>BedrockRuntimeClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$eventstream$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$eventstream$2f$dist$2d$es$2f$eventStreamConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+middleware-eventstream@3.922.0/node_modules/@aws-sdk/middleware-eventstream/dist-es/eventStreamConfiguration.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$host$2d$header$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$host$2d$header$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+middleware-host-header@3.922.0/node_modules/@aws-sdk/middleware-host-header/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$logger$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$logger$2f$dist$2d$es$2f$loggerMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+middleware-logger@3.922.0/node_modules/@aws-sdk/middleware-logger/dist-es/loggerMiddleware.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$recursion$2d$detection$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$recursion$2d$detection$2f$dist$2d$es$2f$getRecursionDetectionPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+middleware-recursion-detection@3.922.0/node_modules/@aws-sdk/middleware-recursion-detection/dist-es/getRecursionDetectionPlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$user$2d$agent$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$user$2d$agent$2d$middleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+middleware-user-agent@3.927.0/node_modules/@aws-sdk/middleware-user-agent/dist-es/user-agent-middleware.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$user$2d$agent$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+middleware-user-agent@3.927.0/node_modules/@aws-sdk/middleware-user-agent/dist-es/configurations.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$websocket$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$websocket$2f$dist$2d$es$2f$websocket$2d$configuration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+middleware-websocket@3.922.0/node_modules/@aws-sdk/middleware-websocket/dist-es/websocket-configuration.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$config$2d$resolver$40$4$2e$4$2e$2$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$resolveRegionConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+config-resolver@4.4.2/node_modules/@smithy/config-resolver/dist-es/regionConfig/resolveRegionConfig.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$util$2d$identity$2d$and$2d$auth$2f$DefaultIdentityProviderConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+core@3.17.2/node_modules/@smithy/core/dist-es/util-identity-and-auth/DefaultIdentityProviderConfig.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$middleware$2d$http$2d$auth$2d$scheme$2f$getHttpAuthSchemeEndpointRuleSetPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+core@3.17.2/node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/getHttpAuthSchemeEndpointRuleSetPlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$middleware$2d$http$2d$signing$2f$getHttpSigningMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+core@3.17.2/node_modules/@smithy/core/dist-es/middleware-http-signing/getHttpSigningMiddleware.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$eventstream$2d$serde$2d$config$2d$resolver$40$4$2e$3$2e$4$2f$node_modules$2f40$smithy$2f$eventstream$2d$serde$2d$config$2d$resolver$2f$dist$2d$es$2f$EventStreamSerdeConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+eventstream-serde-config-resolver@4.3.4/node_modules/@smithy/eventstream-serde-config-resolver/dist-es/EventStreamSerdeConfig.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$content$2d$length$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$middleware$2d$content$2d$length$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+middleware-content-length@4.2.4/node_modules/@smithy/middleware-content-length/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$endpoint$40$4$2e$3$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$resolveEndpointConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+middleware-endpoint@4.3.6/node_modules/@smithy/middleware-endpoint/dist-es/resolveEndpointConfig.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$retry$40$4$2e$4$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$retryMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+middleware-retry@4.4.6/node_modules/@smithy/middleware-retry/dist-es/retryMiddleware.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$retry$40$4$2e$4$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+middleware-retry@4.4.6/node_modules/@smithy/middleware-retry/dist-es/configurations.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/client.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$auth$2f$httpAuthSchemeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/auth/httpAuthSchemeProvider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/endpoint/EndpointParameters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$runtimeConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/runtimeConfig.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$runtimeExtensions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/runtimeExtensions.js [app-route] (ecmascript)");
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
class BedrockRuntimeClient extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Client"] {
    config;
    constructor(...[configuration]){
        const _config_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$runtimeConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRuntimeConfig"])(configuration || {});
        super(_config_0);
        this.initConfig = _config_0;
        const _config_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveClientEndpointParameters"])(_config_0);
        const _config_2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$user$2d$agent$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveUserAgentConfig"])(_config_1);
        const _config_3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$retry$40$4$2e$4$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveRetryConfig"])(_config_2);
        const _config_4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$config$2d$resolver$40$4$2e$4$2e$2$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$resolveRegionConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveRegionConfig"])(_config_3);
        const _config_5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$host$2d$header$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$host$2d$header$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveHostHeaderConfig"])(_config_4);
        const _config_6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$endpoint$40$4$2e$3$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$resolveEndpointConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveEndpointConfig"])(_config_5);
        const _config_7 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$eventstream$2d$serde$2d$config$2d$resolver$40$4$2e$3$2e$4$2f$node_modules$2f40$smithy$2f$eventstream$2d$serde$2d$config$2d$resolver$2f$dist$2d$es$2f$EventStreamSerdeConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveEventStreamSerdeConfig"])(_config_6);
        const _config_8 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$auth$2f$httpAuthSchemeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveHttpAuthSchemeConfig"])(_config_7);
        const _config_9 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$eventstream$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$eventstream$2f$dist$2d$es$2f$eventStreamConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveEventStreamConfig"])(_config_8);
        const _config_10 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$websocket$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$websocket$2f$dist$2d$es$2f$websocket$2d$configuration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveWebSocketConfig"])(_config_9);
        const _config_11 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$runtimeExtensions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveRuntimeExtensions"])(_config_10, configuration?.extensions || []);
        this.config = _config_11;
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$user$2d$agent$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$user$2d$agent$2d$middleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUserAgentPlugin"])(this.config));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$retry$40$4$2e$4$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$retryMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRetryPlugin"])(this.config));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$content$2d$length$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$middleware$2d$content$2d$length$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getContentLengthPlugin"])(this.config));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$host$2d$header$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$host$2d$header$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHostHeaderPlugin"])(this.config));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$logger$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$logger$2f$dist$2d$es$2f$loggerMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLoggerPlugin"])(this.config));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$recursion$2d$detection$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$recursion$2d$detection$2f$dist$2d$es$2f$getRecursionDetectionPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRecursionDetectionPlugin"])(this.config));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$middleware$2d$http$2d$auth$2d$scheme$2f$getHttpAuthSchemeEndpointRuleSetPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHttpAuthSchemeEndpointRuleSetPlugin"])(this.config, {
            httpAuthSchemeParametersProvider: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$auth$2f$httpAuthSchemeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultBedrockRuntimeHttpAuthSchemeParametersProvider"],
            identityProviderConfigProvider: async (config)=>new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$util$2d$identity$2d$and$2d$auth$2f$DefaultIdentityProviderConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DefaultIdentityProviderConfig"]({
                    "aws.auth#sigv4": config.credentials,
                    "smithy.api#httpBearerAuth": config.token
                })
        }));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$middleware$2d$http$2d$signing$2f$getHttpSigningMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHttpSigningPlugin"])(this.config));
    }
    destroy() {
        super.destroy();
    }
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/BedrockRuntimeClient.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BedrockRuntimeClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$BedrockRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockRuntimeClient"],
    "__Client",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Client"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$BedrockRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/BedrockRuntimeClient.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/client.js [app-route] (ecmascript)");
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/models/BedrockRuntimeServiceException.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BedrockRuntimeServiceException",
    ()=>BedrockRuntimeServiceException
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/exceptions.js [app-route] (ecmascript)");
;
;
class BedrockRuntimeServiceException extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ServiceException"] {
    constructor(options){
        super(options);
        Object.setPrototypeOf(this, BedrockRuntimeServiceException.prototype);
    }
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/models/models_0.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AccessDeniedException",
    ()=>AccessDeniedException,
    "ApplyGuardrailRequestFilterSensitiveLog",
    ()=>ApplyGuardrailRequestFilterSensitiveLog,
    "ApplyGuardrailResponseFilterSensitiveLog",
    ()=>ApplyGuardrailResponseFilterSensitiveLog,
    "AsyncInvokeOutputDataConfig",
    ()=>AsyncInvokeOutputDataConfig,
    "AsyncInvokeStatus",
    ()=>AsyncInvokeStatus,
    "AsyncInvokeSummaryFilterSensitiveLog",
    ()=>AsyncInvokeSummaryFilterSensitiveLog,
    "BidirectionalInputPayloadPartFilterSensitiveLog",
    ()=>BidirectionalInputPayloadPartFilterSensitiveLog,
    "BidirectionalOutputPayloadPartFilterSensitiveLog",
    ()=>BidirectionalOutputPayloadPartFilterSensitiveLog,
    "CachePointType",
    ()=>CachePointType,
    "CitationGeneratedContent",
    ()=>CitationGeneratedContent,
    "CitationLocation",
    ()=>CitationLocation,
    "CitationSourceContent",
    ()=>CitationSourceContent,
    "ConflictException",
    ()=>ConflictException,
    "ContentBlock",
    ()=>ContentBlock,
    "ContentBlockDelta",
    ()=>ContentBlockDelta,
    "ContentBlockDeltaEventFilterSensitiveLog",
    ()=>ContentBlockDeltaEventFilterSensitiveLog,
    "ContentBlockDeltaFilterSensitiveLog",
    ()=>ContentBlockDeltaFilterSensitiveLog,
    "ContentBlockFilterSensitiveLog",
    ()=>ContentBlockFilterSensitiveLog,
    "ContentBlockStart",
    ()=>ContentBlockStart,
    "ConversationRole",
    ()=>ConversationRole,
    "ConverseOutput",
    ()=>ConverseOutput,
    "ConverseOutputFilterSensitiveLog",
    ()=>ConverseOutputFilterSensitiveLog,
    "ConverseRequestFilterSensitiveLog",
    ()=>ConverseRequestFilterSensitiveLog,
    "ConverseResponseFilterSensitiveLog",
    ()=>ConverseResponseFilterSensitiveLog,
    "ConverseStreamMetadataEventFilterSensitiveLog",
    ()=>ConverseStreamMetadataEventFilterSensitiveLog,
    "ConverseStreamOutput",
    ()=>ConverseStreamOutput,
    "ConverseStreamOutputFilterSensitiveLog",
    ()=>ConverseStreamOutputFilterSensitiveLog,
    "ConverseStreamRequestFilterSensitiveLog",
    ()=>ConverseStreamRequestFilterSensitiveLog,
    "ConverseStreamResponseFilterSensitiveLog",
    ()=>ConverseStreamResponseFilterSensitiveLog,
    "ConverseStreamTraceFilterSensitiveLog",
    ()=>ConverseStreamTraceFilterSensitiveLog,
    "ConverseTokensRequestFilterSensitiveLog",
    ()=>ConverseTokensRequestFilterSensitiveLog,
    "ConverseTraceFilterSensitiveLog",
    ()=>ConverseTraceFilterSensitiveLog,
    "CountTokensInput",
    ()=>CountTokensInput,
    "CountTokensInputFilterSensitiveLog",
    ()=>CountTokensInputFilterSensitiveLog,
    "CountTokensRequestFilterSensitiveLog",
    ()=>CountTokensRequestFilterSensitiveLog,
    "DocumentContentBlock",
    ()=>DocumentContentBlock,
    "DocumentFormat",
    ()=>DocumentFormat,
    "DocumentSource",
    ()=>DocumentSource,
    "GetAsyncInvokeResponseFilterSensitiveLog",
    ()=>GetAsyncInvokeResponseFilterSensitiveLog,
    "GuardrailAction",
    ()=>GuardrailAction,
    "GuardrailAssessmentFilterSensitiveLog",
    ()=>GuardrailAssessmentFilterSensitiveLog,
    "GuardrailAutomatedReasoningFinding",
    ()=>GuardrailAutomatedReasoningFinding,
    "GuardrailAutomatedReasoningFindingFilterSensitiveLog",
    ()=>GuardrailAutomatedReasoningFindingFilterSensitiveLog,
    "GuardrailAutomatedReasoningImpossibleFindingFilterSensitiveLog",
    ()=>GuardrailAutomatedReasoningImpossibleFindingFilterSensitiveLog,
    "GuardrailAutomatedReasoningInputTextReferenceFilterSensitiveLog",
    ()=>GuardrailAutomatedReasoningInputTextReferenceFilterSensitiveLog,
    "GuardrailAutomatedReasoningInvalidFindingFilterSensitiveLog",
    ()=>GuardrailAutomatedReasoningInvalidFindingFilterSensitiveLog,
    "GuardrailAutomatedReasoningLogicWarningFilterSensitiveLog",
    ()=>GuardrailAutomatedReasoningLogicWarningFilterSensitiveLog,
    "GuardrailAutomatedReasoningLogicWarningType",
    ()=>GuardrailAutomatedReasoningLogicWarningType,
    "GuardrailAutomatedReasoningPolicyAssessmentFilterSensitiveLog",
    ()=>GuardrailAutomatedReasoningPolicyAssessmentFilterSensitiveLog,
    "GuardrailAutomatedReasoningSatisfiableFindingFilterSensitiveLog",
    ()=>GuardrailAutomatedReasoningSatisfiableFindingFilterSensitiveLog,
    "GuardrailAutomatedReasoningScenarioFilterSensitiveLog",
    ()=>GuardrailAutomatedReasoningScenarioFilterSensitiveLog,
    "GuardrailAutomatedReasoningStatementFilterSensitiveLog",
    ()=>GuardrailAutomatedReasoningStatementFilterSensitiveLog,
    "GuardrailAutomatedReasoningTranslationAmbiguousFindingFilterSensitiveLog",
    ()=>GuardrailAutomatedReasoningTranslationAmbiguousFindingFilterSensitiveLog,
    "GuardrailAutomatedReasoningTranslationFilterSensitiveLog",
    ()=>GuardrailAutomatedReasoningTranslationFilterSensitiveLog,
    "GuardrailAutomatedReasoningTranslationOptionFilterSensitiveLog",
    ()=>GuardrailAutomatedReasoningTranslationOptionFilterSensitiveLog,
    "GuardrailAutomatedReasoningValidFindingFilterSensitiveLog",
    ()=>GuardrailAutomatedReasoningValidFindingFilterSensitiveLog,
    "GuardrailContentBlock",
    ()=>GuardrailContentBlock,
    "GuardrailContentBlockFilterSensitiveLog",
    ()=>GuardrailContentBlockFilterSensitiveLog,
    "GuardrailContentFilterConfidence",
    ()=>GuardrailContentFilterConfidence,
    "GuardrailContentFilterStrength",
    ()=>GuardrailContentFilterStrength,
    "GuardrailContentFilterType",
    ()=>GuardrailContentFilterType,
    "GuardrailContentPolicyAction",
    ()=>GuardrailContentPolicyAction,
    "GuardrailContentQualifier",
    ()=>GuardrailContentQualifier,
    "GuardrailContentSource",
    ()=>GuardrailContentSource,
    "GuardrailContextualGroundingFilterType",
    ()=>GuardrailContextualGroundingFilterType,
    "GuardrailContextualGroundingPolicyAction",
    ()=>GuardrailContextualGroundingPolicyAction,
    "GuardrailConverseContentBlock",
    ()=>GuardrailConverseContentBlock,
    "GuardrailConverseContentBlockFilterSensitiveLog",
    ()=>GuardrailConverseContentBlockFilterSensitiveLog,
    "GuardrailConverseContentQualifier",
    ()=>GuardrailConverseContentQualifier,
    "GuardrailConverseImageBlockFilterSensitiveLog",
    ()=>GuardrailConverseImageBlockFilterSensitiveLog,
    "GuardrailConverseImageFormat",
    ()=>GuardrailConverseImageFormat,
    "GuardrailConverseImageSource",
    ()=>GuardrailConverseImageSource,
    "GuardrailConverseImageSourceFilterSensitiveLog",
    ()=>GuardrailConverseImageSourceFilterSensitiveLog,
    "GuardrailImageBlockFilterSensitiveLog",
    ()=>GuardrailImageBlockFilterSensitiveLog,
    "GuardrailImageFormat",
    ()=>GuardrailImageFormat,
    "GuardrailImageSource",
    ()=>GuardrailImageSource,
    "GuardrailImageSourceFilterSensitiveLog",
    ()=>GuardrailImageSourceFilterSensitiveLog,
    "GuardrailManagedWordType",
    ()=>GuardrailManagedWordType,
    "GuardrailOutputScope",
    ()=>GuardrailOutputScope,
    "GuardrailPiiEntityType",
    ()=>GuardrailPiiEntityType,
    "GuardrailSensitiveInformationPolicyAction",
    ()=>GuardrailSensitiveInformationPolicyAction,
    "GuardrailStreamProcessingMode",
    ()=>GuardrailStreamProcessingMode,
    "GuardrailTopicPolicyAction",
    ()=>GuardrailTopicPolicyAction,
    "GuardrailTopicType",
    ()=>GuardrailTopicType,
    "GuardrailTrace",
    ()=>GuardrailTrace,
    "GuardrailTraceAssessmentFilterSensitiveLog",
    ()=>GuardrailTraceAssessmentFilterSensitiveLog,
    "GuardrailWordPolicyAction",
    ()=>GuardrailWordPolicyAction,
    "ImageFormat",
    ()=>ImageFormat,
    "ImageSource",
    ()=>ImageSource,
    "InternalServerException",
    ()=>InternalServerException,
    "InvokeModelRequestFilterSensitiveLog",
    ()=>InvokeModelRequestFilterSensitiveLog,
    "InvokeModelResponseFilterSensitiveLog",
    ()=>InvokeModelResponseFilterSensitiveLog,
    "InvokeModelTokensRequestFilterSensitiveLog",
    ()=>InvokeModelTokensRequestFilterSensitiveLog,
    "InvokeModelWithBidirectionalStreamInput",
    ()=>InvokeModelWithBidirectionalStreamInput,
    "InvokeModelWithBidirectionalStreamInputFilterSensitiveLog",
    ()=>InvokeModelWithBidirectionalStreamInputFilterSensitiveLog,
    "InvokeModelWithBidirectionalStreamOutput",
    ()=>InvokeModelWithBidirectionalStreamOutput,
    "InvokeModelWithBidirectionalStreamOutputFilterSensitiveLog",
    ()=>InvokeModelWithBidirectionalStreamOutputFilterSensitiveLog,
    "InvokeModelWithBidirectionalStreamRequestFilterSensitiveLog",
    ()=>InvokeModelWithBidirectionalStreamRequestFilterSensitiveLog,
    "InvokeModelWithBidirectionalStreamResponseFilterSensitiveLog",
    ()=>InvokeModelWithBidirectionalStreamResponseFilterSensitiveLog,
    "InvokeModelWithResponseStreamRequestFilterSensitiveLog",
    ()=>InvokeModelWithResponseStreamRequestFilterSensitiveLog,
    "InvokeModelWithResponseStreamResponseFilterSensitiveLog",
    ()=>InvokeModelWithResponseStreamResponseFilterSensitiveLog,
    "ListAsyncInvokesResponseFilterSensitiveLog",
    ()=>ListAsyncInvokesResponseFilterSensitiveLog,
    "MessageFilterSensitiveLog",
    ()=>MessageFilterSensitiveLog,
    "ModelErrorException",
    ()=>ModelErrorException,
    "ModelNotReadyException",
    ()=>ModelNotReadyException,
    "ModelStreamErrorException",
    ()=>ModelStreamErrorException,
    "ModelTimeoutException",
    ()=>ModelTimeoutException,
    "PayloadPartFilterSensitiveLog",
    ()=>PayloadPartFilterSensitiveLog,
    "PerformanceConfigLatency",
    ()=>PerformanceConfigLatency,
    "PromptVariableValues",
    ()=>PromptVariableValues,
    "ReasoningContentBlock",
    ()=>ReasoningContentBlock,
    "ReasoningContentBlockDelta",
    ()=>ReasoningContentBlockDelta,
    "ReasoningContentBlockDeltaFilterSensitiveLog",
    ()=>ReasoningContentBlockDeltaFilterSensitiveLog,
    "ReasoningContentBlockFilterSensitiveLog",
    ()=>ReasoningContentBlockFilterSensitiveLog,
    "ReasoningTextBlockFilterSensitiveLog",
    ()=>ReasoningTextBlockFilterSensitiveLog,
    "ResourceNotFoundException",
    ()=>ResourceNotFoundException,
    "ResponseStream",
    ()=>ResponseStream,
    "ResponseStreamFilterSensitiveLog",
    ()=>ResponseStreamFilterSensitiveLog,
    "ServiceQuotaExceededException",
    ()=>ServiceQuotaExceededException,
    "ServiceUnavailableException",
    ()=>ServiceUnavailableException,
    "SortAsyncInvocationBy",
    ()=>SortAsyncInvocationBy,
    "SortOrder",
    ()=>SortOrder,
    "StartAsyncInvokeRequestFilterSensitiveLog",
    ()=>StartAsyncInvokeRequestFilterSensitiveLog,
    "StopReason",
    ()=>StopReason,
    "SystemContentBlock",
    ()=>SystemContentBlock,
    "SystemContentBlockFilterSensitiveLog",
    ()=>SystemContentBlockFilterSensitiveLog,
    "ThrottlingException",
    ()=>ThrottlingException,
    "Tool",
    ()=>Tool,
    "ToolChoice",
    ()=>ToolChoice,
    "ToolInputSchema",
    ()=>ToolInputSchema,
    "ToolResultBlockDelta",
    ()=>ToolResultBlockDelta,
    "ToolResultContentBlock",
    ()=>ToolResultContentBlock,
    "ToolResultStatus",
    ()=>ToolResultStatus,
    "ToolUseType",
    ()=>ToolUseType,
    "Trace",
    ()=>Trace,
    "ValidationException",
    ()=>ValidationException,
    "VideoFormat",
    ()=>VideoFormat,
    "VideoSource",
    ()=>VideoSource
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/constants.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$BedrockRuntimeServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/models/BedrockRuntimeServiceException.js [app-route] (ecmascript) <locals>");
;
;
class AccessDeniedException extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$BedrockRuntimeServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockRuntimeServiceException"] {
    name = "AccessDeniedException";
    $fault = "client";
    constructor(opts){
        super({
            name: "AccessDeniedException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, AccessDeniedException.prototype);
    }
}
var AsyncInvokeOutputDataConfig;
(function(AsyncInvokeOutputDataConfig) {
    AsyncInvokeOutputDataConfig.visit = (value, visitor)=>{
        if (value.s3OutputDataConfig !== undefined) return visitor.s3OutputDataConfig(value.s3OutputDataConfig);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(AsyncInvokeOutputDataConfig || (AsyncInvokeOutputDataConfig = {}));
const AsyncInvokeStatus = {
    COMPLETED: "Completed",
    FAILED: "Failed",
    IN_PROGRESS: "InProgress"
};
class InternalServerException extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$BedrockRuntimeServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockRuntimeServiceException"] {
    name = "InternalServerException";
    $fault = "server";
    constructor(opts){
        super({
            name: "InternalServerException",
            $fault: "server",
            ...opts
        });
        Object.setPrototypeOf(this, InternalServerException.prototype);
    }
}
class ThrottlingException extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$BedrockRuntimeServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockRuntimeServiceException"] {
    name = "ThrottlingException";
    $fault = "client";
    constructor(opts){
        super({
            name: "ThrottlingException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, ThrottlingException.prototype);
    }
}
class ValidationException extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$BedrockRuntimeServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockRuntimeServiceException"] {
    name = "ValidationException";
    $fault = "client";
    constructor(opts){
        super({
            name: "ValidationException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, ValidationException.prototype);
    }
}
const SortAsyncInvocationBy = {
    SUBMISSION_TIME: "SubmissionTime"
};
const SortOrder = {
    ASCENDING: "Ascending",
    DESCENDING: "Descending"
};
class ConflictException extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$BedrockRuntimeServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockRuntimeServiceException"] {
    name = "ConflictException";
    $fault = "client";
    constructor(opts){
        super({
            name: "ConflictException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, ConflictException.prototype);
    }
}
class ResourceNotFoundException extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$BedrockRuntimeServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockRuntimeServiceException"] {
    name = "ResourceNotFoundException";
    $fault = "client";
    constructor(opts){
        super({
            name: "ResourceNotFoundException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, ResourceNotFoundException.prototype);
    }
}
class ServiceQuotaExceededException extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$BedrockRuntimeServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockRuntimeServiceException"] {
    name = "ServiceQuotaExceededException";
    $fault = "client";
    constructor(opts){
        super({
            name: "ServiceQuotaExceededException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, ServiceQuotaExceededException.prototype);
    }
}
class ServiceUnavailableException extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$BedrockRuntimeServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockRuntimeServiceException"] {
    name = "ServiceUnavailableException";
    $fault = "server";
    constructor(opts){
        super({
            name: "ServiceUnavailableException",
            $fault: "server",
            ...opts
        });
        Object.setPrototypeOf(this, ServiceUnavailableException.prototype);
    }
}
const GuardrailImageFormat = {
    JPEG: "jpeg",
    PNG: "png"
};
var GuardrailImageSource;
(function(GuardrailImageSource) {
    GuardrailImageSource.visit = (value, visitor)=>{
        if (value.bytes !== undefined) return visitor.bytes(value.bytes);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(GuardrailImageSource || (GuardrailImageSource = {}));
const GuardrailContentQualifier = {
    GROUNDING_SOURCE: "grounding_source",
    GUARD_CONTENT: "guard_content",
    QUERY: "query"
};
var GuardrailContentBlock;
(function(GuardrailContentBlock) {
    GuardrailContentBlock.visit = (value, visitor)=>{
        if (value.text !== undefined) return visitor.text(value.text);
        if (value.image !== undefined) return visitor.image(value.image);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(GuardrailContentBlock || (GuardrailContentBlock = {}));
const GuardrailOutputScope = {
    FULL: "FULL",
    INTERVENTIONS: "INTERVENTIONS"
};
const GuardrailContentSource = {
    INPUT: "INPUT",
    OUTPUT: "OUTPUT"
};
const GuardrailAction = {
    GUARDRAIL_INTERVENED: "GUARDRAIL_INTERVENED",
    NONE: "NONE"
};
const GuardrailAutomatedReasoningLogicWarningType = {
    ALWAYS_FALSE: "ALWAYS_FALSE",
    ALWAYS_TRUE: "ALWAYS_TRUE"
};
var GuardrailAutomatedReasoningFinding;
(function(GuardrailAutomatedReasoningFinding) {
    GuardrailAutomatedReasoningFinding.visit = (value, visitor)=>{
        if (value.valid !== undefined) return visitor.valid(value.valid);
        if (value.invalid !== undefined) return visitor.invalid(value.invalid);
        if (value.satisfiable !== undefined) return visitor.satisfiable(value.satisfiable);
        if (value.impossible !== undefined) return visitor.impossible(value.impossible);
        if (value.translationAmbiguous !== undefined) return visitor.translationAmbiguous(value.translationAmbiguous);
        if (value.tooComplex !== undefined) return visitor.tooComplex(value.tooComplex);
        if (value.noTranslations !== undefined) return visitor.noTranslations(value.noTranslations);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(GuardrailAutomatedReasoningFinding || (GuardrailAutomatedReasoningFinding = {}));
const GuardrailContentPolicyAction = {
    BLOCKED: "BLOCKED",
    NONE: "NONE"
};
const GuardrailContentFilterConfidence = {
    HIGH: "HIGH",
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    NONE: "NONE"
};
const GuardrailContentFilterStrength = {
    HIGH: "HIGH",
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    NONE: "NONE"
};
const GuardrailContentFilterType = {
    HATE: "HATE",
    INSULTS: "INSULTS",
    MISCONDUCT: "MISCONDUCT",
    PROMPT_ATTACK: "PROMPT_ATTACK",
    SEXUAL: "SEXUAL",
    VIOLENCE: "VIOLENCE"
};
const GuardrailContextualGroundingPolicyAction = {
    BLOCKED: "BLOCKED",
    NONE: "NONE"
};
const GuardrailContextualGroundingFilterType = {
    GROUNDING: "GROUNDING",
    RELEVANCE: "RELEVANCE"
};
const GuardrailSensitiveInformationPolicyAction = {
    ANONYMIZED: "ANONYMIZED",
    BLOCKED: "BLOCKED",
    NONE: "NONE"
};
const GuardrailPiiEntityType = {
    ADDRESS: "ADDRESS",
    AGE: "AGE",
    AWS_ACCESS_KEY: "AWS_ACCESS_KEY",
    AWS_SECRET_KEY: "AWS_SECRET_KEY",
    CA_HEALTH_NUMBER: "CA_HEALTH_NUMBER",
    CA_SOCIAL_INSURANCE_NUMBER: "CA_SOCIAL_INSURANCE_NUMBER",
    CREDIT_DEBIT_CARD_CVV: "CREDIT_DEBIT_CARD_CVV",
    CREDIT_DEBIT_CARD_EXPIRY: "CREDIT_DEBIT_CARD_EXPIRY",
    CREDIT_DEBIT_CARD_NUMBER: "CREDIT_DEBIT_CARD_NUMBER",
    DRIVER_ID: "DRIVER_ID",
    EMAIL: "EMAIL",
    INTERNATIONAL_BANK_ACCOUNT_NUMBER: "INTERNATIONAL_BANK_ACCOUNT_NUMBER",
    IP_ADDRESS: "IP_ADDRESS",
    LICENSE_PLATE: "LICENSE_PLATE",
    MAC_ADDRESS: "MAC_ADDRESS",
    NAME: "NAME",
    PASSWORD: "PASSWORD",
    PHONE: "PHONE",
    PIN: "PIN",
    SWIFT_CODE: "SWIFT_CODE",
    UK_NATIONAL_HEALTH_SERVICE_NUMBER: "UK_NATIONAL_HEALTH_SERVICE_NUMBER",
    UK_NATIONAL_INSURANCE_NUMBER: "UK_NATIONAL_INSURANCE_NUMBER",
    UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER: "UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER",
    URL: "URL",
    USERNAME: "USERNAME",
    US_BANK_ACCOUNT_NUMBER: "US_BANK_ACCOUNT_NUMBER",
    US_BANK_ROUTING_NUMBER: "US_BANK_ROUTING_NUMBER",
    US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER: "US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER",
    US_PASSPORT_NUMBER: "US_PASSPORT_NUMBER",
    US_SOCIAL_SECURITY_NUMBER: "US_SOCIAL_SECURITY_NUMBER",
    VEHICLE_IDENTIFICATION_NUMBER: "VEHICLE_IDENTIFICATION_NUMBER"
};
const GuardrailTopicPolicyAction = {
    BLOCKED: "BLOCKED",
    NONE: "NONE"
};
const GuardrailTopicType = {
    DENY: "DENY"
};
const GuardrailWordPolicyAction = {
    BLOCKED: "BLOCKED",
    NONE: "NONE"
};
const GuardrailManagedWordType = {
    PROFANITY: "PROFANITY"
};
const GuardrailTrace = {
    DISABLED: "disabled",
    ENABLED: "enabled",
    ENABLED_FULL: "enabled_full"
};
const CachePointType = {
    DEFAULT: "default"
};
var CitationLocation;
(function(CitationLocation) {
    CitationLocation.visit = (value, visitor)=>{
        if (value.web !== undefined) return visitor.web(value.web);
        if (value.documentChar !== undefined) return visitor.documentChar(value.documentChar);
        if (value.documentPage !== undefined) return visitor.documentPage(value.documentPage);
        if (value.documentChunk !== undefined) return visitor.documentChunk(value.documentChunk);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(CitationLocation || (CitationLocation = {}));
var CitationSourceContent;
(function(CitationSourceContent) {
    CitationSourceContent.visit = (value, visitor)=>{
        if (value.text !== undefined) return visitor.text(value.text);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(CitationSourceContent || (CitationSourceContent = {}));
var CitationGeneratedContent;
(function(CitationGeneratedContent) {
    CitationGeneratedContent.visit = (value, visitor)=>{
        if (value.text !== undefined) return visitor.text(value.text);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(CitationGeneratedContent || (CitationGeneratedContent = {}));
const DocumentFormat = {
    CSV: "csv",
    DOC: "doc",
    DOCX: "docx",
    HTML: "html",
    MD: "md",
    PDF: "pdf",
    TXT: "txt",
    XLS: "xls",
    XLSX: "xlsx"
};
var DocumentContentBlock;
(function(DocumentContentBlock) {
    DocumentContentBlock.visit = (value, visitor)=>{
        if (value.text !== undefined) return visitor.text(value.text);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(DocumentContentBlock || (DocumentContentBlock = {}));
var DocumentSource;
(function(DocumentSource) {
    DocumentSource.visit = (value, visitor)=>{
        if (value.bytes !== undefined) return visitor.bytes(value.bytes);
        if (value.s3Location !== undefined) return visitor.s3Location(value.s3Location);
        if (value.text !== undefined) return visitor.text(value.text);
        if (value.content !== undefined) return visitor.content(value.content);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(DocumentSource || (DocumentSource = {}));
const GuardrailConverseImageFormat = {
    JPEG: "jpeg",
    PNG: "png"
};
var GuardrailConverseImageSource;
(function(GuardrailConverseImageSource) {
    GuardrailConverseImageSource.visit = (value, visitor)=>{
        if (value.bytes !== undefined) return visitor.bytes(value.bytes);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(GuardrailConverseImageSource || (GuardrailConverseImageSource = {}));
const GuardrailConverseContentQualifier = {
    GROUNDING_SOURCE: "grounding_source",
    GUARD_CONTENT: "guard_content",
    QUERY: "query"
};
var GuardrailConverseContentBlock;
(function(GuardrailConverseContentBlock) {
    GuardrailConverseContentBlock.visit = (value, visitor)=>{
        if (value.text !== undefined) return visitor.text(value.text);
        if (value.image !== undefined) return visitor.image(value.image);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(GuardrailConverseContentBlock || (GuardrailConverseContentBlock = {}));
const ImageFormat = {
    GIF: "gif",
    JPEG: "jpeg",
    PNG: "png",
    WEBP: "webp"
};
var ImageSource;
(function(ImageSource) {
    ImageSource.visit = (value, visitor)=>{
        if (value.bytes !== undefined) return visitor.bytes(value.bytes);
        if (value.s3Location !== undefined) return visitor.s3Location(value.s3Location);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(ImageSource || (ImageSource = {}));
var ReasoningContentBlock;
(function(ReasoningContentBlock) {
    ReasoningContentBlock.visit = (value, visitor)=>{
        if (value.reasoningText !== undefined) return visitor.reasoningText(value.reasoningText);
        if (value.redactedContent !== undefined) return visitor.redactedContent(value.redactedContent);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(ReasoningContentBlock || (ReasoningContentBlock = {}));
const VideoFormat = {
    FLV: "flv",
    MKV: "mkv",
    MOV: "mov",
    MP4: "mp4",
    MPEG: "mpeg",
    MPG: "mpg",
    THREE_GP: "three_gp",
    WEBM: "webm",
    WMV: "wmv"
};
var VideoSource;
(function(VideoSource) {
    VideoSource.visit = (value, visitor)=>{
        if (value.bytes !== undefined) return visitor.bytes(value.bytes);
        if (value.s3Location !== undefined) return visitor.s3Location(value.s3Location);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(VideoSource || (VideoSource = {}));
var ToolResultContentBlock;
(function(ToolResultContentBlock) {
    ToolResultContentBlock.visit = (value, visitor)=>{
        if (value.json !== undefined) return visitor.json(value.json);
        if (value.text !== undefined) return visitor.text(value.text);
        if (value.image !== undefined) return visitor.image(value.image);
        if (value.document !== undefined) return visitor.document(value.document);
        if (value.video !== undefined) return visitor.video(value.video);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(ToolResultContentBlock || (ToolResultContentBlock = {}));
const ToolResultStatus = {
    ERROR: "error",
    SUCCESS: "success"
};
const ToolUseType = {
    SERVER_TOOL_USE: "server_tool_use"
};
var ContentBlock;
(function(ContentBlock) {
    ContentBlock.visit = (value, visitor)=>{
        if (value.text !== undefined) return visitor.text(value.text);
        if (value.image !== undefined) return visitor.image(value.image);
        if (value.document !== undefined) return visitor.document(value.document);
        if (value.video !== undefined) return visitor.video(value.video);
        if (value.toolUse !== undefined) return visitor.toolUse(value.toolUse);
        if (value.toolResult !== undefined) return visitor.toolResult(value.toolResult);
        if (value.guardContent !== undefined) return visitor.guardContent(value.guardContent);
        if (value.cachePoint !== undefined) return visitor.cachePoint(value.cachePoint);
        if (value.reasoningContent !== undefined) return visitor.reasoningContent(value.reasoningContent);
        if (value.citationsContent !== undefined) return visitor.citationsContent(value.citationsContent);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(ContentBlock || (ContentBlock = {}));
const ConversationRole = {
    ASSISTANT: "assistant",
    USER: "user"
};
const PerformanceConfigLatency = {
    OPTIMIZED: "optimized",
    STANDARD: "standard"
};
var PromptVariableValues;
(function(PromptVariableValues) {
    PromptVariableValues.visit = (value, visitor)=>{
        if (value.text !== undefined) return visitor.text(value.text);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(PromptVariableValues || (PromptVariableValues = {}));
var SystemContentBlock;
(function(SystemContentBlock) {
    SystemContentBlock.visit = (value, visitor)=>{
        if (value.text !== undefined) return visitor.text(value.text);
        if (value.guardContent !== undefined) return visitor.guardContent(value.guardContent);
        if (value.cachePoint !== undefined) return visitor.cachePoint(value.cachePoint);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(SystemContentBlock || (SystemContentBlock = {}));
var ToolChoice;
(function(ToolChoice) {
    ToolChoice.visit = (value, visitor)=>{
        if (value.auto !== undefined) return visitor.auto(value.auto);
        if (value.any !== undefined) return visitor.any(value.any);
        if (value.tool !== undefined) return visitor.tool(value.tool);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(ToolChoice || (ToolChoice = {}));
var ToolInputSchema;
(function(ToolInputSchema) {
    ToolInputSchema.visit = (value, visitor)=>{
        if (value.json !== undefined) return visitor.json(value.json);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(ToolInputSchema || (ToolInputSchema = {}));
var Tool;
(function(Tool) {
    Tool.visit = (value, visitor)=>{
        if (value.toolSpec !== undefined) return visitor.toolSpec(value.toolSpec);
        if (value.systemTool !== undefined) return visitor.systemTool(value.systemTool);
        if (value.cachePoint !== undefined) return visitor.cachePoint(value.cachePoint);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(Tool || (Tool = {}));
var ConverseOutput;
(function(ConverseOutput) {
    ConverseOutput.visit = (value, visitor)=>{
        if (value.message !== undefined) return visitor.message(value.message);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(ConverseOutput || (ConverseOutput = {}));
const StopReason = {
    CONTENT_FILTERED: "content_filtered",
    END_TURN: "end_turn",
    GUARDRAIL_INTERVENED: "guardrail_intervened",
    MAX_TOKENS: "max_tokens",
    MODEL_CONTEXT_WINDOW_EXCEEDED: "model_context_window_exceeded",
    STOP_SEQUENCE: "stop_sequence",
    TOOL_USE: "tool_use"
};
class ModelErrorException extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$BedrockRuntimeServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockRuntimeServiceException"] {
    name = "ModelErrorException";
    $fault = "client";
    originalStatusCode;
    resourceName;
    constructor(opts){
        super({
            name: "ModelErrorException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, ModelErrorException.prototype);
        this.originalStatusCode = opts.originalStatusCode;
        this.resourceName = opts.resourceName;
    }
}
class ModelNotReadyException extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$BedrockRuntimeServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockRuntimeServiceException"] {
    name = "ModelNotReadyException";
    $fault = "client";
    $retryable = {};
    constructor(opts){
        super({
            name: "ModelNotReadyException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, ModelNotReadyException.prototype);
    }
}
class ModelTimeoutException extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$BedrockRuntimeServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockRuntimeServiceException"] {
    name = "ModelTimeoutException";
    $fault = "client";
    constructor(opts){
        super({
            name: "ModelTimeoutException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, ModelTimeoutException.prototype);
    }
}
const GuardrailStreamProcessingMode = {
    ASYNC: "async",
    SYNC: "sync"
};
var ReasoningContentBlockDelta;
(function(ReasoningContentBlockDelta) {
    ReasoningContentBlockDelta.visit = (value, visitor)=>{
        if (value.text !== undefined) return visitor.text(value.text);
        if (value.redactedContent !== undefined) return visitor.redactedContent(value.redactedContent);
        if (value.signature !== undefined) return visitor.signature(value.signature);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(ReasoningContentBlockDelta || (ReasoningContentBlockDelta = {}));
var ToolResultBlockDelta;
(function(ToolResultBlockDelta) {
    ToolResultBlockDelta.visit = (value, visitor)=>{
        if (value.text !== undefined) return visitor.text(value.text);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(ToolResultBlockDelta || (ToolResultBlockDelta = {}));
var ContentBlockDelta;
(function(ContentBlockDelta) {
    ContentBlockDelta.visit = (value, visitor)=>{
        if (value.text !== undefined) return visitor.text(value.text);
        if (value.toolUse !== undefined) return visitor.toolUse(value.toolUse);
        if (value.toolResult !== undefined) return visitor.toolResult(value.toolResult);
        if (value.reasoningContent !== undefined) return visitor.reasoningContent(value.reasoningContent);
        if (value.citation !== undefined) return visitor.citation(value.citation);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(ContentBlockDelta || (ContentBlockDelta = {}));
var ContentBlockStart;
(function(ContentBlockStart) {
    ContentBlockStart.visit = (value, visitor)=>{
        if (value.toolUse !== undefined) return visitor.toolUse(value.toolUse);
        if (value.toolResult !== undefined) return visitor.toolResult(value.toolResult);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(ContentBlockStart || (ContentBlockStart = {}));
class ModelStreamErrorException extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$BedrockRuntimeServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockRuntimeServiceException"] {
    name = "ModelStreamErrorException";
    $fault = "client";
    originalStatusCode;
    originalMessage;
    constructor(opts){
        super({
            name: "ModelStreamErrorException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, ModelStreamErrorException.prototype);
        this.originalStatusCode = opts.originalStatusCode;
        this.originalMessage = opts.originalMessage;
    }
}
var ConverseStreamOutput;
(function(ConverseStreamOutput) {
    ConverseStreamOutput.visit = (value, visitor)=>{
        if (value.messageStart !== undefined) return visitor.messageStart(value.messageStart);
        if (value.contentBlockStart !== undefined) return visitor.contentBlockStart(value.contentBlockStart);
        if (value.contentBlockDelta !== undefined) return visitor.contentBlockDelta(value.contentBlockDelta);
        if (value.contentBlockStop !== undefined) return visitor.contentBlockStop(value.contentBlockStop);
        if (value.messageStop !== undefined) return visitor.messageStop(value.messageStop);
        if (value.metadata !== undefined) return visitor.metadata(value.metadata);
        if (value.internalServerException !== undefined) return visitor.internalServerException(value.internalServerException);
        if (value.modelStreamErrorException !== undefined) return visitor.modelStreamErrorException(value.modelStreamErrorException);
        if (value.validationException !== undefined) return visitor.validationException(value.validationException);
        if (value.throttlingException !== undefined) return visitor.throttlingException(value.throttlingException);
        if (value.serviceUnavailableException !== undefined) return visitor.serviceUnavailableException(value.serviceUnavailableException);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(ConverseStreamOutput || (ConverseStreamOutput = {}));
const Trace = {
    DISABLED: "DISABLED",
    ENABLED: "ENABLED",
    ENABLED_FULL: "ENABLED_FULL"
};
var InvokeModelWithBidirectionalStreamInput;
(function(InvokeModelWithBidirectionalStreamInput) {
    InvokeModelWithBidirectionalStreamInput.visit = (value, visitor)=>{
        if (value.chunk !== undefined) return visitor.chunk(value.chunk);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(InvokeModelWithBidirectionalStreamInput || (InvokeModelWithBidirectionalStreamInput = {}));
var InvokeModelWithBidirectionalStreamOutput;
(function(InvokeModelWithBidirectionalStreamOutput) {
    InvokeModelWithBidirectionalStreamOutput.visit = (value, visitor)=>{
        if (value.chunk !== undefined) return visitor.chunk(value.chunk);
        if (value.internalServerException !== undefined) return visitor.internalServerException(value.internalServerException);
        if (value.modelStreamErrorException !== undefined) return visitor.modelStreamErrorException(value.modelStreamErrorException);
        if (value.validationException !== undefined) return visitor.validationException(value.validationException);
        if (value.throttlingException !== undefined) return visitor.throttlingException(value.throttlingException);
        if (value.modelTimeoutException !== undefined) return visitor.modelTimeoutException(value.modelTimeoutException);
        if (value.serviceUnavailableException !== undefined) return visitor.serviceUnavailableException(value.serviceUnavailableException);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(InvokeModelWithBidirectionalStreamOutput || (InvokeModelWithBidirectionalStreamOutput = {}));
var ResponseStream;
(function(ResponseStream) {
    ResponseStream.visit = (value, visitor)=>{
        if (value.chunk !== undefined) return visitor.chunk(value.chunk);
        if (value.internalServerException !== undefined) return visitor.internalServerException(value.internalServerException);
        if (value.modelStreamErrorException !== undefined) return visitor.modelStreamErrorException(value.modelStreamErrorException);
        if (value.validationException !== undefined) return visitor.validationException(value.validationException);
        if (value.throttlingException !== undefined) return visitor.throttlingException(value.throttlingException);
        if (value.modelTimeoutException !== undefined) return visitor.modelTimeoutException(value.modelTimeoutException);
        if (value.serviceUnavailableException !== undefined) return visitor.serviceUnavailableException(value.serviceUnavailableException);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(ResponseStream || (ResponseStream = {}));
var CountTokensInput;
(function(CountTokensInput) {
    CountTokensInput.visit = (value, visitor)=>{
        if (value.invokeModel !== undefined) return visitor.invokeModel(value.invokeModel);
        if (value.converse !== undefined) return visitor.converse(value.converse);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(CountTokensInput || (CountTokensInput = {}));
const GetAsyncInvokeResponseFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.failureMessage && {
            failureMessage: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        },
        ...obj.outputDataConfig && {
            outputDataConfig: obj.outputDataConfig
        }
    });
const AsyncInvokeSummaryFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.failureMessage && {
            failureMessage: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        },
        ...obj.outputDataConfig && {
            outputDataConfig: obj.outputDataConfig
        }
    });
const ListAsyncInvokesResponseFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.asyncInvokeSummaries && {
            asyncInvokeSummaries: obj.asyncInvokeSummaries.map((item)=>AsyncInvokeSummaryFilterSensitiveLog(item))
        }
    });
const StartAsyncInvokeRequestFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.modelInput && {
            modelInput: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        },
        ...obj.outputDataConfig && {
            outputDataConfig: obj.outputDataConfig
        }
    });
const GuardrailImageSourceFilterSensitiveLog = (obj)=>{
    if (obj.bytes !== undefined) return {
        bytes: obj.bytes
    };
    if (obj.$unknown !== undefined) return {
        [obj.$unknown[0]]: "UNKNOWN"
    };
};
const GuardrailImageBlockFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.source && {
            source: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        }
    });
const GuardrailContentBlockFilterSensitiveLog = (obj)=>{
    if (obj.text !== undefined) return {
        text: obj.text
    };
    if (obj.image !== undefined) return {
        image: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
    };
    if (obj.$unknown !== undefined) return {
        [obj.$unknown[0]]: "UNKNOWN"
    };
};
const ApplyGuardrailRequestFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.content && {
            content: obj.content.map((item)=>GuardrailContentBlockFilterSensitiveLog(item))
        }
    });
const GuardrailAutomatedReasoningStatementFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.logic && {
            logic: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        },
        ...obj.naturalLanguage && {
            naturalLanguage: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        }
    });
const GuardrailAutomatedReasoningLogicWarningFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.premises && {
            premises: obj.premises.map((item)=>GuardrailAutomatedReasoningStatementFilterSensitiveLog(item))
        },
        ...obj.claims && {
            claims: obj.claims.map((item)=>GuardrailAutomatedReasoningStatementFilterSensitiveLog(item))
        }
    });
const GuardrailAutomatedReasoningInputTextReferenceFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.text && {
            text: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        }
    });
const GuardrailAutomatedReasoningTranslationFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.premises && {
            premises: obj.premises.map((item)=>GuardrailAutomatedReasoningStatementFilterSensitiveLog(item))
        },
        ...obj.claims && {
            claims: obj.claims.map((item)=>GuardrailAutomatedReasoningStatementFilterSensitiveLog(item))
        },
        ...obj.untranslatedPremises && {
            untranslatedPremises: obj.untranslatedPremises.map((item)=>GuardrailAutomatedReasoningInputTextReferenceFilterSensitiveLog(item))
        },
        ...obj.untranslatedClaims && {
            untranslatedClaims: obj.untranslatedClaims.map((item)=>GuardrailAutomatedReasoningInputTextReferenceFilterSensitiveLog(item))
        }
    });
const GuardrailAutomatedReasoningImpossibleFindingFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.translation && {
            translation: GuardrailAutomatedReasoningTranslationFilterSensitiveLog(obj.translation)
        },
        ...obj.logicWarning && {
            logicWarning: GuardrailAutomatedReasoningLogicWarningFilterSensitiveLog(obj.logicWarning)
        }
    });
const GuardrailAutomatedReasoningInvalidFindingFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.translation && {
            translation: GuardrailAutomatedReasoningTranslationFilterSensitiveLog(obj.translation)
        },
        ...obj.logicWarning && {
            logicWarning: GuardrailAutomatedReasoningLogicWarningFilterSensitiveLog(obj.logicWarning)
        }
    });
const GuardrailAutomatedReasoningScenarioFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.statements && {
            statements: obj.statements.map((item)=>GuardrailAutomatedReasoningStatementFilterSensitiveLog(item))
        }
    });
const GuardrailAutomatedReasoningSatisfiableFindingFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.translation && {
            translation: GuardrailAutomatedReasoningTranslationFilterSensitiveLog(obj.translation)
        },
        ...obj.claimsTrueScenario && {
            claimsTrueScenario: GuardrailAutomatedReasoningScenarioFilterSensitiveLog(obj.claimsTrueScenario)
        },
        ...obj.claimsFalseScenario && {
            claimsFalseScenario: GuardrailAutomatedReasoningScenarioFilterSensitiveLog(obj.claimsFalseScenario)
        },
        ...obj.logicWarning && {
            logicWarning: GuardrailAutomatedReasoningLogicWarningFilterSensitiveLog(obj.logicWarning)
        }
    });
const GuardrailAutomatedReasoningTranslationOptionFilterSensitiveLog = (obj)=>({
        ...obj
    });
const GuardrailAutomatedReasoningTranslationAmbiguousFindingFilterSensitiveLog = (obj)=>({
        ...obj
    });
const GuardrailAutomatedReasoningValidFindingFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.translation && {
            translation: GuardrailAutomatedReasoningTranslationFilterSensitiveLog(obj.translation)
        },
        ...obj.claimsTrueScenario && {
            claimsTrueScenario: GuardrailAutomatedReasoningScenarioFilterSensitiveLog(obj.claimsTrueScenario)
        },
        ...obj.logicWarning && {
            logicWarning: GuardrailAutomatedReasoningLogicWarningFilterSensitiveLog(obj.logicWarning)
        }
    });
const GuardrailAutomatedReasoningFindingFilterSensitiveLog = (obj)=>{
    if (obj.valid !== undefined) return {
        valid: GuardrailAutomatedReasoningValidFindingFilterSensitiveLog(obj.valid)
    };
    if (obj.invalid !== undefined) return {
        invalid: GuardrailAutomatedReasoningInvalidFindingFilterSensitiveLog(obj.invalid)
    };
    if (obj.satisfiable !== undefined) return {
        satisfiable: GuardrailAutomatedReasoningSatisfiableFindingFilterSensitiveLog(obj.satisfiable)
    };
    if (obj.impossible !== undefined) return {
        impossible: GuardrailAutomatedReasoningImpossibleFindingFilterSensitiveLog(obj.impossible)
    };
    if (obj.translationAmbiguous !== undefined) return {
        translationAmbiguous: GuardrailAutomatedReasoningTranslationAmbiguousFindingFilterSensitiveLog(obj.translationAmbiguous)
    };
    if (obj.tooComplex !== undefined) return {
        tooComplex: obj.tooComplex
    };
    if (obj.noTranslations !== undefined) return {
        noTranslations: obj.noTranslations
    };
    if (obj.$unknown !== undefined) return {
        [obj.$unknown[0]]: "UNKNOWN"
    };
};
const GuardrailAutomatedReasoningPolicyAssessmentFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.findings && {
            findings: obj.findings.map((item)=>GuardrailAutomatedReasoningFindingFilterSensitiveLog(item))
        }
    });
const GuardrailAssessmentFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.automatedReasoningPolicy && {
            automatedReasoningPolicy: GuardrailAutomatedReasoningPolicyAssessmentFilterSensitiveLog(obj.automatedReasoningPolicy)
        }
    });
const ApplyGuardrailResponseFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.assessments && {
            assessments: obj.assessments.map((item)=>GuardrailAssessmentFilterSensitiveLog(item))
        }
    });
const GuardrailConverseImageSourceFilterSensitiveLog = (obj)=>{
    if (obj.bytes !== undefined) return {
        bytes: obj.bytes
    };
    if (obj.$unknown !== undefined) return {
        [obj.$unknown[0]]: "UNKNOWN"
    };
};
const GuardrailConverseImageBlockFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.source && {
            source: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        }
    });
const GuardrailConverseContentBlockFilterSensitiveLog = (obj)=>{
    if (obj.text !== undefined) return {
        text: obj.text
    };
    if (obj.image !== undefined) return {
        image: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
    };
    if (obj.$unknown !== undefined) return {
        [obj.$unknown[0]]: "UNKNOWN"
    };
};
const ReasoningTextBlockFilterSensitiveLog = (obj)=>({
        ...obj
    });
const ReasoningContentBlockFilterSensitiveLog = (obj)=>{
    if (obj.reasoningText !== undefined) return {
        reasoningText: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
    };
    if (obj.redactedContent !== undefined) return {
        redactedContent: obj.redactedContent
    };
    if (obj.$unknown !== undefined) return {
        [obj.$unknown[0]]: "UNKNOWN"
    };
};
const ContentBlockFilterSensitiveLog = (obj)=>{
    if (obj.text !== undefined) return {
        text: obj.text
    };
    if (obj.image !== undefined) return {
        image: obj.image
    };
    if (obj.document !== undefined) return {
        document: obj.document
    };
    if (obj.video !== undefined) return {
        video: obj.video
    };
    if (obj.toolUse !== undefined) return {
        toolUse: obj.toolUse
    };
    if (obj.toolResult !== undefined) return {
        toolResult: obj.toolResult
    };
    if (obj.guardContent !== undefined) return {
        guardContent: GuardrailConverseContentBlockFilterSensitiveLog(obj.guardContent)
    };
    if (obj.cachePoint !== undefined) return {
        cachePoint: obj.cachePoint
    };
    if (obj.reasoningContent !== undefined) return {
        reasoningContent: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
    };
    if (obj.citationsContent !== undefined) return {
        citationsContent: obj.citationsContent
    };
    if (obj.$unknown !== undefined) return {
        [obj.$unknown[0]]: "UNKNOWN"
    };
};
const MessageFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.content && {
            content: obj.content.map((item)=>ContentBlockFilterSensitiveLog(item))
        }
    });
const SystemContentBlockFilterSensitiveLog = (obj)=>{
    if (obj.text !== undefined) return {
        text: obj.text
    };
    if (obj.guardContent !== undefined) return {
        guardContent: GuardrailConverseContentBlockFilterSensitiveLog(obj.guardContent)
    };
    if (obj.cachePoint !== undefined) return {
        cachePoint: obj.cachePoint
    };
    if (obj.$unknown !== undefined) return {
        [obj.$unknown[0]]: "UNKNOWN"
    };
};
const ConverseRequestFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.messages && {
            messages: obj.messages.map((item)=>MessageFilterSensitiveLog(item))
        },
        ...obj.system && {
            system: obj.system.map((item)=>SystemContentBlockFilterSensitiveLog(item))
        },
        ...obj.toolConfig && {
            toolConfig: obj.toolConfig
        },
        ...obj.promptVariables && {
            promptVariables: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        },
        ...obj.requestMetadata && {
            requestMetadata: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        }
    });
const ConverseOutputFilterSensitiveLog = (obj)=>{
    if (obj.message !== undefined) return {
        message: MessageFilterSensitiveLog(obj.message)
    };
    if (obj.$unknown !== undefined) return {
        [obj.$unknown[0]]: "UNKNOWN"
    };
};
const GuardrailTraceAssessmentFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.inputAssessment && {
            inputAssessment: Object.entries(obj.inputAssessment).reduce((acc, [key, value])=>(acc[key] = GuardrailAssessmentFilterSensitiveLog(value), acc), {})
        },
        ...obj.outputAssessments && {
            outputAssessments: Object.entries(obj.outputAssessments).reduce((acc, [key, value])=>(acc[key] = value.map((item)=>GuardrailAssessmentFilterSensitiveLog(item)), acc), {})
        }
    });
const ConverseTraceFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.guardrail && {
            guardrail: GuardrailTraceAssessmentFilterSensitiveLog(obj.guardrail)
        }
    });
const ConverseResponseFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.output && {
            output: ConverseOutputFilterSensitiveLog(obj.output)
        },
        ...obj.trace && {
            trace: ConverseTraceFilterSensitiveLog(obj.trace)
        }
    });
const ConverseStreamRequestFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.messages && {
            messages: obj.messages.map((item)=>MessageFilterSensitiveLog(item))
        },
        ...obj.system && {
            system: obj.system.map((item)=>SystemContentBlockFilterSensitiveLog(item))
        },
        ...obj.toolConfig && {
            toolConfig: obj.toolConfig
        },
        ...obj.promptVariables && {
            promptVariables: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        },
        ...obj.requestMetadata && {
            requestMetadata: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        }
    });
const ReasoningContentBlockDeltaFilterSensitiveLog = (obj)=>{
    if (obj.text !== undefined) return {
        text: obj.text
    };
    if (obj.redactedContent !== undefined) return {
        redactedContent: obj.redactedContent
    };
    if (obj.signature !== undefined) return {
        signature: obj.signature
    };
    if (obj.$unknown !== undefined) return {
        [obj.$unknown[0]]: "UNKNOWN"
    };
};
const ContentBlockDeltaFilterSensitiveLog = (obj)=>{
    if (obj.text !== undefined) return {
        text: obj.text
    };
    if (obj.toolUse !== undefined) return {
        toolUse: obj.toolUse
    };
    if (obj.toolResult !== undefined) return {
        toolResult: obj.toolResult.map((item)=>item)
    };
    if (obj.reasoningContent !== undefined) return {
        reasoningContent: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
    };
    if (obj.citation !== undefined) return {
        citation: obj.citation
    };
    if (obj.$unknown !== undefined) return {
        [obj.$unknown[0]]: "UNKNOWN"
    };
};
const ContentBlockDeltaEventFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.delta && {
            delta: ContentBlockDeltaFilterSensitiveLog(obj.delta)
        }
    });
const ConverseStreamTraceFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.guardrail && {
            guardrail: GuardrailTraceAssessmentFilterSensitiveLog(obj.guardrail)
        }
    });
const ConverseStreamMetadataEventFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.trace && {
            trace: ConverseStreamTraceFilterSensitiveLog(obj.trace)
        }
    });
const ConverseStreamOutputFilterSensitiveLog = (obj)=>{
    if (obj.messageStart !== undefined) return {
        messageStart: obj.messageStart
    };
    if (obj.contentBlockStart !== undefined) return {
        contentBlockStart: obj.contentBlockStart
    };
    if (obj.contentBlockDelta !== undefined) return {
        contentBlockDelta: ContentBlockDeltaEventFilterSensitiveLog(obj.contentBlockDelta)
    };
    if (obj.contentBlockStop !== undefined) return {
        contentBlockStop: obj.contentBlockStop
    };
    if (obj.messageStop !== undefined) return {
        messageStop: obj.messageStop
    };
    if (obj.metadata !== undefined) return {
        metadata: ConverseStreamMetadataEventFilterSensitiveLog(obj.metadata)
    };
    if (obj.internalServerException !== undefined) return {
        internalServerException: obj.internalServerException
    };
    if (obj.modelStreamErrorException !== undefined) return {
        modelStreamErrorException: obj.modelStreamErrorException
    };
    if (obj.validationException !== undefined) return {
        validationException: obj.validationException
    };
    if (obj.throttlingException !== undefined) return {
        throttlingException: obj.throttlingException
    };
    if (obj.serviceUnavailableException !== undefined) return {
        serviceUnavailableException: obj.serviceUnavailableException
    };
    if (obj.$unknown !== undefined) return {
        [obj.$unknown[0]]: "UNKNOWN"
    };
};
const ConverseStreamResponseFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.stream && {
            stream: "STREAMING_CONTENT"
        }
    });
const InvokeModelRequestFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.body && {
            body: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        }
    });
const InvokeModelResponseFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.body && {
            body: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        }
    });
const BidirectionalInputPayloadPartFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.bytes && {
            bytes: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        }
    });
const InvokeModelWithBidirectionalStreamInputFilterSensitiveLog = (obj)=>{
    if (obj.chunk !== undefined) return {
        chunk: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
    };
    if (obj.$unknown !== undefined) return {
        [obj.$unknown[0]]: "UNKNOWN"
    };
};
const InvokeModelWithBidirectionalStreamRequestFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.body && {
            body: "STREAMING_CONTENT"
        }
    });
const BidirectionalOutputPayloadPartFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.bytes && {
            bytes: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        }
    });
const InvokeModelWithBidirectionalStreamOutputFilterSensitiveLog = (obj)=>{
    if (obj.chunk !== undefined) return {
        chunk: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
    };
    if (obj.internalServerException !== undefined) return {
        internalServerException: obj.internalServerException
    };
    if (obj.modelStreamErrorException !== undefined) return {
        modelStreamErrorException: obj.modelStreamErrorException
    };
    if (obj.validationException !== undefined) return {
        validationException: obj.validationException
    };
    if (obj.throttlingException !== undefined) return {
        throttlingException: obj.throttlingException
    };
    if (obj.modelTimeoutException !== undefined) return {
        modelTimeoutException: obj.modelTimeoutException
    };
    if (obj.serviceUnavailableException !== undefined) return {
        serviceUnavailableException: obj.serviceUnavailableException
    };
    if (obj.$unknown !== undefined) return {
        [obj.$unknown[0]]: "UNKNOWN"
    };
};
const InvokeModelWithBidirectionalStreamResponseFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.body && {
            body: "STREAMING_CONTENT"
        }
    });
const InvokeModelWithResponseStreamRequestFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.body && {
            body: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        }
    });
const PayloadPartFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.bytes && {
            bytes: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        }
    });
const ResponseStreamFilterSensitiveLog = (obj)=>{
    if (obj.chunk !== undefined) return {
        chunk: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
    };
    if (obj.internalServerException !== undefined) return {
        internalServerException: obj.internalServerException
    };
    if (obj.modelStreamErrorException !== undefined) return {
        modelStreamErrorException: obj.modelStreamErrorException
    };
    if (obj.validationException !== undefined) return {
        validationException: obj.validationException
    };
    if (obj.throttlingException !== undefined) return {
        throttlingException: obj.throttlingException
    };
    if (obj.modelTimeoutException !== undefined) return {
        modelTimeoutException: obj.modelTimeoutException
    };
    if (obj.serviceUnavailableException !== undefined) return {
        serviceUnavailableException: obj.serviceUnavailableException
    };
    if (obj.$unknown !== undefined) return {
        [obj.$unknown[0]]: "UNKNOWN"
    };
};
const InvokeModelWithResponseStreamResponseFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.body && {
            body: "STREAMING_CONTENT"
        }
    });
const ConverseTokensRequestFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.messages && {
            messages: obj.messages.map((item)=>MessageFilterSensitiveLog(item))
        },
        ...obj.system && {
            system: obj.system.map((item)=>SystemContentBlockFilterSensitiveLog(item))
        }
    });
const InvokeModelTokensRequestFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.body && {
            body: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        }
    });
const CountTokensInputFilterSensitiveLog = (obj)=>{
    if (obj.invokeModel !== undefined) return {
        invokeModel: InvokeModelTokensRequestFilterSensitiveLog(obj.invokeModel)
    };
    if (obj.converse !== undefined) return {
        converse: ConverseTokensRequestFilterSensitiveLog(obj.converse)
    };
    if (obj.$unknown !== undefined) return {
        [obj.$unknown[0]]: "UNKNOWN"
    };
};
const CountTokensRequestFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.input && {
            input: CountTokensInputFilterSensitiveLog(obj.input)
        }
    });
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/protocols/Aws_restJson1.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "de_ApplyGuardrailCommand",
    ()=>de_ApplyGuardrailCommand,
    "de_ConverseCommand",
    ()=>de_ConverseCommand,
    "de_ConverseStreamCommand",
    ()=>de_ConverseStreamCommand,
    "de_CountTokensCommand",
    ()=>de_CountTokensCommand,
    "de_GetAsyncInvokeCommand",
    ()=>de_GetAsyncInvokeCommand,
    "de_InvokeModelCommand",
    ()=>de_InvokeModelCommand,
    "de_InvokeModelWithBidirectionalStreamCommand",
    ()=>de_InvokeModelWithBidirectionalStreamCommand,
    "de_InvokeModelWithResponseStreamCommand",
    ()=>de_InvokeModelWithResponseStreamCommand,
    "de_ListAsyncInvokesCommand",
    ()=>de_ListAsyncInvokesCommand,
    "de_StartAsyncInvokeCommand",
    ()=>de_StartAsyncInvokeCommand,
    "se_ApplyGuardrailCommand",
    ()=>se_ApplyGuardrailCommand,
    "se_ConverseCommand",
    ()=>se_ConverseCommand,
    "se_ConverseStreamCommand",
    ()=>se_ConverseStreamCommand,
    "se_CountTokensCommand",
    ()=>se_CountTokensCommand,
    "se_GetAsyncInvokeCommand",
    ()=>se_GetAsyncInvokeCommand,
    "se_InvokeModelCommand",
    ()=>se_InvokeModelCommand,
    "se_InvokeModelWithBidirectionalStreamCommand",
    ()=>se_InvokeModelWithBidirectionalStreamCommand,
    "se_InvokeModelWithResponseStreamCommand",
    ()=>se_InvokeModelWithResponseStreamCommand,
    "se_ListAsyncInvokesCommand",
    ()=>se_ListAsyncInvokesCommand,
    "se_StartAsyncInvokeCommand",
    ()=>se_StartAsyncInvokeCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$awsExpectUnion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+core@3.927.0/node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/awsExpectUnion.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$parseJsonBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+core@3.927.0/node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/parseJsonBody.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$requestBuilder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+core@3.17.2/node_modules/@smithy/core/dist-es/submodules/protocols/requestBuilder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/serde-json.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$collect$2d$stream$2d$body$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+core@3.17.2/node_modules/@smithy/core/dist-es/submodules/protocols/collect-stream-body.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/exceptions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+core@3.17.2/node_modules/@smithy/core/dist-es/submodules/serde/parse-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$is$2d$serializable$2d$header$2d$value$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/is-serializable-header-value.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/object-mapping.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$date$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+core@3.17.2/node_modules/@smithy/core/dist-es/submodules/serde/date-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$ser$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/ser-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$default$2d$error$2d$handler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/default-error-handler.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$uuid$40$1$2e$1$2e$0$2f$node_modules$2f40$smithy$2f$uuid$2f$dist$2d$es$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+uuid@1.1.0/node_modules/@smithy/uuid/dist-es/v4.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$BedrockRuntimeServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/models/BedrockRuntimeServiceException.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/models/models_0.js [app-route] (ecmascript)");
;
;
;
;
;
;
const se_ApplyGuardrailCommand = async (input, context)=>{
    const b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$requestBuilder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requestBuilder"])(input, context);
    const headers = {
        "content-type": "application/json"
    };
    b.bp("/guardrail/{guardrailIdentifier}/version/{guardrailVersion}/apply");
    b.p("guardrailIdentifier", ()=>input.guardrailIdentifier, "{guardrailIdentifier}", false);
    b.p("guardrailVersion", ()=>input.guardrailVersion, "{guardrailVersion}", false);
    let body;
    body = JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(input, {
        content: (_)=>se_GuardrailContentBlockList(_, context),
        outputScope: [],
        source: []
    }));
    b.m("POST").h(headers).b(body);
    return b.build();
};
const se_ConverseCommand = async (input, context)=>{
    const b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$requestBuilder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requestBuilder"])(input, context);
    const headers = {
        "content-type": "application/json"
    };
    b.bp("/model/{modelId}/converse");
    b.p("modelId", ()=>input.modelId, "{modelId}", false);
    let body;
    body = JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(input, {
        additionalModelRequestFields: (_)=>se_Document(_, context),
        additionalModelResponseFieldPaths: (_)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(_),
        guardrailConfig: (_)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(_),
        inferenceConfig: (_)=>se_InferenceConfiguration(_, context),
        messages: (_)=>se_Messages(_, context),
        performanceConfig: (_)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(_),
        promptVariables: (_)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(_),
        requestMetadata: (_)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(_),
        system: (_)=>se_SystemContentBlocks(_, context),
        toolConfig: (_)=>se_ToolConfiguration(_, context)
    }));
    b.m("POST").h(headers).b(body);
    return b.build();
};
const se_ConverseStreamCommand = async (input, context)=>{
    const b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$requestBuilder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requestBuilder"])(input, context);
    const headers = {
        "content-type": "application/json"
    };
    b.bp("/model/{modelId}/converse-stream");
    b.p("modelId", ()=>input.modelId, "{modelId}", false);
    let body;
    body = JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(input, {
        additionalModelRequestFields: (_)=>se_Document(_, context),
        additionalModelResponseFieldPaths: (_)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(_),
        guardrailConfig: (_)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(_),
        inferenceConfig: (_)=>se_InferenceConfiguration(_, context),
        messages: (_)=>se_Messages(_, context),
        performanceConfig: (_)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(_),
        promptVariables: (_)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(_),
        requestMetadata: (_)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(_),
        system: (_)=>se_SystemContentBlocks(_, context),
        toolConfig: (_)=>se_ToolConfiguration(_, context)
    }));
    b.m("POST").h(headers).b(body);
    return b.build();
};
const se_CountTokensCommand = async (input, context)=>{
    const b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$requestBuilder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requestBuilder"])(input, context);
    const headers = {
        "content-type": "application/json"
    };
    b.bp("/model/{modelId}/count-tokens");
    b.p("modelId", ()=>input.modelId, "{modelId}", false);
    let body;
    body = JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(input, {
        input: (_)=>se_CountTokensInput(_, context)
    }));
    b.m("POST").h(headers).b(body);
    return b.build();
};
const se_GetAsyncInvokeCommand = async (input, context)=>{
    const b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$requestBuilder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requestBuilder"])(input, context);
    const headers = {};
    b.bp("/async-invoke/{invocationArn}");
    b.p("invocationArn", ()=>input.invocationArn, "{invocationArn}", false);
    let body;
    b.m("GET").h(headers).b(body);
    return b.build();
};
const se_InvokeModelCommand = async (input, context)=>{
    const b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$requestBuilder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requestBuilder"])(input, context);
    const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])({}, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$is$2d$serializable$2d$header$2d$value$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSerializableHeaderValue"], {
        [_ct]: input[_cT] || "application/octet-stream",
        [_a]: input[_a],
        [_xabt]: input[_t],
        [_xabg]: input[_gI],
        [_xabg_]: input[_gV],
        [_xabpl]: input[_pCL]
    });
    b.bp("/model/{modelId}/invoke");
    b.p("modelId", ()=>input.modelId, "{modelId}", false);
    let body;
    if (input.body !== undefined) {
        body = input.body;
    }
    b.m("POST").h(headers).b(body);
    return b.build();
};
const se_InvokeModelWithBidirectionalStreamCommand = async (input, context)=>{
    const b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$requestBuilder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requestBuilder"])(input, context);
    const headers = {
        "content-type": "application/json"
    };
    b.bp("/model/{modelId}/invoke-with-bidirectional-stream");
    b.p("modelId", ()=>input.modelId, "{modelId}", false);
    let body;
    if (input.body !== undefined) {
        body = se_InvokeModelWithBidirectionalStreamInput(input.body, context);
    }
    b.m("POST").h(headers).b(body);
    return b.build();
};
const se_InvokeModelWithResponseStreamCommand = async (input, context)=>{
    const b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$requestBuilder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requestBuilder"])(input, context);
    const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])({}, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$is$2d$serializable$2d$header$2d$value$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSerializableHeaderValue"], {
        [_ct]: input[_cT] || "application/octet-stream",
        [_xaba]: input[_a],
        [_xabt]: input[_t],
        [_xabg]: input[_gI],
        [_xabg_]: input[_gV],
        [_xabpl]: input[_pCL]
    });
    b.bp("/model/{modelId}/invoke-with-response-stream");
    b.p("modelId", ()=>input.modelId, "{modelId}", false);
    let body;
    if (input.body !== undefined) {
        body = input.body;
    }
    b.m("POST").h(headers).b(body);
    return b.build();
};
const se_ListAsyncInvokesCommand = async (input, context)=>{
    const b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$requestBuilder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requestBuilder"])(input, context);
    const headers = {};
    b.bp("/async-invoke");
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])({
        [_sTA]: [
            ()=>input.submitTimeAfter !== void 0,
            ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$ser$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serializeDateTime"])(input[_sTA]).toString()
        ],
        [_sTB]: [
            ()=>input.submitTimeBefore !== void 0,
            ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$ser$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serializeDateTime"])(input[_sTB]).toString()
        ],
        [_sE]: [
            ,
            input[_sE]
        ],
        [_mR]: [
            ()=>input.maxResults !== void 0,
            ()=>input[_mR].toString()
        ],
        [_nT]: [
            ,
            input[_nT]
        ],
        [_sB]: [
            ,
            input[_sB]
        ],
        [_sO]: [
            ,
            input[_sO]
        ]
    });
    let body;
    b.m("GET").h(headers).q(query).b(body);
    return b.build();
};
const se_StartAsyncInvokeCommand = async (input, context)=>{
    const b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$requestBuilder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requestBuilder"])(input, context);
    const headers = {
        "content-type": "application/json"
    };
    b.bp("/async-invoke");
    let body;
    body = JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(input, {
        clientRequestToken: [
            true,
            (_)=>_ ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$uuid$40$1$2e$1$2e$0$2f$node_modules$2f40$smithy$2f$uuid$2f$dist$2d$es$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v4"])()
        ],
        modelId: [],
        modelInput: (_)=>se_ModelInputPayload(_, context),
        outputDataConfig: (_)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(_),
        tags: (_)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(_)
    }));
    b.m("POST").h(headers).b(body);
    return b.build();
};
const de_ApplyGuardrailCommand = async (output, context)=>{
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])({
        $metadata: deserializeMetadata(output)
    });
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectNonNull"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectObject"])(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$parseJsonBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJsonBody"])(output.body, context)), "body");
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(data, {
        action: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        actionReason: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        assessments: (_)=>de_GuardrailAssessmentList(_, context),
        guardrailCoverage: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        outputs: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        usage: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"]
    });
    Object.assign(contents, doc);
    return contents;
};
const de_ConverseCommand = async (output, context)=>{
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])({
        $metadata: deserializeMetadata(output)
    });
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectNonNull"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectObject"])(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$parseJsonBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJsonBody"])(output.body, context)), "body");
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(data, {
        additionalModelResponseFields: (_)=>de_Document(_, context),
        metrics: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        output: (_)=>de_ConverseOutput((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$awsExpectUnion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awsExpectUnion"])(_), context),
        performanceConfig: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        stopReason: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        trace: (_)=>de_ConverseTrace(_, context),
        usage: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"]
    });
    Object.assign(contents, doc);
    return contents;
};
const de_ConverseStreamCommand = async (output, context)=>{
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])({
        $metadata: deserializeMetadata(output)
    });
    const data = output.body;
    contents.stream = de_ConverseStreamOutput(data, context);
    return contents;
};
const de_CountTokensCommand = async (output, context)=>{
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])({
        $metadata: deserializeMetadata(output)
    });
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectNonNull"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectObject"])(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$parseJsonBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJsonBody"])(output.body, context)), "body");
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(data, {
        inputTokens: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectInt32"]
    });
    Object.assign(contents, doc);
    return contents;
};
const de_GetAsyncInvokeCommand = async (output, context)=>{
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])({
        $metadata: deserializeMetadata(output)
    });
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectNonNull"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectObject"])(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$parseJsonBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJsonBody"])(output.body, context)), "body");
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(data, {
        clientRequestToken: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        endTime: (_)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectNonNull"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$date$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseRfc3339DateTimeWithOffset"])(_)),
        failureMessage: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        invocationArn: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        lastModifiedTime: (_)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectNonNull"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$date$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseRfc3339DateTimeWithOffset"])(_)),
        modelArn: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        outputDataConfig: (_)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$awsExpectUnion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awsExpectUnion"])(_)),
        status: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        submitTime: (_)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectNonNull"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$date$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseRfc3339DateTimeWithOffset"])(_))
    });
    Object.assign(contents, doc);
    return contents;
};
const de_InvokeModelCommand = async (output, context)=>{
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])({
        $metadata: deserializeMetadata(output),
        [_cT]: [
            ,
            output.headers[_ct]
        ],
        [_pCL]: [
            ,
            output.headers[_xabpl]
        ]
    });
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$collect$2d$stream$2d$body$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["collectBody"])(output.body, context);
    contents.body = data;
    return contents;
};
const de_InvokeModelWithBidirectionalStreamCommand = async (output, context)=>{
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])({
        $metadata: deserializeMetadata(output)
    });
    const data = output.body;
    contents.body = de_InvokeModelWithBidirectionalStreamOutput(data, context);
    return contents;
};
const de_InvokeModelWithResponseStreamCommand = async (output, context)=>{
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])({
        $metadata: deserializeMetadata(output),
        [_cT]: [
            ,
            output.headers[_xabct]
        ],
        [_pCL]: [
            ,
            output.headers[_xabpl]
        ]
    });
    const data = output.body;
    contents.body = de_ResponseStream(data, context);
    return contents;
};
const de_ListAsyncInvokesCommand = async (output, context)=>{
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])({
        $metadata: deserializeMetadata(output)
    });
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectNonNull"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectObject"])(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$parseJsonBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJsonBody"])(output.body, context)), "body");
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(data, {
        asyncInvokeSummaries: (_)=>de_AsyncInvokeSummaries(_, context),
        nextToken: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"]
    });
    Object.assign(contents, doc);
    return contents;
};
const de_StartAsyncInvokeCommand = async (output, context)=>{
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])({
        $metadata: deserializeMetadata(output)
    });
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectNonNull"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectObject"])(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$parseJsonBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJsonBody"])(output.body, context)), "body");
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(data, {
        invocationArn: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"]
    });
    Object.assign(contents, doc);
    return contents;
};
const de_CommandError = async (output, context)=>{
    const parsedOutput = {
        ...output,
        body: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$parseJsonBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJsonErrorBody"])(output.body, context)
    };
    const errorCode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$parseJsonBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadRestJsonErrorCode"])(output, parsedOutput.body);
    switch(errorCode){
        case "AccessDeniedException":
        case "com.amazonaws.bedrockruntime#AccessDeniedException":
            throw await de_AccessDeniedExceptionRes(parsedOutput, context);
        case "InternalServerException":
        case "com.amazonaws.bedrockruntime#InternalServerException":
            throw await de_InternalServerExceptionRes(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.bedrockruntime#ResourceNotFoundException":
            throw await de_ResourceNotFoundExceptionRes(parsedOutput, context);
        case "ServiceQuotaExceededException":
        case "com.amazonaws.bedrockruntime#ServiceQuotaExceededException":
            throw await de_ServiceQuotaExceededExceptionRes(parsedOutput, context);
        case "ServiceUnavailableException":
        case "com.amazonaws.bedrockruntime#ServiceUnavailableException":
            throw await de_ServiceUnavailableExceptionRes(parsedOutput, context);
        case "ThrottlingException":
        case "com.amazonaws.bedrockruntime#ThrottlingException":
            throw await de_ThrottlingExceptionRes(parsedOutput, context);
        case "ValidationException":
        case "com.amazonaws.bedrockruntime#ValidationException":
            throw await de_ValidationExceptionRes(parsedOutput, context);
        case "ModelErrorException":
        case "com.amazonaws.bedrockruntime#ModelErrorException":
            throw await de_ModelErrorExceptionRes(parsedOutput, context);
        case "ModelNotReadyException":
        case "com.amazonaws.bedrockruntime#ModelNotReadyException":
            throw await de_ModelNotReadyExceptionRes(parsedOutput, context);
        case "ModelTimeoutException":
        case "com.amazonaws.bedrockruntime#ModelTimeoutException":
            throw await de_ModelTimeoutExceptionRes(parsedOutput, context);
        case "ModelStreamErrorException":
        case "com.amazonaws.bedrockruntime#ModelStreamErrorException":
            throw await de_ModelStreamErrorExceptionRes(parsedOutput, context);
        case "ConflictException":
        case "com.amazonaws.bedrockruntime#ConflictException":
            throw await de_ConflictExceptionRes(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            return throwDefaultError({
                output,
                parsedBody,
                errorCode
            });
    }
};
const throwDefaultError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$default$2d$error$2d$handler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withBaseException"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$BedrockRuntimeServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockRuntimeServiceException"]);
const de_AccessDeniedExceptionRes = async (parsedOutput, context)=>{
    const contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])({});
    const data = parsedOutput.body;
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(data, {
        message: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"]
    });
    Object.assign(contents, doc);
    const exception = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AccessDeniedException"]({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decorateServiceException"])(exception, parsedOutput.body);
};
const de_ConflictExceptionRes = async (parsedOutput, context)=>{
    const contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])({});
    const data = parsedOutput.body;
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(data, {
        message: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"]
    });
    Object.assign(contents, doc);
    const exception = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConflictException"]({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decorateServiceException"])(exception, parsedOutput.body);
};
const de_InternalServerExceptionRes = async (parsedOutput, context)=>{
    const contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])({});
    const data = parsedOutput.body;
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(data, {
        message: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"]
    });
    Object.assign(contents, doc);
    const exception = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InternalServerException"]({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decorateServiceException"])(exception, parsedOutput.body);
};
const de_ModelErrorExceptionRes = async (parsedOutput, context)=>{
    const contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])({});
    const data = parsedOutput.body;
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(data, {
        message: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        originalStatusCode: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectInt32"],
        resourceName: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"]
    });
    Object.assign(contents, doc);
    const exception = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ModelErrorException"]({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decorateServiceException"])(exception, parsedOutput.body);
};
const de_ModelNotReadyExceptionRes = async (parsedOutput, context)=>{
    const contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])({});
    const data = parsedOutput.body;
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(data, {
        message: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"]
    });
    Object.assign(contents, doc);
    const exception = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ModelNotReadyException"]({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decorateServiceException"])(exception, parsedOutput.body);
};
const de_ModelStreamErrorExceptionRes = async (parsedOutput, context)=>{
    const contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])({});
    const data = parsedOutput.body;
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(data, {
        message: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        originalMessage: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        originalStatusCode: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectInt32"]
    });
    Object.assign(contents, doc);
    const exception = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ModelStreamErrorException"]({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decorateServiceException"])(exception, parsedOutput.body);
};
const de_ModelTimeoutExceptionRes = async (parsedOutput, context)=>{
    const contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])({});
    const data = parsedOutput.body;
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(data, {
        message: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"]
    });
    Object.assign(contents, doc);
    const exception = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ModelTimeoutException"]({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decorateServiceException"])(exception, parsedOutput.body);
};
const de_ResourceNotFoundExceptionRes = async (parsedOutput, context)=>{
    const contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])({});
    const data = parsedOutput.body;
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(data, {
        message: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"]
    });
    Object.assign(contents, doc);
    const exception = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ResourceNotFoundException"]({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decorateServiceException"])(exception, parsedOutput.body);
};
const de_ServiceQuotaExceededExceptionRes = async (parsedOutput, context)=>{
    const contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])({});
    const data = parsedOutput.body;
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(data, {
        message: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"]
    });
    Object.assign(contents, doc);
    const exception = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ServiceQuotaExceededException"]({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decorateServiceException"])(exception, parsedOutput.body);
};
const de_ServiceUnavailableExceptionRes = async (parsedOutput, context)=>{
    const contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])({});
    const data = parsedOutput.body;
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(data, {
        message: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"]
    });
    Object.assign(contents, doc);
    const exception = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ServiceUnavailableException"]({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decorateServiceException"])(exception, parsedOutput.body);
};
const de_ThrottlingExceptionRes = async (parsedOutput, context)=>{
    const contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])({});
    const data = parsedOutput.body;
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(data, {
        message: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"]
    });
    Object.assign(contents, doc);
    const exception = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ThrottlingException"]({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decorateServiceException"])(exception, parsedOutput.body);
};
const de_ValidationExceptionRes = async (parsedOutput, context)=>{
    const contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])({});
    const data = parsedOutput.body;
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(data, {
        message: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"]
    });
    Object.assign(contents, doc);
    const exception = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ValidationException"]({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decorateServiceException"])(exception, parsedOutput.body);
};
const se_InvokeModelWithBidirectionalStreamInput = (input, context)=>{
    const eventMarshallingVisitor = (event)=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelWithBidirectionalStreamInput"].visit(event, {
            chunk: (value)=>se_BidirectionalInputPayloadPart_event(value, context),
            _: (value)=>value
        });
    return context.eventStreamMarshaller.serialize(input, eventMarshallingVisitor);
};
const se_BidirectionalInputPayloadPart_event = (input, context)=>{
    const headers = {
        ":event-type": {
            type: "string",
            value: "chunk"
        },
        ":message-type": {
            type: "string",
            value: "event"
        },
        ":content-type": {
            type: "string",
            value: "application/json"
        }
    };
    let body = new Uint8Array();
    body = se_BidirectionalInputPayloadPart(input, context);
    body = context.utf8Decoder(JSON.stringify(body));
    return {
        headers,
        body
    };
};
const de_ConverseStreamOutput = (output, context)=>{
    return context.eventStreamMarshaller.deserialize(output, async (event)=>{
        if (event["messageStart"] != null) {
            return {
                messageStart: await de_MessageStartEvent_event(event["messageStart"], context)
            };
        }
        if (event["contentBlockStart"] != null) {
            return {
                contentBlockStart: await de_ContentBlockStartEvent_event(event["contentBlockStart"], context)
            };
        }
        if (event["contentBlockDelta"] != null) {
            return {
                contentBlockDelta: await de_ContentBlockDeltaEvent_event(event["contentBlockDelta"], context)
            };
        }
        if (event["contentBlockStop"] != null) {
            return {
                contentBlockStop: await de_ContentBlockStopEvent_event(event["contentBlockStop"], context)
            };
        }
        if (event["messageStop"] != null) {
            return {
                messageStop: await de_MessageStopEvent_event(event["messageStop"], context)
            };
        }
        if (event["metadata"] != null) {
            return {
                metadata: await de_ConverseStreamMetadataEvent_event(event["metadata"], context)
            };
        }
        if (event["internalServerException"] != null) {
            return {
                internalServerException: await de_InternalServerException_event(event["internalServerException"], context)
            };
        }
        if (event["modelStreamErrorException"] != null) {
            return {
                modelStreamErrorException: await de_ModelStreamErrorException_event(event["modelStreamErrorException"], context)
            };
        }
        if (event["validationException"] != null) {
            return {
                validationException: await de_ValidationException_event(event["validationException"], context)
            };
        }
        if (event["throttlingException"] != null) {
            return {
                throttlingException: await de_ThrottlingException_event(event["throttlingException"], context)
            };
        }
        if (event["serviceUnavailableException"] != null) {
            return {
                serviceUnavailableException: await de_ServiceUnavailableException_event(event["serviceUnavailableException"], context)
            };
        }
        return {
            $unknown: event
        };
    });
};
const de_InvokeModelWithBidirectionalStreamOutput = (output, context)=>{
    return context.eventStreamMarshaller.deserialize(output, async (event)=>{
        if (event["chunk"] != null) {
            return {
                chunk: await de_BidirectionalOutputPayloadPart_event(event["chunk"], context)
            };
        }
        if (event["internalServerException"] != null) {
            return {
                internalServerException: await de_InternalServerException_event(event["internalServerException"], context)
            };
        }
        if (event["modelStreamErrorException"] != null) {
            return {
                modelStreamErrorException: await de_ModelStreamErrorException_event(event["modelStreamErrorException"], context)
            };
        }
        if (event["validationException"] != null) {
            return {
                validationException: await de_ValidationException_event(event["validationException"], context)
            };
        }
        if (event["throttlingException"] != null) {
            return {
                throttlingException: await de_ThrottlingException_event(event["throttlingException"], context)
            };
        }
        if (event["modelTimeoutException"] != null) {
            return {
                modelTimeoutException: await de_ModelTimeoutException_event(event["modelTimeoutException"], context)
            };
        }
        if (event["serviceUnavailableException"] != null) {
            return {
                serviceUnavailableException: await de_ServiceUnavailableException_event(event["serviceUnavailableException"], context)
            };
        }
        return {
            $unknown: event
        };
    });
};
const de_ResponseStream = (output, context)=>{
    return context.eventStreamMarshaller.deserialize(output, async (event)=>{
        if (event["chunk"] != null) {
            return {
                chunk: await de_PayloadPart_event(event["chunk"], context)
            };
        }
        if (event["internalServerException"] != null) {
            return {
                internalServerException: await de_InternalServerException_event(event["internalServerException"], context)
            };
        }
        if (event["modelStreamErrorException"] != null) {
            return {
                modelStreamErrorException: await de_ModelStreamErrorException_event(event["modelStreamErrorException"], context)
            };
        }
        if (event["validationException"] != null) {
            return {
                validationException: await de_ValidationException_event(event["validationException"], context)
            };
        }
        if (event["throttlingException"] != null) {
            return {
                throttlingException: await de_ThrottlingException_event(event["throttlingException"], context)
            };
        }
        if (event["modelTimeoutException"] != null) {
            return {
                modelTimeoutException: await de_ModelTimeoutException_event(event["modelTimeoutException"], context)
            };
        }
        if (event["serviceUnavailableException"] != null) {
            return {
                serviceUnavailableException: await de_ServiceUnavailableException_event(event["serviceUnavailableException"], context)
            };
        }
        return {
            $unknown: event
        };
    });
};
const de_BidirectionalOutputPayloadPart_event = async (output, context)=>{
    const contents = {};
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$parseJsonBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJsonBody"])(output.body, context);
    Object.assign(contents, de_BidirectionalOutputPayloadPart(data, context));
    return contents;
};
const de_ContentBlockDeltaEvent_event = async (output, context)=>{
    const contents = {};
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$parseJsonBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJsonBody"])(output.body, context);
    Object.assign(contents, de_ContentBlockDeltaEvent(data, context));
    return contents;
};
const de_ContentBlockStartEvent_event = async (output, context)=>{
    const contents = {};
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$parseJsonBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJsonBody"])(output.body, context);
    Object.assign(contents, (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(data));
    return contents;
};
const de_ContentBlockStopEvent_event = async (output, context)=>{
    const contents = {};
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$parseJsonBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJsonBody"])(output.body, context);
    Object.assign(contents, (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(data));
    return contents;
};
const de_ConverseStreamMetadataEvent_event = async (output, context)=>{
    const contents = {};
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$parseJsonBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJsonBody"])(output.body, context);
    Object.assign(contents, de_ConverseStreamMetadataEvent(data, context));
    return contents;
};
const de_InternalServerException_event = async (output, context)=>{
    const parsedOutput = {
        ...output,
        body: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$parseJsonBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJsonBody"])(output.body, context)
    };
    return de_InternalServerExceptionRes(parsedOutput, context);
};
const de_MessageStartEvent_event = async (output, context)=>{
    const contents = {};
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$parseJsonBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJsonBody"])(output.body, context);
    Object.assign(contents, (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(data));
    return contents;
};
const de_MessageStopEvent_event = async (output, context)=>{
    const contents = {};
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$parseJsonBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJsonBody"])(output.body, context);
    Object.assign(contents, de_MessageStopEvent(data, context));
    return contents;
};
const de_ModelStreamErrorException_event = async (output, context)=>{
    const parsedOutput = {
        ...output,
        body: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$parseJsonBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJsonBody"])(output.body, context)
    };
    return de_ModelStreamErrorExceptionRes(parsedOutput, context);
};
const de_ModelTimeoutException_event = async (output, context)=>{
    const parsedOutput = {
        ...output,
        body: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$parseJsonBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJsonBody"])(output.body, context)
    };
    return de_ModelTimeoutExceptionRes(parsedOutput, context);
};
const de_PayloadPart_event = async (output, context)=>{
    const contents = {};
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$parseJsonBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJsonBody"])(output.body, context);
    Object.assign(contents, de_PayloadPart(data, context));
    return contents;
};
const de_ServiceUnavailableException_event = async (output, context)=>{
    const parsedOutput = {
        ...output,
        body: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$parseJsonBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJsonBody"])(output.body, context)
    };
    return de_ServiceUnavailableExceptionRes(parsedOutput, context);
};
const de_ThrottlingException_event = async (output, context)=>{
    const parsedOutput = {
        ...output,
        body: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$parseJsonBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJsonBody"])(output.body, context)
    };
    return de_ThrottlingExceptionRes(parsedOutput, context);
};
const de_ValidationException_event = async (output, context)=>{
    const parsedOutput = {
        ...output,
        body: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$parseJsonBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJsonBody"])(output.body, context)
    };
    return de_ValidationExceptionRes(parsedOutput, context);
};
const se_BidirectionalInputPayloadPart = (input, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(input, {
        bytes: context.base64Encoder
    });
};
const se_ContentBlock = (input, context)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ContentBlock"].visit(input, {
        cachePoint: (value)=>({
                cachePoint: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(value)
            }),
        citationsContent: (value)=>({
                citationsContent: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(value)
            }),
        document: (value)=>({
                document: se_DocumentBlock(value, context)
            }),
        guardContent: (value)=>({
                guardContent: se_GuardrailConverseContentBlock(value, context)
            }),
        image: (value)=>({
                image: se_ImageBlock(value, context)
            }),
        reasoningContent: (value)=>({
                reasoningContent: se_ReasoningContentBlock(value, context)
            }),
        text: (value)=>({
                text: value
            }),
        toolResult: (value)=>({
                toolResult: se_ToolResultBlock(value, context)
            }),
        toolUse: (value)=>({
                toolUse: se_ToolUseBlock(value, context)
            }),
        video: (value)=>({
                video: se_VideoBlock(value, context)
            }),
        _: (name, value)=>({
                [name]: value
            })
    });
};
const se_ContentBlocks = (input, context)=>{
    return input.filter((e)=>e != null).map((entry)=>{
        return se_ContentBlock(entry, context);
    });
};
const se_ConverseTokensRequest = (input, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(input, {
        messages: (_)=>se_Messages(_, context),
        system: (_)=>se_SystemContentBlocks(_, context)
    });
};
const se_CountTokensInput = (input, context)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CountTokensInput"].visit(input, {
        converse: (value)=>({
                converse: se_ConverseTokensRequest(value, context)
            }),
        invokeModel: (value)=>({
                invokeModel: se_InvokeModelTokensRequest(value, context)
            }),
        _: (name, value)=>({
                [name]: value
            })
    });
};
const se_DocumentBlock = (input, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(input, {
        citations: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        context: [],
        format: [],
        name: [],
        source: (_)=>se_DocumentSource(_, context)
    });
};
const se_DocumentSource = (input, context)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DocumentSource"].visit(input, {
        bytes: (value)=>({
                bytes: context.base64Encoder(value)
            }),
        content: (value)=>({
                content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(value)
            }),
        s3Location: (value)=>({
                s3Location: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(value)
            }),
        text: (value)=>({
                text: value
            }),
        _: (name, value)=>({
                [name]: value
            })
    });
};
const se_GuardrailContentBlock = (input, context)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailContentBlock"].visit(input, {
        image: (value)=>({
                image: se_GuardrailImageBlock(value, context)
            }),
        text: (value)=>({
                text: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(value)
            }),
        _: (name, value)=>({
                [name]: value
            })
    });
};
const se_GuardrailContentBlockList = (input, context)=>{
    return input.filter((e)=>e != null).map((entry)=>{
        return se_GuardrailContentBlock(entry, context);
    });
};
const se_GuardrailConverseContentBlock = (input, context)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailConverseContentBlock"].visit(input, {
        image: (value)=>({
                image: se_GuardrailConverseImageBlock(value, context)
            }),
        text: (value)=>({
                text: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(value)
            }),
        _: (name, value)=>({
                [name]: value
            })
    });
};
const se_GuardrailConverseImageBlock = (input, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(input, {
        format: [],
        source: (_)=>se_GuardrailConverseImageSource(_, context)
    });
};
const se_GuardrailConverseImageSource = (input, context)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailConverseImageSource"].visit(input, {
        bytes: (value)=>({
                bytes: context.base64Encoder(value)
            }),
        _: (name, value)=>({
                [name]: value
            })
    });
};
const se_GuardrailImageBlock = (input, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(input, {
        format: [],
        source: (_)=>se_GuardrailImageSource(_, context)
    });
};
const se_GuardrailImageSource = (input, context)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailImageSource"].visit(input, {
        bytes: (value)=>({
                bytes: context.base64Encoder(value)
            }),
        _: (name, value)=>({
                [name]: value
            })
    });
};
const se_ImageBlock = (input, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(input, {
        format: [],
        source: (_)=>se_ImageSource(_, context)
    });
};
const se_ImageSource = (input, context)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ImageSource"].visit(input, {
        bytes: (value)=>({
                bytes: context.base64Encoder(value)
            }),
        s3Location: (value)=>({
                s3Location: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(value)
            }),
        _: (name, value)=>({
                [name]: value
            })
    });
};
const se_InferenceConfiguration = (input, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(input, {
        maxTokens: [],
        stopSequences: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        temperature: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$ser$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serializeFloat"],
        topP: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$ser$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serializeFloat"]
    });
};
const se_InvokeModelTokensRequest = (input, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(input, {
        body: context.base64Encoder
    });
};
const se_Message = (input, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(input, {
        content: (_)=>se_ContentBlocks(_, context),
        role: []
    });
};
const se_Messages = (input, context)=>{
    return input.filter((e)=>e != null).map((entry)=>{
        return se_Message(entry, context);
    });
};
const se_ModelInputPayload = (input, context)=>{
    return input;
};
const se_ReasoningContentBlock = (input, context)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReasoningContentBlock"].visit(input, {
        reasoningText: (value)=>({
                reasoningText: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(value)
            }),
        redactedContent: (value)=>({
                redactedContent: context.base64Encoder(value)
            }),
        _: (name, value)=>({
                [name]: value
            })
    });
};
const se_SystemContentBlock = (input, context)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SystemContentBlock"].visit(input, {
        cachePoint: (value)=>({
                cachePoint: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(value)
            }),
        guardContent: (value)=>({
                guardContent: se_GuardrailConverseContentBlock(value, context)
            }),
        text: (value)=>({
                text: value
            }),
        _: (name, value)=>({
                [name]: value
            })
    });
};
const se_SystemContentBlocks = (input, context)=>{
    return input.filter((e)=>e != null).map((entry)=>{
        return se_SystemContentBlock(entry, context);
    });
};
const se_Tool = (input, context)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Tool"].visit(input, {
        cachePoint: (value)=>({
                cachePoint: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(value)
            }),
        systemTool: (value)=>({
                systemTool: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(value)
            }),
        toolSpec: (value)=>({
                toolSpec: se_ToolSpecification(value, context)
            }),
        _: (name, value)=>({
                [name]: value
            })
    });
};
const se_ToolConfiguration = (input, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(input, {
        toolChoice: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        tools: (_)=>se_Tools(_, context)
    });
};
const se_ToolInputSchema = (input, context)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ToolInputSchema"].visit(input, {
        json: (value)=>({
                json: se_Document(value, context)
            }),
        _: (name, value)=>({
                [name]: value
            })
    });
};
const se_ToolResultBlock = (input, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(input, {
        content: (_)=>se_ToolResultContentBlocks(_, context),
        status: [],
        toolUseId: [],
        type: []
    });
};
const se_ToolResultContentBlock = (input, context)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ToolResultContentBlock"].visit(input, {
        document: (value)=>({
                document: se_DocumentBlock(value, context)
            }),
        image: (value)=>({
                image: se_ImageBlock(value, context)
            }),
        json: (value)=>({
                json: se_Document(value, context)
            }),
        text: (value)=>({
                text: value
            }),
        video: (value)=>({
                video: se_VideoBlock(value, context)
            }),
        _: (name, value)=>({
                [name]: value
            })
    });
};
const se_ToolResultContentBlocks = (input, context)=>{
    return input.filter((e)=>e != null).map((entry)=>{
        return se_ToolResultContentBlock(entry, context);
    });
};
const se_Tools = (input, context)=>{
    return input.filter((e)=>e != null).map((entry)=>{
        return se_Tool(entry, context);
    });
};
const se_ToolSpecification = (input, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(input, {
        description: [],
        inputSchema: (_)=>se_ToolInputSchema(_, context),
        name: []
    });
};
const se_ToolUseBlock = (input, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(input, {
        input: (_)=>se_Document(_, context),
        name: [],
        toolUseId: [],
        type: []
    });
};
const se_VideoBlock = (input, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(input, {
        format: [],
        source: (_)=>se_VideoSource(_, context)
    });
};
const se_VideoSource = (input, context)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["VideoSource"].visit(input, {
        bytes: (value)=>({
                bytes: context.base64Encoder(value)
            }),
        s3Location: (value)=>({
                s3Location: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(value)
            }),
        _: (name, value)=>({
                [name]: value
            })
    });
};
const se_Document = (input, context)=>{
    return input;
};
const de_AsyncInvokeSummaries = (output, context)=>{
    const retVal = (output || []).filter((e)=>e != null).map((entry)=>{
        return de_AsyncInvokeSummary(entry, context);
    });
    return retVal;
};
const de_AsyncInvokeSummary = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        clientRequestToken: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        endTime: (_)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectNonNull"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$date$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseRfc3339DateTimeWithOffset"])(_)),
        failureMessage: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        invocationArn: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        lastModifiedTime: (_)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectNonNull"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$date$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseRfc3339DateTimeWithOffset"])(_)),
        modelArn: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        outputDataConfig: (_)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$awsExpectUnion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awsExpectUnion"])(_)),
        status: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        submitTime: (_)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectNonNull"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$date$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseRfc3339DateTimeWithOffset"])(_))
    });
};
const de_BidirectionalOutputPayloadPart = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        bytes: context.base64Decoder
    });
};
const de_ContentBlock = (output, context)=>{
    if (output.cachePoint != null) {
        return {
            cachePoint: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(output.cachePoint)
        };
    }
    if (output.citationsContent != null) {
        return {
            citationsContent: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(output.citationsContent)
        };
    }
    if (output.document != null) {
        return {
            document: de_DocumentBlock(output.document, context)
        };
    }
    if (output.guardContent != null) {
        return {
            guardContent: de_GuardrailConverseContentBlock((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$awsExpectUnion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awsExpectUnion"])(output.guardContent), context)
        };
    }
    if (output.image != null) {
        return {
            image: de_ImageBlock(output.image, context)
        };
    }
    if (output.reasoningContent != null) {
        return {
            reasoningContent: de_ReasoningContentBlock((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$awsExpectUnion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awsExpectUnion"])(output.reasoningContent), context)
        };
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output.text) !== undefined) {
        return {
            text: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output.text)
        };
    }
    if (output.toolResult != null) {
        return {
            toolResult: de_ToolResultBlock(output.toolResult, context)
        };
    }
    if (output.toolUse != null) {
        return {
            toolUse: de_ToolUseBlock(output.toolUse, context)
        };
    }
    if (output.video != null) {
        return {
            video: de_VideoBlock(output.video, context)
        };
    }
    return {
        $unknown: Object.entries(output)[0]
    };
};
const de_ContentBlockDelta = (output, context)=>{
    if (output.citation != null) {
        return {
            citation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(output.citation)
        };
    }
    if (output.reasoningContent != null) {
        return {
            reasoningContent: de_ReasoningContentBlockDelta((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$awsExpectUnion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awsExpectUnion"])(output.reasoningContent), context)
        };
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output.text) !== undefined) {
        return {
            text: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output.text)
        };
    }
    if (output.toolResult != null) {
        return {
            toolResult: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(output.toolResult)
        };
    }
    if (output.toolUse != null) {
        return {
            toolUse: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(output.toolUse)
        };
    }
    return {
        $unknown: Object.entries(output)[0]
    };
};
const de_ContentBlockDeltaEvent = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        contentBlockIndex: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectInt32"],
        delta: (_)=>de_ContentBlockDelta((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$awsExpectUnion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awsExpectUnion"])(_), context)
    });
};
const de_ContentBlocks = (output, context)=>{
    const retVal = (output || []).filter((e)=>e != null).map((entry)=>{
        return de_ContentBlock((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$awsExpectUnion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awsExpectUnion"])(entry), context);
    });
    return retVal;
};
const de_ConverseOutput = (output, context)=>{
    if (output.message != null) {
        return {
            message: de_Message(output.message, context)
        };
    }
    return {
        $unknown: Object.entries(output)[0]
    };
};
const de_ConverseStreamMetadataEvent = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        metrics: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        performanceConfig: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        trace: (_)=>de_ConverseStreamTrace(_, context),
        usage: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"]
    });
};
const de_ConverseStreamTrace = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        guardrail: (_)=>de_GuardrailTraceAssessment(_, context),
        promptRouter: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"]
    });
};
const de_ConverseTrace = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        guardrail: (_)=>de_GuardrailTraceAssessment(_, context),
        promptRouter: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"]
    });
};
const de_DocumentBlock = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        citations: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        context: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        format: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        name: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        source: (_)=>de_DocumentSource((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$awsExpectUnion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awsExpectUnion"])(_), context)
    });
};
const de_DocumentSource = (output, context)=>{
    if (output.bytes != null) {
        return {
            bytes: context.base64Decoder(output.bytes)
        };
    }
    if (output.content != null) {
        return {
            content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(output.content)
        };
    }
    if (output.s3Location != null) {
        return {
            s3Location: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(output.s3Location)
        };
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output.text) !== undefined) {
        return {
            text: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output.text)
        };
    }
    return {
        $unknown: Object.entries(output)[0]
    };
};
const de_GuardrailAssessment = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        automatedReasoningPolicy: (_)=>de_GuardrailAutomatedReasoningPolicyAssessment(_, context),
        contentPolicy: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        contextualGroundingPolicy: (_)=>de_GuardrailContextualGroundingPolicyAssessment(_, context),
        invocationMetrics: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        sensitiveInformationPolicy: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        topicPolicy: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        wordPolicy: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"]
    });
};
const de_GuardrailAssessmentList = (output, context)=>{
    const retVal = (output || []).filter((e)=>e != null).map((entry)=>{
        return de_GuardrailAssessment(entry, context);
    });
    return retVal;
};
const de_GuardrailAssessmentListMap = (output, context)=>{
    return Object.entries(output).reduce((acc, [key, value])=>{
        if (value === null) {
            return acc;
        }
        acc[key] = de_GuardrailAssessmentList(value, context);
        return acc;
    }, {});
};
const de_GuardrailAssessmentMap = (output, context)=>{
    return Object.entries(output).reduce((acc, [key, value])=>{
        if (value === null) {
            return acc;
        }
        acc[key] = de_GuardrailAssessment(value, context);
        return acc;
    }, {});
};
const de_GuardrailAutomatedReasoningFinding = (output, context)=>{
    if (output.impossible != null) {
        return {
            impossible: de_GuardrailAutomatedReasoningImpossibleFinding(output.impossible, context)
        };
    }
    if (output.invalid != null) {
        return {
            invalid: de_GuardrailAutomatedReasoningInvalidFinding(output.invalid, context)
        };
    }
    if (output.noTranslations != null) {
        return {
            noTranslations: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(output.noTranslations)
        };
    }
    if (output.satisfiable != null) {
        return {
            satisfiable: de_GuardrailAutomatedReasoningSatisfiableFinding(output.satisfiable, context)
        };
    }
    if (output.tooComplex != null) {
        return {
            tooComplex: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(output.tooComplex)
        };
    }
    if (output.translationAmbiguous != null) {
        return {
            translationAmbiguous: de_GuardrailAutomatedReasoningTranslationAmbiguousFinding(output.translationAmbiguous, context)
        };
    }
    if (output.valid != null) {
        return {
            valid: de_GuardrailAutomatedReasoningValidFinding(output.valid, context)
        };
    }
    return {
        $unknown: Object.entries(output)[0]
    };
};
const de_GuardrailAutomatedReasoningFindingList = (output, context)=>{
    const retVal = (output || []).filter((e)=>e != null).map((entry)=>{
        return de_GuardrailAutomatedReasoningFinding((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$awsExpectUnion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awsExpectUnion"])(entry), context);
    });
    return retVal;
};
const de_GuardrailAutomatedReasoningImpossibleFinding = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        contradictingRules: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        logicWarning: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        translation: (_)=>de_GuardrailAutomatedReasoningTranslation(_, context)
    });
};
const de_GuardrailAutomatedReasoningInvalidFinding = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        contradictingRules: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        logicWarning: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        translation: (_)=>de_GuardrailAutomatedReasoningTranslation(_, context)
    });
};
const de_GuardrailAutomatedReasoningPolicyAssessment = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        findings: (_)=>de_GuardrailAutomatedReasoningFindingList(_, context)
    });
};
const de_GuardrailAutomatedReasoningSatisfiableFinding = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        claimsFalseScenario: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        claimsTrueScenario: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        logicWarning: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        translation: (_)=>de_GuardrailAutomatedReasoningTranslation(_, context)
    });
};
const de_GuardrailAutomatedReasoningTranslation = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        claims: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        confidence: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["limitedParseDouble"],
        premises: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        untranslatedClaims: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        untranslatedPremises: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"]
    });
};
const de_GuardrailAutomatedReasoningTranslationAmbiguousFinding = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        differenceScenarios: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        options: (_)=>de_GuardrailAutomatedReasoningTranslationOptionList(_, context)
    });
};
const de_GuardrailAutomatedReasoningTranslationList = (output, context)=>{
    const retVal = (output || []).filter((e)=>e != null).map((entry)=>{
        return de_GuardrailAutomatedReasoningTranslation(entry, context);
    });
    return retVal;
};
const de_GuardrailAutomatedReasoningTranslationOption = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        translations: (_)=>de_GuardrailAutomatedReasoningTranslationList(_, context)
    });
};
const de_GuardrailAutomatedReasoningTranslationOptionList = (output, context)=>{
    const retVal = (output || []).filter((e)=>e != null).map((entry)=>{
        return de_GuardrailAutomatedReasoningTranslationOption(entry, context);
    });
    return retVal;
};
const de_GuardrailAutomatedReasoningValidFinding = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        claimsTrueScenario: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        logicWarning: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        supportingRules: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        translation: (_)=>de_GuardrailAutomatedReasoningTranslation(_, context)
    });
};
const de_GuardrailContextualGroundingFilter = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        action: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        detected: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectBoolean"],
        score: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["limitedParseDouble"],
        threshold: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["limitedParseDouble"],
        type: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"]
    });
};
const de_GuardrailContextualGroundingFilters = (output, context)=>{
    const retVal = (output || []).filter((e)=>e != null).map((entry)=>{
        return de_GuardrailContextualGroundingFilter(entry, context);
    });
    return retVal;
};
const de_GuardrailContextualGroundingPolicyAssessment = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        filters: (_)=>de_GuardrailContextualGroundingFilters(_, context)
    });
};
const de_GuardrailConverseContentBlock = (output, context)=>{
    if (output.image != null) {
        return {
            image: de_GuardrailConverseImageBlock(output.image, context)
        };
    }
    if (output.text != null) {
        return {
            text: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(output.text)
        };
    }
    return {
        $unknown: Object.entries(output)[0]
    };
};
const de_GuardrailConverseImageBlock = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        format: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        source: (_)=>de_GuardrailConverseImageSource((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$awsExpectUnion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awsExpectUnion"])(_), context)
    });
};
const de_GuardrailConverseImageSource = (output, context)=>{
    if (output.bytes != null) {
        return {
            bytes: context.base64Decoder(output.bytes)
        };
    }
    return {
        $unknown: Object.entries(output)[0]
    };
};
const de_GuardrailTraceAssessment = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        actionReason: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        inputAssessment: (_)=>de_GuardrailAssessmentMap(_, context),
        modelOutput: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"],
        outputAssessments: (_)=>de_GuardrailAssessmentListMap(_, context)
    });
};
const de_ImageBlock = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        format: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        source: (_)=>de_ImageSource((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$awsExpectUnion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awsExpectUnion"])(_), context)
    });
};
const de_ImageSource = (output, context)=>{
    if (output.bytes != null) {
        return {
            bytes: context.base64Decoder(output.bytes)
        };
    }
    if (output.s3Location != null) {
        return {
            s3Location: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(output.s3Location)
        };
    }
    return {
        $unknown: Object.entries(output)[0]
    };
};
const de_Message = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        content: (_)=>de_ContentBlocks(_, context),
        role: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"]
    });
};
const de_MessageStopEvent = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        additionalModelResponseFields: (_)=>de_Document(_, context),
        stopReason: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"]
    });
};
const de_PayloadPart = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        bytes: context.base64Decoder
    });
};
const de_ReasoningContentBlock = (output, context)=>{
    if (output.reasoningText != null) {
        return {
            reasoningText: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(output.reasoningText)
        };
    }
    if (output.redactedContent != null) {
        return {
            redactedContent: context.base64Decoder(output.redactedContent)
        };
    }
    return {
        $unknown: Object.entries(output)[0]
    };
};
const de_ReasoningContentBlockDelta = (output, context)=>{
    if (output.redactedContent != null) {
        return {
            redactedContent: context.base64Decoder(output.redactedContent)
        };
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output.signature) !== undefined) {
        return {
            signature: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output.signature)
        };
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output.text) !== undefined) {
        return {
            text: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output.text)
        };
    }
    return {
        $unknown: Object.entries(output)[0]
    };
};
const de_ToolResultBlock = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        content: (_)=>de_ToolResultContentBlocks(_, context),
        status: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        toolUseId: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        type: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"]
    });
};
const de_ToolResultContentBlock = (output, context)=>{
    if (output.document != null) {
        return {
            document: de_DocumentBlock(output.document, context)
        };
    }
    if (output.image != null) {
        return {
            image: de_ImageBlock(output.image, context)
        };
    }
    if (output.json != null) {
        return {
            json: de_Document(output.json, context)
        };
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output.text) !== undefined) {
        return {
            text: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output.text)
        };
    }
    if (output.video != null) {
        return {
            video: de_VideoBlock(output.video, context)
        };
    }
    return {
        $unknown: Object.entries(output)[0]
    };
};
const de_ToolResultContentBlocks = (output, context)=>{
    const retVal = (output || []).filter((e)=>e != null).map((entry)=>{
        return de_ToolResultContentBlock((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$awsExpectUnion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awsExpectUnion"])(entry), context);
    });
    return retVal;
};
const de_ToolUseBlock = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        input: (_)=>de_Document(_, context),
        name: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        toolUseId: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        type: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"]
    });
};
const de_VideoBlock = (output, context)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$object$2d$mapping$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["take"])(output, {
        format: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"],
        source: (_)=>de_VideoSource((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$json$2f$awsExpectUnion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awsExpectUnion"])(_), context)
    });
};
const de_VideoSource = (output, context)=>{
    if (output.bytes != null) {
        return {
            bytes: context.base64Decoder(output.bytes)
        };
    }
    if (output.s3Location != null) {
        return {
            s3Location: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$serde$2d$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["_json"])(output.s3Location)
        };
    }
    return {
        $unknown: Object.entries(output)[0]
    };
};
const de_Document = (output, context)=>{
    return output;
};
const deserializeMetadata = (output)=>({
        httpStatusCode: output.statusCode,
        requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
        extendedRequestId: output.headers["x-amz-id-2"],
        cfId: output.headers["x-amz-cf-id"]
    });
const collectBodyString = (streamBody, context)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$collect$2d$stream$2d$body$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["collectBody"])(streamBody, context).then((body)=>context.utf8Encoder(body));
const _a = "accept";
const _cT = "contentType";
const _ct = "content-type";
const _gI = "guardrailIdentifier";
const _gV = "guardrailVersion";
const _mR = "maxResults";
const _nT = "nextToken";
const _pCL = "performanceConfigLatency";
const _sB = "sortBy";
const _sE = "statusEquals";
const _sO = "sortOrder";
const _sTA = "submitTimeAfter";
const _sTB = "submitTimeBefore";
const _t = "trace";
const _xaba = "x-amzn-bedrock-accept";
const _xabct = "x-amzn-bedrock-content-type";
const _xabg = "x-amzn-bedrock-guardrailidentifier";
const _xabg_ = "x-amzn-bedrock-guardrailversion";
const _xabpl = "x-amzn-bedrock-performanceconfig-latency";
const _xabt = "x-amzn-bedrock-trace";
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/ApplyGuardrailCommand.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApplyGuardrailCommand",
    ()=>ApplyGuardrailCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$endpoint$40$4$2e$3$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$getEndpointPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+middleware-endpoint@4.3.6/node_modules/@smithy/middleware-endpoint/dist-es/getEndpointPlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$serde$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serdePlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+middleware-serde@4.2.4/node_modules/@smithy/middleware-serde/dist-es/serdePlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/command.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/endpoint/EndpointParameters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/models/models_0.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/protocols/Aws_restJson1.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
class ApplyGuardrailCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Command"].classBuilder().ep(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["commonParams"]).m(function(Command, cs, config, o) {
    return [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$serde$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serdePlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSerdePlugin"])(config, this.serialize, this.deserialize),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$endpoint$40$4$2e$3$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$getEndpointPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEndpointPlugin"])(config, Command.getEndpointParameterInstructions())
    ];
}).s("AmazonBedrockFrontendService", "ApplyGuardrail", {}).n("BedrockRuntimeClient", "ApplyGuardrailCommand").f(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApplyGuardrailRequestFilterSensitiveLog"], __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApplyGuardrailResponseFilterSensitiveLog"]).ser(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["se_ApplyGuardrailCommand"]).de(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["de_ApplyGuardrailCommand"]).build() {
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/ConverseCommand.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConverseCommand",
    ()=>ConverseCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$endpoint$40$4$2e$3$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$getEndpointPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+middleware-endpoint@4.3.6/node_modules/@smithy/middleware-endpoint/dist-es/getEndpointPlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$serde$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serdePlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+middleware-serde@4.2.4/node_modules/@smithy/middleware-serde/dist-es/serdePlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/command.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/endpoint/EndpointParameters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/models/models_0.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/protocols/Aws_restJson1.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
class ConverseCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Command"].classBuilder().ep(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["commonParams"]).m(function(Command, cs, config, o) {
    return [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$serde$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serdePlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSerdePlugin"])(config, this.serialize, this.deserialize),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$endpoint$40$4$2e$3$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$getEndpointPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEndpointPlugin"])(config, Command.getEndpointParameterInstructions())
    ];
}).s("AmazonBedrockFrontendService", "Converse", {}).n("BedrockRuntimeClient", "ConverseCommand").f(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseRequestFilterSensitiveLog"], __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseResponseFilterSensitiveLog"]).ser(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["se_ConverseCommand"]).de(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["de_ConverseCommand"]).build() {
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/ConverseStreamCommand.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConverseStreamCommand",
    ()=>ConverseStreamCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$endpoint$40$4$2e$3$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$getEndpointPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+middleware-endpoint@4.3.6/node_modules/@smithy/middleware-endpoint/dist-es/getEndpointPlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$serde$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serdePlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+middleware-serde@4.2.4/node_modules/@smithy/middleware-serde/dist-es/serdePlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/command.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/endpoint/EndpointParameters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/models/models_0.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/protocols/Aws_restJson1.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
class ConverseStreamCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Command"].classBuilder().ep(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["commonParams"]).m(function(Command, cs, config, o) {
    return [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$serde$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serdePlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSerdePlugin"])(config, this.serialize, this.deserialize),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$endpoint$40$4$2e$3$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$getEndpointPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEndpointPlugin"])(config, Command.getEndpointParameterInstructions())
    ];
}).s("AmazonBedrockFrontendService", "ConverseStream", {
    eventStream: {
        output: true
    }
}).n("BedrockRuntimeClient", "ConverseStreamCommand").f(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseStreamRequestFilterSensitiveLog"], __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseStreamResponseFilterSensitiveLog"]).ser(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["se_ConverseStreamCommand"]).de(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["de_ConverseStreamCommand"]).build() {
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/CountTokensCommand.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CountTokensCommand",
    ()=>CountTokensCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$endpoint$40$4$2e$3$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$getEndpointPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+middleware-endpoint@4.3.6/node_modules/@smithy/middleware-endpoint/dist-es/getEndpointPlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$serde$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serdePlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+middleware-serde@4.2.4/node_modules/@smithy/middleware-serde/dist-es/serdePlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/command.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/endpoint/EndpointParameters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/models/models_0.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/protocols/Aws_restJson1.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
class CountTokensCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Command"].classBuilder().ep(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["commonParams"]).m(function(Command, cs, config, o) {
    return [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$serde$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serdePlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSerdePlugin"])(config, this.serialize, this.deserialize),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$endpoint$40$4$2e$3$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$getEndpointPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEndpointPlugin"])(config, Command.getEndpointParameterInstructions())
    ];
}).s("AmazonBedrockFrontendService", "CountTokens", {}).n("BedrockRuntimeClient", "CountTokensCommand").f(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CountTokensRequestFilterSensitiveLog"], void 0).ser(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["se_CountTokensCommand"]).de(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["de_CountTokensCommand"]).build() {
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/GetAsyncInvokeCommand.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GetAsyncInvokeCommand",
    ()=>GetAsyncInvokeCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$endpoint$40$4$2e$3$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$getEndpointPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+middleware-endpoint@4.3.6/node_modules/@smithy/middleware-endpoint/dist-es/getEndpointPlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$serde$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serdePlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+middleware-serde@4.2.4/node_modules/@smithy/middleware-serde/dist-es/serdePlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/command.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/endpoint/EndpointParameters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/models/models_0.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/protocols/Aws_restJson1.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
class GetAsyncInvokeCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Command"].classBuilder().ep(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["commonParams"]).m(function(Command, cs, config, o) {
    return [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$serde$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serdePlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSerdePlugin"])(config, this.serialize, this.deserialize),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$endpoint$40$4$2e$3$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$getEndpointPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEndpointPlugin"])(config, Command.getEndpointParameterInstructions())
    ];
}).s("AmazonBedrockFrontendService", "GetAsyncInvoke", {}).n("BedrockRuntimeClient", "GetAsyncInvokeCommand").f(void 0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetAsyncInvokeResponseFilterSensitiveLog"]).ser(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["se_GetAsyncInvokeCommand"]).de(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["de_GetAsyncInvokeCommand"]).build() {
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/InvokeModelCommand.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvokeModelCommand",
    ()=>InvokeModelCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$endpoint$40$4$2e$3$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$getEndpointPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+middleware-endpoint@4.3.6/node_modules/@smithy/middleware-endpoint/dist-es/getEndpointPlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$serde$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serdePlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+middleware-serde@4.2.4/node_modules/@smithy/middleware-serde/dist-es/serdePlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/command.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/endpoint/EndpointParameters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/models/models_0.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/protocols/Aws_restJson1.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
class InvokeModelCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Command"].classBuilder().ep(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["commonParams"]).m(function(Command, cs, config, o) {
    return [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$serde$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serdePlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSerdePlugin"])(config, this.serialize, this.deserialize),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$endpoint$40$4$2e$3$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$getEndpointPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEndpointPlugin"])(config, Command.getEndpointParameterInstructions())
    ];
}).s("AmazonBedrockFrontendService", "InvokeModel", {}).n("BedrockRuntimeClient", "InvokeModelCommand").f(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelRequestFilterSensitiveLog"], __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelResponseFilterSensitiveLog"]).ser(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["se_InvokeModelCommand"]).de(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["de_InvokeModelCommand"]).build() {
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/InvokeModelWithBidirectionalStreamCommand.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvokeModelWithBidirectionalStreamCommand",
    ()=>InvokeModelWithBidirectionalStreamCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$eventstream$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$eventstream$2f$dist$2d$es$2f$getEventStreamPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+middleware-eventstream@3.922.0/node_modules/@aws-sdk/middleware-eventstream/dist-es/getEventStreamPlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$websocket$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$websocket$2f$dist$2d$es$2f$getWebSocketPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+middleware-websocket@3.922.0/node_modules/@aws-sdk/middleware-websocket/dist-es/getWebSocketPlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$endpoint$40$4$2e$3$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$getEndpointPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+middleware-endpoint@4.3.6/node_modules/@smithy/middleware-endpoint/dist-es/getEndpointPlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$serde$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serdePlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+middleware-serde@4.2.4/node_modules/@smithy/middleware-serde/dist-es/serdePlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/command.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/endpoint/EndpointParameters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/models/models_0.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/protocols/Aws_restJson1.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
class InvokeModelWithBidirectionalStreamCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Command"].classBuilder().ep(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["commonParams"]).m(function(Command, cs, config, o) {
    return [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$serde$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serdePlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSerdePlugin"])(config, this.serialize, this.deserialize),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$endpoint$40$4$2e$3$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$getEndpointPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEndpointPlugin"])(config, Command.getEndpointParameterInstructions()),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$eventstream$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$eventstream$2f$dist$2d$es$2f$getEventStreamPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEventStreamPlugin"])(config),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$websocket$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$websocket$2f$dist$2d$es$2f$getWebSocketPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getWebSocketPlugin"])(config, {
            headerPrefix: "x-amz-bedrock-"
        })
    ];
}).s("AmazonBedrockFrontendService", "InvokeModelWithBidirectionalStream", {
    eventStream: {
        input: true,
        output: true
    }
}).n("BedrockRuntimeClient", "InvokeModelWithBidirectionalStreamCommand").f(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelWithBidirectionalStreamRequestFilterSensitiveLog"], __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelWithBidirectionalStreamResponseFilterSensitiveLog"]).ser(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["se_InvokeModelWithBidirectionalStreamCommand"]).de(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["de_InvokeModelWithBidirectionalStreamCommand"]).build() {
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/InvokeModelWithResponseStreamCommand.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvokeModelWithResponseStreamCommand",
    ()=>InvokeModelWithResponseStreamCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$endpoint$40$4$2e$3$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$getEndpointPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+middleware-endpoint@4.3.6/node_modules/@smithy/middleware-endpoint/dist-es/getEndpointPlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$serde$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serdePlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+middleware-serde@4.2.4/node_modules/@smithy/middleware-serde/dist-es/serdePlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/command.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/endpoint/EndpointParameters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/models/models_0.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/protocols/Aws_restJson1.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
class InvokeModelWithResponseStreamCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Command"].classBuilder().ep(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["commonParams"]).m(function(Command, cs, config, o) {
    return [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$serde$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serdePlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSerdePlugin"])(config, this.serialize, this.deserialize),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$endpoint$40$4$2e$3$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$getEndpointPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEndpointPlugin"])(config, Command.getEndpointParameterInstructions())
    ];
}).s("AmazonBedrockFrontendService", "InvokeModelWithResponseStream", {
    eventStream: {
        output: true
    }
}).n("BedrockRuntimeClient", "InvokeModelWithResponseStreamCommand").f(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelWithResponseStreamRequestFilterSensitiveLog"], __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelWithResponseStreamResponseFilterSensitiveLog"]).ser(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["se_InvokeModelWithResponseStreamCommand"]).de(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["de_InvokeModelWithResponseStreamCommand"]).build() {
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/ListAsyncInvokesCommand.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ListAsyncInvokesCommand",
    ()=>ListAsyncInvokesCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$endpoint$40$4$2e$3$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$getEndpointPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+middleware-endpoint@4.3.6/node_modules/@smithy/middleware-endpoint/dist-es/getEndpointPlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$serde$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serdePlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+middleware-serde@4.2.4/node_modules/@smithy/middleware-serde/dist-es/serdePlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/command.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/endpoint/EndpointParameters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/models/models_0.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/protocols/Aws_restJson1.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
class ListAsyncInvokesCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Command"].classBuilder().ep(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["commonParams"]).m(function(Command, cs, config, o) {
    return [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$serde$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serdePlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSerdePlugin"])(config, this.serialize, this.deserialize),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$endpoint$40$4$2e$3$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$getEndpointPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEndpointPlugin"])(config, Command.getEndpointParameterInstructions())
    ];
}).s("AmazonBedrockFrontendService", "ListAsyncInvokes", {}).n("BedrockRuntimeClient", "ListAsyncInvokesCommand").f(void 0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ListAsyncInvokesResponseFilterSensitiveLog"]).ser(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["se_ListAsyncInvokesCommand"]).de(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["de_ListAsyncInvokesCommand"]).build() {
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/StartAsyncInvokeCommand.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StartAsyncInvokeCommand",
    ()=>StartAsyncInvokeCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$endpoint$40$4$2e$3$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$getEndpointPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+middleware-endpoint@4.3.6/node_modules/@smithy/middleware-endpoint/dist-es/getEndpointPlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$serde$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serdePlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+middleware-serde@4.2.4/node_modules/@smithy/middleware-serde/dist-es/serdePlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/command.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/endpoint/EndpointParameters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/models/models_0.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/protocols/Aws_restJson1.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
class StartAsyncInvokeCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Command"].classBuilder().ep(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["commonParams"]).m(function(Command, cs, config, o) {
    return [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$serde$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serdePlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSerdePlugin"])(config, this.serialize, this.deserialize),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$endpoint$40$4$2e$3$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$getEndpointPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEndpointPlugin"])(config, Command.getEndpointParameterInstructions())
    ];
}).s("AmazonBedrockFrontendService", "StartAsyncInvoke", {}).n("BedrockRuntimeClient", "StartAsyncInvokeCommand").f(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StartAsyncInvokeRequestFilterSensitiveLog"], void 0).ser(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["se_StartAsyncInvokeCommand"]).de(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$protocols$2f$Aws_restJson1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["de_StartAsyncInvokeCommand"]).build() {
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/BedrockRuntime.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BedrockRuntime",
    ()=>BedrockRuntime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$create$2d$aggregated$2d$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/create-aggregated-client.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$BedrockRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/BedrockRuntimeClient.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ApplyGuardrailCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/ApplyGuardrailCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ConverseCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/ConverseCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ConverseStreamCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/ConverseStreamCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$CountTokensCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/CountTokensCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$GetAsyncInvokeCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/GetAsyncInvokeCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$InvokeModelCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/InvokeModelCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$InvokeModelWithBidirectionalStreamCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/InvokeModelWithBidirectionalStreamCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$InvokeModelWithResponseStreamCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/InvokeModelWithResponseStreamCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListAsyncInvokesCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/ListAsyncInvokesCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$StartAsyncInvokeCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/StartAsyncInvokeCommand.js [app-route] (ecmascript) <locals>");
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
const commands = {
    ApplyGuardrailCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ApplyGuardrailCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ApplyGuardrailCommand"],
    ConverseCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ConverseCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ConverseCommand"],
    ConverseStreamCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ConverseStreamCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ConverseStreamCommand"],
    CountTokensCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$CountTokensCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CountTokensCommand"],
    GetAsyncInvokeCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$GetAsyncInvokeCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetAsyncInvokeCommand"],
    InvokeModelCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$InvokeModelCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["InvokeModelCommand"],
    InvokeModelWithBidirectionalStreamCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$InvokeModelWithBidirectionalStreamCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["InvokeModelWithBidirectionalStreamCommand"],
    InvokeModelWithResponseStreamCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$InvokeModelWithResponseStreamCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["InvokeModelWithResponseStreamCommand"],
    ListAsyncInvokesCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListAsyncInvokesCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListAsyncInvokesCommand"],
    StartAsyncInvokeCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$StartAsyncInvokeCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["StartAsyncInvokeCommand"]
};
class BedrockRuntime extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$BedrockRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockRuntimeClient"] {
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$create$2d$aggregated$2d$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAggregatedClient"])(commands, BedrockRuntime);
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
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
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/ApplyGuardrailCommand.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "$Command",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Command"],
    "ApplyGuardrailCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ApplyGuardrailCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ApplyGuardrailCommand"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ApplyGuardrailCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/ApplyGuardrailCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/command.js [app-route] (ecmascript)");
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/ConverseCommand.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "$Command",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Command"],
    "ConverseCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ConverseCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ConverseCommand"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ConverseCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/ConverseCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/command.js [app-route] (ecmascript)");
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/ConverseStreamCommand.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "$Command",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Command"],
    "ConverseStreamCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ConverseStreamCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ConverseStreamCommand"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ConverseStreamCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/ConverseStreamCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/command.js [app-route] (ecmascript)");
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/CountTokensCommand.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "$Command",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Command"],
    "CountTokensCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$CountTokensCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CountTokensCommand"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$CountTokensCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/CountTokensCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/command.js [app-route] (ecmascript)");
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/GetAsyncInvokeCommand.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "$Command",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Command"],
    "GetAsyncInvokeCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$GetAsyncInvokeCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetAsyncInvokeCommand"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$GetAsyncInvokeCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/GetAsyncInvokeCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/command.js [app-route] (ecmascript)");
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/InvokeModelCommand.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "$Command",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Command"],
    "InvokeModelCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$InvokeModelCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["InvokeModelCommand"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$InvokeModelCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/InvokeModelCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/command.js [app-route] (ecmascript)");
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/InvokeModelWithBidirectionalStreamCommand.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "$Command",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Command"],
    "InvokeModelWithBidirectionalStreamCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$InvokeModelWithBidirectionalStreamCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["InvokeModelWithBidirectionalStreamCommand"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$InvokeModelWithBidirectionalStreamCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/InvokeModelWithBidirectionalStreamCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/command.js [app-route] (ecmascript)");
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/InvokeModelWithResponseStreamCommand.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "$Command",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Command"],
    "InvokeModelWithResponseStreamCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$InvokeModelWithResponseStreamCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["InvokeModelWithResponseStreamCommand"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$InvokeModelWithResponseStreamCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/InvokeModelWithResponseStreamCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/command.js [app-route] (ecmascript)");
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/ListAsyncInvokesCommand.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "$Command",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Command"],
    "ListAsyncInvokesCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListAsyncInvokesCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListAsyncInvokesCommand"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListAsyncInvokesCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/ListAsyncInvokesCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/command.js [app-route] (ecmascript)");
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/StartAsyncInvokeCommand.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "$Command",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Command"],
    "StartAsyncInvokeCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$StartAsyncInvokeCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["StartAsyncInvokeCommand"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$StartAsyncInvokeCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/StartAsyncInvokeCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/command.js [app-route] (ecmascript)");
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "$Command",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ApplyGuardrailCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["$Command"],
    "ApplyGuardrailCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ApplyGuardrailCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApplyGuardrailCommand"],
    "ConverseCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ConverseCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseCommand"],
    "ConverseStreamCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ConverseStreamCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseStreamCommand"],
    "CountTokensCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$CountTokensCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CountTokensCommand"],
    "GetAsyncInvokeCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$GetAsyncInvokeCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetAsyncInvokeCommand"],
    "InvokeModelCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$InvokeModelCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelCommand"],
    "InvokeModelWithBidirectionalStreamCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$InvokeModelWithBidirectionalStreamCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelWithBidirectionalStreamCommand"],
    "InvokeModelWithResponseStreamCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$InvokeModelWithResponseStreamCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelWithResponseStreamCommand"],
    "ListAsyncInvokesCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListAsyncInvokesCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ListAsyncInvokesCommand"],
    "StartAsyncInvokeCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$StartAsyncInvokeCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StartAsyncInvokeCommand"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ApplyGuardrailCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/ApplyGuardrailCommand.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ConverseCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/ConverseCommand.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ConverseStreamCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/ConverseStreamCommand.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$CountTokensCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/CountTokensCommand.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$GetAsyncInvokeCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/GetAsyncInvokeCommand.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$InvokeModelCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/InvokeModelCommand.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$InvokeModelWithBidirectionalStreamCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/InvokeModelWithBidirectionalStreamCommand.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$InvokeModelWithResponseStreamCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/InvokeModelWithResponseStreamCommand.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListAsyncInvokesCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/ListAsyncInvokesCommand.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$StartAsyncInvokeCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/StartAsyncInvokeCommand.js [app-route] (ecmascript)");
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/pagination/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/pagination/Interfaces.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/pagination/ListAsyncInvokesPaginator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "paginateListAsyncInvokes",
    ()=>paginateListAsyncInvokes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+core@3.17.2/node_modules/@smithy/core/dist-es/pagination/createPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$BedrockRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/BedrockRuntimeClient.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListAsyncInvokesCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/ListAsyncInvokesCommand.js [app-route] (ecmascript) <locals>");
;
;
;
const paginateListAsyncInvokes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPaginator"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$BedrockRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockRuntimeClient"], __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListAsyncInvokesCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListAsyncInvokesCommand"], "nextToken", "nextToken", "maxResults");
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/pagination/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "paginateListAsyncInvokes",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$pagination$2f$ListAsyncInvokesPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListAsyncInvokes"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$pagination$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/pagination/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$pagination$2f$Interfaces$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/pagination/Interfaces.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$pagination$2f$ListAsyncInvokesPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/pagination/ListAsyncInvokesPaginator.js [app-route] (ecmascript)");
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/models/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/models/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AccessDeniedException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AccessDeniedException"],
    "ApplyGuardrailRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApplyGuardrailRequestFilterSensitiveLog"],
    "ApplyGuardrailResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApplyGuardrailResponseFilterSensitiveLog"],
    "AsyncInvokeOutputDataConfig",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsyncInvokeOutputDataConfig"],
    "AsyncInvokeStatus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsyncInvokeStatus"],
    "AsyncInvokeSummaryFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsyncInvokeSummaryFilterSensitiveLog"],
    "BidirectionalInputPayloadPartFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BidirectionalInputPayloadPartFilterSensitiveLog"],
    "BidirectionalOutputPayloadPartFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BidirectionalOutputPayloadPartFilterSensitiveLog"],
    "CachePointType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CachePointType"],
    "CitationGeneratedContent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CitationGeneratedContent"],
    "CitationLocation",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CitationLocation"],
    "CitationSourceContent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CitationSourceContent"],
    "ConflictException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConflictException"],
    "ContentBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ContentBlock"],
    "ContentBlockDelta",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ContentBlockDelta"],
    "ContentBlockDeltaEventFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ContentBlockDeltaEventFilterSensitiveLog"],
    "ContentBlockDeltaFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ContentBlockDeltaFilterSensitiveLog"],
    "ContentBlockFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ContentBlockFilterSensitiveLog"],
    "ContentBlockStart",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ContentBlockStart"],
    "ConversationRole",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConversationRole"],
    "ConverseOutput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseOutput"],
    "ConverseOutputFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseOutputFilterSensitiveLog"],
    "ConverseRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseRequestFilterSensitiveLog"],
    "ConverseResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseResponseFilterSensitiveLog"],
    "ConverseStreamMetadataEventFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseStreamMetadataEventFilterSensitiveLog"],
    "ConverseStreamOutput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseStreamOutput"],
    "ConverseStreamOutputFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseStreamOutputFilterSensitiveLog"],
    "ConverseStreamRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseStreamRequestFilterSensitiveLog"],
    "ConverseStreamResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseStreamResponseFilterSensitiveLog"],
    "ConverseStreamTraceFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseStreamTraceFilterSensitiveLog"],
    "ConverseTokensRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseTokensRequestFilterSensitiveLog"],
    "ConverseTraceFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseTraceFilterSensitiveLog"],
    "CountTokensInput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CountTokensInput"],
    "CountTokensInputFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CountTokensInputFilterSensitiveLog"],
    "CountTokensRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CountTokensRequestFilterSensitiveLog"],
    "DocumentContentBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DocumentContentBlock"],
    "DocumentFormat",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DocumentFormat"],
    "DocumentSource",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DocumentSource"],
    "GetAsyncInvokeResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetAsyncInvokeResponseFilterSensitiveLog"],
    "GuardrailAction",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAction"],
    "GuardrailAssessmentFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAssessmentFilterSensitiveLog"],
    "GuardrailAutomatedReasoningFinding",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningFinding"],
    "GuardrailAutomatedReasoningFindingFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningFindingFilterSensitiveLog"],
    "GuardrailAutomatedReasoningImpossibleFindingFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningImpossibleFindingFilterSensitiveLog"],
    "GuardrailAutomatedReasoningInputTextReferenceFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningInputTextReferenceFilterSensitiveLog"],
    "GuardrailAutomatedReasoningInvalidFindingFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningInvalidFindingFilterSensitiveLog"],
    "GuardrailAutomatedReasoningLogicWarningFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningLogicWarningFilterSensitiveLog"],
    "GuardrailAutomatedReasoningLogicWarningType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningLogicWarningType"],
    "GuardrailAutomatedReasoningPolicyAssessmentFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningPolicyAssessmentFilterSensitiveLog"],
    "GuardrailAutomatedReasoningSatisfiableFindingFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningSatisfiableFindingFilterSensitiveLog"],
    "GuardrailAutomatedReasoningScenarioFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningScenarioFilterSensitiveLog"],
    "GuardrailAutomatedReasoningStatementFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningStatementFilterSensitiveLog"],
    "GuardrailAutomatedReasoningTranslationAmbiguousFindingFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningTranslationAmbiguousFindingFilterSensitiveLog"],
    "GuardrailAutomatedReasoningTranslationFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningTranslationFilterSensitiveLog"],
    "GuardrailAutomatedReasoningTranslationOptionFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningTranslationOptionFilterSensitiveLog"],
    "GuardrailAutomatedReasoningValidFindingFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningValidFindingFilterSensitiveLog"],
    "GuardrailContentBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailContentBlock"],
    "GuardrailContentBlockFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailContentBlockFilterSensitiveLog"],
    "GuardrailContentFilterConfidence",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailContentFilterConfidence"],
    "GuardrailContentFilterStrength",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailContentFilterStrength"],
    "GuardrailContentFilterType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailContentFilterType"],
    "GuardrailContentPolicyAction",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailContentPolicyAction"],
    "GuardrailContentQualifier",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailContentQualifier"],
    "GuardrailContentSource",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailContentSource"],
    "GuardrailContextualGroundingFilterType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailContextualGroundingFilterType"],
    "GuardrailContextualGroundingPolicyAction",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailContextualGroundingPolicyAction"],
    "GuardrailConverseContentBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailConverseContentBlock"],
    "GuardrailConverseContentBlockFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailConverseContentBlockFilterSensitiveLog"],
    "GuardrailConverseContentQualifier",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailConverseContentQualifier"],
    "GuardrailConverseImageBlockFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailConverseImageBlockFilterSensitiveLog"],
    "GuardrailConverseImageFormat",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailConverseImageFormat"],
    "GuardrailConverseImageSource",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailConverseImageSource"],
    "GuardrailConverseImageSourceFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailConverseImageSourceFilterSensitiveLog"],
    "GuardrailImageBlockFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailImageBlockFilterSensitiveLog"],
    "GuardrailImageFormat",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailImageFormat"],
    "GuardrailImageSource",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailImageSource"],
    "GuardrailImageSourceFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailImageSourceFilterSensitiveLog"],
    "GuardrailManagedWordType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailManagedWordType"],
    "GuardrailOutputScope",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailOutputScope"],
    "GuardrailPiiEntityType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailPiiEntityType"],
    "GuardrailSensitiveInformationPolicyAction",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailSensitiveInformationPolicyAction"],
    "GuardrailStreamProcessingMode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailStreamProcessingMode"],
    "GuardrailTopicPolicyAction",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailTopicPolicyAction"],
    "GuardrailTopicType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailTopicType"],
    "GuardrailTrace",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailTrace"],
    "GuardrailTraceAssessmentFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailTraceAssessmentFilterSensitiveLog"],
    "GuardrailWordPolicyAction",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailWordPolicyAction"],
    "ImageFormat",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ImageFormat"],
    "ImageSource",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ImageSource"],
    "InternalServerException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InternalServerException"],
    "InvokeModelRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelRequestFilterSensitiveLog"],
    "InvokeModelResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelResponseFilterSensitiveLog"],
    "InvokeModelTokensRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelTokensRequestFilterSensitiveLog"],
    "InvokeModelWithBidirectionalStreamInput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelWithBidirectionalStreamInput"],
    "InvokeModelWithBidirectionalStreamInputFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelWithBidirectionalStreamInputFilterSensitiveLog"],
    "InvokeModelWithBidirectionalStreamOutput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelWithBidirectionalStreamOutput"],
    "InvokeModelWithBidirectionalStreamOutputFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelWithBidirectionalStreamOutputFilterSensitiveLog"],
    "InvokeModelWithBidirectionalStreamRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelWithBidirectionalStreamRequestFilterSensitiveLog"],
    "InvokeModelWithBidirectionalStreamResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelWithBidirectionalStreamResponseFilterSensitiveLog"],
    "InvokeModelWithResponseStreamRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelWithResponseStreamRequestFilterSensitiveLog"],
    "InvokeModelWithResponseStreamResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelWithResponseStreamResponseFilterSensitiveLog"],
    "ListAsyncInvokesResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ListAsyncInvokesResponseFilterSensitiveLog"],
    "MessageFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MessageFilterSensitiveLog"],
    "ModelErrorException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ModelErrorException"],
    "ModelNotReadyException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ModelNotReadyException"],
    "ModelStreamErrorException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ModelStreamErrorException"],
    "ModelTimeoutException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ModelTimeoutException"],
    "PayloadPartFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PayloadPartFilterSensitiveLog"],
    "PerformanceConfigLatency",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PerformanceConfigLatency"],
    "PromptVariableValues",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PromptVariableValues"],
    "ReasoningContentBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReasoningContentBlock"],
    "ReasoningContentBlockDelta",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReasoningContentBlockDelta"],
    "ReasoningContentBlockDeltaFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReasoningContentBlockDeltaFilterSensitiveLog"],
    "ReasoningContentBlockFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReasoningContentBlockFilterSensitiveLog"],
    "ReasoningTextBlockFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReasoningTextBlockFilterSensitiveLog"],
    "ResourceNotFoundException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ResourceNotFoundException"],
    "ResponseStream",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ResponseStream"],
    "ResponseStreamFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ResponseStreamFilterSensitiveLog"],
    "ServiceQuotaExceededException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ServiceQuotaExceededException"],
    "ServiceUnavailableException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ServiceUnavailableException"],
    "SortAsyncInvocationBy",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SortAsyncInvocationBy"],
    "SortOrder",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SortOrder"],
    "StartAsyncInvokeRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StartAsyncInvokeRequestFilterSensitiveLog"],
    "StopReason",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StopReason"],
    "SystemContentBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SystemContentBlock"],
    "SystemContentBlockFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SystemContentBlockFilterSensitiveLog"],
    "ThrottlingException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ThrottlingException"],
    "Tool",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Tool"],
    "ToolChoice",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ToolChoice"],
    "ToolInputSchema",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ToolInputSchema"],
    "ToolResultBlockDelta",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ToolResultBlockDelta"],
    "ToolResultContentBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ToolResultContentBlock"],
    "ToolResultStatus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ToolResultStatus"],
    "ToolUseType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ToolUseType"],
    "Trace",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Trace"],
    "ValidationException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ValidationException"],
    "VideoFormat",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["VideoFormat"],
    "VideoSource",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["VideoSource"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/models/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/models/models_0.js [app-route] (ecmascript)");
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "$Command",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["$Command"],
    "AccessDeniedException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AccessDeniedException"],
    "ApplyGuardrailCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApplyGuardrailCommand"],
    "ApplyGuardrailRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApplyGuardrailRequestFilterSensitiveLog"],
    "ApplyGuardrailResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApplyGuardrailResponseFilterSensitiveLog"],
    "AsyncInvokeOutputDataConfig",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsyncInvokeOutputDataConfig"],
    "AsyncInvokeStatus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsyncInvokeStatus"],
    "AsyncInvokeSummaryFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsyncInvokeSummaryFilterSensitiveLog"],
    "BedrockRuntime",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$BedrockRuntime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BedrockRuntime"],
    "BedrockRuntimeClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$BedrockRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BedrockRuntimeClient"],
    "BedrockRuntimeServiceException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$BedrockRuntimeServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockRuntimeServiceException"],
    "BidirectionalInputPayloadPartFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BidirectionalInputPayloadPartFilterSensitiveLog"],
    "BidirectionalOutputPayloadPartFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BidirectionalOutputPayloadPartFilterSensitiveLog"],
    "CachePointType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CachePointType"],
    "CitationGeneratedContent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CitationGeneratedContent"],
    "CitationLocation",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CitationLocation"],
    "CitationSourceContent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CitationSourceContent"],
    "ConflictException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConflictException"],
    "ContentBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ContentBlock"],
    "ContentBlockDelta",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ContentBlockDelta"],
    "ContentBlockDeltaEventFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ContentBlockDeltaEventFilterSensitiveLog"],
    "ContentBlockDeltaFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ContentBlockDeltaFilterSensitiveLog"],
    "ContentBlockFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ContentBlockFilterSensitiveLog"],
    "ContentBlockStart",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ContentBlockStart"],
    "ConversationRole",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConversationRole"],
    "ConverseCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseCommand"],
    "ConverseOutput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseOutput"],
    "ConverseOutputFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseOutputFilterSensitiveLog"],
    "ConverseRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseRequestFilterSensitiveLog"],
    "ConverseResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseResponseFilterSensitiveLog"],
    "ConverseStreamCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseStreamCommand"],
    "ConverseStreamMetadataEventFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseStreamMetadataEventFilterSensitiveLog"],
    "ConverseStreamOutput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseStreamOutput"],
    "ConverseStreamOutputFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseStreamOutputFilterSensitiveLog"],
    "ConverseStreamRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseStreamRequestFilterSensitiveLog"],
    "ConverseStreamResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseStreamResponseFilterSensitiveLog"],
    "ConverseStreamTraceFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseStreamTraceFilterSensitiveLog"],
    "ConverseTokensRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseTokensRequestFilterSensitiveLog"],
    "ConverseTraceFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConverseTraceFilterSensitiveLog"],
    "CountTokensCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CountTokensCommand"],
    "CountTokensInput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CountTokensInput"],
    "CountTokensInputFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CountTokensInputFilterSensitiveLog"],
    "CountTokensRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CountTokensRequestFilterSensitiveLog"],
    "DocumentContentBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DocumentContentBlock"],
    "DocumentFormat",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DocumentFormat"],
    "DocumentSource",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DocumentSource"],
    "GetAsyncInvokeCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetAsyncInvokeCommand"],
    "GetAsyncInvokeResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetAsyncInvokeResponseFilterSensitiveLog"],
    "GuardrailAction",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAction"],
    "GuardrailAssessmentFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAssessmentFilterSensitiveLog"],
    "GuardrailAutomatedReasoningFinding",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningFinding"],
    "GuardrailAutomatedReasoningFindingFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningFindingFilterSensitiveLog"],
    "GuardrailAutomatedReasoningImpossibleFindingFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningImpossibleFindingFilterSensitiveLog"],
    "GuardrailAutomatedReasoningInputTextReferenceFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningInputTextReferenceFilterSensitiveLog"],
    "GuardrailAutomatedReasoningInvalidFindingFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningInvalidFindingFilterSensitiveLog"],
    "GuardrailAutomatedReasoningLogicWarningFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningLogicWarningFilterSensitiveLog"],
    "GuardrailAutomatedReasoningLogicWarningType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningLogicWarningType"],
    "GuardrailAutomatedReasoningPolicyAssessmentFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningPolicyAssessmentFilterSensitiveLog"],
    "GuardrailAutomatedReasoningSatisfiableFindingFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningSatisfiableFindingFilterSensitiveLog"],
    "GuardrailAutomatedReasoningScenarioFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningScenarioFilterSensitiveLog"],
    "GuardrailAutomatedReasoningStatementFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningStatementFilterSensitiveLog"],
    "GuardrailAutomatedReasoningTranslationAmbiguousFindingFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningTranslationAmbiguousFindingFilterSensitiveLog"],
    "GuardrailAutomatedReasoningTranslationFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningTranslationFilterSensitiveLog"],
    "GuardrailAutomatedReasoningTranslationOptionFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningTranslationOptionFilterSensitiveLog"],
    "GuardrailAutomatedReasoningValidFindingFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailAutomatedReasoningValidFindingFilterSensitiveLog"],
    "GuardrailContentBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailContentBlock"],
    "GuardrailContentBlockFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailContentBlockFilterSensitiveLog"],
    "GuardrailContentFilterConfidence",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailContentFilterConfidence"],
    "GuardrailContentFilterStrength",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailContentFilterStrength"],
    "GuardrailContentFilterType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailContentFilterType"],
    "GuardrailContentPolicyAction",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailContentPolicyAction"],
    "GuardrailContentQualifier",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailContentQualifier"],
    "GuardrailContentSource",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailContentSource"],
    "GuardrailContextualGroundingFilterType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailContextualGroundingFilterType"],
    "GuardrailContextualGroundingPolicyAction",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailContextualGroundingPolicyAction"],
    "GuardrailConverseContentBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailConverseContentBlock"],
    "GuardrailConverseContentBlockFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailConverseContentBlockFilterSensitiveLog"],
    "GuardrailConverseContentQualifier",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailConverseContentQualifier"],
    "GuardrailConverseImageBlockFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailConverseImageBlockFilterSensitiveLog"],
    "GuardrailConverseImageFormat",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailConverseImageFormat"],
    "GuardrailConverseImageSource",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailConverseImageSource"],
    "GuardrailConverseImageSourceFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailConverseImageSourceFilterSensitiveLog"],
    "GuardrailImageBlockFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailImageBlockFilterSensitiveLog"],
    "GuardrailImageFormat",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailImageFormat"],
    "GuardrailImageSource",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailImageSource"],
    "GuardrailImageSourceFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailImageSourceFilterSensitiveLog"],
    "GuardrailManagedWordType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailManagedWordType"],
    "GuardrailOutputScope",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailOutputScope"],
    "GuardrailPiiEntityType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailPiiEntityType"],
    "GuardrailSensitiveInformationPolicyAction",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailSensitiveInformationPolicyAction"],
    "GuardrailStreamProcessingMode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailStreamProcessingMode"],
    "GuardrailTopicPolicyAction",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailTopicPolicyAction"],
    "GuardrailTopicType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailTopicType"],
    "GuardrailTrace",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailTrace"],
    "GuardrailTraceAssessmentFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailTraceAssessmentFilterSensitiveLog"],
    "GuardrailWordPolicyAction",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GuardrailWordPolicyAction"],
    "ImageFormat",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ImageFormat"],
    "ImageSource",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ImageSource"],
    "InternalServerException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InternalServerException"],
    "InvokeModelCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelCommand"],
    "InvokeModelRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelRequestFilterSensitiveLog"],
    "InvokeModelResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelResponseFilterSensitiveLog"],
    "InvokeModelTokensRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelTokensRequestFilterSensitiveLog"],
    "InvokeModelWithBidirectionalStreamCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelWithBidirectionalStreamCommand"],
    "InvokeModelWithBidirectionalStreamInput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelWithBidirectionalStreamInput"],
    "InvokeModelWithBidirectionalStreamInputFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelWithBidirectionalStreamInputFilterSensitiveLog"],
    "InvokeModelWithBidirectionalStreamOutput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelWithBidirectionalStreamOutput"],
    "InvokeModelWithBidirectionalStreamOutputFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelWithBidirectionalStreamOutputFilterSensitiveLog"],
    "InvokeModelWithBidirectionalStreamRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelWithBidirectionalStreamRequestFilterSensitiveLog"],
    "InvokeModelWithBidirectionalStreamResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelWithBidirectionalStreamResponseFilterSensitiveLog"],
    "InvokeModelWithResponseStreamCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelWithResponseStreamCommand"],
    "InvokeModelWithResponseStreamRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelWithResponseStreamRequestFilterSensitiveLog"],
    "InvokeModelWithResponseStreamResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeModelWithResponseStreamResponseFilterSensitiveLog"],
    "ListAsyncInvokesCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ListAsyncInvokesCommand"],
    "ListAsyncInvokesResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ListAsyncInvokesResponseFilterSensitiveLog"],
    "MessageFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MessageFilterSensitiveLog"],
    "ModelErrorException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ModelErrorException"],
    "ModelNotReadyException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ModelNotReadyException"],
    "ModelStreamErrorException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ModelStreamErrorException"],
    "ModelTimeoutException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ModelTimeoutException"],
    "PayloadPartFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PayloadPartFilterSensitiveLog"],
    "PerformanceConfigLatency",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PerformanceConfigLatency"],
    "PromptVariableValues",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PromptVariableValues"],
    "ReasoningContentBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReasoningContentBlock"],
    "ReasoningContentBlockDelta",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReasoningContentBlockDelta"],
    "ReasoningContentBlockDeltaFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReasoningContentBlockDeltaFilterSensitiveLog"],
    "ReasoningContentBlockFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReasoningContentBlockFilterSensitiveLog"],
    "ReasoningTextBlockFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReasoningTextBlockFilterSensitiveLog"],
    "ResourceNotFoundException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ResourceNotFoundException"],
    "ResponseStream",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ResponseStream"],
    "ResponseStreamFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ResponseStreamFilterSensitiveLog"],
    "ServiceQuotaExceededException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ServiceQuotaExceededException"],
    "ServiceUnavailableException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ServiceUnavailableException"],
    "SortAsyncInvocationBy",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SortAsyncInvocationBy"],
    "SortOrder",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SortOrder"],
    "StartAsyncInvokeCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StartAsyncInvokeCommand"],
    "StartAsyncInvokeRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StartAsyncInvokeRequestFilterSensitiveLog"],
    "StopReason",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StopReason"],
    "SystemContentBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SystemContentBlock"],
    "SystemContentBlockFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SystemContentBlockFilterSensitiveLog"],
    "ThrottlingException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ThrottlingException"],
    "Tool",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Tool"],
    "ToolChoice",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ToolChoice"],
    "ToolInputSchema",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ToolInputSchema"],
    "ToolResultBlockDelta",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ToolResultBlockDelta"],
    "ToolResultContentBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ToolResultContentBlock"],
    "ToolResultStatus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ToolResultStatus"],
    "ToolUseType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ToolUseType"],
    "Trace",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Trace"],
    "ValidationException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ValidationException"],
    "VideoFormat",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["VideoFormat"],
    "VideoSource",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["VideoSource"],
    "__Client",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$BedrockRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__Client"],
    "paginateListAsyncInvokes",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$pagination$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListAsyncInvokes"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$BedrockRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/BedrockRuntimeClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$BedrockRuntime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/BedrockRuntime.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/commands/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$pagination$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/pagination/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/models/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$runtime$2f$dist$2d$es$2f$models$2f$BedrockRuntimeServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-runtime/dist-es/models/BedrockRuntimeServiceException.js [app-route] (ecmascript) <locals>");
}),
];

//# sourceMappingURL=215cd_%40aws-sdk_client-bedrock-runtime_051f9591._.js.map