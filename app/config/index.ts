/**
 * Application Configuration
 */

export const CONFIG = {
  // Blockchain API Configuration
  BLOCKCHAIN_API: {
    BASE_URL: process.env.BLOCKCHAIN_API_URL || 'https://api.gauss.network',
    TIMEOUT: 30000,
  },

  // Security Configuration
  SECURITY: {
    // Minimum password length for wallet encryption
    MIN_PASSWORD_LENGTH: 8,
    // Key derivation iterations
    KEY_DERIVATION_ITERATIONS: 10000,
  },

  // Wallet Configuration
  WALLET: {
    // Default currency symbol
    CURRENCY_SYMBOL: 'GAUSS',
    // Decimal places for balance display
    DECIMAL_PLACES: 8,
    // Default transaction fee
    DEFAULT_FEE: '0.0001',
  },

  // Storage Keys
  STORAGE_KEYS: {
    WALLET_ADDRESS: '@gauss:wallet:address',
    WALLET_NAME: '@gauss:wallet:name',
    HAS_WALLET: '@gauss:wallet:exists',
  },

  // Secure Storage Keys (for react-native-keychain)
  SECURE_KEYS: {
    PRIVATE_KEY: 'gauss_private_key',
    MNEMONIC: 'gauss_mnemonic',
  },

  // API Endpoints
  API_ENDPOINTS: {
    BALANCE: '/balance',
    TRANSACTION_HISTORY: '/transactions',
    BROADCAST_TRANSACTION: '/broadcast',
    NONCE: '/nonce',
    GAS_PRICE: '/gas-price',
  },
};
