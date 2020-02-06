import { filter, omit, every, isObject, isEmpty, isNil, isNaN } from 'lodash';

const validateStateFields = (fields, state) => {
  const sanitizedFields = filter(fields, (field: string) => !['inProgress', 'errorCode', 'errorMessage'].includes(field));
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
