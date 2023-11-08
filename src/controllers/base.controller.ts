import { ClassConstructor, plainToInstance } from 'class-transformer'

import { ErrorResponse, SuccessResponse } from '@models'

import { Metadata } from '@interfaces'

import { ErrorCode } from '@enums'

export class BaseController {
  protected success(data: any, message: string) {
    return new SuccessResponse(data, message)
  }

  protected error(errorCode: ErrorCode, message: string) {
    return new ErrorResponse(errorCode, message)
  }

  protected pagination(data: any, message: string, metadata: Metadata) {
    return new SuccessResponse(data, message, metadata)
  }

  protected plainToInstance<T, V>(cls: ClassConstructor<T>, plain: V): T {
    return plainToInstance(cls, plain, { excludeExtraneousValues: true })
  }

  protected plainToInstances<T, V>(cls: ClassConstructor<T>, plain: V[]): T[] {
    return plainToInstance(cls, plain, { excludeExtraneousValues: true })
  }
}
