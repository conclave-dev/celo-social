import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import User from '../presentational/content/User';
import { fetchUser } from '../../data/state/actions/users';

class UserContainer extends PureComponent<{
  fetchUser,
}> {
  constructor(props) {
    super(props);
    props.fetchUser(props.match.params.userID);
  }

  componentDidUpdate = () => {
    console.log('this.props', this.props);
  }

  render = () => {
    console.log('this.props', this.props);
    return <User />;
  };
}

const mapStateToProps = ({ users }) => ({ users });

export default connect(mapStateToProps, { fetchUser })(UserContainer);
