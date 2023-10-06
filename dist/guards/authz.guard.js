"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthzGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
const _decorators_1 = require("../decorators");
const _http_1 = require("../http");
const _services_1 = require("../services");
let AuthzGuard = class AuthzGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector, utilService) {
        super();
        this.reflector = reflector;
        this.utilService = utilService;
    }
    canActivate(context) {
        const user = _http_1.RequestContext.currentUser();
        if (!user) {
            return false;
        }
        const m2mClientId = this.reflector.get(_decorators_1.M2MClientId, context.getHandler());
        const userClientId = user.clientId;
        const isClientCredentials = user.isClientCredentials;
        if (m2mClientId && m2mClientId.length > 0) {
            if (isClientCredentials) {
                return m2mClientId === userClientId;
            }
        }
        const roles = this.reflector.get(_decorators_1.Roles, context.getHandler());
        if (roles && !this.utilService.arraysEqual(roles, user.roles)) {
            return false;
        }
        const permissions = this.reflector.get(_decorators_1.Permissions, context.getHandler());
        if (permissions && !this.utilService.arraysEqual(permissions, user.permissions)) {
            return false;
        }
        return true;
    }
};
exports.AuthzGuard = AuthzGuard;
exports.AuthzGuard = AuthzGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector, _services_1.UtilService])
], AuthzGuard);
//# sourceMappingURL=authz.guard.js.map