import { Error } from '@interfaces'

export interface SuccessJsonData {
  success: boolean
  errors: null
  data: any
  message: string
}

export interface ErrorJsonData {
  success: boolean
  errors: Error[]
  data: null
  message: string
}
