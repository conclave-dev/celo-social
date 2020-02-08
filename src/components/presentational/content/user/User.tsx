import React, { memo } from 'react';
import { Card, CardBody } from 'reactstrap';

const User = ({}: // user,
// score,
// group,
{
  // user: UserType;
  // score: number;
  // group: CandidateGroup;
}) => {
  return (
    <Card>
      <CardBody>
        <div className="card user-wid text-center overflow-hidden">
          <div className="p-4 bg-lighten-danger" />
          <div className="mx-3">
            <div className="bg-white user-wid-content p-1 rounded">
              <div className="user-img">
                <img
                  src="https://media-exp1.licdn.com/dms/image/C5603AQE6LawtcUx-WA/profile-displayphoto-shrink_100_100/0?e=1586390400&v=beta&t=hVjgIpMGlcZEGoDQM-3AR1nXKoxJbjFo1qaTJdM7KGY"
                  alt="user-img"
                  title=""
                  className="rounded-circle thumb-md img-fluid"
                />
              </div>
              <h5 className="font-14 mb-1">
                <span>kp</span>{' '}
              </h5>
              <p className="text-muted mb-2">
                <small>Cofounder</small>
              </p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default memo(User);
