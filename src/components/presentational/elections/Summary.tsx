import React, { memo } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import fmt from '../../../utils/fmt';
import { Summary as SummaryType } from '../../../types/election';

const Summary = memo(({ votes, earnings, uptime }: SummaryType) => (
  <Row>
    <Col xl="4" md="4">
      <Card className="bg-pattern">
        <CardBody>
          <div className="float-right">
            <i className="mdi mdi-vote-outline text-success h4 ml-3" />
          </div>
          <h5 className="font-20 mt-0 pt-1 text-white">{fmt.bigInt(votes)}</h5>
          <p className="text-muted mb-0">Votes</p>
        </CardBody>
      </Card>
    </Col>
    <Col xl="4" md="4">
      <Card className="bg-pattern">
        <CardBody>
          <div className="float-right">
            <i className="mdi mdi-cash-multiple text-success h4 ml-3" />
          </div>
          <h5 className="font-20 mt-0 pt-1 text-white">{`$${earnings}`}</h5>
          <p className="text-muted mb-0">Earnings</p>
        </CardBody>
      </Card>
    </Col>
    <Col xl="4" md="4">
      <Card className="bg-pattern">
        <CardBody>
          <div className="float-right">
            <i className="mdi mdi-progress-upload text-success h4 ml-3" />
          </div>
          <h5 className="font-20 mt-0 pt-1 text-white">{`${uptime}%`}</h5>
          <p className="text-muted mb-0">Uptime</p>
        </CardBody>
      </Card>
    </Col>
  </Row>
));

export default Summary;
