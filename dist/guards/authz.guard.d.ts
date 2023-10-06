import { Observable } from 'rxjs';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UtilService } from '@services';
declare const AuthzGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AuthzGuard extends AuthzGuard_base implements CanActivate {
    private reflector;
    private utilService;
    constructor(reflector: Reflector, utilService: UtilService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
export {};
