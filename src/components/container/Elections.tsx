import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Layout from '../presentational/elections/Layout';
import { fetchElection } from '../../data/state/actions/elections';

class ElectionsContainer extends PureComponent<{ election }> {
  constructor(props) {
    super(props);
    props.fetchElection();
  }

  render = () => {
    const {
      election,
    } = this.props;

    return (
      <Layout epoch={election.epoch}  block={election.block}>
        <div>Hello</div>
      </Layout>
    )
  }
};

const mapStateToProps = ({ elections }) => ({
  ...elections
})

export default connect(mapStateToProps, {
  fetchElection,
})(ElectionsContainer);
