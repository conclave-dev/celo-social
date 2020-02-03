import {
  api,
  defaultOptions,
} from './config';
import { unpackJSONResponse } from './util';

const getBlockNumber = async () => await unpackJSONResponse(await fetch(`${api.eth}/getBlockNumber`, defaultOptions));

const getBlockByNumber = async (blockNumber) => await unpackJSONResponse(await fetch(`${api.eth}/getBlockByNumber`, {
  ...defaultOptions,
  body: JSON.stringify({ opts: { blockNumber } })
}));

export {
  getBlockNumber,
  getBlockByNumber,
};
