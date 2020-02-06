import { reduce } from 'lodash';

const getGroupAddresses = candidates =>
  reduce(
    candidates,
    (acc, { groupAddress }) => ({
      ...acc,
      [groupAddress]: true,
    }),
    {},
  );

export { getGroupAddresses };
