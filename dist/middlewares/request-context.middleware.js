"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestContextMiddleware = void 0;
const cls_hooked_1 = require("cls-hooked");
const common_1 = require("@nestjs/common");
const _http_1 = require("../http");
let RequestContextMiddleware = class RequestContextMiddleware {
    use(req, res, next) {
        const requestContext = new _http_1.RequestContext(req, res);
        const session = (0, cls_hooked_1.getNamespace)(_http_1.RequestContext.ctxId) || (0, cls_hooked_1.createNamespace)(_http_1.RequestContext.ctxId);
        session.run(() => {
            session.set('ctx', requestContext);
            next();
        });
    }
};
exports.RequestContextMiddleware = RequestContextMiddleware;
exports.RequestContextMiddleware = RequestContextMiddleware = __decorate([
    (0, common_1.Injectable)()
], RequestContextMiddleware);
//# sourceMappingURL=request-context.middleware.js.map