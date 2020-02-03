import { Promise } from 'bluebird';
import { api, defaultOptions } from './config';
import { unpackJSONResponse } from './util';

const getCurrentValidatorSigners = async (blockNumber: number = 0) =>
  await unpackJSONResponse(
    await fetch(`${api.election}/getCurrentValidatorSigners`, {
      ...defaultOptions,
      body: JSON.stringify({
        opts: { ...(blockNumber ? { blockNumber } : {}) },
      }),
    }),
  );

const getGroupVoteStatus = async (
  blockNumber: number = 0,
  groupAddress: string,
) =>
  await unpackJSONResponse(
    await fetch(`${api.election}/getGroupVoteStatus`, {
      ...defaultOptions,
      body: JSON.stringify({
        opts: { ...(blockNumber ? { blockNumber } : {}) },
        groupAddress,
      }),
    }),
  );

export { getCurrentValidatorSigners, getGroupVoteStatus };
