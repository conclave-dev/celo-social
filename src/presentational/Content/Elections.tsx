import React, { memo } from 'react';
import { Row, Col, Card, CardBody, Table } from 'reactstrap';
import fmt from '../../utils/fmt';
import Summary from './Elections/Summary';
import Validator from './Elections/Validator';
import {
  ElectionSummary,
  ElectionValidator,
  ElectionGroup,
} from '../../types/election';

const Elections = memo(
  ({
    epoch,
    block,
    electionSummary,
    electedValidators,
    electedGroups,
  }: {
    epoch: number;
    block: number;
    electionSummary: ElectionSummary;
    electedValidators: {
      byId: { [key: string]: ElectionValidator };
      allIds: string[];
    };
    electedGroups: {
      byId: { [key: string]: ElectionGroup };
      allIds: [];
    };
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
                        {electedValidators.allIds.map(id => {
                          const validator: ElectionValidator =
                            electedValidators.byId[id];

                          return (
                            <Validator
                              key={id}
                              address={id}
                              validator={validator}
                              group={electedGroups.byId[validator.groupAddress]}
                            />
                          );
                        })}
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
