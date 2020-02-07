import { apiFetch } from './util';

const getBlockNumber = () => apiFetch('/eth/getBlockNumber');

const getBlockByNumber = (blockNumber: number) =>
  apiFetch('/eth/getBlockByNumber', {
    opts: { blockNumber },
  });

export { getBlockNumber, getBlockByNumber };
