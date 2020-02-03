import { apiFetch } from './util';

const validatorSignerToAccount = (blockNumber: number, address: string) =>
  apiFetch('/accounts/validatorSignerToAccount', {
    opts: { blockNumber },
    address,
  });

const getAccountSummary = (blockNumber: number, address: string) =>
  apiFetch('/accounts/getAccountSummary', {
    opts: { blockNumber },
    address,
  });

const getMetadataURL = (blockNumber: number, address: string) =>
  apiFetch('/accounts/getMetadataURL', {
    opts: { blockNumber },
    address,
  });

export { validatorSignerToAccount, getAccountSummary, getMetadataURL };
