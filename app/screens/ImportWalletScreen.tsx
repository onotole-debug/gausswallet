/**
 * Import Wallet Screen
 * Allows users to import an existing wallet using mnemonic phrase
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

type ImportWalletScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ImportWallet'
>;

const ImportWalletScreen: React.FC = () => {
  const navigation = useNavigation<ImportWalletScreenNavigationProp>();
  const {importWallet, isLoading} = useWallet();
  const [mnemonic, setMnemonic] = useState('');
  const [walletName, setWalletName] = useState('');

  const handleImportWallet = async () => {
    if (!mnemonic.trim()) {
      Alert.alert('Error', 'Please enter your recovery phrase');
      return;
    }

    try {
      await importWallet(mnemonic.trim(), walletName || 'Imported Wallet');
      Alert.alert('Success', 'Wallet imported successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.replace('Home'),
        },
      ]);
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Failed to import wallet',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Import Wallet</Text>
      <Text style={styles.description}>
        Enter your 12-word recovery phrase to restore your wallet.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Wallet Name (optional)"
        placeholderTextColor="#666"
        value={walletName}
        onChangeText={setWalletName}
      />

      <TextInput
        style={[styles.input, styles.mnemonicInput]}
        placeholder="Enter your 12-word recovery phrase"
        placeholderTextColor="#666"
        value={mnemonic}
        onChangeText={setMnemonic}
        multiline
        numberOfLines={4}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleImportWallet}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#0f0f23" />
        ) : (
          <Text style={styles.buttonText}>Import Wallet</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.warning}>
        ⚠️ Never share your recovery phrase with anyone. Gauss Wallet will
        never ask for it.
      </Text>
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
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 24,
  },
  input: {
    backgroundColor: '#1a1a2e',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  mnemonicInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#00d4ff',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#0f0f23',
    fontSize: 18,
    fontWeight: 'bold',
  },
  warning: {
    color: '#ff9800',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default ImportWalletScreen;
