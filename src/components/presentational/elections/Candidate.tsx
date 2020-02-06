import React, { memo } from 'react';
import { Progress, } from 'reactstrap';
import { connect } from 'react-redux';
import Anchor from '../reusable/Anchor';
import fmt from '../../../utils/fmt';

const Candidate = ({ address, name, groupVotes, groupAddress, groupName, block, candidateUptime }) => {
  return (
    <tr key={address}>
      <th scope="row">{fmt.bigInt(groupVotes)}</th>
      <td>
        <Anchor
          href={`https://baklava-blockscout.celo-testnet.org/address/${address}/celo`}
        >
          {name}
        </Anchor>
      </td>
      <td>
        <div className="team">
          <Anchor
            href={`https://baklava-blockscout.celo-testnet.org/address/${groupAddress}/celo`}
          >
            {groupName}
          </Anchor>
        </div>
      </td>
      <td>
        <span className={`badge badge-soft-success badge-pill`}>{`$0`}</span>
      </td>
      <td>
        <Progress multi={true}>
          <Progress
            animated={true}
            bar={true}
            style={{ height: '7.5px' }}
            color="success"
            value={candidateUptime[address] ? (candidateUptime[address].totalSignatures / (block % 720)) * 100 : 0 }
          />
        </Progress>
      </td>
    </tr>
  )
};

const mapStateToProps = ({ elections: { election } }) => ({
  block: election.block,
  candidateUptime: election.candidateUptime,
});

export default connect(mapStateToProps)(memo(Candidate));
