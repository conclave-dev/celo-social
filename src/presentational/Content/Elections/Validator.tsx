import React, { memo } from 'react';
import { Progress } from 'reactstrap';

const ElectionValidators = memo(
  ({
    groupName,
    votes,
    name,
    feesEarned,
    blockSignaturePercentage,
  }: {
    groupName: string;
    votes: string;
    name: string;
    feesEarned: string;
    blockSignaturePercentage: number;
  }) => {
    const feesEarnedProps = {
      icon: `mdi mdi-checkbox-${feesEarned ? 'marked-circle' : 'blank-circle-outline'}`,
      iconColor: feesEarned ? 'success' : 'muted',
    };

    let getBlockSignatureProgressColor = 'success';

    if (blockSignaturePercentage < 66.7) {
      getBlockSignatureProgressColor = blockSignaturePercentage >= 33.4 ? 'warning' : 'danger';
    }

    return (
      <tr>
        <td>{votes}</td>
        <td>{name}</td>
        <td>
          <div className="team">{groupName}</div>
        </td>
        <td>
          <span className={`badge badge-soft-${feesEarnedProps.iconColor} badge-pill`}>
            {`$${feesEarned}`}
          </span>
        </td>
        <td>
          <p className="float-right mb-0 ml-3">{`${blockSignaturePercentage}%`}</p>
          <Progress
            className="mt-2"
            style={{ height: '5px' }}
            color={getBlockSignatureProgressColor}
            value={blockSignaturePercentage}
          />
        </td>
      </tr>
    );
  },
);

export default ElectionValidators;
