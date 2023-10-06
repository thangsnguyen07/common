"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestContext = void 0;
const cls_hooked_1 = require("cls-hooked");
const uuid_1 = require("uuid");
const _models_1 = require("../models");
class RequestContext {
    constructor(request, response) {
        this.request = request;
        this.response = response;
    }
    static currentRequestContext() {
        const session = (0, cls_hooked_1.getNamespace)(RequestContext.ctxId);
        return session?.active ? session.get('ctx') : null;
    }
    static currentRequest() {
        const requestContext = RequestContext.currentRequestContext();
        return requestContext ? requestContext.request : null;
    }
    static currentUser() {
        const requestContext = RequestContext.currentRequestContext();
        if (requestContext) {
            const user = requestContext.request['user'];
            if (user) {
                return new _models_1.CurrentUser(user);
            }
        }
        return null;
    }
}
exports.RequestContext = RequestContext;
RequestContext.ctxId = (0, uuid_1.v4)();
//# sourceMappingURL=request-context.js.map