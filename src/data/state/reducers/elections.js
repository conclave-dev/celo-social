import {
  FETCH_ELECTION,
  FETCH_ELECTION_CANDIDATES,
} from '../actions/util/types';
import { evalActionPayload, initialStateDecorator } from '../lib/reducers';

const initialState = initialStateDecorator({
  election: {
    epoch: 0,
    block: 0,
  },
  candidatesByElection: {},
  allElections: [],
});

const fetchElection = (state, action) => ({
  ...state,
  election: {
    epoch: action.epoch,
    block: action.block,
  },
});

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_ELECTION:
      return evalActionPayload(state, action, fetchElection);
    case FETCH_ELECTION_CANDIDATES:
      return evalActionPayload(state, action, (state, action) => state);
    default:
      return state;
  }
};
