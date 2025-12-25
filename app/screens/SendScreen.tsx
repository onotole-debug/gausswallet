/**
 * Send Screen
 * Allows users to send transactions
 * Transaction signing happens locally in the app
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
import {useWallet} from '@contexts/WalletContext';
import {signTransaction} from '@crypto/walletCrypto';
import {blockchainApi} from '@api/blockchainApi';
import {getPrivateKey} from '@utils/secureStorage';
import {CONFIG} from '@config';

const SendScreen: React.FC = () => {
  const navigation = useNavigation();
  const {wallet, refreshBalance} = useWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!wallet) {
      Alert.alert('Error', 'No wallet found');
      return;
    }

    if (!recipient || !amount) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);

      // Get private key for signing
      const privateKey = await getPrivateKey();
      if (!privateKey) {
        throw new Error('Private key not found');
      }

      // Get nonce
      const nonce = await blockchainApi.getNonce(wallet.address);

      // Create unsigned transaction
      const unsignedTx = {
        to: recipient,
        amount: amount,
        fee: CONFIG.WALLET.DEFAULT_FEE,
        nonce,
      };

      // Sign transaction locally in the app
      const signedTx = await signTransaction(unsignedTx, privateKey);

      // Broadcast to network
      const result = await blockchainApi.broadcastTransaction(signedTx);

      Alert.alert(
        'Success',
        `Transaction sent!\nHash: ${result.txHash}`,
        [
          {
            text: 'OK',
            onPress: () => {
              refreshBalance();
              navigation.goBack();
            },
          },
        ],
      );
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Failed to send transaction',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send {CONFIG.WALLET.CURRENCY_SYMBOL}</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Recipient Address</Text>
        <TextInput
          style={styles.input}
          placeholder="0x..."
          placeholderTextColor="#666"
          value={recipient}
          onChangeText={setRecipient}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="0.0"
          placeholderTextColor="#666"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
        />

        <View style={styles.feeContainer}>
          <Text style={styles.feeLabel}>Network Fee:</Text>
          <Text style={styles.feeValue}>{CONFIG.WALLET.DEFAULT_FEE} {CONFIG.WALLET.CURRENCY_SYMBOL}</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSend}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#0f0f23" />
          ) : (
            <Text style={styles.buttonText}>Send Transaction</Text>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.info}>
        ⓘ Transaction will be signed locally on your device for maximum
        security.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1a1a2e',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  feeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#1a1a2e',
    borderRadius: 10,
    marginBottom: 30,
  },
  feeLabel: {
    color: '#aaa',
    fontSize: 16,
  },
  feeValue: {
    color: '#00d4ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#00d4ff',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#0f0f23',
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    color: '#00d4ff',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default SendScreen;
