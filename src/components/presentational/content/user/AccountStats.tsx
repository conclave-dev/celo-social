import React, { memo } from 'react';
import { Card, CardBody, Table, Col } from 'reactstrap';

const AccountStats = ({
  icon = 'mdi mdi-vote-outline',
  status = 'success',
  primaryType,
  primaryAmount,
  secondaryType,
  secondaryAmount,
}) => (
  <Card>
    <CardBody className="mini-stat-img">
      <div className="mini-stat-icon">
        <i className={`${icon} text-${status} float-right h4`}></i>
      </div>
      <h6 className="text-uppercase mb-3 mt-0">{primaryType}</h6>
      <h5 className="mb-3">{primaryAmount}</h5>
      <p className="text-muted mb-0">
        <span className={`text-${status} mr-2`}>
          {secondaryAmount}
        </span>{' '}
        {secondaryType}
      </p>
    </CardBody>
  </Card>
);

export default memo(AccountStats);
