import { api, defaultOptions } from './config';
import { unpackJSONResponse } from './util';

const getValidator = async address =>
  await unpackJSONResponse(
    await fetch(`${api.validators}/getValidator`, {
      ...defaultOptions,
      body: JSON.stringify({ address: address }),
    }),
  );

const getValidatorGroup = async groupAddress =>
  await unpackJSONResponse(
    await fetch(`${api.validators}/getValidatorGroup`, {
      ...defaultOptions,
      body: JSON.stringify({ groupAddress }),
    }),
  );

export { getValidator, getValidatorGroup };
