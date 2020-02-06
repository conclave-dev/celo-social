import {
  SET_ELECTIONS_CACHE,
  GET_ELECTIONS_CACHE,
  FETCH_ELECTION,
  FETCH_ELECTION_CANDIDATES,
  FETCH_ELECTION_CANDIDATE_UPTIME,
} from '../actions/util/types';
import { evalActionPayload, initialStateDecorator } from '../lib/reducers';

const initialState = initialStateDecorator({
  epoch: 0,
  block: 0,
  votes: 0,
  averageUptime: 0,
  earnings: 0,
  candidates: {},
  candidateGroups: {},
  candidateUptime: {},
  previousElections: {},
});

const setElectionsCache = state => state;

const getElectionsCache = (state, { state: cachedState }) => ({
  ...state,
  ...cachedState,
});

const fetchElection = (state, { epoch, block }) => {
  const { previousElections, ...election } = state;

  // If the recently-restored cached election is older than one epoch...
  // move it to previousElections, and sync from the current epoch
  return {
    ...(election.epoch < epoch
      ? {
          ...initialState,
          epoch,
          previousElections: {
            ...election.previousElections,
            [election.epoch]: election,
          },
        }
      : { ...state }),
    block,
  };
};

const fetchElectionCandidates = (state, { candidates, candidateGroups }) => ({
  ...state,
  candidates,
  candidateGroups,
});

const fetchElectionCandidateUptime = (
  state,
  { candidateUptime, averageUptime },
) => ({
  ...state,
  candidateUptime,
  averageUptime,
});

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case SET_ELECTIONS_CACHE:
      return evalActionPayload(state, action, setElectionsCache);
    case GET_ELECTIONS_CACHE:
      return evalActionPayload(state, action, getElectionsCache);
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
