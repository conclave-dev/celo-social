import React, { memo } from 'react';
import { reduce } from 'lodash';
import Elections from '../presentational/Content/Elections';
import epoch from '../mock-data/epoch.json';
import electedValidators from '../mock-data/electedValidators.json';
import electedValidatorGroups from '../mock-data/electedValidatorGroups.json';
import epochBlocks from '../mock-data/epochBlocks.json';
import { ElectionSummary, ElectionValidator } from '../types/elections';

const ElectionsContainer = memo(() => {
  const electionSummary: ElectionSummary = {
    totalVotes: '0',
    totalFeesEarned: '0',
    totalMissedSignatures: 0,
  };
  const electionValidators: { [key: string]: ElectionValidator } = reduce(
    electedValidators,
    (acc, { affiliation, address, name, signer }) => {
      const electedValidatorGroupsWithType: { [key: string]: any } = { ...electedValidatorGroups };
      const groupName: string = electedValidatorGroupsWithType[affiliation].name;
      const electionValidator: ElectionValidator = {
        groupName: groupName.length > 32 ? groupName.substring(0, 32) : groupName,
        address,
        name,
        votes: '0',
        feesEarned: '0',
        blockSignaturePercentage: 0,
      };

      return {
        ...acc,
        [signer]: electionValidator,
      };
    },
    {},
  );

  // TO DO: When fetching block data, store miner earnings in a separate object
  epochBlocks.forEach((block) => {
    interface Transaction {
      gasUsed: number;
      gasPrice: string;
    }

    const { transactions }: { transactions: Transaction[] } = block;

    if (block.transactions.length) {
      const feesEarned = transactions.reduce((acc, { gasUsed, gasPrice }) => {
        const minerFees = (gasUsed * parseInt(gasPrice, 10) * 0.8) / 1000000000000000000;

        return acc + minerFees;
      }, 0);

      electionSummary.totalFeesEarned = (
        feesEarned + parseFloat(electionSummary.totalFeesEarned)
      ).toPrecision(4);

      electionValidators[block.miner].feesEarned = (
        feesEarned + parseFloat(electionValidators[block.miner].feesEarned)
      ).toPrecision(4);
    }
  });

  return (
    <Elections
      currentEpochNumber={epoch.epochNumber}
      currentBlockNumber={epoch.currentBlockNumber}
      electionSummary={electionSummary}
      electedValidators={electionValidators}
    />
  );
});

export default ElectionsContainer;
