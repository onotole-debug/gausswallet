/**
 * Root Navigation Configuration
 * Based on React Navigation stack pattern from Rocket.Chat.ReactNative
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import type {RootStackParamList} from '@types';

// Import screens
import HomeScreen from '@screens/HomeScreen';
import SendScreen from '@screens/SendScreen';
import ReceiveScreen from '@screens/ReceiveScreen';
import TransactionHistoryScreen from '@screens/TransactionHistoryScreen';
import SettingsScreen from '@screens/SettingsScreen';
import BackupScreen from '@screens/BackupScreen';
import CreateWalletScreen from '@screens/CreateWalletScreen';
import ImportWalletScreen from '@screens/ImportWalletScreen';
import TransactionDetailsScreen from '@screens/TransactionDetailsScreen';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1a1a2e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Gauss Wallet'}}
        />
        <Stack.Screen
          name="CreateWallet"
          component={CreateWalletScreen}
          options={{title: 'Create Wallet'}}
        />
        <Stack.Screen
          name="ImportWallet"
          component={ImportWalletScreen}
          options={{title: 'Import Wallet'}}
        />
        <Stack.Screen
          name="Send"
          component={SendScreen}
          options={{title: 'Send'}}
        />
        <Stack.Screen
          name="Receive"
          component={ReceiveScreen}
          options={{title: 'Receive'}}
        />
        <Stack.Screen
          name="TransactionHistory"
          component={TransactionHistoryScreen}
          options={{title: 'Transaction History'}}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{title: 'Settings'}}
        />
        <Stack.Screen
          name="Backup"
          component={BackupScreen}
          options={{title: 'Backup Wallet'}}
        />
        <Stack.Screen
          name="TransactionDetails"
          component={TransactionDetailsScreen}
          options={{title: 'Transaction Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
