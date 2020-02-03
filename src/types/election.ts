export interface ElectionSummary {
  votes: number;
  earnings: number;
  score: number;
}

export interface ElectionValidator {
  name: string;
  authorizedSigners: { [key: string]: string };
  wallet: string;
  metadataURL: string;
  dataEncryptionKey: string;
  score: number;
  uptime: number;
  earnings: number;
  groupAddress: string;
  GetValidatorResponse;
}

export interface ElectionGroup {
  name: string;
  votes: number;
  members: string[];
  commission: number;
  address: string;
}

export interface GetValidatorResponse {
  ecdsaPublicKey: string;
  blsPublicKey: string;
  groupAddress: string;
  signerAddress: string;
  score: number;
}
