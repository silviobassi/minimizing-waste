import CustomError, { ErrorType } from '../CustomError';

export default class AccessDeniedError extends CustomError {
  static type = 'AccessDeniedError' as ErrorType;
}
