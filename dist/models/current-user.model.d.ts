import { ICurrentUser } from '@interfaces';
export declare class CurrentUser {
    private _email?;
    private _roles?;
    private _permissions;
    private _azp;
    private _iss;
    private _gty?;
    private _sub;
    private _scope;
    constructor(user: ICurrentUser);
    hasAnyRole(roles: string[]): boolean;
    isAdmin(): boolean;
    get userId(): null | string;
    get clientId(): string;
    get scope(): string;
    get issuer(): string;
    get email(): string | undefined;
    get roles(): string[] | undefined;
    get permissions(): string[];
    get isClientCredentials(): boolean;
}
