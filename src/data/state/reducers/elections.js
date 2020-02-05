import { FETCH_ELECTION, FETCH_ELECTION_CANDIDATES } from '../actions/util/types';
import {
  evalActionPayload,
  initialStateDecorator,
} from '../lib/reducers';

const initialState = initialStateDecorator({

});

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_ELECTION:
      return evalActionPayload(state, action, (state, action) => state);
    case FETCH_ELECTION_CANDIDATES:
      return evalActionPayload(state, action, (state, action) => state);
    default:
      return state;
  }
};
