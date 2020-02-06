import React, { memo } from 'react';
import { Progress, Table } from 'reactstrap';
import Anchor from '../reusable/Anchor';
import fmt from '../../../utils/fmt';

const Validator = ({
  validatorAddress,
  validatorName,
  groupVotes,
  groupAddress,
  groupName,
}) => (
  <tr key={validatorAddress}>
    <th scope="row">{fmt.bigInt(groupVotes)}</th>
    <td>
      <Anchor
        href={`https://baklava-blockscout.celo-testnet.org/address/${validatorAddress}/celo`}
      >
        {validatorName}
      </Anchor>
    </td>
    <td>
      <div className="team">
        <Anchor
          href={`https://baklava-blockscout.celo-testnet.org/address/${groupAddress}/celo`}
        >
          {groupName}
        </Anchor>
      </div>
    </td>
    <td>
      <span className={`badge badge-soft-success badge-pill`}>{`$0`}</span>
    </td>
    <td>
      <Progress multi={true}>
        <Progress
          animated={true}
          bar={true}
          style={{ height: '7.5px' }}
          color="success"
          value="100"
        />
      </Progress>
    </td>
  </tr>
);

const Validators = ({
  validators,
  groups,
}: {
  validators: any[];
  groups: any[];
}) => {
  return (
    <Table responsive={true} className="project-list">
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
        {
          validators.map(({ address, name, groupAddress }) => {
            const validatorGroup = groups[groupAddress];

            return (
              <Validator
                key={address}
                validatorAddress={address}
                validatorName={name}
                groupVotes={validatorGroup.votes}
                groupAddress={groupAddress}
                groupName={validatorGroup.name}
              />
            );
          })
        }
      </tbody>
    </Table>
  );
};

export default memo(Validators);
