import { apiFetch } from './util';

const getCurrentValidatorSigners = (blockNumber: number) =>
  apiFetch('/election/getCurrentValidatorSigners', {
    opts: { blockNumber },
  });

const getGroupVoteStatus = (blockNumber: number, groupAddress: string) =>
  apiFetch('/election/getGroupVoteStatus', {
    opts: { blockNumber },
    groupAddress,
  });

const getGroupsVotedForByAccount = (blockNumber: number, address: string) =>
  apiFetch('/election/getGroupsVotedForByAccount', {
    opts: { blockNumber },
    address,
  });

export {
  getCurrentValidatorSigners,
  getGroupVoteStatus,
  getGroupsVotedForByAccount,
};
