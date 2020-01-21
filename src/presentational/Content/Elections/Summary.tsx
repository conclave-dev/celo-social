import React, { memo } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { ElectionSummary } from '../../../types/elections';

const Summary = memo(({ totalVotes, totalFeesEarned, totalMissedSignatures }: ElectionSummary) => (
  <Row>
    <Col xl="4" md="4">
      <Card className="bg-pattern">
        <CardBody>
          <div className="float-right">
            <i className="fas fa-vote-yea text-primary h4 ml-3" />
          </div>
          <h5 className="font-20 mt-0 pt-1">{totalVotes}</h5>
          <p className="text-muted mb-0">Total Votes</p>
        </CardBody>
      </Card>
    </Col>
    <Col xl="4" md="4">
      <Card className="bg-pattern">
        <CardBody>
          <div className="float-right">
            <i className="fas fa-donate text-success h4 ml-3" />
          </div>
          <h5 className="font-20 mt-0 pt-1">${totalFeesEarned}</h5>
          <p className="text-muted mb-0">Total Fees Earned</p>
        </CardBody>
      </Card>
    </Col>
    <Col xl="4" md="4">
      <Card className="bg-pattern">
        <CardBody>
          <div className="float-right">
            <i className="fas fa-file-signature text-danger h4 ml-3" />
          </div>
          <h5 className="font-20 mt-0 pt-1">{totalMissedSignatures}</h5>
          <p className="text-muted mb-0">Total Missed Signatures</p>
        </CardBody>
      </Card>
    </Col>
  </Row>
));

export default Summary;
