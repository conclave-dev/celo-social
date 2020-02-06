import { combineReducers } from 'redux';
import elections from './elections';
import users from './users';

export default combineReducers({
  elections,
  users,
});
