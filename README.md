# Gauss Wallet

Gauss Wallet is the native wallet for the Gauss and MEGA Dex ecosystem, built on the fast and reliable SDBFT consensus. It is your single window into the world of decentralized finance, combining secure storage, instant transfers, and built-in trading.

## Architecture

This project is built based on the [Rocket.Chat.ReactNative](https://github.com/RocketChat/Rocket.Chat.ReactNative) architecture and technologies, providing a robust and scalable foundation for a cryptocurrency wallet application.

### Key Technologies

- **React Native 0.72.6** - Cross-platform mobile development
- **TypeScript** - Type-safe development
- **React Navigation** - Navigation management
- **Axios** - REST API communication with blockchain backend
- **Ethers.js** - Cryptographic operations and transaction signing
- **BIP39/BIP32** - Mnemonic phrase generation and HD wallet derivation
- **React Native Keychain** - Secure storage for private keys

## Features

### ✅ Blockchain Backend Integration
- Full REST API communication with blockchain backend
- Balance checking
- Transaction history
- Transaction broadcasting
- Nonce and gas price retrieval

### ✅ Secure Transaction Signing
- **All transaction signing happens locally inside the app**
- Private keys never leave the device
- HD wallet support with BIP39 mnemonic phrases
- Secure key storage using device keychain

### ✅ Key Management
- **Private keys are ONLY given to users for backup purposes**
- Secure storage using React Native Keychain
- 12-word mnemonic phrase generation
- Wallet import/export functionality
- Recovery phrase backup with security warnings

## Project Structure

```
gausswallet/
├── app/
│   ├── api/              # REST API services for blockchain communication
│   │   └── blockchainApi.ts
│   ├── components/       # Reusable UI components
│   ├── config/          # App configuration
│   │   └── index.ts
│   ├── contexts/        # React contexts for state management
│   │   └── WalletContext.tsx
│   ├── crypto/          # Cryptographic utilities
│   │   └── walletCrypto.ts
│   ├── hooks/           # Custom React hooks
│   ├── navigation/      # Navigation configuration
│   │   └── RootNavigator.tsx
│   ├── screens/         # App screens
│   │   ├── HomeScreen.tsx
│   │   ├── SendScreen.tsx
│   │   ├── ReceiveScreen.tsx
│   │   ├── BackupScreen.tsx
│   │   ├── CreateWalletScreen.tsx
│   │   ├── ImportWalletScreen.tsx
│   │   ├── TransactionHistoryScreen.tsx
│   │   ├── TransactionDetailsScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/           # Utility functions
│   │   └── secureStorage.ts
│   └── App.tsx          # Main app component
├── android/             # Android native code (to be generated)
├── ios/                 # iOS native code (to be generated)
├── package.json
├── tsconfig.json
├── babel.config.js
└── metro.config.js
```

## Setup Instructions

### Prerequisites

- Node.js >= 18
- React Native development environment
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and JDK

### Installation

1. Clone the repository:
```bash
git clone https://github.com/onotole-debug/gausswallet.git
cd gausswallet
```

2. Install dependencies:
```bash
npm install
```

3. For iOS, install CocoaPods dependencies:
```bash
cd ios && pod install && cd ..
```

4. Configure environment variables (optional):
Create a `.env` file in the root directory:
```
BLOCKCHAIN_API_URL=https://api.gauss.network
```

### Running the App

#### iOS
```bash
npm run ios
```

#### Android
```bash
npm run android
```

#### Start Metro Bundler
```bash
npm start
```

## Development

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

### Testing
```bash
npm test
```

## Security Features

### 🔐 Private Key Security
- Private keys are stored using React Native Keychain with hardware-backed storage when available
- Keys are encrypted and only accessible when the device is unlocked
- Private keys are NEVER sent to any server
- Keys are only displayed to users during backup operations

### 🔐 Transaction Signing
- All transactions are signed locally on the device
- Signature generation uses industry-standard ECDSA
- Transaction data is validated before signing
- Signed transactions are broadcast via REST API

### 🔐 Mnemonic Backup
- 12-word BIP39 mnemonic phrases for wallet recovery
- Security warnings displayed before revealing recovery phrase
- Encourages offline storage of backup phrases

## API Integration

The wallet communicates with the blockchain backend through REST API endpoints:

- `GET /balance/:address` - Get account balance
- `GET /transactions/:address` - Get transaction history
- `POST /broadcast` - Broadcast signed transaction
- `GET /nonce/:address` - Get account nonce
- `GET /gas-price` - Get current gas price

All transaction signing happens in the app, ensuring the backend never has access to private keys.

## Contributing

Contributions are welcome! Please ensure all code follows the existing style and includes appropriate TypeScript types.

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub.

---

**⚠️ Security Notice**: This is a cryptocurrency wallet. Always ensure you have backed up your recovery phrase before using real funds. Never share your private keys or recovery phrase with anyone.
