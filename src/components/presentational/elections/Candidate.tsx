import React, { memo } from 'react';
import { Progress } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Anchor from '../reusable/Anchor';
import fmt from '../../../utils/fmt';

const Candidate = ({
  num,
  address,
  name,
  groupVotes,
  groupAddress,
  groupName,
  block,
  candidateUptime,
}) => (
  <tr key={address}>
    <th scope="row">{num}</th>
    <td>{fmt.bigInt(groupVotes)}</td>
    <td>
      <Link to={`/user/${address}`} className="text-primary">
        {name}
      </Link>
    </td>
    <td>
      <div className="team">
        <Anchor
          href={`https://baklava-blockscout.celo-testnet.org/address/${groupAddress}/celo`}
        >
          <span className="text-white text-underline">{groupName}</span>
        </Anchor>
      </div>
    </td>
    <td>
      <Progress multi={true}>
        <Progress
          animated={true}
          bar={true}
          style={{ height: '7.5px' }}
          color="success"
          value={
            candidateUptime[address]
              ? (candidateUptime[address].totalSignatures / (block % 720)) * 100
              : 0
          }
        />
      </Progress>
    </td>
  </tr>
);

const mapStateToProps = ({ elections }) => ({
  block: elections.block,
  candidateUptime: elections.candidateUptime,
});

export default connect(mapStateToProps)(memo(Candidate));
