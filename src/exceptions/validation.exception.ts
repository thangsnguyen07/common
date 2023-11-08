import { BadRequestException, ValidationError } from '@nestjs/common'

import { ErrorResponse } from '@models'

import { Error } from '@interfaces'

import { ErrorCode } from '@enums'

export class ValidationException extends BadRequestException {
  constructor(object: ErrorResponse, description?: any) {
    super(object, description || 'Validation Error')
  }
}

export function formatValidationException(errors: ValidationError[]): ValidationException {
  const formattedErrors: Error[] = errors?.map((error) => {
    return {
      code: ErrorCode.VALIDATION_FAILED,
      status: ErrorCode[ErrorCode.VALIDATION_FAILED],
      messages: error.constraints ? Object.values(error.constraints) : ['Validation failed'],
    }
  })

  return new ValidationException(
    new ErrorResponse(ErrorCode.VALIDATION_FAILED, 'Validation failed', formattedErrors)
  )
}
