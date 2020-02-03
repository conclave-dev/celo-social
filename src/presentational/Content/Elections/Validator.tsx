import React, { memo } from 'react';
import { Progress } from 'reactstrap';
import Anchor from '../../Reusable/Anchor';
import fmt from '../../../utils/fmt';
import { ElectionValidator, ElectionGroup } from '../../../types/election';

const ElectionValidators = memo(
  ({
    address,
    validator: { uptime = 0, earnings = 0, name: validatorName, groupAddress },
    group: { votes, name: groupName },
  }: {
    address: string;
    validator: ElectionValidator;
    group: ElectionGroup;
  }) => {
    let uptimeProgressColor = 'success';

    if (uptime < 66.7) {
      uptimeProgressColor = uptime >= 33.4 ? 'warning' : 'danger';
    }

    return (
      <tr>
        <td>{fmt.bigInt(votes)}</td>
        <td>
          <Anchor
            href={`https://baklava-blockscout.celo-testnet.org/address/${address}/celo`}
          >
            {validatorName}
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
          <span className={`badge badge-soft-success badge-pill`}>
            {`$${earnings}`}
          </span>
        </td>
        <td>
          <Progress multi>
            <Progress
              animated
              bar
              style={{ height: '7.5px' }}
              color="success"
              value="28"
            />
            <Progress
              animated
              bar
              style={{ height: '7.5px' }}
              color="danger"
              value="6"
            />
            <Progress
              animated
              bar
              style={{ height: '7.5px' }}
              color="success"
              value="66"
            />
          </Progress>
        </td>
      </tr>
    );
  },
);

export default ElectionValidators;
