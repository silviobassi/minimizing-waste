import CustomError, { ErrorType } from '../CustomError';

export default class EntityInUseError extends CustomError {
  static type = 'EntityInUseError' as ErrorType;
}
