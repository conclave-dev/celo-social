import React, { memo } from 'react';
import { Table, Spinner } from 'reactstrap';
import { map, isEmpty } from 'lodash';
import Candidate from './Candidate';

const Candidates = ({
  candidates,
  candidateGroups,
}: {
  block: number;
  candidates: { [key: string]: any };
  candidateGroups: { [key: string]: any };
}) => {
  let rowCount = 0;

  return (
  <>
    <Table responsive={true} className="project-list">
      <thead>
        <tr>
          <th scope="col" style={{ width: '12.5%' }}>
            #
          </th>
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
        {!isEmpty(candidates) ? (
          map(candidates, ({ address, name, groupAddress }) => {
            const group = candidateGroups[groupAddress];

            return (
              <Candidate
                key={address}
                num={++rowCount}
                address={address}
                name={name}
                groupVotes={group.votes}
                groupAddress={groupAddress}
                groupName={group.name}
              />
            );
          })
        ) : (
          <></>
        )}
      </tbody>
    </Table>
    {isEmpty(candidates) && (
      <div className="d-flex justify-content-center">
        <Spinner type="grow" />
      </div>
    )}
  </>
);
}

export default memo(Candidates);
