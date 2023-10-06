import { Request, Response } from 'express';
import { CurrentUser } from '@models';
export declare class RequestContext {
    static readonly ctxId: string;
    private readonly request;
    private readonly response;
    constructor(request: Request, response: Response);
    static currentRequestContext(): RequestContext | null;
    static currentRequest(): Request | null;
    static currentUser(): CurrentUser | null;
}
