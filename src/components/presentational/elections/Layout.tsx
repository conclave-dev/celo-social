import React, { memo } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  Spinner,
  Container,
} from 'reactstrap';
import fmt from '../../../utils/fmt';
import Summary from './Summary';
import Validators from './Validators';
import {
  Summary as SummaryType,
  Validator as ValidatorType,
  Group as GroupType,
} from '../../../types/election';

const Layout = ({
  epoch,
  block,
  children,
}: {
  epoch: number;
  block: number;
  children: any;
}) => {
  return (
    <div className="content">
      <div className="container-fluid">
        <div className="page-title-box">
          <Row className="align-items-center">
            <Col>
              <h4 className="page-title">Current Election</h4>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Epoch {epoch}</li>
                <li className="breadcrumb-item">Block {fmt.int(block)}</li>
              </ol>
            </Col>
          </Row>
        </div>
        {children}
      </div>
    </div>
  );
};

export default memo(Layout);
