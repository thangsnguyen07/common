import { createNamespace, getNamespace } from 'cls-hooked'

import { Injectable, NestMiddleware } from '@nestjs/common'

import { NextFunction, Request, Response } from 'express'

import { RequestContext } from '@http'

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestContext = new RequestContext(req, res)

    const session = getNamespace(RequestContext.ctxId) || createNamespace(RequestContext.ctxId)

    session.run(() => {
      session.set('ctx', requestContext)
      next()
    })
  }
}
