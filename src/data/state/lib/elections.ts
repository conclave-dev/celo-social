import { reduce, forEach, cloneDeep } from 'lodash';
import { bitIsSet, parseBlockExtraData } from '@celo/utils/lib/istanbul';
import { getBlockByNumber } from '../../fetch/eth';

export interface ElectionsState {
  epoch: number;
  block: number;
  averageUptime: number;
  earnings: number;
  candidates: { [key: string]: Candidate };
  candidateGroups: { [key: string]: CandidateGroup };
  candidateUptime: { [key: string]: CandidateUptime };
  isSyncing: boolean;
}

export interface Candidate {
  address: string;
  groupAddress: string;
  signerIndex: number;
  score: number;
  name: string;
}

export interface CandidateGroup {
  name: string;
  address: string;
  members: string[];
  votes: number;
}

export interface CandidateUptime {
  updatedAt: number;
  totalSignatures: number;
}

const getGroupAddresses = candidates =>
  reduce(
    candidates,
    (acc, { groupAddress }) => ({
      ...acc,
      [groupAddress]: true,
    }),
    {},
  );

const getUpdatedUptime = async (blockNumber, candidateUptime, candidates) => {
  const { header } = await getBlockByNumber(blockNumber);
  const clonedCandidateUptime = cloneDeep(candidateUptime);
  let totalSignatures = 0;

  forEach(candidates, ({ signerIndex, address }) => {
    const incrementUptimeBy = bitIsSet(
      parseBlockExtraData(header.extraData).parentAggregatedSeal.bitmap,
      signerIndex,
    )
      ? 1
      : 0;

    clonedCandidateUptime[address] = {
      updatedAt: blockNumber,
      totalSignatures: clonedCandidateUptime[address]
        ? clonedCandidateUptime[address].totalSignatures + incrementUptimeBy
        : incrementUptimeBy,
    };

    totalSignatures += clonedCandidateUptime[address].totalSignatures;
  });

  const averageUptime = calculateAverageUptime(
    blockNumber,
    totalSignatures,
    Object.keys(candidates).length,
  );

  return {
    candidateUptime: clonedCandidateUptime,
    averageUptime,
  };
};

const calculateAverageUptime = (
  currentBlock,
  totalSignatures,
  numCandidates,
) => {
  const completedEpochBlocks = currentBlock % 720;
  return (totalSignatures / numCandidates / completedEpochBlocks) * 100;
};

export { getGroupAddresses, getUpdatedUptime };
