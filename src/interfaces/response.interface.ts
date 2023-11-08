import { ErrorCode } from '@enums'

export interface Metadata {
  total: number
  page: number
  limit: number
}

export interface Error {
  code: ErrorCode
  status: string
  messages: string[]
}
