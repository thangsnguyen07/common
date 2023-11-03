import { ErrorCode } from '@enums'

export interface BaseResponse {
  timestamps: string
  success: boolean
  message: string
  httpStatusCode?: number
}

export interface Error {
  code: ErrorCode
  status: string
  messages: string[]
}

export interface SuccessResponse extends BaseResponse {
  errors: null
  data: any
}

export interface ErrorResponse extends BaseResponse {
  errors: Error[]
  data: null
}
