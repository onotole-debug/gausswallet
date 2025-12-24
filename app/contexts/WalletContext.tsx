/**
 * Wallet Context Provider
 * Manages wallet state and operations
 */

import React, {createContext, useState, useEffect, useContext} from 'react';
import type {WalletContextType, Wallet} from '@types';
import {
  generateWallet,
  importWalletFromMnemonic,
} from '@crypto/walletCrypto';
import {
  storePrivateKey,
  storeMnemonic,
  storeWalletAddress,
  storeWalletName,
  getWalletAddress,
  getWalletName,
  hasWallet as checkHasWallet,
  clearWalletData,
} from '@utils/secureStorage';
import {blockchainApi} from '@api/blockchainApi';

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load wallet on mount
  useEffect(() => {
    loadWallet();
  }, []);

  const loadWallet = async () => {
    try {
      setIsLoading(true);
      const hasExistingWallet = await checkHasWallet();

      if (hasExistingWallet) {
        const address = await getWalletAddress();
        const name = await getWalletName();

        if (address) {
          const walletData: Wallet = {
            address,
            publicKey: address, // For display purposes
            name: name || undefined,
          };

          setWallet(walletData);
          await refreshBalance();
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const createWallet = async (name?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const walletData = await generateWallet();

      // Store securely
      await storePrivateKey(walletData.privateKey);
      if (walletData.mnemonic) {
        await storeMnemonic(walletData.mnemonic);
      }
      await storeWalletAddress(walletData.address);
      if (name) {
        await storeWalletName(name);
      }

      const newWallet: Wallet = {
        address: walletData.address,
        publicKey: walletData.address,
        name,
      };

      setWallet(newWallet);
      await refreshBalance();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create wallet');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const importWallet = async (mnemonic: string, name?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const walletData = await importWalletFromMnemonic(mnemonic);

      // Store securely
      await storePrivateKey(walletData.privateKey);
      await storeMnemonic(walletData.mnemonic!);
      await storeWalletAddress(walletData.address);
      if (name) {
        await storeWalletName(name);
      }

      const newWallet: Wallet = {
        address: walletData.address,
        publicKey: walletData.address,
        name,
      };

      setWallet(newWallet);
      await refreshBalance();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import wallet');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);

      await clearWalletData();
      setWallet(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete wallet');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshBalance = async () => {
    try {
      if (!wallet?.address) return;

      const balanceData = await blockchainApi.getBalance(wallet.address);
      setWallet(prev =>
        prev
          ? {
              ...prev,
              balance: balanceData.balance,
            }
          : null,
      );
    } catch (err) {
      console.error('Failed to refresh balance:', err);
      // Don't set error for balance refresh failures
    }
  };

  return (
    <WalletContext.Provider
      value={{
        wallet,
        isLoading,
        error,
        createWallet,
        importWallet,
        deleteWallet,
        refreshBalance,
      }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};
