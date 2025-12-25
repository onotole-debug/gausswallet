/**
 * TypeScript type definitions for Gauss Wallet
 */

// Wallet Types
export interface Wallet {
  address: string;
  publicKey: string;
  name?: string;
  balance?: string;
}

export interface PrivateKeyData {
  privateKey: string;
  mnemonic?: string;
  address: string;
}

// Transaction Types
export interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: string;
  fee: string;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
  hash?: string;
}

export interface UnsignedTransaction {
  to: string;
  amount: string;
  fee: string;
  nonce: number;
  data?: string;
}

export interface SignedTransaction extends UnsignedTransaction {
  signature: string;
  hash: string;
  from: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface BalanceResponse {
  address: string;
  balance: string;
  currency: string;
}

export interface TransactionHistoryResponse {
  transactions: Transaction[];
  total: number;
  page: number;
}

export interface BroadcastTransactionResponse {
  txHash: string;
  success: boolean;
  message?: string;
}

// Blockchain API Types
export interface BlockchainApiConfig {
  baseUrl: string;
  timeout?: number;
  headers?: Record<string, string>;
}

// Navigation Types
export type RootStackParamList = {
  Home: undefined;
  Send: undefined;
  Receive: undefined;
  TransactionHistory: undefined;
  Settings: undefined;
  Backup: undefined;
  CreateWallet: undefined;
  ImportWallet: undefined;
  TransactionDetails: {transactionId: string};
};

// Storage Types
export interface SecureStorageKeys {
  PRIVATE_KEY: string;
  MNEMONIC: string;
  WALLET_NAME: string;
}

// Context Types
export interface WalletContextType {
  wallet: Wallet | null;
  isLoading: boolean;
  error: string | null;
  createWallet: (name?: string) => Promise<void>;
  importWallet: (mnemonic: string, name?: string) => Promise<void>;
  deleteWallet: () => Promise<void>;
  refreshBalance: () => Promise<void>;
}

export interface TransactionContextType {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  sendTransaction: (to: string, amount: string) => Promise<SignedTransaction>;
  getTransactionHistory: () => Promise<void>;
}
