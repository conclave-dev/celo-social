import React, { memo } from 'react';
import fmt from '../../../../utils/fmt';

const getMemberColor = uptime => {
  switch (true) {
    case uptime >= 90:
      return 'success';
    case uptime >= 70:
      return 'warning';
    default:
      return 'danger';
  }
};

const GroupMember = ({ position, member, uptime }) => {
  let color = 'muted';

  if (member) {
    color = getMemberColor(uptime);
  }

  return (
    <tr className={`text-${color}`}>
      <td style={{ borderTop: 'none' }}>
        <span>#{position}</span>{' '}
      </td>
      <td className="text-truncate" style={{ borderTop: 'none' }}>
        <span>{`${member || 'None'}`}</span>
      </td>
      <td style={{ borderTop: 'none' }}>
        <div className="d-flex justify-content-center text-truncate">
          <span>{fmt.bigInt(uptime)}</span>
          <i className="mdi mdi-16px mdi-progress-upload ml-2" />
        </div>
      </td>
    </tr>
  );
};

export default memo(GroupMember);
