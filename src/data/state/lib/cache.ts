import {
  omit,
  every,
  isBoolean,
  isObject,
  isEmpty,
  isNil,
  isNaN,
} from 'lodash';

const validateState = (state, { omitFields, ignoreFields }) => {
  const sanitizedState = omit(state, [
    'inProgress',
    'errorCode',
    'errorMessage',
    ...omitFields,
  ]);

  return {
    isValid: every(state, (val, key) => {
      if (ignoreFields.includes(key)) {
        return true;
      }

      // Don't consider booleans
      if (isBoolean(val)) {
        return true;
      }

      if (isObject(val) || Array.isArray(val)) {
        return !isEmpty(val);
      }

      return !isNil(val) && !isNaN(val);
    }),
    sanitizedState,
  };
};

export { validateState };
