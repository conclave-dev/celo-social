import { filter, omit, every, isBoolean, isObject, isEmpty, isNil, isNaN } from 'lodash';

const validateStateFields = (fields, state, otherOmitFields = []) => {
  const sanitizedFields = filter(fields, (field: string) => !['inProgress', 'errorCode', 'errorMessage', ...otherOmitFields].includes(field));
  const sanitizedState = omit(state, [
    'inProgress',
    'errorCode',
    'errorMessage',
  ]);

  return {
    isValid: every(
      sanitizedFields,
      field => {
        const stateField = sanitizedState[field];

        // Don't consider booleans
        if (isBoolean(stateField)) {
          return true;
        }

        if (isObject(stateField) || Array.isArray(stateField)) {
          return !isEmpty(sanitizedState[field])
        }

        return (!isNil(sanitizedState[field]) && !isNaN(sanitizedState[field]));
      },
    ),
    sanitizedState,
  }
};

export { validateStateFields };
