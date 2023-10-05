import { getNamespace } from 'cls-hooked'
import { v4 } from 'uuid'

import { Request, Response } from 'express'

import { CurrentUser } from '@models'

import { ICurrentUser } from '@interfaces'

export class RequestContext {
  public static readonly ctxId = v4()
  private readonly request: Request
  private readonly response: Response

  constructor(request: Request, response: Response) {
    this.request = request
    this.response = response
  }

  static currentRequestContext(): RequestContext | null {
    const session = getNamespace(RequestContext.ctxId)
    return session?.active ? session.get('ctx') : null
  }

  static currentRequest(): Request | null {
    const requestContext = RequestContext.currentRequestContext()
    return requestContext ? requestContext.request : null
  }

  static currentUser(): CurrentUser | null {
    const requestContext = RequestContext.currentRequestContext()

    if (requestContext) {
      const user: ICurrentUser = requestContext.request['user'] as ICurrentUser

      if (user) {
        return new CurrentUser(user)
      }
    }

    return null
  }
}
