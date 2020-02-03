import { apiFetch, defaultOptions } from './util';

const getCurrentValidatorSigners = (blockNumber: number) =>
  apiFetch('/election/getCurrentValidatorSigners', {
    opts: { blockNumber },
  });

const getGroupVoteStatus = (blockNumber: number, groupAddress: string) =>
  apiFetch('/election/getGroupVoteStatus', {
    opts: { blockNumber },
    groupAddress,
  });

export { getCurrentValidatorSigners, getGroupVoteStatus };
