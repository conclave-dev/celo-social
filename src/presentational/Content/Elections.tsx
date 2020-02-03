import React, { memo } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  Spinner,
  Container,
} from 'reactstrap';
import fmt from '../../utils/fmt';
import Summary from './Elections/Summary';
import Validators from './Elections/Validators';
import {
  Summary as SummaryType,
  Validator as ValidatorType,
  Group as GroupType,
} from '../../types/election';

const Elections = ({
  epoch,
  block,
  electionSummary,
  electedValidators,
  electedGroups,
}: {
  epoch: number;
  block: number;
  electionSummary: SummaryType;
  electedValidators: ValidatorType[];
  electedGroups: { [key: string]: GroupType };
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
        <Summary {...electionSummary} />
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                {electedValidators.length && electionSummary.votes ? (
                  <Validators
                    validators={electedValidators}
                    groups={electedGroups}
                  />
                ) : (
                  <Container className="d-flex justify-content-center align-items-center">
                    <Spinner type="grow" color="success" />
                  </Container>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default memo(Elections);
