import React, { memo } from 'react';
import { Card, CardBody } from 'reactstrap';
import ApexSpline from '../../charts/ApexSpline';

const Balance = () => (
  <Card>
    <CardBody>
      <h4 className="mt-0 header-title">Balance Updates (Last 10 Elections)</h4>
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
);

export default memo(Balance);
