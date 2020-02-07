import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { reduce, isEmpty } from 'lodash';
import Layout from '../presentational/elections/Layout';
import Summary from '../presentational/elections/Summary';
import Candidates from '../presentational/elections/Candidates';
import {
  fetchElection,
  fetchElectionCandidates,
  fetchElectionCandidateUptime,
  syncElectionCandidateUptime,
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
  syncElectionCandidateUptime;
  inProgress;
  isSyncing;
}> {
  constructor(props) {
    super(props);

    props.fetchElection();
  }

  checkSyncStatus = () => {
    const { epoch, block, candidates, candidateUptime } = this.props;
    const firstEpochBlock = (epoch * 720) - 719;
    const firstCandidateUptime = candidateUptime[Object.keys(candidates)[0]];
    const lastUpdatedAt = firstCandidateUptime && (firstCandidateUptime.updatedAt || firstEpochBlock);

    if (isEmpty(candidateUptime) || lastUpdatedAt < block) {
      this.props.syncElectionCandidateUptime();
    }
  };

  componentDidUpdate(prevProps) {
    const {
      epoch: prevEpoch,
      inProgress: prevInProgress,
    } = prevProps;
    const {
      epoch,
      block,
      candidates,
      inProgress,
      isSyncing,
    } = this.props;

    if (!prevEpoch && epoch && isEmpty(candidates)) {
      this.props.fetchElectionCandidates(block);
    } else if (
      prevInProgress &&
      !inProgress &&
      !isEmpty(candidates) &&
      !isSyncing
    ) {
      this.checkSyncStatus();
    }
  }

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
  syncElectionCandidateUptime,
})(ElectionsContainer);
