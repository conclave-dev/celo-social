// Cleanly wraps actions
const actionWrapper = ({ type }) => {
  return {
    sendInit: () => ({
      type,
      status: 100,
      message: 'Init',
    }),
    sendData: data => ({
      type,
      status: 200,
      message: 'Success',
      ...data,
    }),
    sendError: error => ({
      type,
      status: error.status || 400,
      message: error.message || 'Unspecified error',
    }),
  };
};

export { actionWrapper };
