import { BadRequestException, ValidationError } from '@nestjs/common'

import { ErrorResponse } from '@interfaces'

import { ErrorCode } from '@enums'

export class ValidationException extends BadRequestException {
  constructor(object: ErrorResponse, description?: any) {
    super(object, description || 'Validation Error')
  }
}

export function formatValidationException(errors: ValidationError[]): ValidationException {
  return new ValidationException({
    timestamps: new Date().toISOString(),
    success: false,
    message: 'Validation failed',
    errors: errors?.map((error) => {
      return {
        code: ErrorCode.VALIDATION_FAILED,
        status: ErrorCode[ErrorCode.VALIDATION_FAILED],
        messages: error.constraints ? Object.values(error.constraints) : ['Validation failed'],
      }
    }),
    data: null,
  })
}
