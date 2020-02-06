import React, { memo } from 'react';
import { Table } from 'reactstrap';

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

const GroupMember = ({ position = 1, isElected, member, uptime }) => {
  let color = 'muted';

  if (member) {
    color = getMemberColor(uptime);
  }

  return (
    <tr className={`text-${color}`}>
      <td style={{ borderTop: 'none' }}>
        <span>#{position}</span>{' '}
      </td>
      <td style={{ borderTop: 'none' }}>
        <div className="d-flex text-truncate">
          <span
            className={`badge badge-soft-${color}`}
            style={{ paddingTop: 3, paddingBottom: 3 }}
          >
            <i className="mdi mdi-checkbox-blank-circle mr-1" />
            <span>{`${isElected ? 'Elected' : 'Idle'}`}</span>
          </span>
        </div>
      </td>
      <td className="text-truncate" style={{ borderTop: 'none' }}>
        <span>{`${member || 'None'}`}</span>
      </td>
      <td style={{ borderTop: 'none' }}>
        <div className="d-flex justify-content-center text-truncate">
          <span>{`${uptime}`}</span>
          <i className="mdi mdi-16px mdi-progress-upload ml-2" />
        </div>
      </td>
    </tr>
  );
};

const GroupMembers = () => (
  <Table responsive={true}>
    <tbody>
      <GroupMember position={1} isElected={true} member="stella" uptime={99} />
      <GroupMember position={2} isElected={true} member="bmass" uptime={99} />
      <GroupMember
        position={3}
        isElected={true}
        member="pretoria-c"
        uptime={99}
      />
      <GroupMember position={4} isElected={false} member="" uptime={0} />
      <GroupMember position={5} isElected={false} member="" uptime={0} />
    </tbody>
  </Table>
);

export default memo(GroupMembers);
