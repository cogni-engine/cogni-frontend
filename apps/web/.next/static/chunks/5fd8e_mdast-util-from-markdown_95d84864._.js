(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/unist-util-stringify-position/lib/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Point} Point
 * @typedef {import('unist').Position} Position
 */ /**
 * @typedef NodeLike
 * @property {string} type
 * @property {PositionLike | null | undefined} [position]
 *
 * @typedef PointLike
 * @property {number | null | undefined} [line]
 * @property {number | null | undefined} [column]
 * @property {number | null | undefined} [offset]
 *
 * @typedef PositionLike
 * @property {PointLike | null | undefined} [start]
 * @property {PointLike | null | undefined} [end]
 */ /**
 * Serialize the positional info of a point, position (start and end points),
 * or node.
 *
 * @param {Node | NodeLike | Point | PointLike | Position | PositionLike | null | undefined} [value]
 *   Node, position, or point.
 * @returns {string}
 *   Pretty printed positional info of a node (`string`).
 *
 *   In the format of a range `ls:cs-le:ce` (when given `node` or `position`)
 *   or a point `l:c` (when given `point`), where `l` stands for line, `c` for
 *   column, `s` for `start`, and `e` for end.
 *   An empty string (`''`) is returned if the given value is neither `node`,
 *   `position`, nor `point`.
 */ __turbopack_context__.s([
    "stringifyPosition",
    ()=>stringifyPosition
]);
function stringifyPosition(value) {
    // Nothing.
    if (!value || typeof value !== 'object') {
        return '';
    }
    // Node.
    if ('position' in value || 'type' in value) {
        return position(value.position);
    }
    // Position.
    if ('start' in value || 'end' in value) {
        return position(value);
    }
    // Point.
    if ('line' in value || 'column' in value) {
        return point(value);
    }
    // ?
    return '';
}
/**
 * @param {Point | PointLike | null | undefined} point
 * @returns {string}
 */ function point(point) {
    return index(point && point.line) + ':' + index(point && point.column);
}
/**
 * @param {Position | PositionLike | null | undefined} pos
 * @returns {string}
 */ function position(pos) {
    return point(pos && pos.start) + '-' + point(pos && pos.end);
}
/**
 * @param {number | null | undefined} value
 * @returns {number}
 */ function index(value) {
    return value && typeof value === 'number' ? value : 1;
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/micromark/dev/lib/initialize/content.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {
 *   InitialConstruct,
 *   Initializer,
 *   State,
 *   TokenizeContext,
 *   Token
 * } from 'micromark-util-types'
 */ __turbopack_context__.s([
    "content",
    ()=>content
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/devlop/lib/development.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-factory-space/dev/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-character/dev/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-symbol/lib/codes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-symbol/lib/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-symbol/lib/types.js [app-client] (ecmascript)");
;
;
;
;
const content = {
    tokenize: initializeContent
};
/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Initializer}
 *   Content.
 */ function initializeContent(effects) {
    const contentStart = effects.attempt(this.parser.constructs.contentInitial, afterContentStartConstruct, paragraphInitial);
    /** @type {Token} */ let previous;
    return contentStart;
    //TURBOPACK unreachable
    ;
    /** @type {State} */ function afterContentStartConstruct(code) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(code === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].eof || (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["markdownLineEnding"])(code), 'expected eol or eof');
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].eof) {
            effects.consume(code);
            return;
        }
        effects.enter(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].lineEnding);
        effects.consume(code);
        effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].lineEnding);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["factorySpace"])(effects, contentStart, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].linePrefix);
    }
    /** @type {State} */ function paragraphInitial(code) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(code !== __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].eof && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["markdownLineEnding"])(code), 'expected anything other than a line ending or EOF');
        effects.enter(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].paragraph);
        return lineStart(code);
    }
    /** @type {State} */ function lineStart(code) {
        const token = effects.enter(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].chunkText, {
            contentType: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constants"].contentTypeText,
            previous
        });
        if (previous) {
            previous.next = token;
        }
        previous = token;
        return data(code);
    }
    /** @type {State} */ function data(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].eof) {
            effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].chunkText);
            effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].paragraph);
            effects.consume(code);
            return;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["markdownLineEnding"])(code)) {
            effects.consume(code);
            effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].chunkText);
            return lineStart;
        }
        // Data.
        effects.consume(code);
        return data;
    }
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/micromark/dev/lib/initialize/document.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {
 *   Construct,
 *   ContainerState,
 *   InitialConstruct,
 *   Initializer,
 *   Point,
 *   State,
 *   TokenizeContext,
 *   Tokenizer,
 *   Token
 * } from 'micromark-util-types'
 */ /**
 * @typedef {[Construct, ContainerState]} StackItem
 *   Construct and its state.
 */ __turbopack_context__.s([
    "document",
    ()=>document
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/devlop/lib/development.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-factory-space/dev/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-character/dev/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$chunked$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-chunked/dev/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-symbol/lib/codes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-symbol/lib/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-symbol/lib/types.js [app-client] (ecmascript)");
;
;
;
;
;
const document = {
    tokenize: initializeDocument
};
/** @type {Construct} */ const containerConstruct = {
    tokenize: tokenizeContainer
};
/**
 * @this {TokenizeContext}
 *   Self.
 * @type {Initializer}
 *   Initializer.
 */ function initializeDocument(effects) {
    const self = this;
    /** @type {Array<StackItem>} */ const stack = [];
    let continued = 0;
    /** @type {TokenizeContext | undefined} */ let childFlow;
    /** @type {Token | undefined} */ let childToken;
    /** @type {number} */ let lineStartOffset;
    return start;
    //TURBOPACK unreachable
    ;
    /** @type {State} */ function start(code) {
        // First we iterate through the open blocks, starting with the root
        // document, and descending through last children down to the last open
        // block.
        // Each block imposes a condition that the line must satisfy if the block is
        // to remain open.
        // For example, a block quote requires a `>` character.
        // A paragraph requires a non-blank line.
        // In this phase we may match all or just some of the open blocks.
        // But we cannot close unmatched blocks yet, because we may have a lazy
        // continuation line.
        if (continued < stack.length) {
            const item = stack[continued];
            self.containerState = item[1];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(item[0].continuation, 'expected `continuation` to be defined on container construct');
            return effects.attempt(item[0].continuation, documentContinue, checkNewContainers)(code);
        }
        // Done.
        return checkNewContainers(code);
    }
    /** @type {State} */ function documentContinue(code) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(self.containerState, 'expected `containerState` to be defined after continuation');
        continued++;
        // Note: this field is called `_closeFlow` but it also closes containers.
        // Perhaps a good idea to rename it but it’s already used in the wild by
        // extensions.
        if (self.containerState._closeFlow) {
            self.containerState._closeFlow = undefined;
            if (childFlow) {
                closeFlow();
            }
            // Note: this algorithm for moving events around is similar to the
            // algorithm when dealing with lazy lines in `writeToChild`.
            const indexBeforeExits = self.events.length;
            let indexBeforeFlow = indexBeforeExits;
            /** @type {Point | undefined} */ let point;
            // Find the flow chunk.
            while(indexBeforeFlow--){
                if (self.events[indexBeforeFlow][0] === 'exit' && self.events[indexBeforeFlow][1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].chunkFlow) {
                    point = self.events[indexBeforeFlow][1].end;
                    break;
                }
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(point, 'could not find previous flow chunk');
            exitContainers(continued);
            // Fix positions.
            let index = indexBeforeExits;
            while(index < self.events.length){
                self.events[index][1].end = {
                    ...point
                };
                index++;
            }
            // Inject the exits earlier (they’re still also at the end).
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$chunked$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splice"])(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
            // Discard the duplicate exits.
            self.events.length = index;
            return checkNewContainers(code);
        }
        return start(code);
    }
    /** @type {State} */ function checkNewContainers(code) {
        // Next, after consuming the continuation markers for existing blocks, we
        // look for new block starts (e.g. `>` for a block quote).
        // If we encounter a new block start, we close any blocks unmatched in
        // step 1 before creating the new block as a child of the last matched
        // block.
        if (continued === stack.length) {
            // No need to `check` whether there’s a container, of `exitContainers`
            // would be moot.
            // We can instead immediately `attempt` to parse one.
            if (!childFlow) {
                return documentContinued(code);
            }
            // If we have concrete content, such as block HTML or fenced code,
            // we can’t have containers “pierce” into them, so we can immediately
            // start.
            if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
                return flowStart(code);
            }
            // If we do have flow, it could still be a blank line,
            // but we’d be interrupting it w/ a new container if there’s a current
            // construct.
            // To do: next major: remove `_gfmTableDynamicInterruptHack` (no longer
            // needed in micromark-extension-gfm-table@1.0.6).
            self.interrupt = Boolean(childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack);
        }
        // Check if there is a new container.
        self.containerState = {};
        return effects.check(containerConstruct, thereIsANewContainer, thereIsNoNewContainer)(code);
    }
    /** @type {State} */ function thereIsANewContainer(code) {
        if (childFlow) closeFlow();
        exitContainers(continued);
        return documentContinued(code);
    }
    /** @type {State} */ function thereIsNoNewContainer(code) {
        self.parser.lazy[self.now().line] = continued !== stack.length;
        lineStartOffset = self.now().offset;
        return flowStart(code);
    }
    /** @type {State} */ function documentContinued(code) {
        // Try new containers.
        self.containerState = {};
        return effects.attempt(containerConstruct, containerContinue, flowStart)(code);
    }
    /** @type {State} */ function containerContinue(code) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(self.currentConstruct, 'expected `currentConstruct` to be defined on tokenizer');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(self.containerState, 'expected `containerState` to be defined on tokenizer');
        continued++;
        stack.push([
            self.currentConstruct,
            self.containerState
        ]);
        // Try another.
        return documentContinued(code);
    }
    /** @type {State} */ function flowStart(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].eof) {
            if (childFlow) closeFlow();
            exitContainers(0);
            effects.consume(code);
            return;
        }
        childFlow = childFlow || self.parser.flow(self.now());
        effects.enter(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].chunkFlow, {
            _tokenizer: childFlow,
            contentType: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constants"].contentTypeFlow,
            previous: childToken
        });
        return flowContinue(code);
    }
    /** @type {State} */ function flowContinue(code) {
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].eof) {
            writeToChild(effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].chunkFlow), true);
            exitContainers(0);
            effects.consume(code);
            return;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["markdownLineEnding"])(code)) {
            effects.consume(code);
            writeToChild(effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].chunkFlow));
            // Get ready for the next line.
            continued = 0;
            self.interrupt = undefined;
            return start;
        }
        effects.consume(code);
        return flowContinue;
    }
    /**
   * @param {Token} token
   *   Token.
   * @param {boolean | undefined} [endOfFile]
   *   Whether the token is at the end of the file (default: `false`).
   * @returns {undefined}
   *   Nothing.
   */ function writeToChild(token, endOfFile) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(childFlow, 'expected `childFlow` to be defined when continuing');
        const stream = self.sliceStream(token);
        if (endOfFile) stream.push(null);
        token.previous = childToken;
        if (childToken) childToken.next = token;
        childToken = token;
        childFlow.defineSkip(token.start);
        childFlow.write(stream);
        // Alright, so we just added a lazy line:
        //
        // ```markdown
        // > a
        // b.
        //
        // Or:
        //
        // > ~~~c
        // d
        //
        // Or:
        //
        // > | e |
        // f
        // ```
        //
        // The construct in the second example (fenced code) does not accept lazy
        // lines, so it marked itself as done at the end of its first line, and
        // then the content construct parses `d`.
        // Most constructs in markdown match on the first line: if the first line
        // forms a construct, a non-lazy line can’t “unmake” it.
        //
        // The construct in the third example is potentially a GFM table, and
        // those are *weird*.
        // It *could* be a table, from the first line, if the following line
        // matches a condition.
        // In this case, that second line is lazy, which “unmakes” the first line
        // and turns the whole into one content block.
        //
        // We’ve now parsed the non-lazy and the lazy line, and can figure out
        // whether the lazy line started a new flow block.
        // If it did, we exit the current containers between the two flow blocks.
        if (self.parser.lazy[token.start.line]) {
            let index = childFlow.events.length;
            while(index--){
                if (// The token starts before the line ending…
                childFlow.events[index][1].start.offset < lineStartOffset && // …and either is not ended yet…
                (!childFlow.events[index][1].end || // …or ends after it.
                childFlow.events[index][1].end.offset > lineStartOffset)) {
                    // Exit: there’s still something open, which means it’s a lazy line
                    // part of something.
                    return;
                }
            }
            // Note: this algorithm for moving events around is similar to the
            // algorithm when closing flow in `documentContinue`.
            const indexBeforeExits = self.events.length;
            let indexBeforeFlow = indexBeforeExits;
            /** @type {boolean | undefined} */ let seen;
            /** @type {Point | undefined} */ let point;
            // Find the previous chunk (the one before the lazy line).
            while(indexBeforeFlow--){
                if (self.events[indexBeforeFlow][0] === 'exit' && self.events[indexBeforeFlow][1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].chunkFlow) {
                    if (seen) {
                        point = self.events[indexBeforeFlow][1].end;
                        break;
                    }
                    seen = true;
                }
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(point, 'could not find previous flow chunk');
            exitContainers(continued);
            // Fix positions.
            index = indexBeforeExits;
            while(index < self.events.length){
                self.events[index][1].end = {
                    ...point
                };
                index++;
            }
            // Inject the exits earlier (they’re still also at the end).
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$chunked$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splice"])(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
            // Discard the duplicate exits.
            self.events.length = index;
        }
    }
    /**
   * @param {number} size
   *   Size.
   * @returns {undefined}
   *   Nothing.
   */ function exitContainers(size) {
        let index = stack.length;
        // Exit open containers.
        while(index-- > size){
            const entry = stack[index];
            self.containerState = entry[1];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(entry[0].exit, 'expected `exit` to be defined on container construct');
            entry[0].exit.call(self, effects);
        }
        stack.length = size;
    }
    function closeFlow() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(self.containerState, 'expected `containerState` to be defined when closing flow');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(childFlow, 'expected `childFlow` to be defined when closing it');
        childFlow.write([
            __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].eof
        ]);
        childToken = undefined;
        childFlow = undefined;
        self.containerState._closeFlow = undefined;
    }
}
/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 *   Tokenizer.
 */ function tokenizeContainer(effects, ok, nok) {
    // Always populated by defaults.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(this.parser.constructs.disable.null, 'expected `disable.null` to be populated');
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["factorySpace"])(effects, effects.attempt(this.parser.constructs.document, ok, nok), __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].linePrefix, this.parser.constructs.disable.null.includes('codeIndented') ? undefined : __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constants"].tabSize);
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/micromark/dev/lib/initialize/flow.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {
 *   InitialConstruct,
 *   Initializer,
 *   State,
 *   TokenizeContext
 * } from 'micromark-util-types'
 */ __turbopack_context__.s([
    "flow",
    ()=>flow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/devlop/lib/development.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$blank$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-core-commonmark/dev/lib/blank-line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$content$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-core-commonmark/dev/lib/content.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-factory-space/dev/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-character/dev/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-symbol/lib/codes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-symbol/lib/types.js [app-client] (ecmascript)");
;
;
;
;
;
const flow = {
    tokenize: initializeFlow
};
/**
 * @this {TokenizeContext}
 *   Self.
 * @type {Initializer}
 *   Initializer.
 */ function initializeFlow(effects) {
    const self = this;
    const initial = effects.attempt(// Try to parse a blank line.
    __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$blank$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["blankLine"], atBlankEnding, // Try to parse initial flow (essentially, only code).
    effects.attempt(this.parser.constructs.flowInitial, afterConstruct, (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$factory$2d$space$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["factorySpace"])(effects, effects.attempt(this.parser.constructs.flow, afterConstruct, effects.attempt(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$content$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["content"], afterConstruct)), __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].linePrefix)));
    return initial;
    //TURBOPACK unreachable
    ;
    /** @type {State} */ function atBlankEnding(code) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(code === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].eof || (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["markdownLineEnding"])(code), 'expected eol or eof');
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].eof) {
            effects.consume(code);
            return;
        }
        effects.enter(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].lineEndingBlank);
        effects.consume(code);
        effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].lineEndingBlank);
        self.currentConstruct = undefined;
        return initial;
    }
    /** @type {State} */ function afterConstruct(code) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(code === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].eof || (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["markdownLineEnding"])(code), 'expected eol or eof');
        if (code === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].eof) {
            effects.consume(code);
            return;
        }
        effects.enter(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].lineEnding);
        effects.consume(code);
        effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].lineEnding);
        self.currentConstruct = undefined;
        return initial;
    }
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/micromark/dev/lib/initialize/text.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {
 *   Code,
 *   InitialConstruct,
 *   Initializer,
 *   Resolver,
 *   State,
 *   TokenizeContext
 * } from 'micromark-util-types'
 */ __turbopack_context__.s([
    "resolver",
    ()=>resolver,
    "string",
    ()=>string,
    "text",
    ()=>text
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/devlop/lib/development.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-symbol/lib/codes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-symbol/lib/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-symbol/lib/types.js [app-client] (ecmascript)");
;
;
const resolver = {
    resolveAll: createResolver()
};
const string = initializeFactory('string');
const text = initializeFactory('text');
/**
 * @param {'string' | 'text'} field
 *   Field.
 * @returns {InitialConstruct}
 *   Construct.
 */ function initializeFactory(field) {
    return {
        resolveAll: createResolver(field === 'text' ? resolveAllLineSuffixes : undefined),
        tokenize: initializeText
    };
    //TURBOPACK unreachable
    ;
    /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Initializer}
   */ function initializeText(effects) {
        const self = this;
        const constructs = this.parser.constructs[field];
        const text = effects.attempt(constructs, start, notText);
        return start;
        //TURBOPACK unreachable
        ;
        /** @type {State} */ function start(code) {
            return atBreak(code) ? text(code) : notText(code);
        }
        /** @type {State} */ function notText(code) {
            if (code === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].eof) {
                effects.consume(code);
                return;
            }
            effects.enter(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].data);
            effects.consume(code);
            return data;
        }
        /** @type {State} */ function data(code) {
            if (atBreak(code)) {
                effects.exit(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].data);
                return text(code);
            }
            // Data.
            effects.consume(code);
            return data;
        }
        /**
     * @param {Code} code
     *   Code.
     * @returns {boolean}
     *   Whether the code is a break.
     */ function atBreak(code) {
            if (code === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].eof) {
                return true;
            }
            const list = constructs[code];
            let index = -1;
            if (list) {
                // Always populated by defaults.
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(Array.isArray(list), 'expected `disable.null` to be populated');
                while(++index < list.length){
                    const item = list[index];
                    if (!item.previous || item.previous.call(self, self.previous)) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
}
/**
 * @param {Resolver | undefined} [extraResolver]
 *   Resolver.
 * @returns {Resolver}
 *   Resolver.
 */ function createResolver(extraResolver) {
    return resolveAllText;
    //TURBOPACK unreachable
    ;
    /** @type {Resolver} */ function resolveAllText(events, context) {
        let index = -1;
        /** @type {number | undefined} */ let enter;
        // A rather boring computation (to merge adjacent `data` events) which
        // improves mm performance by 29%.
        while(++index <= events.length){
            if (enter === undefined) {
                if (events[index] && events[index][1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].data) {
                    enter = index;
                    index++;
                }
            } else if (!events[index] || events[index][1].type !== __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].data) {
                // Don’t do anything if there is one data token.
                if (index !== enter + 2) {
                    events[enter][1].end = events[index - 1][1].end;
                    events.splice(enter + 2, index - enter - 2);
                    index = enter + 2;
                }
                enter = undefined;
            }
        }
        return extraResolver ? extraResolver(events, context) : events;
    }
}
/**
 * A rather ugly set of instructions which again looks at chunks in the input
 * stream.
 * The reason to do this here is that it is *much* faster to parse in reverse.
 * And that we can’t hook into `null` to split the line suffix before an EOF.
 * To do: figure out if we can make this into a clean utility, or even in core.
 * As it will be useful for GFMs literal autolink extension (and maybe even
 * tables?)
 *
 * @type {Resolver}
 */ function resolveAllLineSuffixes(events, context) {
    let eventIndex = 0 // Skip first.
    ;
    while(++eventIndex <= events.length){
        if ((eventIndex === events.length || events[eventIndex][1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].lineEnding) && events[eventIndex - 1][1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].data) {
            const data = events[eventIndex - 1][1];
            const chunks = context.sliceStream(data);
            let index = chunks.length;
            let bufferIndex = -1;
            let size = 0;
            /** @type {boolean | undefined} */ let tabs;
            while(index--){
                const chunk = chunks[index];
                if (typeof chunk === 'string') {
                    bufferIndex = chunk.length;
                    while(chunk.charCodeAt(bufferIndex - 1) === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].space){
                        size++;
                        bufferIndex--;
                    }
                    if (bufferIndex) break;
                    bufferIndex = -1;
                } else if (chunk === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].horizontalTab) {
                    tabs = true;
                    size++;
                } else if (chunk === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].virtualSpace) {
                // Empty
                } else {
                    // Replacement character, exit.
                    index++;
                    break;
                }
            }
            // Allow final trailing whitespace.
            if (context._contentTypeTextTrailing && eventIndex === events.length) {
                size = 0;
            }
            if (size) {
                const token = {
                    type: eventIndex === events.length || tabs || size < __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constants"].hardBreakPrefixSizeMin ? __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].lineSuffix : __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].hardBreakTrailing,
                    start: {
                        _bufferIndex: index ? bufferIndex : data.start._bufferIndex + bufferIndex,
                        _index: data.start._index + index,
                        line: data.end.line,
                        column: data.end.column - size,
                        offset: data.end.offset - size
                    },
                    end: {
                        ...data.end
                    }
                };
                data.end = {
                    ...token.start
                };
                if (data.start.offset === data.end.offset) {
                    Object.assign(data, token);
                } else {
                    events.splice(eventIndex, 0, [
                        'enter',
                        token,
                        context
                    ], [
                        'exit',
                        token,
                        context
                    ]);
                    eventIndex += 2;
                }
            }
            eventIndex++;
        }
    }
    return events;
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/micromark/dev/lib/constructs.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {Extension} from 'micromark-util-types'
 */ __turbopack_context__.s([
    "attentionMarkers",
    ()=>attentionMarkers,
    "contentInitial",
    ()=>contentInitial,
    "disable",
    ()=>disable,
    "document",
    ()=>document,
    "flow",
    ()=>flow,
    "flowInitial",
    ()=>flowInitial,
    "insideSpan",
    ()=>insideSpan,
    "string",
    ()=>string,
    "text",
    ()=>text
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$attention$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-core-commonmark/dev/lib/attention.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$autolink$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-core-commonmark/dev/lib/autolink.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$block$2d$quote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-core-commonmark/dev/lib/block-quote.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$character$2d$escape$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-core-commonmark/dev/lib/character-escape.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$character$2d$reference$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-core-commonmark/dev/lib/character-reference.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$code$2d$fenced$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-core-commonmark/dev/lib/code-fenced.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$code$2d$indented$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-core-commonmark/dev/lib/code-indented.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$code$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-core-commonmark/dev/lib/code-text.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$definition$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-core-commonmark/dev/lib/definition.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$hard$2d$break$2d$escape$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-core-commonmark/dev/lib/hard-break-escape.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$heading$2d$atx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-core-commonmark/dev/lib/heading-atx.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$html$2d$flow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-core-commonmark/dev/lib/html-flow.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$html$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-core-commonmark/dev/lib/html-text.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$label$2d$end$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-core-commonmark/dev/lib/label-end.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$label$2d$start$2d$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-core-commonmark/dev/lib/label-start-image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$label$2d$start$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-core-commonmark/dev/lib/label-start-link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$line$2d$ending$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-core-commonmark/dev/lib/line-ending.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-core-commonmark/dev/lib/list.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$setext$2d$underline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-core-commonmark/dev/lib/setext-underline.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$thematic$2d$break$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-core-commonmark/dev/lib/thematic-break.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-symbol/lib/codes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$initialize$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/micromark/dev/lib/initialize/text.js [app-client] (ecmascript)");
;
;
;
const document = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].asterisk]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["list"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].plusSign]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["list"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].dash]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["list"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].digit0]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["list"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].digit1]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["list"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].digit2]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["list"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].digit3]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["list"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].digit4]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["list"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].digit5]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["list"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].digit6]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["list"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].digit7]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["list"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].digit8]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["list"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].digit9]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["list"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].greaterThan]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$block$2d$quote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["blockQuote"]
};
const contentInitial = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].leftSquareBracket]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$definition$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["definition"]
};
const flowInitial = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].horizontalTab]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$code$2d$indented$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codeIndented"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].virtualSpace]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$code$2d$indented$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codeIndented"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].space]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$code$2d$indented$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codeIndented"]
};
const flow = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].numberSign]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$heading$2d$atx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headingAtx"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].asterisk]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$thematic$2d$break$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["thematicBreak"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].dash]: [
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$setext$2d$underline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setextUnderline"],
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$thematic$2d$break$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["thematicBreak"]
    ],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].lessThan]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$html$2d$flow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["htmlFlow"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].equalsTo]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$setext$2d$underline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setextUnderline"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].underscore]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$thematic$2d$break$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["thematicBreak"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].graveAccent]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$code$2d$fenced$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codeFenced"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].tilde]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$code$2d$fenced$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codeFenced"]
};
const string = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].ampersand]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$character$2d$reference$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["characterReference"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].backslash]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$character$2d$escape$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["characterEscape"]
};
const text = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].carriageReturn]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$line$2d$ending$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lineEnding"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].lineFeed]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$line$2d$ending$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lineEnding"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].carriageReturnLineFeed]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$line$2d$ending$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lineEnding"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].exclamationMark]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$label$2d$start$2d$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["labelStartImage"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].ampersand]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$character$2d$reference$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["characterReference"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].asterisk]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$attention$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["attention"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].lessThan]: [
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$autolink$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autolink"],
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$html$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["htmlText"]
    ],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].leftSquareBracket]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$label$2d$start$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["labelStartLink"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].backslash]: [
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$hard$2d$break$2d$escape$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hardBreakEscape"],
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$character$2d$escape$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["characterEscape"]
    ],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].rightSquareBracket]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$label$2d$end$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["labelEnd"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].underscore]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$attention$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["attention"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].graveAccent]: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$code$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codeText"]
};
const insideSpan = {
    null: [
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$core$2d$commonmark$2f$dev$2f$lib$2f$attention$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["attention"],
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$initialize$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolver"]
    ]
};
const attentionMarkers = {
    null: [
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].asterisk,
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].underscore
    ]
};
const disable = {
    null: []
};
}),
"[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/micromark/dev/lib/create-tokenizer.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {
 *   Chunk,
 *   Code,
 *   ConstructRecord,
 *   Construct,
 *   Effects,
 *   InitialConstruct,
 *   ParseContext,
 *   Point,
 *   State,
 *   TokenizeContext,
 *   Token
 * } from 'micromark-util-types'
 */ /**
 * @callback Restore
 *   Restore the state.
 * @returns {undefined}
 *   Nothing.
 *
 * @typedef Info
 *   Info.
 * @property {Restore} restore
 *   Restore.
 * @property {number} from
 *   From.
 *
 * @callback ReturnHandle
 *   Handle a successful run.
 * @param {Construct} construct
 *   Construct.
 * @param {Info} info
 *   Info.
 * @returns {undefined}
 *   Nothing.
 */ __turbopack_context__.s([
    "createTokenizer",
    ()=>createTokenizer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$debug$2f$src$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/debug/src/browser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/devlop/lib/development.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-character/dev/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$chunked$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-chunked/dev/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$resolve$2d$all$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-resolve-all/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-symbol/lib/codes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-symbol/lib/values.js [app-client] (ecmascript)");
;
;
;
;
;
;
const debug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$debug$2f$src$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('micromark');
function createTokenizer(parser, initialize, from) {
    /** @type {Point} */ let point = {
        _bufferIndex: -1,
        _index: 0,
        line: from && from.line || 1,
        column: from && from.column || 1,
        offset: from && from.offset || 0
    };
    /** @type {Record<string, number>} */ const columnStart = {};
    /** @type {Array<Construct>} */ const resolveAllConstructs = [];
    /** @type {Array<Chunk>} */ let chunks = [];
    /** @type {Array<Token>} */ let stack = [];
    /** @type {boolean | undefined} */ let consumed = true;
    /**
   * Tools used for tokenizing.
   *
   * @type {Effects}
   */ const effects = {
        attempt: constructFactory(onsuccessfulconstruct),
        check: constructFactory(onsuccessfulcheck),
        consume,
        enter,
        exit,
        interrupt: constructFactory(onsuccessfulcheck, {
            interrupt: true
        })
    };
    /**
   * State and tools for resolving and serializing.
   *
   * @type {TokenizeContext}
   */ const context = {
        code: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].eof,
        containerState: {},
        defineSkip,
        events: [],
        now,
        parser,
        previous: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].eof,
        sliceSerialize,
        sliceStream,
        write
    };
    /**
   * The state function.
   *
   * @type {State | undefined}
   */ let state = initialize.tokenize.call(context, effects);
    /**
   * Track which character we expect to be consumed, to catch bugs.
   *
   * @type {Code}
   */ let expectedCode;
    if (initialize.resolveAll) {
        resolveAllConstructs.push(initialize);
    }
    return context;
    //TURBOPACK unreachable
    ;
    /** @type {TokenizeContext['write']} */ function write(slice) {
        chunks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$chunked$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["push"])(chunks, slice);
        main();
        // Exit if we’re not done, resolve might change stuff.
        if (chunks[chunks.length - 1] !== __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].eof) {
            return [];
        }
        addResult(initialize, 0);
        // Otherwise, resolve, and exit.
        context.events = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$resolve$2d$all$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveAll"])(resolveAllConstructs, context.events, context);
        return context.events;
    }
    //
    // Tools.
    //
    /** @type {TokenizeContext['sliceSerialize']} */ function sliceSerialize(token, expandTabs) {
        return serializeChunks(sliceStream(token), expandTabs);
    }
    /** @type {TokenizeContext['sliceStream']} */ function sliceStream(token) {
        return sliceChunks(chunks, token);
    }
    /** @type {TokenizeContext['now']} */ function now() {
        // This is a hot path, so we clone manually instead of `Object.assign({}, point)`
        const { _bufferIndex, _index, line, column, offset } = point;
        return {
            _bufferIndex,
            _index,
            line,
            column,
            offset
        };
    }
    /** @type {TokenizeContext['defineSkip']} */ function defineSkip(value) {
        columnStart[value.line] = value.column;
        accountForPotentialSkip();
        debug('position: define skip: `%j`', point);
    }
    //
    // State management.
    //
    /**
   * Main loop (note that `_index` and `_bufferIndex` in `point` are modified by
   * `consume`).
   * Here is where we walk through the chunks, which either include strings of
   * several characters, or numerical character codes.
   * The reason to do this in a loop instead of a call is so the stack can
   * drain.
   *
   * @returns {undefined}
   *   Nothing.
   */ function main() {
        /** @type {number} */ let chunkIndex;
        while(point._index < chunks.length){
            const chunk = chunks[point._index];
            // If we’re in a buffer chunk, loop through it.
            if (typeof chunk === 'string') {
                chunkIndex = point._index;
                if (point._bufferIndex < 0) {
                    point._bufferIndex = 0;
                }
                while(point._index === chunkIndex && point._bufferIndex < chunk.length){
                    go(chunk.charCodeAt(point._bufferIndex));
                }
            } else {
                go(chunk);
            }
        }
    }
    /**
   * Deal with one code.
   *
   * @param {Code} code
   *   Code.
   * @returns {undefined}
   *   Nothing.
   */ function go(code) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(consumed === true, 'expected character to be consumed');
        consumed = undefined;
        debug('main: passing `%s` to %s', code, state && state.name);
        expectedCode = code;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(typeof state === 'function', 'expected state');
        state = state(code);
    }
    /** @type {Effects['consume']} */ function consume(code) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(code === expectedCode, 'expected given code to equal expected code');
        debug('consume: `%s`', code);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(consumed === undefined, 'expected code to not have been consumed: this might be because `return x(code)` instead of `return x` was used');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(code === null ? context.events.length === 0 || context.events[context.events.length - 1][0] === 'exit' : context.events[context.events.length - 1][0] === 'enter', 'expected last token to be open');
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$character$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["markdownLineEnding"])(code)) {
            point.line++;
            point.column = 1;
            point.offset += code === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].carriageReturnLineFeed ? 2 : 1;
            accountForPotentialSkip();
            debug('position: after eol: `%j`', point);
        } else if (code !== __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].virtualSpace) {
            point.column++;
            point.offset++;
        }
        // Not in a string chunk.
        if (point._bufferIndex < 0) {
            point._index++;
        } else {
            point._bufferIndex++;
            // At end of string chunk.
            if (point._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
            // strings.
            /** @type {string} */ chunks[point._index].length) {
                point._bufferIndex = -1;
                point._index++;
            }
        }
        // Expose the previous character.
        context.previous = code;
        // Mark as consumed.
        consumed = true;
    }
    /** @type {Effects['enter']} */ function enter(type, fields) {
        /** @type {Token} */ // @ts-expect-error Patch instead of assign required fields to help GC.
        const token = fields || {};
        token.type = type;
        token.start = now();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(typeof type === 'string', 'expected string type');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(type.length > 0, 'expected non-empty string');
        debug('enter: `%s`', type);
        context.events.push([
            'enter',
            token,
            context
        ]);
        stack.push(token);
        return token;
    }
    /** @type {Effects['exit']} */ function exit(type) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(typeof type === 'string', 'expected string type');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(type.length > 0, 'expected non-empty string');
        const token = stack.pop();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(token, 'cannot close w/o open tokens');
        token.end = now();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(type === token.type, 'expected exit token to match current token');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(!(token.start._index === token.end._index && token.start._bufferIndex === token.end._bufferIndex), 'expected non-empty token (`' + type + '`)');
        debug('exit: `%s`', token.type);
        context.events.push([
            'exit',
            token,
            context
        ]);
        return token;
    }
    /**
   * Use results.
   *
   * @type {ReturnHandle}
   */ function onsuccessfulconstruct(construct, info) {
        addResult(construct, info.from);
    }
    /**
   * Discard results.
   *
   * @type {ReturnHandle}
   */ function onsuccessfulcheck(_, info) {
        info.restore();
    }
    /**
   * Factory to attempt/check/interrupt.
   *
   * @param {ReturnHandle} onreturn
   *   Callback.
   * @param {{interrupt?: boolean | undefined} | undefined} [fields]
   *   Fields.
   */ function constructFactory(onreturn, fields) {
        return hook;
        //TURBOPACK unreachable
        ;
        /**
     * Handle either an object mapping codes to constructs, a list of
     * constructs, or a single construct.
     *
     * @param {Array<Construct> | ConstructRecord | Construct} constructs
     *   Constructs.
     * @param {State} returnState
     *   State.
     * @param {State | undefined} [bogusState]
     *   State.
     * @returns {State}
     *   State.
     */ function hook(constructs, returnState, bogusState) {
            /** @type {ReadonlyArray<Construct>} */ let listOfConstructs;
            /** @type {number} */ let constructIndex;
            /** @type {Construct} */ let currentConstruct;
            /** @type {Info} */ let info;
            return Array.isArray(constructs) ? /* c8 ignore next 1 */ handleListOfConstructs(constructs) : 'tokenize' in constructs ? handleListOfConstructs([
                constructs
            ]) : handleMapOfConstructs(constructs);
            //TURBOPACK unreachable
            ;
            /**
       * Handle a list of construct.
       *
       * @param {ConstructRecord} map
       *   Constructs.
       * @returns {State}
       *   State.
       */ function handleMapOfConstructs(map) {
                return start;
                //TURBOPACK unreachable
                ;
                /** @type {State} */ function start(code) {
                    const left = code !== null && map[code];
                    const all = code !== null && map.null;
                    const list = [
                        // To do: add more extension tests.
                        /* c8 ignore next 2 */ ...Array.isArray(left) ? left : left ? [
                            left
                        ] : [],
                        ...Array.isArray(all) ? all : all ? [
                            all
                        ] : []
                    ];
                    return handleListOfConstructs(list)(code);
                }
            }
            /**
       * Handle a list of construct.
       *
       * @param {ReadonlyArray<Construct>} list
       *   Constructs.
       * @returns {State}
       *   State.
       */ function handleListOfConstructs(list) {
                listOfConstructs = list;
                constructIndex = 0;
                if (list.length === 0) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(bogusState, 'expected `bogusState` to be given');
                    return bogusState;
                }
                return handleConstruct(list[constructIndex]);
            }
            /**
       * Handle a single construct.
       *
       * @param {Construct} construct
       *   Construct.
       * @returns {State}
       *   State.
       */ function handleConstruct(construct) {
                return start;
                //TURBOPACK unreachable
                ;
                /** @type {State} */ function start(code) {
                    // To do: not needed to store if there is no bogus state, probably?
                    // Currently doesn’t work because `inspect` in document does a check
                    // w/o a bogus, which doesn’t make sense. But it does seem to help perf
                    // by not storing.
                    info = store();
                    currentConstruct = construct;
                    if (!construct.partial) {
                        context.currentConstruct = construct;
                    }
                    // Always populated by defaults.
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(context.parser.constructs.disable.null, 'expected `disable.null` to be populated');
                    if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) {
                        return nok(code);
                    }
                    return construct.tokenize.call(// If we do have fields, create an object w/ `context` as its
                    // prototype.
                    // This allows a “live binding”, which is needed for `interrupt`.
                    fields ? Object.assign(Object.create(context), fields) : context, effects, ok, nok)(code);
                }
            }
            /** @type {State} */ function ok(code) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(code === expectedCode, 'expected code');
                consumed = true;
                onreturn(currentConstruct, info);
                return returnState;
            }
            /** @type {State} */ function nok(code) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(code === expectedCode, 'expected code');
                consumed = true;
                info.restore();
                if (++constructIndex < listOfConstructs.length) {
                    return handleConstruct(listOfConstructs[constructIndex]);
                }
                return bogusState;
            }
        }
    }
    /**
   * @param {Construct} construct
   *   Construct.
   * @param {number} from
   *   From.
   * @returns {undefined}
   *   Nothing.
   */ function addResult(construct, from) {
        if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
            resolveAllConstructs.push(construct);
        }
        if (construct.resolve) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$chunked$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splice"])(context.events, from, context.events.length - from, construct.resolve(context.events.slice(from), context));
        }
        if (construct.resolveTo) {
            context.events = construct.resolveTo(context.events, context);
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(construct.partial || context.events.length === 0 || context.events[context.events.length - 1][0] === 'exit', 'expected last token to end');
    }
    /**
   * Store state.
   *
   * @returns {Info}
   *   Info.
   */ function store() {
        const startPoint = now();
        const startPrevious = context.previous;
        const startCurrentConstruct = context.currentConstruct;
        const startEventsIndex = context.events.length;
        const startStack = Array.from(stack);
        return {
            from: startEventsIndex,
            restore
        };
        //TURBOPACK unreachable
        ;
        /**
     * Restore state.
     *
     * @returns {undefined}
     *   Nothing.
     */ function restore() {
            point = startPoint;
            context.previous = startPrevious;
            context.currentConstruct = startCurrentConstruct;
            context.events.length = startEventsIndex;
            stack = startStack;
            accountForPotentialSkip();
            debug('position: restore: `%j`', point);
        }
    }
    /**
   * Move the current point a bit forward in the line when it’s on a column
   * skip.
   *
   * @returns {undefined}
   *   Nothing.
   */ function accountForPotentialSkip() {
        if (point.line in columnStart && point.column < 2) {
            point.column = columnStart[point.line];
            point.offset += columnStart[point.line] - 1;
        }
    }
}
/**
 * Get the chunks from a slice of chunks in the range of a token.
 *
 * @param {ReadonlyArray<Chunk>} chunks
 *   Chunks.
 * @param {Pick<Token, 'end' | 'start'>} token
 *   Token.
 * @returns {Array<Chunk>}
 *   Chunks.
 */ function sliceChunks(chunks, token) {
    const startIndex = token.start._index;
    const startBufferIndex = token.start._bufferIndex;
    const endIndex = token.end._index;
    const endBufferIndex = token.end._bufferIndex;
    /** @type {Array<Chunk>} */ let view;
    if (startIndex === endIndex) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(endBufferIndex > -1, 'expected non-negative end buffer index');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(startBufferIndex > -1, 'expected non-negative start buffer index');
        // @ts-expect-error `_bufferIndex` is used on string chunks.
        view = [
            chunks[startIndex].slice(startBufferIndex, endBufferIndex)
        ];
    } else {
        view = chunks.slice(startIndex, endIndex);
        if (startBufferIndex > -1) {
            const head = view[0];
            if (typeof head === 'string') {
                view[0] = head.slice(startBufferIndex);
            /* c8 ignore next 4 -- used to be used, no longer */ } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(startBufferIndex === 0, 'expected `startBufferIndex` to be `0`');
                view.shift();
            }
        }
        if (endBufferIndex > 0) {
            // @ts-expect-error `_bufferIndex` is used on string chunks.
            view.push(chunks[endIndex].slice(0, endBufferIndex));
        }
    }
    return view;
}
/**
 * Get the string value of a slice of chunks.
 *
 * @param {ReadonlyArray<Chunk>} chunks
 *   Chunks.
 * @param {boolean | undefined} [expandTabs=false]
 *   Whether to expand tabs (default: `false`).
 * @returns {string}
 *   Result.
 */ function serializeChunks(chunks, expandTabs) {
    let index = -1;
    /** @type {Array<string>} */ const result = [];
    /** @type {boolean | undefined} */ let atTab;
    while(++index < chunks.length){
        const chunk = chunks[index];
        /** @type {string} */ let value;
        if (typeof chunk === 'string') {
            value = chunk;
        } else switch(chunk){
            case __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].carriageReturn:
                {
                    value = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["values"].cr;
                    break;
                }
            case __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].lineFeed:
                {
                    value = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["values"].lf;
                    break;
                }
            case __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].carriageReturnLineFeed:
                {
                    value = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["values"].cr + __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["values"].lf;
                    break;
                }
            case __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].horizontalTab:
                {
                    value = expandTabs ? __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["values"].space : __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["values"].ht;
                    break;
                }
            case __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].virtualSpace:
                {
                    if (!expandTabs && atTab) continue;
                    value = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["values"].space;
                    break;
                }
            default:
                {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(typeof chunk === 'number', 'expected number');
                    // Currently only replacement character.
                    value = String.fromCharCode(chunk);
                }
        }
        atTab = chunk === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].horizontalTab;
        result.push(value);
    }
    return result.join('');
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/micromark/dev/lib/parse.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {
 *   Create,
 *   FullNormalizedExtension,
 *   InitialConstruct,
 *   ParseContext,
 *   ParseOptions
 * } from 'micromark-util-types'
 */ __turbopack_context__.s([
    "parse",
    ()=>parse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$combine$2d$extensions$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-combine-extensions/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$initialize$2f$content$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/micromark/dev/lib/initialize/content.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$initialize$2f$document$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/micromark/dev/lib/initialize/document.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$initialize$2f$flow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/micromark/dev/lib/initialize/flow.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$initialize$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/micromark/dev/lib/initialize/text.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$constructs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/micromark/dev/lib/constructs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$create$2d$tokenizer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/micromark/dev/lib/create-tokenizer.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
function parse(options) {
    const settings = options || {};
    const constructs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$combine$2d$extensions$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["combineExtensions"])([
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$constructs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
        ...settings.extensions || []
    ]);
    /** @type {ParseContext} */ const parser = {
        constructs,
        content: create(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$initialize$2f$content$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["content"]),
        defined: [],
        document: create(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$initialize$2f$document$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["document"]),
        flow: create(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$initialize$2f$flow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flow"]),
        lazy: {},
        string: create(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$initialize$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]),
        text: create(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$initialize$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["text"])
    };
    return parser;
    //TURBOPACK unreachable
    ;
    /**
   * @param {InitialConstruct} initial
   *   Construct to start with.
   * @returns {Create}
   *   Create a tokenizer.
   */ function create(initial) {
        return creator;
        //TURBOPACK unreachable
        ;
        /** @type {Create} */ function creator(from) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$create$2d$tokenizer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createTokenizer"])(parser, initial, from);
        }
    }
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/micromark/dev/lib/postprocess.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {Event} from 'micromark-util-types'
 */ __turbopack_context__.s([
    "postprocess",
    ()=>postprocess
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2d$util$2d$subtokenize$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/micromark-util-subtokenize/dev/index.js [app-client] (ecmascript) <locals>");
;
function postprocess(events) {
    while(!(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2d$util$2d$subtokenize$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["subtokenize"])(events)){
    // Empty
    }
    return events;
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/micromark/dev/lib/preprocess.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {Chunk, Code, Encoding, Value} from 'micromark-util-types'
 */ /**
 * @callback Preprocessor
 *   Preprocess a value.
 * @param {Value} value
 *   Value.
 * @param {Encoding | null | undefined} [encoding]
 *   Encoding when `value` is a typed array (optional).
 * @param {boolean | null | undefined} [end=false]
 *   Whether this is the last chunk (default: `false`).
 * @returns {Array<Chunk>}
 *   Chunks.
 */ __turbopack_context__.s([
    "preprocess",
    ()=>preprocess
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-symbol/lib/codes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-symbol/lib/constants.js [app-client] (ecmascript)");
;
const search = /[\0\t\n\r]/g;
function preprocess() {
    let column = 1;
    let buffer = '';
    /** @type {boolean | undefined} */ let start = true;
    /** @type {boolean | undefined} */ let atCarriageReturn;
    return preprocessor;
    //TURBOPACK unreachable
    ;
    /** @type {Preprocessor} */ // eslint-disable-next-line complexity
    function preprocessor(value, encoding, end) {
        /** @type {Array<Chunk>} */ const chunks = [];
        /** @type {RegExpMatchArray | null} */ let match;
        /** @type {number} */ let next;
        /** @type {number} */ let startPosition;
        /** @type {number} */ let endPosition;
        /** @type {Code} */ let code;
        value = buffer + (typeof value === 'string' ? value.toString() : new TextDecoder(encoding || undefined).decode(value));
        startPosition = 0;
        buffer = '';
        if (start) {
            // To do: `markdown-rs` actually parses BOMs (byte order mark).
            if (value.charCodeAt(0) === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].byteOrderMarker) {
                startPosition++;
            }
            start = undefined;
        }
        while(startPosition < value.length){
            search.lastIndex = startPosition;
            match = search.exec(value);
            endPosition = match && match.index !== undefined ? match.index : value.length;
            code = value.charCodeAt(endPosition);
            if (!match) {
                buffer = value.slice(startPosition);
                break;
            }
            if (code === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].lf && startPosition === endPosition && atCarriageReturn) {
                chunks.push(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].carriageReturnLineFeed);
                atCarriageReturn = undefined;
            } else {
                if (atCarriageReturn) {
                    chunks.push(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].carriageReturn);
                    atCarriageReturn = undefined;
                }
                if (startPosition < endPosition) {
                    chunks.push(value.slice(startPosition, endPosition));
                    column += endPosition - startPosition;
                }
                switch(code){
                    case __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].nul:
                        {
                            chunks.push(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].replacementCharacter);
                            column++;
                            break;
                        }
                    case __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].ht:
                        {
                            next = Math.ceil(column / __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constants"].tabSize) * __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constants"].tabSize;
                            chunks.push(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].horizontalTab);
                            while(column++ < next)chunks.push(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].virtualSpace);
                            break;
                        }
                    case __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].lf:
                        {
                            chunks.push(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].lineFeed);
                            column = 1;
                            break;
                        }
                    default:
                        {
                            atCarriageReturn = true;
                            column = 1;
                        }
                }
            }
            startPosition = endPosition + 1;
        }
        if (end) {
            if (atCarriageReturn) chunks.push(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].carriageReturn);
            if (buffer) chunks.push(buffer);
            chunks.push(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].eof);
        }
        return chunks;
    }
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/micromark-util-subtokenize/dev/lib/splice-buffer.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SpliceBuffer",
    ()=>SpliceBuffer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-symbol/lib/constants.js [app-client] (ecmascript)");
;
class SpliceBuffer {
    /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */ get(index) {
        if (index < 0 || index >= this.left.length + this.right.length) {
            throw new RangeError('Cannot access index `' + index + '` in a splice buffer of size `' + (this.left.length + this.right.length) + '`');
        }
        if (index < this.left.length) return this.left[index];
        return this.right[this.right.length - index + this.left.length - 1];
    }
    /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */ get length() {
        return this.left.length + this.right.length;
    }
    /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */ shift() {
        this.setCursor(0);
        return this.right.pop();
    }
    /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */ slice(start, end) {
        /** @type {number} */ const stop = end === null || end === undefined ? Number.POSITIVE_INFINITY : end;
        if (stop < this.left.length) {
            return this.left.slice(start, stop);
        }
        if (start > this.left.length) {
            return this.right.slice(this.right.length - stop + this.left.length, this.right.length - start + this.left.length).reverse();
        }
        return this.left.slice(start).concat(this.right.slice(this.right.length - stop + this.left.length).reverse());
    }
    /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */ splice(start, deleteCount, items) {
        /** @type {number} */ const count = deleteCount || 0;
        this.setCursor(Math.trunc(start));
        const removed = this.right.splice(this.right.length - count, Number.POSITIVE_INFINITY);
        if (items) chunkedPush(this.left, items);
        return removed.reverse();
    }
    /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */ pop() {
        this.setCursor(Number.POSITIVE_INFINITY);
        return this.left.pop();
    }
    /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */ push(item) {
        this.setCursor(Number.POSITIVE_INFINITY);
        this.left.push(item);
    }
    /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */ pushMany(items) {
        this.setCursor(Number.POSITIVE_INFINITY);
        chunkedPush(this.left, items);
    }
    /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */ unshift(item) {
        this.setCursor(0);
        this.right.push(item);
    }
    /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */ unshiftMany(items) {
        this.setCursor(0);
        chunkedPush(this.right, items.reverse());
    }
    /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */ setCursor(n) {
        if (n === this.left.length || n > this.left.length && this.right.length === 0 || n < 0 && this.left.length === 0) return;
        if (n < this.left.length) {
            // Move cursor to the this.left
            const removed = this.left.splice(n, Number.POSITIVE_INFINITY);
            chunkedPush(this.right, removed.reverse());
        } else {
            // Move cursor to the this.right
            const removed = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
            chunkedPush(this.left, removed.reverse());
        }
    }
    /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */ constructor(initial){
        /** @type {Array<T>} */ this.left = initial ? [
            ...initial
        ] : [];
        /** @type {Array<T>} */ this.right = [];
    }
}
/**
 * Avoid stack overflow by pushing items onto the stack in segments
 *
 * @template T
 *   Item type.
 * @param {Array<T>} list
 *   List to inject into.
 * @param {ReadonlyArray<T>} right
 *   Items to inject.
 * @return {undefined}
 *   Nothing.
 */ function chunkedPush(list, right) {
    /** @type {number} */ let chunkStart = 0;
    if (right.length < __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constants"].v8MaxSafeChunkSize) {
        list.push(...right);
    } else {
        while(chunkStart < right.length){
            list.push(...right.slice(chunkStart, chunkStart + __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constants"].v8MaxSafeChunkSize));
            chunkStart += __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constants"].v8MaxSafeChunkSize;
        }
    }
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/micromark-util-subtokenize/dev/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * @import {Chunk, Event, Token} from 'micromark-util-types'
 */ __turbopack_context__.s([
    "subtokenize",
    ()=>subtokenize
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/devlop/lib/development.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$chunked$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-chunked/dev/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-symbol/lib/codes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-symbol/lib/types.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2d$util$2d$subtokenize$2f$dev$2f$lib$2f$splice$2d$buffer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/micromark-util-subtokenize/dev/lib/splice-buffer.js [app-client] (ecmascript)");
;
;
;
;
;
function subtokenize(eventsArray) {
    /** @type {Record<string, number>} */ const jumps = {};
    let index = -1;
    /** @type {Event} */ let event;
    /** @type {number | undefined} */ let lineIndex;
    /** @type {number} */ let otherIndex;
    /** @type {Event} */ let otherEvent;
    /** @type {Array<Event>} */ let parameters;
    /** @type {Array<Event>} */ let subevents;
    /** @type {boolean | undefined} */ let more;
    const events = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2d$util$2d$subtokenize$2f$dev$2f$lib$2f$splice$2d$buffer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpliceBuffer"](eventsArray);
    while(++index < events.length){
        while(index in jumps){
            index = jumps[index];
        }
        event = events.get(index);
        // Add a hook for the GFM tasklist extension, which needs to know if text
        // is in the first content of a list item.
        if (index && event[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].chunkFlow && events.get(index - 1)[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].listItemPrefix) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(event[1]._tokenizer, 'expected `_tokenizer` on subtokens');
            subevents = event[1]._tokenizer.events;
            otherIndex = 0;
            if (otherIndex < subevents.length && subevents[otherIndex][1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].lineEndingBlank) {
                otherIndex += 2;
            }
            if (otherIndex < subevents.length && subevents[otherIndex][1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].content) {
                while(++otherIndex < subevents.length){
                    if (subevents[otherIndex][1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].content) {
                        break;
                    }
                    if (subevents[otherIndex][1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].chunkText) {
                        subevents[otherIndex][1]._isInFirstContentOfListItem = true;
                        otherIndex++;
                    }
                }
            }
        }
        // Enter.
        if (event[0] === 'enter') {
            if (event[1].contentType) {
                Object.assign(jumps, subcontent(events, index));
                index = jumps[index];
                more = true;
            }
        } else if (event[1]._container) {
            otherIndex = index;
            lineIndex = undefined;
            while(otherIndex--){
                otherEvent = events.get(otherIndex);
                if (otherEvent[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].lineEnding || otherEvent[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].lineEndingBlank) {
                    if (otherEvent[0] === 'enter') {
                        if (lineIndex) {
                            events.get(lineIndex)[1].type = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].lineEndingBlank;
                        }
                        otherEvent[1].type = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].lineEnding;
                        lineIndex = otherIndex;
                    }
                } else if (otherEvent[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].linePrefix || otherEvent[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].listItemIndent) {
                // Move past.
                } else {
                    break;
                }
            }
            if (lineIndex) {
                // Fix position.
                event[1].end = {
                    ...events.get(lineIndex)[1].start
                };
                // Switch container exit w/ line endings.
                parameters = events.slice(lineIndex, index);
                parameters.unshift(event);
                events.splice(lineIndex, index - lineIndex + 1, parameters);
            }
        }
    }
    // The changes to the `events` buffer must be copied back into the eventsArray
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$chunked$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splice"])(eventsArray, 0, Number.POSITIVE_INFINITY, events.slice(0));
    return !more;
}
/**
 * Tokenize embedded tokens.
 *
 * @param {SpliceBuffer<Event>} events
 *   Events.
 * @param {number} eventIndex
 *   Index.
 * @returns {Record<string, number>}
 *   Gaps.
 */ function subcontent(events, eventIndex) {
    const token = events.get(eventIndex)[1];
    const context = events.get(eventIndex)[2];
    let startPosition = eventIndex - 1;
    /** @type {Array<number>} */ const startPositions = [];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(token.contentType, 'expected `contentType` on subtokens');
    let tokenizer = token._tokenizer;
    if (!tokenizer) {
        tokenizer = context.parser[token.contentType](token.start);
        if (token._contentTypeTextTrailing) {
            tokenizer._contentTypeTextTrailing = true;
        }
    }
    const childEvents = tokenizer.events;
    /** @type {Array<[number, number]>} */ const jumps = [];
    /** @type {Record<string, number>} */ const gaps = {};
    /** @type {Array<Chunk>} */ let stream;
    /** @type {Token | undefined} */ let previous;
    let index = -1;
    /** @type {Token | undefined} */ let current = token;
    let adjust = 0;
    let start = 0;
    const breaks = [
        start
    ];
    // Loop forward through the linked tokens to pass them in order to the
    // subtokenizer.
    while(current){
        // Find the position of the event for this token.
        while(events.get(++startPosition)[1] !== current){
        // Empty.
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(!previous || current.previous === previous, 'expected previous to match');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(!previous || previous.next === current, 'expected next to match');
        startPositions.push(startPosition);
        if (!current._tokenizer) {
            stream = context.sliceStream(current);
            if (!current.next) {
                stream.push(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].eof);
            }
            if (previous) {
                tokenizer.defineSkip(current.start);
            }
            if (current._isInFirstContentOfListItem) {
                tokenizer._gfmTasklistFirstContentOfListItem = true;
            }
            tokenizer.write(stream);
            if (current._isInFirstContentOfListItem) {
                tokenizer._gfmTasklistFirstContentOfListItem = undefined;
            }
        }
        // Unravel the next token.
        previous = current;
        current = current.next;
    }
    // Now, loop back through all events (and linked tokens), to figure out which
    // parts belong where.
    current = token;
    while(++index < childEvents.length){
        if (// Find a void token that includes a break.
        childEvents[index][0] === 'exit' && childEvents[index - 1][0] === 'enter' && childEvents[index][1].type === childEvents[index - 1][1].type && childEvents[index][1].start.line !== childEvents[index][1].end.line) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(current, 'expected a current token');
            start = index + 1;
            breaks.push(start);
            // Help GC.
            current._tokenizer = undefined;
            current.previous = undefined;
            current = current.next;
        }
    }
    // Help GC.
    tokenizer.events = [];
    // If there’s one more token (which is the cases for lines that end in an
    // EOF), that’s perfect: the last point we found starts it.
    // If there isn’t then make sure any remaining content is added to it.
    if (current) {
        // Help GC.
        current._tokenizer = undefined;
        current.previous = undefined;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(!current.next, 'expected no next token');
    } else {
        breaks.pop();
    }
    // Now splice the events from the subtokenizer into the current events,
    // moving back to front so that splice indices aren’t affected.
    index = breaks.length;
    while(index--){
        const slice = childEvents.slice(breaks[index], breaks[index + 1]);
        const start = startPositions.pop();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(start !== undefined, 'expected a start position when splicing');
        jumps.push([
            start,
            start + slice.length - 1
        ]);
        events.splice(start, 2, slice);
    }
    jumps.reverse();
    index = -1;
    while(++index < jumps.length){
        gaps[adjust + jumps[index][0]] = adjust + jumps[index][1];
        adjust += jumps[index][1] - jumps[index][0] - 1;
    }
    return gaps;
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/micromark-util-decode-numeric-character-reference/dev/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decodeNumericCharacterReference",
    ()=>decodeNumericCharacterReference
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-symbol/lib/codes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-symbol/lib/values.js [app-client] (ecmascript)");
;
function decodeNumericCharacterReference(value, base) {
    const code = Number.parseInt(value, base);
    if (// C0 except for HT, LF, FF, CR, space.
    code < __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].ht || code === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].vt || code > __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].cr && code < __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].space || code > __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].tilde && code < 160 || code > 55_295 && code < 57_344 || code > 64_975 && code < 65_008 || /* eslint-disable no-bitwise */ (code & 65_535) === 65_535 || (code & 65_535) === 65_534 || /* eslint-enable no-bitwise */ // Out of range
    code > 1_114_111) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$values$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["values"].replacementCharacter;
    }
    return String.fromCodePoint(code);
}
}),
"[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/dev/lib/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {
 *   Break,
 *   Blockquote,
 *   Code,
 *   Definition,
 *   Emphasis,
 *   Heading,
 *   Html,
 *   Image,
 *   InlineCode,
 *   Link,
 *   ListItem,
 *   List,
 *   Nodes,
 *   Paragraph,
 *   PhrasingContent,
 *   ReferenceType,
 *   Root,
 *   Strong,
 *   Text,
 *   ThematicBreak
 * } from 'mdast'
 * @import {
 *   Encoding,
 *   Event,
 *   Token,
 *   Value
 * } from 'micromark-util-types'
 * @import {Point} from 'unist'
 * @import {
 *   CompileContext,
 *   CompileData,
 *   Config,
 *   Extension,
 *   Handle,
 *   OnEnterError,
 *   Options
 * } from './types.js'
 */ __turbopack_context__.s([
    "fromMarkdown",
    ()=>fromMarkdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/devlop/lib/development.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$to$2d$string$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/mdast-util-to-string/lib/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/micromark/dev/lib/parse.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$postprocess$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/micromark/dev/lib/postprocess.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$preprocess$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/micromark/dev/lib/preprocess.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2d$util$2d$decode$2d$numeric$2d$character$2d$reference$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/micromark-util-decode-numeric-character-reference/dev/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$decode$2d$string$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-decode-string/dev/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$normalize$2d$identifier$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-normalize-identifier/dev/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-symbol/lib/codes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-symbol/lib/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/micromark-util-symbol/lib/types.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$decode$2d$named$2d$character$2d$reference$2f$index$2e$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/decode-named-character-reference/index.dom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$unist$2d$util$2d$stringify$2d$position$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/cogni/cogni-frontend/node_modules/mdast-util-from-markdown/node_modules/unist-util-stringify-position/lib/index.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
const own = {}.hasOwnProperty;
function fromMarkdown(value, encoding, options) {
    if (typeof encoding !== 'string') {
        options = encoding;
        encoding = undefined;
    }
    return compiler(options)((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$postprocess$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postprocess"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parse"])(options).document().write((0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2f$dev$2f$lib$2f$preprocess$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["preprocess"])()(value, encoding, true))));
}
/**
 * Note this compiler only understand complete buffering, not streaming.
 *
 * @param {Options | null | undefined} [options]
 */ function compiler(options) {
    /** @type {Config} */ const config = {
        transforms: [],
        canContainEols: [
            'emphasis',
            'fragment',
            'heading',
            'paragraph',
            'strong'
        ],
        enter: {
            autolink: opener(link),
            autolinkProtocol: onenterdata,
            autolinkEmail: onenterdata,
            atxHeading: opener(heading),
            blockQuote: opener(blockQuote),
            characterEscape: onenterdata,
            characterReference: onenterdata,
            codeFenced: opener(codeFlow),
            codeFencedFenceInfo: buffer,
            codeFencedFenceMeta: buffer,
            codeIndented: opener(codeFlow, buffer),
            codeText: opener(codeText, buffer),
            codeTextData: onenterdata,
            data: onenterdata,
            codeFlowValue: onenterdata,
            definition: opener(definition),
            definitionDestinationString: buffer,
            definitionLabelString: buffer,
            definitionTitleString: buffer,
            emphasis: opener(emphasis),
            hardBreakEscape: opener(hardBreak),
            hardBreakTrailing: opener(hardBreak),
            htmlFlow: opener(html, buffer),
            htmlFlowData: onenterdata,
            htmlText: opener(html, buffer),
            htmlTextData: onenterdata,
            image: opener(image),
            label: buffer,
            link: opener(link),
            listItem: opener(listItem),
            listItemValue: onenterlistitemvalue,
            listOrdered: opener(list, onenterlistordered),
            listUnordered: opener(list),
            paragraph: opener(paragraph),
            reference: onenterreference,
            referenceString: buffer,
            resourceDestinationString: buffer,
            resourceTitleString: buffer,
            setextHeading: opener(heading),
            strong: opener(strong),
            thematicBreak: opener(thematicBreak)
        },
        exit: {
            atxHeading: closer(),
            atxHeadingSequence: onexitatxheadingsequence,
            autolink: closer(),
            autolinkEmail: onexitautolinkemail,
            autolinkProtocol: onexitautolinkprotocol,
            blockQuote: closer(),
            characterEscapeValue: onexitdata,
            characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
            characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
            characterReferenceValue: onexitcharacterreferencevalue,
            characterReference: onexitcharacterreference,
            codeFenced: closer(onexitcodefenced),
            codeFencedFence: onexitcodefencedfence,
            codeFencedFenceInfo: onexitcodefencedfenceinfo,
            codeFencedFenceMeta: onexitcodefencedfencemeta,
            codeFlowValue: onexitdata,
            codeIndented: closer(onexitcodeindented),
            codeText: closer(onexitcodetext),
            codeTextData: onexitdata,
            data: onexitdata,
            definition: closer(),
            definitionDestinationString: onexitdefinitiondestinationstring,
            definitionLabelString: onexitdefinitionlabelstring,
            definitionTitleString: onexitdefinitiontitlestring,
            emphasis: closer(),
            hardBreakEscape: closer(onexithardbreak),
            hardBreakTrailing: closer(onexithardbreak),
            htmlFlow: closer(onexithtmlflow),
            htmlFlowData: onexitdata,
            htmlText: closer(onexithtmltext),
            htmlTextData: onexitdata,
            image: closer(onexitimage),
            label: onexitlabel,
            labelText: onexitlabeltext,
            lineEnding: onexitlineending,
            link: closer(onexitlink),
            listItem: closer(),
            listOrdered: closer(),
            listUnordered: closer(),
            paragraph: closer(),
            referenceString: onexitreferencestring,
            resourceDestinationString: onexitresourcedestinationstring,
            resourceTitleString: onexitresourcetitlestring,
            resource: onexitresource,
            setextHeading: closer(onexitsetextheading),
            setextHeadingLineSequence: onexitsetextheadinglinesequence,
            setextHeadingText: onexitsetextheadingtext,
            strong: closer(),
            thematicBreak: closer()
        }
    };
    configure(config, (options || {}).mdastExtensions || []);
    /** @type {CompileData} */ const data = {};
    return compile;
    //TURBOPACK unreachable
    ;
    /**
   * Turn micromark events into an mdast tree.
   *
   * @param {Array<Event>} events
   *   Events.
   * @returns {Root}
   *   mdast tree.
   */ function compile(events) {
        /** @type {Root} */ let tree = {
            type: 'root',
            children: []
        };
        /** @type {Omit<CompileContext, 'sliceSerialize'>} */ const context = {
            stack: [
                tree
            ],
            tokenStack: [],
            config,
            enter,
            exit,
            buffer,
            resume,
            data
        };
        /** @type {Array<number>} */ const listStack = [];
        let index = -1;
        while(++index < events.length){
            // We preprocess lists to add `listItem` tokens, and to infer whether
            // items the list itself are spread out.
            if (events[index][1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].listOrdered || events[index][1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].listUnordered) {
                if (events[index][0] === 'enter') {
                    listStack.push(index);
                } else {
                    const tail = listStack.pop();
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(typeof tail === 'number', 'expected list ot be open');
                    index = prepareList(events, tail, index);
                }
            }
        }
        index = -1;
        while(++index < events.length){
            const handler = config[events[index][0]];
            if (own.call(handler, events[index][1].type)) {
                handler[events[index][1].type].call(Object.assign({
                    sliceSerialize: events[index][2].sliceSerialize
                }, context), events[index][1]);
            }
        }
        // Handle tokens still being open.
        if (context.tokenStack.length > 0) {
            const tail = context.tokenStack[context.tokenStack.length - 1];
            const handler = tail[1] || defaultOnError;
            handler.call(context, undefined, tail[0]);
        }
        // Figure out `root` position.
        tree.position = {
            start: point(events.length > 0 ? events[0][1].start : {
                line: 1,
                column: 1,
                offset: 0
            }),
            end: point(events.length > 0 ? events[events.length - 2][1].end : {
                line: 1,
                column: 1,
                offset: 0
            })
        };
        // Call transforms.
        index = -1;
        while(++index < config.transforms.length){
            tree = config.transforms[index](tree) || tree;
        }
        return tree;
    }
    /**
   * @param {Array<Event>} events
   * @param {number} start
   * @param {number} length
   * @returns {number}
   */ function prepareList(events, start, length) {
        let index = start - 1;
        let containerBalance = -1;
        let listSpread = false;
        /** @type {Token | undefined} */ let listItem;
        /** @type {number | undefined} */ let lineIndex;
        /** @type {number | undefined} */ let firstBlankLineIndex;
        /** @type {boolean | undefined} */ let atMarker;
        while(++index <= length){
            const event = events[index];
            switch(event[1].type){
                case __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].listUnordered:
                case __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].listOrdered:
                case __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].blockQuote:
                    {
                        if (event[0] === 'enter') {
                            containerBalance++;
                        } else {
                            containerBalance--;
                        }
                        atMarker = undefined;
                        break;
                    }
                case __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].lineEndingBlank:
                    {
                        if (event[0] === 'enter') {
                            if (listItem && !atMarker && !containerBalance && !firstBlankLineIndex) {
                                firstBlankLineIndex = index;
                            }
                            atMarker = undefined;
                        }
                        break;
                    }
                case __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].linePrefix:
                case __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].listItemValue:
                case __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].listItemMarker:
                case __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].listItemPrefix:
                case __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].listItemPrefixWhitespace:
                    {
                        break;
                    }
                default:
                    {
                        atMarker = undefined;
                    }
            }
            if (!containerBalance && event[0] === 'enter' && event[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].listItemPrefix || containerBalance === -1 && event[0] === 'exit' && (event[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].listUnordered || event[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].listOrdered)) {
                if (listItem) {
                    let tailIndex = index;
                    lineIndex = undefined;
                    while(tailIndex--){
                        const tailEvent = events[tailIndex];
                        if (tailEvent[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].lineEnding || tailEvent[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].lineEndingBlank) {
                            if (tailEvent[0] === 'exit') continue;
                            if (lineIndex) {
                                events[lineIndex][1].type = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].lineEndingBlank;
                                listSpread = true;
                            }
                            tailEvent[1].type = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].lineEnding;
                            lineIndex = tailIndex;
                        } else if (tailEvent[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].linePrefix || tailEvent[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].blockQuotePrefix || tailEvent[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].blockQuotePrefixWhitespace || tailEvent[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].blockQuoteMarker || tailEvent[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].listItemIndent) {
                        // Empty
                        } else {
                            break;
                        }
                    }
                    if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) {
                        listItem._spread = true;
                    }
                    // Fix position.
                    listItem.end = Object.assign({}, lineIndex ? events[lineIndex][1].start : event[1].end);
                    events.splice(lineIndex || index, 0, [
                        'exit',
                        listItem,
                        event[2]
                    ]);
                    index++;
                    length++;
                }
                // Create a new list item.
                if (event[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].listItemPrefix) {
                    /** @type {Token} */ const item = {
                        type: 'listItem',
                        _spread: false,
                        start: Object.assign({}, event[1].start),
                        // @ts-expect-error: we’ll add `end` in a second.
                        end: undefined
                    };
                    listItem = item;
                    events.splice(index, 0, [
                        'enter',
                        item,
                        event[2]
                    ]);
                    index++;
                    length++;
                    firstBlankLineIndex = undefined;
                    atMarker = true;
                }
            }
        }
        events[start][1]._spread = listSpread;
        return length;
    }
    /**
   * Create an opener handle.
   *
   * @param {(token: Token) => Nodes} create
   *   Create a node.
   * @param {Handle | undefined} [and]
   *   Optional function to also run.
   * @returns {Handle}
   *   Handle.
   */ function opener(create, and) {
        return open;
        //TURBOPACK unreachable
        ;
        /**
     * @this {CompileContext}
     * @param {Token} token
     * @returns {undefined}
     */ function open(token) {
            enter.call(this, create(token), token);
            if (and) and.call(this, token);
        }
    }
    /**
   * @type {CompileContext['buffer']}
   */ function buffer() {
        this.stack.push({
            type: 'fragment',
            children: []
        });
    }
    /**
   * @type {CompileContext['enter']}
   */ function enter(node, token, errorHandler) {
        const parent = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(parent, 'expected `parent`');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])('children' in parent, 'expected `parent`');
        /** @type {Array<Nodes>} */ const siblings = parent.children;
        siblings.push(node);
        this.stack.push(node);
        this.tokenStack.push([
            token,
            errorHandler || undefined
        ]);
        node.position = {
            start: point(token.start),
            // @ts-expect-error: `end` will be patched later.
            end: undefined
        };
    }
    /**
   * Create a closer handle.
   *
   * @param {Handle | undefined} [and]
   *   Optional function to also run.
   * @returns {Handle}
   *   Handle.
   */ function closer(and) {
        return close;
        //TURBOPACK unreachable
        ;
        /**
     * @this {CompileContext}
     * @param {Token} token
     * @returns {undefined}
     */ function close(token) {
            if (and) and.call(this, token);
            exit.call(this, token);
        }
    }
    /**
   * @type {CompileContext['exit']}
   */ function exit(token, onExitError) {
        const node = this.stack.pop();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected `node`');
        const open = this.tokenStack.pop();
        if (!open) {
            throw new Error('Cannot close `' + token.type + '` (' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$unist$2d$util$2d$stringify$2d$position$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringifyPosition"])({
                start: token.start,
                end: token.end
            }) + '): it’s not open');
        } else if (open[0].type !== token.type) {
            if (onExitError) {
                onExitError.call(this, token, open[0]);
            } else {
                const handler = open[1] || defaultOnError;
                handler.call(this, token, open[0]);
            }
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node.type !== 'fragment', 'unexpected fragment `exit`ed');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node.position, 'expected `position` to be defined');
        node.position.end = point(token.end);
    }
    /**
   * @type {CompileContext['resume']}
   */ function resume() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$to$2d$string$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toString"])(this.stack.pop());
    }
    //
    // Handlers.
    //
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onenterlistordered() {
        this.data.expectingFirstListItemValue = true;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onenterlistitemvalue(token) {
        if (this.data.expectingFirstListItemValue) {
            const ancestor = this.stack[this.stack.length - 2];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(ancestor, 'expected nodes on stack');
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(ancestor.type === 'list', 'expected list on stack');
            ancestor.start = Number.parseInt(this.sliceSerialize(token), __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constants"].numericBaseDecimal);
            this.data.expectingFirstListItemValue = undefined;
        }
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitcodefencedfenceinfo() {
        const data = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'code', 'expected code on stack');
        node.lang = data;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitcodefencedfencemeta() {
        const data = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'code', 'expected code on stack');
        node.meta = data;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitcodefencedfence() {
        // Exit if this is the closing fence.
        if (this.data.flowCodeInside) return;
        this.buffer();
        this.data.flowCodeInside = true;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitcodefenced() {
        const data = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'code', 'expected code on stack');
        node.value = data.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, '');
        this.data.flowCodeInside = undefined;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitcodeindented() {
        const data = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'code', 'expected code on stack');
        node.value = data.replace(/(\r?\n|\r)$/g, '');
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitdefinitionlabelstring(token) {
        const label = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'definition', 'expected definition on stack');
        node.label = label;
        node.identifier = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$normalize$2d$identifier$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeIdentifier"])(this.sliceSerialize(token)).toLowerCase();
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitdefinitiontitlestring() {
        const data = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'definition', 'expected definition on stack');
        node.title = data;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitdefinitiondestinationstring() {
        const data = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'definition', 'expected definition on stack');
        node.url = data;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitatxheadingsequence(token) {
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'heading', 'expected heading on stack');
        if (!node.depth) {
            const depth = this.sliceSerialize(token).length;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(depth === 1 || depth === 2 || depth === 3 || depth === 4 || depth === 5 || depth === 6, 'expected `depth` between `1` and `6`');
            node.depth = depth;
        }
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitsetextheadingtext() {
        this.data.setextHeadingSlurpLineEnding = true;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitsetextheadinglinesequence(token) {
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'heading', 'expected heading on stack');
        node.depth = this.sliceSerialize(token).codePointAt(0) === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$codes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["codes"].equalsTo ? 1 : 2;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitsetextheading() {
        this.data.setextHeadingSlurpLineEnding = undefined;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onenterdata(token) {
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])('children' in node, 'expected parent on stack');
        /** @type {Array<Nodes>} */ const siblings = node.children;
        let tail = siblings[siblings.length - 1];
        if (!tail || tail.type !== 'text') {
            // Add a new text node.
            tail = text();
            tail.position = {
                start: point(token.start),
                // @ts-expect-error: we’ll add `end` later.
                end: undefined
            };
            siblings.push(tail);
        }
        this.stack.push(tail);
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitdata(token) {
        const tail = this.stack.pop();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(tail, 'expected a `node` to be on the stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])('value' in tail, 'expected a `literal` to be on the stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(tail.position, 'expected `node` to have an open position');
        tail.value += this.sliceSerialize(token);
        tail.position.end = point(token.end);
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitlineending(token) {
        const context = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(context, 'expected `node`');
        // If we’re at a hard break, include the line ending in there.
        if (this.data.atHardBreak) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])('children' in context, 'expected `parent`');
            const tail = context.children[context.children.length - 1];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(tail.position, 'expected tail to have a starting position');
            tail.position.end = point(token.end);
            this.data.atHardBreak = undefined;
            return;
        }
        if (!this.data.setextHeadingSlurpLineEnding && config.canContainEols.includes(context.type)) {
            onenterdata.call(this, token);
            onexitdata.call(this, token);
        }
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexithardbreak() {
        this.data.atHardBreak = true;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexithtmlflow() {
        const data = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'html', 'expected html on stack');
        node.value = data;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexithtmltext() {
        const data = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'html', 'expected html on stack');
        node.value = data;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitcodetext() {
        const data = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'inlineCode', 'expected inline code on stack');
        node.value = data;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitlink() {
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'link', 'expected link on stack');
        // Note: there are also `identifier` and `label` fields on this link node!
        // These are used / cleaned here.
        // To do: clean.
        if (this.data.inReference) {
            /** @type {ReferenceType} */ const referenceType = this.data.referenceType || 'shortcut';
            node.type += 'Reference';
            // @ts-expect-error: mutate.
            node.referenceType = referenceType;
            // @ts-expect-error: mutate.
            delete node.url;
            delete node.title;
        } else {
            // @ts-expect-error: mutate.
            delete node.identifier;
            // @ts-expect-error: mutate.
            delete node.label;
        }
        this.data.referenceType = undefined;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitimage() {
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'image', 'expected image on stack');
        // Note: there are also `identifier` and `label` fields on this link node!
        // These are used / cleaned here.
        // To do: clean.
        if (this.data.inReference) {
            /** @type {ReferenceType} */ const referenceType = this.data.referenceType || 'shortcut';
            node.type += 'Reference';
            // @ts-expect-error: mutate.
            node.referenceType = referenceType;
            // @ts-expect-error: mutate.
            delete node.url;
            delete node.title;
        } else {
            // @ts-expect-error: mutate.
            delete node.identifier;
            // @ts-expect-error: mutate.
            delete node.label;
        }
        this.data.referenceType = undefined;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitlabeltext(token) {
        const string = this.sliceSerialize(token);
        const ancestor = this.stack[this.stack.length - 2];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(ancestor, 'expected ancestor on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(ancestor.type === 'image' || ancestor.type === 'link', 'expected image or link on stack');
        // @ts-expect-error: stash this on the node, as it might become a reference
        // later.
        ancestor.label = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$decode$2d$string$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeString"])(string);
        // @ts-expect-error: same as above.
        ancestor.identifier = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$normalize$2d$identifier$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeIdentifier"])(string).toLowerCase();
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitlabel() {
        const fragment = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(fragment, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(fragment.type === 'fragment', 'expected fragment on stack');
        const value = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'image' || node.type === 'link', 'expected image or link on stack');
        // Assume a reference.
        this.data.inReference = true;
        if (node.type === 'link') {
            /** @type {Array<PhrasingContent>} */ const children = fragment.children;
            node.children = children;
        } else {
            node.alt = value;
        }
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitresourcedestinationstring() {
        const data = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'image' || node.type === 'link', 'expected image or link on stack');
        node.url = data;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitresourcetitlestring() {
        const data = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'image' || node.type === 'link', 'expected image or link on stack');
        node.title = data;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitresource() {
        this.data.inReference = undefined;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onenterreference() {
        this.data.referenceType = 'collapsed';
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitreferencestring(token) {
        const label = this.resume();
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'image' || node.type === 'link', 'expected image reference or link reference on stack');
        // @ts-expect-error: stash this on the node, as it might become a reference
        // later.
        node.label = label;
        // @ts-expect-error: same as above.
        node.identifier = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$normalize$2d$identifier$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeIdentifier"])(this.sliceSerialize(token)).toLowerCase();
        this.data.referenceType = 'full';
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitcharacterreferencemarker(token) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(token.type === 'characterReferenceMarkerNumeric' || token.type === 'characterReferenceMarkerHexadecimal');
        this.data.characterReferenceType = token.type;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitcharacterreferencevalue(token) {
        const data = this.sliceSerialize(token);
        const type = this.data.characterReferenceType;
        /** @type {string} */ let value;
        if (type) {
            value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$micromark$2d$util$2d$decode$2d$numeric$2d$character$2d$reference$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeNumericCharacterReference"])(data, type === __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["types"].characterReferenceMarkerNumeric ? __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constants"].numericBaseDecimal : __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$micromark$2d$util$2d$symbol$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["constants"].numericBaseHexadecimal);
            this.data.characterReferenceType = undefined;
        } else {
            const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$decode$2d$named$2d$character$2d$reference$2f$index$2e$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeNamedCharacterReference"])(data);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(result !== false, 'expected reference to decode');
            value = result;
        }
        const tail = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(tail, 'expected `node`');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])('value' in tail, 'expected `node.value`');
        tail.value += value;
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitcharacterreference(token) {
        const tail = this.stack.pop();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(tail, 'expected `node`');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(tail.position, 'expected `node.position`');
        tail.position.end = point(token.end);
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitautolinkprotocol(token) {
        onexitdata.call(this, token);
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'link', 'expected link on stack');
        node.url = this.sliceSerialize(token);
    }
    /**
   * @this {CompileContext}
   * @type {Handle}
   */ function onexitautolinkemail(token) {
        onexitdata.call(this, token);
        const node = this.stack[this.stack.length - 1];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node, 'expected node on stack');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ok"])(node.type === 'link', 'expected link on stack');
        node.url = 'mailto:' + this.sliceSerialize(token);
    }
    //
    // Creaters.
    //
    /** @returns {Blockquote} */ function blockQuote() {
        return {
            type: 'blockquote',
            children: []
        };
    }
    /** @returns {Code} */ function codeFlow() {
        return {
            type: 'code',
            lang: null,
            meta: null,
            value: ''
        };
    }
    /** @returns {InlineCode} */ function codeText() {
        return {
            type: 'inlineCode',
            value: ''
        };
    }
    /** @returns {Definition} */ function definition() {
        return {
            type: 'definition',
            identifier: '',
            label: null,
            title: null,
            url: ''
        };
    }
    /** @returns {Emphasis} */ function emphasis() {
        return {
            type: 'emphasis',
            children: []
        };
    }
    /** @returns {Heading} */ function heading() {
        return {
            type: 'heading',
            // @ts-expect-error `depth` will be set later.
            depth: 0,
            children: []
        };
    }
    /** @returns {Break} */ function hardBreak() {
        return {
            type: 'break'
        };
    }
    /** @returns {Html} */ function html() {
        return {
            type: 'html',
            value: ''
        };
    }
    /** @returns {Image} */ function image() {
        return {
            type: 'image',
            title: null,
            url: '',
            alt: null
        };
    }
    /** @returns {Link} */ function link() {
        return {
            type: 'link',
            title: null,
            url: '',
            children: []
        };
    }
    /**
   * @param {Token} token
   * @returns {List}
   */ function list(token) {
        return {
            type: 'list',
            ordered: token.type === 'listOrdered',
            start: null,
            spread: token._spread,
            children: []
        };
    }
    /**
   * @param {Token} token
   * @returns {ListItem}
   */ function listItem(token) {
        return {
            type: 'listItem',
            spread: token._spread,
            checked: null,
            children: []
        };
    }
    /** @returns {Paragraph} */ function paragraph() {
        return {
            type: 'paragraph',
            children: []
        };
    }
    /** @returns {Strong} */ function strong() {
        return {
            type: 'strong',
            children: []
        };
    }
    /** @returns {Text} */ function text() {
        return {
            type: 'text',
            value: ''
        };
    }
    /** @returns {ThematicBreak} */ function thematicBreak() {
        return {
            type: 'thematicBreak'
        };
    }
}
/**
 * Copy a point-like value.
 *
 * @param {Point} d
 *   Point-like value.
 * @returns {Point}
 *   unist point.
 */ function point(d) {
    return {
        line: d.line,
        column: d.column,
        offset: d.offset
    };
}
/**
 * @param {Config} combined
 * @param {Array<Array<Extension> | Extension>} extensions
 * @returns {undefined}
 */ function configure(combined, extensions) {
    let index = -1;
    while(++index < extensions.length){
        const value = extensions[index];
        if (Array.isArray(value)) {
            configure(combined, value);
        } else {
            extension(combined, value);
        }
    }
}
/**
 * @param {Config} combined
 * @param {Extension} extension
 * @returns {undefined}
 */ function extension(combined, extension) {
    /** @type {keyof Extension} */ let key;
    for(key in extension){
        if (own.call(extension, key)) {
            switch(key){
                case 'canContainEols':
                    {
                        const right = extension[key];
                        if (right) {
                            combined[key].push(...right);
                        }
                        break;
                    }
                case 'transforms':
                    {
                        const right = extension[key];
                        if (right) {
                            combined[key].push(...right);
                        }
                        break;
                    }
                case 'enter':
                case 'exit':
                    {
                        const right = extension[key];
                        if (right) {
                            Object.assign(combined[key], right);
                        }
                        break;
                    }
            }
        }
    }
}
/** @type {OnEnterError} */ function defaultOnError(left, right) {
    if (left) {
        throw new Error('Cannot close `' + left.type + '` (' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$unist$2d$util$2d$stringify$2d$position$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringifyPosition"])({
            start: left.start,
            end: left.end
        }) + '): a different token (`' + right.type + '`, ' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$unist$2d$util$2d$stringify$2d$position$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringifyPosition"])({
            start: right.start,
            end: right.end
        }) + ') is open');
    } else {
        throw new Error('Cannot close document, a token (`' + right.type + '`, ' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$cogni$2f$cogni$2d$frontend$2f$node_modules$2f$mdast$2d$util$2d$from$2d$markdown$2f$node_modules$2f$unist$2d$util$2d$stringify$2d$position$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringifyPosition"])({
            start: right.start,
            end: right.end
        }) + ') is still open');
    }
}
}),
]);

//# sourceMappingURL=5fd8e_mdast-util-from-markdown_95d84864._.js.map