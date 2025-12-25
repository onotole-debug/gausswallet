/**
 * Cryptographic Utilities
 * Handles wallet creation, key management, and transaction signing
 */

import * as bip39 from 'bip39';
import {HDNode} from '@ethersproject/hdnode';
import {Wallet as EthersWallet} from '@ethersproject/wallet';
import {keccak256} from '@ethersproject/keccak256';
import CryptoJS from 'crypto-js';
import type {
  PrivateKeyData,
  UnsignedTransaction,
  SignedTransaction,
} from '@types';

/**
 * Generate a new wallet with mnemonic phrase
 */
export const generateWallet = async (): Promise<PrivateKeyData> => {
  try {
    // Generate 12-word mnemonic
    const mnemonic = bip39.generateMnemonic();

    // Derive HD wallet from mnemonic
    const hdNode = HDNode.fromMnemonic(mnemonic);

    // Get the first account (m/44'/60'/0'/0/0 - Ethereum derivation path)
    const wallet = new EthersWallet(hdNode.privateKey);

    return {
      privateKey: wallet.privateKey,
      mnemonic,
      address: wallet.address,
    };
  } catch (error) {
    console.error('[generateWallet Error]', error);
    throw new Error('Failed to generate wallet');
  }
};

/**
 * Import wallet from mnemonic phrase
 */
export const importWalletFromMnemonic = async (
  mnemonic: string,
): Promise<PrivateKeyData> => {
  try {
    // Validate mnemonic
    if (!bip39.validateMnemonic(mnemonic)) {
      throw new Error('Invalid mnemonic phrase');
    }

    // Derive HD wallet from mnemonic
    const hdNode = HDNode.fromMnemonic(mnemonic);

    // Get the first account
    const wallet = new EthersWallet(hdNode.privateKey);

    return {
      privateKey: wallet.privateKey,
      mnemonic,
      address: wallet.address,
    };
  } catch (error) {
    console.error('[importWalletFromMnemonic Error]', error);
    throw error;
  }
};

/**
 * Import wallet from private key
 */
export const importWalletFromPrivateKey = async (
  privateKey: string,
): Promise<PrivateKeyData> => {
  try {
    const wallet = new EthersWallet(privateKey);

    return {
      privateKey: wallet.privateKey,
      address: wallet.address,
    };
  } catch (error) {
    console.error('[importWalletFromPrivateKey Error]', error);
    throw new Error('Invalid private key');
  }
};

/**
 * Sign a transaction with private key
 * This is the core security feature - signing happens locally in the app
 */
export const signTransaction = async (
  transaction: UnsignedTransaction,
  privateKey: string,
): Promise<SignedTransaction> => {
  try {
    const wallet = new EthersWallet(privateKey);

    // Create transaction object
    const tx = {
      to: transaction.to,
      value: transaction.amount,
      gasLimit: transaction.fee,
      nonce: transaction.nonce,
      data: transaction.data || '0x',
    };

    // Sign transaction
    const signedTx = await wallet.signTransaction(tx);

    // Compute transaction hash using keccak256 (Ethereum standard)
    const hash = keccak256(signedTx);

    return {
      ...transaction,
      signature: signedTx,
      hash,
      from: wallet.address,
    };
  } catch (error) {
    console.error('[signTransaction Error]', error);
    throw new Error('Failed to sign transaction');
  }
};

/**
 * Verify a signature
 * Note: This verifies a signed message, not a transaction signature
 * For transaction verification, the blockchain backend should verify the signature
 */
export const verifySignature = (
  message: string,
  signature: string,
  address: string,
): boolean => {
  try {
    const recoveredAddress = EthersWallet.verifyMessage(message, signature);
    return recoveredAddress.toLowerCase() === address.toLowerCase();
  } catch (error) {
    console.error('[verifySignature Error]', error);
    return false;
  }
};

/**
 * Encrypt sensitive data
 */
export const encryptData = (data: string, password: string): string => {
  return CryptoJS.AES.encrypt(data, password).toString();
};

/**
 * Decrypt sensitive data
 */
export const decryptData = (encryptedData: string, password: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, password);
  return bytes.toString(CryptoJS.enc.Utf8);
};

/**
 * Validate Ethereum-like address
 */
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};
