import { apiFetch } from './util';

const getValidator = (blockNumber: number, address: string) =>
  apiFetch('/validators/getValidator', {
    opts: { blockNumber },
    address,
  });

const getValidatorGroup = (blockNumber: number, groupAddress: string) =>
  apiFetch('/validators/getValidatorGroup', {
    opts: { blockNumber },
    groupAddress,
  });

const getElectedValidatorsOverview = (blockNumber: number) => {
  console.log('blockNumber', blockNumber);

  return apiFetch('/validators/getElectedValidatorsOverview', {
    opts: { blockNumber },
  });
}

const getValidatorGroupsOverviewByAccounts = (
  blockNumber: number,
  groupAddresses: string[],
) =>
  apiFetch('/validators/getValidatorGroupsOverviewByAccounts', {
    opts: { blockNumber },
    groupAddresses,
  });

export {
  getValidator,
  getValidatorGroup,
  getElectedValidatorsOverview,
  getValidatorGroupsOverviewByAccounts,
};
