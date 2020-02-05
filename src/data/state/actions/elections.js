import { FETCH_ELECTION, FETCH_ELECTION_CANDIDATES } from './util/types';
import { actionWrapper } from '../lib/actions';
import { getBlockNumber } from '../../fetch/eth';

const fetchElectionCandidates = payload =>
  actionWrapper({ type: FETCH_ELECTION_CANDIDATES, payload });

const fetchElection = () => {
  const { sendInit, sendData, sendError } = actionWrapper({
    type: FETCH_ELECTION,
  });

  return async dispatch => {
    dispatch(sendInit());

    try {
      const { number } = await getBlockNumber();
      const election = sendData({
        epoch: Math.ceil(number / 720),
        block: number,
      });

      return dispatch(election);
    } catch (err) {
      const error = sendError({
        status: err.status,
        message: err.message,
      });

      return dispatch(error);
    }
  };
};

export { fetchElection, fetchElectionCandidates };
