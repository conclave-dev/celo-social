import {
  FETCH_ELECTION,
  FETCH_ELECTION_CANDIDATES,
  FETCH_ELECTION_CANDIDATE_UPTIME,
  SET_ELECTIONS_CACHE,
  GET_ELECTIONS_CACHE,
  SYNC_ELECTION_CANDIDATE_UPTIME,
} from './util/types';
import { actionWrapper } from '../lib/actions';
import { validateStateFields } from '../lib/cache';
import { getBlockNumber } from '../../fetch/eth';
import {
  getElectedValidatorsOverview,
  getValidatorGroupsOverviewByAccounts,
} from '../../fetch/validators';
import { getGroupAddresses, getUpdatedUptime } from '../lib/elections';

const setElectionsCache = () => {
  const { init, packData, packError } = actionWrapper({
    type: SET_ELECTIONS_CACHE,
  });

  return (dispatch, getState) => {
    dispatch(init());

    try {
      const { elections } = getState();
      const { isValid, sanitizedState } = validateStateFields(
        Object.keys(elections),
        elections,
        ['isSyncing'],
      );

      if (isValid) {
        localStorage.setItem('elections', JSON.stringify(sanitizedState));
      }

      return dispatch(packData({}));
    } catch (err) {
      const error = packError({
        status: err.status,
        message: err.message,
      });

      return dispatch(error);
    }
  };
};

const getElectionsCache = () => {
  const { init, packData, packError } = actionWrapper({
    type: GET_ELECTIONS_CACHE,
  });

  return dispatch => {
    dispatch(init());

    try {
      const data = packData({
        state: JSON.parse(localStorage.getItem('elections')),
      });

      return dispatch(data);
    } catch (err) {
      const error = packError({
        status: err.status,
        message: err.message,
      });

      return dispatch(error);
    }
  };
};

const fetchElection = () => {
  const { init, packData, packError } = actionWrapper({
    type: FETCH_ELECTION,
  });

  return async dispatch => {
    dispatch(init());

    try {
      const { number: block } = await getBlockNumber();
      const data = packData({
        epoch: Math.ceil(block / 720),
        block,
      });

      return dispatch(data);
    } catch (err) {
      const error = packError({
        status: err.status,
        message: err.message,
      });

      return dispatch(error);
    }
  };
};

const fetchElectionCandidates = blockNumber => {
  const { init, packData, packError } = actionWrapper({
    type: FETCH_ELECTION_CANDIDATES,
  });

  return async dispatch => {
    dispatch(init());

    try {
      const { validators } = await getElectedValidatorsOverview(blockNumber);
      const groupAddresses = getGroupAddresses(validators);
      const { validatorGroups } = await getValidatorGroupsOverviewByAccounts(
        blockNumber,
        Object.keys(groupAddresses),
      );
      const data = packData({
        candidates: validators,
        candidateGroups: validatorGroups,
      });

      return dispatch(data);
    } catch (err) {
      console.error(err);
      const error = packError({
        status: err.status,
        message: err.message,
      });

      return dispatch(error);
    }
  };
};

const fetchElectionCandidateUptime = blockNumber => {
  const { init, packData, packError } = actionWrapper({
    type: FETCH_ELECTION_CANDIDATE_UPTIME,
  });

  return async (dispatch, getState) => {
    dispatch(init);

    try {
      const { elections } = await getState();
      const { candidateUptime, averageUptime } = await getUpdatedUptime(
        blockNumber,
        elections.candidateUptime,
        elections.candidates,
      );
      const data = packData({
        candidateUptime,
        averageUptime,
      });

      return dispatch(data);
    } catch (err) {
      console.error(err);
      const error = packError({
        status: err.status,
        message: err.message,
      });

      return dispatch(error);
    }
  };
};

const syncElectionCandidateUptime = () => {
  const { packData, packError } = actionWrapper({
    type: SYNC_ELECTION_CANDIDATE_UPTIME,
  });

  return async (dispatch, getState) => {
    const {
      candidateUptime,
      candidates,
      epoch,
      block,
      isSyncing,
    } = getState().elections;

    if (!isSyncing) {
      dispatch(packData({ isSyncing: true }));
    }

    try {
      const firstCandidate = candidateUptime[Object.keys(candidates)[0]];
      const lastSynced = firstCandidate
        ? firstCandidate.updatedAt
        : epoch * 720 - 719;
      const numUnsyncedBlocks = block - lastSynced - 1;

      if (numUnsyncedBlocks) {
        await fetchElectionCandidateUptime(lastSynced + 1)(dispatch, getState);
        return syncElectionCandidateUptime()(dispatch, getState);
      }

      return dispatch(packData({ isSyncing: false }));
    } catch (err) {
      console.error(err);
      const error = packError({
        status: err.status,
        message: err.message,
      });

      return dispatch(error);
    }
  };
};

export {
  setElectionsCache,
  getElectionsCache,
  fetchElection,
  fetchElectionCandidates,
  fetchElectionCandidateUptime,
  syncElectionCandidateUptime,
};
