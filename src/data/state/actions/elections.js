import {
  FETCH_ELECTION,
  FETCH_ELECTION_CANDIDATES,
} from './util/types';
import { actionWrapper } from '../lib/actions';

const fetchElection = payload => actionWrapper({ type: FETCH_ELECTION, payload });
const fetchElectionCandidates = payload => actionWrapper({ type: FETCH_ELECTION_CANDIDATES, payload });

export {
  fetchElection,
  fetchElectionCandidates,
};
