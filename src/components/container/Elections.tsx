import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Layout from '../presentational/elections/Layout';
import Validators from '../presentational/elections/Validators';
import { fetchElection, fetchElectionCandidates } from '../../data/state/actions/elections';

class ElectionsContainer extends PureComponent<{ election, fetchElectionCandidates }> {
  constructor(props) {
    super(props);
    props.fetchElection();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.election.epoch && this.props.election.epoch) {
      console.log('prevProps.election', prevProps.election);
      console.log('this.props.election', this.props.election);
      this.props.fetchElectionCandidates(this.props.election.block)
    }
  }

  render = () => {
    const {
      election,
    } = this.props;

    console.log('election', election);

    return (
      <Layout epoch={election.epoch}  block={election.block}>
        <Validators validators={[]} groups={[]} />
      </Layout>
    )
  }
};

const mapStateToProps = ({ elections }) => ({
  ...elections
})

export default connect(mapStateToProps, {
  fetchElection,
  fetchElectionCandidates,
})(ElectionsContainer);
