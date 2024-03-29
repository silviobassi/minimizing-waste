import { AxiosError } from 'axios';
import { ErrorData } from '../CustomError';
import {
  AccessDeniedError,
  BusinessError,
  DuplicateEntityError,
  EntityInUseError,
  ERRORS,
  GenericError,
  IncomprehensibleMessageError,
  InvalidDataError,
  ResourceNotFoundError,
  SystemError,
} from '../errors';
import InvalidParameterError from '../errors/InvalidParameter.error';

export default function handleAxiosResponseError(error: AxiosError<ErrorData>) {
  const { response } = error;

  if (response?.data.type) {
    const { type } = response.data;
    const { data } = response;

    if (type === ERRORS.ACCESS_DENIED) throw new AccessDeniedError(data);
    if (type === ERRORS.BUSINESS_ERROR) throw new BusinessError(data);
    if (type === ERRORS.DUPLICATE_ENTITY) throw new DuplicateEntityError(data);
    if (type === ERRORS.ENTITY_IN_USE) throw new EntityInUseError(data);
    if (type === ERRORS.INCOMPREHENSIBLE_MESSAGE)
      throw new IncomprehensibleMessageError(data);
    if (type === ERRORS.INVALID_DATA) throw new InvalidDataError(data);
    if (type === ERRORS.INVALID_PARAMETER)
      throw new InvalidParameterError(data);
    if (type === ERRORS.RESOURCE_NOT_FOUND)
      throw new ResourceNotFoundError(data);
    if (type === ERRORS.SYSTEM_ERROR) throw new SystemError(data);
  }

  /*throw new GenericError({
    detail: response?.data.detail || error.message || 'Erro desconhecido',
    status: response?.status || 500,
    userMessage:
      response?.data?.userMessage ||
      response?.data?.detail ||
      'Erro desconhecido',
    timestamp: response?.data?.timestamp || '',
    title: response?.data?.title || 'Erro desconhecido',
    type: 'GenericError',
  });*/

  throw error;
}
