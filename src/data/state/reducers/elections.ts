import {
  FETCH_ELECTION,
  FETCH_ELECTION_CANDIDATES,
  FETCH_ELECTION_CANDIDATE_UPTIME,
} from '../actions/util/types';
import { evalActionPayload, initialStateDecorator } from '../lib/reducers';

const initialState = initialStateDecorator({
  election: {
    epoch: 0,
    block: 0,
    votes: 0,
    averageUptime: 0,
    earnings: 0,
    candidates: {},
    candidateGroups: {},
    candidateUptime: {},
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

const fetchElectionCandidates = (state, { candidates, candidateGroups }) => ({
  ...state,
  election: {
    ...state.election,
    candidates,
    candidateGroups,
  },
});

const fetchElectionCandidateUptime = (state, { candidateUptime, averageUptime }) => ({
  ...state,
  election: {
    ...state.election,
    candidateUptime,
    averageUptime,
  },
});

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_ELECTION:
      return evalActionPayload(state, action, fetchElection);
    case FETCH_ELECTION_CANDIDATES:
      return evalActionPayload(state, action, fetchElectionCandidates);
    case FETCH_ELECTION_CANDIDATE_UPTIME:
      return evalActionPayload(state, action, fetchElectionCandidateUptime);
    default:
      return state;
  }
};
