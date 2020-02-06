import {
  FETCH_ELECTION,
  FETCH_ELECTION_CANDIDATES,
  FETCH_ELECTION_CANDIDATE_UPTIME,
} from './util/types';
import { actionWrapper } from '../lib/actions';
import { getBlockNumber } from '../../fetch/eth';
import {
  getElectedValidatorsOverview,
  getValidatorGroupsOverviewByAccounts,
} from '../../fetch/validators';
import { getGroupAddresses, getUpdatedUptime } from '../lib/elections';

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

const fetchElectionCandidateUptime = (blockNumber) => {
  const { init, packData, packError } = actionWrapper({
    type: FETCH_ELECTION_CANDIDATE_UPTIME,
  });

  return async (dispatch, getState) => {
    dispatch(init);

    try {
      const {
        elections: { election },
      } = await getState();
      const { candidateUptime, averageUptime } = await getUpdatedUptime(
        blockNumber,
        election.candidateUptime,
        election.candidates,
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

export { fetchElection, fetchElectionCandidates, fetchElectionCandidateUptime };
