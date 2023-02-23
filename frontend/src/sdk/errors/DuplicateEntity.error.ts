import CustomError, { ErrorType } from '../CustomError';

export default class DuplicateEntityError extends CustomError {
  static type = 'DuplicateEntityError' as ErrorType;
}
