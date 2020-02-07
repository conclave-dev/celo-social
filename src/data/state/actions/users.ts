import { FETCH_USER } from './util/types';
import { actionWrapper } from '../lib/actions';
import { getUser } from '../../fetch/users';

const fetchUser = (userID: string) => {
  const { init, packData, packError } = actionWrapper({
    type: FETCH_USER,
  });

  return async dispatch => {
    dispatch(init());

    try {
      const user = await getUser(userID);
      const data = packData({ user })

      return dispatch(data);
    } catch (err) {
      const error = packError({
        status: err.status,
        message: err.message,
      });
      dispatch(error);

      throw err;
    }
  };
};

export {
  fetchUser,
};
