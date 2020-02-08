import React, { memo } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import fmt from '../../../utils/fmt';
import { Summary as SummaryType } from '../../../types/election';
import vote from '../../../static-assets/images/vote.png';
import cash from '../../../static-assets/images/cash.png';
import check from '../../../static-assets/images/check.png';

const Summary = memo(({ votes, earnings, uptime }: SummaryType) => (
  <Row>
    <Col xl="4" md="4">
      <Card className="bg-green">
        <CardBody>
          <div className="float-right">
            <img src={vote} width={48} />
          </div>
          <h5 className="font-20 mt-0 pt-1 text-white">{fmt.bigInt(votes)}</h5>
          <p className="text-muted mb-0">Total Votes</p>
        </CardBody>
      </Card>
    </Col>
    <Col xl="4" md="4">
      <Card className="bg-red">
        <CardBody>
          <div className="float-right">
            <img src={cash} width={48} />
          </div>
          <h5 className="font-20 mt-0 pt-1 text-white">{`$${earnings}`}</h5>
          <p className="text-muted mb-0">Epoch Rewards</p>
        </CardBody>
      </Card>
    </Col>
    <Col xl="4" md="4">
      <Card className="bg-gold">
        <CardBody>
          <div className="float-right">
            <img src={check} width={48} />
          </div>
          <h5 className="font-20 mt-0 pt-1 text-white">{`${uptime}%`}</h5>
          <p className="text-muted mb-0">Average Uptime</p>
        </CardBody>
      </Card>
    </Col>
  </Row>
));

export default Summary;
