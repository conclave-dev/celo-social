// Extends initial state with "boilerplate" properties
const initialStateDecorator = state => ({
  ...state,
  inProgress: false,
  errorCode: null,
  errorMessage: null,
});

// Flexible handlers for different status cases
const reduceInit = (state) => ({
  ...state,
  inProgress: true,
  errorCode: null,
  errorMessage: null,
});

const reduceData = (newState) => ({
  ...newState,
  inProgress: false,
});

const reduceError = (state, {
  status,
  message,
}) => ({
  ...state,
  errorCode: status,
  errorMessage: message,
  inProgress: false,
});

const evalActionPayload = (state, action, caseReducer) => {
  const { status } = action;

  console.log('state', state);
  console.log('action', action);

  switch (status) {
    case 100:
      return reduceInit(state);
    case 200:
      return reduceData(caseReducer(state, action));
    default:
      return reduceError(state, action);
  }
};

export {
  initialStateDecorator,
  evalActionPayload,
};
