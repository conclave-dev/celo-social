import { api, defaultOptions } from './config';
import { unpackJSONResponse } from './util';

const validatorSignerToAccount = async (address: string) =>
  await unpackJSONResponse(
    await fetch(`${api.accounts}/validatorSignerToAccount`, {
      ...defaultOptions,
      body: JSON.stringify({ address }),
    }),
  );

const getAccountSummary = async (address: string) =>
  await unpackJSONResponse(
    await fetch(`${api.accounts}/getAccountSummary`, {
      ...defaultOptions,
      body: JSON.stringify({ address }),
    }),
  );

export { validatorSignerToAccount, getAccountSummary };
