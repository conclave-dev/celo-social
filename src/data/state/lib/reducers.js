// Extends initial state with "boilerplate" properties
const initialStateDecorator = state => ({
  ...state,
  inProgress: false,
  errorCode: null,
  errorMessage: null,
});

// Flexible handlers for different status cases
const reduceStartState = (state) => ({
  ...state,
  inProgress: true,
  errorCode: null,
  errorMessage: null,
});

const reduceSuccessState = (state, successState) => ({
  ...state,
  ...successState,
  inProgress: false,
});

const reduceErrorState = (state, {
  status,
  data: {
    error: { message }
  },
}) => ({
  ...state,
  errorCode: status,
  errorMessage: message,
  inProgress: false,
});

const evalActionPayload = (state, action, caseReducer) => {
  const {
    response,
    error,
  } = action;

  if (response) {
    // Reduce state with the return value of `caseReducer`
    return reduceSuccessState(state, caseReducer(state, action));
  } else if (error) {
    // Reduce state with the error response
    return reduceErrorState(state, error);
  }

  return reduceStartState(state);
};

export {
  initialStateDecorator,
  evalActionPayload,
};
