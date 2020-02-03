import React, { memo } from 'react';
import { map } from 'lodash';
import { Row, Col, Card, CardBody, Table } from 'reactstrap';
import Summary from './Elections/Summary';
import Validator from './Elections/Validator';
import { ElectionSummary, ElectionValidator } from '../../types/election';

const Elections = memo(
  ({
    epoch,
    block,
    validators,
    electionValidators,
  }: {
    epoch: number;
    block: number;
    validators: any;
    electionValidators: { [key: string]: ElectionValidator };
  }) => (
    <>
      <div className="content">
        <div className="container-fluid">
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col>
                <h4 className="page-title">Current Election</h4>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">Epoch {epoch}</li>
                  <li className="breadcrumb-item">Block {block}</li>
                </ol>
              </Col>
            </Row>
          </div>
          <Summary {...validators} />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="table-responsive project-list">
                    <Table>
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: '12.5%' }}>
                            <i className="mdi mdi-18px mdi-vote text-white mr-2" />
                          </th>
                          <th scope="col" style={{ width: '25%' }}>
                            <i className="mdi mdi-18px mdi-account text-white mr-2" />
                          </th>
                          <th scope="col" style={{ width: '25%' }}>
                            <i className="mdi mdi-18px mdi-account-supervisor-circle text-white mr-2" />
                          </th>
                          <th scope="col" style={{ width: '12.5%' }}>
                            <i className="mdi mdi-18px mdi-cash-multiple text-white mr-2" />
                          </th>
                          <th scope="col" style={{ width: '10%' }}>
                            <i className="mdi mdi-18px mdi-progress-upload text-white mr-2" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {map(
                          electionValidators,
                          (validator: ElectionValidator) => (
                            <Validator key={validator.address} {...validator} />
                          ),
                        )}
                      </tbody>
                    </Table>
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
