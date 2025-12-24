/**
 * Secure Storage Utilities
 * Handles secure storage of private keys and sensitive data
 * Keys are ONLY given to users for backup, never exposed otherwise
 */

import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONFIG} from '@config';

/**
 * Store private key securely using device keychain
 * Private keys should NEVER be stored in plain text
 */
export const storePrivateKey = async (privateKey: string): Promise<void> => {
  try {
    await Keychain.setGenericPassword(
      CONFIG.SECURE_KEYS.PRIVATE_KEY,
      privateKey,
      {
        service: CONFIG.SECURE_KEYS.PRIVATE_KEY,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      },
    );
  } catch (error) {
    console.error('[storePrivateKey Error]', error);
    throw new Error('Failed to store private key securely');
  }
};

/**
 * Retrieve private key from secure storage
 * Should only be used for transaction signing
 */
export const getPrivateKey = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: CONFIG.SECURE_KEYS.PRIVATE_KEY,
    });

    if (credentials) {
      return credentials.password;
    }

    return null;
  } catch (error) {
    console.error('[getPrivateKey Error]', error);
    return null;
  }
};

/**
 * Store mnemonic phrase securely
 * Only for user backup purposes
 */
export const storeMnemonic = async (mnemonic: string): Promise<void> => {
  try {
    await Keychain.setGenericPassword(
      CONFIG.SECURE_KEYS.MNEMONIC,
      mnemonic,
      {
        service: CONFIG.SECURE_KEYS.MNEMONIC,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      },
    );
  } catch (error) {
    console.error('[storeMnemonic Error]', error);
    throw new Error('Failed to store mnemonic securely');
  }
};

/**
 * Retrieve mnemonic for user backup
 * Should only be displayed to user for backup purposes
 */
export const getMnemonic = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: CONFIG.SECURE_KEYS.MNEMONIC,
    });

    if (credentials) {
      return credentials.password;
    }

    return null;
  } catch (error) {
    console.error('[getMnemonic Error]', error);
    return null;
  }
};

/**
 * Delete all secure credentials
 */
export const deleteSecureCredentials = async (): Promise<void> => {
  try {
    await Keychain.resetGenericPassword({
      service: CONFIG.SECURE_KEYS.PRIVATE_KEY,
    });
    await Keychain.resetGenericPassword({
      service: CONFIG.SECURE_KEYS.MNEMONIC,
    });
  } catch (error) {
    console.error('[deleteSecureCredentials Error]', error);
    throw new Error('Failed to delete secure credentials');
  }
};

/**
 * Store wallet address in AsyncStorage (non-sensitive data)
 */
export const storeWalletAddress = async (address: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(CONFIG.STORAGE_KEYS.WALLET_ADDRESS, address);
  } catch (error) {
    console.error('[storeWalletAddress Error]', error);
    throw new Error('Failed to store wallet address');
  }
};

/**
 * Get wallet address from AsyncStorage
 */
export const getWalletAddress = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(CONFIG.STORAGE_KEYS.WALLET_ADDRESS);
  } catch (error) {
    console.error('[getWalletAddress Error]', error);
    return null;
  }
};

/**
 * Store wallet name
 */
export const storeWalletName = async (name: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(CONFIG.STORAGE_KEYS.WALLET_NAME, name);
  } catch (error) {
    console.error('[storeWalletName Error]', error);
    throw new Error('Failed to store wallet name');
  }
};

/**
 * Get wallet name
 */
export const getWalletName = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(CONFIG.STORAGE_KEYS.WALLET_NAME);
  } catch (error) {
    console.error('[getWalletName Error]', error);
    return null;
  }
};

/**
 * Check if wallet exists
 */
export const hasWallet = async (): Promise<boolean> => {
  try {
    const address = await getWalletAddress();
    const privateKey = await getPrivateKey();
    return !!address && !!privateKey;
  } catch (error) {
    console.error('[hasWallet Error]', error);
    return false;
  }
};

/**
 * Clear all wallet data
 */
export const clearWalletData = async (): Promise<void> => {
  try {
    await deleteSecureCredentials();
    await AsyncStorage.multiRemove([
      CONFIG.STORAGE_KEYS.WALLET_ADDRESS,
      CONFIG.STORAGE_KEYS.WALLET_NAME,
      CONFIG.STORAGE_KEYS.HAS_WALLET,
    ]);
  } catch (error) {
    console.error('[clearWalletData Error]', error);
    throw new Error('Failed to clear wallet data');
  }
};
