/**
 * Blockchain API Service
 * Handles all REST API communication with the blockchain backend
 */

import axios, {AxiosInstance} from 'axios';
import {CONFIG} from '@config';
import type {
  ApiResponse,
  BalanceResponse,
  TransactionHistoryResponse,
  BroadcastTransactionResponse,
  SignedTransaction,
} from '@types';

class BlockchainApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: CONFIG.BLOCKCHAIN_API.BASE_URL,
      timeout: CONFIG.BLOCKCHAIN_API.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for logging
    this.api.interceptors.request.use(
      config => {
        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      error => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
      },
    );

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      response => {
        console.log(`[API Response] ${response.status} ${response.config.url}`);
        return response;
      },
      error => {
        console.error('[API Response Error]', error.response?.data || error.message);
        return Promise.reject(error);
      },
    );
  }

  /**
   * Get account balance
   */
  async getBalance(address: string): Promise<BalanceResponse> {
    try {
      const response = await this.api.get<ApiResponse<BalanceResponse>>(
        `${CONFIG.API_ENDPOINTS.BALANCE}/${address}`,
      );

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.error || 'Failed to fetch balance');
    } catch (error) {
      console.error('[getBalance Error]', error);
      throw error;
    }
  }

  /**
   * Get transaction history
   */
  async getTransactionHistory(
    address: string,
    page: number = 1,
    limit: number = 50,
  ): Promise<TransactionHistoryResponse> {
    try {
      const response = await this.api.get<ApiResponse<TransactionHistoryResponse>>(
        `${CONFIG.API_ENDPOINTS.TRANSACTION_HISTORY}/${address}`,
        {
          params: {page, limit},
        },
      );

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.error || 'Failed to fetch transaction history');
    } catch (error) {
      console.error('[getTransactionHistory Error]', error);
      throw error;
    }
  }

  /**
   * Broadcast signed transaction to the network
   */
  async broadcastTransaction(
    signedTransaction: SignedTransaction,
  ): Promise<BroadcastTransactionResponse> {
    try {
      const response = await this.api.post<ApiResponse<BroadcastTransactionResponse>>(
        CONFIG.API_ENDPOINTS.BROADCAST_TRANSACTION,
        signedTransaction,
      );

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.error || 'Failed to broadcast transaction');
    } catch (error) {
      console.error('[broadcastTransaction Error]', error);
      throw error;
    }
  }

  /**
   * Get account nonce for transaction signing
   */
  async getNonce(address: string): Promise<number> {
    try {
      const response = await this.api.get<ApiResponse<{nonce: number}>>(
        `${CONFIG.API_ENDPOINTS.NONCE}/${address}`,
      );

      if (response.data.success && response.data.data) {
        return response.data.data.nonce;
      }

      throw new Error(response.data.error || 'Failed to fetch nonce');
    } catch (error) {
      console.error('[getNonce Error]', error);
      throw error;
    }
  }

  /**
   * Get current gas price
   */
  async getGasPrice(): Promise<string> {
    try {
      const response = await this.api.get<ApiResponse<{gasPrice: string}>>(
        CONFIG.API_ENDPOINTS.GAS_PRICE,
      );

      if (response.data.success && response.data.data) {
        return response.data.data.gasPrice;
      }

      throw new Error(response.data.error || 'Failed to fetch gas price');
    } catch (error) {
      console.error('[getGasPrice Error]', error);
      throw error;
    }
  }
}

export const blockchainApi = new BlockchainApiService();
