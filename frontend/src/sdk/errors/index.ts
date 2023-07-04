export const ERRORS = {
  ACCESS_DENIED: 'https://enfatiza7.com/access-denied',
  INVALID_DATA: 'https://enfatiza7.com/invalid-data',
  SYSTEM_ERROR: 'https://enfatiza7.com/system-error',
  INVALID_PARAMETER: 'https://enfatiza7.com/invalid-parameter',
  INCOMPREHENSIBLE_MESSAGE: 'https://enfatiza7.com/incomprehensible-message',
  RESOURCE_NOT_FOUND: 'https://enfatiza7.com/resource-not-found',
  ENTITY_IN_USE: 'https://enfatiza7.com/entity-in-use',
  DUPLICATE_ENTITY: 'https://enfatiza7.com/duplicate-entity',
  BUSINESS_ERROR: 'https://enfatiza7.com/business-error',
};

export { default as AccessDeniedError } from './AccessDenied.error';
export { default as BusinessError } from './BusinessError.error';
export { default as DuplicateEntityError } from './DuplicateEntity.error';
export { default as EntityInUseError } from './EntityInUse.error';
export { default as GenericError } from './GenericError.error';
export { default as IncomprehensibleMessageError } from './IncomprehensibleMessage.error';
export { default as InvalidDataError } from './InvalidData.error';
export { default as InvalidParameterError } from './InvalidParameter.error';
export { default as ResourceNotFoundError } from './ResourceNotFound.error';
export { default as SystemError } from './SystemError.error';
