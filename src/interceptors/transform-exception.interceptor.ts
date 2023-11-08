import { Prisma } from '@prisma/client'
import { catchError, throwError } from 'rxjs'

import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
  NotFoundException,
  ValidationError,
} from '@nestjs/common'

import { ErrorResponse, SuccessResponse } from '@models'

import { ErrorCode } from '@enums'

import { ValidationException, formatValidationException } from '@exceptions'

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<SuccessResponse | ErrorResponse>) {
    return next.handle().pipe(
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
              new NotFoundException(
                new ErrorResponse(
                  ErrorCode.RESOURCE_NOT_FOUND,
                  error?.message || 'Resource not found'
                )
              )
          )
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return throwError(
            () =>
              new HttpException(
                new ErrorResponse(
                  ErrorCode.TRANSACTION_FAILED,
                  error?.message || 'Transaction failed'
                ),
                HttpStatus.BAD_REQUEST
              )
          )
        }

        // Other exceptions
        return throwError(
          () =>
            new HttpException(
              new ErrorResponse(ErrorCode.GENERAL_ERROR, error?.message || 'Something went wrong'),
              error.status
            )
        )
      })
    )
  }
}
