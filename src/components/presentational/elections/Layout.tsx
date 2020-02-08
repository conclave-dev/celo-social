import React, { memo } from 'react';
import { Row, Col } from 'reactstrap';
import fmt from '../../../utils/fmt';

const Layout = ({
  epoch,
  block,
  children,
}: {
  epoch: number;
  block: number;
  children: any;
}) => (
  <div className="content">
    <div className="container-fluid">
      <div className="page-title-box">
        <Row className="align-items-center">
          <Col>
            <h4 className="page-title">Current Election</h4>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Election #{epoch}</li>
              <li className="breadcrumb-item">{`Block #${fmt.int(block)}`}</li>
            </ol>
          </Col>
        </Row>
      </div>
      {children}
    </div>
  </div>
);

export default memo(Layout);
