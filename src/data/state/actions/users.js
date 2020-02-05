import { FETCH_USER } from './util/types';
import apiEndpoints from './util/apiEndpoints';
import { actionWrapper } from '../lib/actions';

const fetchUser = actionWrapper({ type: FETCH_USER });

export {
  fetchUser,
};
