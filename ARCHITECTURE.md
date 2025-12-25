# Project Architecture

## Overview

Gauss Wallet is built following the architecture principles of Rocket.Chat.ReactNative, emphasizing:
- **Modularity**: Clear separation of concerns
- **Type Safety**: TypeScript throughout the codebase
- **Security**: Private keys never leave the device
- **Scalability**: Clean architecture for future enhancements

## Core Architecture Principles

### 1. REST API Communication
- All blockchain interactions happen through REST API calls
- API layer is abstracted in `app/api/blockchainApi.ts`
- Axios is used for HTTP requests with interceptors for logging and error handling

### 2. In-App Transaction Signing
- **Critical Security Feature**: All transaction signing happens locally
- Cryptographic operations in `app/crypto/walletCrypto.ts`
- Uses ethers.js for ECDSA signature generation
- Private keys are retrieved from secure storage only during signing

### 3. Secure Key Management
- Private keys stored using React Native Keychain (hardware-backed when available)
- Keys are only displayed to users for backup purposes
- BIP39 mnemonic phrases for wallet recovery
- Secure storage utilities in `app/utils/secureStorage.ts`

## Directory Structure Explained

### `/app/api`
REST API service layer for blockchain backend communication. Handles:
- Balance queries
- Transaction history retrieval
- Transaction broadcasting
- Nonce and gas price fetching

### `/app/crypto`
Cryptographic utilities for:
- Wallet generation (BIP39/BIP32 HD wallets)
- Mnemonic phrase generation
- Transaction signing (ECDSA)
- Data encryption/decryption

### `/app/utils`
Utility functions including:
- Secure storage (React Native Keychain wrapper)
- Data validation
- Formatting helpers

### `/app/contexts`
React Context providers for state management:
- WalletContext: Manages wallet state and operations
- Future: TransactionContext, SettingsContext

### `/app/navigation`
React Navigation configuration:
- Stack navigator setup
- Route definitions
- Navigation type safety

### `/app/screens`
Screen components following the pattern:
- HomeScreen: Main dashboard
- SendScreen: Transaction sending with local signing
- ReceiveScreen: Display address/QR code
- BackupScreen: Recovery phrase backup
- Settings, History, etc.

### `/app/components`
Reusable UI components (to be expanded):
- Buttons, inputs, cards
- Custom components following design system

### `/app/types`
TypeScript type definitions:
- Wallet types
- Transaction types
- API response types
- Navigation types

### `/app/config`
Application configuration:
- API endpoints
- Constants
- Environment-specific settings

## Data Flow

### Wallet Creation
1. User initiates wallet creation
2. `generateWallet()` creates BIP39 mnemonic and derives keys
3. Private key stored in device keychain
4. Mnemonic stored for backup
5. Public address stored in AsyncStorage
6. Wallet context updated

### Transaction Signing & Sending
1. User enters transaction details
2. App retrieves nonce from blockchain API
3. App creates unsigned transaction object
4. Private key retrieved from secure storage
5. **Transaction signed locally using ECDSA**
6. Signed transaction sent to blockchain API
7. Transaction hash returned and stored

### Balance Check
1. User refreshes balance
2. App calls REST API with wallet address
3. API returns current balance
4. UI updated with new balance

## Security Architecture

### Three-Layer Security Model

1. **Storage Layer**
   - React Native Keychain for private keys (hardware-backed)
   - AsyncStorage for non-sensitive data
   - No keys in plain text

2. **Cryptographic Layer**
   - BIP39 for mnemonic generation
   - BIP32 for HD wallet derivation
   - ECDSA for transaction signing
   - Industry-standard algorithms

3. **API Layer**
   - REST API communication
   - No private keys transmitted
   - Only signed transactions sent to network
   - API validates signatures server-side

## Future Enhancements

- Multi-wallet support
- Biometric authentication
- Hardware wallet integration
- QR code scanning for addresses
- Transaction history caching
- Network switching (mainnet/testnet)
- DApp browser integration
- Token swap integration
