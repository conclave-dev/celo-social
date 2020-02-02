import {
  api,
  defaultOptions,
} from './config';

const initialState = {
  epoch: 0,
  block: 0,
};

const getBlockNumber = async () => (await fetch(`${api.eth}/getBlockNumber`, defaultOptions)).json();

export {
  initialState,
  getBlockNumber,
};
