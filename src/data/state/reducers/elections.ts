import {
  SET_ELECTIONS_CACHE,
  GET_ELECTIONS_CACHE,
  FETCH_ELECTION,
  FETCH_ELECTION_CANDIDATES,
  FETCH_ELECTION_CANDIDATE_UPTIME,
  SYNC_ELECTION_CANDIDATE_UPTIME,
} from '../actions/util/types';
import { evalActionPayload, initialStateDecorator } from '../lib/reducers';
import { validateStateFields } from '../lib/cache';
import { ElectionsState } from '../lib/elections';

const electionsState: ElectionsState = {
  epoch: 0,
  block: 0,
  averageUptime: 0,
  earnings: 1,
  candidates: {},
  candidateGroups: {},
  candidateUptime: {},
  isSyncing: false,
}

const initialState = initialStateDecorator(electionsState);

const setElectionsCache = state => state;

const getElectionsCache = (state, { state: cachedState }) => {
  if (!cachedState) {
    return state;
  }

  const { isValid, sanitizedState } = validateStateFields(
    Object.keys(initialState),
    cachedState,
    ['isSyncing'],
  );

  if (!isValid) {
    localStorage.removeItem('elections');
    return state;
  }

  return {
    ...state,
    ...sanitizedState,
  };
};

const fetchElection = (state, { epoch, block }) => {
  const { previousElections = {}, ...election } = state;

  if (!election.epoch) {
    return {
      ...state,
      epoch,
      block,
    };
  }

  // If the recently-restored cached election is older than one epoch...
  // move it to previousElections, and sync from the current epoch
  if (election.epoch < epoch) {
    return {
      ...state,
      epoch,
      block,
      previousElections: { ...previousElections, [election.epoch]: election },
    };
  }

  return {
    ...state,
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

const syncElectionCandidateUptime = (state, action) => ({ ...state, isSyncing: action.isSyncing })

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
    case SYNC_ELECTION_CANDIDATE_UPTIME:
      return evalActionPayload(state, action, syncElectionCandidateUptime);
    default:
      return state;
  }
};
