import React, { memo } from 'react';
import { Alert } from 'reactstrap';
import greenCoin from '../../../../static-assets/images/greenCoin.png';
import redCoin from '../../../../static-assets/images/redCoin.png';

const ClaimStatus = ({ accountName, isClaimed }) => {
  const alert = {
    color: 'danger',
    imgSrc: redCoin,
    text: `${accountName} hasn't claimed this account yet`,
  };

  if (isClaimed) {
    alert.color = 'success';
    alert.imgSrc = greenCoin;
    alert.text = `${accountName} has claimed this account`;
  }

  return (
    <Alert color={alert.color} className={`bg-white border border-${alert.color}`}>
      <img src={alert.imgSrc} width={24} style={{ marginRight: 8 }} />
      {alert.text}
    </Alert>
  );
};

export default memo(ClaimStatus);
