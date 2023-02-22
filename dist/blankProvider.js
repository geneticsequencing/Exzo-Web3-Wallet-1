/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@metamask/safe-event-emitter/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@metamask/safe-event-emitter/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
function safeApply(handler, context, args) {
    try {
        Reflect.apply(handler, context, args);
    }
    catch (err) {
        // Throw error after timeout so as not to interrupt the stack
        setTimeout(() => {
            throw err;
        });
    }
}
function arrayClone(arr) {
    const n = arr.length;
    const copy = new Array(n);
    for (let i = 0; i < n; i += 1) {
        copy[i] = arr[i];
    }
    return copy;
}
class SafeEventEmitter extends events_1.EventEmitter {
    emit(type, ...args) {
        let doError = type === 'error';
        const events = this._events;
        if (events !== undefined) {
            doError = doError && events.error === undefined;
        }
        else if (!doError) {
            return false;
        }
        // If there is no 'error' event listener then throw.
        if (doError) {
            let er;
            if (args.length > 0) {
                [er] = args;
            }
            if (er instanceof Error) {
                // Note: The comments on the `throw` lines are intentional, they show
                // up in Node's output if this results in an unhandled exception.
                throw er; // Unhandled 'error' event
            }
            // At least give some kind of context to the user
            const err = new Error(`Unhandled error.${er ? ` (${er.message})` : ''}`);
            err.context = er;
            throw err; // Unhandled 'error' event
        }
        const handler = events[type];
        if (handler === undefined) {
            return false;
        }
        if (typeof handler === 'function') {
            safeApply(handler, this, args);
        }
        else {
            const len = handler.length;
            const listeners = arrayClone(handler);
            for (let i = 0; i < len; i += 1) {
                safeApply(listeners[i], this, args);
            }
        }
        return true;
    }
}
exports["default"] = SafeEventEmitter;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/eth-rpc-errors/dist/classes.js":
/*!*****************************************************!*\
  !*** ./node_modules/eth-rpc-errors/dist/classes.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EthereumProviderError = exports.EthereumRpcError = void 0;
const fast_safe_stringify_1 = __webpack_require__(/*! fast-safe-stringify */ "./node_modules/fast-safe-stringify/index.js");
/**
 * Error subclass implementing JSON RPC 2.0 errors and Ethereum RPC errors
 * per EIP-1474.
 * Permits any integer error code.
 */
class EthereumRpcError extends Error {
    constructor(code, message, data) {
        if (!Number.isInteger(code)) {
            throw new Error('"code" must be an integer.');
        }
        if (!message || typeof message !== 'string') {
            throw new Error('"message" must be a nonempty string.');
        }
        super(message);
        this.code = code;
        if (data !== undefined) {
            this.data = data;
        }
    }
    /**
     * Returns a plain object with all public class properties.
     */
    serialize() {
        const serialized = {
            code: this.code,
            message: this.message,
        };
        if (this.data !== undefined) {
            serialized.data = this.data;
        }
        if (this.stack) {
            serialized.stack = this.stack;
        }
        return serialized;
    }
    /**
     * Return a string representation of the serialized error, omitting
     * any circular references.
     */
    toString() {
        return fast_safe_stringify_1.default(this.serialize(), stringifyReplacer, 2);
    }
}
exports.EthereumRpcError = EthereumRpcError;
/**
 * Error subclass implementing Ethereum Provider errors per EIP-1193.
 * Permits integer error codes in the [ 1000 <= 4999 ] range.
 */
class EthereumProviderError extends EthereumRpcError {
    /**
     * Create an Ethereum Provider JSON-RPC error.
     * `code` must be an integer in the 1000 <= 4999 range.
     */
    constructor(code, message, data) {
        if (!isValidEthProviderCode(code)) {
            throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');
        }
        super(code, message, data);
    }
}
exports.EthereumProviderError = EthereumProviderError;
// Internal
function isValidEthProviderCode(code) {
    return Number.isInteger(code) && code >= 1000 && code <= 4999;
}
function stringifyReplacer(_, value) {
    if (value === '[Circular]') {
        return undefined;
    }
    return value;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGFzc2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZEQUFnRDtBQVNoRDs7OztHQUlHO0FBQ0gsTUFBYSxnQkFBb0IsU0FBUSxLQUFLO0lBTTVDLFlBQVksSUFBWSxFQUFFLE9BQWUsRUFBRSxJQUFRO1FBRWpELElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzNCLE1BQU0sSUFBSSxLQUFLLENBQ2IsNEJBQTRCLENBQzdCLENBQUM7U0FDSDtRQUNELElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQzNDLE1BQU0sSUFBSSxLQUFLLENBQ2Isc0NBQXNDLENBQ3ZDLENBQUM7U0FDSDtRQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUN0QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUNsQjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILFNBQVM7UUFDUCxNQUFNLFVBQVUsR0FBK0I7WUFDN0MsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1NBQ3RCLENBQUM7UUFDRixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQzNCLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztTQUM3QjtRQUNELElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUMvQjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxRQUFRO1FBQ04sT0FBTyw2QkFBYSxDQUNsQixJQUFJLENBQUMsU0FBUyxFQUFFLEVBQ2hCLGlCQUFpQixFQUNqQixDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQXRERCw0Q0FzREM7QUFFRDs7O0dBR0c7QUFDSCxNQUFhLHFCQUF5QixTQUFRLGdCQUFtQjtJQUUvRDs7O09BR0c7SUFDSCxZQUFZLElBQVksRUFBRSxPQUFlLEVBQUUsSUFBUTtRQUVqRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDakMsTUFBTSxJQUFJLEtBQUssQ0FDYiwyREFBMkQsQ0FDNUQsQ0FBQztTQUNIO1FBRUQsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztDQUNGO0FBaEJELHNEQWdCQztBQUVELFdBQVc7QUFFWCxTQUFTLHNCQUFzQixDQUFDLElBQVk7SUFDMUMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQztBQUNoRSxDQUFDO0FBRUQsU0FBUyxpQkFBaUIsQ0FBQyxDQUFVLEVBQUUsS0FBYztJQUNuRCxJQUFJLEtBQUssS0FBSyxZQUFZLEVBQUU7UUFDMUIsT0FBTyxTQUFTLENBQUM7S0FDbEI7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMifQ==

/***/ }),

/***/ "./node_modules/eth-rpc-errors/dist/error-constants.js":
/*!*************************************************************!*\
  !*** ./node_modules/eth-rpc-errors/dist/error-constants.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.errorValues = exports.errorCodes = void 0;
exports.errorCodes = {
    rpc: {
        invalidInput: -32000,
        resourceNotFound: -32001,
        resourceUnavailable: -32002,
        transactionRejected: -32003,
        methodNotSupported: -32004,
        limitExceeded: -32005,
        parse: -32700,
        invalidRequest: -32600,
        methodNotFound: -32601,
        invalidParams: -32602,
        internal: -32603,
    },
    provider: {
        userRejectedRequest: 4001,
        unauthorized: 4100,
        unsupportedMethod: 4200,
        disconnected: 4900,
        chainDisconnected: 4901,
    },
};
exports.errorValues = {
    '-32700': {
        standard: 'JSON RPC 2.0',
        message: 'Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.',
    },
    '-32600': {
        standard: 'JSON RPC 2.0',
        message: 'The JSON sent is not a valid Request object.',
    },
    '-32601': {
        standard: 'JSON RPC 2.0',
        message: 'The method does not exist / is not available.',
    },
    '-32602': {
        standard: 'JSON RPC 2.0',
        message: 'Invalid method parameter(s).',
    },
    '-32603': {
        standard: 'JSON RPC 2.0',
        message: 'Internal JSON-RPC error.',
    },
    '-32000': {
        standard: 'EIP-1474',
        message: 'Invalid input.',
    },
    '-32001': {
        standard: 'EIP-1474',
        message: 'Resource not found.',
    },
    '-32002': {
        standard: 'EIP-1474',
        message: 'Resource unavailable.',
    },
    '-32003': {
        standard: 'EIP-1474',
        message: 'Transaction rejected.',
    },
    '-32004': {
        standard: 'EIP-1474',
        message: 'Method not supported.',
    },
    '-32005': {
        standard: 'EIP-1474',
        message: 'Request limit exceeded.',
    },
    '4001': {
        standard: 'EIP-1193',
        message: 'User rejected the request.',
    },
    '4100': {
        standard: 'EIP-1193',
        message: 'The requested account and/or method has not been authorized by the user.',
    },
    '4200': {
        standard: 'EIP-1193',
        message: 'The requested method is not supported by this Ethereum provider.',
    },
    '4900': {
        standard: 'EIP-1193',
        message: 'The provider is disconnected from all chains.',
    },
    '4901': {
        standard: 'EIP-1193',
        message: 'The provider is disconnected from the specified chain.',
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Vycm9yLWNvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUF1QmEsUUFBQSxVQUFVLEdBQWU7SUFDcEMsR0FBRyxFQUFFO1FBQ0gsWUFBWSxFQUFFLENBQUMsS0FBSztRQUNwQixnQkFBZ0IsRUFBRSxDQUFDLEtBQUs7UUFDeEIsbUJBQW1CLEVBQUUsQ0FBQyxLQUFLO1FBQzNCLG1CQUFtQixFQUFFLENBQUMsS0FBSztRQUMzQixrQkFBa0IsRUFBRSxDQUFDLEtBQUs7UUFDMUIsYUFBYSxFQUFFLENBQUMsS0FBSztRQUNyQixLQUFLLEVBQUUsQ0FBQyxLQUFLO1FBQ2IsY0FBYyxFQUFFLENBQUMsS0FBSztRQUN0QixjQUFjLEVBQUUsQ0FBQyxLQUFLO1FBQ3RCLGFBQWEsRUFBRSxDQUFDLEtBQUs7UUFDckIsUUFBUSxFQUFFLENBQUMsS0FBSztLQUNqQjtJQUNELFFBQVEsRUFBRTtRQUNSLG1CQUFtQixFQUFFLElBQUk7UUFDekIsWUFBWSxFQUFFLElBQUk7UUFDbEIsaUJBQWlCLEVBQUUsSUFBSTtRQUN2QixZQUFZLEVBQUUsSUFBSTtRQUNsQixpQkFBaUIsRUFBRSxJQUFJO0tBQ3hCO0NBQ0YsQ0FBQztBQUVXLFFBQUEsV0FBVyxHQUFHO0lBQ3pCLFFBQVEsRUFBRTtRQUNSLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLE9BQU8sRUFBRSx1R0FBdUc7S0FDakg7SUFDRCxRQUFRLEVBQUU7UUFDUixRQUFRLEVBQUUsY0FBYztRQUN4QixPQUFPLEVBQUUsOENBQThDO0tBQ3hEO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsUUFBUSxFQUFFLGNBQWM7UUFDeEIsT0FBTyxFQUFFLCtDQUErQztLQUN6RDtJQUNELFFBQVEsRUFBRTtRQUNSLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLE9BQU8sRUFBRSw4QkFBOEI7S0FDeEM7SUFDRCxRQUFRLEVBQUU7UUFDUixRQUFRLEVBQUUsY0FBYztRQUN4QixPQUFPLEVBQUUsMEJBQTBCO0tBQ3BDO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsUUFBUSxFQUFFLFVBQVU7UUFDcEIsT0FBTyxFQUFFLGdCQUFnQjtLQUMxQjtJQUNELFFBQVEsRUFBRTtRQUNSLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLE9BQU8sRUFBRSxxQkFBcUI7S0FDL0I7SUFDRCxRQUFRLEVBQUU7UUFDUixRQUFRLEVBQUUsVUFBVTtRQUNwQixPQUFPLEVBQUUsdUJBQXVCO0tBQ2pDO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsUUFBUSxFQUFFLFVBQVU7UUFDcEIsT0FBTyxFQUFFLHVCQUF1QjtLQUNqQztJQUNELFFBQVEsRUFBRTtRQUNSLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLE9BQU8sRUFBRSx1QkFBdUI7S0FDakM7SUFDRCxRQUFRLEVBQUU7UUFDUixRQUFRLEVBQUUsVUFBVTtRQUNwQixPQUFPLEVBQUUseUJBQXlCO0tBQ25DO0lBQ0QsTUFBTSxFQUFFO1FBQ04sUUFBUSxFQUFFLFVBQVU7UUFDcEIsT0FBTyxFQUFFLDRCQUE0QjtLQUN0QztJQUNELE1BQU0sRUFBRTtRQUNOLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLE9BQU8sRUFBRSwwRUFBMEU7S0FDcEY7SUFDRCxNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUUsVUFBVTtRQUNwQixPQUFPLEVBQUUsa0VBQWtFO0tBQzVFO0lBQ0QsTUFBTSxFQUFFO1FBQ04sUUFBUSxFQUFFLFVBQVU7UUFDcEIsT0FBTyxFQUFFLCtDQUErQztLQUN6RDtJQUNELE1BQU0sRUFBRTtRQUNOLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLE9BQU8sRUFBRSx3REFBd0Q7S0FDbEU7Q0FDRixDQUFDIn0=

/***/ }),

/***/ "./node_modules/eth-rpc-errors/dist/errors.js":
/*!****************************************************!*\
  !*** ./node_modules/eth-rpc-errors/dist/errors.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ethErrors = void 0;
const classes_1 = __webpack_require__(/*! ./classes */ "./node_modules/eth-rpc-errors/dist/classes.js");
const utils_1 = __webpack_require__(/*! ./utils */ "./node_modules/eth-rpc-errors/dist/utils.js");
const error_constants_1 = __webpack_require__(/*! ./error-constants */ "./node_modules/eth-rpc-errors/dist/error-constants.js");
exports.ethErrors = {
    rpc: {
        /**
         * Get a JSON RPC 2.0 Parse (-32700) error.
         */
        parse: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.parse, arg),
        /**
         * Get a JSON RPC 2.0 Invalid Request (-32600) error.
         */
        invalidRequest: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.invalidRequest, arg),
        /**
         * Get a JSON RPC 2.0 Invalid Params (-32602) error.
         */
        invalidParams: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.invalidParams, arg),
        /**
         * Get a JSON RPC 2.0 Method Not Found (-32601) error.
         */
        methodNotFound: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.methodNotFound, arg),
        /**
         * Get a JSON RPC 2.0 Internal (-32603) error.
         */
        internal: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.internal, arg),
        /**
         * Get a JSON RPC 2.0 Server error.
         * Permits integer error codes in the [ -32099 <= -32005 ] range.
         * Codes -32000 through -32004 are reserved by EIP-1474.
         */
        server: (opts) => {
            if (!opts || typeof opts !== 'object' || Array.isArray(opts)) {
                throw new Error('Ethereum RPC Server errors must provide single object argument.');
            }
            const { code } = opts;
            if (!Number.isInteger(code) || code > -32005 || code < -32099) {
                throw new Error('"code" must be an integer such that: -32099 <= code <= -32005');
            }
            return getEthJsonRpcError(code, opts);
        },
        /**
         * Get an Ethereum JSON RPC Invalid Input (-32000) error.
         */
        invalidInput: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.invalidInput, arg),
        /**
         * Get an Ethereum JSON RPC Resource Not Found (-32001) error.
         */
        resourceNotFound: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.resourceNotFound, arg),
        /**
         * Get an Ethereum JSON RPC Resource Unavailable (-32002) error.
         */
        resourceUnavailable: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.resourceUnavailable, arg),
        /**
         * Get an Ethereum JSON RPC Transaction Rejected (-32003) error.
         */
        transactionRejected: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.transactionRejected, arg),
        /**
         * Get an Ethereum JSON RPC Method Not Supported (-32004) error.
         */
        methodNotSupported: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.methodNotSupported, arg),
        /**
         * Get an Ethereum JSON RPC Limit Exceeded (-32005) error.
         */
        limitExceeded: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.limitExceeded, arg),
    },
    provider: {
        /**
         * Get an Ethereum Provider User Rejected Request (4001) error.
         */
        userRejectedRequest: (arg) => {
            return getEthProviderError(error_constants_1.errorCodes.provider.userRejectedRequest, arg);
        },
        /**
         * Get an Ethereum Provider Unauthorized (4100) error.
         */
        unauthorized: (arg) => {
            return getEthProviderError(error_constants_1.errorCodes.provider.unauthorized, arg);
        },
        /**
         * Get an Ethereum Provider Unsupported Method (4200) error.
         */
        unsupportedMethod: (arg) => {
            return getEthProviderError(error_constants_1.errorCodes.provider.unsupportedMethod, arg);
        },
        /**
         * Get an Ethereum Provider Not Connected (4900) error.
         */
        disconnected: (arg) => {
            return getEthProviderError(error_constants_1.errorCodes.provider.disconnected, arg);
        },
        /**
         * Get an Ethereum Provider Chain Not Connected (4901) error.
         */
        chainDisconnected: (arg) => {
            return getEthProviderError(error_constants_1.errorCodes.provider.chainDisconnected, arg);
        },
        /**
         * Get a custom Ethereum Provider error.
         */
        custom: (opts) => {
            if (!opts || typeof opts !== 'object' || Array.isArray(opts)) {
                throw new Error('Ethereum Provider custom errors must provide single object argument.');
            }
            const { code, message, data } = opts;
            if (!message || typeof message !== 'string') {
                throw new Error('"message" must be a nonempty string');
            }
            return new classes_1.EthereumProviderError(code, message, data);
        },
    },
};
// Internal
function getEthJsonRpcError(code, arg) {
    const [message, data] = parseOpts(arg);
    return new classes_1.EthereumRpcError(code, message || utils_1.getMessageFromCode(code), data);
}
function getEthProviderError(code, arg) {
    const [message, data] = parseOpts(arg);
    return new classes_1.EthereumProviderError(code, message || utils_1.getMessageFromCode(code), data);
}
function parseOpts(arg) {
    if (arg) {
        if (typeof arg === 'string') {
            return [arg];
        }
        else if (typeof arg === 'object' && !Array.isArray(arg)) {
            const { message, data } = arg;
            if (message && typeof message !== 'string') {
                throw new Error('Must specify string message.');
            }
            return [message || undefined, data];
        }
    }
    return [];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Vycm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1Q0FBb0U7QUFDcEUsbUNBQTZDO0FBQzdDLHVEQUErQztBQWVsQyxRQUFBLFNBQVMsR0FBRztJQUN2QixHQUFHLEVBQUU7UUFFSDs7V0FFRztRQUNILEtBQUssRUFBRSxDQUFJLEdBQXFCLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixDQUNyRCw0QkFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUMxQjtRQUVEOztXQUVHO1FBQ0gsY0FBYyxFQUFFLENBQUksR0FBcUIsRUFBRSxFQUFFLENBQUMsa0JBQWtCLENBQzlELDRCQUFVLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQ25DO1FBRUQ7O1dBRUc7UUFDSCxhQUFhLEVBQUUsQ0FBSSxHQUFxQixFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsQ0FDN0QsNEJBQVUsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FDbEM7UUFFRDs7V0FFRztRQUNILGNBQWMsRUFBRSxDQUFJLEdBQXFCLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixDQUM5RCw0QkFBVSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUNuQztRQUVEOztXQUVHO1FBQ0gsUUFBUSxFQUFFLENBQUksR0FBcUIsRUFBRSxFQUFFLENBQUMsa0JBQWtCLENBQ3hELDRCQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQzdCO1FBRUQ7Ozs7V0FJRztRQUNILE1BQU0sRUFBRSxDQUFJLElBQTJCLEVBQUUsRUFBRTtZQUN6QyxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM1RCxNQUFNLElBQUksS0FBSyxDQUFDLGlFQUFpRSxDQUFDLENBQUM7YUFDcEY7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

/***/ }),

/***/ "./node_modules/eth-rpc-errors/dist/index.js":
/*!***************************************************!*\
  !*** ./node_modules/eth-rpc-errors/dist/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getMessageFromCode = exports.serializeError = exports.EthereumProviderError = exports.EthereumRpcError = exports.ethErrors = exports.errorCodes = void 0;
const classes_1 = __webpack_require__(/*! ./classes */ "./node_modules/eth-rpc-errors/dist/classes.js");
Object.defineProperty(exports, "EthereumRpcError", ({ enumerable: true, get: function () { return classes_1.EthereumRpcError; } }));
Object.defineProperty(exports, "EthereumProviderError", ({ enumerable: true, get: function () { return classes_1.EthereumProviderError; } }));
const utils_1 = __webpack_require__(/*! ./utils */ "./node_modules/eth-rpc-errors/dist/utils.js");
Object.defineProperty(exports, "serializeError", ({ enumerable: true, get: function () { return utils_1.serializeError; } }));
Object.defineProperty(exports, "getMessageFromCode", ({ enumerable: true, get: function () { return utils_1.getMessageFromCode; } }));
const errors_1 = __webpack_require__(/*! ./errors */ "./node_modules/eth-rpc-errors/dist/errors.js");
Object.defineProperty(exports, "ethErrors", ({ enumerable: true, get: function () { return errors_1.ethErrors; } }));
const error_constants_1 = __webpack_require__(/*! ./error-constants */ "./node_modules/eth-rpc-errors/dist/error-constants.js");
Object.defineProperty(exports, "errorCodes", ({ enumerable: true, get: function () { return error_constants_1.errorCodes; } }));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdUNBQW9FO0FBVWxFLGlHQVZPLDBCQUFnQixPQVVQO0FBQ2hCLHNHQVh5QiwrQkFBcUIsT0FXekI7QUFWdkIsbUNBRWlCO0FBU2YsK0ZBVkEsc0JBQWMsT0FVQTtBQUNkLG1HQVhnQiwwQkFBa0IsT0FXaEI7QUFUcEIscUNBQXFDO0FBS25DLDBGQUxPLGtCQUFTLE9BS1A7QUFKWCx1REFBK0M7QUFHN0MsMkZBSE8sNEJBQVUsT0FHUCJ9

/***/ }),

/***/ "./node_modules/eth-rpc-errors/dist/utils.js":
/*!***************************************************!*\
  !*** ./node_modules/eth-rpc-errors/dist/utils.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.serializeError = exports.isValidCode = exports.getMessageFromCode = exports.JSON_RPC_SERVER_ERROR_MESSAGE = void 0;
const error_constants_1 = __webpack_require__(/*! ./error-constants */ "./node_modules/eth-rpc-errors/dist/error-constants.js");
const classes_1 = __webpack_require__(/*! ./classes */ "./node_modules/eth-rpc-errors/dist/classes.js");
const FALLBACK_ERROR_CODE = error_constants_1.errorCodes.rpc.internal;
const FALLBACK_MESSAGE = 'Unspecified error message. This is a bug, please report it.';
const FALLBACK_ERROR = {
    code: FALLBACK_ERROR_CODE,
    message: getMessageFromCode(FALLBACK_ERROR_CODE),
};
exports.JSON_RPC_SERVER_ERROR_MESSAGE = 'Unspecified server error.';
/**
 * Gets the message for a given code, or a fallback message if the code has
 * no corresponding message.
 */
function getMessageFromCode(code, fallbackMessage = FALLBACK_MESSAGE) {
    if (Number.isInteger(code)) {
        const codeString = code.toString();
        if (hasKey(error_constants_1.errorValues, codeString)) {
            return error_constants_1.errorValues[codeString].message;
        }
        if (isJsonRpcServerError(code)) {
            return exports.JSON_RPC_SERVER_ERROR_MESSAGE;
        }
    }
    return fallbackMessage;
}
exports.getMessageFromCode = getMessageFromCode;
/**
 * Returns whether the given code is valid.
 * A code is only valid if it has a message.
 */
function isValidCode(code) {
    if (!Number.isInteger(code)) {
        return false;
    }
    const codeString = code.toString();
    if (error_constants_1.errorValues[codeString]) {
        return true;
    }
    if (isJsonRpcServerError(code)) {
        return true;
    }
    return false;
}
exports.isValidCode = isValidCode;
/**
 * Serializes the given error to an Ethereum JSON RPC-compatible error object.
 * Merely copies the given error's values if it is already compatible.
 * If the given error is not fully compatible, it will be preserved on the
 * returned object's data.originalError property.
 */
function serializeError(error, { fallbackError = FALLBACK_ERROR, shouldIncludeStack = false, } = {}) {
    var _a, _b;
    if (!fallbackError ||
        !Number.isInteger(fallbackError.code) ||
        typeof fallbackError.message !== 'string') {
        throw new Error('Must provide fallback error with integer number code and string message.');
    }
    if (error instanceof classes_1.EthereumRpcError) {
        return error.serialize();
    }
    const serialized = {};
    if (error &&
        typeof error === 'object' &&
        !Array.isArray(error) &&
        hasKey(error, 'code') &&
        isValidCode(error.code)) {
        const _error = error;
        serialized.code = _error.code;
        if (_error.message && typeof _error.message === 'string') {
            serialized.message = _error.message;
            if (hasKey(_error, 'data')) {
                serialized.data = _error.data;
            }
        }
        else {
            serialized.message = getMessageFromCode(serialized.code);
            serialized.data = { originalError: assignOriginalError(error) };
        }
    }
    else {
        serialized.code = fallbackError.code;
        const message = (_a = error) === null || _a === void 0 ? void 0 : _a.message;
        serialized.message = (message && typeof message === 'string'
            ? message
            : fallbackError.message);
        serialized.data = { originalError: assignOriginalError(error) };
    }
    const stack = (_b = error) === null || _b === void 0 ? void 0 : _b.stack;
    if (shouldIncludeStack && error && stack && typeof stack === 'string') {
        serialized.stack = stack;
    }
    return serialized;
}
exports.serializeError = serializeError;
// Internal
function isJsonRpcServerError(code) {
    return code >= -32099 && code <= -32000;
}
function assignOriginalError(error) {
    if (error && typeof error === 'object' && !Array.isArray(error)) {
        return Object.assign({}, error);
    }
    return error;
}
function hasKey(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdURBQTREO0FBQzVELHVDQUF5RTtBQUV6RSxNQUFNLG1CQUFtQixHQUFHLDRCQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztBQUNwRCxNQUFNLGdCQUFnQixHQUFHLDZEQUE2RCxDQUFDO0FBQ3ZGLE1BQU0sY0FBYyxHQUErQjtJQUNqRCxJQUFJLEVBQUUsbUJBQW1CO0lBQ3pCLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQztDQUNqRCxDQUFDO0FBRVcsUUFBQSw2QkFBNkIsR0FBRywyQkFBMkIsQ0FBQztBQUl6RTs7O0dBR0c7QUFDSCxTQUFnQixrQkFBa0IsQ0FDaEMsSUFBWSxFQUNaLGtCQUEwQixnQkFBZ0I7SUFFMUMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzFCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVuQyxJQUFJLE1BQU0sQ0FBQyw2QkFBVyxFQUFFLFVBQVUsQ0FBQyxFQUFFO1lBQ25DLE9BQU8sNkJBQVcsQ0FBQyxVQUEyQixDQUFDLENBQUMsT0FBTyxDQUFDO1NBQ3pEO1FBQ0QsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM5QixPQUFPLHFDQUE2QixDQUFDO1NBQ3RDO0tBQ0Y7SUFDRCxPQUFPLGVBQWUsQ0FBQztBQUN6QixDQUFDO0FBZkQsZ0RBZUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFnQixXQUFXLENBQUMsSUFBWTtJQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUMzQixPQUFPLEtBQUssQ0FBQztLQUNkO0lBRUQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ25DLElBQUksNkJBQVcsQ0FBQyxVQUEyQixDQUFDLEVBQUU7UUFDNUMsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVELElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDOUIsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQWRELGtDQWNDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFnQixjQUFjLENBQzVCLEtBQWMsRUFDZCxFQUNFLGFBQWEsR0FBRyxjQUFjLEVBQzlCLGtCQUFrQixHQUFHLEtBQUssR0FDM0IsR0FBRyxFQUFFOztJQUdOLElBQ0UsQ0FBQyxhQUFhO1FBQ2QsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFDckMsT0FBTyxhQUFhLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFDekM7UUFDQSxNQUFNLElBQUksS0FBSyxDQUNiLDBFQUEwRSxDQUMzRSxDQUFDO0tBQ0g7SUFFRCxJQUFJLEtBQUssWUFBWSwwQkFBZ0IsRUFBRTtRQUNyQyxPQUFPLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztLQUMxQjtJQUVELE1BQU0sVUFBVSxHQUF3QyxFQUFFLENBQUM7SUFFM0QsSUFDRSxLQUFLO1FBQ0wsT0FBTyxLQUFLLEtBQUssUUFBUTtRQUN6QixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxLQUFnQyxFQUFFLE1BQU0sQ0FBQztRQUNoRCxXQUFXLENBQUUsS0FBb0MsQ0FBQyxJQUFJLENBQUMsRUFDdkQ7UUFDQSxNQUFNLE1BQU0sR0FBRyxLQUE0QyxDQUFDO1FBQzVELFVBQVUsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUU5QixJQUFJLE1BQU0sQ0FBQyxPQUFPLElBQUksT0FBTyxNQUFNLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUN4RCxVQUFVLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFFcEMsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFO2dCQUMxQixVQUFVLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDL0I7U0FDRjthQUFNO1lBQ0wsVUFBVSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FDcEMsVUFBeUMsQ0FBQyxJQUFJLENBQ2hELENBQUM7WUFFRixVQUFVLENBQUMsSUFBSSxHQUFHLEVBQUUsYUFBYSxFQUFFLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7U0FDakU7S0FDRjtTQUFNO1FBQ0wsVUFBVSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBRXJDLE1BQU0sT0FBTyxTQUFJLEtBQWEsMENBQUUsT0FBTyxDQUFDO1FBRXhDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsQ0FDbkIsT0FBTyxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVE7WUFDcEMsQ0FBQyxDQUFDLE9BQU87WUFDVCxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FDMUIsQ0FBQztRQUNGLFVBQVUsQ0FBQyxJQUFJLEdBQUcsRUFBRSxhQUFhLEVBQUUsbUJBQW1CLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztLQUNqRTtJQUVELE1BQU0sS0FBSyxTQUFJLEtBQWEsMENBQUUsS0FBSyxDQUFDO0lBRXBDLElBQUksa0JBQWtCLElBQUksS0FBSyxJQUFJLEtBQUssSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDckUsVUFBVSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7S0FDMUI7SUFDRCxPQUFPLFVBQXdDLENBQUM7QUFDbEQsQ0FBQztBQWxFRCx3Q0FrRUM7QUFFRCxXQUFXO0FBRVgsU0FBUyxvQkFBb0IsQ0FBQyxJQUFZO0lBQ3hDLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQztBQUMxQyxDQUFDO0FBRUQsU0FBUyxtQkFBbUIsQ0FBQyxLQUFjO0lBQ3pDLElBQUksS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDL0QsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNqQztJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVELFNBQVMsTUFBTSxDQUFDLEdBQTRCLEVBQUUsR0FBVztJQUN2RCxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDeEQsQ0FBQyJ9

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./node_modules/fast-safe-stringify/index.js":
/*!***************************************************!*\
  !*** ./node_modules/fast-safe-stringify/index.js ***!
  \***************************************************/
/***/ ((module) => {

module.exports = stringify
stringify.default = stringify
stringify.stable = deterministicStringify
stringify.stableStringify = deterministicStringify

var LIMIT_REPLACE_NODE = '[...]'
var CIRCULAR_REPLACE_NODE = '[Circular]'

var arr = []
var replacerStack = []

function defaultOptions () {
  return {
    depthLimit: Number.MAX_SAFE_INTEGER,
    edgesLimit: Number.MAX_SAFE_INTEGER
  }
}

// Regular stringify
function stringify (obj, replacer, spacer, options) {
  if (typeof options === 'undefined') {
    options = defaultOptions()
  }

  decirc(obj, '', 0, [], undefined, 0, options)
  var res
  try {
    if (replacerStack.length === 0) {
      res = JSON.stringify(obj, replacer, spacer)
    } else {
      res = JSON.stringify(obj, replaceGetterValues(replacer), spacer)
    }
  } catch (_) {
    return JSON.stringify('[unable to serialize, circular reference is too complex to analyze]')
  } finally {
    while (arr.length !== 0) {
      var part = arr.pop()
      if (part.length === 4) {
        Object.defineProperty(part[0], part[1], part[3])
      } else {
        part[0][part[1]] = part[2]
      }
    }
  }
  return res
}

function setReplace (replace, val, k, parent) {
  var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k)
  if (propertyDescriptor.get !== undefined) {
    if (propertyDescriptor.configurable) {
      Object.defineProperty(parent, k, { value: replace })
      arr.push([parent, k, val, propertyDescriptor])
    } else {
      replacerStack.push([val, k, replace])
    }
  } else {
    parent[k] = replace
    arr.push([parent, k, val])
  }
}

function decirc (val, k, edgeIndex, stack, parent, depth, options) {
  depth += 1
  var i
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        setReplace(CIRCULAR_REPLACE_NODE, val, k, parent)
        return
      }
    }

    if (
      typeof options.depthLimit !== 'undefined' &&
      depth > options.depthLimit
    ) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent)
      return
    }

    if (
      typeof options.edgesLimit !== 'undefined' &&
      edgeIndex + 1 > options.edgesLimit
    ) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent)
      return
    }

    stack.push(val)
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        decirc(val[i], i, i, stack, val, depth, options)
      }
    } else {
      var keys = Object.keys(val)
      for (i = 0; i < keys.length; i++) {
        var key = keys[i]
        decirc(val[key], key, i, stack, val, depth, options)
      }
    }
    stack.pop()
  }
}

// Stable-stringify
function compareFunction (a, b) {
  if (a < b) {
    return -1
  }
  if (a > b) {
    return 1
  }
  return 0
}

function deterministicStringify (obj, replacer, spacer, options) {
  if (typeof options === 'undefined') {
    options = defaultOptions()
  }

  var tmp = deterministicDecirc(obj, '', 0, [], undefined, 0, options) || obj
  var res
  try {
    if (replacerStack.length === 0) {
      res = JSON.stringify(tmp, replacer, spacer)
    } else {
      res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer)
    }
  } catch (_) {
    return JSON.stringify('[unable to serialize, circular reference is too complex to analyze]')
  } finally {
    // Ensure that we restore the object as it was.
    while (arr.length !== 0) {
      var part = arr.pop()
      if (part.length === 4) {
        Object.defineProperty(part[0], part[1], part[3])
      } else {
        part[0][part[1]] = part[2]
      }
    }
  }
  return res
}

function deterministicDecirc (val, k, edgeIndex, stack, parent, depth, options) {
  depth += 1
  var i
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        setReplace(CIRCULAR_REPLACE_NODE, val, k, parent)
        return
      }
    }
    try {
      if (typeof val.toJSON === 'function') {
        return
      }
    } catch (_) {
      return
    }

    if (
      typeof options.depthLimit !== 'undefined' &&
      depth > options.depthLimit
    ) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent)
      return
    }

    if (
      typeof options.edgesLimit !== 'undefined' &&
      edgeIndex + 1 > options.edgesLimit
    ) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent)
      return
    }

    stack.push(val)
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        deterministicDecirc(val[i], i, i, stack, val, depth, options)
      }
    } else {
      // Create a temporary object in the required way
      var tmp = {}
      var keys = Object.keys(val).sort(compareFunction)
      for (i = 0; i < keys.length; i++) {
        var key = keys[i]
        deterministicDecirc(val[key], key, i, stack, val, depth, options)
        tmp[key] = val[key]
      }
      if (typeof parent !== 'undefined') {
        arr.push([parent, k, val])
        parent[k] = tmp
      } else {
        return tmp
      }
    }
    stack.pop()
  }
}

// wraps replacer function to handle values we couldn't replace
// and mark them as replaced value
function replaceGetterValues (replacer) {
  replacer =
    typeof replacer !== 'undefined'
      ? replacer
      : function (k, v) {
        return v
      }
  return function (key, val) {
    if (replacerStack.length > 0) {
      for (var i = 0; i < replacerStack.length; i++) {
        var part = replacerStack[i]
        if (part[1] === key && part[0] === val) {
          val = part[2]
          replacerStack.splice(i, 1)
          break
        }
      }
    }
    return replacer.call(this, key, val)
  }
}


/***/ }),

/***/ "./node_modules/loglevel/lib/loglevel.js":
/*!***********************************************!*\
  !*** ./node_modules/loglevel/lib/loglevel.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
(function (root, definition) {
    "use strict";
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function () {
    "use strict";

    // Slightly dubious tricks to cut down minimized file size
    var noop = function() {};
    var undefinedType = "undefined";
    var isIE = (typeof window !== undefinedType) && (typeof window.navigator !== undefinedType) && (
        /Trident\/|MSIE /.test(window.navigator.userAgent)
    );

    var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
    ];

    // Cross-browser bind equivalent that works at least back to IE6
    function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === 'function') {
            return method.bind(obj);
        } else {
            try {
                return Function.prototype.bind.call(method, obj);
            } catch (e) {
                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
                return function() {
                    return Function.prototype.apply.apply(method, [obj, arguments]);
                };
            }
        }
    }

    // Trace() doesn't print the message in IE, so for that case we need to wrap it
    function traceForIE() {
        if (console.log) {
            if (console.log.apply) {
                console.log.apply(console, arguments);
            } else {
                // In old IE, native console methods themselves don't have apply().
                Function.prototype.apply.apply(console.log, [console, arguments]);
            }
        }
        if (console.trace) console.trace();
    }

    // Build the best logging method possible for this env
    // Wherever possible we want to bind, not wrap, to preserve stack traces
    function realMethod(methodName) {
        if (methodName === 'debug') {
            methodName = 'log';
        }

        if (typeof console === undefinedType) {
            return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
        } else if (methodName === 'trace' && isIE) {
            return traceForIE;
        } else if (console[methodName] !== undefined) {
            return bindMethod(console, methodName);
        } else if (console.log !== undefined) {
            return bindMethod(console, 'log');
        } else {
            return noop;
        }
    }

    // These private functions always need `this` to be set properly

    function replaceLoggingMethods(level, loggerName) {
        /*jshint validthis:true */
        for (var i = 0; i < logMethods.length; i++) {
            var methodName = logMethods[i];
            this[methodName] = (i < level) ?
                noop :
                this.methodFactory(methodName, level, loggerName);
        }

        // Define log.log as an alias for log.debug
        this.log = this.debug;
    }

    // In old IE versions, the console isn't present until you first open it.
    // We build realMethod() replacements here that regenerate logging methods
    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
        return function () {
            if (typeof console !== undefinedType) {
                replaceLoggingMethods.call(this, level, loggerName);
                this[methodName].apply(this, arguments);
            }
        };
    }

    // By default, we use closely bound real methods wherever possible, and
    // otherwise we wait for a console to appear, and then try again.
    function defaultMethodFactory(methodName, level, loggerName) {
        /*jshint validthis:true */
        return realMethod(methodName) ||
               enableLoggingWhenConsoleArrives.apply(this, arguments);
    }

    function Logger(name, defaultLevel, factory) {
      var self = this;
      var currentLevel;
      defaultLevel = defaultLevel == null ? "WARN" : defaultLevel;

      var storageKey = "loglevel";
      if (typeof name === "string") {
        storageKey += ":" + name;
      } else if (typeof name === "symbol") {
        storageKey = undefined;
      }

      function persistLevelIfPossible(levelNum) {
          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

          if (typeof window === undefinedType || !storageKey) return;

          // Use localStorage if available
          try {
              window.localStorage[storageKey] = levelName;
              return;
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=" + levelName + ";";
          } catch (ignore) {}
      }

      function getPersistedLevel() {
          var storedLevel;

          if (typeof window === undefinedType || !storageKey) return;

          try {
              storedLevel = window.localStorage[storageKey];
          } catch (ignore) {}

          // Fallback to cookies if local storage gives us nothing
          if (typeof storedLevel === undefinedType) {
              try {
                  var cookie = window.document.cookie;
                  var location = cookie.indexOf(
                      encodeURIComponent(storageKey) + "=");
                  if (location !== -1) {
                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
                  }
              } catch (ignore) {}
          }

          // If the stored level is not valid, treat it as if nothing was stored.
          if (self.levels[storedLevel] === undefined) {
              storedLevel = undefined;
          }

          return storedLevel;
      }

      function clearPersistedLevel() {
          if (typeof window === undefinedType || !storageKey) return;

          // Use localStorage if available
          try {
              window.localStorage.removeItem(storageKey);
              return;
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
          } catch (ignore) {}
      }

      /*
       *
       * Public logger API - see https://github.com/pimterry/loglevel for details
       *
       */

      self.name = name;

      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
          "ERROR": 4, "SILENT": 5};

      self.methodFactory = factory || defaultMethodFactory;

      self.getLevel = function () {
          return currentLevel;
      };

      self.setLevel = function (level, persist) {
          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
              level = self.levels[level.toUpperCase()];
          }
          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
              currentLevel = level;
              if (persist !== false) {  // defaults to true
                  persistLevelIfPossible(level);
              }
              replaceLoggingMethods.call(self, level, name);
              if (typeof console === undefinedType && level < self.levels.SILENT) {
                  return "No console available for logging";
              }
          } else {
              throw "log.setLevel() called with invalid level: " + level;
          }
      };

      self.setDefaultLevel = function (level) {
          defaultLevel = level;
          if (!getPersistedLevel()) {
              self.setLevel(level, false);
          }
      };

      self.resetLevel = function () {
          self.setLevel(defaultLevel, false);
          clearPersistedLevel();
      };

      self.enableAll = function(persist) {
          self.setLevel(self.levels.TRACE, persist);
      };

      self.disableAll = function(persist) {
          self.setLevel(self.levels.SILENT, persist);
      };

      // Initialize with the right level
      var initialLevel = getPersistedLevel();
      if (initialLevel == null) {
          initialLevel = defaultLevel;
      }
      self.setLevel(initialLevel, false);
    }

    /*
     *
     * Top-level API
     *
     */

    var defaultLogger = new Logger();

    var _loggersByName = {};
    defaultLogger.getLogger = function getLogger(name) {
        if ((typeof name !== "symbol" && typeof name !== "string") || name === "") {
          throw new TypeError("You must supply a name when creating a logger.");
        }

        var logger = _loggersByName[name];
        if (!logger) {
          logger = _loggersByName[name] = new Logger(
            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
        }
        return logger;
    };

    // Grab the current global log variable in case of overwrite
    var _log = (typeof window !== undefinedType) ? window.log : undefined;
    defaultLogger.noConflict = function() {
        if (typeof window !== undefinedType &&
               window.log === defaultLogger) {
            window.log = _log;
        }

        return defaultLogger;
    };

    defaultLogger.getLoggers = function getLoggers() {
        return _loggersByName;
    };

    // ES6 default export, for compatibility
    defaultLogger['default'] = defaultLogger;

    return defaultLogger;
}));


/***/ }),

/***/ "../background/src/utils/types/communication.ts":
/*!******************************************************!*\
  !*** ../background/src/utils/types/communication.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BackgroundActions = exports.Origin = exports.Messages = exports.CONTENT = exports.EXTERNAL = void 0;
var ACCOUNT;
(function (ACCOUNT) {
    ACCOUNT["CREATE"] = "CREATE_ACCOUNT";
    ACCOUNT["EXPORT_JSON"] = "EXPORT_ACCOUNT_JSON";
    ACCOUNT["EXPORT_PRIVATE_KEY"] = "EXPORT_ACCOUNT_PK";
    ACCOUNT["IMPORT_JSON"] = "IMPORT_ACCOUNT_JSON";
    ACCOUNT["IMPORT_PRIVATE_KEY"] = "IMPORT_ACCOUNT_PK";
    ACCOUNT["REMOVE"] = "REMOVE_ACCOUNT";
    ACCOUNT["RESET"] = "RESET_ACCOUNT";
    ACCOUNT["RENAME"] = "RENAME_ACCOUNT";
    ACCOUNT["SELECT"] = "SELECT_ACCOUNT";
    ACCOUNT["GET_BALANCE"] = "GET_ACCOUNT_BALANCE";
    ACCOUNT["HIDE"] = "HIDE_ACCOUNT";
    ACCOUNT["UNHIDE"] = "UNHIDE_ACCOUNT";
    ACCOUNT["GET_NATIVE_TOKEN_BALANCE"] = "GET_NATIVE_TOKEN_BALANCE";
})(ACCOUNT || (ACCOUNT = {}));
var APP;
(function (APP) {
    APP["LOCK"] = "LOCK_APP";
    APP["UNLOCK"] = "UNLOCK_APP";
    APP["GET_IDLE_TIMEOUT"] = "GET_IDLE_TIMEOUT";
    APP["SET_IDLE_TIMEOUT"] = "SET_IDLE_TIMEOUT";
    APP["SET_LAST_USER_ACTIVE_TIME"] = "SET_LAST_USER_ACTIVE_TIME";
    APP["RETURN_TO_ONBOARDING"] = "RETURN_TO_ONBOARDING";
    APP["OPEN_RESET"] = "OPEN_RESET";
    APP["OPEN_HW_CONNECT"] = "OPEN_HW_CONNECT";
    APP["OPEN_HW_REMOVE"] = "OPEN_HW_REMOVE";
    APP["OPEN_HW_RECONNECT"] = "OPEN_HW_RECONNECT";
    APP["SET_USER_SETTINGS"] = "SET_USER_SETTINGS";
    APP["UPDATE_POPUP_TAB"] = "UPDATE_POPUP_TAB";
    APP["REJECT_UNCONFIRMED_REQUESTS"] = "REJECT_UNCONFIRMED_REQUESTS";
    APP["SET_USER_ONLINE"] = "SET_USER_ONLINE";
})(APP || (APP = {}));
var BACKGROUND;
(function (BACKGROUND) {
    BACKGROUND["ACTION"] = "ACTION";
})(BACKGROUND || (BACKGROUND = {}));
var DAPP;
(function (DAPP) {
    DAPP["CONFIRM_REQUEST"] = "CONFIRM_DAPP_REQUEST";
    DAPP["ATTEMPT_REJECT_REQUEST"] = "ATTEMPT_REJECT_DAPP_REQUEST";
})(DAPP || (DAPP = {}));
var EXCHANGE;
(function (EXCHANGE) {
    EXCHANGE["CHECK_ALLOWANCE"] = "CHECK_ALLOWANCE";
    EXCHANGE["APPROVE"] = "APPROVE_EXCHANGE";
    EXCHANGE["GET_QUOTE"] = "GET_EXCHANGE_QUOTE";
    EXCHANGE["GET_EXCHANGE"] = "GET_EXCHANGE";
    EXCHANGE["EXECUTE"] = "EXECUTE_EXCHANGE";
})(EXCHANGE || (EXCHANGE = {}));
var BRIDGE;
(function (BRIDGE) {
    BRIDGE["APPROVE_BRIDGE_ALLOWANCE"] = "APPROVE_BRIDGE_ALLOWANCE";
    BRIDGE["GET_BRIDGE_AVAILABLE_CHAINS"] = "GET_BRIDGE_AVAILABLE_CHAINS";
    BRIDGE["GET_BRIDGE_TOKENS"] = "GET_BRIDGE_TOKENS";
    BRIDGE["GET_BRIDGE_QUOTE"] = "GET_BRIDGE_QUOTE";
    BRIDGE["GET_BRIDGE_ROUTES"] = "GET_BRIDGE_ROUTES";
    BRIDGE["EXECUTE_BRIDGE"] = "EXECUTE_BRIDGE";
})(BRIDGE || (BRIDGE = {}));
var EXTERNAL;
(function (EXTERNAL) {
    EXTERNAL["EVENT_SUBSCRIPTION"] = "EVENT_SUBSCRIPTION";
    EXTERNAL["REQUEST"] = "EXTERNAL_REQUEST";
    EXTERNAL["SETUP_PROVIDER"] = "SETUP_PROVIDER";
    EXTERNAL["SW_REINIT"] = "SW_REINIT";
    EXTERNAL["SET_ICON"] = "SET_ICON";
    EXTERNAL["GET_PROVIDER_CONFIG"] = "GET_PROVIDER_CONFIG";
})(EXTERNAL = exports.EXTERNAL || (exports.EXTERNAL = {}));
var CONTENT;
(function (CONTENT) {
    CONTENT["SHOULD_INJECT"] = "SHOULD_INJECT";
    CONTENT["SW_KEEP_ALIVE"] = "SW_KEEP_ALIVE";
})(CONTENT = exports.CONTENT || (exports.CONTENT = {}));
var NETWORK;
(function (NETWORK) {
    NETWORK["CHANGE"] = "NETWORK_CHANGE";
    NETWORK["SET_SHOW_TEST_NETWORKS"] = "SHOW_TEST_NETWORKS";
    NETWORK["ADD_NETWORK"] = "ADD_NETWORK";
    NETWORK["EDIT_NETWORK"] = "EDIT_NETWORK";
    NETWORK["EDIT_NETWORKS_ORDER"] = "EDIT_NETWORKS_ORDER";
    NETWORK["REMOVE_NETWORK"] = "REMOVE_NETWORK";
    NETWORK["GET_SPECIFIC_CHAIN_DETAILS"] = "GET_SPECIFIC_CHAIN_DETAILS";
    NETWORK["GET_RPC_CHAIN_ID"] = "GET_RPC_CHAIN_ID";
    NETWORK["SEARCH_CHAINS"] = "SEARCH_CHAINS";
})(NETWORK || (NETWORK = {}));
var PASSWORD;
(function (PASSWORD) {
    PASSWORD["VERIFY"] = "VERIFY_PASSWORD";
    PASSWORD["CHANGE"] = "CHANGE_PASSWORD";
})(PASSWORD || (PASSWORD = {}));
var PERMISSION;
(function (PERMISSION) {
    PERMISSION["ADD_NEW"] = "ADD_NEW_SITE_PERMISSIONS";
    PERMISSION["CONFIRM"] = "CONFIRM_PERMISSION_REQUEST";
    PERMISSION["GET_ACCOUNT_PERMISSIONS"] = "GET_ACCOUNT_PERMISSIONS";
    PERMISSION["REMOVE_ACCOUNT_FROM_SITE"] = "REMOVE_ACCOUNT_FROM_SITE";
    PERMISSION["UPDATE_SITE_PERMISSIONS"] = "UPDATE_SITE_PERMISSIONS";
})(PERMISSION || (PERMISSION = {}));
var STATE;
(function (STATE) {
    STATE["GET"] = "GET_STATE";
    STATE["SUBSCRIBE"] = "STATE_SUBSCRIBE";
    STATE["GET_REMOTE_CONFIG"] = "GET_REMOTE_CONFIG";
})(STATE || (STATE = {}));
var ENS;
(function (ENS) {
    ENS["LOOKUP_ADDRESS"] = "LOOKUP_ADDRESS_ENS";
    ENS["RESOLVE_NAME"] = "RESOLVE_ENS_NAME";
})(ENS || (ENS = {}));
var UD;
(function (UD) {
    UD["RESOLVE_NAME"] = "RESOLVE_UD_NAME";
})(UD || (UD = {}));
var TRANSACTION;
(function (TRANSACTION) {
    TRANSACTION["ADD_NEW_SEND_TRANSACTION"] = "ADD_NEW_SEND_TRANSACTION";
    TRANSACTION["UPDATE_SEND_TRANSACTION_GAS"] = "UPDATE_SEND_TRANSACTION_GAS";
    TRANSACTION["APPROVE_SEND_TRANSACTION"] = "APPROVE_SEND_TRANSACTION";
    TRANSACTION["GET_SEND_TRANSACTION_RESULT"] = "GET_SEND_TRANSACTION_RESULT";
    TRANSACTION["CALCULATE_SEND_TRANSACTION_GAS_LIMIT"] = "CALCULATE_SEND_TRANSACTION_GAS_LIMIT";
    TRANSACTION["CALCULATE_APPROVE_TRANSACTION_GAS_LIMIT"] = "CALCULATE_APPROVE_TRANSACTION_GAS_LIMIT";
    TRANSACTION["CONFIRM"] = "CONFIRM_TRANSACTION";
    TRANSACTION["REJECT"] = "REJECT_TRANSACTION";
    TRANSACTION["GET_LATEST_GAS_PRICE"] = "GET_LATEST_GAS_PRICE";
    TRANSACTION["FETCH_LATEST_GAS_PRICE"] = "FETCH_LATEST_GAS_PRICE";
    TRANSACTION["SEND_ETHER"] = "SEND_ETHER";
    TRANSACTION["CANCEL_TRANSACTION"] = "CANCEL_TRANSACTION";
    TRANSACTION["SPEED_UP_TRANSACTION"] = "SPEED_UP_TRANSACTION";
    TRANSACTION["GET_SPEED_UP_GAS_PRICE"] = "GET_SPEED_UP_GAS_PRICE";
    TRANSACTION["GET_CANCEL_GAS_PRICE"] = "GET_CANCEL_GAS_PRICE";
    TRANSACTION["GET_NEXT_NONCE"] = "GET_NEXT_NONCE";
    TRANSACTION["REJECT_REPLACEMENT_TRANSACTION"] = "REJECT_REPLACEMENT_TRANSACTION";
})(TRANSACTION || (TRANSACTION = {}));
var WALLET;
(function (WALLET) {
    WALLET["CREATE"] = "CREATE_WALLET";
    WALLET["IMPORT"] = "IMPORT_WALLET";
    WALLET["VERIFY_SEED_PHRASE"] = "VERIFY_SEED_PHRASE";
    WALLET["REQUEST_SEED_PHRASE"] = "REQUEST_SEED_PHRASE";
    WALLET["SETUP_COMPLETE"] = "SETUP_COMPLETE";
    WALLET["RESET"] = "RESET";
    WALLET["DISMISS_WELCOME_MESSAGE"] = "DISMISS_WELCOME_MESSAGE";
    WALLET["DISMISS_DEFAULT_WALLET_PREFERENCES"] = "DISMISS_DEFAULT_WALLET_PREFERENCES";
    WALLET["DISMISS_RELEASE_NOTES"] = "DISMISS_RELEASE_NOTES";
    WALLET["TOGGLE_RELEASE_NOTES_SUBSCRIPTION"] = "TOGGLE_RELEASE_NOTES_SUBSCRIPTION";
    WALLET["GENERATE_ON_DEMAND_RELEASE_NOTES"] = "GENERATE_ON_DEMAND_RELEASE_NOTES";
    WALLET["UPDATE_ANTI_PHISHING_IMAGE"] = "UPDATE_ANTI_PHISHING_IMAGE";
    WALLET["TOGGLE_ANTI_PHISHING_PROTECTION"] = "TOGGLE_ANTI_PHISHING_PROTECTION";
    WALLET["TOGGLE_DEFAULT_BROWSER_WALLET"] = "TOGGLE_DEFAULT_BROWSER_WALLET";
    WALLET["SET_NATIVE_CURRENCY"] = "SET_NATIVE_CURRENCY";
    WALLET["GET_VALID_CURRENCIES"] = "GET_VALID_CURRENCIES";
    WALLET["HARDWARE_CONNECT"] = "HARDWARE_CONNECT";
    WALLET["HARDWARE_REMOVE"] = "HARDWARE_REMOVE";
    WALLET["HARDWARE_GET_ACCOUNTS"] = "HARDWARE_GET_ACCOUNTS";
    WALLET["HARDWARE_IMPORT_ACCOUNTS"] = "HARDWARE_IMPORT_ACCOUNTS";
    WALLET["HARDWARE_GET_HD_PATH"] = "HARDWARE_GET_HD_PATH";
    WALLET["HARDWARE_SET_HD_PATH"] = "HARDWARE_SET_HD_PATH";
    WALLET["HARDWARE_IS_LINKED"] = "HARDWARE_IS_LINKED";
    WALLET["SET_DEFAULT_GAS"] = "SET_DEFAULT_GAS";
})(WALLET || (WALLET = {}));
var TOKEN;
(function (TOKEN) {
    TOKEN["GET_BALANCE"] = "GET_TOKEN_BALANCE";
    TOKEN["GET_TOKENS"] = "GET_TOKENS";
    TOKEN["GET_USER_TOKENS"] = "GET_USER_TOKENS";
    TOKEN["GET_TOKEN"] = "GET_TOKEN";
    TOKEN["ADD_CUSTOM_TOKEN"] = "ADD_CUSTOM_TOKEN";
    TOKEN["DELETE_CUSTOM_TOKEN"] = "DELETE_CUSTOM_TOKEN";
    TOKEN["ADD_CUSTOM_TOKENS"] = "ADD_CUSTOM_TOKENS";
    TOKEN["SEND_TOKEN"] = "SEND_TOKEN";
    TOKEN["POPULATE_TOKEN_DATA"] = "POPULATE_TOKEN_DATA";
    TOKEN["SEARCH_TOKEN"] = "SEARCH_TOKEN";
})(TOKEN || (TOKEN = {}));
var ADDRESS_BOOK;
(function (ADDRESS_BOOK) {
    ADDRESS_BOOK["CLEAR"] = "CLEAR";
    ADDRESS_BOOK["DELETE"] = "DELETE";
    ADDRESS_BOOK["SET"] = "SET";
    ADDRESS_BOOK["GET"] = "GET";
    ADDRESS_BOOK["GET_BY_ADDRESS"] = "GET_BY_ADDRESS";
    ADDRESS_BOOK["GET_RECENT_ADDRESSES"] = "GET_RECENT_ADDRESSES";
})(ADDRESS_BOOK || (ADDRESS_BOOK = {}));
var BROWSER;
(function (BROWSER) {
    BROWSER["GET_WINDOW_ID"] = "GET_WINDOW_ID";
})(BROWSER || (BROWSER = {}));
var FILTERS;
(function (FILTERS) {
    FILTERS["SET_ACCOUNT_FILTERS"] = "SET_ACCOUNT_FILTERS";
})(FILTERS || (FILTERS = {}));
exports.Messages = {
    ACCOUNT,
    APP,
    BACKGROUND,
    CONTENT,
    DAPP,
    EXCHANGE,
    EXTERNAL,
    NETWORK,
    PASSWORD,
    PERMISSION,
    STATE,
    ENS,
    UD,
    TRANSACTION,
    WALLET,
    TOKEN,
    ADDRESS_BOOK,
    BROWSER,
    FILTERS,
    BRIDGE,
};
var Origin;
(function (Origin) {
    Origin["BACKGROUND"] = "BLANK_BACKGROUND";
    Origin["EXTENSION"] = "BLANK_EXTENSION";
    Origin["PROVIDER"] = "BLANK_PROVIDER";
    Origin["TREZOR_CONNECT"] = "trezor-connect";
})(Origin = exports.Origin || (exports.Origin = {}));
var BackgroundActions;
(function (BackgroundActions) {
    BackgroundActions["CLOSE_WINDOW"] = "CLOSE_WINDOW";
})(BackgroundActions = exports.BackgroundActions || (exports.BackgroundActions = {}));


/***/ }),

/***/ "../background/src/utils/types/ethereum.ts":
/*!*************************************************!*\
  !*** ../background/src/utils/types/ethereum.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtProviderMethods = exports.JSONRPCMethod = exports.typedMessageSchema = exports.sigVersion = exports.SubscriptionType = exports.DappRequestSigningStatus = exports.DappReq = exports.WindowRequest = exports.ProviderError = void 0;
var ProviderError;
(function (ProviderError) {
    ProviderError["INVALID_PARAMS"] = "INVALID_PARAMS";
    ProviderError["RESOURCE_UNAVAILABLE"] = "RESOURCE_UNAVAILABLE";
    ProviderError["TRANSACTION_REJECTED"] = "TRANSACTION_REJECTED";
    ProviderError["UNAUTHORIZED"] = "UNAUTHORIZED";
    ProviderError["UNSUPPORTED_METHOD"] = "UNSUPPORTED_METHOD";
    ProviderError["UNSUPPORTED_SUBSCRIPTION_TYPE"] = "UNSUPPORTED_SUBSCRIPTION_TYPE";
    ProviderError["USER_REJECTED_REQUEST"] = "USER_REJECTED_REQUEST";
})(ProviderError = exports.ProviderError || (exports.ProviderError = {}));
// Types for window management
var WindowRequest;
(function (WindowRequest) {
    WindowRequest["DAPP"] = "DAPP";
    WindowRequest["LOCK"] = "LOCK";
    WindowRequest["PERMISSIONS"] = "PERMISSIONS";
    WindowRequest["TRANSACTIONS"] = "TRANSACTIONS";
})(WindowRequest = exports.WindowRequest || (exports.WindowRequest = {}));
// Type of dapp request
var DappReq;
(function (DappReq) {
    DappReq["ASSET"] = "ASSET";
    DappReq["SIGNING"] = "SIGNING";
    DappReq["SWITCH_NETWORK"] = "SWITCH_NETWORK";
    DappReq["ADD_ETHEREUM_CHAIN"] = "ADD_ETHEREUM_CHAIN";
})(DappReq = exports.DappReq || (exports.DappReq = {}));
// Dapp request optional status type
var DappRequestSigningStatus;
(function (DappRequestSigningStatus) {
    DappRequestSigningStatus["PENDING"] = "DAPP_PENDING";
    DappRequestSigningStatus["APPROVED"] = "DAPP_APPROVED";
    DappRequestSigningStatus["REJECTED"] = "DAPP_REJECTED";
    DappRequestSigningStatus["FAILED"] = "DAPP_FAILED";
    DappRequestSigningStatus["SIGNED"] = "DAPP_SIGNED";
})(DappRequestSigningStatus = exports.DappRequestSigningStatus || (exports.DappRequestSigningStatus = {}));
// https://geth.ethereum.org/docs/rpc/pubsub
var SubscriptionType;
(function (SubscriptionType) {
    SubscriptionType["logs"] = "logs";
    SubscriptionType["newHeads"] = "newHeads";
    /**
     * @unsupported
     */
    SubscriptionType["newPendingTransactions"] = "newPendingTransactions";
    /**
     * @unsupported
     */
    SubscriptionType["syncing"] = "syncing";
})(SubscriptionType = exports.SubscriptionType || (exports.SubscriptionType = {}));
// Adapt version to keyring sig util
exports.sigVersion = {
    eth_signTypedData: { version: 'V4' },
    eth_signTypedData_v1: { version: 'V1' },
    eth_signTypedData_v3: { version: 'V3' },
    eth_signTypedData_v4: { version: 'V4' },
};
exports.typedMessageSchema = {
    type: 'object',
    properties: {
        types: {
            type: 'object',
            additionalProperties: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        type: { type: 'string' },
                    },
                    required: ['name', 'type'],
                },
            },
        },
        primaryType: { type: 'string' },
        domain: { type: 'object' },
        message: { type: 'object' },
    },
    required: ['types', 'primaryType', 'domain', 'message'],
};
// JSON RPC methods
var JSONRPCMethod;
(function (JSONRPCMethod) {
    JSONRPCMethod["db_getHex"] = "db_getHex";
    JSONRPCMethod["db_getString"] = "db_getString";
    JSONRPCMethod["db_putHex"] = "db_putHex";
    JSONRPCMethod["db_putString"] = "db_putString";
    JSONRPCMethod["eth_accounts"] = "eth_accounts";
    JSONRPCMethod["eth_blockNumber"] = "eth_blockNumber";
    JSONRPCMethod["eth_call"] = "eth_call";
    JSONRPCMethod["eth_chainId"] = "eth_chainId";
    JSONRPCMethod["eth_coinbase"] = "eth_coinbase";
    JSONRPCMethod["eth_compileLLL"] = "eth_compileLLL";
    JSONRPCMethod["eth_compileSerpent"] = "eth_compileSerpent";
    JSONRPCMethod["eth_compileSolidity"] = "eth_compileSolidity";
    JSONRPCMethod["eth_estimateGas"] = "eth_estimateGas";
    JSONRPCMethod["eth_feeHistory"] = "eth_feeHistory";
    JSONRPCMethod["eth_gasPrice"] = "eth_gasPrice";
    JSONRPCMethod["eth_getBalance"] = "eth_getBalance";
    JSONRPCMethod["eth_getBlockByHash"] = "eth_getBlockByHash";
    JSONRPCMethod["eth_getBlockByNumber"] = "eth_getBlockByNumber";
    JSONRPCMethod["eth_getBlockTransactionCountByHash"] = "eth_getBlockTransactionCountByHash";
    JSONRPCMethod["eth_getBlockTransactionCountByNumber"] = "eth_getBlockTransactionCountByNumber";
    JSONRPCMethod["eth_getCode"] = "eth_getCode";
    JSONRPCMethod["eth_getCompilers"] = "eth_getCompilers";
    JSONRPCMethod["eth_getFilterChanges"] = "eth_getFilterChanges";
    JSONRPCMethod["eth_getFilterLogs"] = "eth_getFilterLogs";
    JSONRPCMethod["eth_getLogs"] = "eth_getLogs";
    JSONRPCMethod["eth_getStorageAt"] = "eth_getStorageAt";
    JSONRPCMethod["eth_getTransactionByBlockHashAndIndex"] = "eth_getTransactionByBlockHashAndIndex";
    JSONRPCMethod["eth_getTransactionByBlockNumberAndIndex"] = "eth_getTransactionByBlockNumberAndIndex";
    JSONRPCMethod["eth_getTransactionByHash"] = "eth_getTransactionByHash";
    JSONRPCMethod["eth_getTransactionCount"] = "eth_getTransactionCount";
    JSONRPCMethod["eth_getTransactionReceipt"] = "eth_getTransactionReceipt";
    JSONRPCMethod["eth_getUncleByBlockHashAndIndex"] = "eth_getUncleByBlockHashAndIndex";
    JSONRPCMethod["eth_getUncleByBlockNumberAndIndex"] = "eth_getUncleByBlockNumberAndIndex";
    JSONRPCMethod["eth_getUncleCountByBlockHash"] = "eth_getUncleCountByBlockHash";
    JSONRPCMethod["eth_getUncleCountByBlockNumber"] = "eth_getUncleCountByBlockNumber";
    JSONRPCMethod["eth_getWork"] = "eth_getWork";
    JSONRPCMethod["eth_mining"] = "eth_mining";
    JSONRPCMethod["eth_newBlockFilter"] = "eth_newBlockFilter";
    JSONRPCMethod["eth_newFilter"] = "eth_newFilter";
    JSONRPCMethod["eth_protocolVersion"] = "eth_protocolVersion";
    JSONRPCMethod["eth_requestAccounts"] = "eth_requestAccounts";
    JSONRPCMethod["eth_sendRawTransaction"] = "eth_sendRawTransaction";
    JSONRPCMethod["eth_sendTransaction"] = "eth_sendTransaction";
    JSONRPCMethod["eth_sign"] = "eth_sign";
    JSONRPCMethod["eth_signTransaction"] = "eth_signTransaction";
    JSONRPCMethod["eth_signTypedData"] = "eth_signTypedData";
    JSONRPCMethod["eth_signTypedData_v1"] = "eth_signTypedData_v1";
    JSONRPCMethod["eth_signTypedData_v3"] = "eth_signTypedData_v3";
    JSONRPCMethod["eth_signTypedData_v4"] = "eth_signTypedData_v4";
    JSONRPCMethod["eth_submitWork"] = "eth_submitWork";
    JSONRPCMethod["eth_uninstallFilter"] = "eth_uninstallFilter";
    JSONRPCMethod["net_listening"] = "net_listening";
    JSONRPCMethod["net_peerCount"] = "net_peerCount";
    JSONRPCMethod["net_version"] = "net_version";
    JSONRPCMethod["personal_ecRecover"] = "personal_ecRecover";
    JSONRPCMethod["personal_sign"] = "personal_sign";
    JSONRPCMethod["shh_addToGroup"] = "shh_addToGroup";
    JSONRPCMethod["shh_getFilterChanges"] = "shh_getFilterChanges";
    JSONRPCMethod["shh_getMessages"] = "shh_getMessages";
    JSONRPCMethod["shh_hasIdentity"] = "shh_hasIdentity";
    JSONRPCMethod["shh_newFilter"] = "shh_newFilter";
    JSONRPCMethod["shh_newGroup"] = "shh_newGroup";
    JSONRPCMethod["shh_newIdentity"] = "shh_newIdentity";
    JSONRPCMethod["shh_post"] = "shh_post";
    JSONRPCMethod["shh_uninstallFilter"] = "shh_uninstallFilter";
    JSONRPCMethod["shh_version"] = "shh_version";
    JSONRPCMethod["wallet_addEthereumChain"] = "wallet_addEthereumChain";
    JSONRPCMethod["wallet_switchEthereumChain"] = "wallet_switchEthereumChain";
    JSONRPCMethod["wallet_getPermissions"] = "wallet_getPermissions";
    JSONRPCMethod["wallet_requestPermissions"] = "wallet_requestPermissions";
    JSONRPCMethod["wallet_watchAsset"] = "wallet_watchAsset";
    JSONRPCMethod["web3_clientVersion"] = "web3_clientVersion";
    JSONRPCMethod["web3_sha3"] = "web3_sha3";
    // pub/sub
    JSONRPCMethod["eth_subscribe"] = "eth_subscribe";
    JSONRPCMethod["eth_unsubscribe"] = "eth_unsubscribe";
})(JSONRPCMethod = exports.JSONRPCMethod || (exports.JSONRPCMethod = {}));
// External provider methods
exports.ExtProviderMethods = [
    JSONRPCMethod.eth_call,
    JSONRPCMethod.eth_estimateGas,
    JSONRPCMethod.eth_feeHistory,
    JSONRPCMethod.eth_gasPrice,
    JSONRPCMethod.eth_getBalance,
    JSONRPCMethod.eth_getBlockByHash,
    JSONRPCMethod.eth_getBlockByNumber,
    JSONRPCMethod.eth_getBlockTransactionCountByHash,
    JSONRPCMethod.eth_getBlockTransactionCountByNumber,
    JSONRPCMethod.eth_getCode,
    JSONRPCMethod.eth_getLogs,
    JSONRPCMethod.eth_getStorageAt,
    JSONRPCMethod.eth_getTransactionByBlockHashAndIndex,
    JSONRPCMethod.eth_getTransactionByBlockNumberAndIndex,
    JSONRPCMethod.eth_getTransactionByHash,
    JSONRPCMethod.eth_getTransactionCount,
    JSONRPCMethod.eth_getTransactionReceipt,
    JSONRPCMethod.eth_getUncleByBlockHashAndIndex,
    JSONRPCMethod.eth_getUncleByBlockNumberAndIndex,
    JSONRPCMethod.eth_getUncleCountByBlockHash,
    JSONRPCMethod.eth_getUncleCountByBlockNumber,
    JSONRPCMethod.eth_getWork,
    JSONRPCMethod.eth_mining,
    JSONRPCMethod.eth_protocolVersion,
    JSONRPCMethod.eth_sendRawTransaction,
    JSONRPCMethod.eth_submitWork,
    JSONRPCMethod.net_listening,
    JSONRPCMethod.net_peerCount,
    JSONRPCMethod.net_version,
    JSONRPCMethod.web3_clientVersion,
];


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const BlankProvider_1 = __importDefault(__webpack_require__(/*! ./provider/BlankProvider */ "./src/provider/BlankProvider.ts"));
const communication_1 = __webpack_require__(/*! @block-wallet/background/utils/types/communication */ "../background/src/utils/types/communication.ts");
const loglevel_1 = __importDefault(__webpack_require__(/*! loglevel */ "./node_modules/loglevel/lib/loglevel.js"));
const shimWeb3_1 = __importDefault(__webpack_require__(/*! ./utils/shimWeb3 */ "./src/utils/shimWeb3.ts"));
// Setting the default log level:
loglevel_1.default.setLevel("error" || 0);
const blankProvider = new BlankProvider_1.default();
const provider = new Proxy(blankProvider, {
    deleteProperty: () => true,
});
(0, shimWeb3_1.default)(provider);
window.ethereum = provider;
window.dispatchEvent(new CustomEvent('ethereum#initialized', { detail: 'isBlockWallet' }));
// Listens to events generated by the background script
window.addEventListener('message', ({ data, source, }) => {
    // Only allow messages from our window, by the loader
    if (source !== window ||
        data.origin !== communication_1.Origin.BACKGROUND ||
        !blankProvider) {
        return;
    }
    // Check if we're reinitializing the SW
    if ('signal' in data) {
        blankProvider.handleSignal(data.signal);
    }
    else if (data.id) {
        blankProvider.handleResponse(data);
    }
    else {
        loglevel_1.default.error('Missing response id.');
    }
});


/***/ }),

/***/ "./src/provider/BlankProvider.ts":
/*!***************************************!*\
  !*** ./src/provider/BlankProvider.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
/* eslint-disable @typescript-eslint/ban-ts-comment */
const types_1 = __webpack_require__(/*! ../types */ "./src/types.ts");
const communication_1 = __webpack_require__(/*! @block-wallet/background/utils/types/communication */ "../background/src/utils/types/communication.ts");
const safe_event_emitter_1 = __importDefault(__webpack_require__(/*! @metamask/safe-event-emitter */ "./node_modules/@metamask/safe-event-emitter/index.js"));
const eth_rpc_errors_1 = __webpack_require__(/*! eth-rpc-errors */ "./node_modules/eth-rpc-errors/dist/index.js");
const site_1 = __webpack_require__(/*! ../utils/site */ "./src/utils/site.ts");
const ethereum_1 = __webpack_require__(/*! @block-wallet/background/utils/types/ethereum */ "../background/src/utils/types/ethereum.ts");
const errors_1 = __webpack_require__(/*! ../utils/errors */ "./src/utils/errors.ts");
const loglevel_1 = __importDefault(__webpack_require__(/*! loglevel */ "./node_modules/loglevel/lib/loglevel.js"));
const compatibility_1 = __webpack_require__(/*! ../utils/compatibility */ "./src/utils/compatibility.ts");
const MAX_EVENT_LISTENERS = 100;
/**
 * Blank Provider
 *
 */
class BlankProvider extends safe_event_emitter_1.default {
    constructor() {
        super();
        this.isBlockWallet = true;
        this.isMetaMask = true;
        /**
         * Public method to check if the provider is connected
         *
         */
        this.isConnected = () => {
            return this._state.isConnected;
        };
        /**
         * Public request method
         *
         * @param args Request arguments
         * @returns Request response
         */
        this.request = async (args) => {
            if (!this._state.isConnected) {
                throw eth_rpc_errors_1.ethErrors.provider.disconnected();
            }
            if (!args || typeof args !== 'object' || Array.isArray(args)) {
                throw eth_rpc_errors_1.ethErrors.rpc.invalidRequest({
                    message: 'Expected a single, non-array, object argument.',
                    data: args,
                });
            }
            const { method, params } = args;
            if (typeof method !== 'string' || method.length === 0) {
                throw eth_rpc_errors_1.ethErrors.rpc.invalidRequest({
                    message: "'method' property must be a non-empty string.",
                    data: args,
                });
            }
            if (params !== undefined &&
                !Array.isArray(params) &&
                (typeof params !== 'object' || params === null)) {
                throw eth_rpc_errors_1.ethErrors.rpc.invalidRequest({
                    message: "'params' property must be an object or array if provided.",
                    data: args,
                });
            }
            return this._postMessage(communication_1.Messages.EXTERNAL.REQUEST, args);
        };
        /**
         * Response handler
         *
         */
        this.handleResponse = (data) => {
            const handler = this._handlers[data.id];
            if (!handler) {
                loglevel_1.default.error('Unknown response', data);
                return;
            }
            if (!handler.subscriber) {
                delete this._handlers[data.id];
            }
            // check for subscription id in response
            this.setEthSubscriptionsSubId(data);
            if (data.subscription) {
                handler.subscriber(data.subscription);
            }
            else if (data.error) {
                // Deserialze error object
                const parsedError = JSON.parse(data.error);
                const err = new Error(parsedError.message);
                // Validate error and reject promise
                const valdatedErr = (0, errors_1.validateError)(err.message);
                handler.reject(valdatedErr);
            }
            else {
                handler.resolve(data.response);
            }
        };
        this.enable = async () => {
            this.deprecationWarning('ethereum.enable(...)', true);
            const accounts = (await this._postMessage(communication_1.Messages.EXTERNAL.REQUEST, {
                method: ethereum_1.JSONRPCMethod.eth_requestAccounts,
            }));
            return accounts;
        };
        /* ----------------------------------------------------------------------------- */
        /* Provider setup
        /* ----------------------------------------------------------------------------- */
        /**
         * Provider setup
         *
         */
        this._setupProvider = async () => {
            const { accounts, chainId, networkVersion } = await this._postMessage(communication_1.Messages.EXTERNAL.SETUP_PROVIDER);
            if (chainId !== undefined && networkVersion !== undefined) {
                this.networkVersion = networkVersion;
                this.chainId = chainId;
                this._connect({ chainId });
            }
            this._accountsChanged(accounts);
        };
        /**
         * Subscribes to events updates
         *
         * @param cb update handler
         */
        this._eventSubscription = async (cb) => {
            return this._postMessage(communication_1.Messages.EXTERNAL.EVENT_SUBSCRIPTION, undefined, cb);
        };
        /**
         * Set favicon url
         */
        this._setIcon = async () => {
            const iconURL = await (0, site_1.getIconData)();
            if (iconURL) {
                this._postMessage(communication_1.Messages.EXTERNAL.SET_ICON, {
                    iconURL,
                });
            }
        };
        /* ----------------------------------------------------------------------------- */
        /* Requests utils
        /* ----------------------------------------------------------------------------- */
        /**
         * Post a message using the window object, to be listened by the content script
         *
         * @param message External method to use
         * @param request Request parameters
         * @param subscriber Subscription callback
         * @returns Promise with the response
         */
        this._postMessage = (message, request, subscriber, reqId) => {
            return new Promise((resolve, reject) => {
                const id = reqId || `${Date.now()}.${++this._requestId}`;
                this._handlers[id] = { reject, resolve, subscriber };
                // If request is a subscription,
                // store it for resubscription in case the SW is terminated
                const updatedReq = this._checkForEthSubscriptions(message, request, id);
                window.postMessage({
                    id,
                    message,
                    origin: communication_1.Origin.PROVIDER,
                    request: updatedReq ?? (request || {}),
                }, window.location.href);
            });
        };
        /**
         * Synchronous RPC request
         *
         */
        this._sendJSONRPCRequest = (request) => {
            const response = {
                jsonrpc: '2.0',
                id: request.id,
            };
            response.result = this._handleSynchronousMethods(request);
            if (response.result === undefined) {
                throw new Error(`Please provide a callback parameter to call ${request.method} ` +
                    'asynchronously.');
            }
            return response;
        };
        this._sendMultipleRequestsAsync = (requests) => {
            return Promise.all(requests.map((r) => this._sendRequestAsync(r)));
        };
        this._sendRequestAsync = (request) => {
            return new Promise((resolve, reject) => {
                this._handleAsynchronousMethods(request)
                    .then((res) => {
                    resolve(res);
                })
                    .catch((err) => reject(err));
            });
        };
        /**
         * Synchronous methods handler
         *
         */
        this._handleSynchronousMethods = (request) => {
            const { method } = request;
            switch (method) {
                case ethereum_1.JSONRPCMethod.eth_accounts:
                    return this.selectedAddress ? [this.selectedAddress] : [];
                case ethereum_1.JSONRPCMethod.eth_coinbase:
                    return this.selectedAddress || null;
                case ethereum_1.JSONRPCMethod.net_version:
                    return this.networkVersion || null;
                default:
                    return undefined;
            }
        };
        /**
         * Asynchronous methods handler
         *
         */
        this._handleAsynchronousMethods = async (request) => {
            const response = {
                jsonrpc: '2.0',
                id: request.id,
            };
            response.result = await this._postMessage(communication_1.Messages.EXTERNAL.REQUEST, {
                method: request.method,
                params: request.params,
            });
            return response;
        };
        /* ----------------------------------------------------------------------------- */
        /* Events
        /* ----------------------------------------------------------------------------- */
        this._eventHandler = ({ eventName, payload, }) => {
            switch (eventName) {
                case types_1.ProviderEvents.connect:
                    this._connect(payload);
                    break;
                case types_1.ProviderEvents.disconnect:
                    this._disconnect(payload);
                    break;
                case types_1.ProviderEvents.chainChanged:
                    this._chainChanged(payload);
                    break;
                case types_1.ProviderEvents.accountsChanged:
                    this._accountsChanged(payload);
                    break;
                case types_1.ProviderEvents.message:
                    this._emitSubscriptionMessage(payload);
                    break;
                default:
                    break;
            }
        };
        this._connect = (connectInfo) => {
            this._state.isConnected = true;
            this.emit(types_1.ProviderEvents.connect, connectInfo);
        };
        this._disconnect = (error = eth_rpc_errors_1.ethErrors.provider.disconnected()) => {
            this._state.isConnected = false;
            this.emit(types_1.ProviderEvents.disconnect, error);
            /**
             * @deprecated Alias of disconnect
             */
            this.emit(types_1.ProviderEvents.close, error);
        };
        this._chainChanged = ({ chainId, networkVersion }) => {
            this._connect({ chainId });
            if (chainId !== this.chainId) {
                this.chainId = chainId;
                this.networkVersion = networkVersion;
                this.emit(types_1.ProviderEvents.chainChanged, chainId);
                /**
                 * @deprecated This was previously used with networkId instead of chainId,
                 * we keep the interface but we enforce chainId anyways
                 */
                this.emit(types_1.ProviderEvents.networkChanged, chainId);
                /**
                 * @deprecated Alias of chainChanged
                 */
                this.emit(types_1.ProviderEvents.chainIdChanged, chainId);
            }
        };
        this._accountsChanged = async (accounts) => {
            if (accounts.length !== this._state.accounts.length ||
                !accounts.every((val, index) => val === this._state.accounts[index])) {
                this._state.accounts = accounts;
                if (this.selectedAddress !== accounts[0]) {
                    this.selectedAddress = accounts[0] || null;
                }
                this.emit(types_1.ProviderEvents.accountsChanged, accounts);
            }
        };
        /**
         * Emits to the consumers the message received via a previously
         * initiated subscription.
         *
         * @param message The received subscription message
         */
        this._emitSubscriptionMessage = (message) => {
            // re-write subscription id
            for (const reqId in this._ethSubscriptions) {
                const { prevSubId, subId } = this._ethSubscriptions[reqId];
                if (message.data.subscription === subId &&
                    prevSubId &&
                    prevSubId !== '') {
                    message = {
                        ...message,
                        data: {
                            ...message.data,
                            subscription: prevSubId,
                        },
                    };
                    loglevel_1.default.trace('_emitSubscriptionMessage', 'message overridden', message);
                    break;
                }
            }
            this.emit(types_1.ProviderEvents.message, message);
            // Emit events for legacy API
            const web3LegacyResponse = {
                jsonrpc: '2.0',
                method: 'eth_subscription',
                params: {
                    result: message.data.result,
                    subscription: message.data.subscription,
                },
            };
            this.emit(types_1.ProviderEvents.data, web3LegacyResponse);
            this.emit(types_1.ProviderEvents.notification, web3LegacyResponse.params.result);
        };
        /**
         * Adds the new subscription id to the ethSubscriptions dictionary.
         *
         */
        this.setEthSubscriptionsSubId = (data) => {
            if ('id' in data && data.id in this._ethSubscriptions) {
                loglevel_1.default.trace('setEthSubscriptionsSubId', 'found', this._ethSubscriptions[data.id], data.response);
                this._ethSubscriptions[data.id].subId = data.response;
            }
        };
        this._state = {
            accounts: [],
            isConnected: true,
        };
        this.chainId = null;
        this.selectedAddress = null;
        this.networkVersion = null;
        this._handlers = {};
        this._requestId = 0;
        const cachedCompatibility = (0, compatibility_1.getBlockWalletCompatibility)();
        this.isBlockWallet = cachedCompatibility.isBlockWallet ?? true;
        this._ethSubscriptions = {};
        // Metamask compatibility
        this.isMetaMask = !this.isBlockWallet;
        this._updateSiteCompatibility();
        this.autoRefreshOnNetworkChange = false;
        this._metamask = {
            isEnabled: () => true,
            isApproved: async () => true,
            isUnlocked: async () => true,
        };
        // Bind non arrow functions
        this.send = this.send.bind(this);
        this.sendAsync = this.sendAsync.bind(this);
        // Setup provider
        this._setupProvider();
        // Subscribe to state updates
        this._eventSubscription(this._eventHandler);
        // Set maximum amount of event listeners
        this.setMaxListeners(MAX_EVENT_LISTENERS);
        // Set site icon
        this._setIcon();
    }
    /**
     * This method checks whether the current page is compatible with BlockWallet.
     * If the site is not compatible, the isBlockWallet flag will be set to false when injecting the provider and isMetamask will be true.
     */
    async _updateSiteCompatibility() {
        const providerConfig = await this._postMessage(communication_1.Messages.EXTERNAL.GET_PROVIDER_CONFIG);
        const { isBlockWallet } = (0, compatibility_1.updateBlockWalletCompatibility)(providerConfig.incompatibleSites);
        this.isBlockWallet = isBlockWallet;
        this.isMetaMask = !isBlockWallet;
    }
    async reInitializeSubscriptions() {
        loglevel_1.default.trace('reInitializeSubscriptions', 'init', this._ethSubscriptions);
        for (const reqId in this._ethSubscriptions) {
            const { params, subId, prevSubId } = this._ethSubscriptions[reqId];
            const request = {
                method: ethereum_1.JSONRPCMethod.eth_subscribe,
                params,
            };
            loglevel_1.default.trace(reqId, 'request', request);
            await this._postMessage(communication_1.Messages.EXTERNAL.REQUEST, request, undefined, reqId);
            this._ethSubscriptions[reqId].prevSubId =
                prevSubId && prevSubId !== '' ? prevSubId : subId;
        }
        loglevel_1.default.trace('reInitializeSubscriptions', 'end', this._ethSubscriptions);
    }
    /**
     * handleSignal
     *
     * Handles a signal
     *
     * @param signal The signal received
     */
    handleSignal(signal) {
        switch (signal) {
            case types_1.Signals.SW_REINIT:
                this._eventSubscription(this._eventHandler);
                this.reInitializeSubscriptions();
                break;
            default:
                loglevel_1.default.debug('Unrecognized signal received');
                break;
        }
    }
    send(requestOrMethod, callbackOrParams) {
        this.deprecationWarning('ethereum.send(...)', true);
        // send<T>(method, params): Promise<T>
        if (typeof requestOrMethod === 'string') {
            const method = requestOrMethod;
            const params = Array.isArray(callbackOrParams)
                ? callbackOrParams
                : callbackOrParams !== undefined
                    ? [callbackOrParams]
                    : [];
            const request = {
                method,
                params,
            };
            const response = this._postMessage(communication_1.Messages.EXTERNAL.REQUEST, request);
            return response;
        }
        // send(JSONRPCRequest | JSONRPCRequest[], callback): void
        if (typeof callbackOrParams === 'function') {
            const request = requestOrMethod;
            const callback = callbackOrParams;
            return this.sendAsync(request, callback);
        }
        // send(JSONRPCRequest[]): JSONRPCResponse[]
        if (Array.isArray(requestOrMethod)) {
            const requests = requestOrMethod;
            return requests.map((r) => this._sendJSONRPCRequest(r));
        }
        // send(JSONRPCRequest): JSONRPCResponse
        const req = requestOrMethod;
        return this._sendJSONRPCRequest(req);
    }
    sendAsync(request, callback) {
        this.deprecationWarning('ethereum.sendAsync(...)', true);
        if (typeof callback !== 'function') {
            throw eth_rpc_errors_1.ethErrors.rpc.invalidRequest({
                message: 'A callback is required',
            });
        }
        // send(JSONRPCRequest[], callback): void
        if (Array.isArray(request)) {
            const arrayCb = callback;
            this._sendMultipleRequestsAsync(request)
                .then((responses) => arrayCb(null, responses))
                .catch((err) => arrayCb(err, null));
            return;
        }
        // send(JSONRPCRequest, callback): void
        const cb = callback;
        this._sendRequestAsync(request)
            .then((response) => cb(null, response))
            .catch((err) => cb(err, null));
    }
    _checkForEthSubscriptions(message, request, id) {
        if (!request) {
            return undefined;
        }
        // @ts-ignore
        if (message === communication_1.EXTERNAL.REQUEST && request && 'method' in request) {
            if (request.method === ethereum_1.JSONRPCMethod.eth_subscribe) {
                // Store request params for SW reinit
                this._ethSubscriptions[id] = {
                    params: request.params,
                    subId: '',
                    prevSubId: '',
                };
            }
            else if (request.method === ethereum_1.JSONRPCMethod.eth_unsubscribe) {
                // If this is an unsubscription, remove from the list so we won't
                // subscribe again on SW termination
                const [subscriptionId] = request.params;
                let subIdToUnsubscribe = subscriptionId;
                for (const reqId in this._ethSubscriptions) {
                    const { subId, prevSubId } = this._ethSubscriptions[reqId];
                    if (subId === subIdToUnsubscribe ||
                        prevSubId === subIdToUnsubscribe) {
                        subIdToUnsubscribe = subId;
                        delete this._ethSubscriptions[reqId];
                        break;
                    }
                }
                loglevel_1.default.trace('eth_unsubscribe', 'subIdToUnsubscribe', subIdToUnsubscribe, this._ethSubscriptions);
                return {
                    method: request.method,
                    params: [subIdToUnsubscribe],
                };
            }
        }
        return undefined;
    }
    /**
     * Prints a console.warn message to warn the user about usage of a deprecated API
     * @param eventName The eventName
     */
    deprecationWarning(methodName, force = false) {
        const deprecatedMethods = [
            'close',
            'data',
            'networkChanged',
            'chainIdChanged',
            'notification',
        ];
        if (deprecatedMethods.includes(methodName) || force) {
            loglevel_1.default.warn(`BlockWallet: '${methodName}' is deprecated and may be removed in the future. See: https://eips.ethereum.org/EIPS/eip-1193`);
        }
    }
    /// EventEmitter overrides
    addListener(eventName, listener) {
        this.deprecationWarning(eventName);
        return super.addListener(eventName, listener);
    }
    on(eventName, listener) {
        this.deprecationWarning(eventName);
        return super.on(eventName, listener);
    }
    once(eventName, listener) {
        this.deprecationWarning(eventName);
        return super.once(eventName, listener);
    }
    prependListener(eventName, listener) {
        this.deprecationWarning(eventName);
        return super.prependListener(eventName, listener);
    }
    prependOnceListener(eventName, listener) {
        this.deprecationWarning(eventName);
        return super.prependOnceListener(eventName, listener);
    }
}
exports["default"] = BlankProvider;


/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Signals = exports.ProviderEvents = void 0;
// Provider events
var ProviderEvents;
(function (ProviderEvents) {
    ProviderEvents["accountsChanged"] = "accountsChanged";
    ProviderEvents["chainChanged"] = "chainChanged";
    ProviderEvents["connect"] = "connect";
    ProviderEvents["disconnect"] = "disconnect";
    ProviderEvents["message"] = "message";
    /**
     * close
     *
     * @deprecated Deprecated Web3 subscription event
     */
    ProviderEvents["close"] = "close";
    /**
     * notification
     *
     * @deprecated Deprecated Web3 subscription event
     */
    ProviderEvents["notification"] = "notification";
    /**
     * data
     *
     * @deprecated Deprecated Web3 subscription event
     */
    ProviderEvents["data"] = "data";
    /**
     * networkChanged
     *
     * @deprecated Deprecated network change event
     */
    ProviderEvents["networkChanged"] = "networkChanged";
    /**
     * chainIdChanged
     *
     * @deprecated Deprecated network change event
     */
    ProviderEvents["chainIdChanged"] = "chainIdChanged";
})(ProviderEvents = exports.ProviderEvents || (exports.ProviderEvents = {}));
var Signals;
(function (Signals) {
    Signals["SW_REINIT"] = "SW_REINIT";
})(Signals = exports.Signals || (exports.Signals = {}));


/***/ }),

/***/ "./src/utils/compatibility.ts":
/*!************************************!*\
  !*** ./src/utils/compatibility.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateBlockWalletCompatibility = exports.getBlockWalletCompatibility = void 0;
const site_1 = __webpack_require__(/*! ./site */ "./src/utils/site.ts");
const incompatible_sites_json_1 = __importDefault(__webpack_require__(/*! @block-wallet/remote-configs/provider/incompatible_sites.json */ "./node_modules/@block-wallet/remote-configs/provider/incompatible_sites.json"));
const BLOCKWALLET_COMPATIBLITY_KEY = '__BlockWallet_compatibility__';
function getCompatibility() {
    const cache = window.localStorage.getItem(BLOCKWALLET_COMPATIBLITY_KEY);
    if (cache) {
        return JSON.parse(cache);
    }
    return null;
}
function setCompatibility(isBlockWallet) {
    return window.localStorage.setItem(BLOCKWALLET_COMPATIBLITY_KEY, JSON.stringify({ isBlockWallet }));
}
function getBlockWalletCompatibility() {
    const compatibility = getCompatibility();
    if (compatibility) {
        return compatibility;
    }
    return updateBlockWalletCompatibility(incompatible_sites_json_1.default);
}
exports.getBlockWalletCompatibility = getBlockWalletCompatibility;
function updateBlockWalletCompatibility(incompatibleSites = incompatible_sites_json_1.default) {
    const isBlockWallet = (0, site_1.isCompatible)(incompatibleSites);
    setCompatibility(isBlockWallet);
    return { isBlockWallet };
}
exports.updateBlockWalletCompatibility = updateBlockWalletCompatibility;


/***/ }),

/***/ "./src/utils/errors.ts":
/*!*****************************!*\
  !*** ./src/utils/errors.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateError = void 0;
const ethereum_1 = __webpack_require__(/*! @block-wallet/background/utils/types/ethereum */ "../background/src/utils/types/ethereum.ts");
const eth_rpc_errors_1 = __webpack_require__(/*! eth-rpc-errors */ "./node_modules/eth-rpc-errors/dist/index.js");
/**
 * Parse error messages
 *
 */
const validateError = (error) => {
    switch (error) {
        case ethereum_1.ProviderError.INVALID_PARAMS:
            return eth_rpc_errors_1.ethErrors.rpc.invalidParams();
        case ethereum_1.ProviderError.RESOURCE_UNAVAILABLE:
            return eth_rpc_errors_1.ethErrors.rpc.resourceUnavailable();
        case ethereum_1.ProviderError.TRANSACTION_REJECTED:
            return eth_rpc_errors_1.ethErrors.provider.userRejectedRequest({
                message: 'User rejected transaction',
            });
        case ethereum_1.ProviderError.UNAUTHORIZED:
            return eth_rpc_errors_1.ethErrors.provider.unauthorized();
        case ethereum_1.ProviderError.UNSUPPORTED_METHOD:
            return eth_rpc_errors_1.ethErrors.provider.unsupportedMethod();
        case ethereum_1.ProviderError.USER_REJECTED_REQUEST:
            return eth_rpc_errors_1.ethErrors.provider.userRejectedRequest();
        default:
            return eth_rpc_errors_1.ethErrors.rpc.internal(error);
    }
};
exports.validateError = validateError;


/***/ }),

/***/ "./src/utils/shimWeb3.ts":
/*!*******************************!*\
  !*** ./src/utils/shimWeb3.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const loglevel_1 = __importDefault(__webpack_require__(/*! loglevel */ "./node_modules/loglevel/lib/loglevel.js"));
/**
 * If no existing window.web3 is found, this function injects a web3 "shim" to
 * not break dapps that rely on window.web3.currentProvider.
 *
 * @param provider - The provider to set as window.web3.currentProvider.
 */
const shimWeb3 = (provider) => {
    let loggedCurrentProvider = false;
    let loggedMissingProperty = false;
    if (!window.web3) {
        const SHIM_IDENTIFIER = 'isBlockWalletShim__';
        let web3Shim = { currentProvider: provider };
        Object.defineProperty(web3Shim, SHIM_IDENTIFIER, {
            value: true,
            enumerable: true,
            configurable: false,
            writable: false,
        });
        web3Shim = new Proxy(web3Shim, {
            get: (target, property, ...args) => {
                if (property === 'currentProvider' && !loggedCurrentProvider) {
                    loggedCurrentProvider = true;
                    loglevel_1.default.warn('You are accessing the BlockWallet window.web3.currentProvider shim. This property is deprecated; use window.ethereum instead.');
                }
                else if (property !== 'currentProvider' &&
                    property !== SHIM_IDENTIFIER &&
                    !loggedMissingProperty) {
                    loggedMissingProperty = true;
                    loglevel_1.default.error('Web3 is not injected');
                }
                return Reflect.get(target, property, ...args);
            },
            set: (...args) => {
                loglevel_1.default.warn('You are accessing the BlockWallet window.web3 shim. This object is deprecated; use window.ethereum instead.');
                return Reflect.set(...args);
            },
        });
        Object.defineProperty(window, 'web3', {
            value: web3Shim,
            enumerable: false,
            configurable: true,
            writable: true,
        });
    }
};
exports["default"] = shimWeb3;


/***/ }),

/***/ "./src/utils/site.ts":
/*!***************************!*\
  !*** ./src/utils/site.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getIconData = exports.checkScriptLoad = exports.isCompatible = void 0;
/**
 * Check if the site is on the list of incompatibleSites
 */
const isCompatible = (incompatibleSites) => {
    for (let i = 0; i < incompatibleSites.length; i++) {
        if (window.location.hostname === incompatibleSites[i] ||
            window.location.hostname.endsWith('.' + incompatibleSites[i])) {
            return false;
        }
    }
    return true;
};
exports.isCompatible = isCompatible;
/**
 * Check for unallowed file extension
 */
const checkExtension = () => {
    const fileExtensions = [/\.xml$/u, /\.pdf$/u];
    for (let i = 0; i < fileExtensions.length; i++) {
        if (fileExtensions[i].test(window.location.pathname)) {
            return false;
        }
    }
    return true;
};
/**
 * Checks the documentElement of the current document
 */
const documentElementCheck = () => {
    const documentElement = window.document.documentElement.nodeName;
    if (documentElement) {
        return documentElement.toLowerCase() === 'html';
    }
    return true;
};
/**
 * Checks the doctype of the current document if it exists
 */
const checkDocType = () => {
    const { doctype } = window.document;
    if (doctype) {
        return doctype.name === 'html';
    }
    return true;
};
/**
 * Helper function with checks to do before loading the script
 */
const checkScriptLoad = () => {
    return checkDocType() && checkExtension() && documentElementCheck();
};
exports.checkScriptLoad = checkScriptLoad;
/**
 * Returns site favicon data
 */
const getIconData = async () => {
    return new Promise((resolve) => {
        if (document.readyState === 'complete' ||
            document.readyState === 'interactive') {
            resolve(getIconFromDom());
        }
        else {
            const domContentLoadedHandler = async () => {
                resolve(getIconFromDom());
                window.removeEventListener('DOMContentLoaded', domContentLoadedHandler);
            };
            window.addEventListener('DOMContentLoaded', domContentLoadedHandler);
        }
    });
};
exports.getIconData = getIconData;
/**
 * Extracts an icon for the site from the DOM
 *
 * @returns Icon url or null if there isn't a valid one
 */
const getIconFromDom = async () => {
    const { document } = window;
    const icons = document.querySelectorAll('head > link[rel~="icon"]');
    for (const icon of icons) {
        if (icon && (await isValidImage(icon.href))) {
            return icon.href;
        }
    }
    return null;
};
/**
 * Checks if the given image loads correctly
 *
 * @param url Image source
 */
const isValidImage = async (url) => {
    const img = document.createElement('img');
    const isValid = await new Promise((resolve) => {
        try {
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        }
        catch (error) {
            resolve(false);
        }
    });
    img.remove();
    return isValid;
};


/***/ }),

/***/ "./node_modules/@block-wallet/remote-configs/provider/incompatible_sites.json":
/*!************************************************************************************!*\
  !*** ./node_modules/@block-wallet/remote-configs/provider/incompatible_sites.json ***!
  \************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('["cryptopunt.com","crystl.finance","degate.com","dydx.exchange","etherscan.io","guild.xyz","hawku.com","illuvium.io","immutable.com","mcdex.io","oncyber.io","opensea.io","otherside.xyz","pegaxy.io","phantomgalaxies.com","polymarket.com","railgun.ch","scrt.network","spiritswap.finance","syntropynet.com","zed.run","zk.money","manifold.xyz","orionprotocol.io","portal.zksync.io","stargate.finance","bookmaker.xyz","labs.zetachain.com"]');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjs7QUFFQSxrQ0FBa0MsUUFBUTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQSxxRUFBcUU7QUFDckUsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFlBQVk7O0FBRVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQSxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsc0JBQXNCO0FBQ3RCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNB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TUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztTQUNqQjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xCO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7SUFFYixPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ3JJRjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGJsb2NrLXdhbGxldC9wcm92aWRlci8uL25vZGVfbW9kdWxlcy9AbWV0YW1hc2svc2FmZS1ldmVudC1lbWl0dGVyL2luZGV4LmpzIiwid2VicGFjazovL0BibG9jay13YWxsZXQvcHJvdmlkZXIvLi9ub2RlX21vZHVsZXMvZXRoLXJwYy1lcnJvcnMvZGlzdC9jbGFzc2VzLmpzIiwid2VicGFjazovL0BibG9jay13YWxsZXQvcHJvdmlkZXIvLi9ub2RlX21vZHVsZXMvZXRoLXJwYy1lcnJvcnMvZGlzdC9lcnJvci1jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vQGJsb2NrLXdhbGxldC9wcm92aWRlci8uL25vZGVfbW9kdWxlcy9ldGgtcnBjLWVycm9ycy9kaXN0L2Vycm9ycy5qcyIsIndlYnBhY2s6Ly9AYmxvY2std2FsbGV0L3Byb3ZpZGVyLy4vbm9kZV9tb2R1bGVzL2V0aC1ycGMtZXJyb3JzL2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGJsb2NrLXdhbGxldC9wcm92aWRlci8uL25vZGVfbW9kdWxlcy9ldGgtcnBjLWVycm9ycy9kaXN0L3V0aWxzLmpzIiwid2VicGFjazovL0BibG9jay13YWxsZXQvcHJvdmlkZXIvLi9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly9AYmxvY2std2FsbGV0L3Byb3ZpZGVyLy4vbm9kZV9tb2R1bGVzL2Zhc3Qtc2FmZS1zdHJpbmdpZnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGJsb2NrLXdhbGxldC9wcm92aWRlci8uL25vZGVfbW9kdWxlcy9sb2dsZXZlbC9saWIvbG9nbGV2ZWwuanMiLCJ3ZWJwYWNrOi8vQGJsb2NrLXdhbGxldC9wcm92aWRlci8uLi9iYWNrZ3JvdW5kL3NyYy91dGlscy90eXBlcy9jb21tdW5pY2F0aW9uLnRzIiwid2VicGFjazovL0BibG9jay13YWxsZXQvcHJvdmlkZXIvLi4vYmFja2dyb3VuZC9zcmMvdXRpbHMvdHlwZXMvZXRoZXJldW0udHMiLCJ3ZWJwYWNrOi8vQGJsb2NrLXdhbGxldC9wcm92aWRlci8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9AYmxvY2std2FsbGV0L3Byb3ZpZGVyLy4vc3JjL3Byb3ZpZGVyL0JsYW5rUHJvdmlkZXIudHMiLCJ3ZWJwYWNrOi8vQGJsb2NrLXdhbGxldC9wcm92aWRlci8uL3NyYy90eXBlcy50cyIsIndlYnBhY2s6Ly9AYmxvY2std2FsbGV0L3Byb3ZpZGVyLy4vc3JjL3V0aWxzL2NvbXBhdGliaWxpdHkudHMiLCJ3ZWJwYWNrOi8vQGJsb2NrLXdhbGxldC9wcm92aWRlci8uL3NyYy91dGlscy9lcnJvcnMudHMiLCJ3ZWJwYWNrOi8vQGJsb2NrLXdhbGxldC9wcm92aWRlci8uL3NyYy91dGlscy9zaGltV2ViMy50cyIsIndlYnBhY2s6Ly9AYmxvY2std2FsbGV0L3Byb3ZpZGVyLy4vc3JjL3V0aWxzL3NpdGUudHMiLCJ3ZWJwYWNrOi8vQGJsb2NrLXdhbGxldC9wcm92aWRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9AYmxvY2std2FsbGV0L3Byb3ZpZGVyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vQGJsb2NrLXdhbGxldC9wcm92aWRlci93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vQGJsb2NrLXdhbGxldC9wcm92aWRlci93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBldmVudHNfMSA9IHJlcXVpcmUoXCJldmVudHNcIik7XG5mdW5jdGlvbiBzYWZlQXBwbHkoaGFuZGxlciwgY29udGV4dCwgYXJncykge1xuICAgIHRyeSB7XG4gICAgICAgIFJlZmxlY3QuYXBwbHkoaGFuZGxlciwgY29udGV4dCwgYXJncyk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgLy8gVGhyb3cgZXJyb3IgYWZ0ZXIgdGltZW91dCBzbyBhcyBub3QgdG8gaW50ZXJydXB0IHRoZSBzdGFja1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIpIHtcbiAgICBjb25zdCBuID0gYXJyLmxlbmd0aDtcbiAgICBjb25zdCBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSArPSAxKSB7XG4gICAgICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gICAgfVxuICAgIHJldHVybiBjb3B5O1xufVxuY2xhc3MgU2FmZUV2ZW50RW1pdHRlciBleHRlbmRzIGV2ZW50c18xLkV2ZW50RW1pdHRlciB7XG4gICAgZW1pdCh0eXBlLCAuLi5hcmdzKSB7XG4gICAgICAgIGxldCBkb0Vycm9yID0gdHlwZSA9PT0gJ2Vycm9yJztcbiAgICAgICAgY29uc3QgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRvRXJyb3IgPSBkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFkb0Vycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICAgICAgICBpZiAoZG9FcnJvcikge1xuICAgICAgICAgICAgbGV0IGVyO1xuICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIFtlcl0gPSBhcmdzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAvLyBOb3RlOiBUaGUgY29tbWVudHMgb24gdGhlIGB0aHJvd2AgbGluZXMgYXJlIGludGVudGlvbmFsLCB0aGV5IHNob3dcbiAgICAgICAgICAgICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgICAgICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKGBVbmhhbmRsZWQgZXJyb3IuJHtlciA/IGAgKCR7ZXIubWVzc2FnZX0pYCA6ICcnfWApO1xuICAgICAgICAgICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICAgICAgICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuICAgICAgICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBzYWZlQXBwbHkoaGFuZGxlciwgdGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlcik7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgc2FmZUFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gU2FmZUV2ZW50RW1pdHRlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5FdGhlcmV1bVByb3ZpZGVyRXJyb3IgPSBleHBvcnRzLkV0aGVyZXVtUnBjRXJyb3IgPSB2b2lkIDA7XG5jb25zdCBmYXN0X3NhZmVfc3RyaW5naWZ5XzEgPSByZXF1aXJlKFwiZmFzdC1zYWZlLXN0cmluZ2lmeVwiKTtcbi8qKlxuICogRXJyb3Igc3ViY2xhc3MgaW1wbGVtZW50aW5nIEpTT04gUlBDIDIuMCBlcnJvcnMgYW5kIEV0aGVyZXVtIFJQQyBlcnJvcnNcbiAqIHBlciBFSVAtMTQ3NC5cbiAqIFBlcm1pdHMgYW55IGludGVnZXIgZXJyb3IgY29kZS5cbiAqL1xuY2xhc3MgRXRoZXJldW1ScGNFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3Rvcihjb2RlLCBtZXNzYWdlLCBkYXRhKSB7XG4gICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihjb2RlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdcImNvZGVcIiBtdXN0IGJlIGFuIGludGVnZXIuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZXNzYWdlIHx8IHR5cGVvZiBtZXNzYWdlICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdcIm1lc3NhZ2VcIiBtdXN0IGJlIGEgbm9uZW1wdHkgc3RyaW5nLicpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmNvZGUgPSBjb2RlO1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwbGFpbiBvYmplY3Qgd2l0aCBhbGwgcHVibGljIGNsYXNzIHByb3BlcnRpZXMuXG4gICAgICovXG4gICAgc2VyaWFsaXplKCkge1xuICAgICAgICBjb25zdCBzZXJpYWxpemVkID0ge1xuICAgICAgICAgICAgY29kZTogdGhpcy5jb2RlLFxuICAgICAgICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5kYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNlcmlhbGl6ZWQuZGF0YSA9IHRoaXMuZGF0YTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGFjaykge1xuICAgICAgICAgICAgc2VyaWFsaXplZC5zdGFjayA9IHRoaXMuc3RhY2s7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlcmlhbGl6ZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgc2VyaWFsaXplZCBlcnJvciwgb21pdHRpbmdcbiAgICAgKiBhbnkgY2lyY3VsYXIgcmVmZXJlbmNlcy5cbiAgICAgKi9cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIGZhc3Rfc2FmZV9zdHJpbmdpZnlfMS5kZWZhdWx0KHRoaXMuc2VyaWFsaXplKCksIHN0cmluZ2lmeVJlcGxhY2VyLCAyKTtcbiAgICB9XG59XG5leHBvcnRzLkV0aGVyZXVtUnBjRXJyb3IgPSBFdGhlcmV1bVJwY0Vycm9yO1xuLyoqXG4gKiBFcnJvciBzdWJjbGFzcyBpbXBsZW1lbnRpbmcgRXRoZXJldW0gUHJvdmlkZXIgZXJyb3JzIHBlciBFSVAtMTE5My5cbiAqIFBlcm1pdHMgaW50ZWdlciBlcnJvciBjb2RlcyBpbiB0aGUgWyAxMDAwIDw9IDQ5OTkgXSByYW5nZS5cbiAqL1xuY2xhc3MgRXRoZXJldW1Qcm92aWRlckVycm9yIGV4dGVuZHMgRXRoZXJldW1ScGNFcnJvciB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIEV0aGVyZXVtIFByb3ZpZGVyIEpTT04tUlBDIGVycm9yLlxuICAgICAqIGBjb2RlYCBtdXN0IGJlIGFuIGludGVnZXIgaW4gdGhlIDEwMDAgPD0gNDk5OSByYW5nZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb2RlLCBtZXNzYWdlLCBkYXRhKSB7XG4gICAgICAgIGlmICghaXNWYWxpZEV0aFByb3ZpZGVyQ29kZShjb2RlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdcImNvZGVcIiBtdXN0IGJlIGFuIGludGVnZXIgc3VjaCB0aGF0OiAxMDAwIDw9IGNvZGUgPD0gNDk5OScpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyKGNvZGUsIG1lc3NhZ2UsIGRhdGEpO1xuICAgIH1cbn1cbmV4cG9ydHMuRXRoZXJldW1Qcm92aWRlckVycm9yID0gRXRoZXJldW1Qcm92aWRlckVycm9yO1xuLy8gSW50ZXJuYWxcbmZ1bmN0aW9uIGlzVmFsaWRFdGhQcm92aWRlckNvZGUoY29kZSkge1xuICAgIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKGNvZGUpICYmIGNvZGUgPj0gMTAwMCAmJiBjb2RlIDw9IDQ5OTk7XG59XG5mdW5jdGlvbiBzdHJpbmdpZnlSZXBsYWNlcihfLCB2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gJ1tDaXJjdWxhcl0nKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVkyeGhjM05sY3k1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OWpiR0Z6YzJWekxuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPenRCUVVGQkxEWkVRVUZuUkR0QlFWTm9SRHM3T3p0SFFVbEhPMEZCUTBnc1RVRkJZU3huUWtGQmIwSXNVMEZCVVN4TFFVRkxPMGxCVFRWRExGbEJRVmtzU1VGQldTeEZRVUZGTEU5QlFXVXNSVUZCUlN4SlFVRlJPMUZCUldwRUxFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNVMEZCVXl4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRk8xbEJRek5DTEUxQlFVMHNTVUZCU1N4TFFVRkxMRU5CUTJJc05FSkJRVFJDTEVOQlF6ZENMRU5CUVVNN1UwRkRTRHRSUVVORUxFbEJRVWtzUTBGQlF5eFBRVUZQTEVsQlFVa3NUMEZCVHl4UFFVRlBMRXRCUVVzc1VVRkJVU3hGUVVGRk8xbEJRek5ETEUxQlFVMHNTVUZCU1N4TFFVRkxMRU5CUTJJc2MwTkJRWE5ETEVOQlEzWkRMRU5CUVVNN1UwRkRTRHRSUVVWRUxFdEJRVXNzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0UlFVTm1MRWxCUVVrc1EwRkJReXhKUVVGSkxFZEJRVWNzU1VGQlNTeERRVUZETzFGQlEycENMRWxCUVVrc1NVRkJTU3hMUVVGTExGTkJRVk1zUlVGQlJUdFpRVU4wUWl4SlFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF6dFRRVU5zUWp0SlFVTklMRU5CUVVNN1NVRkZSRHM3VDBGRlJ6dEpRVU5JTEZOQlFWTTdVVUZEVUN4TlFVRk5MRlZCUVZVc1IwRkJLMEk3V1VGRE4wTXNTVUZCU1N4RlFVRkZMRWxCUVVrc1EwRkJReXhKUVVGSk8xbEJRMllzVDBGQlR5eEZRVUZGTEVsQlFVa3NRMEZCUXl4UFFVRlBPMU5CUTNSQ0xFTkJRVU03VVVGRFJpeEpRVUZKTEVsQlFVa3NRMEZCUXl4SlFVRkpMRXRCUVVzc1UwRkJVeXhGUVVGRk8xbEJRek5DTEZWQlFWVXNRMEZCUXl4SlFVRkpMRWRCUVVjc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF6dFRRVU0zUWp0UlFVTkVMRWxCUVVrc1NVRkJTU3hEUVVGRExFdEJRVXNzUlVGQlJUdFpRVU5rTEZWQlFWVXNRMEZCUXl4TFFVRkxMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF6dFRRVU12UWp0UlFVTkVMRTlCUVU4c1ZVRkJWU3hEUVVGRE8wbEJRM0JDTEVOQlFVTTdTVUZGUkRzN08wOUJSMGM3U1VGRFNDeFJRVUZSTzFGQlEwNHNUMEZCVHl3MlFrRkJZU3hEUVVOc1FpeEpRVUZKTEVOQlFVTXNVMEZCVXl4RlFVRkZMRVZCUTJoQ0xHbENRVUZwUWl4RlFVTnFRaXhEUVVGRExFTkJRMFlzUTBGQlF6dEpRVU5LTEVOQlFVTTdRMEZEUmp0QlFYUkVSQ3cwUTBGelJFTTdRVUZGUkRzN08wZEJSMGM3UVVGRFNDeE5RVUZoTEhGQ1FVRjVRaXhUUVVGUkxHZENRVUZ0UWp0SlFVVXZSRHM3TzA5QlIwYzdTVUZEU0N4WlFVRlpMRWxCUVZrc1JVRkJSU3hQUVVGbExFVkJRVVVzU1VGQlVUdFJRVVZxUkN4SlFVRkpMRU5CUVVNc2MwSkJRWE5DTEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVN1dVRkRha01zVFVGQlRTeEpRVUZKTEV0QlFVc3NRMEZEWWl3eVJFRkJNa1FzUTBGRE5VUXNRMEZCUXp0VFFVTklPMUZCUlVRc1MwRkJTeXhEUVVGRExFbEJRVWtzUlVGQlJTeFBRVUZQTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1NVRkROMElzUTBGQlF6dERRVU5HTzBGQmFFSkVMSE5FUVdkQ1F6dEJRVVZFTEZkQlFWYzdRVUZGV0N4VFFVRlRMSE5DUVVGelFpeERRVUZETEVsQlFWazdTVUZETVVNc1QwRkJUeXhOUVVGTkxFTkJRVU1zVTBGQlV5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRWxCUVVrc1NVRkJTU3hKUVVGSkxFbEJRVWtzU1VGQlNTeEpRVUZKTEVsQlFVa3NRMEZCUXp0QlFVTm9SU3hEUVVGRE8wRkJSVVFzVTBGQlV5eHBRa0ZCYVVJc1EwRkJReXhEUVVGVkxFVkJRVVVzUzBGQll6dEpRVU51UkN4SlFVRkpMRXRCUVVzc1MwRkJTeXhaUVVGWkxFVkJRVVU3VVVGRE1VSXNUMEZCVHl4VFFVRlRMRU5CUVVNN1MwRkRiRUk3U1VGRFJDeFBRVUZQTEV0QlFVc3NRMEZCUXp0QlFVTm1MRU5CUVVNaWZRPT0iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZXJyb3JWYWx1ZXMgPSBleHBvcnRzLmVycm9yQ29kZXMgPSB2b2lkIDA7XG5leHBvcnRzLmVycm9yQ29kZXMgPSB7XG4gICAgcnBjOiB7XG4gICAgICAgIGludmFsaWRJbnB1dDogLTMyMDAwLFxuICAgICAgICByZXNvdXJjZU5vdEZvdW5kOiAtMzIwMDEsXG4gICAgICAgIHJlc291cmNlVW5hdmFpbGFibGU6IC0zMjAwMixcbiAgICAgICAgdHJhbnNhY3Rpb25SZWplY3RlZDogLTMyMDAzLFxuICAgICAgICBtZXRob2ROb3RTdXBwb3J0ZWQ6IC0zMjAwNCxcbiAgICAgICAgbGltaXRFeGNlZWRlZDogLTMyMDA1LFxuICAgICAgICBwYXJzZTogLTMyNzAwLFxuICAgICAgICBpbnZhbGlkUmVxdWVzdDogLTMyNjAwLFxuICAgICAgICBtZXRob2ROb3RGb3VuZDogLTMyNjAxLFxuICAgICAgICBpbnZhbGlkUGFyYW1zOiAtMzI2MDIsXG4gICAgICAgIGludGVybmFsOiAtMzI2MDMsXG4gICAgfSxcbiAgICBwcm92aWRlcjoge1xuICAgICAgICB1c2VyUmVqZWN0ZWRSZXF1ZXN0OiA0MDAxLFxuICAgICAgICB1bmF1dGhvcml6ZWQ6IDQxMDAsXG4gICAgICAgIHVuc3VwcG9ydGVkTWV0aG9kOiA0MjAwLFxuICAgICAgICBkaXNjb25uZWN0ZWQ6IDQ5MDAsXG4gICAgICAgIGNoYWluRGlzY29ubmVjdGVkOiA0OTAxLFxuICAgIH0sXG59O1xuZXhwb3J0cy5lcnJvclZhbHVlcyA9IHtcbiAgICAnLTMyNzAwJzoge1xuICAgICAgICBzdGFuZGFyZDogJ0pTT04gUlBDIDIuMCcsXG4gICAgICAgIG1lc3NhZ2U6ICdJbnZhbGlkIEpTT04gd2FzIHJlY2VpdmVkIGJ5IHRoZSBzZXJ2ZXIuIEFuIGVycm9yIG9jY3VycmVkIG9uIHRoZSBzZXJ2ZXIgd2hpbGUgcGFyc2luZyB0aGUgSlNPTiB0ZXh0LicsXG4gICAgfSxcbiAgICAnLTMyNjAwJzoge1xuICAgICAgICBzdGFuZGFyZDogJ0pTT04gUlBDIDIuMCcsXG4gICAgICAgIG1lc3NhZ2U6ICdUaGUgSlNPTiBzZW50IGlzIG5vdCBhIHZhbGlkIFJlcXVlc3Qgb2JqZWN0LicsXG4gICAgfSxcbiAgICAnLTMyNjAxJzoge1xuICAgICAgICBzdGFuZGFyZDogJ0pTT04gUlBDIDIuMCcsXG4gICAgICAgIG1lc3NhZ2U6ICdUaGUgbWV0aG9kIGRvZXMgbm90IGV4aXN0IC8gaXMgbm90IGF2YWlsYWJsZS4nLFxuICAgIH0sXG4gICAgJy0zMjYwMic6IHtcbiAgICAgICAgc3RhbmRhcmQ6ICdKU09OIFJQQyAyLjAnLFxuICAgICAgICBtZXNzYWdlOiAnSW52YWxpZCBtZXRob2QgcGFyYW1ldGVyKHMpLicsXG4gICAgfSxcbiAgICAnLTMyNjAzJzoge1xuICAgICAgICBzdGFuZGFyZDogJ0pTT04gUlBDIDIuMCcsXG4gICAgICAgIG1lc3NhZ2U6ICdJbnRlcm5hbCBKU09OLVJQQyBlcnJvci4nLFxuICAgIH0sXG4gICAgJy0zMjAwMCc6IHtcbiAgICAgICAgc3RhbmRhcmQ6ICdFSVAtMTQ3NCcsXG4gICAgICAgIG1lc3NhZ2U6ICdJbnZhbGlkIGlucHV0LicsXG4gICAgfSxcbiAgICAnLTMyMDAxJzoge1xuICAgICAgICBzdGFuZGFyZDogJ0VJUC0xNDc0JyxcbiAgICAgICAgbWVzc2FnZTogJ1Jlc291cmNlIG5vdCBmb3VuZC4nLFxuICAgIH0sXG4gICAgJy0zMjAwMic6IHtcbiAgICAgICAgc3RhbmRhcmQ6ICdFSVAtMTQ3NCcsXG4gICAgICAgIG1lc3NhZ2U6ICdSZXNvdXJjZSB1bmF2YWlsYWJsZS4nLFxuICAgIH0sXG4gICAgJy0zMjAwMyc6IHtcbiAgICAgICAgc3RhbmRhcmQ6ICdFSVAtMTQ3NCcsXG4gICAgICAgIG1lc3NhZ2U6ICdUcmFuc2FjdGlvbiByZWplY3RlZC4nLFxuICAgIH0sXG4gICAgJy0zMjAwNCc6IHtcbiAgICAgICAgc3RhbmRhcmQ6ICdFSVAtMTQ3NCcsXG4gICAgICAgIG1lc3NhZ2U6ICdNZXRob2Qgbm90IHN1cHBvcnRlZC4nLFxuICAgIH0sXG4gICAgJy0zMjAwNSc6IHtcbiAgICAgICAgc3RhbmRhcmQ6ICdFSVAtMTQ3NCcsXG4gICAgICAgIG1lc3NhZ2U6ICdSZXF1ZXN0IGxpbWl0IGV4Y2VlZGVkLicsXG4gICAgfSxcbiAgICAnNDAwMSc6IHtcbiAgICAgICAgc3RhbmRhcmQ6ICdFSVAtMTE5MycsXG4gICAgICAgIG1lc3NhZ2U6ICdVc2VyIHJlamVjdGVkIHRoZSByZXF1ZXN0LicsXG4gICAgfSxcbiAgICAnNDEwMCc6IHtcbiAgICAgICAgc3RhbmRhcmQ6ICdFSVAtMTE5MycsXG4gICAgICAgIG1lc3NhZ2U6ICdUaGUgcmVxdWVzdGVkIGFjY291bnQgYW5kL29yIG1ldGhvZCBoYXMgbm90IGJlZW4gYXV0aG9yaXplZCBieSB0aGUgdXNlci4nLFxuICAgIH0sXG4gICAgJzQyMDAnOiB7XG4gICAgICAgIHN0YW5kYXJkOiAnRUlQLTExOTMnLFxuICAgICAgICBtZXNzYWdlOiAnVGhlIHJlcXVlc3RlZCBtZXRob2QgaXMgbm90IHN1cHBvcnRlZCBieSB0aGlzIEV0aGVyZXVtIHByb3ZpZGVyLicsXG4gICAgfSxcbiAgICAnNDkwMCc6IHtcbiAgICAgICAgc3RhbmRhcmQ6ICdFSVAtMTE5MycsXG4gICAgICAgIG1lc3NhZ2U6ICdUaGUgcHJvdmlkZXIgaXMgZGlzY29ubmVjdGVkIGZyb20gYWxsIGNoYWlucy4nLFxuICAgIH0sXG4gICAgJzQ5MDEnOiB7XG4gICAgICAgIHN0YW5kYXJkOiAnRUlQLTExOTMnLFxuICAgICAgICBtZXNzYWdlOiAnVGhlIHByb3ZpZGVyIGlzIGRpc2Nvbm5lY3RlZCBmcm9tIHRoZSBzcGVjaWZpZWQgY2hhaW4uJyxcbiAgICB9LFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVpYSnliM0l0WTI5dWMzUmhiblJ6TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2YzNKakwyVnljbTl5TFdOdmJuTjBZVzUwY3k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96czdRVUYxUW1Fc1VVRkJRU3hWUVVGVkxFZEJRV1U3U1VGRGNFTXNSMEZCUnl4RlFVRkZPMUZCUTBnc1dVRkJXU3hGUVVGRkxFTkJRVU1zUzBGQlN6dFJRVU53UWl4blFrRkJaMElzUlVGQlJTeERRVUZETEV0QlFVczdVVUZEZUVJc2JVSkJRVzFDTEVWQlFVVXNRMEZCUXl4TFFVRkxPMUZCUXpOQ0xHMUNRVUZ0UWl4RlFVRkZMRU5CUVVNc1MwRkJTenRSUVVNelFpeHJRa0ZCYTBJc1JVRkJSU3hEUVVGRExFdEJRVXM3VVVGRE1VSXNZVUZCWVN4RlFVRkZMRU5CUVVNc1MwRkJTenRSUVVOeVFpeExRVUZMTEVWQlFVVXNRMEZCUXl4TFFVRkxPMUZCUTJJc1kwRkJZeXhGUVVGRkxFTkJRVU1zUzBGQlN6dFJRVU4wUWl4alFVRmpMRVZCUVVVc1EwRkJReXhMUVVGTE8xRkJRM1JDTEdGQlFXRXNSVUZCUlN4RFFVRkRMRXRCUVVzN1VVRkRja0lzVVVGQlVTeEZRVUZGTEVOQlFVTXNTMEZCU3p0TFFVTnFRanRKUVVORUxGRkJRVkVzUlVGQlJUdFJRVU5TTEcxQ1FVRnRRaXhGUVVGRkxFbEJRVWs3VVVGRGVrSXNXVUZCV1N4RlFVRkZMRWxCUVVrN1VVRkRiRUlzYVVKQlFXbENMRVZCUVVVc1NVRkJTVHRSUVVOMlFpeFpRVUZaTEVWQlFVVXNTVUZCU1R0UlFVTnNRaXhwUWtGQmFVSXNSVUZCUlN4SlFVRkpPMHRCUTNoQ08wTkJRMFlzUTBGQlF6dEJRVVZYTEZGQlFVRXNWMEZCVnl4SFFVRkhPMGxCUTNwQ0xGRkJRVkVzUlVGQlJUdFJRVU5TTEZGQlFWRXNSVUZCUlN4alFVRmpPMUZCUTNoQ0xFOUJRVThzUlVGQlJTeDFSMEZCZFVjN1MwRkRha2c3U1VGRFJDeFJRVUZSTEVWQlFVVTdVVUZEVWl4UlFVRlJMRVZCUVVVc1kwRkJZenRSUVVONFFpeFBRVUZQTEVWQlFVVXNPRU5CUVRoRE8wdEJRM2hFTzBsQlEwUXNVVUZCVVN4RlFVRkZPMUZCUTFJc1VVRkJVU3hGUVVGRkxHTkJRV003VVVGRGVFSXNUMEZCVHl4RlFVRkZMQ3REUVVFclF6dExRVU42UkR0SlFVTkVMRkZCUVZFc1JVRkJSVHRSUVVOU0xGRkJRVkVzUlVGQlJTeGpRVUZqTzFGQlEzaENMRTlCUVU4c1JVRkJSU3c0UWtGQk9FSTdTMEZEZUVNN1NVRkRSQ3hSUVVGUkxFVkJRVVU3VVVGRFVpeFJRVUZSTEVWQlFVVXNZMEZCWXp0UlFVTjRRaXhQUVVGUExFVkJRVVVzTUVKQlFUQkNPMHRCUTNCRE8wbEJRMFFzVVVGQlVTeEZRVUZGTzFGQlExSXNVVUZCVVN4RlFVRkZMRlZCUVZVN1VVRkRjRUlzVDBGQlR5eEZRVUZGTEdkQ1FVRm5RanRMUVVNeFFqdEpRVU5FTEZGQlFWRXNSVUZCUlR0UlFVTlNMRkZCUVZFc1JVRkJSU3hWUVVGVk8xRkJRM0JDTEU5QlFVOHNSVUZCUlN4eFFrRkJjVUk3UzBGREwwSTdTVUZEUkN4UlFVRlJMRVZCUVVVN1VVRkRVaXhSUVVGUkxFVkJRVVVzVlVGQlZUdFJRVU53UWl4UFFVRlBMRVZCUVVVc2RVSkJRWFZDTzB0QlEycERPMGxCUTBRc1VVRkJVU3hGUVVGRk8xRkJRMUlzVVVGQlVTeEZRVUZGTEZWQlFWVTdVVUZEY0VJc1QwRkJUeXhGUVVGRkxIVkNRVUYxUWp0TFFVTnFRenRKUVVORUxGRkJRVkVzUlVGQlJUdFJRVU5TTEZGQlFWRXNSVUZCUlN4VlFVRlZPMUZCUTNCQ0xFOUJRVThzUlVGQlJTeDFRa0ZCZFVJN1MwRkRha003U1VGRFJDeFJRVUZSTEVWQlFVVTdVVUZEVWl4UlFVRlJMRVZCUVVVc1ZVRkJWVHRSUVVOd1FpeFBRVUZQTEVWQlFVVXNlVUpCUVhsQ08wdEJRMjVETzBsQlEwUXNUVUZCVFN4RlFVRkZPMUZCUTA0c1VVRkJVU3hGUVVGRkxGVkJRVlU3VVVGRGNFSXNUMEZCVHl4RlFVRkZMRFJDUVVFMFFqdExRVU4wUXp0SlFVTkVMRTFCUVUwc1JVRkJSVHRSUVVOT0xGRkJRVkVzUlVGQlJTeFZRVUZWTzFGQlEzQkNMRTlCUVU4c1JVRkJSU3d3UlVGQk1FVTdTMEZEY0VZN1NVRkRSQ3hOUVVGTkxFVkJRVVU3VVVGRFRpeFJRVUZSTEVWQlFVVXNWVUZCVlR0UlFVTndRaXhQUVVGUExFVkJRVVVzYTBWQlFXdEZPMHRCUXpWRk8wbEJRMFFzVFVGQlRTeEZRVUZGTzFGQlEwNHNVVUZCVVN4RlFVRkZMRlZCUVZVN1VVRkRjRUlzVDBGQlR5eEZRVUZGTEN0RFFVRXJRenRMUVVONlJEdEpRVU5FTEUxQlFVMHNSVUZCUlR0UlFVTk9MRkZCUVZFc1JVRkJSU3hWUVVGVk8xRkJRM0JDTEU5QlFVOHNSVUZCUlN4M1JFRkJkMFE3UzBGRGJFVTdRMEZEUml4RFFVRkRJbjA9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmV0aEVycm9ycyA9IHZvaWQgMDtcbmNvbnN0IGNsYXNzZXNfMSA9IHJlcXVpcmUoXCIuL2NsYXNzZXNcIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG5jb25zdCBlcnJvcl9jb25zdGFudHNfMSA9IHJlcXVpcmUoXCIuL2Vycm9yLWNvbnN0YW50c1wiKTtcbmV4cG9ydHMuZXRoRXJyb3JzID0ge1xuICAgIHJwYzoge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IGEgSlNPTiBSUEMgMi4wIFBhcnNlICgtMzI3MDApIGVycm9yLlxuICAgICAgICAgKi9cbiAgICAgICAgcGFyc2U6IChhcmcpID0+IGdldEV0aEpzb25ScGNFcnJvcihlcnJvcl9jb25zdGFudHNfMS5lcnJvckNvZGVzLnJwYy5wYXJzZSwgYXJnKSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCBhIEpTT04gUlBDIDIuMCBJbnZhbGlkIFJlcXVlc3QgKC0zMjYwMCkgZXJyb3IuXG4gICAgICAgICAqL1xuICAgICAgICBpbnZhbGlkUmVxdWVzdDogKGFyZykgPT4gZ2V0RXRoSnNvblJwY0Vycm9yKGVycm9yX2NvbnN0YW50c18xLmVycm9yQ29kZXMucnBjLmludmFsaWRSZXF1ZXN0LCBhcmcpLFxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IGEgSlNPTiBSUEMgMi4wIEludmFsaWQgUGFyYW1zICgtMzI2MDIpIGVycm9yLlxuICAgICAgICAgKi9cbiAgICAgICAgaW52YWxpZFBhcmFtczogKGFyZykgPT4gZ2V0RXRoSnNvblJwY0Vycm9yKGVycm9yX2NvbnN0YW50c18xLmVycm9yQ29kZXMucnBjLmludmFsaWRQYXJhbXMsIGFyZyksXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgYSBKU09OIFJQQyAyLjAgTWV0aG9kIE5vdCBGb3VuZCAoLTMyNjAxKSBlcnJvci5cbiAgICAgICAgICovXG4gICAgICAgIG1ldGhvZE5vdEZvdW5kOiAoYXJnKSA9PiBnZXRFdGhKc29uUnBjRXJyb3IoZXJyb3JfY29uc3RhbnRzXzEuZXJyb3JDb2Rlcy5ycGMubWV0aG9kTm90Rm91bmQsIGFyZyksXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgYSBKU09OIFJQQyAyLjAgSW50ZXJuYWwgKC0zMjYwMykgZXJyb3IuXG4gICAgICAgICAqL1xuICAgICAgICBpbnRlcm5hbDogKGFyZykgPT4gZ2V0RXRoSnNvblJwY0Vycm9yKGVycm9yX2NvbnN0YW50c18xLmVycm9yQ29kZXMucnBjLmludGVybmFsLCBhcmcpLFxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IGEgSlNPTiBSUEMgMi4wIFNlcnZlciBlcnJvci5cbiAgICAgICAgICogUGVybWl0cyBpbnRlZ2VyIGVycm9yIGNvZGVzIGluIHRoZSBbIC0zMjA5OSA8PSAtMzIwMDUgXSByYW5nZS5cbiAgICAgICAgICogQ29kZXMgLTMyMDAwIHRocm91Z2ggLTMyMDA0IGFyZSByZXNlcnZlZCBieSBFSVAtMTQ3NC5cbiAgICAgICAgICovXG4gICAgICAgIHNlcnZlcjogKG9wdHMpID0+IHtcbiAgICAgICAgICAgIGlmICghb3B0cyB8fCB0eXBlb2Ygb3B0cyAhPT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheShvcHRzKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXRoZXJldW0gUlBDIFNlcnZlciBlcnJvcnMgbXVzdCBwcm92aWRlIHNpbmdsZSBvYmplY3QgYXJndW1lbnQuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB7IGNvZGUgfSA9IG9wdHM7XG4gICAgICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoY29kZSkgfHwgY29kZSA+IC0zMjAwNSB8fCBjb2RlIDwgLTMyMDk5KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdcImNvZGVcIiBtdXN0IGJlIGFuIGludGVnZXIgc3VjaCB0aGF0OiAtMzIwOTkgPD0gY29kZSA8PSAtMzIwMDUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBnZXRFdGhKc29uUnBjRXJyb3IoY29kZSwgb3B0cyk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgYW4gRXRoZXJldW0gSlNPTiBSUEMgSW52YWxpZCBJbnB1dCAoLTMyMDAwKSBlcnJvci5cbiAgICAgICAgICovXG4gICAgICAgIGludmFsaWRJbnB1dDogKGFyZykgPT4gZ2V0RXRoSnNvblJwY0Vycm9yKGVycm9yX2NvbnN0YW50c18xLmVycm9yQ29kZXMucnBjLmludmFsaWRJbnB1dCwgYXJnKSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCBhbiBFdGhlcmV1bSBKU09OIFJQQyBSZXNvdXJjZSBOb3QgRm91bmQgKC0zMjAwMSkgZXJyb3IuXG4gICAgICAgICAqL1xuICAgICAgICByZXNvdXJjZU5vdEZvdW5kOiAoYXJnKSA9PiBnZXRFdGhKc29uUnBjRXJyb3IoZXJyb3JfY29uc3RhbnRzXzEuZXJyb3JDb2Rlcy5ycGMucmVzb3VyY2VOb3RGb3VuZCwgYXJnKSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCBhbiBFdGhlcmV1bSBKU09OIFJQQyBSZXNvdXJjZSBVbmF2YWlsYWJsZSAoLTMyMDAyKSBlcnJvci5cbiAgICAgICAgICovXG4gICAgICAgIHJlc291cmNlVW5hdmFpbGFibGU6IChhcmcpID0+IGdldEV0aEpzb25ScGNFcnJvcihlcnJvcl9jb25zdGFudHNfMS5lcnJvckNvZGVzLnJwYy5yZXNvdXJjZVVuYXZhaWxhYmxlLCBhcmcpLFxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IGFuIEV0aGVyZXVtIEpTT04gUlBDIFRyYW5zYWN0aW9uIFJlamVjdGVkICgtMzIwMDMpIGVycm9yLlxuICAgICAgICAgKi9cbiAgICAgICAgdHJhbnNhY3Rpb25SZWplY3RlZDogKGFyZykgPT4gZ2V0RXRoSnNvblJwY0Vycm9yKGVycm9yX2NvbnN0YW50c18xLmVycm9yQ29kZXMucnBjLnRyYW5zYWN0aW9uUmVqZWN0ZWQsIGFyZyksXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgYW4gRXRoZXJldW0gSlNPTiBSUEMgTWV0aG9kIE5vdCBTdXBwb3J0ZWQgKC0zMjAwNCkgZXJyb3IuXG4gICAgICAgICAqL1xuICAgICAgICBtZXRob2ROb3RTdXBwb3J0ZWQ6IChhcmcpID0+IGdldEV0aEpzb25ScGNFcnJvcihlcnJvcl9jb25zdGFudHNfMS5lcnJvckNvZGVzLnJwYy5tZXRob2ROb3RTdXBwb3J0ZWQsIGFyZyksXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgYW4gRXRoZXJldW0gSlNPTiBSUEMgTGltaXQgRXhjZWVkZWQgKC0zMjAwNSkgZXJyb3IuXG4gICAgICAgICAqL1xuICAgICAgICBsaW1pdEV4Y2VlZGVkOiAoYXJnKSA9PiBnZXRFdGhKc29uUnBjRXJyb3IoZXJyb3JfY29uc3RhbnRzXzEuZXJyb3JDb2Rlcy5ycGMubGltaXRFeGNlZWRlZCwgYXJnKSxcbiAgICB9LFxuICAgIHByb3ZpZGVyOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgYW4gRXRoZXJldW0gUHJvdmlkZXIgVXNlciBSZWplY3RlZCBSZXF1ZXN0ICg0MDAxKSBlcnJvci5cbiAgICAgICAgICovXG4gICAgICAgIHVzZXJSZWplY3RlZFJlcXVlc3Q6IChhcmcpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBnZXRFdGhQcm92aWRlckVycm9yKGVycm9yX2NvbnN0YW50c18xLmVycm9yQ29kZXMucHJvdmlkZXIudXNlclJlamVjdGVkUmVxdWVzdCwgYXJnKTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCBhbiBFdGhlcmV1bSBQcm92aWRlciBVbmF1dGhvcml6ZWQgKDQxMDApIGVycm9yLlxuICAgICAgICAgKi9cbiAgICAgICAgdW5hdXRob3JpemVkOiAoYXJnKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0RXRoUHJvdmlkZXJFcnJvcihlcnJvcl9jb25zdGFudHNfMS5lcnJvckNvZGVzLnByb3ZpZGVyLnVuYXV0aG9yaXplZCwgYXJnKTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCBhbiBFdGhlcmV1bSBQcm92aWRlciBVbnN1cHBvcnRlZCBNZXRob2QgKDQyMDApIGVycm9yLlxuICAgICAgICAgKi9cbiAgICAgICAgdW5zdXBwb3J0ZWRNZXRob2Q6IChhcmcpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBnZXRFdGhQcm92aWRlckVycm9yKGVycm9yX2NvbnN0YW50c18xLmVycm9yQ29kZXMucHJvdmlkZXIudW5zdXBwb3J0ZWRNZXRob2QsIGFyZyk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgYW4gRXRoZXJldW0gUHJvdmlkZXIgTm90IENvbm5lY3RlZCAoNDkwMCkgZXJyb3IuXG4gICAgICAgICAqL1xuICAgICAgICBkaXNjb25uZWN0ZWQ6IChhcmcpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBnZXRFdGhQcm92aWRlckVycm9yKGVycm9yX2NvbnN0YW50c18xLmVycm9yQ29kZXMucHJvdmlkZXIuZGlzY29ubmVjdGVkLCBhcmcpO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IGFuIEV0aGVyZXVtIFByb3ZpZGVyIENoYWluIE5vdCBDb25uZWN0ZWQgKDQ5MDEpIGVycm9yLlxuICAgICAgICAgKi9cbiAgICAgICAgY2hhaW5EaXNjb25uZWN0ZWQ6IChhcmcpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBnZXRFdGhQcm92aWRlckVycm9yKGVycm9yX2NvbnN0YW50c18xLmVycm9yQ29kZXMucHJvdmlkZXIuY2hhaW5EaXNjb25uZWN0ZWQsIGFyZyk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgYSBjdXN0b20gRXRoZXJldW0gUHJvdmlkZXIgZXJyb3IuXG4gICAgICAgICAqL1xuICAgICAgICBjdXN0b206IChvcHRzKSA9PiB7XG4gICAgICAgICAgICBpZiAoIW9wdHMgfHwgdHlwZW9mIG9wdHMgIT09ICdvYmplY3QnIHx8IEFycmF5LmlzQXJyYXkob3B0cykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V0aGVyZXVtIFByb3ZpZGVyIGN1c3RvbSBlcnJvcnMgbXVzdCBwcm92aWRlIHNpbmdsZSBvYmplY3QgYXJndW1lbnQuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB7IGNvZGUsIG1lc3NhZ2UsIGRhdGEgfSA9IG9wdHM7XG4gICAgICAgICAgICBpZiAoIW1lc3NhZ2UgfHwgdHlwZW9mIG1lc3NhZ2UgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdcIm1lc3NhZ2VcIiBtdXN0IGJlIGEgbm9uZW1wdHkgc3RyaW5nJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IGNsYXNzZXNfMS5FdGhlcmV1bVByb3ZpZGVyRXJyb3IoY29kZSwgbWVzc2FnZSwgZGF0YSk7XG4gICAgICAgIH0sXG4gICAgfSxcbn07XG4vLyBJbnRlcm5hbFxuZnVuY3Rpb24gZ2V0RXRoSnNvblJwY0Vycm9yKGNvZGUsIGFyZykge1xuICAgIGNvbnN0IFttZXNzYWdlLCBkYXRhXSA9IHBhcnNlT3B0cyhhcmcpO1xuICAgIHJldHVybiBuZXcgY2xhc3Nlc18xLkV0aGVyZXVtUnBjRXJyb3IoY29kZSwgbWVzc2FnZSB8fCB1dGlsc18xLmdldE1lc3NhZ2VGcm9tQ29kZShjb2RlKSwgZGF0YSk7XG59XG5mdW5jdGlvbiBnZXRFdGhQcm92aWRlckVycm9yKGNvZGUsIGFyZykge1xuICAgIGNvbnN0IFttZXNzYWdlLCBkYXRhXSA9IHBhcnNlT3B0cyhhcmcpO1xuICAgIHJldHVybiBuZXcgY2xhc3Nlc18xLkV0aGVyZXVtUHJvdmlkZXJFcnJvcihjb2RlLCBtZXNzYWdlIHx8IHV0aWxzXzEuZ2V0TWVzc2FnZUZyb21Db2RlKGNvZGUpLCBkYXRhKTtcbn1cbmZ1bmN0aW9uIHBhcnNlT3B0cyhhcmcpIHtcbiAgICBpZiAoYXJnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYXJnID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIFthcmddO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KGFyZykpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgbWVzc2FnZSwgZGF0YSB9ID0gYXJnO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UgJiYgdHlwZW9mIG1lc3NhZ2UgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNdXN0IHNwZWNpZnkgc3RyaW5nIG1lc3NhZ2UuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW21lc3NhZ2UgfHwgdW5kZWZpbmVkLCBkYXRhXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW107XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2laWEp5YjNKekxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dmMzSmpMMlZ5Y205eWN5NTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenM3UVVGQlFTeDFRMEZCYjBVN1FVRkRjRVVzYlVOQlFUWkRPMEZCUXpkRExIVkVRVUVyUXp0QlFXVnNReXhSUVVGQkxGTkJRVk1zUjBGQlJ6dEpRVU4yUWl4SFFVRkhMRVZCUVVVN1VVRkZTRHM3VjBGRlJ6dFJRVU5JTEV0QlFVc3NSVUZCUlN4RFFVRkpMRWRCUVhGQ0xFVkJRVVVzUlVGQlJTeERRVUZETEd0Q1FVRnJRaXhEUVVOeVJDdzBRa0ZCVlN4RFFVRkRMRWRCUVVjc1EwRkJReXhMUVVGTExFVkJRVVVzUjBGQlJ5eERRVU14UWp0UlFVVkVPenRYUVVWSE8xRkJRMGdzWTBGQll5eEZRVUZGTEVOQlFVa3NSMEZCY1VJc1JVRkJSU3hGUVVGRkxFTkJRVU1zYTBKQlFXdENMRU5CUXpsRUxEUkNRVUZWTEVOQlFVTXNSMEZCUnl4RFFVRkRMR05CUVdNc1JVRkJSU3hIUVVGSExFTkJRMjVETzFGQlJVUTdPMWRCUlVjN1VVRkRTQ3hoUVVGaExFVkJRVVVzUTBGQlNTeEhRVUZ4UWl4RlFVRkZMRVZCUVVVc1EwRkJReXhyUWtGQmEwSXNRMEZETjBRc05FSkJRVlVzUTBGQlF5eEhRVUZITEVOQlFVTXNZVUZCWVN4RlFVRkZMRWRCUVVjc1EwRkRiRU03VVVGRlJEczdWMEZGUnp0UlFVTklMR05CUVdNc1JVRkJSU3hEUVVGSkxFZEJRWEZDTEVWQlFVVXNSVUZCUlN4RFFVRkRMR3RDUVVGclFpeERRVU01UkN3MFFrRkJWU3hEUVVGRExFZEJRVWNzUTBGQlF5eGpRVUZqTEVWQlFVVXNSMEZCUnl4RFFVTnVRenRSUVVWRU96dFhRVVZITzFGQlEwZ3NVVUZCVVN4RlFVRkZMRU5CUVVrc1IwRkJjVUlzUlVGQlJTeEZRVUZGTEVOQlFVTXNhMEpCUVd0Q0xFTkJRM2hFTERSQ1FVRlZMRU5CUVVNc1IwRkJSeXhEUVVGRExGRkJRVkVzUlVGQlJTeEhRVUZITEVOQlF6ZENPMUZCUlVRN096czdWMEZKUnp0UlFVTklMRTFCUVUwc1JVRkJSU3hEUVVGSkxFbEJRVEpDTEVWQlFVVXNSVUZCUlR0WlFVTjZReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEpRVUZKTEU5QlFVOHNTVUZCU1N4TFFVRkxMRkZCUVZFc1NVRkJTU3hMUVVGTExFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZPMmRDUVVNMVJDeE5RVUZOTEVsQlFVa3NTMEZCU3l4RFFVRkRMR2xGUVVGcFJTeERRVUZETEVOQlFVTTdZVUZEY0VZN1dVRkRSQ3hOUVVGTkxFVkJRVVVzU1VGQlNTeEZRVUZGTEVkQlFVY3NTVUZCU1N4RFFVRkRPMWxCUTNSQ0xFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNVMEZCVXl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFbEJRVWtzUjBGQlJ5eERRVUZETEV0QlFVc3NTVUZCU1N4SlFVRkpMRWRCUVVjc1EwRkJReXhMUVVGTExFVkJRVVU3WjBKQlF6ZEVMRTFCUVUwc1NVRkJTU3hMUVVGTExFTkJRMklzSzBSQlFTdEVMRU5CUTJoRkxFTkJRVU03WVVGRFNEdFpRVU5FTEU5QlFVOHNhMEpCUVd0Q0xFTkJRVU1zU1VGQlNTeEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUTNoRExFTkJRVU03VVVGRlJEczdWMEZGUnp0UlFVTklMRmxCUVZrc1JVRkJSU3hEUVVGSkxFZEJRWEZDTEVWQlFVVXNSVUZCUlN4RFFVRkRMR3RDUVVGclFpeERRVU0xUkN3MFFrRkJWU3hEUVVGRExFZEJRVWNzUTBGQlF5eFpRVUZaTEVWQlFVVXNSMEZCUnl4RFFVTnFRenRSUVVWRU96dFhRVVZITzFGQlEwZ3NaMEpCUVdkQ0xFVkJRVVVzUTBGQlNTeEhRVUZ4UWl4RlFVRkZMRVZCUVVVc1EwRkJReXhyUWtGQmEwSXNRMEZEYUVVc05FSkJRVlVzUTBGQlF5eEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFVkJRVVVzUjBGQlJ5eERRVU55UXp0UlFVVkVPenRYUVVWSE8xRkJRMGdzYlVKQlFXMUNMRVZCUVVVc1EwRkJTU3hIUVVGeFFpeEZRVUZGTEVWQlFVVXNRMEZCUXl4clFrRkJhMElzUTBGRGJrVXNORUpCUVZVc1EwRkJReXhIUVVGSExFTkJRVU1zYlVKQlFXMUNMRVZCUVVVc1IwRkJSeXhEUVVONFF6dFJRVVZFT3p0WFFVVkhPMUZCUTBnc2JVSkJRVzFDTEVWQlFVVXNRMEZCU1N4SFFVRnhRaXhGUVVGRkxFVkJRVVVzUTBGQlF5eHJRa0ZCYTBJc1EwRkRia1VzTkVKQlFWVXNRMEZCUXl4SFFVRkhMRU5CUVVNc2JVSkJRVzFDTEVWQlFVVXNSMEZCUnl4RFFVTjRRenRSUVVWRU96dFhRVVZITzFGQlEwZ3NhMEpCUVd0Q0xFVkJRVVVzUTBGQlNTeEhRVUZ4UWl4RlFVRkZMRVZCUVVVc1EwRkJReXhyUWtGQmEwSXNRMEZEYkVVc05FSkJRVlVzUTBGQlF5eEhRVUZITEVOQlFVTXNhMEpCUVd0Q0xFVkJRVVVzUjBGQlJ5eERRVU4yUXp0UlFVVkVPenRYUVVWSE8xRkJRMGdzWVVGQllTeEZRVUZGTEVOQlFVa3NSMEZCY1VJc1JVRkJSU3hGUVVGRkxFTkJRVU1zYTBKQlFXdENMRU5CUXpkRUxEUkNRVUZWTEVOQlFVTXNSMEZCUnl4RFFVRkRMR0ZCUVdFc1JVRkJSU3hIUVVGSExFTkJRMnhETzB0QlEwWTdTVUZGUkN4UlFVRlJMRVZCUVVVN1VVRkZVanM3VjBGRlJ6dFJRVU5JTEcxQ1FVRnRRaXhGUVVGRkxFTkJRVWtzUjBGQmNVSXNSVUZCUlN4RlFVRkZPMWxCUTJoRUxFOUJRVThzYlVKQlFXMUNMRU5CUTNoQ0xEUkNRVUZWTEVOQlFVTXNVVUZCVVN4RFFVRkRMRzFDUVVGdFFpeEZRVUZGTEVkQlFVY3NRMEZETjBNc1EwRkJRenRSUVVOS0xFTkJRVU03VVVGRlJEczdWMEZGUnp0UlFVTklMRmxCUVZrc1JVRkJSU3hEUVVGSkxFZEJRWEZDTEVWQlFVVXNSVUZCUlR0WlFVTjZReXhQUVVGUExHMUNRVUZ0UWl4RFFVTjRRaXcwUWtGQlZTeERRVUZETEZGQlFWRXNRMEZCUXl4WlFVRlpMRVZCUVVVc1IwRkJSeXhEUVVOMFF5eERRVUZETzFGQlEwb3NRMEZCUXp0UlFVVkVPenRYUVVWSE8xRkJRMGdzYVVKQlFXbENMRVZCUVVVc1EwRkJTU3hIUVVGeFFpeEZRVUZGTEVWQlFVVTdXVUZET1VNc1QwRkJUeXh0UWtGQmJVSXNRMEZEZUVJc05FSkJRVlVzUTBGQlF5eFJRVUZSTEVOQlFVTXNhVUpCUVdsQ0xFVkJRVVVzUjBGQlJ5eERRVU16UXl4RFFVRkRPMUZCUTBvc1EwRkJRenRSUVVWRU96dFhRVVZITzFGQlEwZ3NXVUZCV1N4RlFVRkZMRU5CUVVrc1IwRkJjVUlzUlVGQlJTeEZRVUZGTzFsQlEzcERMRTlCUVU4c2JVSkJRVzFDTEVOQlEzaENMRFJDUVVGVkxFTkJRVU1zVVVGQlVTeERRVUZETEZsQlFWa3NSVUZCUlN4SFFVRkhMRU5CUTNSRExFTkJRVU03VVVGRFNpeERRVUZETzFGQlJVUTdPMWRCUlVjN1VVRkRTQ3hwUWtGQmFVSXNSVUZCUlN4RFFVRkpMRWRCUVhGQ0xFVkJRVVVzUlVGQlJUdFpRVU01UXl4UFFVRlBMRzFDUVVGdFFpeERRVU40UWl3MFFrRkJWU3hEUVVGRExGRkJRVkVzUTBGQlF5eHBRa0ZCYVVJc1JVRkJSU3hIUVVGSExFTkJRek5ETEVOQlFVTTdVVUZEU2l4RFFVRkRPMUZCUlVRN08xZEJSVWM3VVVGRFNDeE5RVUZOTEVWQlFVVXNRMEZCU1N4SlFVRjFRaXhGUVVGRkxFVkJRVVU3V1VGRGNrTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1NVRkJTU3hQUVVGUExFbEJRVWtzUzBGQlN5eFJRVUZSTEVsQlFVa3NTMEZCU3l4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJUdG5Ra0ZETlVRc1RVRkJUU3hKUVVGSkxFdEJRVXNzUTBGQlF5eHpSVUZCYzBVc1EwRkJReXhEUVVGRE8yRkJRM3BHTzFsQlJVUXNUVUZCVFN4RlFVRkZMRWxCUVVrc1JVRkJSU3hQUVVGUExFVkJRVVVzU1VGQlNTeEZRVUZGTEVkQlFVY3NTVUZCU1N4RFFVRkRPMWxCUlhKRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVsQlFVa3NUMEZCVHl4UFFVRlBMRXRCUVVzc1VVRkJVU3hGUVVGRk8yZENRVU16UXl4TlFVRk5MRWxCUVVrc1MwRkJTeXhEUVVOaUxIRkRRVUZ4UXl4RFFVTjBReXhEUVVGRE8yRkJRMGc3V1VGRFJDeFBRVUZQTEVsQlFVa3NLMEpCUVhGQ0xFTkJRVU1zU1VGQlNTeEZRVUZGTEU5QlFVOHNSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVONFJDeERRVUZETzB0QlEwWTdRMEZEUml4RFFVRkRPMEZCUlVZc1YwRkJWenRCUVVWWUxGTkJRVk1zYTBKQlFXdENMRU5CUVVrc1NVRkJXU3hGUVVGRkxFZEJRWEZDTzBsQlEyaEZMRTFCUVUwc1EwRkJReXhQUVVGUExFVkJRVVVzU1VGQlNTeERRVUZETEVkQlFVY3NVMEZCVXl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8wbEJRM1pETEU5QlFVOHNTVUZCU1N3d1FrRkJaMElzUTBGRGVrSXNTVUZCU1N4RlFVTktMRTlCUVU4c1NVRkJTU3d3UWtGQmEwSXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkRia01zU1VGQlNTeERRVU5NTEVOQlFVTTdRVUZEU2l4RFFVRkRPMEZCUlVRc1UwRkJVeXh0UWtGQmJVSXNRMEZCU1N4SlFVRlpMRVZCUVVVc1IwRkJjVUk3U1VGRGFrVXNUVUZCVFN4RFFVRkRMRTlCUVU4c1JVRkJSU3hKUVVGSkxFTkJRVU1zUjBGQlJ5eFRRVUZUTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1NVRkRka01zVDBGQlR5eEpRVUZKTEN0Q1FVRnhRaXhEUVVNNVFpeEpRVUZKTEVWQlEwb3NUMEZCVHl4SlFVRkpMREJDUVVGclFpeERRVUZETEVsQlFVa3NRMEZCUXl4RlFVTnVReXhKUVVGSkxFTkJRMHdzUTBGQlF6dEJRVU5LTEVOQlFVTTdRVUZGUkN4VFFVRlRMRk5CUVZNc1EwRkJTU3hIUVVGeFFqdEpRVU42UXl4SlFVRkpMRWRCUVVjc1JVRkJSVHRSUVVOUUxFbEJRVWtzVDBGQlR5eEhRVUZITEV0QlFVc3NVVUZCVVN4RlFVRkZPMWxCUXpOQ0xFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0VFFVTmtPMkZCUVUwc1NVRkJTU3hQUVVGUExFZEJRVWNzUzBGQlN5eFJRVUZSTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eEZRVUZGTzFsQlEzcEVMRTFCUVUwc1JVRkJSU3hQUVVGUExFVkJRVVVzU1VGQlNTeEZRVUZGTEVkQlFVY3NSMEZCUnl4RFFVRkRPMWxCUlRsQ0xFbEJRVWtzVDBGQlR5eEpRVUZKTEU5QlFVOHNUMEZCVHl4TFFVRkxMRkZCUVZFc1JVRkJSVHRuUWtGRE1VTXNUVUZCVFN4SlFVRkpMRXRCUVVzc1EwRkJReXc0UWtGQk9FSXNRMEZCUXl4RFFVRkRPMkZCUTJwRU8xbEJRMFFzVDBGQlR5eERRVUZETEU5QlFVOHNTVUZCU1N4VFFVRlRMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03VTBGRGNrTTdTMEZEUmp0SlFVTkVMRTlCUVU4c1JVRkJSU3hEUVVGRE8wRkJRMW9zUTBGQlF5SjkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0TWVzc2FnZUZyb21Db2RlID0gZXhwb3J0cy5zZXJpYWxpemVFcnJvciA9IGV4cG9ydHMuRXRoZXJldW1Qcm92aWRlckVycm9yID0gZXhwb3J0cy5FdGhlcmV1bVJwY0Vycm9yID0gZXhwb3J0cy5ldGhFcnJvcnMgPSBleHBvcnRzLmVycm9yQ29kZXMgPSB2b2lkIDA7XG5jb25zdCBjbGFzc2VzXzEgPSByZXF1aXJlKFwiLi9jbGFzc2VzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiRXRoZXJldW1ScGNFcnJvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY2xhc3Nlc18xLkV0aGVyZXVtUnBjRXJyb3I7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJFdGhlcmV1bVByb3ZpZGVyRXJyb3JcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNsYXNzZXNfMS5FdGhlcmV1bVByb3ZpZGVyRXJyb3I7IH0gfSk7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzZXJpYWxpemVFcnJvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdXRpbHNfMS5zZXJpYWxpemVFcnJvcjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImdldE1lc3NhZ2VGcm9tQ29kZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdXRpbHNfMS5nZXRNZXNzYWdlRnJvbUNvZGU7IH0gfSk7XG5jb25zdCBlcnJvcnNfMSA9IHJlcXVpcmUoXCIuL2Vycm9yc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImV0aEVycm9yc1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZXJyb3JzXzEuZXRoRXJyb3JzOyB9IH0pO1xuY29uc3QgZXJyb3JfY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi9lcnJvci1jb25zdGFudHNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJlcnJvckNvZGVzXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBlcnJvcl9jb25zdGFudHNfMS5lcnJvckNvZGVzOyB9IH0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYVc1a1pYZ3Vhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXpjbU12YVc1a1pYZ3VkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3TzBGQlFVRXNkVU5CUVc5Rk8wRkJWV3hGTEdsSFFWWlBMREJDUVVGblFpeFBRVlZRTzBGQlEyaENMSE5IUVZoNVFpd3JRa0ZCY1VJc1QwRlhla0k3UVVGV2RrSXNiVU5CUldsQ08wRkJVMllzSzBaQlZrRXNjMEpCUVdNc1QwRlZRVHRCUVVOa0xHMUhRVmhuUWl3d1FrRkJhMElzVDBGWGFFSTdRVUZVY0VJc2NVTkJRWEZETzBGQlMyNURMREJHUVV4UExHdENRVUZUTEU5QlMxQTdRVUZLV0N4MVJFRkJLME03UVVGSE4wTXNNa1pCU0U4c05FSkJRVlVzVDBGSFVDSjkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2VyaWFsaXplRXJyb3IgPSBleHBvcnRzLmlzVmFsaWRDb2RlID0gZXhwb3J0cy5nZXRNZXNzYWdlRnJvbUNvZGUgPSBleHBvcnRzLkpTT05fUlBDX1NFUlZFUl9FUlJPUl9NRVNTQUdFID0gdm9pZCAwO1xuY29uc3QgZXJyb3JfY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi9lcnJvci1jb25zdGFudHNcIik7XG5jb25zdCBjbGFzc2VzXzEgPSByZXF1aXJlKFwiLi9jbGFzc2VzXCIpO1xuY29uc3QgRkFMTEJBQ0tfRVJST1JfQ09ERSA9IGVycm9yX2NvbnN0YW50c18xLmVycm9yQ29kZXMucnBjLmludGVybmFsO1xuY29uc3QgRkFMTEJBQ0tfTUVTU0FHRSA9ICdVbnNwZWNpZmllZCBlcnJvciBtZXNzYWdlLiBUaGlzIGlzIGEgYnVnLCBwbGVhc2UgcmVwb3J0IGl0Lic7XG5jb25zdCBGQUxMQkFDS19FUlJPUiA9IHtcbiAgICBjb2RlOiBGQUxMQkFDS19FUlJPUl9DT0RFLFxuICAgIG1lc3NhZ2U6IGdldE1lc3NhZ2VGcm9tQ29kZShGQUxMQkFDS19FUlJPUl9DT0RFKSxcbn07XG5leHBvcnRzLkpTT05fUlBDX1NFUlZFUl9FUlJPUl9NRVNTQUdFID0gJ1Vuc3BlY2lmaWVkIHNlcnZlciBlcnJvci4nO1xuLyoqXG4gKiBHZXRzIHRoZSBtZXNzYWdlIGZvciBhIGdpdmVuIGNvZGUsIG9yIGEgZmFsbGJhY2sgbWVzc2FnZSBpZiB0aGUgY29kZSBoYXNcbiAqIG5vIGNvcnJlc3BvbmRpbmcgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWVzc2FnZUZyb21Db2RlKGNvZGUsIGZhbGxiYWNrTWVzc2FnZSA9IEZBTExCQUNLX01FU1NBR0UpIHtcbiAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihjb2RlKSkge1xuICAgICAgICBjb25zdCBjb2RlU3RyaW5nID0gY29kZS50b1N0cmluZygpO1xuICAgICAgICBpZiAoaGFzS2V5KGVycm9yX2NvbnN0YW50c18xLmVycm9yVmFsdWVzLCBjb2RlU3RyaW5nKSkge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yX2NvbnN0YW50c18xLmVycm9yVmFsdWVzW2NvZGVTdHJpbmddLm1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzSnNvblJwY1NlcnZlckVycm9yKGNvZGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZXhwb3J0cy5KU09OX1JQQ19TRVJWRVJfRVJST1JfTUVTU0FHRTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsbGJhY2tNZXNzYWdlO1xufVxuZXhwb3J0cy5nZXRNZXNzYWdlRnJvbUNvZGUgPSBnZXRNZXNzYWdlRnJvbUNvZGU7XG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgZ2l2ZW4gY29kZSBpcyB2YWxpZC5cbiAqIEEgY29kZSBpcyBvbmx5IHZhbGlkIGlmIGl0IGhhcyBhIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIGlzVmFsaWRDb2RlKGNvZGUpIHtcbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoY29kZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBjb2RlU3RyaW5nID0gY29kZS50b1N0cmluZygpO1xuICAgIGlmIChlcnJvcl9jb25zdGFudHNfMS5lcnJvclZhbHVlc1tjb2RlU3RyaW5nXSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGlzSnNvblJwY1NlcnZlckVycm9yKGNvZGUpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5leHBvcnRzLmlzVmFsaWRDb2RlID0gaXNWYWxpZENvZGU7XG4vKipcbiAqIFNlcmlhbGl6ZXMgdGhlIGdpdmVuIGVycm9yIHRvIGFuIEV0aGVyZXVtIEpTT04gUlBDLWNvbXBhdGlibGUgZXJyb3Igb2JqZWN0LlxuICogTWVyZWx5IGNvcGllcyB0aGUgZ2l2ZW4gZXJyb3IncyB2YWx1ZXMgaWYgaXQgaXMgYWxyZWFkeSBjb21wYXRpYmxlLlxuICogSWYgdGhlIGdpdmVuIGVycm9yIGlzIG5vdCBmdWxseSBjb21wYXRpYmxlLCBpdCB3aWxsIGJlIHByZXNlcnZlZCBvbiB0aGVcbiAqIHJldHVybmVkIG9iamVjdCdzIGRhdGEub3JpZ2luYWxFcnJvciBwcm9wZXJ0eS5cbiAqL1xuZnVuY3Rpb24gc2VyaWFsaXplRXJyb3IoZXJyb3IsIHsgZmFsbGJhY2tFcnJvciA9IEZBTExCQUNLX0VSUk9SLCBzaG91bGRJbmNsdWRlU3RhY2sgPSBmYWxzZSwgfSA9IHt9KSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBpZiAoIWZhbGxiYWNrRXJyb3IgfHxcbiAgICAgICAgIU51bWJlci5pc0ludGVnZXIoZmFsbGJhY2tFcnJvci5jb2RlKSB8fFxuICAgICAgICB0eXBlb2YgZmFsbGJhY2tFcnJvci5tZXNzYWdlICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBmYWxsYmFjayBlcnJvciB3aXRoIGludGVnZXIgbnVtYmVyIGNvZGUgYW5kIHN0cmluZyBtZXNzYWdlLicpO1xuICAgIH1cbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBjbGFzc2VzXzEuRXRoZXJldW1ScGNFcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3Iuc2VyaWFsaXplKCk7XG4gICAgfVxuICAgIGNvbnN0IHNlcmlhbGl6ZWQgPSB7fTtcbiAgICBpZiAoZXJyb3IgJiZcbiAgICAgICAgdHlwZW9mIGVycm9yID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAhQXJyYXkuaXNBcnJheShlcnJvcikgJiZcbiAgICAgICAgaGFzS2V5KGVycm9yLCAnY29kZScpICYmXG4gICAgICAgIGlzVmFsaWRDb2RlKGVycm9yLmNvZGUpKSB7XG4gICAgICAgIGNvbnN0IF9lcnJvciA9IGVycm9yO1xuICAgICAgICBzZXJpYWxpemVkLmNvZGUgPSBfZXJyb3IuY29kZTtcbiAgICAgICAgaWYgKF9lcnJvci5tZXNzYWdlICYmIHR5cGVvZiBfZXJyb3IubWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHNlcmlhbGl6ZWQubWVzc2FnZSA9IF9lcnJvci5tZXNzYWdlO1xuICAgICAgICAgICAgaWYgKGhhc0tleShfZXJyb3IsICdkYXRhJykpIHtcbiAgICAgICAgICAgICAgICBzZXJpYWxpemVkLmRhdGEgPSBfZXJyb3IuZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlcmlhbGl6ZWQubWVzc2FnZSA9IGdldE1lc3NhZ2VGcm9tQ29kZShzZXJpYWxpemVkLmNvZGUpO1xuICAgICAgICAgICAgc2VyaWFsaXplZC5kYXRhID0geyBvcmlnaW5hbEVycm9yOiBhc3NpZ25PcmlnaW5hbEVycm9yKGVycm9yKSB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzZXJpYWxpemVkLmNvZGUgPSBmYWxsYmFja0Vycm9yLmNvZGU7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSAoX2EgPSBlcnJvcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1lc3NhZ2U7XG4gICAgICAgIHNlcmlhbGl6ZWQubWVzc2FnZSA9IChtZXNzYWdlICYmIHR5cGVvZiBtZXNzYWdlID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgPyBtZXNzYWdlXG4gICAgICAgICAgICA6IGZhbGxiYWNrRXJyb3IubWVzc2FnZSk7XG4gICAgICAgIHNlcmlhbGl6ZWQuZGF0YSA9IHsgb3JpZ2luYWxFcnJvcjogYXNzaWduT3JpZ2luYWxFcnJvcihlcnJvcikgfTtcbiAgICB9XG4gICAgY29uc3Qgc3RhY2sgPSAoX2IgPSBlcnJvcikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnN0YWNrO1xuICAgIGlmIChzaG91bGRJbmNsdWRlU3RhY2sgJiYgZXJyb3IgJiYgc3RhY2sgJiYgdHlwZW9mIHN0YWNrID09PSAnc3RyaW5nJykge1xuICAgICAgICBzZXJpYWxpemVkLnN0YWNrID0gc3RhY2s7XG4gICAgfVxuICAgIHJldHVybiBzZXJpYWxpemVkO1xufVxuZXhwb3J0cy5zZXJpYWxpemVFcnJvciA9IHNlcmlhbGl6ZUVycm9yO1xuLy8gSW50ZXJuYWxcbmZ1bmN0aW9uIGlzSnNvblJwY1NlcnZlckVycm9yKGNvZGUpIHtcbiAgICByZXR1cm4gY29kZSA+PSAtMzIwOTkgJiYgY29kZSA8PSAtMzIwMDA7XG59XG5mdW5jdGlvbiBhc3NpZ25PcmlnaW5hbEVycm9yKGVycm9yKSB7XG4gICAgaWYgKGVycm9yICYmIHR5cGVvZiBlcnJvciA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoZXJyb3IpKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBlcnJvcik7XG4gICAgfVxuICAgIHJldHVybiBlcnJvcjtcbn1cbmZ1bmN0aW9uIGhhc0tleShvYmosIGtleSkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pZFhScGJITXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXpjbU12ZFhScGJITXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3TzBGQlFVRXNkVVJCUVRSRU8wRkJRelZFTEhWRFFVRjVSVHRCUVVWNlJTeE5RVUZOTEcxQ1FVRnRRaXhIUVVGSExEUkNRVUZWTEVOQlFVTXNSMEZCUnl4RFFVRkRMRkZCUVZFc1EwRkJRenRCUVVOd1JDeE5RVUZOTEdkQ1FVRm5RaXhIUVVGSExEWkVRVUUyUkN4RFFVRkRPMEZCUTNaR0xFMUJRVTBzWTBGQll5eEhRVUVyUWp0SlFVTnFSQ3hKUVVGSkxFVkJRVVVzYlVKQlFXMUNPMGxCUTNwQ0xFOUJRVThzUlVGQlJTeHJRa0ZCYTBJc1EwRkJReXh0UWtGQmJVSXNRMEZCUXp0RFFVTnFSQ3hEUVVGRE8wRkJSVmNzVVVGQlFTdzJRa0ZCTmtJc1IwRkJSeXd5UWtGQk1rSXNRMEZCUXp0QlFVbDZSVHM3TzBkQlIwYzdRVUZEU0N4VFFVRm5RaXhyUWtGQmEwSXNRMEZEYUVNc1NVRkJXU3hGUVVOYUxHdENRVUV3UWl4blFrRkJaMEk3U1VGRk1VTXNTVUZCU1N4TlFVRk5MRU5CUVVNc1UwRkJVeXhEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZGTzFGQlF6RkNMRTFCUVUwc1ZVRkJWU3hIUVVGSExFbEJRVWtzUTBGQlF5eFJRVUZSTEVWQlFVVXNRMEZCUXp0UlFVVnVReXhKUVVGSkxFMUJRVTBzUTBGQlF5dzJRa0ZCVnl4RlFVRkZMRlZCUVZVc1EwRkJReXhGUVVGRk8xbEJRMjVETEU5QlFVOHNOa0pCUVZjc1EwRkJReXhWUVVFeVFpeERRVUZETEVOQlFVTXNUMEZCVHl4RFFVRkRPMU5CUTNwRU8xRkJRMFFzU1VGQlNTeHZRa0ZCYjBJc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJUdFpRVU01UWl4UFFVRlBMSEZEUVVFMlFpeERRVUZETzFOQlEzUkRPMHRCUTBZN1NVRkRSQ3hQUVVGUExHVkJRV1VzUTBGQlF6dEJRVU42UWl4RFFVRkRPMEZCWmtRc1owUkJaVU03UVVGRlJEczdPMGRCUjBjN1FVRkRTQ3hUUVVGblFpeFhRVUZYTEVOQlFVTXNTVUZCV1R0SlFVTjBReXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEZOQlFWTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSVHRSUVVNelFpeFBRVUZQTEV0QlFVc3NRMEZCUXp0TFFVTmtPMGxCUlVRc1RVRkJUU3hWUVVGVkxFZEJRVWNzU1VGQlNTeERRVUZETEZGQlFWRXNSVUZCUlN4RFFVRkRPMGxCUTI1RExFbEJRVWtzTmtKQlFWY3NRMEZCUXl4VlFVRXlRaXhEUVVGRExFVkJRVVU3VVVGRE5VTXNUMEZCVHl4SlFVRkpMRU5CUVVNN1MwRkRZanRKUVVWRUxFbEJRVWtzYjBKQlFXOUNMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVU3VVVGRE9VSXNUMEZCVHl4SlFVRkpMRU5CUVVNN1MwRkRZanRKUVVORUxFOUJRVThzUzBGQlN5eERRVUZETzBGQlEyWXNRMEZCUXp0QlFXUkVMR3REUVdORE8wRkJSVVE3T3pzN08wZEJTMGM3UVVGRFNDeFRRVUZuUWl4alFVRmpMRU5CUXpWQ0xFdEJRV01zUlVGRFpDeEZRVU5GTEdGQlFXRXNSMEZCUnl4alFVRmpMRVZCUXpsQ0xHdENRVUZyUWl4SFFVRkhMRXRCUVVzc1IwRkRNMElzUjBGQlJ5eEZRVUZGT3p0SlFVZE9MRWxCUTBVc1EwRkJReXhoUVVGaE8xRkJRMlFzUTBGQlF5eE5RVUZOTEVOQlFVTXNVMEZCVXl4RFFVRkRMR0ZCUVdFc1EwRkJReXhKUVVGSkxFTkJRVU03VVVGRGNrTXNUMEZCVHl4aFFVRmhMRU5CUVVNc1QwRkJUeXhMUVVGTExGRkJRVkVzUlVGRGVrTTdVVUZEUVN4TlFVRk5MRWxCUVVrc1MwRkJTeXhEUVVOaUxEQkZRVUV3UlN4RFFVTXpSU3hEUVVGRE8wdEJRMGc3U1VGRlJDeEpRVUZKTEV0QlFVc3NXVUZCV1N3d1FrRkJaMElzUlVGQlJUdFJRVU55UXl4UFFVRlBMRXRCUVVzc1EwRkJReXhUUVVGVExFVkJRVVVzUTBGQlF6dExRVU14UWp0SlFVVkVMRTFCUVUwc1ZVRkJWU3hIUVVGM1F5eEZRVUZGTEVOQlFVTTdTVUZGTTBRc1NVRkRSU3hMUVVGTE8xRkJRMHdzVDBGQlR5eExRVUZMTEV0QlFVc3NVVUZCVVR0UlFVTjZRaXhEUVVGRExFdEJRVXNzUTBGQlF5eFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVRkRPMUZCUTNKQ0xFMUJRVTBzUTBGQlF5eExRVUZuUXl4RlFVRkZMRTFCUVUwc1EwRkJRenRSUVVOb1JDeFhRVUZYTEVOQlFVVXNTMEZCYjBNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGRGRrUTdVVUZEUVN4TlFVRk5MRTFCUVUwc1IwRkJSeXhMUVVFMFF5eERRVUZETzFGQlF6VkVMRlZCUVZVc1EwRkJReXhKUVVGSkxFZEJRVWNzVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXp0UlFVVTVRaXhKUVVGSkxFMUJRVTBzUTBGQlF5eFBRVUZQTEVsQlFVa3NUMEZCVHl4TlFVRk5MRU5CUVVNc1QwRkJUeXhMUVVGTExGRkJRVkVzUlVGQlJUdFpRVU40UkN4VlFVRlZMRU5CUVVNc1QwRkJUeXhIUVVGSExFMUJRVTBzUTBGQlF5eFBRVUZQTEVOQlFVTTdXVUZGY0VNc1NVRkJTU3hOUVVGTkxFTkJRVU1zVFVGQlRTeEZRVUZGTEUxQlFVMHNRMEZCUXl4RlFVRkZPMmRDUVVNeFFpeFZRVUZWTEVOQlFVTXNTVUZCU1N4SFFVRkhMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU03WVVGREwwSTdVMEZEUmp0aFFVRk5PMWxCUTB3c1ZVRkJWU3hEUVVGRExFOUJRVThzUjBGQlJ5eHJRa0ZCYTBJc1EwRkRjRU1zVlVGQmVVTXNRMEZCUXl4SlFVRkpMRU5CUTJoRUxFTkJRVU03V1VGRlJpeFZRVUZWTEVOQlFVTXNTVUZCU1N4SFFVRkhMRVZCUVVVc1lVRkJZU3hGUVVGRkxHMUNRVUZ0UWl4RFFVRkRMRXRCUVVzc1EwRkJReXhGUVVGRkxFTkJRVU03VTBGRGFrVTdTMEZEUmp0VFFVRk5PMUZCUTB3c1ZVRkJWU3hEUVVGRExFbEJRVWtzUjBGQlJ5eGhRVUZoTEVOQlFVTXNTVUZCU1N4RFFVRkRPMUZCUlhKRExFMUJRVTBzVDBGQlR5eFRRVUZKTEV0QlFXRXNNRU5CUVVVc1QwRkJUeXhEUVVGRE8xRkJSWGhETEZWQlFWVXNRMEZCUXl4UFFVRlBMRWRCUVVjc1EwRkRia0lzVDBGQlR5eEpRVUZKTEU5QlFVOHNUMEZCVHl4TFFVRkxMRkZCUVZFN1dVRkRjRU1zUTBGQlF5eERRVUZETEU5QlFVODdXVUZEVkN4RFFVRkRMRU5CUVVNc1lVRkJZU3hEUVVGRExFOUJRVThzUTBGRE1VSXNRMEZCUXp0UlFVTkdMRlZCUVZVc1EwRkJReXhKUVVGSkxFZEJRVWNzUlVGQlJTeGhRVUZoTEVWQlFVVXNiVUpCUVcxQ0xFTkJRVU1zUzBGQlN5eERRVUZETEVWQlFVVXNRMEZCUXp0TFFVTnFSVHRKUVVWRUxFMUJRVTBzUzBGQlN5eFRRVUZKTEV0QlFXRXNNRU5CUVVVc1MwRkJTeXhEUVVGRE8wbEJSWEJETEVsQlFVa3NhMEpCUVd0Q0xFbEJRVWtzUzBGQlN5eEpRVUZKTEV0QlFVc3NTVUZCU1N4UFFVRlBMRXRCUVVzc1MwRkJTeXhSUVVGUkxFVkJRVVU3VVVGRGNrVXNWVUZCVlN4RFFVRkRMRXRCUVVzc1IwRkJSeXhMUVVGTExFTkJRVU03UzBGRE1VSTdTVUZEUkN4UFFVRlBMRlZCUVhkRExFTkJRVU03UVVGRGJFUXNRMEZCUXp0QlFXeEZSQ3gzUTBGclJVTTdRVUZGUkN4WFFVRlhPMEZCUlZnc1UwRkJVeXh2UWtGQmIwSXNRMEZCUXl4SlFVRlpPMGxCUTNoRExFOUJRVThzU1VGQlNTeEpRVUZKTEVOQlFVTXNTMEZCU3l4SlFVRkpMRWxCUVVrc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF6dEJRVU14UXl4RFFVRkRPMEZCUlVRc1UwRkJVeXh0UWtGQmJVSXNRMEZCUXl4TFFVRmpPMGxCUTNwRExFbEJRVWtzUzBGQlN5eEpRVUZKTEU5QlFVOHNTMEZCU3l4TFFVRkxMRkZCUVZFc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVRkRMRVZCUVVVN1VVRkRMMFFzVDBGQlR5eE5RVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRVZCUVVVc1JVRkJSU3hMUVVGTExFTkJRVU1zUTBGQlF6dExRVU5xUXp0SlFVTkVMRTlCUVU4c1MwRkJTeXhEUVVGRE8wRkJRMllzUTBGQlF6dEJRVVZFTEZOQlFWTXNUVUZCVFN4RFFVRkRMRWRCUVRSQ0xFVkJRVVVzUjBGQlZ6dEpRVU4yUkN4UFFVRlBMRTFCUVUwc1EwRkJReXhUUVVGVExFTkJRVU1zWTBGQll5eERRVUZETEVsQlFVa3NRMEZCUXl4SFFVRkhMRVZCUVVVc1IwRkJSeXhEUVVGRExFTkJRVU03UVVGRGVFUXNRMEZCUXlKOSIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnID8gUmVmbGVjdCA6IG51bGxcbnZhciBSZWZsZWN0QXBwbHkgPSBSICYmIHR5cGVvZiBSLmFwcGx5ID09PSAnZnVuY3Rpb24nXG4gID8gUi5hcHBseVxuICA6IGZ1bmN0aW9uIFJlZmxlY3RBcHBseSh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpO1xuICB9XG5cbnZhciBSZWZsZWN0T3duS2V5c1xuaWYgKFIgJiYgdHlwZW9mIFIub3duS2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICBSZWZsZWN0T3duS2V5cyA9IFIub3duS2V5c1xufSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcbiAgICAgIC5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFByb2Nlc3NFbWl0V2FybmluZyh3YXJuaW5nKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKHdhcm5pbmcpO1xufVxuXG52YXIgTnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gTnVtYmVySXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5tb2R1bGUuZXhwb3J0cy5vbmNlID0gb25jZTtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHNDb3VudCA9IDA7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbmZ1bmN0aW9uIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIGlmICh0aGlzLl9ldmVudHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVySXNOYU4obikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBuICsgJy4nKTtcbiAgfVxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIF9nZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuIF9nZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMClcbiAgICAgIGVyID0gYXJnc1swXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgLy8gTm90ZTogVGhlIGNvbW1lbnRzIG9uIHRoZSBgdGhyb3dgIGxpbmVzIGFyZSBpbnRlbnRpb25hbCwgdGhleSBzaG93XG4gICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB9IGVsc2UgaWYgKHByZXBlbmQpIHtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIG0gPSBfZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgIC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyBTdHJpbmcodHlwZSkgKyAnIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0Jyk7XG4gICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgUHJvY2Vzc0VtaXRXYXJuaW5nKHcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIGlmICghdGhpcy5maXJlZCkge1xuICAgIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy53cmFwRm4pO1xuICAgIHRoaXMuZmlyZWQgPSB0cnVlO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCk7XG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuYXBwbHkodGhpcy50YXJnZXQsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX29uY2VXcmFwKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIHN0YXRlID0geyBmaXJlZDogZmFsc2UsIHdyYXBGbjogdW5kZWZpbmVkLCB0YXJnZXQ6IHRhcmdldCwgdHlwZTogdHlwZSwgbGlzdGVuZXI6IGxpc3RlbmVyIH07XG4gIHZhciB3cmFwcGVkID0gb25jZVdyYXBwZXIuYmluZChzdGF0ZSk7XG4gIHdyYXBwZWQubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgc3RhdGUud3JhcEZuID0gd3JhcHBlZDtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gIHRoaXMub24odHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kT25jZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID9cbiAgICB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcikgOiBhcnJheUNsb25lKGV2bGlzdGVuZXIsIGV2bGlzdGVuZXIubGVuZ3RoKTtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCB0cnVlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmF3TGlzdGVuZXJzID0gZnVuY3Rpb24gcmF3TGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0T3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspXG4gICAgbGlzdFtpbmRleF0gPSBsaXN0W2luZGV4ICsgMV07XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIG9uY2UoZW1pdHRlciwgbmFtZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGZ1bmN0aW9uIGVycm9yTGlzdGVuZXIoZXJyKSB7XG4gICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKG5hbWUsIHJlc29sdmVyKTtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc29sdmVyKCkge1xuICAgICAgaWYgKHR5cGVvZiBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICByZXNvbHZlKFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgfTtcblxuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCByZXNvbHZlciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIGlmIChuYW1lICE9PSAnZXJyb3InKSB7XG4gICAgICBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBlcnJvckxpc3RlbmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgaGFuZGxlciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsICdlcnJvcicsIGhhbmRsZXIsIGZsYWdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgbGlzdGVuZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICBlbWl0dGVyLm9uY2UobmFtZSwgbGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbWl0dGVyLm9uKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIEV2ZW50VGFyZ2V0IGRvZXMgbm90IGhhdmUgYGVycm9yYCBldmVudCBzZW1hbnRpY3MgbGlrZSBOb2RlXG4gICAgLy8gRXZlbnRFbWl0dGVycywgd2UgZG8gbm90IGxpc3RlbiBmb3IgYGVycm9yYCBldmVudHMgaGVyZS5cbiAgICBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZnVuY3Rpb24gd3JhcExpc3RlbmVyKGFyZykge1xuICAgICAgLy8gSUUgZG9lcyBub3QgaGF2ZSBidWlsdGluIGB7IG9uY2U6IHRydWUgfWAgc3VwcG9ydCBzbyB3ZVxuICAgICAgLy8gaGF2ZSB0byBkbyBpdCBtYW51YWxseS5cbiAgICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCB3cmFwTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgbGlzdGVuZXIoYXJnKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJlbWl0dGVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEV2ZW50RW1pdHRlci4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGVtaXR0ZXIpO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHN0cmluZ2lmeVxuc3RyaW5naWZ5LmRlZmF1bHQgPSBzdHJpbmdpZnlcbnN0cmluZ2lmeS5zdGFibGUgPSBkZXRlcm1pbmlzdGljU3RyaW5naWZ5XG5zdHJpbmdpZnkuc3RhYmxlU3RyaW5naWZ5ID0gZGV0ZXJtaW5pc3RpY1N0cmluZ2lmeVxuXG52YXIgTElNSVRfUkVQTEFDRV9OT0RFID0gJ1suLi5dJ1xudmFyIENJUkNVTEFSX1JFUExBQ0VfTk9ERSA9ICdbQ2lyY3VsYXJdJ1xuXG52YXIgYXJyID0gW11cbnZhciByZXBsYWNlclN0YWNrID0gW11cblxuZnVuY3Rpb24gZGVmYXVsdE9wdGlvbnMgKCkge1xuICByZXR1cm4ge1xuICAgIGRlcHRoTGltaXQ6IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSLFxuICAgIGVkZ2VzTGltaXQ6IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSXG4gIH1cbn1cblxuLy8gUmVndWxhciBzdHJpbmdpZnlcbmZ1bmN0aW9uIHN0cmluZ2lmeSAob2JqLCByZXBsYWNlciwgc3BhY2VyLCBvcHRpb25zKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBvcHRpb25zID0gZGVmYXVsdE9wdGlvbnMoKVxuICB9XG5cbiAgZGVjaXJjKG9iaiwgJycsIDAsIFtdLCB1bmRlZmluZWQsIDAsIG9wdGlvbnMpXG4gIHZhciByZXNcbiAgdHJ5IHtcbiAgICBpZiAocmVwbGFjZXJTdGFjay5sZW5ndGggPT09IDApIHtcbiAgICAgIHJlcyA9IEpTT04uc3RyaW5naWZ5KG9iaiwgcmVwbGFjZXIsIHNwYWNlcilcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzID0gSlNPTi5zdHJpbmdpZnkob2JqLCByZXBsYWNlR2V0dGVyVmFsdWVzKHJlcGxhY2VyKSwgc3BhY2VyKVxuICAgIH1cbiAgfSBjYXRjaCAoXykge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSgnW3VuYWJsZSB0byBzZXJpYWxpemUsIGNpcmN1bGFyIHJlZmVyZW5jZSBpcyB0b28gY29tcGxleCB0byBhbmFseXplXScpXG4gIH0gZmluYWxseSB7XG4gICAgd2hpbGUgKGFyci5sZW5ndGggIT09IDApIHtcbiAgICAgIHZhciBwYXJ0ID0gYXJyLnBvcCgpXG4gICAgICBpZiAocGFydC5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHBhcnRbMF0sIHBhcnRbMV0sIHBhcnRbM10pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJ0WzBdW3BhcnRbMV1dID0gcGFydFsyXVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIHNldFJlcGxhY2UgKHJlcGxhY2UsIHZhbCwgaywgcGFyZW50KSB7XG4gIHZhciBwcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHBhcmVudCwgaylcbiAgaWYgKHByb3BlcnR5RGVzY3JpcHRvci5nZXQgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmIChwcm9wZXJ0eURlc2NyaXB0b3IuY29uZmlndXJhYmxlKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocGFyZW50LCBrLCB7IHZhbHVlOiByZXBsYWNlIH0pXG4gICAgICBhcnIucHVzaChbcGFyZW50LCBrLCB2YWwsIHByb3BlcnR5RGVzY3JpcHRvcl0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcGxhY2VyU3RhY2sucHVzaChbdmFsLCBrLCByZXBsYWNlXSlcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcGFyZW50W2tdID0gcmVwbGFjZVxuICAgIGFyci5wdXNoKFtwYXJlbnQsIGssIHZhbF0pXG4gIH1cbn1cblxuZnVuY3Rpb24gZGVjaXJjICh2YWwsIGssIGVkZ2VJbmRleCwgc3RhY2ssIHBhcmVudCwgZGVwdGgsIG9wdGlvbnMpIHtcbiAgZGVwdGggKz0gMVxuICB2YXIgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsICE9PSBudWxsKSB7XG4gICAgZm9yIChpID0gMDsgaSA8IHN0YWNrLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoc3RhY2tbaV0gPT09IHZhbCkge1xuICAgICAgICBzZXRSZXBsYWNlKENJUkNVTEFSX1JFUExBQ0VfTk9ERSwgdmFsLCBrLCBwYXJlbnQpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBvcHRpb25zLmRlcHRoTGltaXQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICBkZXB0aCA+IG9wdGlvbnMuZGVwdGhMaW1pdFxuICAgICkge1xuICAgICAgc2V0UmVwbGFjZShMSU1JVF9SRVBMQUNFX05PREUsIHZhbCwgaywgcGFyZW50KVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdHlwZW9mIG9wdGlvbnMuZWRnZXNMaW1pdCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIGVkZ2VJbmRleCArIDEgPiBvcHRpb25zLmVkZ2VzTGltaXRcbiAgICApIHtcbiAgICAgIHNldFJlcGxhY2UoTElNSVRfUkVQTEFDRV9OT0RFLCB2YWwsIGssIHBhcmVudClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHN0YWNrLnB1c2godmFsKVxuICAgIC8vIE9wdGltaXplIGZvciBBcnJheXMuIEJpZyBhcnJheXMgY291bGQga2lsbCB0aGUgcGVyZm9ybWFuY2Ugb3RoZXJ3aXNlIVxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZGVjaXJjKHZhbFtpXSwgaSwgaSwgc3RhY2ssIHZhbCwgZGVwdGgsIG9wdGlvbnMpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXModmFsKVxuICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNbaV1cbiAgICAgICAgZGVjaXJjKHZhbFtrZXldLCBrZXksIGksIHN0YWNrLCB2YWwsIGRlcHRoLCBvcHRpb25zKVxuICAgICAgfVxuICAgIH1cbiAgICBzdGFjay5wb3AoKVxuICB9XG59XG5cbi8vIFN0YWJsZS1zdHJpbmdpZnlcbmZ1bmN0aW9uIGNvbXBhcmVGdW5jdGlvbiAoYSwgYikge1xuICBpZiAoYSA8IGIpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuICBpZiAoYSA+IGIpIHtcbiAgICByZXR1cm4gMVxuICB9XG4gIHJldHVybiAwXG59XG5cbmZ1bmN0aW9uIGRldGVybWluaXN0aWNTdHJpbmdpZnkgKG9iaiwgcmVwbGFjZXIsIHNwYWNlciwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgb3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zKClcbiAgfVxuXG4gIHZhciB0bXAgPSBkZXRlcm1pbmlzdGljRGVjaXJjKG9iaiwgJycsIDAsIFtdLCB1bmRlZmluZWQsIDAsIG9wdGlvbnMpIHx8IG9ialxuICB2YXIgcmVzXG4gIHRyeSB7XG4gICAgaWYgKHJlcGxhY2VyU3RhY2subGVuZ3RoID09PSAwKSB7XG4gICAgICByZXMgPSBKU09OLnN0cmluZ2lmeSh0bXAsIHJlcGxhY2VyLCBzcGFjZXIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcyA9IEpTT04uc3RyaW5naWZ5KHRtcCwgcmVwbGFjZUdldHRlclZhbHVlcyhyZXBsYWNlciksIHNwYWNlcilcbiAgICB9XG4gIH0gY2F0Y2ggKF8pIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoJ1t1bmFibGUgdG8gc2VyaWFsaXplLCBjaXJjdWxhciByZWZlcmVuY2UgaXMgdG9vIGNvbXBsZXggdG8gYW5hbHl6ZV0nKVxuICB9IGZpbmFsbHkge1xuICAgIC8vIEVuc3VyZSB0aGF0IHdlIHJlc3RvcmUgdGhlIG9iamVjdCBhcyBpdCB3YXMuXG4gICAgd2hpbGUgKGFyci5sZW5ndGggIT09IDApIHtcbiAgICAgIHZhciBwYXJ0ID0gYXJyLnBvcCgpXG4gICAgICBpZiAocGFydC5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHBhcnRbMF0sIHBhcnRbMV0sIHBhcnRbM10pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJ0WzBdW3BhcnRbMV1dID0gcGFydFsyXVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGRldGVybWluaXN0aWNEZWNpcmMgKHZhbCwgaywgZWRnZUluZGV4LCBzdGFjaywgcGFyZW50LCBkZXB0aCwgb3B0aW9ucykge1xuICBkZXB0aCArPSAxXG4gIHZhciBpXG4gIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwgIT09IG51bGwpIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgc3RhY2subGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChzdGFja1tpXSA9PT0gdmFsKSB7XG4gICAgICAgIHNldFJlcGxhY2UoQ0lSQ1VMQVJfUkVQTEFDRV9OT0RFLCB2YWwsIGssIHBhcmVudClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBpZiAodHlwZW9mIHZhbC50b0pTT04gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfSBjYXRjaCAoXykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdHlwZW9mIG9wdGlvbnMuZGVwdGhMaW1pdCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIGRlcHRoID4gb3B0aW9ucy5kZXB0aExpbWl0XG4gICAgKSB7XG4gICAgICBzZXRSZXBsYWNlKExJTUlUX1JFUExBQ0VfTk9ERSwgdmFsLCBrLCBwYXJlbnQpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0eXBlb2Ygb3B0aW9ucy5lZGdlc0xpbWl0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgZWRnZUluZGV4ICsgMSA+IG9wdGlvbnMuZWRnZXNMaW1pdFxuICAgICkge1xuICAgICAgc2V0UmVwbGFjZShMSU1JVF9SRVBMQUNFX05PREUsIHZhbCwgaywgcGFyZW50KVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgc3RhY2sucHVzaCh2YWwpXG4gICAgLy8gT3B0aW1pemUgZm9yIEFycmF5cy4gQmlnIGFycmF5cyBjb3VsZCBraWxsIHRoZSBwZXJmb3JtYW5jZSBvdGhlcndpc2UhXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgZm9yIChpID0gMDsgaSA8IHZhbC5sZW5ndGg7IGkrKykge1xuICAgICAgICBkZXRlcm1pbmlzdGljRGVjaXJjKHZhbFtpXSwgaSwgaSwgc3RhY2ssIHZhbCwgZGVwdGgsIG9wdGlvbnMpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIENyZWF0ZSBhIHRlbXBvcmFyeSBvYmplY3QgaW4gdGhlIHJlcXVpcmVkIHdheVxuICAgICAgdmFyIHRtcCA9IHt9XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHZhbCkuc29ydChjb21wYXJlRnVuY3Rpb24pXG4gICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1tpXVxuICAgICAgICBkZXRlcm1pbmlzdGljRGVjaXJjKHZhbFtrZXldLCBrZXksIGksIHN0YWNrLCB2YWwsIGRlcHRoLCBvcHRpb25zKVxuICAgICAgICB0bXBba2V5XSA9IHZhbFtrZXldXG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHBhcmVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgYXJyLnB1c2goW3BhcmVudCwgaywgdmFsXSlcbiAgICAgICAgcGFyZW50W2tdID0gdG1wXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdG1wXG4gICAgICB9XG4gICAgfVxuICAgIHN0YWNrLnBvcCgpXG4gIH1cbn1cblxuLy8gd3JhcHMgcmVwbGFjZXIgZnVuY3Rpb24gdG8gaGFuZGxlIHZhbHVlcyB3ZSBjb3VsZG4ndCByZXBsYWNlXG4vLyBhbmQgbWFyayB0aGVtIGFzIHJlcGxhY2VkIHZhbHVlXG5mdW5jdGlvbiByZXBsYWNlR2V0dGVyVmFsdWVzIChyZXBsYWNlcikge1xuICByZXBsYWNlciA9XG4gICAgdHlwZW9mIHJlcGxhY2VyICE9PSAndW5kZWZpbmVkJ1xuICAgICAgPyByZXBsYWNlclxuICAgICAgOiBmdW5jdGlvbiAoaywgdikge1xuICAgICAgICByZXR1cm4gdlxuICAgICAgfVxuICByZXR1cm4gZnVuY3Rpb24gKGtleSwgdmFsKSB7XG4gICAgaWYgKHJlcGxhY2VyU3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXBsYWNlclN0YWNrLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBwYXJ0ID0gcmVwbGFjZXJTdGFja1tpXVxuICAgICAgICBpZiAocGFydFsxXSA9PT0ga2V5ICYmIHBhcnRbMF0gPT09IHZhbCkge1xuICAgICAgICAgIHZhbCA9IHBhcnRbMl1cbiAgICAgICAgICByZXBsYWNlclN0YWNrLnNwbGljZShpLCAxKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWwpXG4gIH1cbn1cbiIsIi8qXG4qIGxvZ2xldmVsIC0gaHR0cHM6Ly9naXRodWIuY29tL3BpbXRlcnJ5L2xvZ2xldmVsXG4qXG4qIENvcHlyaWdodCAoYykgMjAxMyBUaW0gUGVycnlcbiogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuKi9cbihmdW5jdGlvbiAocm9vdCwgZGVmaW5pdGlvbikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKGRlZmluaXRpb24pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbml0aW9uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdC5sb2cgPSBkZWZpbml0aW9uKCk7XG4gICAgfVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvLyBTbGlnaHRseSBkdWJpb3VzIHRyaWNrcyB0byBjdXQgZG93biBtaW5pbWl6ZWQgZmlsZSBzaXplXG4gICAgdmFyIG5vb3AgPSBmdW5jdGlvbigpIHt9O1xuICAgIHZhciB1bmRlZmluZWRUeXBlID0gXCJ1bmRlZmluZWRcIjtcbiAgICB2YXIgaXNJRSA9ICh0eXBlb2Ygd2luZG93ICE9PSB1bmRlZmluZWRUeXBlKSAmJiAodHlwZW9mIHdpbmRvdy5uYXZpZ2F0b3IgIT09IHVuZGVmaW5lZFR5cGUpICYmIChcbiAgICAgICAgL1RyaWRlbnRcXC98TVNJRSAvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpXG4gICAgKTtcblxuICAgIHZhciBsb2dNZXRob2RzID0gW1xuICAgICAgICBcInRyYWNlXCIsXG4gICAgICAgIFwiZGVidWdcIixcbiAgICAgICAgXCJpbmZvXCIsXG4gICAgICAgIFwid2FyblwiLFxuICAgICAgICBcImVycm9yXCJcbiAgICBdO1xuXG4gICAgLy8gQ3Jvc3MtYnJvd3NlciBiaW5kIGVxdWl2YWxlbnQgdGhhdCB3b3JrcyBhdCBsZWFzdCBiYWNrIHRvIElFNlxuICAgIGZ1bmN0aW9uIGJpbmRNZXRob2Qob2JqLCBtZXRob2ROYW1lKSB7XG4gICAgICAgIHZhciBtZXRob2QgPSBvYmpbbWV0aG9kTmFtZV07XG4gICAgICAgIGlmICh0eXBlb2YgbWV0aG9kLmJpbmQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBtZXRob2QuYmluZChvYmopO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuY2FsbChtZXRob2QsIG9iaik7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgLy8gTWlzc2luZyBiaW5kIHNoaW0gb3IgSUU4ICsgTW9kZXJuaXpyLCBmYWxsYmFjayB0byB3cmFwcGluZ1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5hcHBseShtZXRob2QsIFtvYmosIGFyZ3VtZW50c10pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUcmFjZSgpIGRvZXNuJ3QgcHJpbnQgdGhlIG1lc3NhZ2UgaW4gSUUsIHNvIGZvciB0aGF0IGNhc2Ugd2UgbmVlZCB0byB3cmFwIGl0XG4gICAgZnVuY3Rpb24gdHJhY2VGb3JJRSgpIHtcbiAgICAgICAgaWYgKGNvbnNvbGUubG9nKSB7XG4gICAgICAgICAgICBpZiAoY29uc29sZS5sb2cuYXBwbHkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBJbiBvbGQgSUUsIG5hdGl2ZSBjb25zb2xlIG1ldGhvZHMgdGhlbXNlbHZlcyBkb24ndCBoYXZlIGFwcGx5KCkuXG4gICAgICAgICAgICAgICAgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmFwcGx5KGNvbnNvbGUubG9nLCBbY29uc29sZSwgYXJndW1lbnRzXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbnNvbGUudHJhY2UpIGNvbnNvbGUudHJhY2UoKTtcbiAgICB9XG5cbiAgICAvLyBCdWlsZCB0aGUgYmVzdCBsb2dnaW5nIG1ldGhvZCBwb3NzaWJsZSBmb3IgdGhpcyBlbnZcbiAgICAvLyBXaGVyZXZlciBwb3NzaWJsZSB3ZSB3YW50IHRvIGJpbmQsIG5vdCB3cmFwLCB0byBwcmVzZXJ2ZSBzdGFjayB0cmFjZXNcbiAgICBmdW5jdGlvbiByZWFsTWV0aG9kKG1ldGhvZE5hbWUpIHtcbiAgICAgICAgaWYgKG1ldGhvZE5hbWUgPT09ICdkZWJ1ZycpIHtcbiAgICAgICAgICAgIG1ldGhvZE5hbWUgPSAnbG9nJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZSA9PT0gdW5kZWZpbmVkVHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBObyBtZXRob2QgcG9zc2libGUsIGZvciBub3cgLSBmaXhlZCBsYXRlciBieSBlbmFibGVMb2dnaW5nV2hlbkNvbnNvbGVBcnJpdmVzXG4gICAgICAgIH0gZWxzZSBpZiAobWV0aG9kTmFtZSA9PT0gJ3RyYWNlJyAmJiBpc0lFKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJhY2VGb3JJRTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25zb2xlW21ldGhvZE5hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBiaW5kTWV0aG9kKGNvbnNvbGUsIG1ldGhvZE5hbWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbnNvbGUubG9nICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBiaW5kTWV0aG9kKGNvbnNvbGUsICdsb2cnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBub29wO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVGhlc2UgcHJpdmF0ZSBmdW5jdGlvbnMgYWx3YXlzIG5lZWQgYHRoaXNgIHRvIGJlIHNldCBwcm9wZXJseVxuXG4gICAgZnVuY3Rpb24gcmVwbGFjZUxvZ2dpbmdNZXRob2RzKGxldmVsLCBsb2dnZXJOYW1lKSB7XG4gICAgICAgIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9nTWV0aG9kcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIG1ldGhvZE5hbWUgPSBsb2dNZXRob2RzW2ldO1xuICAgICAgICAgICAgdGhpc1ttZXRob2ROYW1lXSA9IChpIDwgbGV2ZWwpID9cbiAgICAgICAgICAgICAgICBub29wIDpcbiAgICAgICAgICAgICAgICB0aGlzLm1ldGhvZEZhY3RvcnkobWV0aG9kTmFtZSwgbGV2ZWwsIGxvZ2dlck5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGVmaW5lIGxvZy5sb2cgYXMgYW4gYWxpYXMgZm9yIGxvZy5kZWJ1Z1xuICAgICAgICB0aGlzLmxvZyA9IHRoaXMuZGVidWc7XG4gICAgfVxuXG4gICAgLy8gSW4gb2xkIElFIHZlcnNpb25zLCB0aGUgY29uc29sZSBpc24ndCBwcmVzZW50IHVudGlsIHlvdSBmaXJzdCBvcGVuIGl0LlxuICAgIC8vIFdlIGJ1aWxkIHJlYWxNZXRob2QoKSByZXBsYWNlbWVudHMgaGVyZSB0aGF0IHJlZ2VuZXJhdGUgbG9nZ2luZyBtZXRob2RzXG4gICAgZnVuY3Rpb24gZW5hYmxlTG9nZ2luZ1doZW5Db25zb2xlQXJyaXZlcyhtZXRob2ROYW1lLCBsZXZlbCwgbG9nZ2VyTmFtZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSB1bmRlZmluZWRUeXBlKSB7XG4gICAgICAgICAgICAgICAgcmVwbGFjZUxvZ2dpbmdNZXRob2RzLmNhbGwodGhpcywgbGV2ZWwsIGxvZ2dlck5hbWUpO1xuICAgICAgICAgICAgICAgIHRoaXNbbWV0aG9kTmFtZV0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBCeSBkZWZhdWx0LCB3ZSB1c2UgY2xvc2VseSBib3VuZCByZWFsIG1ldGhvZHMgd2hlcmV2ZXIgcG9zc2libGUsIGFuZFxuICAgIC8vIG90aGVyd2lzZSB3ZSB3YWl0IGZvciBhIGNvbnNvbGUgdG8gYXBwZWFyLCBhbmQgdGhlbiB0cnkgYWdhaW4uXG4gICAgZnVuY3Rpb24gZGVmYXVsdE1ldGhvZEZhY3RvcnkobWV0aG9kTmFtZSwgbGV2ZWwsIGxvZ2dlck5hbWUpIHtcbiAgICAgICAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgICAgICAgcmV0dXJuIHJlYWxNZXRob2QobWV0aG9kTmFtZSkgfHxcbiAgICAgICAgICAgICAgIGVuYWJsZUxvZ2dpbmdXaGVuQ29uc29sZUFycml2ZXMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBMb2dnZXIobmFtZSwgZGVmYXVsdExldmVsLCBmYWN0b3J5KSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB2YXIgY3VycmVudExldmVsO1xuICAgICAgZGVmYXVsdExldmVsID0gZGVmYXVsdExldmVsID09IG51bGwgPyBcIldBUk5cIiA6IGRlZmF1bHRMZXZlbDtcblxuICAgICAgdmFyIHN0b3JhZ2VLZXkgPSBcImxvZ2xldmVsXCI7XG4gICAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgc3RvcmFnZUtleSArPSBcIjpcIiArIG5hbWU7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSB7XG4gICAgICAgIHN0b3JhZ2VLZXkgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHBlcnNpc3RMZXZlbElmUG9zc2libGUobGV2ZWxOdW0pIHtcbiAgICAgICAgICB2YXIgbGV2ZWxOYW1lID0gKGxvZ01ldGhvZHNbbGV2ZWxOdW1dIHx8ICdzaWxlbnQnKS50b1VwcGVyQ2FzZSgpO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IHVuZGVmaW5lZFR5cGUgfHwgIXN0b3JhZ2VLZXkpIHJldHVybjtcblxuICAgICAgICAgIC8vIFVzZSBsb2NhbFN0b3JhZ2UgaWYgYXZhaWxhYmxlXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZVtzdG9yYWdlS2V5XSA9IGxldmVsTmFtZTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH0gY2F0Y2ggKGlnbm9yZSkge31cblxuICAgICAgICAgIC8vIFVzZSBzZXNzaW9uIGNvb2tpZSBhcyBmYWxsYmFja1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5jb29raWUgPVxuICAgICAgICAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChzdG9yYWdlS2V5KSArIFwiPVwiICsgbGV2ZWxOYW1lICsgXCI7XCI7XG4gICAgICAgICAgfSBjYXRjaCAoaWdub3JlKSB7fVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRQZXJzaXN0ZWRMZXZlbCgpIHtcbiAgICAgICAgICB2YXIgc3RvcmVkTGV2ZWw7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gdW5kZWZpbmVkVHlwZSB8fCAhc3RvcmFnZUtleSkgcmV0dXJuO1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgc3RvcmVkTGV2ZWwgPSB3aW5kb3cubG9jYWxTdG9yYWdlW3N0b3JhZ2VLZXldO1xuICAgICAgICAgIH0gY2F0Y2ggKGlnbm9yZSkge31cblxuICAgICAgICAgIC8vIEZhbGxiYWNrIHRvIGNvb2tpZXMgaWYgbG9jYWwgc3RvcmFnZSBnaXZlcyB1cyBub3RoaW5nXG4gICAgICAgICAgaWYgKHR5cGVvZiBzdG9yZWRMZXZlbCA9PT0gdW5kZWZpbmVkVHlwZSkge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgdmFyIGNvb2tpZSA9IHdpbmRvdy5kb2N1bWVudC5jb29raWU7XG4gICAgICAgICAgICAgICAgICB2YXIgbG9jYXRpb24gPSBjb29raWUuaW5kZXhPZihcbiAgICAgICAgICAgICAgICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoc3RvcmFnZUtleSkgKyBcIj1cIik7XG4gICAgICAgICAgICAgICAgICBpZiAobG9jYXRpb24gIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgc3RvcmVkTGV2ZWwgPSAvXihbXjtdKykvLmV4ZWMoY29va2llLnNsaWNlKGxvY2F0aW9uKSlbMV07XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGlnbm9yZSkge31cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBJZiB0aGUgc3RvcmVkIGxldmVsIGlzIG5vdCB2YWxpZCwgdHJlYXQgaXQgYXMgaWYgbm90aGluZyB3YXMgc3RvcmVkLlxuICAgICAgICAgIGlmIChzZWxmLmxldmVsc1tzdG9yZWRMZXZlbF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBzdG9yZWRMZXZlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gc3RvcmVkTGV2ZWw7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGNsZWFyUGVyc2lzdGVkTGV2ZWwoKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IHVuZGVmaW5lZFR5cGUgfHwgIXN0b3JhZ2VLZXkpIHJldHVybjtcblxuICAgICAgICAgIC8vIFVzZSBsb2NhbFN0b3JhZ2UgaWYgYXZhaWxhYmxlXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHN0b3JhZ2VLZXkpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfSBjYXRjaCAoaWdub3JlKSB7fVxuXG4gICAgICAgICAgLy8gVXNlIHNlc3Npb24gY29va2llIGFzIGZhbGxiYWNrXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmNvb2tpZSA9XG4gICAgICAgICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHN0b3JhZ2VLZXkpICsgXCI9OyBleHBpcmVzPVRodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDAgVVRDXCI7XG4gICAgICAgICAgfSBjYXRjaCAoaWdub3JlKSB7fVxuICAgICAgfVxuXG4gICAgICAvKlxuICAgICAgICpcbiAgICAgICAqIFB1YmxpYyBsb2dnZXIgQVBJIC0gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9waW10ZXJyeS9sb2dsZXZlbCBmb3IgZGV0YWlsc1xuICAgICAgICpcbiAgICAgICAqL1xuXG4gICAgICBzZWxmLm5hbWUgPSBuYW1lO1xuXG4gICAgICBzZWxmLmxldmVscyA9IHsgXCJUUkFDRVwiOiAwLCBcIkRFQlVHXCI6IDEsIFwiSU5GT1wiOiAyLCBcIldBUk5cIjogMyxcbiAgICAgICAgICBcIkVSUk9SXCI6IDQsIFwiU0lMRU5UXCI6IDV9O1xuXG4gICAgICBzZWxmLm1ldGhvZEZhY3RvcnkgPSBmYWN0b3J5IHx8IGRlZmF1bHRNZXRob2RGYWN0b3J5O1xuXG4gICAgICBzZWxmLmdldExldmVsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBjdXJyZW50TGV2ZWw7XG4gICAgICB9O1xuXG4gICAgICBzZWxmLnNldExldmVsID0gZnVuY3Rpb24gKGxldmVsLCBwZXJzaXN0KSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBsZXZlbCA9PT0gXCJzdHJpbmdcIiAmJiBzZWxmLmxldmVsc1tsZXZlbC50b1VwcGVyQ2FzZSgpXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGxldmVsID0gc2VsZi5sZXZlbHNbbGV2ZWwudG9VcHBlckNhc2UoKV07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0eXBlb2YgbGV2ZWwgPT09IFwibnVtYmVyXCIgJiYgbGV2ZWwgPj0gMCAmJiBsZXZlbCA8PSBzZWxmLmxldmVscy5TSUxFTlQpIHtcbiAgICAgICAgICAgICAgY3VycmVudExldmVsID0gbGV2ZWw7XG4gICAgICAgICAgICAgIGlmIChwZXJzaXN0ICE9PSBmYWxzZSkgeyAgLy8gZGVmYXVsdHMgdG8gdHJ1ZVxuICAgICAgICAgICAgICAgICAgcGVyc2lzdExldmVsSWZQb3NzaWJsZShsZXZlbCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmVwbGFjZUxvZ2dpbmdNZXRob2RzLmNhbGwoc2VsZiwgbGV2ZWwsIG5hbWUpO1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUgPT09IHVuZGVmaW5lZFR5cGUgJiYgbGV2ZWwgPCBzZWxmLmxldmVscy5TSUxFTlQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBcIk5vIGNvbnNvbGUgYXZhaWxhYmxlIGZvciBsb2dnaW5nXCI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aHJvdyBcImxvZy5zZXRMZXZlbCgpIGNhbGxlZCB3aXRoIGludmFsaWQgbGV2ZWw6IFwiICsgbGV2ZWw7XG4gICAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgc2VsZi5zZXREZWZhdWx0TGV2ZWwgPSBmdW5jdGlvbiAobGV2ZWwpIHtcbiAgICAgICAgICBkZWZhdWx0TGV2ZWwgPSBsZXZlbDtcbiAgICAgICAgICBpZiAoIWdldFBlcnNpc3RlZExldmVsKCkpIHtcbiAgICAgICAgICAgICAgc2VsZi5zZXRMZXZlbChsZXZlbCwgZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHNlbGYucmVzZXRMZXZlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZWxmLnNldExldmVsKGRlZmF1bHRMZXZlbCwgZmFsc2UpO1xuICAgICAgICAgIGNsZWFyUGVyc2lzdGVkTGV2ZWwoKTtcbiAgICAgIH07XG5cbiAgICAgIHNlbGYuZW5hYmxlQWxsID0gZnVuY3Rpb24ocGVyc2lzdCkge1xuICAgICAgICAgIHNlbGYuc2V0TGV2ZWwoc2VsZi5sZXZlbHMuVFJBQ0UsIHBlcnNpc3QpO1xuICAgICAgfTtcblxuICAgICAgc2VsZi5kaXNhYmxlQWxsID0gZnVuY3Rpb24ocGVyc2lzdCkge1xuICAgICAgICAgIHNlbGYuc2V0TGV2ZWwoc2VsZi5sZXZlbHMuU0lMRU5ULCBwZXJzaXN0KTtcbiAgICAgIH07XG5cbiAgICAgIC8vIEluaXRpYWxpemUgd2l0aCB0aGUgcmlnaHQgbGV2ZWxcbiAgICAgIHZhciBpbml0aWFsTGV2ZWwgPSBnZXRQZXJzaXN0ZWRMZXZlbCgpO1xuICAgICAgaWYgKGluaXRpYWxMZXZlbCA9PSBudWxsKSB7XG4gICAgICAgICAgaW5pdGlhbExldmVsID0gZGVmYXVsdExldmVsO1xuICAgICAgfVxuICAgICAgc2VsZi5zZXRMZXZlbChpbml0aWFsTGV2ZWwsIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqXG4gICAgICogVG9wLWxldmVsIEFQSVxuICAgICAqXG4gICAgICovXG5cbiAgICB2YXIgZGVmYXVsdExvZ2dlciA9IG5ldyBMb2dnZXIoKTtcblxuICAgIHZhciBfbG9nZ2Vyc0J5TmFtZSA9IHt9O1xuICAgIGRlZmF1bHRMb2dnZXIuZ2V0TG9nZ2VyID0gZnVuY3Rpb24gZ2V0TG9nZ2VyKG5hbWUpIHtcbiAgICAgICAgaWYgKCh0eXBlb2YgbmFtZSAhPT0gXCJzeW1ib2xcIiAmJiB0eXBlb2YgbmFtZSAhPT0gXCJzdHJpbmdcIikgfHwgbmFtZSA9PT0gXCJcIikge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJZb3UgbXVzdCBzdXBwbHkgYSBuYW1lIHdoZW4gY3JlYXRpbmcgYSBsb2dnZXIuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxvZ2dlciA9IF9sb2dnZXJzQnlOYW1lW25hbWVdO1xuICAgICAgICBpZiAoIWxvZ2dlcikge1xuICAgICAgICAgIGxvZ2dlciA9IF9sb2dnZXJzQnlOYW1lW25hbWVdID0gbmV3IExvZ2dlcihcbiAgICAgICAgICAgIG5hbWUsIGRlZmF1bHRMb2dnZXIuZ2V0TGV2ZWwoKSwgZGVmYXVsdExvZ2dlci5tZXRob2RGYWN0b3J5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbG9nZ2VyO1xuICAgIH07XG5cbiAgICAvLyBHcmFiIHRoZSBjdXJyZW50IGdsb2JhbCBsb2cgdmFyaWFibGUgaW4gY2FzZSBvZiBvdmVyd3JpdGVcbiAgICB2YXIgX2xvZyA9ICh0eXBlb2Ygd2luZG93ICE9PSB1bmRlZmluZWRUeXBlKSA/IHdpbmRvdy5sb2cgOiB1bmRlZmluZWQ7XG4gICAgZGVmYXVsdExvZ2dlci5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSB1bmRlZmluZWRUeXBlICYmXG4gICAgICAgICAgICAgICB3aW5kb3cubG9nID09PSBkZWZhdWx0TG9nZ2VyKSB7XG4gICAgICAgICAgICB3aW5kb3cubG9nID0gX2xvZztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkZWZhdWx0TG9nZ2VyO1xuICAgIH07XG5cbiAgICBkZWZhdWx0TG9nZ2VyLmdldExvZ2dlcnMgPSBmdW5jdGlvbiBnZXRMb2dnZXJzKCkge1xuICAgICAgICByZXR1cm4gX2xvZ2dlcnNCeU5hbWU7XG4gICAgfTtcblxuICAgIC8vIEVTNiBkZWZhdWx0IGV4cG9ydCwgZm9yIGNvbXBhdGliaWxpdHlcbiAgICBkZWZhdWx0TG9nZ2VyWydkZWZhdWx0J10gPSBkZWZhdWx0TG9nZ2VyO1xuXG4gICAgcmV0dXJuIGRlZmF1bHRMb2dnZXI7XG59KSk7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktaW50ZXJmYWNlICovXHJcbmltcG9ydCB7IEZsYXR0ZW4gfSBmcm9tICcuL2hlbHBlcnMnO1xyXG5pbXBvcnQgeyBCbGFua0FwcFVJU3RhdGUgfSBmcm9tICcuLi9jb25zdGFudHMvaW5pdGlhbFN0YXRlJztcclxuaW1wb3J0IHsgQmlnTnVtYmVyIH0gZnJvbSAnQGV0aGVyc3Byb2plY3QvYmlnbnVtYmVyJztcclxuaW1wb3J0IHtcclxuICAgIEFjY291bnRJbmZvLFxyXG4gICAgRGV2aWNlQWNjb3VudEluZm8sXHJcbn0gZnJvbSAnLi4vLi4vY29udHJvbGxlcnMvQWNjb3VudFRyYWNrZXJDb250cm9sbGVyJztcclxuaW1wb3J0IHtcclxuICAgIEdhc1ByaWNlVmFsdWUsXHJcbiAgICBGZWVNYXJrZXRFSVAxNTU5VmFsdWVzLFxyXG59IGZyb20gJy4uLy4uL2NvbnRyb2xsZXJzL3RyYW5zYWN0aW9ucy9UcmFuc2FjdGlvbkNvbnRyb2xsZXInO1xyXG5pbXBvcnQge1xyXG4gICAgSVRva2VuLFxyXG4gICAgSVRva2VucyxcclxuICAgIFNlYXJjaFRva2Vuc1Jlc3BvbnNlLFxyXG4gICAgVG9rZW4sXHJcbn0gZnJvbSAnLi4vLi4vY29udHJvbGxlcnMvZXJjLTIwL1Rva2VuJztcclxuaW1wb3J0IHtcclxuICAgIFRyYW5zYWN0aW9uQWR2YW5jZWREYXRhLFxyXG4gICAgVHJhbnNhY3Rpb25NZXRhLFxyXG59IGZyb20gJy4uLy4uL2NvbnRyb2xsZXJzL3RyYW5zYWN0aW9ucy91dGlscy90eXBlcyc7XHJcbmltcG9ydCB7IEltcG9ydFN0cmF0ZWd5LCBJbXBvcnRBcmd1bWVudHMgfSBmcm9tICcuLi9hY2NvdW50JztcclxuaW1wb3J0IHtcclxuICAgIFN3YXBQYXJhbWV0ZXJzLFxyXG4gICAgRXhjaGFuZ2VUeXBlLFxyXG4gICAgU3dhcFF1b3RlLFxyXG4gICAgU3dhcFRyYW5zYWN0aW9uLFxyXG59IGZyb20gJy4uLy4uL2NvbnRyb2xsZXJzL1N3YXBDb250cm9sbGVyJztcclxuaW1wb3J0IHtcclxuICAgIFByb3ZpZGVyRXZlbnRzLFxyXG4gICAgU2l0ZU1ldGFkYXRhLFxyXG4gICAgUmVxdWVzdEFyZ3VtZW50cyxcclxuICAgIFByb3ZpZGVyU2V0dXBEYXRhLFxyXG59IGZyb20gJ0BibG9jay13YWxsZXQvcHJvdmlkZXIvdHlwZXMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIEFkZHJlc3NCb29rRW50cnksXHJcbiAgICBOZXR3b3JrQWRkcmVzc0Jvb2ssXHJcbn0gZnJvbSAnQGJsb2NrLXdhbGxldC9iYWNrZ3JvdW5kL2NvbnRyb2xsZXJzL0FkZHJlc3NCb29rQ29udHJvbGxlcic7XHJcbmltcG9ydCB7IERhcHBSZXEsIERhcHBSZXF1ZXN0Q29uZmlybU9wdGlvbnMgfSBmcm9tICcuL2V0aGVyZXVtJztcclxuaW1wb3J0IHsgVHJhbnNhY3Rpb25HYXNFc3RpbWF0aW9uIH0gZnJvbSAnQGJsb2NrLXdhbGxldC9iYWNrZ3JvdW5kL2NvbnRyb2xsZXJzL3RyYW5zYWN0aW9ucy9UcmFuc2FjdGlvbkNvbnRyb2xsZXInO1xyXG5pbXBvcnQge1xyXG4gICAgRGVmYXVsdEdhc09wdGlvbnMsXHJcbiAgICBQb3B1cFRhYnMsXHJcbiAgICBSZWxlYXNlTm90ZSxcclxuICAgIFVzZXJTZXR0aW5ncyxcclxufSBmcm9tICdAYmxvY2std2FsbGV0L2JhY2tncm91bmQvY29udHJvbGxlcnMvUHJlZmVyZW5jZXNDb250cm9sbGVyJztcclxuaW1wb3J0IHsgVHJhbnNhY3Rpb25GZWVEYXRhIH0gZnJvbSAnQGJsb2NrLXdhbGxldC9iYWNrZ3JvdW5kL2NvbnRyb2xsZXJzL2VyYy0yMC90cmFuc2FjdGlvbnMvU2lnbmVkVHJhbnNhY3Rpb24nO1xyXG5pbXBvcnQgeyBDdXJyZW5jeSB9IGZyb20gJy4uL2N1cnJlbmN5JztcclxuaW1wb3J0IHsgRGV2aWNlcyB9IGZyb20gJy4vaGFyZHdhcmUnO1xyXG5pbXBvcnQgeyBPbmVJbmNoU3dhcFF1b3RlUGFyYW1zLCBPbmVJbmNoU3dhcFJlcXVlc3RQYXJhbXMgfSBmcm9tICcuLzFpbmNoJztcclxuaW1wb3J0IHsgQ2hhaW5MaXN0SXRlbSB9IGZyb20gJ0BibG9jay13YWxsZXQvY2hhaW5zLWFzc2V0cyc7XHJcbmltcG9ydCB7IElDaGFpbiB9IGZyb20gJy4vY2hhaW4nO1xyXG5pbXBvcnQge1xyXG4gICAgQnJpZGdlUXVvdGVSZXF1ZXN0LFxyXG4gICAgQnJpZGdlUm91dGVzUmVxdWVzdCxcclxuICAgIEJyaWRnZVRyYW5zYWN0aW9uLFxyXG4gICAgR2V0QnJpZGdlQXZhaWxhYmxlUm91dGVzUmVzcG9uc2UsXHJcbiAgICBHZXRCcmlkZ2VRdW90ZVJlc3BvbnNlLFxyXG59IGZyb20gJ0BibG9jay13YWxsZXQvYmFja2dyb3VuZC9jb250cm9sbGVycy9CcmlkZ2VDb250cm9sbGVyJztcclxuaW1wb3J0IHsgR2FzUHJpY2VEYXRhIH0gZnJvbSAnQGJsb2NrLXdhbGxldC9iYWNrZ3JvdW5kL2NvbnRyb2xsZXJzL0dhc1ByaWNlc0NvbnRyb2xsZXInO1xyXG5pbXBvcnQgeyBSZW1vdGVDb25maWdzQ29udHJvbGxlclN0YXRlIH0gZnJvbSAnQGJsb2NrLXdhbGxldC9iYWNrZ3JvdW5kL2NvbnRyb2xsZXJzL1JlbW90ZUNvbmZpZ3NDb250cm9sbGVyJztcclxuXHJcbmVudW0gQUNDT1VOVCB7XHJcbiAgICBDUkVBVEUgPSAnQ1JFQVRFX0FDQ09VTlQnLFxyXG4gICAgRVhQT1JUX0pTT04gPSAnRVhQT1JUX0FDQ09VTlRfSlNPTicsXHJcbiAgICBFWFBPUlRfUFJJVkFURV9LRVkgPSAnRVhQT1JUX0FDQ09VTlRfUEsnLFxyXG4gICAgSU1QT1JUX0pTT04gPSAnSU1QT1JUX0FDQ09VTlRfSlNPTicsXHJcbiAgICBJTVBPUlRfUFJJVkFURV9LRVkgPSAnSU1QT1JUX0FDQ09VTlRfUEsnLFxyXG4gICAgUkVNT1ZFID0gJ1JFTU9WRV9BQ0NPVU5UJyxcclxuICAgIFJFU0VUID0gJ1JFU0VUX0FDQ09VTlQnLFxyXG4gICAgUkVOQU1FID0gJ1JFTkFNRV9BQ0NPVU5UJyxcclxuICAgIFNFTEVDVCA9ICdTRUxFQ1RfQUNDT1VOVCcsXHJcbiAgICBHRVRfQkFMQU5DRSA9ICdHRVRfQUNDT1VOVF9CQUxBTkNFJyxcclxuICAgIEhJREUgPSAnSElERV9BQ0NPVU5UJyxcclxuICAgIFVOSElERSA9ICdVTkhJREVfQUNDT1VOVCcsXHJcbiAgICBHRVRfTkFUSVZFX1RPS0VOX0JBTEFOQ0UgPSAnR0VUX05BVElWRV9UT0tFTl9CQUxBTkNFJyxcclxufVxyXG5cclxuZW51bSBBUFAge1xyXG4gICAgTE9DSyA9ICdMT0NLX0FQUCcsXHJcbiAgICBVTkxPQ0sgPSAnVU5MT0NLX0FQUCcsXHJcbiAgICBHRVRfSURMRV9USU1FT1VUID0gJ0dFVF9JRExFX1RJTUVPVVQnLFxyXG4gICAgU0VUX0lETEVfVElNRU9VVCA9ICdTRVRfSURMRV9USU1FT1VUJyxcclxuICAgIFNFVF9MQVNUX1VTRVJfQUNUSVZFX1RJTUUgPSAnU0VUX0xBU1RfVVNFUl9BQ1RJVkVfVElNRScsXHJcbiAgICBSRVRVUk5fVE9fT05CT0FSRElORyA9ICdSRVRVUk5fVE9fT05CT0FSRElORycsXHJcbiAgICBPUEVOX1JFU0VUID0gJ09QRU5fUkVTRVQnLFxyXG4gICAgT1BFTl9IV19DT05ORUNUID0gJ09QRU5fSFdfQ09OTkVDVCcsXHJcbiAgICBPUEVOX0hXX1JFTU9WRSA9ICdPUEVOX0hXX1JFTU9WRScsXHJcbiAgICBPUEVOX0hXX1JFQ09OTkVDVCA9ICdPUEVOX0hXX1JFQ09OTkVDVCcsXHJcbiAgICBTRVRfVVNFUl9TRVRUSU5HUyA9ICdTRVRfVVNFUl9TRVRUSU5HUycsXHJcbiAgICBVUERBVEVfUE9QVVBfVEFCID0gJ1VQREFURV9QT1BVUF9UQUInLFxyXG4gICAgUkVKRUNUX1VOQ09ORklSTUVEX1JFUVVFU1RTID0gJ1JFSkVDVF9VTkNPTkZJUk1FRF9SRVFVRVNUUycsXHJcbiAgICBTRVRfVVNFUl9PTkxJTkUgPSAnU0VUX1VTRVJfT05MSU5FJyxcclxufVxyXG5cclxuZW51bSBCQUNLR1JPVU5EIHtcclxuICAgIEFDVElPTiA9ICdBQ1RJT04nLFxyXG59XHJcblxyXG5lbnVtIERBUFAge1xyXG4gICAgQ09ORklSTV9SRVFVRVNUID0gJ0NPTkZJUk1fREFQUF9SRVFVRVNUJyxcclxuICAgIEFUVEVNUFRfUkVKRUNUX1JFUVVFU1QgPSAnQVRURU1QVF9SRUpFQ1RfREFQUF9SRVFVRVNUJyxcclxufVxyXG5cclxuZW51bSBFWENIQU5HRSB7XHJcbiAgICBDSEVDS19BTExPV0FOQ0UgPSAnQ0hFQ0tfQUxMT1dBTkNFJyxcclxuICAgIEFQUFJPVkUgPSAnQVBQUk9WRV9FWENIQU5HRScsXHJcbiAgICBHRVRfUVVPVEUgPSAnR0VUX0VYQ0hBTkdFX1FVT1RFJyxcclxuICAgIEdFVF9FWENIQU5HRSA9ICdHRVRfRVhDSEFOR0UnLFxyXG4gICAgRVhFQ1VURSA9ICdFWEVDVVRFX0VYQ0hBTkdFJyxcclxufVxyXG5cclxuZW51bSBCUklER0Uge1xyXG4gICAgQVBQUk9WRV9CUklER0VfQUxMT1dBTkNFID0gJ0FQUFJPVkVfQlJJREdFX0FMTE9XQU5DRScsXHJcbiAgICBHRVRfQlJJREdFX0FWQUlMQUJMRV9DSEFJTlMgPSAnR0VUX0JSSURHRV9BVkFJTEFCTEVfQ0hBSU5TJyxcclxuICAgIEdFVF9CUklER0VfVE9LRU5TID0gJ0dFVF9CUklER0VfVE9LRU5TJyxcclxuICAgIEdFVF9CUklER0VfUVVPVEUgPSAnR0VUX0JSSURHRV9RVU9URScsXHJcbiAgICBHRVRfQlJJREdFX1JPVVRFUyA9ICdHRVRfQlJJREdFX1JPVVRFUycsXHJcbiAgICBFWEVDVVRFX0JSSURHRSA9ICdFWEVDVVRFX0JSSURHRScsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEVYVEVSTkFMIHtcclxuICAgIEVWRU5UX1NVQlNDUklQVElPTiA9ICdFVkVOVF9TVUJTQ1JJUFRJT04nLFxyXG4gICAgUkVRVUVTVCA9ICdFWFRFUk5BTF9SRVFVRVNUJyxcclxuICAgIFNFVFVQX1BST1ZJREVSID0gJ1NFVFVQX1BST1ZJREVSJyxcclxuICAgIFNXX1JFSU5JVCA9ICdTV19SRUlOSVQnLFxyXG4gICAgU0VUX0lDT04gPSAnU0VUX0lDT04nLFxyXG4gICAgR0VUX1BST1ZJREVSX0NPTkZJRyA9ICdHRVRfUFJPVklERVJfQ09ORklHJyxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gQ09OVEVOVCB7XHJcbiAgICBTSE9VTERfSU5KRUNUID0gJ1NIT1VMRF9JTkpFQ1QnLFxyXG4gICAgU1dfS0VFUF9BTElWRSA9ICdTV19LRUVQX0FMSVZFJyxcclxufVxyXG5cclxuZW51bSBORVRXT1JLIHtcclxuICAgIENIQU5HRSA9ICdORVRXT1JLX0NIQU5HRScsXHJcbiAgICBTRVRfU0hPV19URVNUX05FVFdPUktTID0gJ1NIT1dfVEVTVF9ORVRXT1JLUycsXHJcbiAgICBBRERfTkVUV09SSyA9ICdBRERfTkVUV09SSycsXHJcbiAgICBFRElUX05FVFdPUksgPSAnRURJVF9ORVRXT1JLJyxcclxuICAgIEVESVRfTkVUV09SS1NfT1JERVIgPSAnRURJVF9ORVRXT1JLU19PUkRFUicsXHJcbiAgICBSRU1PVkVfTkVUV09SSyA9ICdSRU1PVkVfTkVUV09SSycsXHJcbiAgICBHRVRfU1BFQ0lGSUNfQ0hBSU5fREVUQUlMUyA9ICdHRVRfU1BFQ0lGSUNfQ0hBSU5fREVUQUlMUycsXHJcbiAgICBHRVRfUlBDX0NIQUlOX0lEID0gJ0dFVF9SUENfQ0hBSU5fSUQnLFxyXG4gICAgU0VBUkNIX0NIQUlOUyA9ICdTRUFSQ0hfQ0hBSU5TJyxcclxufVxyXG5cclxuZW51bSBQQVNTV09SRCB7XHJcbiAgICBWRVJJRlkgPSAnVkVSSUZZX1BBU1NXT1JEJyxcclxuICAgIENIQU5HRSA9ICdDSEFOR0VfUEFTU1dPUkQnLFxyXG59XHJcblxyXG5lbnVtIFBFUk1JU1NJT04ge1xyXG4gICAgQUREX05FVyA9ICdBRERfTkVXX1NJVEVfUEVSTUlTU0lPTlMnLFxyXG4gICAgQ09ORklSTSA9ICdDT05GSVJNX1BFUk1JU1NJT05fUkVRVUVTVCcsXHJcbiAgICBHRVRfQUNDT1VOVF9QRVJNSVNTSU9OUyA9ICdHRVRfQUNDT1VOVF9QRVJNSVNTSU9OUycsXHJcbiAgICBSRU1PVkVfQUNDT1VOVF9GUk9NX1NJVEUgPSAnUkVNT1ZFX0FDQ09VTlRfRlJPTV9TSVRFJyxcclxuICAgIFVQREFURV9TSVRFX1BFUk1JU1NJT05TID0gJ1VQREFURV9TSVRFX1BFUk1JU1NJT05TJyxcclxufVxyXG5cclxuZW51bSBTVEFURSB7XHJcbiAgICBHRVQgPSAnR0VUX1NUQVRFJyxcclxuICAgIFNVQlNDUklCRSA9ICdTVEFURV9TVUJTQ1JJQkUnLFxyXG4gICAgR0VUX1JFTU9URV9DT05GSUcgPSAnR0VUX1JFTU9URV9DT05GSUcnLFxyXG59XHJcblxyXG5lbnVtIEVOUyB7XHJcbiAgICBMT09LVVBfQUREUkVTUyA9ICdMT09LVVBfQUREUkVTU19FTlMnLFxyXG4gICAgUkVTT0xWRV9OQU1FID0gJ1JFU09MVkVfRU5TX05BTUUnLFxyXG59XHJcblxyXG5lbnVtIFVEIHtcclxuICAgIFJFU09MVkVfTkFNRSA9ICdSRVNPTFZFX1VEX05BTUUnLFxyXG59XHJcblxyXG5lbnVtIFRSQU5TQUNUSU9OIHtcclxuICAgIEFERF9ORVdfU0VORF9UUkFOU0FDVElPTiA9ICdBRERfTkVXX1NFTkRfVFJBTlNBQ1RJT04nLFxyXG4gICAgVVBEQVRFX1NFTkRfVFJBTlNBQ1RJT05fR0FTID0gJ1VQREFURV9TRU5EX1RSQU5TQUNUSU9OX0dBUycsXHJcbiAgICBBUFBST1ZFX1NFTkRfVFJBTlNBQ1RJT04gPSAnQVBQUk9WRV9TRU5EX1RSQU5TQUNUSU9OJyxcclxuICAgIEdFVF9TRU5EX1RSQU5TQUNUSU9OX1JFU1VMVCA9ICdHRVRfU0VORF9UUkFOU0FDVElPTl9SRVNVTFQnLFxyXG4gICAgQ0FMQ1VMQVRFX1NFTkRfVFJBTlNBQ1RJT05fR0FTX0xJTUlUID0gJ0NBTENVTEFURV9TRU5EX1RSQU5TQUNUSU9OX0dBU19MSU1JVCcsXHJcbiAgICBDQUxDVUxBVEVfQVBQUk9WRV9UUkFOU0FDVElPTl9HQVNfTElNSVQgPSAnQ0FMQ1VMQVRFX0FQUFJPVkVfVFJBTlNBQ1RJT05fR0FTX0xJTUlUJyxcclxuICAgIENPTkZJUk0gPSAnQ09ORklSTV9UUkFOU0FDVElPTicsXHJcbiAgICBSRUpFQ1QgPSAnUkVKRUNUX1RSQU5TQUNUSU9OJyxcclxuICAgIEdFVF9MQVRFU1RfR0FTX1BSSUNFID0gJ0dFVF9MQVRFU1RfR0FTX1BSSUNFJyxcclxuICAgIEZFVENIX0xBVEVTVF9HQVNfUFJJQ0UgPSAnRkVUQ0hfTEFURVNUX0dBU19QUklDRScsXHJcbiAgICBTRU5EX0VUSEVSID0gJ1NFTkRfRVRIRVInLFxyXG4gICAgQ0FOQ0VMX1RSQU5TQUNUSU9OID0gJ0NBTkNFTF9UUkFOU0FDVElPTicsXHJcbiAgICBTUEVFRF9VUF9UUkFOU0FDVElPTiA9ICdTUEVFRF9VUF9UUkFOU0FDVElPTicsXHJcbiAgICBHRVRfU1BFRURfVVBfR0FTX1BSSUNFID0gJ0dFVF9TUEVFRF9VUF9HQVNfUFJJQ0UnLFxyXG4gICAgR0VUX0NBTkNFTF9HQVNfUFJJQ0UgPSAnR0VUX0NBTkNFTF9HQVNfUFJJQ0UnLFxyXG4gICAgR0VUX05FWFRfTk9OQ0UgPSAnR0VUX05FWFRfTk9OQ0UnLFxyXG4gICAgUkVKRUNUX1JFUExBQ0VNRU5UX1RSQU5TQUNUSU9OID0gJ1JFSkVDVF9SRVBMQUNFTUVOVF9UUkFOU0FDVElPTicsXHJcbn1cclxuXHJcbmVudW0gV0FMTEVUIHtcclxuICAgIENSRUFURSA9ICdDUkVBVEVfV0FMTEVUJyxcclxuICAgIElNUE9SVCA9ICdJTVBPUlRfV0FMTEVUJyxcclxuICAgIFZFUklGWV9TRUVEX1BIUkFTRSA9ICdWRVJJRllfU0VFRF9QSFJBU0UnLFxyXG4gICAgUkVRVUVTVF9TRUVEX1BIUkFTRSA9ICdSRVFVRVNUX1NFRURfUEhSQVNFJyxcclxuICAgIFNFVFVQX0NPTVBMRVRFID0gJ1NFVFVQX0NPTVBMRVRFJyxcclxuICAgIFJFU0VUID0gJ1JFU0VUJyxcclxuICAgIERJU01JU1NfV0VMQ09NRV9NRVNTQUdFID0gJ0RJU01JU1NfV0VMQ09NRV9NRVNTQUdFJyxcclxuICAgIERJU01JU1NfREVGQVVMVF9XQUxMRVRfUFJFRkVSRU5DRVMgPSAnRElTTUlTU19ERUZBVUxUX1dBTExFVF9QUkVGRVJFTkNFUycsXHJcbiAgICBESVNNSVNTX1JFTEVBU0VfTk9URVMgPSAnRElTTUlTU19SRUxFQVNFX05PVEVTJyxcclxuICAgIFRPR0dMRV9SRUxFQVNFX05PVEVTX1NVQlNDUklQVElPTiA9ICdUT0dHTEVfUkVMRUFTRV9OT1RFU19TVUJTQ1JJUFRJT04nLFxyXG4gICAgR0VORVJBVEVfT05fREVNQU5EX1JFTEVBU0VfTk9URVMgPSAnR0VORVJBVEVfT05fREVNQU5EX1JFTEVBU0VfTk9URVMnLFxyXG4gICAgVVBEQVRFX0FOVElfUEhJU0hJTkdfSU1BR0UgPSAnVVBEQVRFX0FOVElfUEhJU0hJTkdfSU1BR0UnLFxyXG4gICAgVE9HR0xFX0FOVElfUEhJU0hJTkdfUFJPVEVDVElPTiA9ICdUT0dHTEVfQU5USV9QSElTSElOR19QUk9URUNUSU9OJyxcclxuICAgIFRPR0dMRV9ERUZBVUxUX0JST1dTRVJfV0FMTEVUID0gJ1RPR0dMRV9ERUZBVUxUX0JST1dTRVJfV0FMTEVUJyxcclxuICAgIFNFVF9OQVRJVkVfQ1VSUkVOQ1kgPSAnU0VUX05BVElWRV9DVVJSRU5DWScsXHJcbiAgICBHRVRfVkFMSURfQ1VSUkVOQ0lFUyA9ICdHRVRfVkFMSURfQ1VSUkVOQ0lFUycsXHJcbiAgICBIQVJEV0FSRV9DT05ORUNUID0gJ0hBUkRXQVJFX0NPTk5FQ1QnLFxyXG4gICAgSEFSRFdBUkVfUkVNT1ZFID0gJ0hBUkRXQVJFX1JFTU9WRScsXHJcbiAgICBIQVJEV0FSRV9HRVRfQUNDT1VOVFMgPSAnSEFSRFdBUkVfR0VUX0FDQ09VTlRTJyxcclxuICAgIEhBUkRXQVJFX0lNUE9SVF9BQ0NPVU5UUyA9ICdIQVJEV0FSRV9JTVBPUlRfQUNDT1VOVFMnLFxyXG4gICAgSEFSRFdBUkVfR0VUX0hEX1BBVEggPSAnSEFSRFdBUkVfR0VUX0hEX1BBVEgnLFxyXG4gICAgSEFSRFdBUkVfU0VUX0hEX1BBVEggPSAnSEFSRFdBUkVfU0VUX0hEX1BBVEgnLFxyXG4gICAgSEFSRFdBUkVfSVNfTElOS0VEID0gJ0hBUkRXQVJFX0lTX0xJTktFRCcsXHJcbiAgICBTRVRfREVGQVVMVF9HQVMgPSAnU0VUX0RFRkFVTFRfR0FTJyxcclxufVxyXG5cclxuZW51bSBUT0tFTiB7XHJcbiAgICBHRVRfQkFMQU5DRSA9ICdHRVRfVE9LRU5fQkFMQU5DRScsXHJcbiAgICBHRVRfVE9LRU5TID0gJ0dFVF9UT0tFTlMnLFxyXG4gICAgR0VUX1VTRVJfVE9LRU5TID0gJ0dFVF9VU0VSX1RPS0VOUycsXHJcbiAgICBHRVRfVE9LRU4gPSAnR0VUX1RPS0VOJyxcclxuICAgIEFERF9DVVNUT01fVE9LRU4gPSAnQUREX0NVU1RPTV9UT0tFTicsXHJcbiAgICBERUxFVEVfQ1VTVE9NX1RPS0VOID0gJ0RFTEVURV9DVVNUT01fVE9LRU4nLFxyXG4gICAgQUREX0NVU1RPTV9UT0tFTlMgPSAnQUREX0NVU1RPTV9UT0tFTlMnLFxyXG4gICAgU0VORF9UT0tFTiA9ICdTRU5EX1RPS0VOJyxcclxuICAgIFBPUFVMQVRFX1RPS0VOX0RBVEEgPSAnUE9QVUxBVEVfVE9LRU5fREFUQScsXHJcbiAgICBTRUFSQ0hfVE9LRU4gPSAnU0VBUkNIX1RPS0VOJyxcclxufVxyXG5cclxuZW51bSBBRERSRVNTX0JPT0sge1xyXG4gICAgQ0xFQVIgPSAnQ0xFQVInLFxyXG4gICAgREVMRVRFID0gJ0RFTEVURScsXHJcbiAgICBTRVQgPSAnU0VUJyxcclxuICAgIEdFVCA9ICdHRVQnLFxyXG4gICAgR0VUX0JZX0FERFJFU1MgPSAnR0VUX0JZX0FERFJFU1MnLFxyXG4gICAgR0VUX1JFQ0VOVF9BRERSRVNTRVMgPSAnR0VUX1JFQ0VOVF9BRERSRVNTRVMnLFxyXG59XHJcblxyXG5lbnVtIEJST1dTRVIge1xyXG4gICAgR0VUX1dJTkRPV19JRCA9ICdHRVRfV0lORE9XX0lEJyxcclxufVxyXG5cclxuZW51bSBGSUxURVJTIHtcclxuICAgIFNFVF9BQ0NPVU5UX0ZJTFRFUlMgPSAnU0VUX0FDQ09VTlRfRklMVEVSUycsXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBNZXNzYWdlcyA9IHtcclxuICAgIEFDQ09VTlQsXHJcbiAgICBBUFAsXHJcbiAgICBCQUNLR1JPVU5ELFxyXG4gICAgQ09OVEVOVCxcclxuICAgIERBUFAsXHJcbiAgICBFWENIQU5HRSxcclxuICAgIEVYVEVSTkFMLFxyXG4gICAgTkVUV09SSyxcclxuICAgIFBBU1NXT1JELFxyXG4gICAgUEVSTUlTU0lPTixcclxuICAgIFNUQVRFLFxyXG4gICAgRU5TLFxyXG4gICAgVUQsXHJcbiAgICBUUkFOU0FDVElPTixcclxuICAgIFdBTExFVCxcclxuICAgIFRPS0VOLFxyXG4gICAgQUREUkVTU19CT09LLFxyXG4gICAgQlJPV1NFUixcclxuICAgIEZJTFRFUlMsXHJcbiAgICBCUklER0UsXHJcbn07XHJcblxyXG4vLyBbTWVzc2FnZVR5cGVdOiBbUmVxdWVzdFR5cGUsIFJlc3BvbnNlVHlwZSwgU3Vic2NyaXB0aW9uTWVzc2FnZVR5cGU/XVxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RTaWduYXR1cmVzIHtcclxuICAgIFtNZXNzYWdlcy5CUk9XU0VSLkdFVF9XSU5ET1dfSURdOiBbdW5kZWZpbmVkLCBzdHJpbmddO1xyXG4gICAgW01lc3NhZ2VzLkFDQ09VTlQuQ1JFQVRFXTogW1JlcXVlc3RBY2NvdW50Q3JlYXRlLCBBY2NvdW50SW5mb107XHJcbiAgICBbTWVzc2FnZXMuQUNDT1VOVC5FWFBPUlRfSlNPTl06IFtSZXF1ZXN0QWNjb3VudEV4cG9ydEpzb24sIHN0cmluZ107XHJcbiAgICBbTWVzc2FnZXMuQUNDT1VOVC5FWFBPUlRfUFJJVkFURV9LRVldOiBbUmVxdWVzdEFjY291bnRFeHBvcnRQSywgc3RyaW5nXTtcclxuICAgIFtNZXNzYWdlcy5BQ0NPVU5ULklNUE9SVF9KU09OXTogW1JlcXVlc3RBY2NvdW50SW1wb3J0SnNvbiwgQWNjb3VudEluZm9dO1xyXG4gICAgW01lc3NhZ2VzLkFDQ09VTlQuSU1QT1JUX1BSSVZBVEVfS0VZXTogW1xyXG4gICAgICAgIFJlcXVlc3RBY2NvdW50SW1wb3J0UEssXHJcbiAgICAgICAgQWNjb3VudEluZm9cclxuICAgIF07XHJcbiAgICBbTWVzc2FnZXMuQUNDT1VOVC5SRU1PVkVdOiBbUmVxdWVzdEFjY291bnRSZW1vdmUsIGJvb2xlYW5dO1xyXG4gICAgW01lc3NhZ2VzLkFDQ09VTlQuUkVTRVRdOiBbUmVxdWVzdEFjY291bnRSZXNldCwgdm9pZF07XHJcbiAgICBbTWVzc2FnZXMuQUNDT1VOVC5ISURFXTogW1JlcXVlc3RBY2NvdW50SGlkZSwgYm9vbGVhbl07XHJcbiAgICBbTWVzc2FnZXMuQUNDT1VOVC5VTkhJREVdOiBbUmVxdWVzdEFjY291bnRVbmhpZGUsIGJvb2xlYW5dO1xyXG4gICAgW01lc3NhZ2VzLkFDQ09VTlQuUkVOQU1FXTogW1JlcXVlc3RBY2NvdW50UmVuYW1lLCBib29sZWFuXTtcclxuICAgIFtNZXNzYWdlcy5BQ0NPVU5ULlNFTEVDVF06IFtSZXF1ZXN0QWNjb3VudFNlbGVjdCwgYm9vbGVhbl07XHJcbiAgICBbTWVzc2FnZXMuQUNDT1VOVC5HRVRfQkFMQU5DRV06IFtzdHJpbmcsIEJpZ051bWJlcl07XHJcbiAgICBbTWVzc2FnZXMuQUNDT1VOVC5HRVRfTkFUSVZFX1RPS0VOX0JBTEFOQ0VdOiBbXHJcbiAgICAgICAgbnVtYmVyLFxyXG4gICAgICAgIEJpZ051bWJlciB8IHVuZGVmaW5lZFxyXG4gICAgXTtcclxuICAgIFtNZXNzYWdlcy5BUFAuR0VUX0lETEVfVElNRU9VVF06IFt1bmRlZmluZWQsIG51bWJlcl07XHJcbiAgICBbTWVzc2FnZXMuQVBQLlNFVF9JRExFX1RJTUVPVVRdOiBbUmVxdWVzdFNldElkbGVUaW1lb3V0LCB2b2lkXTtcclxuICAgIFtNZXNzYWdlcy5BUFAuU0VUX0xBU1RfVVNFUl9BQ1RJVkVfVElNRV06IFt1bmRlZmluZWQsIHZvaWRdO1xyXG4gICAgW01lc3NhZ2VzLkFQUC5MT0NLXTogW3VuZGVmaW5lZCwgYm9vbGVhbl07XHJcbiAgICBbTWVzc2FnZXMuQVBQLlVOTE9DS106IFtSZXF1ZXN0QXBwVW5sb2NrLCBib29sZWFuXTtcclxuICAgIFtNZXNzYWdlcy5BUFAuUkVUVVJOX1RPX09OQk9BUkRJTkddOiBbdW5kZWZpbmVkLCB2b2lkXTtcclxuICAgIFtNZXNzYWdlcy5BUFAuT1BFTl9SRVNFVF06IFt1bmRlZmluZWQsIHZvaWRdO1xyXG4gICAgW01lc3NhZ2VzLkFQUC5PUEVOX0hXX0NPTk5FQ1RdOiBbdW5kZWZpbmVkLCB2b2lkXTtcclxuICAgIFtNZXNzYWdlcy5BUFAuT1BFTl9IV19SRU1PVkVdOiBbdW5kZWZpbmVkLCB2b2lkXTtcclxuICAgIFtNZXNzYWdlcy5BUFAuT1BFTl9IV19SRUNPTk5FQ1RdOiBbUmVxdWVzdFJlY29ubmVjdERldmljZSwgdm9pZF07XHJcblxyXG4gICAgW01lc3NhZ2VzLkFQUC5TRVRfVVNFUl9TRVRUSU5HU106IFtSZXF1ZXN0VXNlclNldHRpbmdzLCBVc2VyU2V0dGluZ3NdO1xyXG4gICAgW01lc3NhZ2VzLkFQUC5VUERBVEVfUE9QVVBfVEFCXTogW1JlcXVlc3RVcGRhdGVQb3B1cFRhYiwgdm9pZF07XHJcbiAgICBbTWVzc2FnZXMuQVBQLlJFSkVDVF9VTkNPTkZJUk1FRF9SRVFVRVNUU106IFt1bmRlZmluZWQsIHZvaWRdO1xyXG4gICAgW01lc3NhZ2VzLkFQUC5TRVRfVVNFUl9PTkxJTkVdOiBbUmVxdWVzdFNldFVzZXJPbmxpbmUsIHZvaWRdO1xyXG4gICAgW01lc3NhZ2VzLkJBQ0tHUk9VTkQuQUNUSU9OXTogW107XHJcbiAgICBbTWVzc2FnZXMuREFQUC5DT05GSVJNX1JFUVVFU1RdOiBbUmVxdWVzdENvbmZpcm1EYXBwUmVxdWVzdCwgdm9pZF07XHJcbiAgICBbTWVzc2FnZXMuREFQUC5BVFRFTVBUX1JFSkVDVF9SRVFVRVNUXTogW1JlcXVlc3RSZWplY3REYXBwUmVxdWVzdCwgdm9pZF07XHJcbiAgICBbTWVzc2FnZXMuRVhDSEFOR0UuQ0hFQ0tfQUxMT1dBTkNFXTogW1xyXG4gICAgICAgIFJlcXVlc3RDaGVja0V4Y2hhbmdlQWxsb3dhbmNlLFxyXG4gICAgICAgIGJvb2xlYW5cclxuICAgIF07XHJcbiAgICBbTWVzc2FnZXMuRVhDSEFOR0UuQVBQUk9WRV06IFtSZXF1ZXN0QXBwcm92ZUV4Y2hhbmdlLCBib29sZWFuXTtcclxuICAgIFtNZXNzYWdlcy5FWENIQU5HRS5HRVRfUVVPVEVdOiBbUmVxdWVzdEdldEV4Y2hhbmdlUXVvdGUsIFN3YXBRdW90ZV07XHJcbiAgICBbTWVzc2FnZXMuRVhDSEFOR0UuR0VUX0VYQ0hBTkdFXTogW1JlcXVlc3RHZXRFeGNoYW5nZSwgU3dhcFBhcmFtZXRlcnNdO1xyXG4gICAgW01lc3NhZ2VzLkVYQ0hBTkdFLkVYRUNVVEVdOiBbUmVxdWVzdEV4ZWN1dGVFeGNoYW5nZSwgc3RyaW5nXTtcclxuICAgIFtNZXNzYWdlcy5FWFRFUk5BTC5SRVFVRVNUXTogW1JlcXVlc3RFeHRlcm5hbFJlcXVlc3QsIHVua25vd25dO1xyXG4gICAgW01lc3NhZ2VzLkVYVEVSTkFMLlNFVFVQX1BST1ZJREVSXTogW3VuZGVmaW5lZCwgUHJvdmlkZXJTZXR1cERhdGFdO1xyXG4gICAgW01lc3NhZ2VzLkVYVEVSTkFMLlNXX1JFSU5JVF06IFt2b2lkLCB2b2lkXTtcclxuICAgIFtNZXNzYWdlcy5FWFRFUk5BTC5TRVRfSUNPTl06IFtSZXF1ZXN0U2V0SWNvbiwgYm9vbGVhbl07XHJcbiAgICBbTWVzc2FnZXMuRVhURVJOQUwuR0VUX1BST1ZJREVSX0NPTkZJR106IFtcclxuICAgICAgICB1bmRlZmluZWQsXHJcbiAgICAgICAgUmVtb3RlQ29uZmlnc0NvbnRyb2xsZXJTdGF0ZVsncHJvdmlkZXInXVxyXG4gICAgXTtcclxuICAgIFtNZXNzYWdlcy5CUklER0UuR0VUX0JSSURHRV9UT0tFTlNdOiBbUmVxdWVzdEdldEJyaWRnZVRva2VucywgSVRva2VuW11dO1xyXG5cclxuICAgIFtNZXNzYWdlcy5CUklER0UuQVBQUk9WRV9CUklER0VfQUxMT1dBTkNFXTogW1xyXG4gICAgICAgIFJlcXVlc3RBcHByb3ZlQnJpZGdlQWxsb3dhbmNlLFxyXG4gICAgICAgIGJvb2xlYW5cclxuICAgIF07XHJcbiAgICBbTWVzc2FnZXMuQlJJREdFLkdFVF9CUklER0VfQVZBSUxBQkxFX0NIQUlOU106IFtcclxuICAgICAgICBSZXF1ZXN0R2V0QnJpZGdlQXZhaWxhYmxlQ2hhaW5zLFxyXG4gICAgICAgIElDaGFpbltdXHJcbiAgICBdO1xyXG4gICAgW01lc3NhZ2VzLkJSSURHRS5HRVRfQlJJREdFX1FVT1RFXTogW1xyXG4gICAgICAgIFJlcXVlc3RHZXRCcmlkZ2VRdW90ZSxcclxuICAgICAgICBHZXRCcmlkZ2VRdW90ZVJlc3BvbnNlXHJcbiAgICBdO1xyXG4gICAgW01lc3NhZ2VzLkJSSURHRS5HRVRfQlJJREdFX1JPVVRFU106IFtcclxuICAgICAgICBSZXF1ZXN0R2V0QnJpZGdlUm91dGVzLFxyXG4gICAgICAgIEdldEJyaWRnZUF2YWlsYWJsZVJvdXRlc1Jlc3BvbnNlXHJcbiAgICBdO1xyXG4gICAgW01lc3NhZ2VzLkJSSURHRS5FWEVDVVRFX0JSSURHRV06IFtSZXF1ZXN0RXhlY3V0ZUJyaWRnZSwgc3RyaW5nXTtcclxuXHJcbiAgICBbTWVzc2FnZXMuTkVUV09SSy5DSEFOR0VdOiBbUmVxdWVzdE5ldHdvcmtDaGFuZ2UsIGJvb2xlYW5dO1xyXG4gICAgW01lc3NhZ2VzLk5FVFdPUksuU0VUX1NIT1dfVEVTVF9ORVRXT1JLU106IFtcclxuICAgICAgICBSZXF1ZXN0U2hvd1Rlc3ROZXR3b3JrcyxcclxuICAgICAgICBib29sZWFuXHJcbiAgICBdO1xyXG4gICAgW01lc3NhZ2VzLk5FVFdPUksuQUREX05FVFdPUktdOiBbUmVxdWVzdEFkZE5ldHdvcmssIHZvaWRdO1xyXG4gICAgW01lc3NhZ2VzLk5FVFdPUksuRURJVF9ORVRXT1JLXTogW1JlcXVlc3RFZGl0TmV0d29yaywgdm9pZF07XHJcbiAgICBbTWVzc2FnZXMuTkVUV09SSy5FRElUX05FVFdPUktTX09SREVSXTogW1JlcXVlc3RFZGl0TmV0d29ya3NPcmRlciwgdm9pZF07XHJcbiAgICBbTWVzc2FnZXMuTkVUV09SSy5SRU1PVkVfTkVUV09SS106IFtSZXF1ZXN0UmVtb3ZlTmV0d29yaywgdm9pZF07XHJcbiAgICBbTWVzc2FnZXMuTkVUV09SSy5HRVRfU1BFQ0lGSUNfQ0hBSU5fREVUQUlMU106IFtcclxuICAgICAgICBSZXF1ZXN0R2V0Q2hhaW5EYXRhLFxyXG4gICAgICAgIENoYWluTGlzdEl0ZW1cclxuICAgIF07XHJcbiAgICBbTWVzc2FnZXMuTkVUV09SSy5HRVRfUlBDX0NIQUlOX0lEXTogW1JlcXVlc3RHZXRScGNDaGFpbklkLCBudW1iZXJdO1xyXG4gICAgW01lc3NhZ2VzLk5FVFdPUksuU0VBUkNIX0NIQUlOU106IFtcclxuICAgICAgICBSZXF1ZXN0U2VhcmNoQ2hhaW5zLFxyXG4gICAgICAgIHsgbmFtZTogc3RyaW5nOyBsb2dvOiBzdHJpbmcgfVxyXG4gICAgXTtcclxuICAgIFtNZXNzYWdlcy5QQVNTV09SRC5WRVJJRlldOiBbUmVxdWVzdFBhc3N3b3JkVmVyaWZ5LCBib29sZWFuXTtcclxuICAgIFtNZXNzYWdlcy5QQVNTV09SRC5DSEFOR0VdOiBbUmVxdWVzdFBhc3N3b3JkQ2hhbmdlLCBib29sZWFuXTtcclxuICAgIFtNZXNzYWdlcy5QRVJNSVNTSU9OLkFERF9ORVddOiBbUmVxdWVzdEFkZE5ld1NpdGVXaXRoUGVybWlzc2lvbnMsIGJvb2xlYW5dO1xyXG4gICAgW01lc3NhZ2VzLlBFUk1JU1NJT04uQ09ORklSTV06IFtSZXF1ZXN0Q29uZmlybVBlcm1pc3Npb24sIGJvb2xlYW5dO1xyXG4gICAgW01lc3NhZ2VzLlBFUk1JU1NJT04uR0VUX0FDQ09VTlRfUEVSTUlTU0lPTlNdOiBbXHJcbiAgICAgICAgUmVxdWVzdEdldEFjY291bnRQZXJtaXNzaW9ucyxcclxuICAgICAgICBzdHJpbmdbXVxyXG4gICAgXTtcclxuICAgIFtNZXNzYWdlcy5QRVJNSVNTSU9OLlJFTU9WRV9BQ0NPVU5UX0ZST01fU0lURV06IFtcclxuICAgICAgICBSZXF1ZXN0UmVtb3ZlQWNjb3VudEZyb21TaXRlLFxyXG4gICAgICAgIGJvb2xlYW5cclxuICAgIF07XHJcbiAgICBbTWVzc2FnZXMuUEVSTUlTU0lPTi5VUERBVEVfU0lURV9QRVJNSVNTSU9OU106IFtcclxuICAgICAgICBSZXF1ZXN0VXBkYXRlU2l0ZVBlcm1pc3Npb25zLFxyXG4gICAgICAgIGJvb2xlYW5cclxuICAgIF07XHJcbiAgICBbTWVzc2FnZXMuU1RBVEUuR0VUXTogW3VuZGVmaW5lZCwgUmVzcG9uc2VHZXRTdGF0ZV07XHJcbiAgICBbTWVzc2FnZXMuRU5TLlJFU09MVkVfTkFNRV06IFtSZXF1ZXN0RW5zUmVzb2x2ZSwgc3RyaW5nIHwgbnVsbF07XHJcbiAgICBbTWVzc2FnZXMuRU5TLkxPT0tVUF9BRERSRVNTXTogW1JlcXVlc3RFbnNMb29rdXAsIHN0cmluZyB8IG51bGxdO1xyXG4gICAgW01lc3NhZ2VzLlVELlJFU09MVkVfTkFNRV06IFtSZXF1ZXN0VURSZXNvbHZlLCBzdHJpbmcgfCBudWxsXTtcclxuICAgIFtNZXNzYWdlcy5UUkFOU0FDVElPTi5DT05GSVJNXTogW1JlcXVlc3RDb25maXJtVHJhbnNhY3Rpb24sIHN0cmluZ107XHJcbiAgICBbTWVzc2FnZXMuVFJBTlNBQ1RJT04uUkVKRUNUXTogW1JlcXVlc3RSZWplY3RUcmFuc2FjdGlvbiwgYm9vbGVhbl07XHJcbiAgICBbTWVzc2FnZXMuVFJBTlNBQ1RJT04uUkVKRUNUX1JFUExBQ0VNRU5UX1RSQU5TQUNUSU9OXTogW1xyXG4gICAgICAgIFJlcXVlc3RSZWplY3RUcmFuc2FjdGlvbixcclxuICAgICAgICBib29sZWFuXHJcbiAgICBdO1xyXG4gICAgW01lc3NhZ2VzLlRSQU5TQUNUSU9OLkdFVF9MQVRFU1RfR0FTX1BSSUNFXTogW3VuZGVmaW5lZCwgQmlnTnVtYmVyXTtcclxuICAgIFtNZXNzYWdlcy5UUkFOU0FDVElPTi5GRVRDSF9MQVRFU1RfR0FTX1BSSUNFXTogW251bWJlciwgR2FzUHJpY2VEYXRhXTtcclxuICAgIFtNZXNzYWdlcy5UUkFOU0FDVElPTi5TRU5EX0VUSEVSXTogW1JlcXVlc3RTZW5kRXRoZXIsIHN0cmluZ107XHJcbiAgICBbTWVzc2FnZXMuVFJBTlNBQ1RJT04uQUREX05FV19TRU5EX1RSQU5TQUNUSU9OXTogW1xyXG4gICAgICAgIFJlcXVlc3RBZGRBc05ld1NlbmRUcmFuc2FjdGlvbixcclxuICAgICAgICBUcmFuc2FjdGlvbk1ldGFcclxuICAgIF07XHJcbiAgICBbTWVzc2FnZXMuVFJBTlNBQ1RJT04uVVBEQVRFX1NFTkRfVFJBTlNBQ1RJT05fR0FTXTogW1xyXG4gICAgICAgIFJlcXVlc3RVcGRhdGVTZW5kVHJhbnNhY3Rpb25HYXMsXHJcbiAgICAgICAgdm9pZFxyXG4gICAgXTtcclxuICAgIFtNZXNzYWdlcy5UUkFOU0FDVElPTi5BUFBST1ZFX1NFTkRfVFJBTlNBQ1RJT05dOiBbXHJcbiAgICAgICAgUmVxdWVzdEFwcHJvdmVTZW5kVHJhbnNhY3Rpb24sXHJcbiAgICAgICAgdm9pZFxyXG4gICAgXTtcclxuICAgIFtNZXNzYWdlcy5UUkFOU0FDVElPTi5HRVRfU0VORF9UUkFOU0FDVElPTl9SRVNVTFRdOiBbXHJcbiAgICAgICAgUmVxdWVzdFNlbmRUcmFuc2FjdGlvblJlc3VsdCxcclxuICAgICAgICBzdHJpbmdcclxuICAgIF07XHJcbiAgICBbTWVzc2FnZXMuVFJBTlNBQ1RJT04uQ0FMQ1VMQVRFX0FQUFJPVkVfVFJBTlNBQ1RJT05fR0FTX0xJTUlUXTogW1xyXG4gICAgICAgIFJlcXVlc3RDYWxjdWxhdGVBcHByb3ZlVHJhbnNhY3Rpb25HYXNMaW1pdCxcclxuICAgICAgICBUcmFuc2FjdGlvbkdhc0VzdGltYXRpb25cclxuICAgIF07XHJcbiAgICBbTWVzc2FnZXMuVFJBTlNBQ1RJT04uQ0FMQ1VMQVRFX1NFTkRfVFJBTlNBQ1RJT05fR0FTX0xJTUlUXTogW1xyXG4gICAgICAgIFJlcXVlc3RDYWxjdWxhdGVTZW5kVHJhbnNhY3Rpb25HYXNMaW1pdCxcclxuICAgICAgICBUcmFuc2FjdGlvbkdhc0VzdGltYXRpb25cclxuICAgIF07XHJcbiAgICBbTWVzc2FnZXMuVFJBTlNBQ1RJT04uQ0FOQ0VMX1RSQU5TQUNUSU9OXTogW1JlcXVlc3RDYW5jZWxUcmFuc2FjdGlvbiwgdm9pZF07XHJcbiAgICBbTWVzc2FnZXMuVFJBTlNBQ1RJT04uU1BFRURfVVBfVFJBTlNBQ1RJT05dOiBbXHJcbiAgICAgICAgUmVxdWVzdFNwZWVkVXBUcmFuc2FjdGlvbixcclxuICAgICAgICB2b2lkXHJcbiAgICBdO1xyXG4gICAgW01lc3NhZ2VzLlRSQU5TQUNUSU9OLkdFVF9TUEVFRF9VUF9HQVNfUFJJQ0VdOiBbXHJcbiAgICAgICAgUmVxdWVzdEdldENhbmNlbFNwZWVkVXBHYXNQcmljZVRyYW5zYWN0aW9uLFxyXG4gICAgICAgIEdhc1ByaWNlVmFsdWUgfCBGZWVNYXJrZXRFSVAxNTU5VmFsdWVzXHJcbiAgICBdO1xyXG4gICAgW01lc3NhZ2VzLlRSQU5TQUNUSU9OLkdFVF9DQU5DRUxfR0FTX1BSSUNFXTogW1xyXG4gICAgICAgIFJlcXVlc3RHZXRDYW5jZWxTcGVlZFVwR2FzUHJpY2VUcmFuc2FjdGlvbixcclxuICAgICAgICBHYXNQcmljZVZhbHVlIHwgRmVlTWFya2V0RUlQMTU1OVZhbHVlc1xyXG4gICAgXTtcclxuICAgIFtNZXNzYWdlcy5UUkFOU0FDVElPTi5HRVRfTkVYVF9OT05DRV06IFtSZXF1ZXN0TmV4dE5vbmNlLCBudW1iZXJdO1xyXG4gICAgW01lc3NhZ2VzLldBTExFVC5DUkVBVEVdOiBbUmVxdWVzdFdhbGxldENyZWF0ZSwgdm9pZF07XHJcbiAgICBbTWVzc2FnZXMuV0FMTEVULklNUE9SVF06IFtSZXF1ZXN0V2FsbGV0SW1wb3J0LCBib29sZWFuXTtcclxuICAgIFtNZXNzYWdlcy5XQUxMRVQuVkVSSUZZX1NFRURfUEhSQVNFXTogW1JlcXVlc3RWZXJpZnlTZWVkUGhyYXNlLCBib29sZWFuXTtcclxuICAgIFtNZXNzYWdlcy5XQUxMRVQuUkVRVUVTVF9TRUVEX1BIUkFTRV06IFtSZXF1ZXN0U2VlZFBocmFzZSwgc3RyaW5nXTtcclxuICAgIFtNZXNzYWdlcy5XQUxMRVQuU0VUVVBfQ09NUExFVEVdOiBbUmVxdWVzdENvbXBsZXRlU2V0dXAsIHZvaWRdO1xyXG4gICAgW01lc3NhZ2VzLldBTExFVC5SRVNFVF06IFtSZXF1ZXN0V2FsbGV0UmVzZXQsIGJvb2xlYW5dO1xyXG4gICAgW01lc3NhZ2VzLlNUQVRFLlNVQlNDUklCRV06IFt1bmRlZmluZWQsIGJvb2xlYW4sIFN0YXRlU3Vic2NyaXB0aW9uXTtcclxuICAgIFtNZXNzYWdlcy5TVEFURS5HRVRfUkVNT1RFX0NPTkZJR106IFtcclxuICAgICAgICB1bmRlZmluZWQsXHJcbiAgICAgICAgUmVtb3RlQ29uZmlnc0NvbnRyb2xsZXJTdGF0ZVxyXG4gICAgXTtcclxuICAgIFtNZXNzYWdlcy5UT0tFTi5HRVRfQkFMQU5DRV06IFtSZXF1ZXN0R2V0VG9rZW5CYWxhbmNlLCBCaWdOdW1iZXJdO1xyXG4gICAgW01lc3NhZ2VzLlRPS0VOLkdFVF9UT0tFTlNdOiBbUmVxdWVzdEdldFRva2VucywgSVRva2Vuc107XHJcbiAgICBbTWVzc2FnZXMuVE9LRU4uR0VUX1VTRVJfVE9LRU5TXTogW1JlcXVlc3RHZXRVc2VyVG9rZW5zLCBJVG9rZW5zXTtcclxuICAgIFtNZXNzYWdlcy5UT0tFTi5HRVRfVE9LRU5dOiBbUmVxdWVzdEdldFRva2VuLCBUb2tlbl07XHJcbiAgICBbTWVzc2FnZXMuVE9LRU4uQUREX0NVU1RPTV9UT0tFTl06IFtSZXF1ZXN0QWRkQ3VzdG9tVG9rZW4sIHZvaWQgfCB2b2lkW11dO1xyXG4gICAgW01lc3NhZ2VzLlRPS0VOLkRFTEVURV9DVVNUT01fVE9LRU5dOiBbUmVxdWVzdERlbGV0ZUN1c3RvbVRva2VuLCB2b2lkXTtcclxuICAgIFtNZXNzYWdlcy5UT0tFTi5BRERfQ1VTVE9NX1RPS0VOU106IFtSZXF1ZXN0QWRkQ3VzdG9tVG9rZW5zLCB2b2lkIHwgdm9pZFtdXTtcclxuICAgIFtNZXNzYWdlcy5UT0tFTi5TRU5EX1RPS0VOXTogW1JlcXVlc3RTZW5kVG9rZW4sIHN0cmluZ107XHJcbiAgICBbTWVzc2FnZXMuVE9LRU4uUE9QVUxBVEVfVE9LRU5fREFUQV06IFtSZXF1ZXN0UG9wdWxhdGVUb2tlbkRhdGEsIFRva2VuXTtcclxuICAgIFtNZXNzYWdlcy5UT0tFTi5TRUFSQ0hfVE9LRU5dOiBbUmVxdWVzdFNlYXJjaFRva2VuLCBTZWFyY2hUb2tlbnNSZXNwb25zZV07XHJcbiAgICBbTWVzc2FnZXMuRVhURVJOQUwuRVZFTlRfU1VCU0NSSVBUSU9OXTogW1xyXG4gICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICBib29sZWFuLFxyXG4gICAgICAgIEV4dGVybmFsRXZlbnRTdWJzY3JpcHRpb25cclxuICAgIF07XHJcbiAgICBbTWVzc2FnZXMuQUREUkVTU19CT09LLkNMRUFSXTogW1JlcXVlc3RBZGRyZXNzQm9va0NsZWFyLCBib29sZWFuXTtcclxuICAgIFtNZXNzYWdlcy5BRERSRVNTX0JPT0suREVMRVRFXTogW1JlcXVlc3RBZGRyZXNzQm9va0RlbGV0ZSwgYm9vbGVhbl07XHJcbiAgICBbTWVzc2FnZXMuQUREUkVTU19CT09LLlNFVF06IFtSZXF1ZXN0QWRkcmVzc0Jvb2tTZXQsIGJvb2xlYW5dO1xyXG4gICAgW01lc3NhZ2VzLkFERFJFU1NfQk9PSy5HRVRdOiBbUmVxdWVzdEFkZHJlc3NCb29rR2V0LCBOZXR3b3JrQWRkcmVzc0Jvb2tdO1xyXG4gICAgW01lc3NhZ2VzLkFERFJFU1NfQk9PSy5HRVRfQllfQUREUkVTU106IFtcclxuICAgICAgICBSZXF1ZXN0QWRkcmVzc0Jvb2tHZXRCeUFkZHJlc3MsXHJcbiAgICAgICAgQWRkcmVzc0Jvb2tFbnRyeSB8IHVuZGVmaW5lZFxyXG4gICAgXTtcclxuICAgIFtNZXNzYWdlcy5BRERSRVNTX0JPT0suR0VUX1JFQ0VOVF9BRERSRVNTRVNdOiBbXHJcbiAgICAgICAgUmVxdWVzdEFkZHJlc3NCb29rR2V0UmVjZW50QWRkcmVzc2VzLFxyXG4gICAgICAgIE5ldHdvcmtBZGRyZXNzQm9va1xyXG4gICAgXTtcclxuICAgIFtNZXNzYWdlcy5XQUxMRVQuRElTTUlTU19XRUxDT01FX01FU1NBR0VdOiBbRGlzbWlzc01lc3NhZ2UsIGJvb2xlYW5dO1xyXG4gICAgW01lc3NhZ2VzLldBTExFVC5ESVNNSVNTX0RFRkFVTFRfV0FMTEVUX1BSRUZFUkVOQ0VTXTogW1xyXG4gICAgICAgIERpc21pc3NNZXNzYWdlLFxyXG4gICAgICAgIGJvb2xlYW5cclxuICAgIF07XHJcbiAgICBbTWVzc2FnZXMuV0FMTEVULkRJU01JU1NfUkVMRUFTRV9OT1RFU106IFtEaXNtaXNzTWVzc2FnZSwgYm9vbGVhbl07XHJcbiAgICBbTWVzc2FnZXMuV0FMTEVULlRPR0dMRV9SRUxFQVNFX05PVEVTX1NVQlNDUklQVElPTl06IFtcclxuICAgICAgICBSZXF1ZXN0VG9nZ2xlUmVsZWFzZU5vdGVzU3Vic2NyaXB0aW9uLFxyXG4gICAgICAgIHZvaWRcclxuICAgIF07XHJcbiAgICBbTWVzc2FnZXMuV0FMTEVULlRPR0dMRV9ERUZBVUxUX0JST1dTRVJfV0FMTEVUXTogW1xyXG4gICAgICAgIFJlcXVlc3RUb2dnbGVEZWZhdWx0QnJvd3NlcldhbGxldCxcclxuICAgICAgICB2b2lkXHJcbiAgICBdO1xyXG4gICAgW01lc3NhZ2VzLldBTExFVC5TRVRfREVGQVVMVF9HQVNdOiBbUmVxdWVzdFNldERlZmF1bHRHYXMsIHZvaWRdO1xyXG5cclxuICAgIFtNZXNzYWdlcy5XQUxMRVQuVVBEQVRFX0FOVElfUEhJU0hJTkdfSU1BR0VdOiBbXHJcbiAgICAgICAgUmVxdWVzdFVwZGF0ZUFudGlQaGlzaGluZ0ltYWdlLFxyXG4gICAgICAgIHZvaWRcclxuICAgIF07XHJcblxyXG4gICAgW01lc3NhZ2VzLldBTExFVC5UT0dHTEVfQU5USV9QSElTSElOR19QUk9URUNUSU9OXTogW1xyXG4gICAgICAgIFJlcXVlc3RUb2dnbGVBbnRpUGhpc2hpbmdQcm90ZWN0aW9uLFxyXG4gICAgICAgIHZvaWRcclxuICAgIF07XHJcblxyXG4gICAgW01lc3NhZ2VzLldBTExFVC5TRVRfTkFUSVZFX0NVUlJFTkNZXTogW1JlcXVlc3RTZXROYXRpdmVDdXJyZW5jeSwgdm9pZF07XHJcbiAgICBbTWVzc2FnZXMuV0FMTEVULkdFVF9WQUxJRF9DVVJSRU5DSUVTXTogW1xyXG4gICAgICAgIFJlcXVlc3RHZXRWYWxpZEN1cnJlbmNpZXMsXHJcbiAgICAgICAgQ3VycmVuY3lbXVxyXG4gICAgXTtcclxuICAgIFtNZXNzYWdlcy5XQUxMRVQuSEFSRFdBUkVfQ09OTkVDVF06IFtSZXF1ZXN0Q29ubmVjdEhhcmR3YXJlV2FsbGV0LCBib29sZWFuXTtcclxuICAgIFtNZXNzYWdlcy5XQUxMRVQuSEFSRFdBUkVfUkVNT1ZFXTogW1JlcXVlc3RSZW1vdmVIYXJkd2FyZVdhbGxldCwgYm9vbGVhbl07XHJcbiAgICBbTWVzc2FnZXMuV0FMTEVULkhBUkRXQVJFX0dFVF9BQ0NPVU5UU106IFtcclxuICAgICAgICBSZXF1ZXN0R2V0SGFyZHdhcmVXYWxsZXRBY2NvdW50cyxcclxuICAgICAgICBBY2NvdW50SW5mb1tdXHJcbiAgICBdO1xyXG4gICAgW01lc3NhZ2VzLldBTExFVC5IQVJEV0FSRV9JTVBPUlRfQUNDT1VOVFNdOiBbXHJcbiAgICAgICAgUmVxdWVzdEltcG9ydEhhcmR3YXJlV2FsbGV0QWNjb3VudHMsXHJcbiAgICAgICAgQWNjb3VudEluZm9bXVxyXG4gICAgXTtcclxuICAgIFtNZXNzYWdlcy5XQUxMRVQuSEFSRFdBUkVfR0VUX0hEX1BBVEhdOiBbUmVxdWVzdFdhbGxldEdldEhEUGF0aCwgc3RyaW5nXTtcclxuICAgIFtNZXNzYWdlcy5XQUxMRVQuSEFSRFdBUkVfU0VUX0hEX1BBVEhdOiBbUmVxdWVzdFdhbGxldFNldEhEUGF0aCwgdm9pZF07XHJcbiAgICBbTWVzc2FnZXMuV0FMTEVULkhBUkRXQVJFX0lTX0xJTktFRF06IFtSZXF1ZXN0SXNEZXZpY2VDb25uZWN0ZWQsIGJvb2xlYW5dO1xyXG4gICAgW01lc3NhZ2VzLkZJTFRFUlMuU0VUX0FDQ09VTlRfRklMVEVSU106IFtcclxuICAgICAgICBSZXF1ZXN0U2V0QWNjb3VudEZpbHRlcnMsXHJcbiAgICAgICAgdW5kZWZpbmVkXHJcbiAgICBdO1xyXG4gICAgW01lc3NhZ2VzLldBTExFVC5HRU5FUkFURV9PTl9ERU1BTkRfUkVMRUFTRV9OT1RFU106IFtcclxuICAgICAgICBSZXF1ZXN0R2VuZXJhdGVPbkRlbWFuZFJlbGVhc2VOb3RlcyxcclxuICAgICAgICBSZWxlYXNlTm90ZVtdXHJcbiAgICBdO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBNZXNzYWdlVHlwZXMgPSBrZXlvZiBSZXF1ZXN0U2lnbmF0dXJlcztcclxuXHJcbmV4cG9ydCB0eXBlIFJlcXVlc3RUeXBlcyA9IHtcclxuICAgIFtNZXNzYWdlVHlwZSBpbiBrZXlvZiBSZXF1ZXN0U2lnbmF0dXJlc106IFJlcXVlc3RTaWduYXR1cmVzW01lc3NhZ2VUeXBlXVswXTtcclxufTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdFNldFVzZXJPbmxpbmUge1xyXG4gICAgbmV0d29ya1N0YXR1czogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0QWNjb3VudENyZWF0ZSB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdEFjY291bnRFeHBvcnRKc29uIHtcclxuICAgIGFkZHJlc3M6IHN0cmluZztcclxuICAgIHBhc3N3b3JkOiBzdHJpbmc7XHJcbiAgICBlbmNyeXB0UGFzc3dvcmQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0QWNjb3VudEV4cG9ydFBLIHtcclxuICAgIGFkZHJlc3M6IHN0cmluZztcclxuICAgIHBhc3N3b3JkOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdEFjY291bnRJbXBvcnRKc29uIHtcclxuICAgIGltcG9ydEFyZ3M6IEltcG9ydEFyZ3VtZW50c1tJbXBvcnRTdHJhdGVneS5KU09OX0ZJTEVdO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RBY2NvdW50SW1wb3J0UEsge1xyXG4gICAgaW1wb3J0QXJnczogSW1wb3J0QXJndW1lbnRzW0ltcG9ydFN0cmF0ZWd5LlBSSVZBVEVfS0VZXTtcclxuICAgIG5hbWU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0QWNjb3VudFJlbW92ZSB7XHJcbiAgICBhZGRyZXNzOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdEFjY291bnRSZXNldCB7XHJcbiAgICBhZGRyZXNzOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdEFjY291bnRIaWRlIHtcclxuICAgIGFkZHJlc3M6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0QWNjb3VudFVuaGlkZSB7XHJcbiAgICBhZGRyZXNzOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdEFjY291bnRSZW5hbWUge1xyXG4gICAgYWRkcmVzczogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RBY2NvdW50U2VsZWN0IHtcclxuICAgIGFkZHJlc3M6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0QXBwVW5sb2NrIHtcclxuICAgIHBhc3N3b3JkOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdFNldElkbGVUaW1lb3V0IHtcclxuICAgIGlkbGVUaW1lb3V0OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdENvbmZpcm1EYXBwUmVxdWVzdCB7XHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgaXNDb25maXJtZWQ6IGJvb2xlYW47XHJcbiAgICBjb25maXJtT3B0aW9ucz86IERhcHBSZXF1ZXN0Q29uZmlybU9wdGlvbnNbRGFwcFJlcV07XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdFJlamVjdERhcHBSZXF1ZXN0IHtcclxuICAgIGlkOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdFJlY29ubmVjdERldmljZSB7XHJcbiAgICBhZGRyZXNzOiBzdHJpbmc7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0Q2hlY2tFeGNoYW5nZUFsbG93YW5jZSB7XHJcbiAgICBhY2NvdW50OiBzdHJpbmc7XHJcbiAgICBhbW91bnQ6IEJpZ051bWJlcjtcclxuICAgIGV4Y2hhbmdlVHlwZTogRXhjaGFuZ2VUeXBlO1xyXG4gICAgdG9rZW5BZGRyZXNzOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdEFwcHJvdmVFeGNoYW5nZSB7XHJcbiAgICBhbGxvd2FuY2U6IEJpZ051bWJlcjtcclxuICAgIGFtb3VudDogQmlnTnVtYmVyO1xyXG4gICAgZXhjaGFuZ2VUeXBlOiBFeGNoYW5nZVR5cGU7XHJcbiAgICBmZWVEYXRhOiBUcmFuc2FjdGlvbkZlZURhdGE7XHJcbiAgICB0b2tlbkFkZHJlc3M6IHN0cmluZztcclxuICAgIGN1c3RvbU5vbmNlPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RHZXRFeGNoYW5nZVF1b3RlIHtcclxuICAgIGV4Y2hhbmdlVHlwZTogRXhjaGFuZ2VUeXBlO1xyXG4gICAgcXVvdGVQYXJhbXM6IE9uZUluY2hTd2FwUXVvdGVQYXJhbXM7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdEdldEV4Y2hhbmdlIHtcclxuICAgIGV4Y2hhbmdlVHlwZTogRXhjaGFuZ2VUeXBlO1xyXG4gICAgZXhjaGFuZ2VQYXJhbXM6IE9uZUluY2hTd2FwUmVxdWVzdFBhcmFtcztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0RXhlY3V0ZUV4Y2hhbmdlIHtcclxuICAgIGV4Y2hhbmdlVHlwZTogRXhjaGFuZ2VUeXBlO1xyXG4gICAgZXhjaGFuZ2VQYXJhbXM6IFN3YXBUcmFuc2FjdGlvbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0QXBwcm92ZUJyaWRnZUFsbG93YW5jZSB7XHJcbiAgICBhbGxvd2FuY2U6IEJpZ051bWJlcjtcclxuICAgIGFtb3VudDogQmlnTnVtYmVyO1xyXG4gICAgc3BlbmRlckFkZHJlc3M6IHN0cmluZztcclxuICAgIGZlZURhdGE6IFRyYW5zYWN0aW9uRmVlRGF0YTtcclxuICAgIHRva2VuQWRkcmVzczogc3RyaW5nO1xyXG4gICAgY3VzdG9tTm9uY2U/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdEdldEJyaWRnZVRva2VucyB7fVxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RHZXRCcmlkZ2VBdmFpbGFibGVDaGFpbnMge31cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0R2V0QnJpZGdlUXVvdGUge1xyXG4gICAgY2hlY2tBbGxvd2FuY2U6IGJvb2xlYW47XHJcbiAgICBxdW90ZVJlcXVlc3Q6IEJyaWRnZVF1b3RlUmVxdWVzdDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0R2V0QnJpZGdlUm91dGVzIHtcclxuICAgIHJvdXRlc1JlcXVlc3Q6IEJyaWRnZVJvdXRlc1JlcXVlc3Q7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0RXhlY3V0ZUJyaWRnZSB7XHJcbiAgICBicmlkZ2VUcmFuc2FjdGlvbjogQnJpZGdlVHJhbnNhY3Rpb247XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFJlcXVlc3RFeHRlcm5hbFJlcXVlc3QgPSBSZXF1ZXN0QXJndW1lbnRzO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0U2V0SWNvbiB7XHJcbiAgICBpY29uVVJMOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdE5ldHdvcmtDaGFuZ2Uge1xyXG4gICAgbmV0d29ya05hbWU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0U2hvd1Rlc3ROZXR3b3JrcyB7XHJcbiAgICBzaG93VGVzdE5ldHdvcmtzOiBib29sZWFuO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdEFkZE5ldHdvcmsge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgcnBjVXJsOiBzdHJpbmc7XHJcbiAgICBjaGFpbklkOiBzdHJpbmc7XHJcbiAgICBjdXJyZW5jeVN5bWJvbDogc3RyaW5nO1xyXG4gICAgYmxvY2tFeHBsb3JlclVybDogc3RyaW5nO1xyXG4gICAgdGVzdDogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0RWRpdE5ldHdvcmsge1xyXG4gICAgY2hhaW5JZDogc3RyaW5nO1xyXG4gICAgdXBkYXRlczoge1xyXG4gICAgICAgIHJwY1VybDogc3RyaW5nO1xyXG4gICAgICAgIGJsb2NrRXhwbG9yZXJVcmw/OiBzdHJpbmc7XHJcbiAgICAgICAgbmFtZTogc3RyaW5nO1xyXG4gICAgICAgIHRlc3Q6IGJvb2xlYW47XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGVkaXROZXR3b3JrT3JkZXIge1xyXG4gICAgY2hhaW5JZDogbnVtYmVyO1xyXG4gICAgb3JkZXI6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0RWRpdE5ldHdvcmtzT3JkZXIge1xyXG4gICAgbmV0d29ya3NPcmRlcjogZWRpdE5ldHdvcmtPcmRlcltdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RSZW1vdmVOZXR3b3JrIHtcclxuICAgIGNoYWluSWQ6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0R2V0Q2hhaW5EYXRhIHtcclxuICAgIGNoYWluSWQ6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0R2V0UnBjQ2hhaW5JZCB7XHJcbiAgICBycGNVcmw6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0U2VhcmNoQ2hhaW5zIHtcclxuICAgIHRlcm06IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0UGFzc3dvcmRWZXJpZnkge1xyXG4gICAgcGFzc3dvcmQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0UGFzc3dvcmRDaGFuZ2Uge1xyXG4gICAgcGFzc3dvcmQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0RW5zUmVzb2x2ZSB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdEVuc0xvb2t1cCB7XHJcbiAgICBhZGRyZXNzOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdFVEUmVzb2x2ZSB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdEFkZE5ld1NpdGVXaXRoUGVybWlzc2lvbnMge1xyXG4gICAgYWNjb3VudHM6IHN0cmluZ1tdO1xyXG4gICAgb3JpZ2luOiBzdHJpbmc7XHJcbiAgICBzaXRlTWV0YWRhdGE6IFNpdGVNZXRhZGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0Q29uZmlybVBlcm1pc3Npb24ge1xyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIGFjY291bnRzOiBzdHJpbmdbXSB8IG51bGw7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdEdldEFjY291bnRQZXJtaXNzaW9ucyB7XHJcbiAgICBhY2NvdW50OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdFJlbW92ZUFjY291bnRGcm9tU2l0ZSB7XHJcbiAgICBvcmlnaW46IHN0cmluZztcclxuICAgIGFjY291bnQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0VXBkYXRlU2l0ZVBlcm1pc3Npb25zIHtcclxuICAgIG9yaWdpbjogc3RyaW5nO1xyXG4gICAgYWNjb3VudHM6IHN0cmluZ1tdIHwgbnVsbDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0Q29uZmlybVRyYW5zYWN0aW9uIHtcclxuICAgIGlkOiBzdHJpbmc7XHJcbiAgICBmZWVEYXRhOiBUcmFuc2FjdGlvbkZlZURhdGE7XHJcbiAgICBhZHZhbmNlZERhdGE6IFRyYW5zYWN0aW9uQWR2YW5jZWREYXRhO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RTZW5kRXRoZXIge1xyXG4gICAgdG86IHN0cmluZztcclxuICAgIHZhbHVlOiBCaWdOdW1iZXI7XHJcbiAgICBmZWVEYXRhOiBUcmFuc2FjdGlvbkZlZURhdGE7XHJcbiAgICBhZHZhbmNlZERhdGE6IFRyYW5zYWN0aW9uQWR2YW5jZWREYXRhO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RXYWxsZXRDcmVhdGUge1xyXG4gICAgcGFzc3dvcmQ6IHN0cmluZztcclxuICAgIGFudGlQaGlzaGluZ0ltYWdlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdFNlZWRQaHJhc2Uge1xyXG4gICAgcGFzc3dvcmQ6IHN0cmluZztcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RDb21wbGV0ZVNldHVwIHtcclxuICAgIHNlbmROb3RpZmljYXRpb246IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdFdhbGxldEltcG9ydCB7XHJcbiAgICBwYXNzd29yZDogc3RyaW5nO1xyXG4gICAgc2VlZFBocmFzZTogc3RyaW5nO1xyXG4gICAgYW50aVBoaXNoaW5nSW1hZ2U6IHN0cmluZztcclxuICAgIHJlSW1wb3J0PzogYm9vbGVhbjtcclxuICAgIGRlZmF1bHROZXR3b3JrPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RXYWxsZXRSZXNldCB7XHJcbiAgICBwYXNzd29yZDogc3RyaW5nO1xyXG4gICAgc2VlZFBocmFzZTogc3RyaW5nO1xyXG4gICAgYW50aVBoaXNoaW5nSW1hZ2U6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0V2FsbGV0R2V0SERQYXRoIHtcclxuICAgIGRldmljZTogRGV2aWNlcztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0V2FsbGV0U2V0SERQYXRoIHtcclxuICAgIGRldmljZTogRGV2aWNlcztcclxuICAgIHBhdGg6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0VmVyaWZ5U2VlZFBocmFzZSB7XHJcbiAgICBwYXNzd29yZDogc3RyaW5nO1xyXG4gICAgc2VlZFBocmFzZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RHZXRUb2tlbkJhbGFuY2Uge1xyXG4gICAgdG9rZW5BZGRyZXNzOiBzdHJpbmc7XHJcbiAgICBhY2NvdW50OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdEdldFRva2VucyB7XHJcbiAgICBjaGFpbklkPzogbnVtYmVyO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdEdldFVzZXJUb2tlbnMge1xyXG4gICAgYWNjb3VudEFkZHJlc3M/OiBzdHJpbmc7XHJcbiAgICBjaGFpbklkPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RHZXRUb2tlbiB7XHJcbiAgICB0b2tlbkFkZHJlc3M6IHN0cmluZztcclxuICAgIGFjY291bnRBZGRyZXNzPzogc3RyaW5nO1xyXG4gICAgY2hhaW5JZD86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0QWRkQ3VzdG9tVG9rZW4ge1xyXG4gICAgYWRkcmVzczogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgc3ltYm9sOiBzdHJpbmc7XHJcbiAgICBkZWNpbWFsczogbnVtYmVyO1xyXG4gICAgbG9nbzogc3RyaW5nO1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdERlbGV0ZUN1c3RvbVRva2VuIHtcclxuICAgIGFkZHJlc3M6IHN0cmluZztcclxuICAgIGFjY291bnRBZGRyZXNzPzogc3RyaW5nO1xyXG4gICAgY2hhaW5JZD86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0QWRkQ3VzdG9tVG9rZW5zIHtcclxuICAgIHRva2VuczogUmVxdWVzdEFkZEN1c3RvbVRva2VuW107XHJcbiAgICBhY2NvdW50QWRkcmVzcz86IHN0cmluZztcclxuICAgIGNoYWluSWQ/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdFNlbmRUb2tlbiB7XHJcbiAgICB0b2tlbkFkZHJlc3M6IHN0cmluZztcclxuICAgIHRvOiBzdHJpbmc7XHJcbiAgICB2YWx1ZTogQmlnTnVtYmVyO1xyXG4gICAgZmVlRGF0YTogVHJhbnNhY3Rpb25GZWVEYXRhO1xyXG4gICAgYWR2YW5jZWREYXRhOiBUcmFuc2FjdGlvbkFkdmFuY2VkRGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0QWRkQXNOZXdTZW5kVHJhbnNhY3Rpb24ge1xyXG4gICAgYWRkcmVzczogc3RyaW5nO1xyXG4gICAgdG86IHN0cmluZztcclxuICAgIHZhbHVlOiBCaWdOdW1iZXI7XHJcbiAgICBmZWVEYXRhOiBUcmFuc2FjdGlvbkZlZURhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdFVwZGF0ZVNlbmRUcmFuc2FjdGlvbkdhcyB7XHJcbiAgICB0cmFuc2FjdGlvbklkOiBzdHJpbmc7XHJcbiAgICBmZWVEYXRhOiBUcmFuc2FjdGlvbkZlZURhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdEFwcHJvdmVTZW5kVHJhbnNhY3Rpb24ge1xyXG4gICAgdHJhbnNhY3Rpb25JZDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RTZW5kVHJhbnNhY3Rpb25SZXN1bHQge1xyXG4gICAgdHJhbnNhY3Rpb25JZDogc3RyaW5nO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdENhbGN1bGF0ZUFwcHJvdmVUcmFuc2FjdGlvbkdhc0xpbWl0IHtcclxuICAgIHRva2VuQWRkcmVzczogc3RyaW5nO1xyXG4gICAgc3BlbmRlcjogc3RyaW5nO1xyXG4gICAgYW1vdW50OiBCaWdOdW1iZXIgfCAnVU5MSU1JVEVEJztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0Q2FsY3VsYXRlU2VuZFRyYW5zYWN0aW9uR2FzTGltaXQge1xyXG4gICAgYWRkcmVzczogc3RyaW5nO1xyXG4gICAgdG86IHN0cmluZztcclxuICAgIHZhbHVlOiBCaWdOdW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdENhbmNlbFRyYW5zYWN0aW9uIHtcclxuICAgIHRyYW5zYWN0aW9uSWQ6IHN0cmluZztcclxuICAgIGdhc1ZhbHVlcz86IEdhc1ByaWNlVmFsdWUgfCBGZWVNYXJrZXRFSVAxNTU5VmFsdWVzO1xyXG4gICAgZ2FzTGltaXQ/OiBCaWdOdW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdFNwZWVkVXBUcmFuc2FjdGlvbiB7XHJcbiAgICB0cmFuc2FjdGlvbklkOiBzdHJpbmc7XHJcbiAgICBnYXNWYWx1ZXM/OiBHYXNQcmljZVZhbHVlIHwgRmVlTWFya2V0RUlQMTU1OVZhbHVlcztcclxuICAgIGdhc0xpbWl0PzogQmlnTnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RHZXRDYW5jZWxTcGVlZFVwR2FzUHJpY2VUcmFuc2FjdGlvbiB7XHJcbiAgICB0cmFuc2FjdGlvbklkOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdFBvcHVsYXRlVG9rZW5EYXRhIHtcclxuICAgIHRva2VuQWRkcmVzczogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RTZWFyY2hUb2tlbiB7XHJcbiAgICBxdWVyeTogc3RyaW5nO1xyXG4gICAgZXhhY3Q/OiBib29sZWFuO1xyXG4gICAgYWNjb3VudEFkZHJlc3M/OiBzdHJpbmc7XHJcbiAgICBjaGFpbklkPzogbnVtYmVyO1xyXG4gICAgbWFudWFsQWRkVG9rZW4/OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RBbnRpUGhpc2hpbmdJbWFnZSB7XHJcbiAgICBhbnRpUGhpc2hpbmdJbWFnZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RVcGRhdGVBbnRpUGhpc2hpbmdJbWFnZSB7XHJcbiAgICBhbnRpUGhpc2hpbmdJbWFnZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RUb2dnbGVBbnRpUGhpc2hpbmdQcm90ZWN0aW9uIHtcclxuICAgIGFudGlQaGlzaGluZ1Byb3RlY3Rpb25FbmFiZWxkOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RTZXROYXRpdmVDdXJyZW5jeSB7XHJcbiAgICBjdXJyZW5jeUNvZGU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0R2V0VmFsaWRDdXJyZW5jaWVzIHt9XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RUb2dnbGVSZWxlYXNlTm90ZXNTdWJzY3JpcHRpb24ge1xyXG4gICAgcmVsZWFzZU5vdGVzU3Vic2NyaXB0aW9uRW5hYmxlZDogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0VG9nZ2xlRGVmYXVsdEJyb3dzZXJXYWxsZXQge1xyXG4gICAgZGVmYXVsdEJyb3dzZXJXYWxsZXRFbmFibGVkOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RTZXREZWZhdWx0R2FzIHtcclxuICAgIGRlZmF1bHRHYXNPcHRpb246IERlZmF1bHRHYXNPcHRpb25zO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RSZWplY3RUcmFuc2FjdGlvbiB7XHJcbiAgICB0cmFuc2FjdGlvbklkOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdEFkZHJlc3NCb29rQ2xlYXIge31cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdEFkZHJlc3NCb29rRGVsZXRlIHtcclxuICAgIGFkZHJlc3M6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0QWRkcmVzc0Jvb2tTZXQge1xyXG4gICAgYWRkcmVzczogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgbm90ZT86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0QWRkcmVzc0Jvb2tHZXQge31cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0QWRkcmVzc0Jvb2tHZXRCeUFkZHJlc3Mge1xyXG4gICAgYWRkcmVzczogc3RyaW5nO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdEFkZHJlc3NCb29rR2V0UmVjZW50QWRkcmVzc2VzIHtcclxuICAgIGxpbWl0PzogbnVtYmVyO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdFVzZXJTZXR0aW5ncyB7XHJcbiAgICBzZXR0aW5nczogVXNlclNldHRpbmdzO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RVcGRhdGVQb3B1cFRhYiB7XHJcbiAgICBwb3B1cFRhYjogUG9wdXBUYWJzO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3ROZXh0Tm9uY2Uge1xyXG4gICAgYWRkcmVzczogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RDb25uZWN0SGFyZHdhcmVXYWxsZXQge1xyXG4gICAgZGV2aWNlOiBEZXZpY2VzO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdFJlbW92ZUhhcmR3YXJlV2FsbGV0IHtcclxuICAgIGRldmljZTogRGV2aWNlcztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0R2V0SGFyZHdhcmVXYWxsZXRBY2NvdW50cyB7XHJcbiAgICBkZXZpY2U6IERldmljZXM7XHJcbiAgICBwYWdlSW5kZXg6IG51bWJlcjtcclxuICAgIHBhZ2VTaXplOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdEltcG9ydEhhcmR3YXJlV2FsbGV0QWNjb3VudHMge1xyXG4gICAgZGV2aWNlOiBEZXZpY2VzO1xyXG4gICAgZGV2aWNlQWNjb3VudHM6IERldmljZUFjY291bnRJbmZvW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdElzRGV2aWNlQ29ubmVjdGVkIHtcclxuICAgIGFkZHJlc3M6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0U2V0QWNjb3VudEZpbHRlcnMge1xyXG4gICAgYWNjb3VudEZpbHRlcnM6IHN0cmluZ1tdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RHZW5lcmF0ZU9uRGVtYW5kUmVsZWFzZU5vdGVzIHtcclxuICAgIHZlcnNpb246IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgUmVzcG9uc2VUeXBlcyA9IHtcclxuICAgIFtNZXNzYWdlVHlwZSBpbiBrZXlvZiBSZXF1ZXN0U2lnbmF0dXJlc106IFJlcXVlc3RTaWduYXR1cmVzW01lc3NhZ2VUeXBlXVsxXTtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFJlc3BvbnNlVHlwZTxUTWVzc2FnZVR5cGUgZXh0ZW5kcyBrZXlvZiBSZXF1ZXN0U2lnbmF0dXJlcz4gPVxyXG4gICAgUmVxdWVzdFNpZ25hdHVyZXNbVE1lc3NhZ2VUeXBlXVsxXTtcclxuXHJcbmV4cG9ydCB0eXBlIFJlc3BvbnNlR2V0U3RhdGUgPSBGbGF0dGVuPEJsYW5rQXBwVUlTdGF0ZT47XHJcblxyXG5leHBvcnQgdHlwZSBTdWJzY3JpcHRpb25NZXNzYWdlVHlwZXMgPSB7XHJcbiAgICBbTWVzc2FnZVR5cGUgaW4ga2V5b2YgUmVxdWVzdFNpZ25hdHVyZXNdOiBSZXF1ZXN0U2lnbmF0dXJlc1tNZXNzYWdlVHlwZV1bMl07XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBTdGF0ZVN1YnNjcmlwdGlvbiA9IEZsYXR0ZW48QmxhbmtBcHBVSVN0YXRlPjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRXh0ZXJuYWxFdmVudFN1YnNjcmlwdGlvbiB7XHJcbiAgICBldmVudE5hbWU6IFByb3ZpZGVyRXZlbnRzO1xyXG4gICAgcGF5bG9hZDogYW55O1xyXG4gICAgcG9ydElkPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRyYW5zcG9ydFJlcXVlc3RNZXNzYWdlPFRNZXNzYWdlVHlwZSBleHRlbmRzIE1lc3NhZ2VUeXBlcz4ge1xyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIG1lc3NhZ2U6IFRNZXNzYWdlVHlwZTtcclxuICAgIHJlcXVlc3Q6IFJlcXVlc3RUeXBlc1tUTWVzc2FnZVR5cGVdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFdpbmRvd1RyYW5zcG9ydFJlcXVlc3RNZXNzYWdlXHJcbiAgICBleHRlbmRzIFRyYW5zcG9ydFJlcXVlc3RNZXNzYWdlPEVYVEVSTkFMPiB7XHJcbiAgICBvcmlnaW46IE9yaWdpbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUcmFuc3BvcnRSZXNwb25zZU1lc3NhZ2U8VE1lc3NhZ2VUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGVzPiB7XHJcbiAgICBlcnJvcj86IHN0cmluZztcclxuICAgIGlkOiBzdHJpbmc7XHJcbiAgICByZXNwb25zZT86IFJlc3BvbnNlVHlwZXNbVE1lc3NhZ2VUeXBlXTtcclxuICAgIHN1YnNjcmlwdGlvbj86IFN1YnNjcmlwdGlvbk1lc3NhZ2VUeXBlc1tUTWVzc2FnZVR5cGVdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFdpbmRvd1RyYW5zcG9ydFJlc3BvbnNlTWVzc2FnZVxyXG4gICAgZXh0ZW5kcyBUcmFuc3BvcnRSZXNwb25zZU1lc3NhZ2U8RVhURVJOQUw+IHtcclxuICAgIG9yaWdpbjogT3JpZ2luO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERpc21pc3NNZXNzYWdlIHt9XHJcblxyXG5leHBvcnQgZW51bSBPcmlnaW4ge1xyXG4gICAgQkFDS0dST1VORCA9ICdCTEFOS19CQUNLR1JPVU5EJyxcclxuICAgIEVYVEVOU0lPTiA9ICdCTEFOS19FWFRFTlNJT04nLFxyXG4gICAgUFJPVklERVIgPSAnQkxBTktfUFJPVklERVInLFxyXG4gICAgVFJFWk9SX0NPTk5FQ1QgPSAndHJlem9yLWNvbm5lY3QnLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEV4dGVuc2lvbkluc3RhbmNlcyB7XHJcbiAgICBbaWQ6IHN0cmluZ106IHsgcG9ydDogY2hyb21lLnJ1bnRpbWUuUG9ydCB9O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFByb3ZpZGVySW5zdGFuY2VzIHtcclxuICAgIFtpZDogc3RyaW5nXTogUHJvdmlkZXJJbnN0YW5jZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQcm92aWRlckluc3RhbmNlIHtcclxuICAgIHBvcnQ6IGNocm9tZS5ydW50aW1lLlBvcnQ7XHJcbiAgICB0YWJJZDogbnVtYmVyO1xyXG4gICAgd2luZG93SWQ6IG51bWJlcjtcclxuICAgIG9yaWdpbjogc3RyaW5nO1xyXG4gICAgc2l0ZU1ldGFkYXRhOiBTaXRlTWV0YWRhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSGFuZGxlciB7XHJcbiAgICByZXNvbHZlOiAoZGF0YTogYW55KSA9PiB2b2lkO1xyXG4gICAgcmVqZWN0OiAoZXJyb3I6IEVycm9yKSA9PiB2b2lkO1xyXG4gICAgc3Vic2NyaWJlcj86IChkYXRhOiBhbnkpID0+IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVW5sb2NrSGFuZGxlciBleHRlbmRzIEhhbmRsZXIge1xyXG4gICAgLy9wb3J0IHRoYXQgaXMgaGFuZGxpbmcgdGhlIHVubG9ja1xyXG4gICAgcG9ydElkOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEhhbmRsZXJzID0gUmVjb3JkPHN0cmluZywgSGFuZGxlcj47XHJcblxyXG5leHBvcnQgZW51bSBCYWNrZ3JvdW5kQWN0aW9ucyB7XHJcbiAgICBDTE9TRV9XSU5ET1cgPSAnQ0xPU0VfV0lORE9XJyxcclxufVxyXG4iLCJpbXBvcnQgeyBBcHBTdGF0ZUNvbnRyb2xsZXJTdGF0ZSB9IGZyb20gJ0BibG9jay13YWxsZXQvYmFja2dyb3VuZC9jb250cm9sbGVycy9BcHBTdGF0ZUNvbnRyb2xsZXInO1xyXG5pbXBvcnQgeyBCbGFua1Byb3ZpZGVyQ29udHJvbGxlclN0YXRlIH0gZnJvbSAnQGJsb2NrLXdhbGxldC9iYWNrZ3JvdW5kL2NvbnRyb2xsZXJzL0JsYW5rUHJvdmlkZXJDb250cm9sbGVyJztcclxuaW1wb3J0IHsgUGVybWlzc2lvbnNDb250cm9sbGVyU3RhdGUgfSBmcm9tICdAYmxvY2std2FsbGV0L2JhY2tncm91bmQvY29udHJvbGxlcnMvUGVybWlzc2lvbnNDb250cm9sbGVyJztcclxuaW1wb3J0IHsgVHJhbnNhY3Rpb25Wb2xhdGlsZUNvbnRyb2xsZXJTdGF0ZSB9IGZyb20gJ0BibG9jay13YWxsZXQvYmFja2dyb3VuZC9jb250cm9sbGVycy90cmFuc2FjdGlvbnMvVHJhbnNhY3Rpb25Db250cm9sbGVyJztcclxuaW1wb3J0IHsgU2l0ZU1ldGFkYXRhIH0gZnJvbSAnQGJsb2NrLXdhbGxldC9wcm92aWRlci90eXBlcyc7XHJcbmltcG9ydCB7IFRyYW5zYWN0aW9uUGFyYW1zIH0gZnJvbSAnLi4vLi4vY29udHJvbGxlcnMvdHJhbnNhY3Rpb25zL3V0aWxzL3R5cGVzJztcclxuXHJcbmV4cG9ydCB0eXBlIFRyYW5zYWN0aW9uUmVxdWVzdCA9IFRyYW5zYWN0aW9uUGFyYW1zICYgeyBnYXM/OiBzdHJpbmcgfCBudW1iZXIgfTtcclxuXHJcbmV4cG9ydCBlbnVtIFByb3ZpZGVyRXJyb3Ige1xyXG4gICAgSU5WQUxJRF9QQVJBTVMgPSAnSU5WQUxJRF9QQVJBTVMnLFxyXG4gICAgUkVTT1VSQ0VfVU5BVkFJTEFCTEUgPSAnUkVTT1VSQ0VfVU5BVkFJTEFCTEUnLFxyXG4gICAgVFJBTlNBQ1RJT05fUkVKRUNURUQgPSAnVFJBTlNBQ1RJT05fUkVKRUNURUQnLFxyXG4gICAgVU5BVVRIT1JJWkVEID0gJ1VOQVVUSE9SSVpFRCcsXHJcbiAgICBVTlNVUFBPUlRFRF9NRVRIT0QgPSAnVU5TVVBQT1JURURfTUVUSE9EJyxcclxuICAgIFVOU1VQUE9SVEVEX1NVQlNDUklQVElPTl9UWVBFID0gJ1VOU1VQUE9SVEVEX1NVQlNDUklQVElPTl9UWVBFJyxcclxuICAgIFVTRVJfUkVKRUNURURfUkVRVUVTVCA9ICdVU0VSX1JFSkVDVEVEX1JFUVVFU1QnLFxyXG59XHJcblxyXG4vLyBUeXBlcyBmb3Igd2luZG93IG1hbmFnZW1lbnRcclxuZXhwb3J0IGVudW0gV2luZG93UmVxdWVzdCB7XHJcbiAgICBEQVBQID0gJ0RBUFAnLFxyXG4gICAgTE9DSyA9ICdMT0NLJyxcclxuICAgIFBFUk1JU1NJT05TID0gJ1BFUk1JU1NJT05TJyxcclxuICAgIFRSQU5TQUNUSU9OUyA9ICdUUkFOU0FDVElPTlMnLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFdpbmRvd1JlcXVlc3RBcmd1bWVudHMge1xyXG4gICAgW1dpbmRvd1JlcXVlc3QuREFQUF06IEJsYW5rUHJvdmlkZXJDb250cm9sbGVyU3RhdGU7XHJcbiAgICBbV2luZG93UmVxdWVzdC5MT0NLXTogQXBwU3RhdGVDb250cm9sbGVyU3RhdGU7XHJcbiAgICBbV2luZG93UmVxdWVzdC5QRVJNSVNTSU9OU106IFBlcm1pc3Npb25zQ29udHJvbGxlclN0YXRlO1xyXG4gICAgW1dpbmRvd1JlcXVlc3QuVFJBTlNBQ1RJT05TXTogVHJhbnNhY3Rpb25Wb2xhdGlsZUNvbnRyb2xsZXJTdGF0ZTtcclxufVxyXG5cclxuLy8gVHlwZSBvZiBkYXBwIHJlcXVlc3RcclxuZXhwb3J0IGVudW0gRGFwcFJlcSB7XHJcbiAgICBBU1NFVCA9ICdBU1NFVCcsXHJcbiAgICBTSUdOSU5HID0gJ1NJR05JTkcnLFxyXG4gICAgU1dJVENIX05FVFdPUksgPSAnU1dJVENIX05FVFdPUksnLFxyXG4gICAgQUREX0VUSEVSRVVNX0NIQUlOID0gJ0FERF9FVEhFUkVVTV9DSEFJTicsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGFwcFJlcXVlc3RQYXJhbXMge1xyXG4gICAgW0RhcHBSZXEuQVNTRVRdOiBXYXRjaEFzc2V0UmVxO1xyXG4gICAgW0RhcHBSZXEuU0lHTklOR106IERhcHBTaWduYXR1cmVSZXE8U2lnbmF0dXJlTWV0aG9kcz47XHJcbiAgICBbRGFwcFJlcS5TV0lUQ0hfTkVUV09SS106IE5vcm1hbGl6ZWRTd2l0Y2hFdGhlcmV1bUNoYWluUGFyYW1ldGVycztcclxuICAgIFtEYXBwUmVxLkFERF9FVEhFUkVVTV9DSEFJTl06IE5vcm1hbGl6ZWRBZGRFdGhlcmV1bUNoYWluUGFyYW1ldGVyO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBEYXBwUmVxdWVzdFR5cGUgPSBrZXlvZiBEYXBwUmVxdWVzdFBhcmFtcztcclxuXHJcbi8vIERhcHAgcmVxdWVzdCBoYW5kbGUgb3B0aW9uYWwgY29uZmlybWF0aW9uIHBhcmFtZXRlcnNcclxuZXhwb3J0IGludGVyZmFjZSBEYXBwUmVxdWVzdENvbmZpcm1PcHRpb25zIHtcclxuICAgIFtEYXBwUmVxLkFTU0VUXTogV2F0Y2hBc3NldENvbmZpcm1QYXJhbXM7XHJcbiAgICBbRGFwcFJlcS5BRERfRVRIRVJFVU1fQ0hBSU5dOiBBZGRFdGhlcmV1bUNoYWluQ29uZmlybVBhcmFtcztcclxuICAgIFtEYXBwUmVxLlNJR05JTkddOiB1bmRlZmluZWQ7XHJcbiAgICBbRGFwcFJlcS5TV0lUQ0hfTkVUV09SS106IHVuZGVmaW5lZDtcclxufVxyXG5cclxuLy8gRGFwcCByZXF1ZXN0IG9wdGlvbmFsIHN0YXR1cyB0eXBlXHJcblxyXG5leHBvcnQgZW51bSBEYXBwUmVxdWVzdFNpZ25pbmdTdGF0dXMge1xyXG4gICAgUEVORElORyA9ICdEQVBQX1BFTkRJTkcnLFxyXG4gICAgQVBQUk9WRUQgPSAnREFQUF9BUFBST1ZFRCcsXHJcbiAgICBSRUpFQ1RFRCA9ICdEQVBQX1JFSkVDVEVEJyxcclxuICAgIEZBSUxFRCA9ICdEQVBQX0ZBSUxFRCcsXHJcbiAgICBTSUdORUQgPSAnREFQUF9TSUdORUQnLFxyXG59XHJcblxyXG4vLyBEYXBwIHJlcXVlc3Qgc3VibWl0dGVkIHRvIHN0YXRlIGludGVyZmFjZVxyXG5leHBvcnQgaW50ZXJmYWNlIERhcHBSZXF1ZXN0PFR5cGUgZXh0ZW5kcyBEYXBwUmVxdWVzdFR5cGU+IHtcclxuICAgIHR5cGU6IFR5cGU7XHJcbiAgICBwYXJhbXM6IERhcHBSZXF1ZXN0UGFyYW1zW1R5cGVdO1xyXG4gICAgb3JpZ2luOiBzdHJpbmc7XHJcbiAgICBzaXRlTWV0YWRhdGE6IFNpdGVNZXRhZGF0YTtcclxuICAgIG9yaWdpbklkOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdGltZSBhdCBpdCB3YXMgcmVxdWVzdGVkXHJcbiAgICAgKi9cclxuICAgIHRpbWU6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBzdGF0dXMgb2YgdGhlIHJlcXVlc3QgKHBlbmRpbmcgb3IgYXBwcm92ZWQpXHJcbiAgICAgKlxyXG4gICAgICogVXNlZCB0byBkaXNwbGF5IGEgZGlmZmVyZW50IG1lc3NhZ2UgdG8gdGhlIHVzZXIgd2hlbiBzaWduaW5nIG1lc3NhZ2VzXHJcbiAgICAgKiBhbmQgYXdhaXRpbmcgY29uZmlybWF0aW9uIGluIGEgaGFyZHdhcmUgd2FsbGV0IGRldmljZVxyXG4gICAgICpcclxuICAgICAqIEBkZWZhdWx0IFBFTkRJTkdcclxuICAgICAqL1xyXG4gICAgc3RhdHVzPzogRGFwcFJlcXVlc3RTaWduaW5nU3RhdHVzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSBwb3NzaWJsZSBlcnJvciBtZXNzYWdlIHRvIGRpc3BsYXkgdG8gdGhlIHVzZXJcclxuICAgICAqXHJcbiAgICAgKiBVc2VkIHRvIHNob3cgdGhlIGVycm9yIG1lc3NhZ2UgdG8gdGhlIHVzZXIgaWYgdGhlIHZpZXcgc3RhdGUgaXMgcmVzdG9yZWRcclxuICAgICAqL1xyXG4gICAgZXJyb3I/OiBFcnJvcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB0aW1lIHdoZW4gdGhlIHJlcXVlc3Qgd2FzIG1hcmtlZCBhcyBBUFBST1ZFRCBhbmQgc3VibWl0dGVkIGZvciBzaWduaW5nIChvbmx5IGZvciBtZXNzYWdlIHNpZ25pbmcgcmVxdWVzdHMpXHJcbiAgICAgKi9cclxuICAgIGFwcHJvdmVUaW1lPzogbnVtYmVyO1xyXG59XHJcblxyXG4vLyBFSVAtMzA4NVxyXG5leHBvcnQgaW50ZXJmYWNlIEFkZEV0aGVyZXVtQ2hhaW5QYXJhbWV0ZXIge1xyXG4gICAgY2hhaW5JZDogc3RyaW5nO1xyXG4gICAgYmxvY2tFeHBsb3JlclVybHM/OiBzdHJpbmdbXTtcclxuICAgIGNoYWluTmFtZT86IHN0cmluZztcclxuICAgIGljb25VcmxzPzogc3RyaW5nW107XHJcbiAgICBuYXRpdmVDdXJyZW5jeT86IHtcclxuICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgc3ltYm9sOiBzdHJpbmc7XHJcbiAgICAgICAgZGVjaW1hbHM6IG51bWJlcjtcclxuICAgIH07XHJcbiAgICBycGNVcmxzPzogc3RyaW5nW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTm9ybWFsaXplZEFkZEV0aGVyZXVtQ2hhaW5QYXJhbWV0ZXIge1xyXG4gICAgY2hhaW5JZDogbnVtYmVyO1xyXG4gICAgY2hhaW5OYW1lOiBzdHJpbmc7XHJcbiAgICBuYXRpdmVDdXJyZW5jeToge1xyXG4gICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgICAgICBzeW1ib2w6IHN0cmluZztcclxuICAgICAgICBkZWNpbWFsczogbnVtYmVyO1xyXG4gICAgfTtcclxuICAgIGljb25Vcmw/OiBzdHJpbmc7XHJcbiAgICBycGNVcmw6IHN0cmluZztcclxuICAgIGJsb2NrRXhwbG9yZXJVcmw/OiBzdHJpbmc7XHJcbiAgICBpc1Rlc3RuZXQ6IGJvb2xlYW47XHJcblxyXG4gICAgdmFsaWRhdGlvbnM6IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbmRpY2F0ZXMgaWYgdGhlIHByb3ZpZGVkIENoYWluIElEIGlzIGtub3duIHRvIHRoZSB3YWxsZXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBrbm93bkNoYWluSWQ6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluZGljYXRlcyBpZiB0aGUgYmxvY2sgZXhwbG9yZXIgaXMga25vd24gdG8gdGhlIHNwZWNpZmllZCBjaGFpblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGtub3duQmxvY2tFeHBsb3JlcjogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5kaWNhdGVzIGlmIHRoZSBycGNVcmwgaXMga25vd24gdG8gdGhlIHNwZWNpZmllZCBjaGFpblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGtub3duUnBjVXJsOiBib29sZWFuO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbmRpY2F0ZXMgaWYgaWNvbiBkYXRhIGlzIGN1c3RvbSBvciB2YWxpZGF0ZWQgYWdhaW5zdCBvdXIgY2hhaW4gbGlzdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGtub3duSWNvbjogYm9vbGVhbjtcclxuICAgIH07XHJcbn1cclxuXHJcbi8vIEVJUC0zMzI2XHJcbmV4cG9ydCBpbnRlcmZhY2UgU3dpdGNoRXRoZXJldW1DaGFpblBhcmFtZXRlcnMge1xyXG4gICAgY2hhaW5JZDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE5vcm1hbGl6ZWRTd2l0Y2hFdGhlcmV1bUNoYWluUGFyYW1ldGVycyB7XHJcbiAgICBjaGFpbklkOiBudW1iZXI7XHJcbn1cclxuXHJcbi8vIEVJUC0xMTkzXHJcbmV4cG9ydCBpbnRlcmZhY2UgR2V0UGVybWlzc2lvblJlc3BvbnNlIHtcclxuICAgIGludm9rZXI6IHN0cmluZztcclxuICAgIHBhcmVudENhcGFiaWxpdHk/OiBzdHJpbmc7XHJcbiAgICBjYXZlYXRzPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj5bXTtcclxufVxyXG5cclxuLy8gaHR0cHM6Ly9nZXRoLmV0aGVyZXVtLm9yZy9kb2NzL3JwYy9wdWJzdWJcclxuZXhwb3J0IGVudW0gU3Vic2NyaXB0aW9uVHlwZSB7XHJcbiAgICBsb2dzID0gJ2xvZ3MnLFxyXG4gICAgbmV3SGVhZHMgPSAnbmV3SGVhZHMnLFxyXG4gICAgLyoqXHJcbiAgICAgKiBAdW5zdXBwb3J0ZWRcclxuICAgICAqL1xyXG4gICAgbmV3UGVuZGluZ1RyYW5zYWN0aW9ucyA9ICduZXdQZW5kaW5nVHJhbnNhY3Rpb25zJyxcclxuICAgIC8qKlxyXG4gICAgICogQHVuc3VwcG9ydGVkXHJcbiAgICAgKi9cclxuICAgIHN5bmNpbmcgPSAnc3luY2luZycsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU3Vic2NyaXB0aW9uUGFyYW0ge1xyXG4gICAgW1N1YnNjcmlwdGlvblR5cGUubG9nc10/OiB7XHJcbiAgICAgICAgYWRkcmVzcz86IHN0cmluZyB8IHN0cmluZ1tdOyAvLyBhZGRyZXNzIG9yIGFycmF5IG9mIGFkZHJlc3Nlc1xyXG4gICAgICAgIHRvcGljcz86IHN0cmluZ1tdOyAvLyBsb2dzIHdoaWNoIG1hdGNoIHRoZSBzcGVjaWZpZWQgdG9waWNzXHJcbiAgICB9O1xyXG4gICAgW1N1YnNjcmlwdGlvblR5cGUubmV3SGVhZHNdOiB1bmRlZmluZWQ7XHJcbiAgICBbU3Vic2NyaXB0aW9uVHlwZS5uZXdQZW5kaW5nVHJhbnNhY3Rpb25zXTogdW5kZWZpbmVkO1xyXG4gICAgW1N1YnNjcmlwdGlvblR5cGUuc3luY2luZ106IHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgU3Vic2NyaXB0aW9uUGFyYW1zID0gW1xyXG4gICAgU3Vic2NyaXB0aW9uVHlwZSxcclxuICAgIFN1YnNjcmlwdGlvblBhcmFtW1N1YnNjcmlwdGlvblR5cGVdXHJcbl07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFN1YnNjcmlwdGlvblJlc3VsdCB7XHJcbiAgICBtZXRob2Q6ICdldGhfc3Vic2NyaXB0aW9uJztcclxuICAgIHBhcmFtczoge1xyXG4gICAgICAgIHN1YnNjcmlwdGlvbjogc3RyaW5nOyAvLyBTdWJzY3JpcHRpb24gaWRcclxuICAgICAgICByZXN1bHQ6IFJlY29yZDxzdHJpbmcsIHVua25vd24+OyAvLyBTdWJzY3JpcHRpb24gZGF0YVxyXG4gICAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFN1YnNjcmlwdGlvbiBvYmplY3QuXHJcbiAqIEl0J3MgY3JlYXRlZCB3aGVuIGEgZEFwcCBhc2sgZm9yIG5ld0Jsb2NrcyBvciBsb2dzLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBTdWJzY3JpcHRpb24ge1xyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIHBvcnRJZDogc3RyaW5nO1xyXG4gICAgdHlwZTogU3Vic2NyaXB0aW9uVHlwZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIG1ldGhvZCB0aGF0IGlzIHRyaWdnZXJlZCBldmVyeVxyXG4gICAgICogYmxvY2sgdXBkYXRlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjaGFpbklkIFRoZSBjdXJyZW50IG5ldHdvcmsgY2hhaW5JZFxyXG4gICAgICogQHBhcmFtIHByZXZpb3VzQmxvY2tOdW1iZXIgVGhlIHByZXZpb3VzIHVwZGF0ZSBibG9jayBudW1iZXJcclxuICAgICAqIEBwYXJhbSBuZXdCbG9ja051bWJlciBUaGUgbmV3IHVwZGF0ZSBibG9jayBudW1iZXJcclxuICAgICAqL1xyXG4gICAgbm90aWZpY2F0aW9uKFxyXG4gICAgICAgIGNoYWluSWQ6IG51bWJlcixcclxuICAgICAgICBwcmV2aW91c0Jsb2NrTnVtYmVyOiBudW1iZXIsXHJcbiAgICAgICAgbmV3QmxvY2tOdW1iZXI6IG51bWJlclxyXG4gICAgKTogUHJvbWlzZTx2b2lkPjtcclxufVxyXG5cclxuLy8gRUlQLTc0N1xyXG5leHBvcnQgaW50ZXJmYWNlIFdhdGNoQXNzZXRQYXJhbWV0ZXJzIHtcclxuICAgIHR5cGU6IHN0cmluZzsgLy8gQXNzZXQncyBpbnRlcmZhY2VcclxuICAgIG9wdGlvbnM6IHtcclxuICAgICAgICBhZGRyZXNzOiBzdHJpbmc7XHJcbiAgICAgICAgc3ltYm9sPzogc3RyaW5nOyAvLyBUaWNrZXJcclxuICAgICAgICBkZWNpbWFscz86IG51bWJlcjtcclxuICAgICAgICBpbWFnZT86IHN0cmluZzsgLy8gVVJMIG9yIEJhc2U2NCBpbWFnZVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBXYXRjaEFzc2V0UmVxIHtcclxuICAgIHBhcmFtczoge1xyXG4gICAgICAgIGFkZHJlc3M6IHN0cmluZztcclxuICAgICAgICBzeW1ib2w6IHN0cmluZzsgLy8gVGlja2VyXHJcbiAgICAgICAgZGVjaW1hbHM6IG51bWJlcjtcclxuICAgICAgICBpbWFnZT86IHN0cmluZzsgLy8gVVJMXHJcbiAgICB9O1xyXG4gICAgYWN0aXZlQWNjb3VudD86IHN0cmluZzsgLy8gQWNjb3VudCBjb25uZWN0ZWQgdG8gdGhlIGRhcHBcclxuICAgIGlzVXBkYXRlOiBib29sZWFuOyAvLyBJZiB0b2tlbiBhbHJlYWR5IGV4aXN0c1xyXG4gICAgc2F2ZWRUb2tlbj86IFdhdGNoQXNzZXRSZXFbJ3BhcmFtcyddOyAvLyBFeGlzdGluZyB0b2tlbiBkYXRhXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgV2F0Y2hBc3NldENvbmZpcm1QYXJhbXMge1xyXG4gICAgc3ltYm9sOiBzdHJpbmc7XHJcbiAgICBkZWNpbWFsczogbnVtYmVyO1xyXG4gICAgaW1hZ2U6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBZGRFdGhlcmV1bUNoYWluQ29uZmlybVBhcmFtcyB7XHJcbiAgICBzYXZlSW1hZ2U6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRXN0aW1hdGVHYXNQYXJhbXMge1xyXG4gICAgZGF0YTogc3RyaW5nO1xyXG4gICAgZnJvbTogc3RyaW5nO1xyXG4gICAgdG86IHN0cmluZztcclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8vIEVJUC03MTJcclxuXHJcbi8vIFJhdyBkYXRhIGZvciBlYWNoIG1ldGhvZCAoRGlyZWN0IGlucHV0IGZyb20gdGhlIHByb3ZpZGVyKVxyXG5leHBvcnQgaW50ZXJmYWNlIFJhd1NpZ25hdHVyZURhdGEge1xyXG4gICAgW0pTT05SUENNZXRob2QuZXRoX3NpZ25dOiBbc3RyaW5nLCBzdHJpbmddOyAvLyBbYWNjb3VudCwgZGF0YV1cclxuICAgIFtKU09OUlBDTWV0aG9kLnBlcnNvbmFsX3NpZ25dOiBbc3RyaW5nLCBzdHJpbmddOyAvLyBbZGF0YSwgYWNjb3VudF1cclxuICAgIFtKU09OUlBDTWV0aG9kLmV0aF9zaWduVHlwZWREYXRhXTogW3N0cmluZywgc3RyaW5nXTsgLy8gW2RhdGEsIGFjY291bnRdXHJcbiAgICBbSlNPTlJQQ01ldGhvZC5ldGhfc2lnblR5cGVkRGF0YV92MV06IFtWMVR5cGVkRGF0YVtdLCBzdHJpbmddOyAvLyBbZGF0YSwgYWNjb3VudF1cclxuICAgIFtKU09OUlBDTWV0aG9kLmV0aF9zaWduVHlwZWREYXRhX3YzXTogW3N0cmluZywgc3RyaW5nXTsgLy8gW2FjY291bnQsIGRhdGFdXHJcbiAgICBbSlNPTlJQQ01ldGhvZC5ldGhfc2lnblR5cGVkRGF0YV92NF06IFtzdHJpbmcsIHN0cmluZ107IC8vIFthY2NvdW50LCBkYXRhXVxyXG59XHJcblxyXG4vLyBEYXRhIHN1Ym1pdHRlZCB0byB0aGUgZGFwcCByZXF1ZXN0XHJcbmV4cG9ydCBpbnRlcmZhY2UgTm9ybWFsaXplZFNpZ25hdHVyZURhdGEge1xyXG4gICAgW0pTT05SUENNZXRob2QuZXRoX3NpZ25dOiBzdHJpbmc7XHJcbiAgICBbSlNPTlJQQ01ldGhvZC5wZXJzb25hbF9zaWduXTogc3RyaW5nO1xyXG4gICAgW0pTT05SUENNZXRob2QuZXRoX3NpZ25UeXBlZERhdGFdOiBUeXBlZE1lc3NhZ2U8TWVzc2FnZVNjaGVtYT47XHJcbiAgICBbSlNPTlJQQ01ldGhvZC5ldGhfc2lnblR5cGVkRGF0YV92MV06IFYxVHlwZWREYXRhW107XHJcbiAgICBbSlNPTlJQQ01ldGhvZC5ldGhfc2lnblR5cGVkRGF0YV92M106IFR5cGVkTWVzc2FnZTxNZXNzYWdlU2NoZW1hPjtcclxuICAgIFtKU09OUlBDTWV0aG9kLmV0aF9zaWduVHlwZWREYXRhX3Y0XTogVHlwZWRNZXNzYWdlPE1lc3NhZ2VTY2hlbWE+O1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBTaWduYXR1cmVNZXRob2RzID0ga2V5b2YgUmF3U2lnbmF0dXJlRGF0YTtcclxuXHJcbi8vIE5vcm1hbGl6ZWQgc2lnbmF0dXJlIHBhcmFtZXRlcnNcclxuZXhwb3J0IGludGVyZmFjZSBTaWduYXR1cmVQYXJhbXM8VCBleHRlbmRzIFNpZ25hdHVyZU1ldGhvZHM+IHtcclxuICAgIGFkZHJlc3M6IHN0cmluZztcclxuICAgIGRhdGE6IFJhd1NpZ25hdHVyZURhdGFbVF1bMF07IC8vIEl0J3MgYWN0dWFsbHkgaW52ZXJ0ZWQgZm9yIHYzICYgdjQgYnV0IGl0J3MgdGhlIHNhbWUgdHlwZVxyXG59XHJcblxyXG4vLyBTaWduYXR1cmUgZGFwcCByZXF1ZXN0IGludGVyZmFjZVxyXG5leHBvcnQgaW50ZXJmYWNlIERhcHBTaWduYXR1cmVSZXE8VCBleHRlbmRzIFNpZ25hdHVyZU1ldGhvZHM+IHtcclxuICAgIG1ldGhvZDogVDtcclxuICAgIHBhcmFtczogTm9ybWFsaXplZFNpZ25hdHVyZVBhcmFtczxUPjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBOb3JtYWxpemVkU2lnbmF0dXJlUGFyYW1zPFQgZXh0ZW5kcyBTaWduYXR1cmVNZXRob2RzPiB7XHJcbiAgICBhZGRyZXNzOiBzdHJpbmc7XHJcbiAgICBkYXRhOiBOb3JtYWxpemVkU2lnbmF0dXJlRGF0YVtUXTtcclxuICAgIHJhd0RhdGE/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFR5cGVkU2lnbmF0dXJlTWV0aG9kcyA9IEV4Y2x1ZGU8XHJcbiAgICBTaWduYXR1cmVNZXRob2RzLFxyXG4gICAgSlNPTlJQQ01ldGhvZC5ldGhfc2lnbiB8IEpTT05SUENNZXRob2QucGVyc29uYWxfc2lnblxyXG4+O1xyXG5cclxuLy8gQWRhcHQgdmVyc2lvbiB0byBrZXlyaW5nIHNpZyB1dGlsXHJcbmV4cG9ydCBjb25zdCBzaWdWZXJzaW9uOiB7XHJcbiAgICBbbWV0aG9kIGluIFR5cGVkU2lnbmF0dXJlTWV0aG9kc106IHsgdmVyc2lvbjogJ1YxJyB8ICdWMycgfCAnVjQnIH07XHJcbn0gPSB7XHJcbiAgICBldGhfc2lnblR5cGVkRGF0YTogeyB2ZXJzaW9uOiAnVjQnIH0sXHJcbiAgICBldGhfc2lnblR5cGVkRGF0YV92MTogeyB2ZXJzaW9uOiAnVjEnIH0sXHJcbiAgICBldGhfc2lnblR5cGVkRGF0YV92MzogeyB2ZXJzaW9uOiAnVjMnIH0sXHJcbiAgICBldGhfc2lnblR5cGVkRGF0YV92NDogeyB2ZXJzaW9uOiAnVjQnIH0sXHJcbn07XHJcblxyXG4vLyBldGhfc2lnblR5cGVkRGF0YV92MVxyXG5leHBvcnQgaW50ZXJmYWNlIFYxVHlwZWREYXRhIHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIHZhbHVlOiB1bmtub3duO1xyXG59XHJcblxyXG4vLyBldGhfc2lnblR5cGVkRGF0YV92MyAmIGV0aF9zaWduVHlwZWREYXRhX3Y0XHJcbi8vIFY0IGFsbG93cyBhcnJheXMgaW4gbWVzc2FnZSBjb250ZW50XHJcbmV4cG9ydCBpbnRlcmZhY2UgVHlwZWRNZXNzYWdlPFQgZXh0ZW5kcyBNZXNzYWdlU2NoZW1hPiB7XHJcbiAgICB0eXBlczogVDtcclxuICAgIHByaW1hcnlUeXBlOiBrZXlvZiBUO1xyXG4gICAgZG9tYWluOiBFSVA3MTJEb21haW47XHJcbiAgICBtZXNzYWdlOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcclxufVxyXG5cclxuLy8gXCJEb21haW5cIiBpbmZvIGZvciB2MyBhbmQgdjRcclxuZXhwb3J0IGludGVyZmFjZSBFSVA3MTJEb21haW4ge1xyXG4gICAgY2hhaW5JZD86IG51bWJlcjtcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBzYWx0Pzogc3RyaW5nO1xyXG4gICAgdmVyaWZ5aW5nQ29udHJhY3Q/OiBzdHJpbmc7XHJcbiAgICB2ZXJzaW9uPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBFSVA3MTJEb21haW5LZXkgPSBrZXlvZiBFSVA3MTJEb21haW47XHJcblxyXG4vLyB2MyBhbmQgdjQgbWVzc2FnZSBzY2hlbWFcclxuZXhwb3J0IGludGVyZmFjZSBNZXNzYWdlU2NoZW1hIHtcclxuICAgIEVJUDcxMkRvbWFpbjogTWVzc2FnZVR5cGVQcm9wZXJ0eVtdO1xyXG4gICAgW2FkZGl0aW9uYWxQcm9wZXJ0aWVzOiBzdHJpbmddOiBNZXNzYWdlVHlwZVByb3BlcnR5W107XHJcbn1cclxuXHJcbmV4cG9ydCBkZWNsYXJlIHR5cGUgU2lnbmVkTXNnUGFyYW1zPEQ+ID0gUmVxdWlyZWQ8TXNnUGFyYW1zPEQ+PjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTXNnUGFyYW1zPEQ+IHtcclxuICAgIGRhdGE6IEQ7XHJcbiAgICBzaWc/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmludGVyZmFjZSBNZXNzYWdlVHlwZVByb3BlcnR5IHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHR5cGU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHR5cGVkTWVzc2FnZVNjaGVtYSA9IHtcclxuICAgIHR5cGU6ICdvYmplY3QnLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHR5cGVzOiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxyXG4gICAgICAgICAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2FycmF5JyxcclxuICAgICAgICAgICAgICAgIGl0ZW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB7IHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHsgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiBbJ25hbWUnLCAndHlwZSddLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByaW1hcnlUeXBlOiB7IHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgZG9tYWluOiB7IHR5cGU6ICdvYmplY3QnIH0sXHJcbiAgICAgICAgbWVzc2FnZTogeyB0eXBlOiAnb2JqZWN0JyB9LFxyXG4gICAgfSxcclxuICAgIHJlcXVpcmVkOiBbJ3R5cGVzJywgJ3ByaW1hcnlUeXBlJywgJ2RvbWFpbicsICdtZXNzYWdlJ10sXHJcbn07XHJcblxyXG4vLyBKU09OIFJQQyBtZXRob2RzXHJcblxyXG5leHBvcnQgZW51bSBKU09OUlBDTWV0aG9kIHtcclxuICAgIGRiX2dldEhleCA9ICdkYl9nZXRIZXgnLFxyXG4gICAgZGJfZ2V0U3RyaW5nID0gJ2RiX2dldFN0cmluZycsXHJcbiAgICBkYl9wdXRIZXggPSAnZGJfcHV0SGV4JyxcclxuICAgIGRiX3B1dFN0cmluZyA9ICdkYl9wdXRTdHJpbmcnLFxyXG4gICAgZXRoX2FjY291bnRzID0gJ2V0aF9hY2NvdW50cycsXHJcbiAgICBldGhfYmxvY2tOdW1iZXIgPSAnZXRoX2Jsb2NrTnVtYmVyJyxcclxuICAgIGV0aF9jYWxsID0gJ2V0aF9jYWxsJyxcclxuICAgIGV0aF9jaGFpbklkID0gJ2V0aF9jaGFpbklkJyxcclxuICAgIGV0aF9jb2luYmFzZSA9ICdldGhfY29pbmJhc2UnLFxyXG4gICAgZXRoX2NvbXBpbGVMTEwgPSAnZXRoX2NvbXBpbGVMTEwnLFxyXG4gICAgZXRoX2NvbXBpbGVTZXJwZW50ID0gJ2V0aF9jb21waWxlU2VycGVudCcsXHJcbiAgICBldGhfY29tcGlsZVNvbGlkaXR5ID0gJ2V0aF9jb21waWxlU29saWRpdHknLFxyXG4gICAgZXRoX2VzdGltYXRlR2FzID0gJ2V0aF9lc3RpbWF0ZUdhcycsXHJcbiAgICBldGhfZmVlSGlzdG9yeSA9ICdldGhfZmVlSGlzdG9yeScsXHJcbiAgICBldGhfZ2FzUHJpY2UgPSAnZXRoX2dhc1ByaWNlJyxcclxuICAgIGV0aF9nZXRCYWxhbmNlID0gJ2V0aF9nZXRCYWxhbmNlJyxcclxuICAgIGV0aF9nZXRCbG9ja0J5SGFzaCA9ICdldGhfZ2V0QmxvY2tCeUhhc2gnLFxyXG4gICAgZXRoX2dldEJsb2NrQnlOdW1iZXIgPSAnZXRoX2dldEJsb2NrQnlOdW1iZXInLFxyXG4gICAgZXRoX2dldEJsb2NrVHJhbnNhY3Rpb25Db3VudEJ5SGFzaCA9ICdldGhfZ2V0QmxvY2tUcmFuc2FjdGlvbkNvdW50QnlIYXNoJyxcclxuICAgIGV0aF9nZXRCbG9ja1RyYW5zYWN0aW9uQ291bnRCeU51bWJlciA9ICdldGhfZ2V0QmxvY2tUcmFuc2FjdGlvbkNvdW50QnlOdW1iZXInLFxyXG4gICAgZXRoX2dldENvZGUgPSAnZXRoX2dldENvZGUnLFxyXG4gICAgZXRoX2dldENvbXBpbGVycyA9ICdldGhfZ2V0Q29tcGlsZXJzJyxcclxuICAgIGV0aF9nZXRGaWx0ZXJDaGFuZ2VzID0gJ2V0aF9nZXRGaWx0ZXJDaGFuZ2VzJyxcclxuICAgIGV0aF9nZXRGaWx0ZXJMb2dzID0gJ2V0aF9nZXRGaWx0ZXJMb2dzJyxcclxuICAgIGV0aF9nZXRMb2dzID0gJ2V0aF9nZXRMb2dzJyxcclxuICAgIGV0aF9nZXRTdG9yYWdlQXQgPSAnZXRoX2dldFN0b3JhZ2VBdCcsXHJcbiAgICBldGhfZ2V0VHJhbnNhY3Rpb25CeUJsb2NrSGFzaEFuZEluZGV4ID0gJ2V0aF9nZXRUcmFuc2FjdGlvbkJ5QmxvY2tIYXNoQW5kSW5kZXgnLFxyXG4gICAgZXRoX2dldFRyYW5zYWN0aW9uQnlCbG9ja051bWJlckFuZEluZGV4ID0gJ2V0aF9nZXRUcmFuc2FjdGlvbkJ5QmxvY2tOdW1iZXJBbmRJbmRleCcsXHJcbiAgICBldGhfZ2V0VHJhbnNhY3Rpb25CeUhhc2ggPSAnZXRoX2dldFRyYW5zYWN0aW9uQnlIYXNoJyxcclxuICAgIGV0aF9nZXRUcmFuc2FjdGlvbkNvdW50ID0gJ2V0aF9nZXRUcmFuc2FjdGlvbkNvdW50JyxcclxuICAgIGV0aF9nZXRUcmFuc2FjdGlvblJlY2VpcHQgPSAnZXRoX2dldFRyYW5zYWN0aW9uUmVjZWlwdCcsXHJcbiAgICBldGhfZ2V0VW5jbGVCeUJsb2NrSGFzaEFuZEluZGV4ID0gJ2V0aF9nZXRVbmNsZUJ5QmxvY2tIYXNoQW5kSW5kZXgnLFxyXG4gICAgZXRoX2dldFVuY2xlQnlCbG9ja051bWJlckFuZEluZGV4ID0gJ2V0aF9nZXRVbmNsZUJ5QmxvY2tOdW1iZXJBbmRJbmRleCcsXHJcbiAgICBldGhfZ2V0VW5jbGVDb3VudEJ5QmxvY2tIYXNoID0gJ2V0aF9nZXRVbmNsZUNvdW50QnlCbG9ja0hhc2gnLFxyXG4gICAgZXRoX2dldFVuY2xlQ291bnRCeUJsb2NrTnVtYmVyID0gJ2V0aF9nZXRVbmNsZUNvdW50QnlCbG9ja051bWJlcicsXHJcbiAgICBldGhfZ2V0V29yayA9ICdldGhfZ2V0V29yaycsXHJcbiAgICBldGhfbWluaW5nID0gJ2V0aF9taW5pbmcnLFxyXG4gICAgZXRoX25ld0Jsb2NrRmlsdGVyID0gJ2V0aF9uZXdCbG9ja0ZpbHRlcicsXHJcbiAgICBldGhfbmV3RmlsdGVyID0gJ2V0aF9uZXdGaWx0ZXInLFxyXG4gICAgZXRoX3Byb3RvY29sVmVyc2lvbiA9ICdldGhfcHJvdG9jb2xWZXJzaW9uJyxcclxuICAgIGV0aF9yZXF1ZXN0QWNjb3VudHMgPSAnZXRoX3JlcXVlc3RBY2NvdW50cycsXHJcbiAgICBldGhfc2VuZFJhd1RyYW5zYWN0aW9uID0gJ2V0aF9zZW5kUmF3VHJhbnNhY3Rpb24nLFxyXG4gICAgZXRoX3NlbmRUcmFuc2FjdGlvbiA9ICdldGhfc2VuZFRyYW5zYWN0aW9uJyxcclxuICAgIGV0aF9zaWduID0gJ2V0aF9zaWduJyxcclxuICAgIGV0aF9zaWduVHJhbnNhY3Rpb24gPSAnZXRoX3NpZ25UcmFuc2FjdGlvbicsXHJcbiAgICBldGhfc2lnblR5cGVkRGF0YSA9ICdldGhfc2lnblR5cGVkRGF0YScsXHJcbiAgICBldGhfc2lnblR5cGVkRGF0YV92MSA9ICdldGhfc2lnblR5cGVkRGF0YV92MScsXHJcbiAgICBldGhfc2lnblR5cGVkRGF0YV92MyA9ICdldGhfc2lnblR5cGVkRGF0YV92MycsXHJcbiAgICBldGhfc2lnblR5cGVkRGF0YV92NCA9ICdldGhfc2lnblR5cGVkRGF0YV92NCcsXHJcbiAgICBldGhfc3VibWl0V29yayA9ICdldGhfc3VibWl0V29yaycsXHJcbiAgICBldGhfdW5pbnN0YWxsRmlsdGVyID0gJ2V0aF91bmluc3RhbGxGaWx0ZXInLFxyXG4gICAgbmV0X2xpc3RlbmluZyA9ICduZXRfbGlzdGVuaW5nJyxcclxuICAgIG5ldF9wZWVyQ291bnQgPSAnbmV0X3BlZXJDb3VudCcsXHJcbiAgICBuZXRfdmVyc2lvbiA9ICduZXRfdmVyc2lvbicsXHJcbiAgICBwZXJzb25hbF9lY1JlY292ZXIgPSAncGVyc29uYWxfZWNSZWNvdmVyJyxcclxuICAgIHBlcnNvbmFsX3NpZ24gPSAncGVyc29uYWxfc2lnbicsXHJcbiAgICBzaGhfYWRkVG9Hcm91cCA9ICdzaGhfYWRkVG9Hcm91cCcsXHJcbiAgICBzaGhfZ2V0RmlsdGVyQ2hhbmdlcyA9ICdzaGhfZ2V0RmlsdGVyQ2hhbmdlcycsXHJcbiAgICBzaGhfZ2V0TWVzc2FnZXMgPSAnc2hoX2dldE1lc3NhZ2VzJyxcclxuICAgIHNoaF9oYXNJZGVudGl0eSA9ICdzaGhfaGFzSWRlbnRpdHknLFxyXG4gICAgc2hoX25ld0ZpbHRlciA9ICdzaGhfbmV3RmlsdGVyJyxcclxuICAgIHNoaF9uZXdHcm91cCA9ICdzaGhfbmV3R3JvdXAnLFxyXG4gICAgc2hoX25ld0lkZW50aXR5ID0gJ3NoaF9uZXdJZGVudGl0eScsXHJcbiAgICBzaGhfcG9zdCA9ICdzaGhfcG9zdCcsXHJcbiAgICBzaGhfdW5pbnN0YWxsRmlsdGVyID0gJ3NoaF91bmluc3RhbGxGaWx0ZXInLFxyXG4gICAgc2hoX3ZlcnNpb24gPSAnc2hoX3ZlcnNpb24nLFxyXG4gICAgd2FsbGV0X2FkZEV0aGVyZXVtQ2hhaW4gPSAnd2FsbGV0X2FkZEV0aGVyZXVtQ2hhaW4nLFxyXG4gICAgd2FsbGV0X3N3aXRjaEV0aGVyZXVtQ2hhaW4gPSAnd2FsbGV0X3N3aXRjaEV0aGVyZXVtQ2hhaW4nLFxyXG4gICAgd2FsbGV0X2dldFBlcm1pc3Npb25zID0gJ3dhbGxldF9nZXRQZXJtaXNzaW9ucycsXHJcbiAgICB3YWxsZXRfcmVxdWVzdFBlcm1pc3Npb25zID0gJ3dhbGxldF9yZXF1ZXN0UGVybWlzc2lvbnMnLFxyXG4gICAgd2FsbGV0X3dhdGNoQXNzZXQgPSAnd2FsbGV0X3dhdGNoQXNzZXQnLFxyXG4gICAgd2ViM19jbGllbnRWZXJzaW9uID0gJ3dlYjNfY2xpZW50VmVyc2lvbicsXHJcbiAgICB3ZWIzX3NoYTMgPSAnd2ViM19zaGEzJyxcclxuICAgIC8vIHB1Yi9zdWJcclxuICAgIGV0aF9zdWJzY3JpYmUgPSAnZXRoX3N1YnNjcmliZScsXHJcbiAgICBldGhfdW5zdWJzY3JpYmUgPSAnZXRoX3Vuc3Vic2NyaWJlJyxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCbG9jayB7XHJcbiAgICBwYXJlbnRIYXNoOiBzdHJpbmc7XHJcbiAgICBzaGEzVW5jbGVzOiBzdHJpbmc7XHJcbiAgICBtaW5lcjogc3RyaW5nO1xyXG4gICAgc3RhdGVSb290OiBzdHJpbmc7XHJcbiAgICB0cmFuc2FjdGlvbnNSb290OiBzdHJpbmc7XHJcbiAgICByZWNlaXB0c1Jvb3Q6IHN0cmluZztcclxuICAgIGxvZ3NCbG9vbTogc3RyaW5nO1xyXG4gICAgZGlmZmljdWx0eTogc3RyaW5nO1xyXG4gICAgbnVtYmVyOiBzdHJpbmc7XHJcbiAgICBnYXNMaW1pdDogc3RyaW5nO1xyXG4gICAgZ2FzVXNlZDogc3RyaW5nO1xyXG4gICAgdGltZXN0YW1wOiBzdHJpbmc7XHJcbiAgICBleHRyYURhdGE6IHN0cmluZztcclxuICAgIG1peEhhc2g6IHN0cmluZztcclxuICAgIG5vbmNlOiBzdHJpbmc7XHJcbiAgICBiYXNlRmVlUGVyR2FzOiBzdHJpbmc7XHJcbiAgICBoYXNoOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8vIEV4dGVybmFsIHByb3ZpZGVyIG1ldGhvZHNcclxuXHJcbmV4cG9ydCBjb25zdCBFeHRQcm92aWRlck1ldGhvZHMgPSBbXHJcbiAgICBKU09OUlBDTWV0aG9kLmV0aF9jYWxsLFxyXG4gICAgSlNPTlJQQ01ldGhvZC5ldGhfZXN0aW1hdGVHYXMsXHJcbiAgICBKU09OUlBDTWV0aG9kLmV0aF9mZWVIaXN0b3J5LFxyXG4gICAgSlNPTlJQQ01ldGhvZC5ldGhfZ2FzUHJpY2UsXHJcbiAgICBKU09OUlBDTWV0aG9kLmV0aF9nZXRCYWxhbmNlLFxyXG4gICAgSlNPTlJQQ01ldGhvZC5ldGhfZ2V0QmxvY2tCeUhhc2gsXHJcbiAgICBKU09OUlBDTWV0aG9kLmV0aF9nZXRCbG9ja0J5TnVtYmVyLFxyXG4gICAgSlNPTlJQQ01ldGhvZC5ldGhfZ2V0QmxvY2tUcmFuc2FjdGlvbkNvdW50QnlIYXNoLFxyXG4gICAgSlNPTlJQQ01ldGhvZC5ldGhfZ2V0QmxvY2tUcmFuc2FjdGlvbkNvdW50QnlOdW1iZXIsXHJcbiAgICBKU09OUlBDTWV0aG9kLmV0aF9nZXRDb2RlLFxyXG4gICAgSlNPTlJQQ01ldGhvZC5ldGhfZ2V0TG9ncyxcclxuICAgIEpTT05SUENNZXRob2QuZXRoX2dldFN0b3JhZ2VBdCxcclxuICAgIEpTT05SUENNZXRob2QuZXRoX2dldFRyYW5zYWN0aW9uQnlCbG9ja0hhc2hBbmRJbmRleCxcclxuICAgIEpTT05SUENNZXRob2QuZXRoX2dldFRyYW5zYWN0aW9uQnlCbG9ja051bWJlckFuZEluZGV4LFxyXG4gICAgSlNPTlJQQ01ldGhvZC5ldGhfZ2V0VHJhbnNhY3Rpb25CeUhhc2gsXHJcbiAgICBKU09OUlBDTWV0aG9kLmV0aF9nZXRUcmFuc2FjdGlvbkNvdW50LFxyXG4gICAgSlNPTlJQQ01ldGhvZC5ldGhfZ2V0VHJhbnNhY3Rpb25SZWNlaXB0LFxyXG4gICAgSlNPTlJQQ01ldGhvZC5ldGhfZ2V0VW5jbGVCeUJsb2NrSGFzaEFuZEluZGV4LFxyXG4gICAgSlNPTlJQQ01ldGhvZC5ldGhfZ2V0VW5jbGVCeUJsb2NrTnVtYmVyQW5kSW5kZXgsXHJcbiAgICBKU09OUlBDTWV0aG9kLmV0aF9nZXRVbmNsZUNvdW50QnlCbG9ja0hhc2gsXHJcbiAgICBKU09OUlBDTWV0aG9kLmV0aF9nZXRVbmNsZUNvdW50QnlCbG9ja051bWJlcixcclxuICAgIEpTT05SUENNZXRob2QuZXRoX2dldFdvcmssXHJcbiAgICBKU09OUlBDTWV0aG9kLmV0aF9taW5pbmcsXHJcbiAgICBKU09OUlBDTWV0aG9kLmV0aF9wcm90b2NvbFZlcnNpb24sXHJcbiAgICBKU09OUlBDTWV0aG9kLmV0aF9zZW5kUmF3VHJhbnNhY3Rpb24sXHJcbiAgICBKU09OUlBDTWV0aG9kLmV0aF9zdWJtaXRXb3JrLFxyXG4gICAgSlNPTlJQQ01ldGhvZC5uZXRfbGlzdGVuaW5nLFxyXG4gICAgSlNPTlJQQ01ldGhvZC5uZXRfcGVlckNvdW50LFxyXG4gICAgSlNPTlJQQ01ldGhvZC5uZXRfdmVyc2lvbixcclxuICAgIEpTT05SUENNZXRob2Qud2ViM19jbGllbnRWZXJzaW9uLFxyXG5dO1xyXG4iLCJpbXBvcnQgQmxhbmtQcm92aWRlciBmcm9tICcuL3Byb3ZpZGVyL0JsYW5rUHJvdmlkZXInO1xyXG5pbXBvcnQge1xyXG4gICAgT3JpZ2luLFxyXG4gICAgV2luZG93VHJhbnNwb3J0UmVzcG9uc2VNZXNzYWdlLFxyXG59IGZyb20gJ0BibG9jay13YWxsZXQvYmFja2dyb3VuZC91dGlscy90eXBlcy9jb21tdW5pY2F0aW9uJztcclxuaW1wb3J0IGxvZywgeyBMb2dMZXZlbERlc2MgfSBmcm9tICdsb2dsZXZlbCc7XHJcbmltcG9ydCBzaGltV2ViMyBmcm9tICcuL3V0aWxzL3NoaW1XZWIzJztcclxuaW1wb3J0IHsgSW5qZWN0ZWRXaW5kb3csIFNpZ25hbE1lc3NhZ2UgfSBmcm9tICcuL3R5cGVzJztcclxuXHJcbi8vIFNldHRpbmcgdGhlIGRlZmF1bHQgbG9nIGxldmVsOlxyXG5sb2cuc2V0TGV2ZWwoKHByb2Nlc3MuZW52LkxPR19MRVZFTCBhcyBMb2dMZXZlbERlc2MpIHx8ICd3YXJuJyk7XHJcblxyXG5jb25zdCBibGFua1Byb3ZpZGVyOiBCbGFua1Byb3ZpZGVyID0gbmV3IEJsYW5rUHJvdmlkZXIoKTtcclxuXHJcbmNvbnN0IHByb3ZpZGVyID0gbmV3IFByb3h5KGJsYW5rUHJvdmlkZXIsIHtcclxuICAgIGRlbGV0ZVByb3BlcnR5OiAoKSA9PiB0cnVlLFxyXG59KTtcclxuXHJcbnNoaW1XZWIzKHByb3ZpZGVyKTtcclxuXHJcbih3aW5kb3cgYXMgV2luZG93ICYgSW5qZWN0ZWRXaW5kb3cpLmV0aGVyZXVtID0gcHJvdmlkZXI7XHJcblxyXG53aW5kb3cuZGlzcGF0Y2hFdmVudChcclxuICAgIG5ldyBDdXN0b21FdmVudCgnZXRoZXJldW0jaW5pdGlhbGl6ZWQnLCB7IGRldGFpbDogJ2lzQmxvY2tXYWxsZXQnIH0pXHJcbik7XHJcblxyXG4vLyBMaXN0ZW5zIHRvIGV2ZW50cyBnZW5lcmF0ZWQgYnkgdGhlIGJhY2tncm91bmQgc2NyaXB0XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgJ21lc3NhZ2UnLFxyXG4gICAgKHtcclxuICAgICAgICBkYXRhLFxyXG4gICAgICAgIHNvdXJjZSxcclxuICAgIH06IE1lc3NhZ2VFdmVudDxXaW5kb3dUcmFuc3BvcnRSZXNwb25zZU1lc3NhZ2UgfCBTaWduYWxNZXNzYWdlPik6IHZvaWQgPT4ge1xyXG4gICAgICAgIC8vIE9ubHkgYWxsb3cgbWVzc2FnZXMgZnJvbSBvdXIgd2luZG93LCBieSB0aGUgbG9hZGVyXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBzb3VyY2UgIT09IHdpbmRvdyB8fFxyXG4gICAgICAgICAgICBkYXRhLm9yaWdpbiAhPT0gT3JpZ2luLkJBQ0tHUk9VTkQgfHxcclxuICAgICAgICAgICAgIWJsYW5rUHJvdmlkZXJcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgd2UncmUgcmVpbml0aWFsaXppbmcgdGhlIFNXXHJcbiAgICAgICAgaWYgKCdzaWduYWwnIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgYmxhbmtQcm92aWRlci5oYW5kbGVTaWduYWwoZGF0YS5zaWduYWwpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5pZCkge1xyXG4gICAgICAgICAgICBibGFua1Byb3ZpZGVyLmhhbmRsZVJlc3BvbnNlKGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxvZy5lcnJvcignTWlzc2luZyByZXNwb25zZSBpZC4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbik7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudCAqL1xyXG5pbXBvcnQge1xyXG4gICAgQ2FsbGJhY2ssXHJcbiAgICBSZXF1ZXN0QXJndW1lbnRzLFxyXG4gICAgSlNPTlJQQ1JlcXVlc3QsXHJcbiAgICBKU09OUlBDUmVzcG9uc2UsXHJcbiAgICBQcm92aWRlckNvbm5lY3RJbmZvLFxyXG4gICAgUHJvdmlkZXJScGNFcnJvcixcclxuICAgIFByb3ZpZGVyRXZlbnRzLFxyXG4gICAgRXRoZXJldW1Qcm92aWRlcixcclxuICAgIENoYWluQ2hhbmdlZEluZm8sXHJcbiAgICBFdGhTdWJzY3JpcHRpb24sXHJcbiAgICBXZWIzTGVnYWN5U3Vic2NyaXB0aW9uLFxyXG4gICAgU2lnbmFscyxcclxufSBmcm9tICcuLi90eXBlcyc7XHJcbmltcG9ydCB7XHJcbiAgICBFeHRlcm5hbEV2ZW50U3Vic2NyaXB0aW9uLFxyXG4gICAgSGFuZGxlcnMsXHJcbiAgICBNZXNzYWdlVHlwZXMsXHJcbiAgICBNZXNzYWdlcyxcclxuICAgIFJlcXVlc3RUeXBlcyxcclxuICAgIFJlc3BvbnNlVHlwZXMsXHJcbiAgICBTdWJzY3JpcHRpb25NZXNzYWdlVHlwZXMsXHJcbiAgICBUcmFuc3BvcnRSZXNwb25zZU1lc3NhZ2UsXHJcbiAgICBFWFRFUk5BTCxcclxuICAgIE9yaWdpbixcclxuICAgIFdpbmRvd1RyYW5zcG9ydFJlcXVlc3RNZXNzYWdlLFxyXG59IGZyb20gJ0BibG9jay13YWxsZXQvYmFja2dyb3VuZC91dGlscy90eXBlcy9jb21tdW5pY2F0aW9uJztcclxuaW1wb3J0IFNhZmVFdmVudEVtaXR0ZXIgZnJvbSAnQG1ldGFtYXNrL3NhZmUtZXZlbnQtZW1pdHRlcic7XHJcbmltcG9ydCB7IGV0aEVycm9ycyB9IGZyb20gJ2V0aC1ycGMtZXJyb3JzJztcclxuaW1wb3J0IHsgZ2V0SWNvbkRhdGEgfSBmcm9tICcuLi91dGlscy9zaXRlJztcclxuaW1wb3J0IHsgSlNPTlJQQ01ldGhvZCB9IGZyb20gJ0BibG9jay13YWxsZXQvYmFja2dyb3VuZC91dGlscy90eXBlcy9ldGhlcmV1bSc7XHJcbmltcG9ydCB7IHZhbGlkYXRlRXJyb3IgfSBmcm9tICcuLi91dGlscy9lcnJvcnMnO1xyXG5pbXBvcnQgbG9nIGZyb20gJ2xvZ2xldmVsJztcclxuaW1wb3J0IHtcclxuICAgIGdldEJsb2NrV2FsbGV0Q29tcGF0aWJpbGl0eSxcclxuICAgIHVwZGF0ZUJsb2NrV2FsbGV0Q29tcGF0aWJpbGl0eSxcclxufSBmcm9tICcuLi91dGlscy9jb21wYXRpYmlsaXR5JztcclxuXHJcbmludGVyZmFjZSBCbGFua1Byb3ZpZGVyU3RhdGUge1xyXG4gICAgYWNjb3VudHM6IHN0cmluZ1tdO1xyXG4gICAgaXNDb25uZWN0ZWQ6IGJvb2xlYW47XHJcbn1cclxuXHJcbmNvbnN0IE1BWF9FVkVOVF9MSVNURU5FUlMgPSAxMDA7XHJcblxyXG4vKipcclxuICogQmxhbmsgUHJvdmlkZXJcclxuICpcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJsYW5rUHJvdmlkZXJcclxuICAgIGV4dGVuZHMgU2FmZUV2ZW50RW1pdHRlclxyXG4gICAgaW1wbGVtZW50cyBFdGhlcmV1bVByb3ZpZGVyXHJcbntcclxuICAgIHB1YmxpYyBpc0Jsb2NrV2FsbGV0ID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBpc01ldGFNYXNrID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBjaGFpbklkOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgcHVibGljIHNlbGVjdGVkQWRkcmVzczogc3RyaW5nIHwgbnVsbDtcclxuICAgIHB1YmxpYyBuZXR3b3JrVmVyc2lvbjogc3RyaW5nIHwgbnVsbDtcclxuICAgIHB1YmxpYyBhdXRvUmVmcmVzaE9uTmV0d29ya0NoYW5nZTogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX3N0YXRlOiBCbGFua1Byb3ZpZGVyU3RhdGU7XHJcbiAgICBwcml2YXRlIF9oYW5kbGVyczogSGFuZGxlcnM7XHJcbiAgICBwcml2YXRlIF9yZXF1ZXN0SWQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2V0aFN1YnNjcmlwdGlvbnM6IHtcclxuICAgICAgICBbcmVxSWQ6IHN0cmluZ106IHtcclxuICAgICAgICAgICAgcGFyYW1zOiBhbnk7XHJcbiAgICAgICAgICAgIHN1YklkOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIHByZXZTdWJJZDogc3RyaW5nO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgX21ldGFtYXNrOiB7XHJcbiAgICAgICAgaXNFbmFibGVkOiAoKSA9PiBib29sZWFuO1xyXG4gICAgICAgIGlzQXBwcm92ZWQ6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XHJcbiAgICAgICAgaXNVbmxvY2tlZDogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGFjY291bnRzOiBbXSxcclxuICAgICAgICAgICAgaXNDb25uZWN0ZWQ6IHRydWUsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGFpbklkID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQWRkcmVzcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5uZXR3b3JrVmVyc2lvbiA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuX2hhbmRsZXJzID0ge307XHJcbiAgICAgICAgdGhpcy5fcmVxdWVzdElkID0gMDtcclxuXHJcbiAgICAgICAgY29uc3QgY2FjaGVkQ29tcGF0aWJpbGl0eSA9IGdldEJsb2NrV2FsbGV0Q29tcGF0aWJpbGl0eSgpO1xyXG4gICAgICAgIHRoaXMuaXNCbG9ja1dhbGxldCA9IGNhY2hlZENvbXBhdGliaWxpdHkuaXNCbG9ja1dhbGxldCA/PyB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2V0aFN1YnNjcmlwdGlvbnMgPSB7fTtcclxuXHJcbiAgICAgICAgLy8gTWV0YW1hc2sgY29tcGF0aWJpbGl0eVxyXG4gICAgICAgIHRoaXMuaXNNZXRhTWFzayA9ICF0aGlzLmlzQmxvY2tXYWxsZXQ7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlU2l0ZUNvbXBhdGliaWxpdHkoKTtcclxuXHJcbiAgICAgICAgdGhpcy5hdXRvUmVmcmVzaE9uTmV0d29ya0NoYW5nZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX21ldGFtYXNrID0ge1xyXG4gICAgICAgICAgICBpc0VuYWJsZWQ6ICgpID0+IHRydWUsXHJcbiAgICAgICAgICAgIGlzQXBwcm92ZWQ6IGFzeW5jICgpID0+IHRydWUsXHJcbiAgICAgICAgICAgIGlzVW5sb2NrZWQ6IGFzeW5jICgpID0+IHRydWUsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gQmluZCBub24gYXJyb3cgZnVuY3Rpb25zXHJcbiAgICAgICAgdGhpcy5zZW5kID0gdGhpcy5zZW5kLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5zZW5kQXN5bmMgPSB0aGlzLnNlbmRBc3luYy5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgICAvLyBTZXR1cCBwcm92aWRlclxyXG4gICAgICAgIHRoaXMuX3NldHVwUHJvdmlkZXIoKTtcclxuXHJcbiAgICAgICAgLy8gU3Vic2NyaWJlIHRvIHN0YXRlIHVwZGF0ZXNcclxuICAgICAgICB0aGlzLl9ldmVudFN1YnNjcmlwdGlvbih0aGlzLl9ldmVudEhhbmRsZXIpO1xyXG5cclxuICAgICAgICAvLyBTZXQgbWF4aW11bSBhbW91bnQgb2YgZXZlbnQgbGlzdGVuZXJzXHJcbiAgICAgICAgdGhpcy5zZXRNYXhMaXN0ZW5lcnMoTUFYX0VWRU5UX0xJU1RFTkVSUyk7XHJcblxyXG4gICAgICAgIC8vIFNldCBzaXRlIGljb25cclxuICAgICAgICB0aGlzLl9zZXRJY29uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBjaGVja3Mgd2hldGhlciB0aGUgY3VycmVudCBwYWdlIGlzIGNvbXBhdGlibGUgd2l0aCBCbG9ja1dhbGxldC5cclxuICAgICAqIElmIHRoZSBzaXRlIGlzIG5vdCBjb21wYXRpYmxlLCB0aGUgaXNCbG9ja1dhbGxldCBmbGFnIHdpbGwgYmUgc2V0IHRvIGZhbHNlIHdoZW4gaW5qZWN0aW5nIHRoZSBwcm92aWRlciBhbmQgaXNNZXRhbWFzayB3aWxsIGJlIHRydWUuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgX3VwZGF0ZVNpdGVDb21wYXRpYmlsaXR5KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IHByb3ZpZGVyQ29uZmlnID0gYXdhaXQgdGhpcy5fcG9zdE1lc3NhZ2UoXHJcbiAgICAgICAgICAgIE1lc3NhZ2VzLkVYVEVSTkFMLkdFVF9QUk9WSURFUl9DT05GSUdcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IHsgaXNCbG9ja1dhbGxldCB9ID0gdXBkYXRlQmxvY2tXYWxsZXRDb21wYXRpYmlsaXR5KFxyXG4gICAgICAgICAgICBwcm92aWRlckNvbmZpZy5pbmNvbXBhdGlibGVTaXRlc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5pc0Jsb2NrV2FsbGV0ID0gaXNCbG9ja1dhbGxldDtcclxuICAgICAgICB0aGlzLmlzTWV0YU1hc2sgPSAhaXNCbG9ja1dhbGxldDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHJlSW5pdGlhbGl6ZVN1YnNjcmlwdGlvbnMoKSB7XHJcbiAgICAgICAgbG9nLnRyYWNlKCdyZUluaXRpYWxpemVTdWJzY3JpcHRpb25zJywgJ2luaXQnLCB0aGlzLl9ldGhTdWJzY3JpcHRpb25zKTtcclxuICAgICAgICBmb3IgKGNvbnN0IHJlcUlkIGluIHRoaXMuX2V0aFN1YnNjcmlwdGlvbnMpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBwYXJhbXMsIHN1YklkLCBwcmV2U3ViSWQgfSA9IHRoaXMuX2V0aFN1YnNjcmlwdGlvbnNbcmVxSWRdO1xyXG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0OiBSZXF1ZXN0QXJndW1lbnRzID0ge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBKU09OUlBDTWV0aG9kLmV0aF9zdWJzY3JpYmUsXHJcbiAgICAgICAgICAgICAgICBwYXJhbXMsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsb2cudHJhY2UocmVxSWQsICdyZXF1ZXN0JywgcmVxdWVzdCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3Bvc3RNZXNzYWdlKFxyXG4gICAgICAgICAgICAgICAgTWVzc2FnZXMuRVhURVJOQUwuUkVRVUVTVCxcclxuICAgICAgICAgICAgICAgIHJlcXVlc3QsXHJcbiAgICAgICAgICAgICAgICB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICByZXFJZFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLl9ldGhTdWJzY3JpcHRpb25zW3JlcUlkXS5wcmV2U3ViSWQgPVxyXG4gICAgICAgICAgICAgICAgcHJldlN1YklkICYmIHByZXZTdWJJZCAhPT0gJycgPyBwcmV2U3ViSWQgOiBzdWJJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbG9nLnRyYWNlKCdyZUluaXRpYWxpemVTdWJzY3JpcHRpb25zJywgJ2VuZCcsIHRoaXMuX2V0aFN1YnNjcmlwdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlU2lnbmFsXHJcbiAgICAgKlxyXG4gICAgICogSGFuZGxlcyBhIHNpZ25hbFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBzaWduYWwgVGhlIHNpZ25hbCByZWNlaXZlZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGFuZGxlU2lnbmFsKHNpZ25hbDogU2lnbmFscyk6IHZvaWQge1xyXG4gICAgICAgIHN3aXRjaCAoc2lnbmFsKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU2lnbmFscy5TV19SRUlOSVQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudFN1YnNjcmlwdGlvbih0aGlzLl9ldmVudEhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZUluaXRpYWxpemVTdWJzY3JpcHRpb25zKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGxvZy5kZWJ1ZygnVW5yZWNvZ25pemVkIHNpZ25hbCByZWNlaXZlZCcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHVibGljIG1ldGhvZCB0byBjaGVjayBpZiB0aGUgcHJvdmlkZXIgaXMgY29ubmVjdGVkXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNDb25uZWN0ZWQgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlLmlzQ29ubmVjdGVkO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFB1YmxpYyByZXF1ZXN0IG1ldGhvZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBhcmdzIFJlcXVlc3QgYXJndW1lbnRzXHJcbiAgICAgKiBAcmV0dXJucyBSZXF1ZXN0IHJlc3BvbnNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXF1ZXN0ID0gYXN5bmMgKGFyZ3M6IFJlcXVlc3RBcmd1bWVudHMpOiBQcm9taXNlPHVua25vd24+ID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMuX3N0YXRlLmlzQ29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IGV0aEVycm9ycy5wcm92aWRlci5kaXNjb25uZWN0ZWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghYXJncyB8fCB0eXBlb2YgYXJncyAhPT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheShhcmdzKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBldGhFcnJvcnMucnBjLmludmFsaWRSZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdFeHBlY3RlZCBhIHNpbmdsZSwgbm9uLWFycmF5LCBvYmplY3QgYXJndW1lbnQuJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IGFyZ3MsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgeyBtZXRob2QsIHBhcmFtcyB9ID0gYXJncztcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBtZXRob2QgIT09ICdzdHJpbmcnIHx8IG1ldGhvZC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhyb3cgZXRoRXJyb3JzLnJwYy5pbnZhbGlkUmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIidtZXRob2QnIHByb3BlcnR5IG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nLlwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogYXJncyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHBhcmFtcyAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICAgICFBcnJheS5pc0FycmF5KHBhcmFtcykgJiZcclxuICAgICAgICAgICAgKHR5cGVvZiBwYXJhbXMgIT09ICdvYmplY3QnIHx8IHBhcmFtcyA9PT0gbnVsbClcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhyb3cgZXRoRXJyb3JzLnJwYy5pbnZhbGlkUmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOlxyXG4gICAgICAgICAgICAgICAgICAgIFwiJ3BhcmFtcycgcHJvcGVydHkgbXVzdCBiZSBhbiBvYmplY3Qgb3IgYXJyYXkgaWYgcHJvdmlkZWQuXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBhcmdzLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb3N0TWVzc2FnZShNZXNzYWdlcy5FWFRFUk5BTC5SRVFVRVNULCBhcmdzKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNwb25zZSBoYW5kbGVyXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGFuZGxlUmVzcG9uc2UgPSA8VE1lc3NhZ2VUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGVzPihcclxuICAgICAgICBkYXRhOiBUcmFuc3BvcnRSZXNwb25zZU1lc3NhZ2U8VE1lc3NhZ2VUeXBlPlxyXG4gICAgKTogdm9pZCA9PiB7XHJcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IHRoaXMuX2hhbmRsZXJzW2RhdGEuaWRdO1xyXG5cclxuICAgICAgICBpZiAoIWhhbmRsZXIpIHtcclxuICAgICAgICAgICAgbG9nLmVycm9yKCdVbmtub3duIHJlc3BvbnNlJywgZGF0YSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWhhbmRsZXIuc3Vic2NyaWJlcikge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5faGFuZGxlcnNbZGF0YS5pZF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjaGVjayBmb3Igc3Vic2NyaXB0aW9uIGlkIGluIHJlc3BvbnNlXHJcbiAgICAgICAgdGhpcy5zZXRFdGhTdWJzY3JpcHRpb25zU3ViSWQoZGF0YSk7XHJcblxyXG4gICAgICAgIGlmIChkYXRhLnN1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICAoaGFuZGxlci5zdWJzY3JpYmVyIGFzIChkYXRhOiBhbnkpID0+IHZvaWQpKGRhdGEuc3Vic2NyaXB0aW9uKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEuZXJyb3IpIHtcclxuICAgICAgICAgICAgLy8gRGVzZXJpYWx6ZSBlcnJvciBvYmplY3RcclxuICAgICAgICAgICAgY29uc3QgcGFyc2VkRXJyb3IgPSBKU09OLnBhcnNlKGRhdGEuZXJyb3IpO1xyXG4gICAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IocGFyc2VkRXJyb3IubWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBWYWxpZGF0ZSBlcnJvciBhbmQgcmVqZWN0IHByb21pc2VcclxuICAgICAgICAgICAgY29uc3QgdmFsZGF0ZWRFcnIgPSB2YWxpZGF0ZUVycm9yKGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgaGFuZGxlci5yZWplY3QodmFsZGF0ZWRFcnIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGhhbmRsZXIucmVzb2x2ZShkYXRhLnJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgICAvKiBEZXByZWNhdGVkIHJlcXVlc3QgbWV0aG9kc1xyXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlcHJlY2F0ZWQgc2VuZCBtZXRob2RcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZW5kKHJlcXVlc3Q6IEpTT05SUENSZXF1ZXN0KTogSlNPTlJQQ1Jlc3BvbnNlO1xyXG4gICAgcHVibGljIHNlbmQocmVxdWVzdDogSlNPTlJQQ1JlcXVlc3RbXSk6IEpTT05SUENSZXNwb25zZVtdO1xyXG4gICAgcHVibGljIHNlbmQoXHJcbiAgICAgICAgcmVxdWVzdDogSlNPTlJQQ1JlcXVlc3QsXHJcbiAgICAgICAgY2FsbGJhY2s6IENhbGxiYWNrPEpTT05SUENSZXNwb25zZT5cclxuICAgICk6IHZvaWQ7XHJcbiAgICBwdWJsaWMgc2VuZChcclxuICAgICAgICByZXF1ZXN0OiBKU09OUlBDUmVxdWVzdFtdLFxyXG4gICAgICAgIGNhbGxiYWNrOiBDYWxsYmFjazxKU09OUlBDUmVzcG9uc2VbXT5cclxuICAgICk6IHZvaWQ7XHJcbiAgICBwdWJsaWMgc2VuZDxUID0gYW55PihtZXRob2Q6IHN0cmluZywgcGFyYW1zPzogYW55W10gfCBhbnkpOiBQcm9taXNlPFQ+O1xyXG4gICAgcHVibGljIHNlbmQoXHJcbiAgICAgICAgcmVxdWVzdE9yTWV0aG9kOiBKU09OUlBDUmVxdWVzdCB8IEpTT05SUENSZXF1ZXN0W10gfCBzdHJpbmcsXHJcbiAgICAgICAgY2FsbGJhY2tPclBhcmFtcz86XHJcbiAgICAgICAgICAgIHwgQ2FsbGJhY2s8SlNPTlJQQ1Jlc3BvbnNlPlxyXG4gICAgICAgICAgICB8IENhbGxiYWNrPEpTT05SUENSZXNwb25zZVtdPlxyXG4gICAgICAgICAgICB8IGFueVtdXHJcbiAgICAgICAgICAgIHwgYW55XHJcbiAgICApOiBKU09OUlBDUmVzcG9uc2UgfCBKU09OUlBDUmVzcG9uc2VbXSB8IHZvaWQgfCBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHRoaXMuZGVwcmVjYXRpb25XYXJuaW5nKCdldGhlcmV1bS5zZW5kKC4uLiknLCB0cnVlKTtcclxuXHJcbiAgICAgICAgLy8gc2VuZDxUPihtZXRob2QsIHBhcmFtcyk6IFByb21pc2U8VD5cclxuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3RPck1ldGhvZCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gcmVxdWVzdE9yTWV0aG9kIGFzIEpTT05SUENNZXRob2Q7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IEFycmF5LmlzQXJyYXkoY2FsbGJhY2tPclBhcmFtcylcclxuICAgICAgICAgICAgICAgID8gY2FsbGJhY2tPclBhcmFtc1xyXG4gICAgICAgICAgICAgICAgOiBjYWxsYmFja09yUGFyYW1zICE9PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgID8gW2NhbGxiYWNrT3JQYXJhbXNdXHJcbiAgICAgICAgICAgICAgICA6IFtdO1xyXG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0OiBSZXF1ZXN0QXJndW1lbnRzID0ge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kLFxyXG4gICAgICAgICAgICAgICAgcGFyYW1zLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHRoaXMuX3Bvc3RNZXNzYWdlKFxyXG4gICAgICAgICAgICAgICAgTWVzc2FnZXMuRVhURVJOQUwuUkVRVUVTVCxcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHNlbmQoSlNPTlJQQ1JlcXVlc3QgfCBKU09OUlBDUmVxdWVzdFtdLCBjYWxsYmFjayk6IHZvaWRcclxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrT3JQYXJhbXMgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVxdWVzdCA9IHJlcXVlc3RPck1ldGhvZCBhcyBhbnk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrID0gY2FsbGJhY2tPclBhcmFtcyBhcyBhbnk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbmRBc3luYyhyZXF1ZXN0LCBjYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzZW5kKEpTT05SUENSZXF1ZXN0W10pOiBKU09OUlBDUmVzcG9uc2VbXVxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlcXVlc3RPck1ldGhvZCkpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVxdWVzdHMgPSByZXF1ZXN0T3JNZXRob2Q7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0cy5tYXAoKHIpID0+IHRoaXMuX3NlbmRKU09OUlBDUmVxdWVzdChyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzZW5kKEpTT05SUENSZXF1ZXN0KTogSlNPTlJQQ1Jlc3BvbnNlXHJcbiAgICAgICAgY29uc3QgcmVxID0gcmVxdWVzdE9yTWV0aG9kIGFzIEpTT05SUENSZXF1ZXN0O1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZW5kSlNPTlJQQ1JlcXVlc3QocmVxKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFzeW5jaHJvbm91cyBzZW5kIG1ldGhvZFxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlbmRBc3luYyhcclxuICAgICAgICByZXF1ZXN0OiBKU09OUlBDUmVxdWVzdCxcclxuICAgICAgICBjYWxsYmFjazogQ2FsbGJhY2s8SlNPTlJQQ1Jlc3BvbnNlPlxyXG4gICAgKTogdm9pZDtcclxuICAgIHB1YmxpYyBzZW5kQXN5bmMoXHJcbiAgICAgICAgcmVxdWVzdDogSlNPTlJQQ1JlcXVlc3RbXSxcclxuICAgICAgICBjYWxsYmFjazogQ2FsbGJhY2s8SlNPTlJQQ1Jlc3BvbnNlW10+XHJcbiAgICApOiB2b2lkO1xyXG4gICAgcHVibGljIHNlbmRBc3luYyhcclxuICAgICAgICByZXF1ZXN0OiBKU09OUlBDUmVxdWVzdCB8IEpTT05SUENSZXF1ZXN0W10sXHJcbiAgICAgICAgY2FsbGJhY2s6IENhbGxiYWNrPEpTT05SUENSZXNwb25zZT4gfCBDYWxsYmFjazxKU09OUlBDUmVzcG9uc2VbXT5cclxuICAgICk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGVwcmVjYXRpb25XYXJuaW5nKCdldGhlcmV1bS5zZW5kQXN5bmMoLi4uKScsIHRydWUpO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRocm93IGV0aEVycm9ycy5ycGMuaW52YWxpZFJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ0EgY2FsbGJhY2sgaXMgcmVxdWlyZWQnLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHNlbmQoSlNPTlJQQ1JlcXVlc3RbXSwgY2FsbGJhY2spOiB2b2lkXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVxdWVzdCkpIHtcclxuICAgICAgICAgICAgY29uc3QgYXJyYXlDYiA9IGNhbGxiYWNrIGFzIENhbGxiYWNrPEpTT05SUENSZXNwb25zZVtdPjtcclxuICAgICAgICAgICAgdGhpcy5fc2VuZE11bHRpcGxlUmVxdWVzdHNBc3luYyhyZXF1ZXN0KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlcykgPT4gYXJyYXlDYihudWxsLCByZXNwb25zZXMpKVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IGFycmF5Q2IoZXJyLCBudWxsKSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHNlbmQoSlNPTlJQQ1JlcXVlc3QsIGNhbGxiYWNrKTogdm9pZFxyXG4gICAgICAgIGNvbnN0IGNiID0gY2FsbGJhY2sgYXMgQ2FsbGJhY2s8SlNPTlJQQ1Jlc3BvbnNlPjtcclxuICAgICAgICB0aGlzLl9zZW5kUmVxdWVzdEFzeW5jKHJlcXVlc3QpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gY2IobnVsbCwgcmVzcG9uc2UpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4gY2IoZXJyLCBudWxsKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVuYWJsZSA9IGFzeW5jICgpOiBQcm9taXNlPHN0cmluZ1tdPiA9PiB7XHJcbiAgICAgICAgdGhpcy5kZXByZWNhdGlvbldhcm5pbmcoJ2V0aGVyZXVtLmVuYWJsZSguLi4pJywgdHJ1ZSk7XHJcbiAgICAgICAgY29uc3QgYWNjb3VudHMgPSAoYXdhaXQgdGhpcy5fcG9zdE1lc3NhZ2UoTWVzc2FnZXMuRVhURVJOQUwuUkVRVUVTVCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IEpTT05SUENNZXRob2QuZXRoX3JlcXVlc3RBY2NvdW50cyxcclxuICAgICAgICB9KSkgYXMgc3RyaW5nW107XHJcblxyXG4gICAgICAgIHJldHVybiBhY2NvdW50cztcclxuICAgIH07XHJcblxyXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICAgIC8qIFByb3ZpZGVyIHNldHVwXHJcbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvdmlkZXIgc2V0dXBcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3NldHVwUHJvdmlkZXIgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBhY2NvdW50cywgY2hhaW5JZCwgbmV0d29ya1ZlcnNpb24gfSA9IGF3YWl0IHRoaXMuX3Bvc3RNZXNzYWdlKFxyXG4gICAgICAgICAgICBNZXNzYWdlcy5FWFRFUk5BTC5TRVRVUF9QUk9WSURFUlxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmIChjaGFpbklkICE9PSB1bmRlZmluZWQgJiYgbmV0d29ya1ZlcnNpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLm5ldHdvcmtWZXJzaW9uID0gbmV0d29ya1ZlcnNpb247XHJcbiAgICAgICAgICAgIHRoaXMuY2hhaW5JZCA9IGNoYWluSWQ7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9jb25uZWN0KHsgY2hhaW5JZCB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2FjY291bnRzQ2hhbmdlZChhY2NvdW50cyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3Vic2NyaWJlcyB0byBldmVudHMgdXBkYXRlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjYiB1cGRhdGUgaGFuZGxlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9ldmVudFN1YnNjcmlwdGlvbiA9IGFzeW5jIChcclxuICAgICAgICBjYjogKHN0YXRlOiBFeHRlcm5hbEV2ZW50U3Vic2NyaXB0aW9uKSA9PiB2b2lkXHJcbiAgICApOiBQcm9taXNlPGJvb2xlYW4+ID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9zdE1lc3NhZ2UoXHJcbiAgICAgICAgICAgIE1lc3NhZ2VzLkVYVEVSTkFMLkVWRU5UX1NVQlNDUklQVElPTixcclxuICAgICAgICAgICAgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBjYlxyXG4gICAgICAgICk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IGZhdmljb24gdXJsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3NldEljb24gPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaWNvblVSTCA9IGF3YWl0IGdldEljb25EYXRhKCk7XHJcblxyXG4gICAgICAgIGlmIChpY29uVVJMKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Bvc3RNZXNzYWdlKE1lc3NhZ2VzLkVYVEVSTkFMLlNFVF9JQ09OLCB7XHJcbiAgICAgICAgICAgICAgICBpY29uVVJMLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgICAvKiBSZXF1ZXN0cyB1dGlsc1xyXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBvc3QgYSBtZXNzYWdlIHVzaW5nIHRoZSB3aW5kb3cgb2JqZWN0LCB0byBiZSBsaXN0ZW5lZCBieSB0aGUgY29udGVudCBzY3JpcHRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBFeHRlcm5hbCBtZXRob2QgdG8gdXNlXHJcbiAgICAgKiBAcGFyYW0gcmVxdWVzdCBSZXF1ZXN0IHBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSBzdWJzY3JpYmVyIFN1YnNjcmlwdGlvbiBjYWxsYmFja1xyXG4gICAgICogQHJldHVybnMgUHJvbWlzZSB3aXRoIHRoZSByZXNwb25zZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9wb3N0TWVzc2FnZSA9IDxUTWVzc2FnZVR5cGUgZXh0ZW5kcyBFWFRFUk5BTD4oXHJcbiAgICAgICAgbWVzc2FnZTogVE1lc3NhZ2VUeXBlLFxyXG4gICAgICAgIHJlcXVlc3Q/OiBSZXF1ZXN0VHlwZXNbVE1lc3NhZ2VUeXBlXSxcclxuICAgICAgICBzdWJzY3JpYmVyPzogKGRhdGE6IFN1YnNjcmlwdGlvbk1lc3NhZ2VUeXBlc1tUTWVzc2FnZVR5cGVdKSA9PiB2b2lkLFxyXG4gICAgICAgIHJlcUlkPzogc3RyaW5nXHJcbiAgICApOiBQcm9taXNlPFJlc3BvbnNlVHlwZXNbVE1lc3NhZ2VUeXBlXT4gPT4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gcmVxSWQgfHwgYCR7RGF0ZS5ub3coKX0uJHsrK3RoaXMuX3JlcXVlc3RJZH1gO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlcnNbaWRdID0geyByZWplY3QsIHJlc29sdmUsIHN1YnNjcmliZXIgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHJlcXVlc3QgaXMgYSBzdWJzY3JpcHRpb24sXHJcbiAgICAgICAgICAgIC8vIHN0b3JlIGl0IGZvciByZXN1YnNjcmlwdGlvbiBpbiBjYXNlIHRoZSBTVyBpcyB0ZXJtaW5hdGVkXHJcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRSZXEgPSB0aGlzLl9jaGVja0ZvckV0aFN1YnNjcmlwdGlvbnM8VE1lc3NhZ2VUeXBlPihcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0LFxyXG4gICAgICAgICAgICAgICAgaWRcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZShcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbjogT3JpZ2luLlBST1ZJREVSLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3Q6IHVwZGF0ZWRSZXEgPz8gKHJlcXVlc3QgfHwge30pLFxyXG4gICAgICAgICAgICAgICAgfSBhcyBXaW5kb3dUcmFuc3BvcnRSZXF1ZXN0TWVzc2FnZSxcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3luY2hyb25vdXMgUlBDIHJlcXVlc3RcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3NlbmRKU09OUlBDUmVxdWVzdCA9IChcclxuICAgICAgICByZXF1ZXN0OiBKU09OUlBDUmVxdWVzdFxyXG4gICAgKTogSlNPTlJQQ1Jlc3BvbnNlID0+IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZTogSlNPTlJQQ1Jlc3BvbnNlID0ge1xyXG4gICAgICAgICAgICBqc29ucnBjOiAnMi4wJyxcclxuICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmVzcG9uc2UucmVzdWx0ID0gdGhpcy5faGFuZGxlU3luY2hyb25vdXNNZXRob2RzKHJlcXVlc3QpO1xyXG5cclxuICAgICAgICBpZiAocmVzcG9uc2UucmVzdWx0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICAgICAgYFBsZWFzZSBwcm92aWRlIGEgY2FsbGJhY2sgcGFyYW1ldGVyIHRvIGNhbGwgJHtyZXF1ZXN0Lm1ldGhvZH0gYCArXHJcbiAgICAgICAgICAgICAgICAgICAgJ2FzeW5jaHJvbm91c2x5LidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBfc2VuZE11bHRpcGxlUmVxdWVzdHNBc3luYyA9IChcclxuICAgICAgICByZXF1ZXN0czogSlNPTlJQQ1JlcXVlc3RbXVxyXG4gICAgKTogUHJvbWlzZTxKU09OUlBDUmVzcG9uc2VbXT4gPT4ge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChyZXF1ZXN0cy5tYXAoKHIpID0+IHRoaXMuX3NlbmRSZXF1ZXN0QXN5bmMocikpKTtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBfc2VuZFJlcXVlc3RBc3luYyA9IChcclxuICAgICAgICByZXF1ZXN0OiBKU09OUlBDUmVxdWVzdFxyXG4gICAgKTogUHJvbWlzZTxKU09OUlBDUmVzcG9uc2U+ID0+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8SlNPTlJQQ1Jlc3BvbnNlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZUFzeW5jaHJvbm91c01ldGhvZHMocmVxdWVzdClcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHJlamVjdChlcnIpKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTeW5jaHJvbm91cyBtZXRob2RzIGhhbmRsZXJcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2hhbmRsZVN5bmNocm9ub3VzTWV0aG9kcyA9IChyZXF1ZXN0OiBKU09OUlBDUmVxdWVzdCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgbWV0aG9kIH0gPSByZXF1ZXN0O1xyXG5cclxuICAgICAgICBzd2l0Y2ggKG1ldGhvZCkge1xyXG4gICAgICAgICAgICBjYXNlIEpTT05SUENNZXRob2QuZXRoX2FjY291bnRzOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRBZGRyZXNzID8gW3RoaXMuc2VsZWN0ZWRBZGRyZXNzXSA6IFtdO1xyXG4gICAgICAgICAgICBjYXNlIEpTT05SUENNZXRob2QuZXRoX2NvaW5iYXNlOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRBZGRyZXNzIHx8IG51bGw7XHJcbiAgICAgICAgICAgIGNhc2UgSlNPTlJQQ01ldGhvZC5uZXRfdmVyc2lvbjpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5ldHdvcmtWZXJzaW9uIHx8IG51bGw7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBc3luY2hyb25vdXMgbWV0aG9kcyBoYW5kbGVyXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9oYW5kbGVBc3luY2hyb25vdXNNZXRob2RzID0gYXN5bmMgKFxyXG4gICAgICAgIHJlcXVlc3Q6IEpTT05SUENSZXF1ZXN0XHJcbiAgICApOiBQcm9taXNlPEpTT05SUENSZXNwb25zZT4gPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlOiBKU09OUlBDUmVzcG9uc2UgPSB7XHJcbiAgICAgICAgICAgIGpzb25ycGM6ICcyLjAnLFxyXG4gICAgICAgICAgICBpZDogcmVxdWVzdC5pZCxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXNwb25zZS5yZXN1bHQgPSBhd2FpdCB0aGlzLl9wb3N0TWVzc2FnZShNZXNzYWdlcy5FWFRFUk5BTC5SRVFVRVNULCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogcmVxdWVzdC5tZXRob2QsXHJcbiAgICAgICAgICAgIHBhcmFtczogcmVxdWVzdC5wYXJhbXMsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgIH07XHJcblxyXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICAgIC8qIEV2ZW50c1xyXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbiAgICBwcml2YXRlIF9ldmVudEhhbmRsZXIgPSAoe1xyXG4gICAgICAgIGV2ZW50TmFtZSxcclxuICAgICAgICBwYXlsb2FkLFxyXG4gICAgfTogRXh0ZXJuYWxFdmVudFN1YnNjcmlwdGlvbik6IHZvaWQgPT4ge1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnROYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgUHJvdmlkZXJFdmVudHMuY29ubmVjdDpcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Nvbm5lY3QocGF5bG9hZCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBQcm92aWRlckV2ZW50cy5kaXNjb25uZWN0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlzY29ubmVjdChwYXlsb2FkKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFByb3ZpZGVyRXZlbnRzLmNoYWluQ2hhbmdlZDpcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NoYWluQ2hhbmdlZChwYXlsb2FkKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFByb3ZpZGVyRXZlbnRzLmFjY291bnRzQ2hhbmdlZDpcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FjY291bnRzQ2hhbmdlZChwYXlsb2FkKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFByb3ZpZGVyRXZlbnRzLm1lc3NhZ2U6XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbWl0U3Vic2NyaXB0aW9uTWVzc2FnZShwYXlsb2FkKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIF9jb25uZWN0ID0gKGNvbm5lY3RJbmZvOiBQcm92aWRlckNvbm5lY3RJbmZvKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fc3RhdGUuaXNDb25uZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZW1pdChQcm92aWRlckV2ZW50cy5jb25uZWN0LCBjb25uZWN0SW5mbyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgX2Rpc2Nvbm5lY3QgPSAoXHJcbiAgICAgICAgZXJyb3I6IFByb3ZpZGVyUnBjRXJyb3IgPSBldGhFcnJvcnMucHJvdmlkZXIuZGlzY29ubmVjdGVkKClcclxuICAgICkgPT4ge1xyXG4gICAgICAgIHRoaXMuX3N0YXRlLmlzQ29ubmVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5lbWl0KFByb3ZpZGVyRXZlbnRzLmRpc2Nvbm5lY3QsIGVycm9yKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlcHJlY2F0ZWQgQWxpYXMgb2YgZGlzY29ubmVjdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZW1pdChQcm92aWRlckV2ZW50cy5jbG9zZSwgZXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIF9jaGFpbkNoYW5nZWQgPSAoeyBjaGFpbklkLCBuZXR3b3JrVmVyc2lvbiB9OiBDaGFpbkNoYW5nZWRJbmZvKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fY29ubmVjdCh7IGNoYWluSWQgfSk7XHJcblxyXG4gICAgICAgIGlmIChjaGFpbklkICE9PSB0aGlzLmNoYWluSWQpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFpbklkID0gY2hhaW5JZDtcclxuICAgICAgICAgICAgdGhpcy5uZXR3b3JrVmVyc2lvbiA9IG5ldHdvcmtWZXJzaW9uO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lbWl0KFByb3ZpZGVyRXZlbnRzLmNoYWluQ2hhbmdlZCwgY2hhaW5JZCk7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQGRlcHJlY2F0ZWQgVGhpcyB3YXMgcHJldmlvdXNseSB1c2VkIHdpdGggbmV0d29ya0lkIGluc3RlYWQgb2YgY2hhaW5JZCxcclxuICAgICAgICAgICAgICogd2Uga2VlcCB0aGUgaW50ZXJmYWNlIGJ1dCB3ZSBlbmZvcmNlIGNoYWluSWQgYW55d2F5c1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdGhpcy5lbWl0KFByb3ZpZGVyRXZlbnRzLm5ldHdvcmtDaGFuZ2VkLCBjaGFpbklkKTtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAZGVwcmVjYXRlZCBBbGlhcyBvZiBjaGFpbkNoYW5nZWRcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHRoaXMuZW1pdChQcm92aWRlckV2ZW50cy5jaGFpbklkQ2hhbmdlZCwgY2hhaW5JZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIF9hY2NvdW50c0NoYW5nZWQgPSBhc3luYyAoYWNjb3VudHM6IHN0cmluZ1tdKSA9PiB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBhY2NvdW50cy5sZW5ndGggIT09IHRoaXMuX3N0YXRlLmFjY291bnRzLmxlbmd0aCB8fFxyXG4gICAgICAgICAgICAhYWNjb3VudHMuZXZlcnkoKHZhbCwgaW5kZXgpID0+IHZhbCA9PT0gdGhpcy5fc3RhdGUuYWNjb3VudHNbaW5kZXhdKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGF0ZS5hY2NvdW50cyA9IGFjY291bnRzO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRBZGRyZXNzICE9PSBhY2NvdW50c1swXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFkZHJlc3MgPSBhY2NvdW50c1swXSB8fCBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVtaXQoUHJvdmlkZXJFdmVudHMuYWNjb3VudHNDaGFuZ2VkLCBhY2NvdW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEVtaXRzIHRvIHRoZSBjb25zdW1lcnMgdGhlIG1lc3NhZ2UgcmVjZWl2ZWQgdmlhIGEgcHJldmlvdXNseVxyXG4gICAgICogaW5pdGlhdGVkIHN1YnNjcmlwdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgcmVjZWl2ZWQgc3Vic2NyaXB0aW9uIG1lc3NhZ2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZW1pdFN1YnNjcmlwdGlvbk1lc3NhZ2UgPSAobWVzc2FnZTogRXRoU3Vic2NyaXB0aW9uKSA9PiB7XHJcbiAgICAgICAgLy8gcmUtd3JpdGUgc3Vic2NyaXB0aW9uIGlkXHJcbiAgICAgICAgZm9yIChjb25zdCByZXFJZCBpbiB0aGlzLl9ldGhTdWJzY3JpcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgcHJldlN1YklkLCBzdWJJZCB9ID0gdGhpcy5fZXRoU3Vic2NyaXB0aW9uc1tyZXFJZF07XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuZGF0YS5zdWJzY3JpcHRpb24gPT09IHN1YklkICYmXHJcbiAgICAgICAgICAgICAgICBwcmV2U3ViSWQgJiZcclxuICAgICAgICAgICAgICAgIHByZXZTdWJJZCAhPT0gJydcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLm1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5tZXNzYWdlLmRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbjogcHJldlN1YklkLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGxvZy50cmFjZShcclxuICAgICAgICAgICAgICAgICAgICAnX2VtaXRTdWJzY3JpcHRpb25NZXNzYWdlJyxcclxuICAgICAgICAgICAgICAgICAgICAnbWVzc2FnZSBvdmVycmlkZGVuJyxcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbWl0KFByb3ZpZGVyRXZlbnRzLm1lc3NhZ2UsIG1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAvLyBFbWl0IGV2ZW50cyBmb3IgbGVnYWN5IEFQSVxyXG4gICAgICAgIGNvbnN0IHdlYjNMZWdhY3lSZXNwb25zZSA9IHtcclxuICAgICAgICAgICAganNvbnJwYzogJzIuMCcsXHJcbiAgICAgICAgICAgIG1ldGhvZDogJ2V0aF9zdWJzY3JpcHRpb24nLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdDogbWVzc2FnZS5kYXRhLnJlc3VsdCxcclxuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbjogbWVzc2FnZS5kYXRhLnN1YnNjcmlwdGlvbixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9IGFzIFdlYjNMZWdhY3lTdWJzY3JpcHRpb247XHJcbiAgICAgICAgdGhpcy5lbWl0KFByb3ZpZGVyRXZlbnRzLmRhdGEsIHdlYjNMZWdhY3lSZXNwb25zZSk7XHJcbiAgICAgICAgdGhpcy5lbWl0KFxyXG4gICAgICAgICAgICBQcm92aWRlckV2ZW50cy5ub3RpZmljYXRpb24sXHJcbiAgICAgICAgICAgIHdlYjNMZWdhY3lSZXNwb25zZS5wYXJhbXMucmVzdWx0XHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBfY2hlY2tGb3JFdGhTdWJzY3JpcHRpb25zPFRNZXNzYWdlVHlwZSBleHRlbmRzIEVYVEVSTkFMPihcclxuICAgICAgICBtZXNzYWdlOiBUTWVzc2FnZVR5cGUsXHJcbiAgICAgICAgcmVxdWVzdDogUmVxdWVzdFR5cGVzW1RNZXNzYWdlVHlwZV0gfCB1bmRlZmluZWQsXHJcbiAgICAgICAgaWQ6IHN0cmluZ1xyXG4gICAgKTogUmVxdWVzdFR5cGVzW0VYVEVSTkFMLlJFUVVFU1RdIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBpZiAobWVzc2FnZSA9PT0gRVhURVJOQUwuUkVRVUVTVCAmJiByZXF1ZXN0ICYmICdtZXRob2QnIGluIHJlcXVlc3QpIHtcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3QubWV0aG9kID09PSBKU09OUlBDTWV0aG9kLmV0aF9zdWJzY3JpYmUpIHtcclxuICAgICAgICAgICAgICAgIC8vIFN0b3JlIHJlcXVlc3QgcGFyYW1zIGZvciBTVyByZWluaXRcclxuICAgICAgICAgICAgICAgIHRoaXMuX2V0aFN1YnNjcmlwdGlvbnNbaWRdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogcmVxdWVzdC5wYXJhbXMsXHJcbiAgICAgICAgICAgICAgICAgICAgc3ViSWQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZTdWJJZDogJycsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcXVlc3QubWV0aG9kID09PSBKU09OUlBDTWV0aG9kLmV0aF91bnN1YnNjcmliZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyBhbiB1bnN1YnNjcmlwdGlvbiwgcmVtb3ZlIGZyb20gdGhlIGxpc3Qgc28gd2Ugd29uJ3RcclxuICAgICAgICAgICAgICAgIC8vIHN1YnNjcmliZSBhZ2FpbiBvbiBTVyB0ZXJtaW5hdGlvblxyXG4gICAgICAgICAgICAgICAgY29uc3QgW3N1YnNjcmlwdGlvbklkXSA9IHJlcXVlc3QucGFyYW1zIGFzIHN0cmluZ1tdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN1YklkVG9VbnN1YnNjcmliZSA9IHN1YnNjcmlwdGlvbklkO1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCByZXFJZCBpbiB0aGlzLl9ldGhTdWJzY3JpcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBzdWJJZCwgcHJldlN1YklkIH0gPSB0aGlzLl9ldGhTdWJzY3JpcHRpb25zW3JlcUlkXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YklkID09PSBzdWJJZFRvVW5zdWJzY3JpYmUgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN1YklkID09PSBzdWJJZFRvVW5zdWJzY3JpYmVcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViSWRUb1Vuc3Vic2NyaWJlID0gc3ViSWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fZXRoU3Vic2NyaXB0aW9uc1tyZXFJZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsb2cudHJhY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgJ2V0aF91bnN1YnNjcmliZScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3N1YklkVG9VbnN1YnNjcmliZScsXHJcbiAgICAgICAgICAgICAgICAgICAgc3ViSWRUb1Vuc3Vic2NyaWJlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V0aFN1YnNjcmlwdGlvbnNcclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IHJlcXVlc3QubWV0aG9kLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogW3N1YklkVG9VbnN1YnNjcmliZV0sXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB0aGUgbmV3IHN1YnNjcmlwdGlvbiBpZCB0byB0aGUgZXRoU3Vic2NyaXB0aW9ucyBkaWN0aW9uYXJ5LlxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRFdGhTdWJzY3JpcHRpb25zU3ViSWQgPSA8VE1lc3NhZ2VUeXBlIGV4dGVuZHMgTWVzc2FnZVR5cGVzPihcclxuICAgICAgICBkYXRhOiBUcmFuc3BvcnRSZXNwb25zZU1lc3NhZ2U8VE1lc3NhZ2VUeXBlPlxyXG4gICAgKTogdm9pZCA9PiB7XHJcbiAgICAgICAgaWYgKCdpZCcgaW4gZGF0YSAmJiBkYXRhLmlkIGluIHRoaXMuX2V0aFN1YnNjcmlwdGlvbnMpIHtcclxuICAgICAgICAgICAgbG9nLnRyYWNlKFxyXG4gICAgICAgICAgICAgICAgJ3NldEV0aFN1YnNjcmlwdGlvbnNTdWJJZCcsXHJcbiAgICAgICAgICAgICAgICAnZm91bmQnLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZXRoU3Vic2NyaXB0aW9uc1tkYXRhLmlkXSxcclxuICAgICAgICAgICAgICAgIGRhdGEucmVzcG9uc2VcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5fZXRoU3Vic2NyaXB0aW9uc1tkYXRhLmlkXS5zdWJJZCA9IGRhdGEucmVzcG9uc2UgYXMgc3RyaW5nO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcmludHMgYSBjb25zb2xlLndhcm4gbWVzc2FnZSB0byB3YXJuIHRoZSB1c2VyIGFib3V0IHVzYWdlIG9mIGEgZGVwcmVjYXRlZCBBUElcclxuICAgICAqIEBwYXJhbSBldmVudE5hbWUgVGhlIGV2ZW50TmFtZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVwcmVjYXRpb25XYXJuaW5nKG1ldGhvZE5hbWU6IHN0cmluZywgZm9yY2UgPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGRlcHJlY2F0ZWRNZXRob2RzID0gW1xyXG4gICAgICAgICAgICAnY2xvc2UnLFxyXG4gICAgICAgICAgICAnZGF0YScsXHJcbiAgICAgICAgICAgICduZXR3b3JrQ2hhbmdlZCcsXHJcbiAgICAgICAgICAgICdjaGFpbklkQ2hhbmdlZCcsXHJcbiAgICAgICAgICAgICdub3RpZmljYXRpb24nLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgaWYgKGRlcHJlY2F0ZWRNZXRob2RzLmluY2x1ZGVzKG1ldGhvZE5hbWUpIHx8IGZvcmNlKSB7XHJcbiAgICAgICAgICAgIGxvZy53YXJuKFxyXG4gICAgICAgICAgICAgICAgYEJsb2NrV2FsbGV0OiAnJHttZXRob2ROYW1lfScgaXMgZGVwcmVjYXRlZCBhbmQgbWF5IGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZS4gU2VlOiBodHRwczovL2VpcHMuZXRoZXJldW0ub3JnL0VJUFMvZWlwLTExOTNgXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLyBFdmVudEVtaXR0ZXIgb3ZlcnJpZGVzXHJcblxyXG4gICAgcHVibGljIGFkZExpc3RlbmVyKFxyXG4gICAgICAgIGV2ZW50TmFtZTogc3RyaW5nLFxyXG4gICAgICAgIGxpc3RlbmVyOiAoLi4uYXJnczogYW55W10pID0+IHZvaWRcclxuICAgICk6IHRoaXMge1xyXG4gICAgICAgIHRoaXMuZGVwcmVjYXRpb25XYXJuaW5nKGV2ZW50TmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgbGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbihldmVudE5hbWU6IHN0cmluZywgbGlzdGVuZXI6ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCk6IHRoaXMge1xyXG4gICAgICAgIHRoaXMuZGVwcmVjYXRpb25XYXJuaW5nKGV2ZW50TmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLm9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbmNlKGV2ZW50TmFtZTogc3RyaW5nLCBsaXN0ZW5lcjogKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkKTogdGhpcyB7XHJcbiAgICAgICAgdGhpcy5kZXByZWNhdGlvbldhcm5pbmcoZXZlbnROYW1lKTtcclxuICAgICAgICByZXR1cm4gc3VwZXIub25jZShldmVudE5hbWUsIGxpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJlcGVuZExpc3RlbmVyKFxyXG4gICAgICAgIGV2ZW50TmFtZTogc3RyaW5nLFxyXG4gICAgICAgIGxpc3RlbmVyOiAoLi4uYXJnczogYW55W10pID0+IHZvaWRcclxuICAgICk6IHRoaXMge1xyXG4gICAgICAgIHRoaXMuZGVwcmVjYXRpb25XYXJuaW5nKGV2ZW50TmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLnByZXBlbmRMaXN0ZW5lcihldmVudE5hbWUsIGxpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJlcGVuZE9uY2VMaXN0ZW5lcihcclxuICAgICAgICBldmVudE5hbWU6IHN0cmluZyxcclxuICAgICAgICBsaXN0ZW5lcjogKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkXHJcbiAgICApOiB0aGlzIHtcclxuICAgICAgICB0aGlzLmRlcHJlY2F0aW9uV2FybmluZyhldmVudE5hbWUpO1xyXG4gICAgICAgIHJldHVybiBzdXBlci5wcmVwZW5kT25jZUxpc3RlbmVyKGV2ZW50TmFtZSwgbGlzdGVuZXIpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBCbGFua1Byb3ZpZGVyIGZyb20gJy4vcHJvdmlkZXIvQmxhbmtQcm92aWRlcic7XHJcbmltcG9ydCB7IEpTT05SUENNZXRob2QgfSBmcm9tICdAYmxvY2std2FsbGV0L2JhY2tncm91bmQvdXRpbHMvdHlwZXMvZXRoZXJldW0nO1xyXG5pbXBvcnQgeyBPcmlnaW4gfSBmcm9tICdAYmxvY2std2FsbGV0L2JhY2tncm91bmQvdXRpbHMvdHlwZXMvY29tbXVuaWNhdGlvbic7XHJcblxyXG4vLyBHbG9iYWxcclxudHlwZSBUaGlzID0gdHlwZW9mIGdsb2JhbFRoaXM7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEluamVjdGVkV2luZG93IGV4dGVuZHMgVGhpcyB7XHJcbiAgICBldGhlcmV1bTogQmxhbmtQcm92aWRlcjtcclxuICAgIHdlYjM6IHsgY3VycmVudFByb3ZpZGVyOiBCbGFua1Byb3ZpZGVyIH07XHJcbn1cclxuXHJcbi8vIFByb3ZpZGVyIGludGVyZmFjZVxyXG5leHBvcnQgaW50ZXJmYWNlIEV0aGVyZXVtUHJvdmlkZXIge1xyXG4gICAgcmVhZG9ubHkgaXNCbG9ja1dhbGxldDogYm9vbGVhbjtcclxuXHJcbiAgICAvLyBNZXRhbWFzayBjb21wYXRpYmlsaXR5XHJcbiAgICByZWFkb25seSBpc01ldGFNYXNrOiBib29sZWFuO1xyXG4gICAgYXV0b1JlZnJlc2hPbk5ldHdvcmtDaGFuZ2U6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBldGhlcmV1bS5jaGFpbklkXHJcbiAgICAgKlxyXG4gICAgICogQGRlcHJlY2F0ZWQgVG8gcmV0cmlldmUgdGhlIGN1cnJlbnQgY2hhaW5JZCB1c2UgdXNlIGV0aGVyZXVtLnJlcXVlc3QoeyBtZXRob2Q6ICdldGhfY2hhaW5JZCcgfSlcclxuICAgICAqIG9yIHN1YnNjcmliZSB0byBjaGFpbkNoYW5nZWQgZXZlbnQuXHJcbiAgICAgKi9cclxuICAgIGNoYWluSWQ6IHN0cmluZyB8IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBldGhlcmV1bS5uZXR3b3JrVmVyc2lvblxyXG4gICAgICpcclxuICAgICAqIEBkZXByZWNhdGVkIFRvIHJldHJpZXZlIHRoZSBuZXR3b3JrIGlkIHVzZSBldGhlcmV1bS5yZXF1ZXN0KHsgbWV0aG9kOiAnbmV0X3ZlcnNpb24nIH0pLlxyXG4gICAgICovXHJcbiAgICBuZXR3b3JrVmVyc2lvbjogc3RyaW5nIHwgbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGV0aGVyZXVtLnNlbGVjdGVkQWRkcmVzc1xyXG4gICAgICpcclxuICAgICAqIEBkZXByZWNhdGVkIFRvIHJldHJpZXZlIHRoZSBzZWxlY3RlZCBhZGRyZXNzIHVzZSBldGhlcmV1bS5yZXF1ZXN0KHsgbWV0aG9kOiAnZXRoX2FjY291bnRzJyB9KS5cclxuICAgICAqL1xyXG4gICAgc2VsZWN0ZWRBZGRyZXNzOiBzdHJpbmcgfCBudWxsO1xyXG5cclxuICAgIC8vIE1ldGhvZHNcclxuICAgIGlzQ29ubmVjdGVkKCk6IGJvb2xlYW47XHJcbiAgICByZXF1ZXN0KGFyZ3M6IFJlcXVlc3RBcmd1bWVudHMpOiBQcm9taXNlPHVua25vd24+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogZXRoZXJldW0uc2VuZCgpXHJcbiAgICAgKlxyXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIGV0aGVyZXVtLnJlcXVlc3QoKSBpbnN0ZWFkLlxyXG4gICAgICovXHJcbiAgICBzZW5kKHJlcXVlc3Q6IEpTT05SUENSZXF1ZXN0KTogSlNPTlJQQ1Jlc3BvbnNlO1xyXG4gICAgc2VuZChyZXF1ZXN0OiBKU09OUlBDUmVxdWVzdFtdKTogSlNPTlJQQ1Jlc3BvbnNlW107XHJcbiAgICBzZW5kKHJlcXVlc3Q6IEpTT05SUENSZXF1ZXN0LCBjYWxsYmFjazogQ2FsbGJhY2s8SlNPTlJQQ1Jlc3BvbnNlPik6IHZvaWQ7XHJcbiAgICBzZW5kKFxyXG4gICAgICAgIHJlcXVlc3Q6IEpTT05SUENSZXF1ZXN0W10sXHJcbiAgICAgICAgY2FsbGJhY2s6IENhbGxiYWNrPEpTT05SUENSZXNwb25zZVtdPlxyXG4gICAgKTogdm9pZDtcclxuICAgIHNlbmQ8VCA9IGFueT4obWV0aG9kOiBzdHJpbmcsIHBhcmFtcz86IGFueVtdIHwgYW55KTogUHJvbWlzZTxUPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGV0aGVyZXVtLnNlbmRBc3luYygpXHJcbiAgICAgKlxyXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIGV0aGVyZXVtLnJlcXVlc3QoKSBpbnN0ZWFkLlxyXG4gICAgICovXHJcbiAgICBzZW5kQXN5bmMoXHJcbiAgICAgICAgcmVxdWVzdDogSlNPTlJQQ1JlcXVlc3QsXHJcbiAgICAgICAgY2FsbGJhY2s6IENhbGxiYWNrPEpTT05SUENSZXNwb25zZT5cclxuICAgICk6IHZvaWQ7XHJcbiAgICBzZW5kQXN5bmMoXHJcbiAgICAgICAgcmVxdWVzdDogSlNPTlJQQ1JlcXVlc3RbXSxcclxuICAgICAgICBjYWxsYmFjazogQ2FsbGJhY2s8SlNPTlJQQ1Jlc3BvbnNlW10+XHJcbiAgICApOiB2b2lkO1xyXG4gICAgc2VuZEFzeW5jKFxyXG4gICAgICAgIHJlcXVlc3Q6IEpTT05SUENSZXF1ZXN0IHwgSlNPTlJQQ1JlcXVlc3RbXSxcclxuICAgICAgICBjYWxsYmFjazogQ2FsbGJhY2s8SlNPTlJQQ1Jlc3BvbnNlPiB8IENhbGxiYWNrPEpTT05SUENSZXNwb25zZVtdPlxyXG4gICAgKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGV0aGVyZXVtLmVuYWJsZSgpXHJcbiAgICAgKlxyXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIGV0aGVyZXVtLnJlcXVlc3QoeyBtZXRob2Q6ICdldGhfcmVxdWVzdEFjY291bnRzJyB9KSBpbnN0ZWFkLlxyXG4gICAgICovXHJcbiAgICBlbmFibGUoKTogUHJvbWlzZTxzdHJpbmdbXT47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSlNPTlJQQ1JlcXVlc3Q8VCA9IGFueVtdPiB7XHJcbiAgICBqc29ucnBjOiAnMi4wJztcclxuICAgIGlkOiBudW1iZXI7XHJcbiAgICBtZXRob2Q6IEpTT05SUENNZXRob2Q7XHJcbiAgICBwYXJhbXM6IFQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSlNPTlJQQ1Jlc3BvbnNlPFQgPSBhbnksIFUgPSBhbnk+IHtcclxuICAgIGpzb25ycGM6ICcyLjAnO1xyXG4gICAgaWQ6IG51bWJlcjtcclxuICAgIHJlc3VsdD86IFQ7XHJcbiAgICBlcnJvcj86IHtcclxuICAgICAgICBjb2RlOiBudW1iZXI7XHJcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgICAgIGRhdGE/OiBVO1xyXG4gICAgfSB8IG51bGw7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIENhbGxiYWNrPFQ+ID0gKGVycjogRXJyb3IgfCBudWxsLCByZXN1bHQ6IFQgfCBudWxsKSA9PiB2b2lkO1xyXG5cclxuLy8gUHJvdmlkZXIgdHlwZXNcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUHJvdmlkZXJTZXR1cERhdGEge1xyXG4gICAgYWNjb3VudHM6IHN0cmluZ1tdO1xyXG4gICAgY2hhaW5JZD86IHN0cmluZztcclxuICAgIG5ldHdvcmtWZXJzaW9uPzogc3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuICogQ29tbXVuaWNhdGlvbiBlcnJvcnMgZGVmaW5pdGlvblxyXG4gKlxyXG4gKiBDb21tb24gY29kZXM6XHJcbiAqICAtIDQwMDE6IFRoZSByZXF1ZXN0IHdhcyByZWplY3RlZCBieSB0aGUgdXNlclxyXG4gKiAgLSAtMzI2MDI6IFRoZSBwYXJhbWV0ZXJzIHdlcmUgaW52YWxpZFxyXG4gKiAgLSAtMzI2MDM6IEludGVybmFsIGVycm9yXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFByb3ZpZGVyUnBjRXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBjb2RlOiBudW1iZXI7XHJcbiAgICBkYXRhPzogdW5rbm93bjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0QXJndW1lbnRzIHtcclxuICAgIHJlYWRvbmx5IG1ldGhvZDogSlNPTlJQQ01ldGhvZDtcclxuICAgIHJlYWRvbmx5IHBhcmFtcz86IHJlYWRvbmx5IHVua25vd25bXSB8IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFByb3ZpZGVyTWVzc2FnZSB7XHJcbiAgICByZWFkb25seSB0eXBlOiBzdHJpbmc7XHJcbiAgICByZWFkb25seSBkYXRhOiB1bmtub3duO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEV0aFN1YnNjcmlwdGlvbiBleHRlbmRzIFByb3ZpZGVyTWVzc2FnZSB7XHJcbiAgICByZWFkb25seSB0eXBlOiAnZXRoX3N1YnNjcmlwdGlvbic7XHJcbiAgICByZWFkb25seSBkYXRhOiB7XHJcbiAgICAgICAgcmVhZG9ubHkgc3Vic2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICAgICAgcmVhZG9ubHkgcmVzdWx0OiB1bmtub3duO1xyXG4gICAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIExlZ2FjeSB3ZWIzIGV0aF9zdWJzY3JpcHRpb24gdHlwZVxyXG4gKiBAZGVwcmVjYXRlZCBPbmx5IHN1cHBvcnRlZCBmb3Igbm9uLXVwZGF0ZWQgREFwcHNcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgV2ViM0xlZ2FjeVN1YnNjcmlwdGlvbiB7XHJcbiAgICByZWFkb25seSBqc29ucnBjOiAnMi4wJztcclxuICAgIHJlYWRvbmx5IG1ldGhvZDogJ2V0aF9zdWJzY3JpcHRpb24nO1xyXG4gICAgcmVhZG9ubHkgcGFyYW1zOiB7XHJcbiAgICAgICAgcmVhZG9ubHkgcmVzdWx0OiB1bmtub3duO1xyXG4gICAgICAgIHJlYWRvbmx5IHN1YnNjcmlwdGlvbjogc3RyaW5nO1xyXG4gICAgfTtcclxufVxyXG5cclxuLy8gUHJvdmlkZXIgZXZlbnRzXHJcblxyXG5leHBvcnQgZW51bSBQcm92aWRlckV2ZW50cyB7XHJcbiAgICBhY2NvdW50c0NoYW5nZWQgPSAnYWNjb3VudHNDaGFuZ2VkJyxcclxuICAgIGNoYWluQ2hhbmdlZCA9ICdjaGFpbkNoYW5nZWQnLFxyXG4gICAgY29ubmVjdCA9ICdjb25uZWN0JyxcclxuICAgIGRpc2Nvbm5lY3QgPSAnZGlzY29ubmVjdCcsXHJcbiAgICBtZXNzYWdlID0gJ21lc3NhZ2UnLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY2xvc2VcclxuICAgICAqXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkIFdlYjMgc3Vic2NyaXB0aW9uIGV2ZW50XHJcbiAgICAgKi9cclxuICAgIGNsb3NlID0gJ2Nsb3NlJyxcclxuXHJcbiAgICAvKipcclxuICAgICAqIG5vdGlmaWNhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBkZXByZWNhdGVkIERlcHJlY2F0ZWQgV2ViMyBzdWJzY3JpcHRpb24gZXZlbnRcclxuICAgICAqL1xyXG4gICAgbm90aWZpY2F0aW9uID0gJ25vdGlmaWNhdGlvbicsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZCBXZWIzIHN1YnNjcmlwdGlvbiBldmVudFxyXG4gICAgICovXHJcbiAgICBkYXRhID0gJ2RhdGEnLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbmV0d29ya0NoYW5nZWRcclxuICAgICAqXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkIG5ldHdvcmsgY2hhbmdlIGV2ZW50XHJcbiAgICAgKi9cclxuICAgIG5ldHdvcmtDaGFuZ2VkID0gJ25ldHdvcmtDaGFuZ2VkJyxcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNoYWluSWRDaGFuZ2VkXHJcbiAgICAgKlxyXG4gICAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZCBuZXR3b3JrIGNoYW5nZSBldmVudFxyXG4gICAgICovXHJcbiAgICBjaGFpbklkQ2hhbmdlZCA9ICdjaGFpbklkQ2hhbmdlZCcsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUHJvdmlkZXJDb25uZWN0SW5mbyB7XHJcbiAgICByZWFkb25seSBjaGFpbklkOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2hhaW5DaGFuZ2VkSW5mbyB7XHJcbiAgICBjaGFpbklkOiBzdHJpbmc7XHJcbiAgICBuZXR3b3JrVmVyc2lvbjogc3RyaW5nO1xyXG59XHJcblxyXG4vLyBTaXRlIE1ldGFkYXRhXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2l0ZU1ldGFkYXRhIHtcclxuICAgIGljb25VUkw6IHN0cmluZyB8IG51bGw7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFNpZ25hbHMge1xyXG4gICAgU1dfUkVJTklUID0gJ1NXX1JFSU5JVCcsXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFNpZ25hbE1lc3NhZ2UgPSB7XHJcbiAgICBvcmlnaW46IE9yaWdpbjtcclxuICAgIHNpZ25hbDogU2lnbmFscztcclxufTtcclxuIiwiaW1wb3J0IHsgaXNDb21wYXRpYmxlIH0gZnJvbSAnLi9zaXRlJztcclxuaW1wb3J0IENBQ0hFRF9JTkNPTVBBVElCTEVfU0lURVMgZnJvbSAnQGJsb2NrLXdhbGxldC9yZW1vdGUtY29uZmlncy9wcm92aWRlci9pbmNvbXBhdGlibGVfc2l0ZXMuanNvbic7XHJcblxyXG5pbnRlcmZhY2UgQ29tcGF0aWJpbGl0eUNhY2hlIHtcclxuICAgIGlzQmxvY2tXYWxsZXQ6IGJvb2xlYW47XHJcbn1cclxuXHJcbmNvbnN0IEJMT0NLV0FMTEVUX0NPTVBBVElCTElUWV9LRVkgPSAnX19CbG9ja1dhbGxldF9jb21wYXRpYmlsaXR5X18nO1xyXG5cclxuZnVuY3Rpb24gZ2V0Q29tcGF0aWJpbGl0eSgpOiBDb21wYXRpYmlsaXR5Q2FjaGUgfCBudWxsIHtcclxuICAgIGNvbnN0IGNhY2hlID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKEJMT0NLV0FMTEVUX0NPTVBBVElCTElUWV9LRVkpO1xyXG4gICAgaWYgKGNhY2hlKSB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoY2FjaGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldENvbXBhdGliaWxpdHkoaXNCbG9ja1dhbGxldDogYm9vbGVhbikge1xyXG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcclxuICAgICAgICBCTE9DS1dBTExFVF9DT01QQVRJQkxJVFlfS0VZLFxyXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHsgaXNCbG9ja1dhbGxldCB9KVxyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEJsb2NrV2FsbGV0Q29tcGF0aWJpbGl0eSgpOiBDb21wYXRpYmlsaXR5Q2FjaGUge1xyXG4gICAgY29uc3QgY29tcGF0aWJpbGl0eSA9IGdldENvbXBhdGliaWxpdHkoKTtcclxuICAgIGlmIChjb21wYXRpYmlsaXR5KSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBhdGliaWxpdHk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXBkYXRlQmxvY2tXYWxsZXRDb21wYXRpYmlsaXR5KENBQ0hFRF9JTkNPTVBBVElCTEVfU0lURVMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQmxvY2tXYWxsZXRDb21wYXRpYmlsaXR5KFxyXG4gICAgaW5jb21wYXRpYmxlU2l0ZXM6IHN0cmluZ1tdID0gQ0FDSEVEX0lOQ09NUEFUSUJMRV9TSVRFU1xyXG4pOiBDb21wYXRpYmlsaXR5Q2FjaGUge1xyXG4gICAgY29uc3QgaXNCbG9ja1dhbGxldCA9IGlzQ29tcGF0aWJsZShpbmNvbXBhdGlibGVTaXRlcyk7XHJcbiAgICBzZXRDb21wYXRpYmlsaXR5KGlzQmxvY2tXYWxsZXQpO1xyXG4gICAgcmV0dXJuIHsgaXNCbG9ja1dhbGxldCB9O1xyXG59XHJcbiIsImltcG9ydCB7IFByb3ZpZGVyRXJyb3IgfSBmcm9tICdAYmxvY2std2FsbGV0L2JhY2tncm91bmQvdXRpbHMvdHlwZXMvZXRoZXJldW0nO1xyXG5pbXBvcnQgeyBldGhFcnJvcnMgfSBmcm9tICdldGgtcnBjLWVycm9ycyc7XHJcblxyXG4vKipcclxuICogUGFyc2UgZXJyb3IgbWVzc2FnZXNcclxuICpcclxuICovXHJcbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUVycm9yID0gKGVycm9yOiBzdHJpbmcpOiBFcnJvciA9PiB7XHJcbiAgICBzd2l0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY2FzZSBQcm92aWRlckVycm9yLklOVkFMSURfUEFSQU1TOlxyXG4gICAgICAgICAgICByZXR1cm4gZXRoRXJyb3JzLnJwYy5pbnZhbGlkUGFyYW1zKCk7XHJcbiAgICAgICAgY2FzZSBQcm92aWRlckVycm9yLlJFU09VUkNFX1VOQVZBSUxBQkxFOlxyXG4gICAgICAgICAgICByZXR1cm4gZXRoRXJyb3JzLnJwYy5yZXNvdXJjZVVuYXZhaWxhYmxlKCk7XHJcbiAgICAgICAgY2FzZSBQcm92aWRlckVycm9yLlRSQU5TQUNUSU9OX1JFSkVDVEVEOlxyXG4gICAgICAgICAgICByZXR1cm4gZXRoRXJyb3JzLnByb3ZpZGVyLnVzZXJSZWplY3RlZFJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ1VzZXIgcmVqZWN0ZWQgdHJhbnNhY3Rpb24nLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBjYXNlIFByb3ZpZGVyRXJyb3IuVU5BVVRIT1JJWkVEOlxyXG4gICAgICAgICAgICByZXR1cm4gZXRoRXJyb3JzLnByb3ZpZGVyLnVuYXV0aG9yaXplZCgpO1xyXG4gICAgICAgIGNhc2UgUHJvdmlkZXJFcnJvci5VTlNVUFBPUlRFRF9NRVRIT0Q6XHJcbiAgICAgICAgICAgIHJldHVybiBldGhFcnJvcnMucHJvdmlkZXIudW5zdXBwb3J0ZWRNZXRob2QoKTtcclxuICAgICAgICBjYXNlIFByb3ZpZGVyRXJyb3IuVVNFUl9SRUpFQ1RFRF9SRVFVRVNUOlxyXG4gICAgICAgICAgICByZXR1cm4gZXRoRXJyb3JzLnByb3ZpZGVyLnVzZXJSZWplY3RlZFJlcXVlc3QoKTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gZXRoRXJyb3JzLnJwYy5pbnRlcm5hbChlcnJvcik7XHJcbiAgICB9XHJcbn07XHJcbiIsImltcG9ydCBCbGFua1Byb3ZpZGVyIGZyb20gJy4uL3Byb3ZpZGVyL0JsYW5rUHJvdmlkZXInO1xyXG5pbXBvcnQgeyBJbmplY3RlZFdpbmRvdyB9IGZyb20gJy4uL3R5cGVzJztcclxuaW1wb3J0IGxvZyBmcm9tICdsb2dsZXZlbCc7XHJcblxyXG4vKipcclxuICogSWYgbm8gZXhpc3Rpbmcgd2luZG93LndlYjMgaXMgZm91bmQsIHRoaXMgZnVuY3Rpb24gaW5qZWN0cyBhIHdlYjMgXCJzaGltXCIgdG9cclxuICogbm90IGJyZWFrIGRhcHBzIHRoYXQgcmVseSBvbiB3aW5kb3cud2ViMy5jdXJyZW50UHJvdmlkZXIuXHJcbiAqXHJcbiAqIEBwYXJhbSBwcm92aWRlciAtIFRoZSBwcm92aWRlciB0byBzZXQgYXMgd2luZG93LndlYjMuY3VycmVudFByb3ZpZGVyLlxyXG4gKi9cclxuY29uc3Qgc2hpbVdlYjMgPSAocHJvdmlkZXI6IEJsYW5rUHJvdmlkZXIpOiB2b2lkID0+IHtcclxuICAgIGxldCBsb2dnZWRDdXJyZW50UHJvdmlkZXIgPSBmYWxzZTtcclxuICAgIGxldCBsb2dnZWRNaXNzaW5nUHJvcGVydHkgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoISh3aW5kb3cgYXMgV2luZG93ICYgSW5qZWN0ZWRXaW5kb3cpLndlYjMpIHtcclxuICAgICAgICBjb25zdCBTSElNX0lERU5USUZJRVIgPSAnaXNCbG9ja1dhbGxldFNoaW1fXyc7XHJcblxyXG4gICAgICAgIGxldCB3ZWIzU2hpbSA9IHsgY3VycmVudFByb3ZpZGVyOiBwcm92aWRlciB9O1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2ViM1NoaW0sIFNISU1fSURFTlRJRklFUiwge1xyXG4gICAgICAgICAgICB2YWx1ZTogdHJ1ZSxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB3ZWIzU2hpbSA9IG5ldyBQcm94eSh3ZWIzU2hpbSwge1xyXG4gICAgICAgICAgICBnZXQ6ICh0YXJnZXQsIHByb3BlcnR5LCAuLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvcGVydHkgPT09ICdjdXJyZW50UHJvdmlkZXInICYmICFsb2dnZWRDdXJyZW50UHJvdmlkZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2dnZWRDdXJyZW50UHJvdmlkZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZy53YXJuKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnWW91IGFyZSBhY2Nlc3NpbmcgdGhlIEJsb2NrV2FsbGV0IHdpbmRvdy53ZWIzLmN1cnJlbnRQcm92aWRlciBzaGltLiBUaGlzIHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQ7IHVzZSB3aW5kb3cuZXRoZXJldW0gaW5zdGVhZC4nXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHkgIT09ICdjdXJyZW50UHJvdmlkZXInICYmXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHkgIT09IFNISU1fSURFTlRJRklFUiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICFsb2dnZWRNaXNzaW5nUHJvcGVydHlcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlZE1pc3NpbmdQcm9wZXJ0eSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9nLmVycm9yKCdXZWIzIGlzIG5vdCBpbmplY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcGVydHksIC4uLmFyZ3MpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6ICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2cud2FybihcclxuICAgICAgICAgICAgICAgICAgICAnWW91IGFyZSBhY2Nlc3NpbmcgdGhlIEJsb2NrV2FsbGV0IHdpbmRvdy53ZWIzIHNoaW0uIFRoaXMgb2JqZWN0IGlzIGRlcHJlY2F0ZWQ7IHVzZSB3aW5kb3cuZXRoZXJldW0gaW5zdGVhZC4nXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3Quc2V0KC4uLmFyZ3MpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LCAnd2ViMycsIHtcclxuICAgICAgICAgICAgdmFsdWU6IHdlYjNTaGltLFxyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNoaW1XZWIzO1xyXG4iLCIvKipcclxuICogQ2hlY2sgaWYgdGhlIHNpdGUgaXMgb24gdGhlIGxpc3Qgb2YgaW5jb21wYXRpYmxlU2l0ZXNcclxuICovXHJcbmV4cG9ydCBjb25zdCBpc0NvbXBhdGlibGUgPSAoaW5jb21wYXRpYmxlU2l0ZXM6IHN0cmluZ1tdKTogYm9vbGVhbiA9PiB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluY29tcGF0aWJsZVNpdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgPT09IGluY29tcGF0aWJsZVNpdGVzW2ldIHx8XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZS5lbmRzV2l0aCgnLicgKyBpbmNvbXBhdGlibGVTaXRlc1tpXSlcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGZvciB1bmFsbG93ZWQgZmlsZSBleHRlbnNpb25cclxuICovXHJcbmNvbnN0IGNoZWNrRXh0ZW5zaW9uID0gKCk6IGJvb2xlYW4gPT4ge1xyXG4gICAgY29uc3QgZmlsZUV4dGVuc2lvbnMgPSBbL1xcLnhtbCQvdSwgL1xcLnBkZiQvdV07XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlRXh0ZW5zaW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChmaWxlRXh0ZW5zaW9uc1tpXS50ZXN0KHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgdGhlIGRvY3VtZW50RWxlbWVudCBvZiB0aGUgY3VycmVudCBkb2N1bWVudFxyXG4gKi9cclxuY29uc3QgZG9jdW1lbnRFbGVtZW50Q2hlY2sgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgICBjb25zdCBkb2N1bWVudEVsZW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm5vZGVOYW1lO1xyXG5cclxuICAgIGlmIChkb2N1bWVudEVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnRFbGVtZW50LnRvTG93ZXJDYXNlKCkgPT09ICdodG1sJztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgdGhlIGRvY3R5cGUgb2YgdGhlIGN1cnJlbnQgZG9jdW1lbnQgaWYgaXQgZXhpc3RzXHJcbiAqL1xyXG5jb25zdCBjaGVja0RvY1R5cGUgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgICBjb25zdCB7IGRvY3R5cGUgfSA9IHdpbmRvdy5kb2N1bWVudDtcclxuXHJcbiAgICBpZiAoZG9jdHlwZSkge1xyXG4gICAgICAgIHJldHVybiBkb2N0eXBlLm5hbWUgPT09ICdodG1sJztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBIZWxwZXIgZnVuY3Rpb24gd2l0aCBjaGVja3MgdG8gZG8gYmVmb3JlIGxvYWRpbmcgdGhlIHNjcmlwdFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNoZWNrU2NyaXB0TG9hZCA9ICgpOiBib29sZWFuID0+IHtcclxuICAgIHJldHVybiBjaGVja0RvY1R5cGUoKSAmJiBjaGVja0V4dGVuc2lvbigpICYmIGRvY3VtZW50RWxlbWVudENoZWNrKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyBzaXRlIGZhdmljb24gZGF0YVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGdldEljb25EYXRhID0gYXN5bmMgKCk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4gPT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnIHx8XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdpbnRlcmFjdGl2ZSdcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShnZXRJY29uRnJvbURvbSgpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBkb21Db250ZW50TG9hZGVkSGFuZGxlciA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoZ2V0SWNvbkZyb21Eb20oKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgJ0RPTUNvbnRlbnRMb2FkZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRvbUNvbnRlbnRMb2FkZWRIYW5kbGVyXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgICAgICAnRE9NQ29udGVudExvYWRlZCcsXHJcbiAgICAgICAgICAgICAgICBkb21Db250ZW50TG9hZGVkSGFuZGxlclxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEV4dHJhY3RzIGFuIGljb24gZm9yIHRoZSBzaXRlIGZyb20gdGhlIERPTVxyXG4gKlxyXG4gKiBAcmV0dXJucyBJY29uIHVybCBvciBudWxsIGlmIHRoZXJlIGlzbid0IGEgdmFsaWQgb25lXHJcbiAqL1xyXG5jb25zdCBnZXRJY29uRnJvbURvbSA9IGFzeW5jICgpOiBQcm9taXNlPHN0cmluZyB8IG51bGw+ID0+IHtcclxuICAgIGNvbnN0IHsgZG9jdW1lbnQgfSA9IHdpbmRvdztcclxuXHJcbiAgICBjb25zdCBpY29uczogTm9kZUxpc3RPZjxIVE1MTGlua0VsZW1lbnQ+ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcclxuICAgICAgICAnaGVhZCA+IGxpbmtbcmVsfj1cImljb25cIl0nXHJcbiAgICApO1xyXG5cclxuICAgIGZvciAoY29uc3QgaWNvbiBvZiBpY29ucykge1xyXG4gICAgICAgIGlmIChpY29uICYmIChhd2FpdCBpc1ZhbGlkSW1hZ2UoaWNvbi5ocmVmKSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGljb24uaHJlZjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBpbWFnZSBsb2FkcyBjb3JyZWN0bHlcclxuICpcclxuICogQHBhcmFtIHVybCBJbWFnZSBzb3VyY2VcclxuICovXHJcbmNvbnN0IGlzVmFsaWRJbWFnZSA9IGFzeW5jICh1cmw6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xyXG4gICAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcblxyXG4gICAgY29uc3QgaXNWYWxpZCA9IGF3YWl0IG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGltZy5vbmVycm9yID0gKCkgPT4gcmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIGltZy5zcmMgPSB1cmw7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaW1nLnJlbW92ZSgpO1xyXG5cclxuICAgIHJldHVybiBpc1ZhbGlkO1xyXG59O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=