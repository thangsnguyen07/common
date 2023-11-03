import { Error, ErrorJsonData, SuccessJsonData } from '@interfaces'

import { ErrorCode } from '@enums'

export class JsonResponse {
  private _success: boolean
  private _message: string
  private _data: any
  private _errors: Error[] | null

  success(data: any, message: string): SuccessJsonData {
    return {
      success: true,
      errors: null,
      message,
      data,
    }
  }

  error(errorCode: ErrorCode, message: string): ErrorJsonData {
    return {
      success: false,
      message: message,
      errors: [
        {
          code: errorCode,
          status: ErrorCode[errorCode],
          messages: [message],
        },
      ],
      data: null,
    }
  }
}
