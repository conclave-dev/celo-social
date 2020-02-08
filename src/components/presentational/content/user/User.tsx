import React, { memo } from 'react';
import { InputGroup, InputGroupAddon, Input, Card, CardBody } from 'reactstrap';
import { Profile } from '../../../../data/state/lib/users';


const User = ({
  profile: { name, photoURL, email },
  accountName,
}: {
  profile: Profile;
  accountName: string;
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
                  src={photoURL}
                  alt="user-img"
                  title={`${name}'s profile photo`}
                  className="rounded-circle thumb-md img-fluid"
                />
              </div>
              <h5 className="font-14 mb-1">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                  <Input placeholder={accountName} />
                </InputGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">y
                  </InputGroupAddon>
                  <Input placeholder={accountName} />
                </InputGroup>
                <span>{`${name}`}</span>
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
