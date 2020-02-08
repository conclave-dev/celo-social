import React, { memo } from 'react';
import { Table, Spinner } from 'reactstrap';
import { map, isEmpty } from 'lodash';
import Candidate from './Candidate';

import voteWhite from '../../../static-assets/images/voteWhite.png';
import friendKeyWhite from '../../../static-assets/images/friendKeyWhite.png';
import group from '../../../static-assets/images/group.png';
import cash from '../../../static-assets/images/cash.png';
import checkWhite from '../../../static-assets/images/checkWhite.png';

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
              <img src={voteWhite} width={24} />
            </th>
            <th scope="col" style={{ width: '25%' }}>
              <img src={friendKeyWhite} width={24} />
            </th>
            <th scope="col" style={{ width: '25%' }}>
              <img src={group} width={24} />
            </th>
            <th scope="col" style={{ width: '10%' }}>
              <img src={checkWhite} width={24} />
            </th>
          </tr>
        </thead>
        <tbody>
          {!isEmpty(candidates) ? (
            map(candidates, ({ address, name, groupAddress }) => {
              const candidateGroup = candidateGroups[groupAddress];

              return (
                <Candidate
                  key={address}
                  num={++rowCount}
                  address={address}
                  name={name}
                  groupVotes={candidateGroup.votes}
                  groupAddress={groupAddress}
                  groupName={candidateGroup.name}
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
};

export default memo(Candidates);
