export interface Epoch {
  epochNumber: number;
  epochSize: number;
  currentBlockNumber: number;
  firstBlockNumber: number;
  lastBlockNumber: number;
}

export interface Validator {
  name: string;
  address: string;
  affiliation: string;
  score: string;
  signer: string;
}

export interface Transaction {
  blockHash: string;
  blockNumber: number;
  from: string;
  gas: number;
  gasPrice: string;
  feeCurrency: string;
  gatewayFeeRecipient: string;
  gatewayFee: string;
  hash: string;
  input: string;
  nonce: number;
  to: string;
  transactionIndex: number;
  value: string;
  v: string;
  r: string;
  s: string;
  contractAddress: string;
  cumulativeGasUsed: number;
  gasUsed: number;
  logs: [
    {
      address: string;
      topics: string[];
      data: string;
      blockNumber: number;
      transactionHash: string;
      transactionIndex: number;
      blockHash: string;
      logIndex: number;
      removed: false;
      id: string;
    },
  ];
  logsBloom: string;
  status: boolean;
  transactionHash: string;
}

export interface Block {
  difficulty: string;
  extraData: string;
  gasLimit: number;
  gasUsed: number;
  hash: string;
  logsBloom: string;
  miner: string;
  mixHash: string;
  nonce: string;
  number: number;
  parentHash: string;
  randomNess: {
    committed: string;
    revealed: string;
  };
  transactions: Transaction[];
  uncles: [];
}

export interface ValidatorGroup {
  name: string;
  address: string;
  members: string[];
  commission: number;
  affiliates: string[];
  votes: number;
}

export interface ElectionsProps {
  epoch: Epoch;
  electedValidators: Validator[];
  epochBlocks: Block[];
  earnedMinerFees: { [key: string]: number };
  electedValidatorGroups: { [key: string]: ValidatorGroup };
}

export interface ElectionSummary {
  totalVotes: string;
  totalFeesEarned: string;
  totalMissedSignatures: number;
}

export interface ElectionValidator {
  groupName: string;
  address: string;
  votes: string;
  name: string;
  feesEarned: string;
  blockSignaturePercentage: number;
}
