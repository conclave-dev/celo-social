import React, { memo } from 'react';
import { Alert } from 'reactstrap';

const ClaimStatus = ({ isClaimed }) => {
  const alert = {
    color: 'danger',
    icon: 'off',
    text: 'Account has not been claimed yet',
  };

  if (isClaimed) {
    alert.color = 'success';
    alert.icon = 'check';
    alert.text = 'Account has been claimed by owner';
  }

  return (
    <Alert color={alert.color} className={`bg-${alert.color} text-white`}>
      <i className={`mdi mdi-account-${alert.icon} mr-2`}></i>
      {alert.text}
    </Alert>
  );
};

export default memo(ClaimStatus);
