import {
  FETCH_ELECTION,
  FETCH_ELECTION_CANDIDATES,
} from '../actions/util/types';
import { evalActionPayload, initialStateDecorator } from '../lib/reducers';

const initialState = initialStateDecorator({
  election: {
    epoch: 0,
    block: 0,
    votes: 0,
    candidates: {},
    candidateGroups: {},
  },
  cachedElections: [],
});

const fetchElection = (state, { epoch, block }) => ({
  ...state,
  election: {
    ...state.election,
    epoch,
    block,
  },
});

const fetchElectionCandidates = (state, { candidates, candidateGroups }) => {

  console.log('candidates', candidates);

  return ({
    ...state,
    election: {
      ...state.election,
      candidates,
      candidateGroups,
    },
  })
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_ELECTION:
      return evalActionPayload(state, action, fetchElection);
    case FETCH_ELECTION_CANDIDATES:
      return evalActionPayload(state, action, fetchElectionCandidates);
    default:
      return state;
  }
};
