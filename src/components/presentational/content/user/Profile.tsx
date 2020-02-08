import React, { memo } from 'react';
import {
  Card,
  CardBody,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import { Profile } from '../../../../data/state/lib/users';
import woman from '../../../../static-assets/images/woman.png';
import man from '../../../../static-assets/images/man.png';
import edit from '../../../../static-assets/images/edit.png';
import womanLight from '../../../../static-assets/images/womanLight.png';
import manLight from '../../../../static-assets/images/manLight.png';
import contact from '../../../../static-assets/images/contact.png';
import about from '../../../../static-assets/images/about.png';

const User = ({
  profile: { name, photoURL, email, description },
  accountName,
  isClaimed,
}: {
  profile: Profile;
  accountName: string;
  isClaimed: boolean;
}) => {
  const headsTails = Math.random() < 0.5;

  return (
    <Card>
      <div className="p-4 bg-primary" />
      <CardBody>
        <div className="card user-wid text-center overflow-hidden">
          <div className="mx-3">
            <div className="bg-white user-wid-content p-1 rounded">
              <div className="user-img">
                <img
                  src={photoURL || (headsTails ? womanLight : manLight)}
                  width={48}
                  style={{ marginTop: 12, marginBottom: 20 }}
                  alt="user-img"
                  title={`${name}'s profile photo`}
                  className="img-thumbnail thumb-lg img-fluid"
                />
              </div>
              <InputGroup style={{ marginTop: 16, marginBottom: 16 }}>
                <Input
                  disabled={!isClaimed}
                  placeholder={photoURL || 'Photo URL'}
                  style={{ backgroundColor: !isClaimed ? '#2E3338' : '#FFFFFF' }}
                />
              </InputGroup>
              <InputGroup style={{ marginBottom: 16 }} size="lg">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <img src={headsTails ? woman : man} width={24} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  disabled={!isClaimed}
                  placeholder={name || 'Name'}
                  style={{ backgroundColor: !isClaimed ? '#2E3338' : '#FFFFFF' }}
                />
              </InputGroup>
              <InputGroup style={{ marginBottom: 16 }} size="lg">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <img src={contact} width={24} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  disabled={!isClaimed}
                  placeholder={email || 'Contact'}
                  style={{ backgroundColor: !isClaimed ? '#2E3338' : '#FFFFFF' }}
                />
              </InputGroup>
              <InputGroup style={{ marginBottom: 16 }} size="lg">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <img src={about} width={24} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  disabled={!isClaimed}
                  placeholder={description || `About ${accountName}`}
                  type="textarea"
                  name="text"
                  style={{ backgroundColor: !isClaimed ? '#2E3338' : '#FFFFFF' }}
                />
              </InputGroup>
              <Button color="warning" size="lg">
                Save <img src={edit} width={24} />
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default memo(User);
