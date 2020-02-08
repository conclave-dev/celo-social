export interface User {
  hash: string;
  profile: Profile;
  accountSummary: AccountSummary;
  metadata: Metadata;
}

export interface Profile {
  name: string;
  photoURL: string;
  email: string;
  description: string;
  members: [];
}

export interface AccountSummary {
  address: string;
  authorizedSigners: {};
  dataEncryptionKey: string;
  name?: string;
  metadataURL?: string;
}

export interface Metadata {
  claims: Claim[];
  meta: Meta;
}

export interface Claim {
  type: string;
  timestamp: number;
  address?: string;
  domain?: string;
  url?: string;
  name?: string;
}

export interface Meta {
  address: string;
  signature: string;
}
