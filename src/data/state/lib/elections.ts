import { reduce, forEach, cloneDeep } from 'lodash';
import { bitIsSet, parseBlockExtraData } from '@celo/utils/lib/istanbul';
import { getBlockByNumber } from '../../fetch/eth';

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

  console.log('clonedCandidateUptime', clonedCandidateUptime);

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
  console.log('currentBlock', currentBlock);
  console.log('totalSignatures', totalSignatures);
  console.log('numCandidates', numCandidates);
  const completedEpochBlocks = currentBlock % 720;
  return ((totalSignatures / numCandidates) / completedEpochBlocks) * 100;
};

export { getGroupAddresses, getUpdatedUptime };
