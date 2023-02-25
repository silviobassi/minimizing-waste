import { MinimizingWaste } from './@types';

export type ErrorData = MinimizingWaste.components['schemas']['Problem'];
export type ErrorType =
  | 'AccessDeniedError'
  | 'BusinessError'
  | 'DuplicateEntityError'
  | 'EntityInUseError'
  | 'GenericError'
  | 'IncomprehensibleMessageError'
  | 'InvalidDataError'
  | 'InvalidParameterError'
  | 'ResourceNotFoundError'
  | 'SystemError';

class CustomError {
  static type: ErrorType;

  message?: string;
  data?: ErrorData;

  constructor(data: ErrorData) {
    this.message = data.userMessage || data.detail;
    this.data = data;
  }
}

export default CustomError;
