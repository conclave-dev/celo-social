import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { reduce } from 'lodash';
import { Promise } from 'bluebird';
import Layout from '../presentational/elections/Layout';
import Summary from '../presentational/elections/Summary';
import Candidates from '../presentational/elections/Candidates';
import {
  fetchElection,
  fetchElectionCandidates,
  fetchElectionCandidateUptime,
} from '../../data/state/actions/elections';

class ElectionsContainer extends PureComponent<{
  epoch;
  block;
  earnings;
  candidates;
  candidateGroups;
  averageUptime;
  candidateUptime;
  fetchElection;
  fetchElectionCandidates;
  fetchElectionCandidateUptime;
}> {
  constructor(props) {
    super(props);

    props.fetchElection();
  }

  componentDidUpdate(prevProps) {
    const { epoch: prevEpoch, candidates: prevCandidates } = prevProps;
    const { epoch, block, candidates } = this.props;

    if (!prevEpoch && epoch) {
      this.props.fetchElectionCandidates(block);
    } else if (
      !Object.keys(prevCandidates).length &&
      Object.keys(candidates).length
    ) {
      this.syncElectionCandidateUptime();
    }
  }

  syncElectionCandidateUptime = async () => {
    const { candidateUptime, epoch, block } = this.props;
    const lastSynced = candidateUptime[0]
      ? candidateUptime[0].updatedAt
      : epoch * 720 - 719;
    const numUnsyncedBlocks = block - lastSynced - 1;

    if (numUnsyncedBlocks) {
      const unsyncedBlockIterator = new Array(numUnsyncedBlocks);
      const startingBlock = lastSynced;

      await Promise.each(
        unsyncedBlockIterator,
        async (_, idx) =>
          this.props.fetchElectionCandidateUptime(startingBlock + idx),
        // for (let i = 0; i < 5; i+=1) {
        //   await this.props.fetchElectionCandidateUptime(startingBlock + i)
        // }
      );
    }
  };

  render = () => {
    const {
      epoch,
      block,
      earnings,
      candidates,
      candidateGroups,
      averageUptime,
    } = this.props;
    const totalVotes = reduce(
      candidateGroups,
      (total, { votes }) => total + votes,
      0,
    );

    return (
      <Layout epoch={epoch} block={block}>
        <Summary
          votes={totalVotes}
          earnings={earnings}
          uptime={averageUptime.toFixed(2)}
        />
        <Candidates
          block={block}
          candidates={candidates}
          candidateGroups={candidateGroups}
        />
      </Layout>
    );
  };
}

const mapStateToProps = ({ elections }) => ({
  ...elections,
});

export default connect(mapStateToProps, {
  fetchElection,
  fetchElectionCandidates,
  fetchElectionCandidateUptime,
})(ElectionsContainer);
