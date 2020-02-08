import React, { memo } from 'react';
import {
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Table,
} from 'reactstrap';

const Group = ({ children}) => {
  return (
    <Card>
      <CardBody>
        <div className="dflex justify-content-center">
          <h4 className="mt-0 header-title mb-4">Affiliated Group</h4>
          <Nav tabs={true}>
            <NavItem>
              <NavLink onClick={null}>Stats</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="active" onClick={null}>
                Members
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={null}>Activity</NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={0}>
            <TabPane tabId={0} className="p-3">
              <Table responsive={true}>
                <tbody>{children}</tbody>
              </Table>
            </TabPane>
          </TabContent>
        </div>
      </CardBody>
    </Card>
  );
};

export default memo(Group);
