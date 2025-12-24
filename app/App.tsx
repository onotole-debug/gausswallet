/**
 * Main App Component
 * Gauss Wallet - Cryptocurrency wallet based on Rocket.Chat.ReactNative architecture
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {WalletProvider} from '@contexts/WalletContext';
import RootNavigator from '@navigation/RootNavigator';

const App: React.FC = () => {
  return (
    <WalletProvider>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <RootNavigator />
    </WalletProvider>
  );
};

export default App;
