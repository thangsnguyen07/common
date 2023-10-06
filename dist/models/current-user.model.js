"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const _constants_1 = require("../constants");
class CurrentUser {
    constructor(user) {
        this._azp = user.azp;
        this._gty = user.gty;
        this._iss = user.iss;
        this._sub = user.sub;
        this._scope = user.scope;
        this._permissions = user.permissions;
        this._email = user['http://schemas.microsoft.com/ws/2008/06/identity/claims/email'];
        this._roles = user['http://schemas.microsoft.com/ws/2008/06/identity/claims/roles'];
    }
    hasAnyRole(roles) {
        return roles.some((role) => this.roles?.includes(role));
    }
    isAdmin() {
        return this.hasAnyRole([_constants_1.SupportedRoles.ADMIN]);
    }
    get userId() {
        return this._sub?.startsWith('auth0') ? this._sub.split('|')[1] : null;
    }
    get clientId() {
        return this._azp;
    }
    get scope() {
        return this._scope;
    }
    get issuer() {
        return this._iss;
    }
    get email() {
        return this._email;
    }
    get roles() {
        return this._roles;
    }
    get permissions() {
        return this._permissions;
    }
    get isClientCredentials() {
        return this._gty && this._gty === 'client-credentials';
    }
}
exports.CurrentUser = CurrentUser;
//# sourceMappingURL=current-user.model.js.map