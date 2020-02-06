import { FETCH_USER } from './util/types';
import { actionWrapper } from '../lib/actions';

const fetchUser = actionWrapper({ type: FETCH_USER });

export {
  fetchUser,
};
