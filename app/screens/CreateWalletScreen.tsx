/**
 * Create Wallet Screen
 * Allows users to create a new wallet
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '@types';
import {useWallet} from '@contexts/WalletContext';

type CreateWalletScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateWallet'
>;

const CreateWalletScreen: React.FC = () => {
  const navigation = useNavigation<CreateWalletScreenNavigationProp>();
  const {createWallet, isLoading} = useWallet();
  const [walletName, setWalletName] = useState('');

  const handleCreateWallet = async () => {
    try {
      await createWallet(walletName || 'My Wallet');
      Alert.alert(
        'Success',
        'Wallet created successfully! Please backup your recovery phrase.',
        [
          {
            text: 'OK',
            onPress: () => navigation.replace('Home'),
          },
        ],
      );
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Failed to create wallet',
      );
    }
  };

  const handleImportWallet = () => {
    navigation.navigate('ImportWallet');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Wallet</Text>
      <Text style={styles.description}>
        Create a new wallet to start using Gauss Wallet. You will receive a
        recovery phrase to backup your wallet.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Wallet Name (optional)"
        placeholderTextColor="#666"
        value={walletName}
        onChangeText={setWalletName}
      />

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleCreateWallet}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#0f0f23" />
        ) : (
          <Text style={styles.buttonText}>Create Wallet</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={handleImportWallet}
        disabled={isLoading}>
        <Text style={styles.secondaryButtonText}>Import Existing Wallet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 24,
  },
  input: {
    backgroundColor: '#1a1a2e',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00d4ff',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#0f0f23',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00d4ff',
  },
  secondaryButtonText: {
    color: '#00d4ff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateWalletScreen;
