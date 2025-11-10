module.exports = [
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/auth/httpAuthSchemeProvider.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultBedrockAgentRuntimeHttpAuthSchemeParametersProvider",
    ()=>defaultBedrockAgentRuntimeHttpAuthSchemeParametersProvider,
    "defaultBedrockAgentRuntimeHttpAuthSchemeProvider",
    ()=>defaultBedrockAgentRuntimeHttpAuthSchemeProvider,
    "resolveHttpAuthSchemeConfig",
    ()=>resolveHttpAuthSchemeConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$resolveAwsSdkSigV4Config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+core@3.927.0/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/resolveAwsSdkSigV4Config.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$middleware$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$getSmithyContext$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+util-middleware@4.2.4/node_modules/@smithy/util-middleware/dist-es/getSmithyContext.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$middleware$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+util-middleware@4.2.4/node_modules/@smithy/util-middleware/dist-es/normalizeProvider.js [app-route] (ecmascript)");
;
;
const defaultBedrockAgentRuntimeHttpAuthSchemeParametersProvider = async (config, context, input)=>{
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
const defaultBedrockAgentRuntimeHttpAuthSchemeProvider = (authParameters)=>{
    const options = [];
    switch(authParameters.operation){
        default:
            {
                options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
            }
    }
    return options;
};
const resolveHttpAuthSchemeConfig = (config)=>{
    const config_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$resolveAwsSdkSigV4Config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveAwsSdkSigV4Config"])(config);
    return Object.assign(config_0, {
        authSchemePreference: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$middleware$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeProvider"])(config.authSchemePreference ?? [])
    });
};
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/auth/httpAuthExtensionConfiguration.js [app-route] (ecmascript)", ((__turbopack_context__) => {
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
        }
    };
};
const resolveHttpAuthRuntimeConfig = (config)=>{
    return {
        httpAuthSchemes: config.httpAuthSchemes(),
        httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
        credentials: config.credentials()
    };
};
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/endpoint/EndpointParameters.js [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/endpoint/ruleset.js [app-route] (ecmascript)", ((__turbopack_context__) => {
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
                                                                url: "https://bedrock-agent-runtime-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
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
                                                                url: "https://bedrock-agent-runtime-fips.{Region}.{PartitionResult#dnsSuffix}",
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
                                                                url: "https://bedrock-agent-runtime.{Region}.{PartitionResult#dualStackDnsSuffix}",
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
                                                url: "https://bedrock-agent-runtime.{Region}.{PartitionResult#dnsSuffix}",
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
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/endpoint/endpointResolver.js [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$ruleset$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/endpoint/ruleset.js [app-route] (ecmascript)");
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
    return cache.get(endpointParams, ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$endpoints$40$3$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$resolveEndpoint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveEndpoint"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$ruleset$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ruleSet"], {
            endpointParams: endpointParams,
            logger: context.logger
        }));
};
__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$endpoints$40$3$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$customEndpointFunctions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customEndpointFunctions"].aws = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$util$2d$endpoints$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$aws$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awsEndpointFunctions"];
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/runtimeConfig.shared.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRuntimeConfig",
    ()=>getRuntimeConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$AwsSdkSigV4Signer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+core@3.927.0/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/AwsSdkSigV4Signer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$NoOpLogger$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/NoOpLogger.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$url$2d$parser$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$url$2d$parser$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+url-parser@4.2.4/node_modules/@smithy/url-parser/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$base64$40$4$2e$3$2e$0$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$fromBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+util-base64@4.3.0/node_modules/@smithy/util-base64/dist-es/fromBase64.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$base64$40$4$2e$3$2e$0$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$toBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+util-base64@4.3.0/node_modules/@smithy/util-base64/dist-es/toBase64.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$utf8$40$4$2e$2$2e$0$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$fromUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+util-utf8@4.2.0/node_modules/@smithy/util-utf8/dist-es/fromUtf8.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$utf8$40$4$2e$2$2e$0$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$toUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+util-utf8@4.2.0/node_modules/@smithy/util-utf8/dist-es/toUtf8.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$auth$2f$httpAuthSchemeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/auth/httpAuthSchemeProvider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$endpointResolver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/endpoint/endpointResolver.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
const getRuntimeConfig = (config)=>{
    return {
        apiVersion: "2023-07-26",
        base64Decoder: config?.base64Decoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$base64$40$4$2e$3$2e$0$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$fromBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromBase64"],
        base64Encoder: config?.base64Encoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$base64$40$4$2e$3$2e$0$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$toBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toBase64"],
        disableHostPrefix: config?.disableHostPrefix ?? false,
        endpointProvider: config?.endpointProvider ?? __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$endpointResolver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultEndpointResolver"],
        extensions: config?.extensions ?? [],
        httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$auth$2f$httpAuthSchemeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultBedrockAgentRuntimeHttpAuthSchemeProvider"],
        httpAuthSchemes: config?.httpAuthSchemes ?? [
            {
                schemeId: "aws.auth#sigv4",
                identityProvider: (ipc)=>ipc.getIdentityProvider("aws.auth#sigv4"),
                signer: new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$AwsSdkSigV4Signer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AwsSdkSigV4Signer"]()
            }
        ],
        logger: config?.logger ?? new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$NoOpLogger$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NoOpLogger"](),
        serviceId: config?.serviceId ?? "Bedrock Agent Runtime",
        urlParser: config?.urlParser ?? __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$url$2d$parser$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$url$2d$parser$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseUrl"],
        utf8Decoder: config?.utf8Decoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$utf8$40$4$2e$2$2e$0$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$fromUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromUtf8"],
        utf8Encoder: config?.utf8Encoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$utf8$40$4$2e$2$2e$0$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$toUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toUtf8"]
    };
};
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/runtimeConfig.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRuntimeConfig",
    ()=>getRuntimeConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$package$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/package.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$NODE_AUTH_SCHEME_PREFERENCE_OPTIONS$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+core@3.927.0/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/NODE_AUTH_SCHEME_PREFERENCE_OPTIONS.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$core$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$emitWarningIfUnsupportedVersion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+core@3.927.0/node_modules/@aws-sdk/core/dist-es/submodules/client/emitWarningIfUnsupportedVersion.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$node$2f$dist$2d$es$2f$defaultProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+credential-provider-node@3.927.0/node_modules/@aws-sdk/credential-provider-node/dist-es/defaultProvider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$util$2d$user$2d$agent$2d$node$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$nodeAppIdConfigOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+util-user-agent-node@3.927.0/node_modules/@aws-sdk/util-user-agent-node/dist-es/nodeAppIdConfigOptions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$util$2d$user$2d$agent$2d$node$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$defaultUserAgent$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+util-user-agent-node@3.927.0/node_modules/@aws-sdk/util-user-agent-node/dist-es/defaultUserAgent.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$config$2d$resolver$40$4$2e$4$2e$2$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+config-resolver@4.4.2/node_modules/@smithy/config-resolver/dist-es/regionConfig/config.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$config$2d$resolver$40$4$2e$4$2e$2$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$endpointsConfig$2f$NodeUseDualstackEndpointConfigOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+config-resolver@4.4.2/node_modules/@smithy/config-resolver/dist-es/endpointsConfig/NodeUseDualstackEndpointConfigOptions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$config$2d$resolver$40$4$2e$4$2e$2$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$endpointsConfig$2f$NodeUseFipsEndpointConfigOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+config-resolver@4.4.2/node_modules/@smithy/config-resolver/dist-es/endpointsConfig/NodeUseFipsEndpointConfigOptions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$eventstream$2d$serde$2d$node$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$eventstream$2d$serde$2d$node$2f$dist$2d$es$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+eventstream-serde-node@4.2.4/node_modules/@smithy/eventstream-serde-node/dist-es/provider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$hash$2d$node$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$hash$2d$node$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+hash-node@4.2.4/node_modules/@smithy/hash-node/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$retry$40$4$2e$4$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+middleware-retry@4.4.6/node_modules/@smithy/middleware-retry/dist-es/configurations.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$node$2d$config$2d$provider$40$4$2e$3$2e$4$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+node-config-provider@4.3.4/node_modules/@smithy/node-config-provider/dist-es/configLoader.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$node$2d$http$2d$handler$40$4$2e$4$2e$4$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$node$2d$http$2d$handler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+node-http-handler@4.4.4/node_modules/@smithy/node-http-handler/dist-es/node-http-handler.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$node$2d$http$2d$handler$40$4$2e$4$2e$4$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$stream$2d$collector$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+node-http-handler@4.4.4/node_modules/@smithy/node-http-handler/dist-es/stream-collector/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$body$2d$length$2d$node$40$4$2e$2$2e$1$2f$node_modules$2f40$smithy$2f$util$2d$body$2d$length$2d$node$2f$dist$2d$es$2f$calculateBodyLength$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+util-body-length-node@4.2.1/node_modules/@smithy/util-body-length-node/dist-es/calculateBodyLength.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$retry$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+util-retry@4.2.4/node_modules/@smithy/util-retry/dist-es/config.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$runtimeConfig$2e$shared$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/runtimeConfig.shared.js [app-route] (ecmascript)");
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
const getRuntimeConfig = (config)=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$emitWarningIfUnsupportedVersion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["emitWarningIfUnsupportedVersion"])(process.version);
    const defaultsMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$util$2d$defaults$2d$mode$2d$node$40$4$2e$2$2e$8$2f$node_modules$2f40$smithy$2f$util$2d$defaults$2d$mode$2d$node$2f$dist$2d$es$2f$resolveDefaultsModeConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveDefaultsModeConfig"])(config);
    const defaultConfigProvider = ()=>defaultsMode().then(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$defaults$2d$mode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfigsForDefaultMode"]);
    const clientSharedValues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$runtimeConfig$2e$shared$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRuntimeConfig"])(config);
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
            clientVersion: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$package$2e$json__$28$json$29$__["default"].version
        }),
        eventStreamSerdeProvider: config?.eventStreamSerdeProvider ?? __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$eventstream$2d$serde$2d$node$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$eventstream$2d$serde$2d$node$2f$dist$2d$es$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eventStreamSerdeProvider"],
        maxAttempts: config?.maxAttempts ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$node$2d$config$2d$provider$40$4$2e$3$2e$4$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$retry$40$4$2e$4$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_MAX_ATTEMPT_CONFIG_OPTIONS"], config),
        region: config?.region ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$node$2d$config$2d$provider$40$4$2e$3$2e$4$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$config$2d$resolver$40$4$2e$4$2e$2$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_REGION_CONFIG_OPTIONS"], {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$config$2d$resolver$40$4$2e$4$2e$2$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_REGION_CONFIG_FILE_OPTIONS"],
            ...loaderConfig
        }),
        requestHandler: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$node$2d$http$2d$handler$40$4$2e$4$2e$4$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$node$2d$http$2d$handler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NodeHttpHandler"].create(config?.requestHandler ?? defaultConfigProvider),
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
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/runtimeExtensions.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveRuntimeExtensions",
    ()=>resolveRuntimeExtensions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$region$2d$config$2d$resolver$40$3$2e$925$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$region$2d$config$2d$resolver$2f$dist$2d$es$2f$extensions$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+region-config-resolver@3.925.0/node_modules/@aws-sdk/region-config-resolver/dist-es/extensions/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$protocol$2d$http$40$5$2e$3$2e$4$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$extensions$2f$httpExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+protocol-http@5.3.4/node_modules/@smithy/protocol-http/dist-es/extensions/httpExtensionConfiguration.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$extensions$2f$defaultExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/extensions/defaultExtensionConfiguration.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$auth$2f$httpAuthExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/auth/httpAuthExtensionConfiguration.js [app-route] (ecmascript)");
;
;
;
;
const resolveRuntimeExtensions = (runtimeConfig, extensions)=>{
    const extensionConfiguration = Object.assign((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$region$2d$config$2d$resolver$40$3$2e$925$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$region$2d$config$2d$resolver$2f$dist$2d$es$2f$extensions$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAwsRegionExtensionConfiguration"])(runtimeConfig), (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$extensions$2f$defaultExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultExtensionConfiguration"])(runtimeConfig), (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$protocol$2d$http$40$5$2e$3$2e$4$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$extensions$2f$httpExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHttpHandlerExtensionConfiguration"])(runtimeConfig), (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$auth$2f$httpAuthExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHttpAuthExtensionConfiguration"])(runtimeConfig));
    extensions.forEach((extension)=>extension.configure(extensionConfiguration));
    return Object.assign(runtimeConfig, (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$region$2d$config$2d$resolver$40$3$2e$925$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$region$2d$config$2d$resolver$2f$dist$2d$es$2f$extensions$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveAwsRegionExtensionConfiguration"])(extensionConfiguration), (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$extensions$2f$defaultExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveDefaultRuntimeConfig"])(extensionConfiguration), (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$protocol$2d$http$40$5$2e$3$2e$4$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$extensions$2f$httpExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveHttpHandlerRuntimeConfig"])(extensionConfiguration), (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$auth$2f$httpAuthExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveHttpAuthRuntimeConfig"])(extensionConfiguration));
};
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/BedrockAgentRuntimeClient.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BedrockAgentRuntimeClient",
    ()=>BedrockAgentRuntimeClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$host$2d$header$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$host$2d$header$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+middleware-host-header@3.922.0/node_modules/@aws-sdk/middleware-host-header/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$logger$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$logger$2f$dist$2d$es$2f$loggerMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+middleware-logger@3.922.0/node_modules/@aws-sdk/middleware-logger/dist-es/loggerMiddleware.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$recursion$2d$detection$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$recursion$2d$detection$2f$dist$2d$es$2f$getRecursionDetectionPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+middleware-recursion-detection@3.922.0/node_modules/@aws-sdk/middleware-recursion-detection/dist-es/getRecursionDetectionPlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$user$2d$agent$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$user$2d$agent$2d$middleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+middleware-user-agent@3.927.0/node_modules/@aws-sdk/middleware-user-agent/dist-es/user-agent-middleware.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$user$2d$agent$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+middleware-user-agent@3.927.0/node_modules/@aws-sdk/middleware-user-agent/dist-es/configurations.js [app-route] (ecmascript)");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$auth$2f$httpAuthSchemeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/auth/httpAuthSchemeProvider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/endpoint/EndpointParameters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$runtimeConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/runtimeConfig.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$runtimeExtensions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/runtimeExtensions.js [app-route] (ecmascript)");
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
class BedrockAgentRuntimeClient extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Client"] {
    config;
    constructor(...[configuration]){
        const _config_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$runtimeConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRuntimeConfig"])(configuration || {});
        super(_config_0);
        this.initConfig = _config_0;
        const _config_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveClientEndpointParameters"])(_config_0);
        const _config_2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$user$2d$agent$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveUserAgentConfig"])(_config_1);
        const _config_3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$retry$40$4$2e$4$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveRetryConfig"])(_config_2);
        const _config_4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$config$2d$resolver$40$4$2e$4$2e$2$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$resolveRegionConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveRegionConfig"])(_config_3);
        const _config_5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$host$2d$header$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$host$2d$header$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveHostHeaderConfig"])(_config_4);
        const _config_6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$endpoint$40$4$2e$3$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$resolveEndpointConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveEndpointConfig"])(_config_5);
        const _config_7 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$eventstream$2d$serde$2d$config$2d$resolver$40$4$2e$3$2e$4$2f$node_modules$2f40$smithy$2f$eventstream$2d$serde$2d$config$2d$resolver$2f$dist$2d$es$2f$EventStreamSerdeConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveEventStreamSerdeConfig"])(_config_6);
        const _config_8 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$auth$2f$httpAuthSchemeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveHttpAuthSchemeConfig"])(_config_7);
        const _config_9 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$runtimeExtensions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveRuntimeExtensions"])(_config_8, configuration?.extensions || []);
        this.config = _config_9;
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$user$2d$agent$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$user$2d$agent$2d$middleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUserAgentPlugin"])(this.config));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$retry$40$4$2e$4$2e$6$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$retryMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRetryPlugin"])(this.config));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$middleware$2d$content$2d$length$40$4$2e$2$2e$4$2f$node_modules$2f40$smithy$2f$middleware$2d$content$2d$length$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getContentLengthPlugin"])(this.config));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$host$2d$header$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$host$2d$header$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHostHeaderPlugin"])(this.config));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$logger$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$logger$2f$dist$2d$es$2f$loggerMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLoggerPlugin"])(this.config));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$middleware$2d$recursion$2d$detection$40$3$2e$922$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$recursion$2d$detection$2f$dist$2d$es$2f$getRecursionDetectionPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRecursionDetectionPlugin"])(this.config));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$middleware$2d$http$2d$auth$2d$scheme$2f$getHttpAuthSchemeEndpointRuleSetPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHttpAuthSchemeEndpointRuleSetPlugin"])(this.config, {
            httpAuthSchemeParametersProvider: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$auth$2f$httpAuthSchemeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultBedrockAgentRuntimeHttpAuthSchemeParametersProvider"],
            identityProviderConfigProvider: async (config)=>new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$util$2d$identity$2d$and$2d$auth$2f$DefaultIdentityProviderConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DefaultIdentityProviderConfig"]({
                    "aws.auth#sigv4": config.credentials
                })
        }));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$middleware$2d$http$2d$signing$2f$getHttpSigningMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHttpSigningPlugin"])(this.config));
    }
    destroy() {
        super.destroy();
    }
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/BedrockAgentRuntimeClient.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BedrockAgentRuntimeClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$BedrockAgentRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockAgentRuntimeClient"],
    "__Client",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Client"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$BedrockAgentRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/BedrockAgentRuntimeClient.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/client.js [app-route] (ecmascript)");
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/BedrockAgentRuntime.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BedrockAgentRuntime",
    ()=>BedrockAgentRuntime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$create$2d$aggregated$2d$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+smithy-client@4.9.2/node_modules/@smithy/smithy-client/dist-es/create-aggregated-client.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$BedrockAgentRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/BedrockAgentRuntimeClient.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$CreateInvocationCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/CreateInvocationCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$CreateSessionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/CreateSessionCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$DeleteAgentMemoryCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/DeleteAgentMemoryCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$DeleteSessionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/DeleteSessionCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$EndSessionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/EndSessionCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$GenerateQueryCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/GenerateQueryCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$GetAgentMemoryCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/GetAgentMemoryCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$GetExecutionFlowSnapshotCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/GetExecutionFlowSnapshotCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$GetFlowExecutionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/GetFlowExecutionCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$GetInvocationStepCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/GetInvocationStepCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$GetSessionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/GetSessionCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$InvokeAgentCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/InvokeAgentCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$InvokeFlowCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/InvokeFlowCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$InvokeInlineAgentCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/InvokeInlineAgentCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListFlowExecutionEventsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/ListFlowExecutionEventsCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListFlowExecutionsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/ListFlowExecutionsCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListInvocationsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/ListInvocationsCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListInvocationStepsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/ListInvocationStepsCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListSessionsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/ListSessionsCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListTagsForResourceCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/ListTagsForResourceCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$OptimizePromptCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/OptimizePromptCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$PutInvocationStepCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/PutInvocationStepCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$RerankCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/RerankCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$RetrieveAndGenerateCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/RetrieveAndGenerateCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$RetrieveAndGenerateStreamCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/RetrieveAndGenerateStreamCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$RetrieveCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/RetrieveCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$StartFlowExecutionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/StartFlowExecutionCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$StopFlowExecutionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/StopFlowExecutionCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$TagResourceCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/TagResourceCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$UntagResourceCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/UntagResourceCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$UpdateSessionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/UpdateSessionCommand.js [app-route] (ecmascript) <locals>");
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
const commands = {
    CreateInvocationCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$CreateInvocationCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CreateInvocationCommand"],
    CreateSessionCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$CreateSessionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CreateSessionCommand"],
    DeleteAgentMemoryCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$DeleteAgentMemoryCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DeleteAgentMemoryCommand"],
    DeleteSessionCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$DeleteSessionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DeleteSessionCommand"],
    EndSessionCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$EndSessionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["EndSessionCommand"],
    GenerateQueryCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$GenerateQueryCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GenerateQueryCommand"],
    GetAgentMemoryCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$GetAgentMemoryCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetAgentMemoryCommand"],
    GetExecutionFlowSnapshotCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$GetExecutionFlowSnapshotCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetExecutionFlowSnapshotCommand"],
    GetFlowExecutionCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$GetFlowExecutionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetFlowExecutionCommand"],
    GetInvocationStepCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$GetInvocationStepCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetInvocationStepCommand"],
    GetSessionCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$GetSessionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetSessionCommand"],
    InvokeAgentCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$InvokeAgentCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["InvokeAgentCommand"],
    InvokeFlowCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$InvokeFlowCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["InvokeFlowCommand"],
    InvokeInlineAgentCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$InvokeInlineAgentCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["InvokeInlineAgentCommand"],
    ListFlowExecutionEventsCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListFlowExecutionEventsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListFlowExecutionEventsCommand"],
    ListFlowExecutionsCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListFlowExecutionsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListFlowExecutionsCommand"],
    ListInvocationsCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListInvocationsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListInvocationsCommand"],
    ListInvocationStepsCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListInvocationStepsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListInvocationStepsCommand"],
    ListSessionsCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListSessionsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListSessionsCommand"],
    ListTagsForResourceCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListTagsForResourceCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListTagsForResourceCommand"],
    OptimizePromptCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$OptimizePromptCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["OptimizePromptCommand"],
    PutInvocationStepCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$PutInvocationStepCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PutInvocationStepCommand"],
    RerankCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$RerankCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["RerankCommand"],
    RetrieveCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$RetrieveCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["RetrieveCommand"],
    RetrieveAndGenerateCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$RetrieveAndGenerateCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["RetrieveAndGenerateCommand"],
    RetrieveAndGenerateStreamCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$RetrieveAndGenerateStreamCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["RetrieveAndGenerateStreamCommand"],
    StartFlowExecutionCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$StartFlowExecutionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["StartFlowExecutionCommand"],
    StopFlowExecutionCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$StopFlowExecutionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["StopFlowExecutionCommand"],
    TagResourceCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$TagResourceCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TagResourceCommand"],
    UntagResourceCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$UntagResourceCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UntagResourceCommand"],
    UpdateSessionCommand: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$UpdateSessionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UpdateSessionCommand"]
};
class BedrockAgentRuntime extends __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$BedrockAgentRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockAgentRuntimeClient"] {
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$smithy$2d$client$40$4$2e$9$2e$2$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$create$2d$aggregated$2d$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAggregatedClient"])(commands, BedrockAgentRuntime);
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/pagination/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
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
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/pagination/GetAgentMemoryPaginator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "paginateGetAgentMemory",
    ()=>paginateGetAgentMemory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+core@3.17.2/node_modules/@smithy/core/dist-es/pagination/createPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$BedrockAgentRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/BedrockAgentRuntimeClient.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$GetAgentMemoryCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/GetAgentMemoryCommand.js [app-route] (ecmascript) <locals>");
;
;
;
const paginateGetAgentMemory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPaginator"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$BedrockAgentRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockAgentRuntimeClient"], __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$GetAgentMemoryCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetAgentMemoryCommand"], "nextToken", "nextToken", "maxItems");
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/pagination/Interfaces.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/pagination/ListFlowExecutionEventsPaginator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "paginateListFlowExecutionEvents",
    ()=>paginateListFlowExecutionEvents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+core@3.17.2/node_modules/@smithy/core/dist-es/pagination/createPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$BedrockAgentRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/BedrockAgentRuntimeClient.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListFlowExecutionEventsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/ListFlowExecutionEventsCommand.js [app-route] (ecmascript) <locals>");
;
;
;
const paginateListFlowExecutionEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPaginator"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$BedrockAgentRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockAgentRuntimeClient"], __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListFlowExecutionEventsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListFlowExecutionEventsCommand"], "nextToken", "nextToken", "maxResults");
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/pagination/ListFlowExecutionsPaginator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "paginateListFlowExecutions",
    ()=>paginateListFlowExecutions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+core@3.17.2/node_modules/@smithy/core/dist-es/pagination/createPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$BedrockAgentRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/BedrockAgentRuntimeClient.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListFlowExecutionsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/ListFlowExecutionsCommand.js [app-route] (ecmascript) <locals>");
;
;
;
const paginateListFlowExecutions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPaginator"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$BedrockAgentRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockAgentRuntimeClient"], __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListFlowExecutionsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListFlowExecutionsCommand"], "nextToken", "nextToken", "maxResults");
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/pagination/ListInvocationStepsPaginator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "paginateListInvocationSteps",
    ()=>paginateListInvocationSteps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+core@3.17.2/node_modules/@smithy/core/dist-es/pagination/createPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$BedrockAgentRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/BedrockAgentRuntimeClient.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListInvocationStepsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/ListInvocationStepsCommand.js [app-route] (ecmascript) <locals>");
;
;
;
const paginateListInvocationSteps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPaginator"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$BedrockAgentRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockAgentRuntimeClient"], __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListInvocationStepsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListInvocationStepsCommand"], "nextToken", "nextToken", "maxResults");
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/pagination/ListInvocationsPaginator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "paginateListInvocations",
    ()=>paginateListInvocations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+core@3.17.2/node_modules/@smithy/core/dist-es/pagination/createPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$BedrockAgentRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/BedrockAgentRuntimeClient.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListInvocationsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/ListInvocationsCommand.js [app-route] (ecmascript) <locals>");
;
;
;
const paginateListInvocations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPaginator"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$BedrockAgentRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockAgentRuntimeClient"], __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListInvocationsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListInvocationsCommand"], "nextToken", "nextToken", "maxResults");
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/pagination/ListSessionsPaginator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "paginateListSessions",
    ()=>paginateListSessions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+core@3.17.2/node_modules/@smithy/core/dist-es/pagination/createPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$BedrockAgentRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/BedrockAgentRuntimeClient.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListSessionsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/ListSessionsCommand.js [app-route] (ecmascript) <locals>");
;
;
;
const paginateListSessions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPaginator"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$BedrockAgentRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockAgentRuntimeClient"], __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$ListSessionsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListSessionsCommand"], "nextToken", "nextToken", "maxResults");
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/pagination/RerankPaginator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "paginateRerank",
    ()=>paginateRerank
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+core@3.17.2/node_modules/@smithy/core/dist-es/pagination/createPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$BedrockAgentRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/BedrockAgentRuntimeClient.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$RerankCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/RerankCommand.js [app-route] (ecmascript) <locals>");
;
;
;
const paginateRerank = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPaginator"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$BedrockAgentRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockAgentRuntimeClient"], __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$RerankCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["RerankCommand"], "nextToken", "nextToken", "");
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/pagination/RetrievePaginator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "paginateRetrieve",
    ()=>paginateRetrieve
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@smithy+core@3.17.2/node_modules/@smithy/core/dist-es/pagination/createPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$BedrockAgentRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/BedrockAgentRuntimeClient.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$RetrieveCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/commands/RetrieveCommand.js [app-route] (ecmascript) <locals>");
;
;
;
const paginateRetrieve = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$smithy$2b$core$40$3$2e$17$2e$2$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPaginator"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$BedrockAgentRuntimeClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BedrockAgentRuntimeClient"], __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$commands$2f$RetrieveCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["RetrieveCommand"], "nextToken", "nextToken", "");
}),
"[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/pagination/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "paginateGetAgentMemory",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$pagination$2f$GetAgentMemoryPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateGetAgentMemory"],
    "paginateListFlowExecutionEvents",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$pagination$2f$ListFlowExecutionEventsPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListFlowExecutionEvents"],
    "paginateListFlowExecutions",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$pagination$2f$ListFlowExecutionsPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListFlowExecutions"],
    "paginateListInvocationSteps",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$pagination$2f$ListInvocationStepsPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListInvocationSteps"],
    "paginateListInvocations",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$pagination$2f$ListInvocationsPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListInvocations"],
    "paginateListSessions",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$pagination$2f$ListSessionsPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListSessions"],
    "paginateRerank",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$pagination$2f$RerankPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateRerank"],
    "paginateRetrieve",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$pagination$2f$RetrievePaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateRetrieve"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$pagination$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/pagination/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$pagination$2f$GetAgentMemoryPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/pagination/GetAgentMemoryPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$pagination$2f$Interfaces$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/pagination/Interfaces.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$pagination$2f$ListFlowExecutionEventsPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/pagination/ListFlowExecutionEventsPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$pagination$2f$ListFlowExecutionsPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/pagination/ListFlowExecutionsPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$pagination$2f$ListInvocationStepsPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/pagination/ListInvocationStepsPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$pagination$2f$ListInvocationsPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/pagination/ListInvocationsPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$pagination$2f$ListSessionsPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/pagination/ListSessionsPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$pagination$2f$RerankPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/pagination/RerankPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f2e$pnpm$2f40$aws$2d$sdk$2b$client$2d$bedrock$2d$agent$2d$runtime$40$3$2e$927$2e$0$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$bedrock$2d$agent$2d$runtime$2f$dist$2d$es$2f$pagination$2f$RetrievePaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/.pnpm/@aws-sdk+client-bedrock-agent-runtime@3.927.0/node_modules/@aws-sdk/client-bedrock-agent-runtime/dist-es/pagination/RetrievePaginator.js [app-route] (ecmascript)");
}),
];

//# sourceMappingURL=6f3fb_%40aws-sdk_client-bedrock-agent-runtime_dist-es_0fff476a._.js.map