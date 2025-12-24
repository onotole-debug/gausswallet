/**
 * Receive Screen
 * Displays wallet address for receiving funds
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useWallet} from '@contexts/WalletContext';

const ReceiveScreen: React.FC = () => {
  const {wallet} = useWallet();

  const handleCopyAddress = () => {
    if (wallet?.address) {
      // In a real app, you would use Clipboard.setString from @react-native-clipboard/clipboard
      Alert.alert('Copied', 'Address copied to clipboard');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receive Funds</Text>

      <View style={styles.qrContainer}>
        <Text style={styles.qrPlaceholder}>QR Code</Text>
        <Text style={styles.qrInfo}>
          Scan this QR code to receive funds
        </Text>
      </View>

      <View style={styles.addressContainer}>
        <Text style={styles.label}>Your Address</Text>
        <Text style={styles.address}>{wallet?.address}</Text>
        <TouchableOpacity
          style={styles.copyButton}
          onPress={handleCopyAddress}>
          <Text style={styles.copyButtonText}>Copy Address</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.warning}>
        ⚠️ Only send {wallet?.name || 'compatible'} tokens to this address
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
  qrContainer: {
    backgroundColor: '#1a1a2e',
    padding: 40,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  qrPlaceholder: {
    width: 200,
    height: 200,
    lineHeight: 200,
    textAlign: 'center',
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 18,
    borderRadius: 10,
  },
  qrInfo: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 15,
  },
  addressContainer: {
    backgroundColor: '#1a1a2e',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  label: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 10,
  },
  address: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'monospace',
    marginBottom: 15,
  },
  copyButton: {
    backgroundColor: '#00d4ff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  copyButtonText: {
    color: '#0f0f23',
    fontSize: 16,
    fontWeight: 'bold',
  },
  warning: {
    color: '#ff9800',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ReceiveScreen;
