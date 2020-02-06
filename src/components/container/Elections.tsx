import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { reduce, isEmpty } from 'lodash';
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
  inProgress;
}> {
  constructor(props) {
    super(props);

    props.fetchElection();
  }

  checkSyncStatus = (epoch, block, candidateUptime) => {
    const epochStart = epoch * 720 - 719;
    const currentlySyncedBlock =
      Object.keys(candidateUptime).length + epochStart;

    if (currentlySyncedBlock < block) {
      this.syncElectionCandidateUptime();
    }
  };

  componentDidUpdate() {
    const {
      epoch,
      block,
      candidates,
      candidateUptime,
      inProgress,
    } = this.props;

    if (epoch) {
      const candidatesExist = !!Object.keys(candidates).length;

      if (!inProgress) {
        if (candidatesExist && isEmpty(candidateUptime)) {
          this.checkSyncStatus(epoch, block, candidateUptime);
        } else if (!inProgress && isEmpty(candidateUptime)) {
          this.props.fetchElectionCandidates(block);
        }
      }
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

      // await Promise.each(
      //   unsyncedBlockIterator,
      //   async (_, idx) =>
      //     this.props.fetchElectionCandidateUptime(startingBlock + idx),
      // for (let i = 0; i < 5; i += 1) {
      await this.props.fetchElectionCandidateUptime(startingBlock);
      // }
      // );
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
        {/* <Summary
          votes={totalVotes}
          earnings={earnings}
          uptime={averageUptime.toFixed(2)}
        />
        <Candidates
          block={block}
          candidates={candidates}
          candidateGroups={candidateGroups}
        /> */}
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
