import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { reduce, isEmpty } from 'lodash';
import Layout from '../presentational/elections/Layout';
import Summary from '../presentational/elections/Summary';
import Candidates from '../presentational/elections/Candidates';
import {
  getElectionsCache,
  setElectionsCache,
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
  setElectionsCache,
  fetchElection;
  fetchElectionCandidates;
  fetchElectionCandidateUptime;
  syncElectionCandidateUptime;
  inProgress;
  isSyncing;
}> {
  constructor(props) {
    super(props);
    props.getElectionsCache();
    props.fetchElection();
  }

  intervalElectionFetcher = null

  cacheStore = () => {
    this.props.setElectionsCache();
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.cacheStore);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.cacheStore);
  }

  getSyncedBlock = () => {
    const { epoch, candidates, candidateUptime } = this.props;
    if (!epoch) {
      return 0;
    }

    const firstEpochBlock = epoch * 720 - 719;
    const firstCandidateUptime = candidateUptime[Object.keys(candidates)[0]];
    return firstCandidateUptime
      ? firstCandidateUptime.updatedAt
      : firstEpochBlock;
  };

  handleEpochChange = () => {
    const { block } = this.props;

    if (block) {
      this.props.fetchElectionCandidates(block);
    }
  }

  componentDidUpdate(prevProps) {
    const { epoch: prevEpoch, block: prevBlock, isSyncing: prevIsSyncing } = prevProps;
    const { epoch, block, isSyncing, candidates, candidateUptime } = this.props;

    // If epochs are different or candidates = {}, fetch latest candidates
    if (epoch && prevEpoch !== epoch) {
      this.handleEpochChange();
    }

    if (!isSyncing && (isEmpty(candidateUptime) || (block && prevBlock !== block && !isEmpty(candidates) && !isSyncing))) {
      this.props.syncElectionCandidateUptime();
    }

    if (prevIsSyncing && !isSyncing && !this.intervalElectionFetcher) {
      this.intervalElectionFetcher = window.setInterval(this.props.fetchElection, 5000);
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
      <Layout
        epoch={epoch}
        block={block}
      >
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
  getElectionsCache,
  setElectionsCache,
  fetchElection,
  fetchElectionCandidates,
  fetchElectionCandidateUptime,
  syncElectionCandidateUptime,
})(ElectionsContainer);
