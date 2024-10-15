import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from './errors-list';
import { resolveErrorMessage } from './helper';

export class AppException extends HttpException {
  constructor(code: ErrorCode, message: string, status: number, params?: any) {
    super({ errorCode: code, message, statusCode: status, params }, status);
  }
}

export class AppBadRequestException extends AppException {
  constructor(code: ErrorCode, message?: string, params?: any) {
    super(
      code,
      message ?? resolveErrorMessage(code),
      HttpStatus.BAD_REQUEST,
      params,
    );
  }
}

export class AppNotFoundException extends AppException {
  constructor(code: ErrorCode, message?: string, params?: any) {
    super(
      code,
      message ?? resolveErrorMessage(code),
      HttpStatus.NOT_FOUND,
      params,
    );
  }
}

export class AppFobiddenException extends AppException {
  constructor(code: ErrorCode, message?: string, params?: any) {
    super(
      code,
      message ?? resolveErrorMessage(code),
      HttpStatus.FORBIDDEN,
      params,
    );
  }
}

export class AppConflictException extends AppException {
  constructor(code: ErrorCode, message?: string, params?: any) {
    super(
      code,
      message ?? resolveErrorMessage(code),
      HttpStatus.CONFLICT,
      params,
    );
  }
}

export class AppBadGatewayException extends AppException {
  constructor(code: ErrorCode, message?: string, params?: any) {
    super(
      code,
      message ?? resolveErrorMessage(code),
      HttpStatus.BAD_GATEWAY,
      params,
    );
  }
}

export class AppUnAuthorizedException extends AppException {
  constructor(message?: string) {
    super(
      ErrorCode.UNAUTHORIZED,
      message ?? 'Unauthorized',
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class AppValidationError extends BadRequestException {
  constructor(public details?: string[]) {
    super({
      errorCode: ErrorCode.VALIDATION_ERROR,
      message: details?.length ? details[0] : 'Validation Error',
      details,
    });
  }
}

export class AppInternalServerError extends AppException {
  constructor(code: ErrorCode, message?: string, params?: any) {
    super(
      code,
      message ?? resolveErrorMessage(code),
      HttpStatus.INTERNAL_SERVER_ERROR,
      params,
    );
  }
}
