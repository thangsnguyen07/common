import { Error, Metadata } from '@interfaces'

import { ErrorCode } from '@enums'

export class BaseResponse {
  public timestamps: string
  public success: boolean
  public message: string

  constructor(success: boolean, message: string) {
    this.timestamps = new Date().toISOString()
    this.success = success
    this.message = message
  }
}

export class SuccessResponse extends BaseResponse {
  public errors: null
  public data: any
  public metadata?: Metadata

  constructor(data: any, message: string, metadata?: Metadata) {
    super(true, message)

    this.errors = null
    this.data = data
    this.metadata = metadata
  }
}

export class ErrorResponse extends BaseResponse {
  public errors: Error[]
  public data: null

  constructor(errorCode: ErrorCode, message: string, customErrors?: Error[]) {
    super(false, message)

    this.errors = customErrors ?? [
      {
        code: errorCode,
        status: ErrorCode[errorCode],
        messages: [message],
      },
    ]
    this.data = null
  }
}
