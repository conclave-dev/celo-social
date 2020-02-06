import React, { memo } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import ApexSpline from '../charts/ApexSpline';
import Group from './user/Group';
import AccountStats from './user/AccountStats';

const User = () => {
  const props = {
    name: 'stella',
    address: '0x2ee2a7fd94a31cf1e6db3875f4fd3d961b15de17',
  };

  return (
    <>
      <div className="content">
        <div className="container-fluid">
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col>
                <h4 className="page-title">{props.name}</h4>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">Users</li>
                  <li className="breadcrumb-item">Validators</li>
                </ol>
              </Col>
            </Row>
          </div>
          <Row>
            <Col xl="3">
              <Card>
                <CardBody>
                  <div className="card user-wid text-center overflow-hidden">
                    <div className="p-4 bg-lighten-danger" />
                    <div className="mx-3">
                      <div className="bg-white user-wid-content p-1 rounded">
                        <div className="user-img">
                          <img
                            src="https://media-exp1.licdn.com/dms/image/C5603AQE6LawtcUx-WA/profile-displayphoto-shrink_100_100/0?e=1586390400&v=beta&t=hVjgIpMGlcZEGoDQM-3AR1nXKoxJbjFo1qaTJdM7KGY"
                            alt="user-img"
                            title=""
                            className="rounded-circle thumb-md img-fluid"
                          />
                        </div>
                        <h5 className="font-14 mb-1">
                          <span>kp</span>{' '}
                        </h5>
                        <p className="text-muted mb-2">
                          <small>Cofounder</small>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="3">
              <Group />
            </Col>
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
                  <Card>
                    <CardBody>
                      <h4 className="mt-0 header-title">
                        Balance Updates (Last 10 Elections)
                      </h4>
                      <div>
                        <div className="wid-earning">
                          <div className="row">
                            <div className="col-xl-12">
                              <div id="chart1">
                                <ApexSpline />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default memo(User);
