export interface Summary {
  votes: number;
  earnings: number;
  uptime: number;
}

export interface Validator {
  address: string;
  groupAddress: string;
  signerIndex: number;
  score: number;
  name: string;
}

export interface Group {
  name: string;
  address: string;
  members: string[];
  votes: number;
}
