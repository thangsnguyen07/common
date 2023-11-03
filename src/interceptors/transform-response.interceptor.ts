import { catchError, map, throwError } from 'rxjs'

import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
  NotFoundException,
  ValidationError,
} from '@nestjs/common'

import { SuccessJsonData, SuccessResponse } from '@interfaces'

import { ErrorCode } from '@enums'

import { ValidationException, formatValidationException } from '@exceptions'

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<SuccessJsonData>) {
    return next.handle().pipe(
      map(
        (response): SuccessResponse => ({
          timestamps: new Date().toISOString(),
          success: true,
          errors: null,
          message: response.message,
          data: response.data,
        })
      ),
      catchError((error) => {
        if (error instanceof ValidationException) {
          const errResponse = error.getResponse() as any

          if (typeof errResponse === 'object' && errResponse !== null) {
            const errors = errResponse['message'] as ValidationError[]

            return throwError(() => formatValidationException(errors))
          }
        }

        if (error instanceof NotFoundException) {
          return throwError(
            () =>
              new NotFoundException({
                timestamps: new Date().toISOString(),
                success: false,
                code: ErrorCode.NOT_FOUND,
                message: error.message || 'Resource not found',
                errors: null,
              })
          )
        }

        // Other exceptions
        return throwError(
          () =>
            new HttpException(
              {
                timestamps: new Date().toISOString(),
                success: false,
                code: ErrorCode.INTERNAL_SERVER_ERROR,
                message: error.message || 'Something went wrong',
                errors: null,
              },
              error.status
            )
        )
      })
    )
  }
}
