import { apiFetch, defaultOptions } from './util';

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

export { getValidator, getValidatorGroup };
