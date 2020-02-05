// Cleanly wraps actions
const actionWrapper = ({ type }) => {
  return (payload = {}) => ({
    ...payload,
    type,
  });
};

export {
  actionWrapper,
};
