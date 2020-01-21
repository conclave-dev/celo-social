import React, { memo } from 'react';
import { map } from 'lodash';
import { Row, Col, Card, CardBody } from 'reactstrap';
import Summary from './Elections/Summary';
import Validator from './Elections/Validator';
import { ElectionSummary, ElectionValidator } from '../../types/elections';

const Elections = memo(
  ({
    currentEpochNumber,
    currentBlockNumber,
    electionSummary,
    electedValidators,
  }: {
    currentEpochNumber: number;
    currentBlockNumber: number;
    electionSummary: ElectionSummary;
    electedValidators: { [key: string]: ElectionValidator };
  }) => (
    <>
      <div className="content">
        <div className="container-fluid">
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col>
                <h4 className="page-title">Current Election</h4>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">Epoch {currentEpochNumber}</li>
                  <li className="breadcrumb-item">Block {currentBlockNumber}</li>
                </ol>
              </Col>
            </Row>
          </div>
          <Summary {...electionSummary} />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="table-responsive project-list">
                    <table className="table project-table">
                      <thead>
                        <tr>
                          <th scope="col">
                            <i className="fas fa-vote-yea" />
                          </th>
                          <th scope="col">
                            <i className="fas fa-users" />
                          </th>
                          <th scope="col">
                            <i className="fas fa-user" />
                          </th>
                          <th scope="col">
                            <i className="fas fa-donate" />
                          </th>
                          <th scope="col" style={{ width: '20%' }}>
                            <i className="fas fa-file-signature" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {map(electedValidators, (validator: ElectionValidator) => (
                          <Validator key={validator.address} {...validator} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  ),
);

export default Elections;
