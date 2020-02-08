import React, { memo } from 'react';
import { Row, Col } from 'reactstrap';
import AccountStats from './user/AccountStats';

const Layout = ({
  profileName,
  accountName,
  User,
  Claim,
  Balance,
}: {
  profileName:string;
  accountName:string;
  User: any;
  Claim: any;
  Balance: any;
}) => {
  return (
    <div className="content">
      <div className="container-fluid">
        <div className="page-title-box">
          <Row className="align-items-center">
            <Col sm="6">
              <h4 className="page-title">{profileName}</h4>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Users</li>
                <li className="breadcrumb-item">Validators</li>
                <li className="breadcrumb-item">{accountName}</li>
              </ol>
            </Col>
            <Col sm="6">
              <div className="float-right d-none d-md-block">
                <Claim />
              </div>
            </Col>
          </Row>
        </div>
        <Row>
          <Col xl="3">
            <User />
          </Col>
          <Col xl="3" />
          <Col xl="6">
            <Row>
              <Col lg="4">
                <AccountStats
                  icon="mdi mdi-vote-outline"
                  status="primary"
                  primaryType="Votes"
                  primaryAmount="14,602"
                  secondaryType=""
                  secondaryAmount="+608 (4.31%)"
                />
              </Col>
              <Col lg="4">
                <AccountStats
                  icon="mdi mdi-safe"
                  status="warning"
                  primaryType="Gold"
                  primaryAmount="64,602"
                  secondaryType=""
                  secondaryAmount="+3,523 (5.25%)"
                />
              </Col>
              <Col lg="4">
                <AccountStats
                  icon="mdi mdi-cash"
                  status="success"
                  primaryType="Dollars"
                  primaryAmount="$104,602"
                  secondaryType=""
                  secondaryAmount="-2,262 (1.76%)"
                />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <Balance />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default memo(Layout);
