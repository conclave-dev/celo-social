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
  election;
  fetchElectionCandidates;
  fetchElectionCandidateUptime;
}> {
  constructor(props) {
    super(props);
    props.fetchElection();
  }

  componentDidUpdate(prevProps) {
    const { election: prevElec } = prevProps;
    const { epoch, block, candidates } = this.props.election;

    if (!prevElec.epoch && epoch) {
      this.props.fetchElectionCandidates(block);
    } else if (
      !Object.keys(prevElec.candidates).length &&
      Object.keys(candidates).length
    ) {
      this.syncElectionCandidateUptime();
    }
  }

  syncElectionCandidateUptime = async () => {
    const { candidateUptime, epoch, block } = this.props.election;
    const lastSynced = candidateUptime[0]
      ? candidateUptime[0].updatedAt
      : epoch * 720 - 719;
    const numUnsyncedBlocks = block - lastSynced - 1;

    if (numUnsyncedBlocks) {
      const unsyncedBlockIterator = new Array(numUnsyncedBlocks);
      const startingBlock = lastSynced;

      await Promise.each(unsyncedBlockIterator, async (_, idx) => (
        this.props.fetchElectionCandidateUptime(startingBlock + idx)
        // for (let i = 0; i < 5; i+=1) {
        //   await this.props.fetchElectionCandidateUptime(startingBlock + i)
        // }
      ));
    }
  };

  render = () => {
    const { election } = this.props;
    const totalVotes = reduce(
      election.candidateGroups,
      (total, { votes }) => total + votes,
      0,
    );
    const averageUptime = election.averageUptime.toFixed(2);

    return (
      <Layout epoch={election.epoch} block={election.block}>
        <Summary
          votes={totalVotes}
          earnings={election.earnings}
          uptime={averageUptime}
        />
        <Candidates
          block={election.block}
          candidates={election.candidates}
          candidateGroups={election.candidateGroups}
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
