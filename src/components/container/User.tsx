import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import User from '../presentational/content/user/User';
import Group from '../presentational/content/user/Group';
import GroupMember from '../presentational/content/user/GroupMember';
import Balance from '../presentational/content/user/Balance';
import ClaimStatus from '../presentational/content/user/ClaimStatus';
import Layout from '../presentational/content/Layout';
import { fetchUser } from '../../data/state/actions/users';
import { User as UserType } from '../../data/state/lib/users';

class UserContainer extends PureComponent<{
  users: UserType;
  candidates;
  candidateGroups;
  fetchUser;
}> {
  constructor(props) {
    super(props);
    props.fetchUser(props.match.params.userID);
  }

  render = () => {
    const {
      users: { accountSummary, hash, profile },
    } = this.props;

    if (!accountSummary.address) {
      return <div />;
    }

    const WrappedUser = () => <User profile={profile} accountName={accountSummary.name} />;
    const WrappedClaimStatus = () => <ClaimStatus isClaimed={!!hash} />;
    const WrappedBalance = () => <Balance />;

    return (
      <Layout
        profileName={profile.name}
        accountName={accountSummary.name}
        User={WrappedUser}
        Claim={WrappedClaimStatus}
        Balance={WrappedBalance}
      />
    );
  };
}

const mapStateToProps = ({ users, elections }) => ({
  users,
  candidates: elections.candidates,
  candidateGroups: elections.candidateGroups,
});

export default connect(mapStateToProps, { fetchUser })(UserContainer);
