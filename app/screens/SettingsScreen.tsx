/**
 * Settings Screen
 * App settings and wallet management
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useWallet} from '@contexts/WalletContext';

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const {wallet, deleteWallet} = useWallet();

  const handleDeleteWallet = () => {
    Alert.alert(
      'Delete Wallet',
      'Are you sure you want to delete this wallet? Make sure you have backed up your recovery phrase!',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteWallet();
              Alert.alert(
                'Success',
                'Wallet deleted successfully',
                [
                  {
                    text: 'OK',
                    onPress: () => navigation.navigate('CreateWallet' as never),
                  },
                ],
              );
            } catch (error) {
              Alert.alert(
                'Error',
                error instanceof Error
                  ? error.message
                  : 'Failed to delete wallet',
              );
            }
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Wallet Information</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Wallet Name</Text>
          <Text style={styles.infoValue}>{wallet?.name || 'My Wallet'}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Address</Text>
          <Text style={styles.infoValueSmall}>{wallet?.address}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Backup' as never)}>
          <Text style={styles.menuItemText}>Backup Wallet</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Version</Text>
          <Text style={styles.infoValue}>0.1.0</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Network</Text>
          <Text style={styles.infoValue}>Gauss Mainnet</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.dangerButton}
        onPress={handleDeleteWallet}>
        <Text style={styles.dangerButtonText}>Delete Wallet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#00d4ff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoItem: {
    backgroundColor: '#1a1a2e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoLabel: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 5,
  },
  infoValue: {
    color: '#fff',
    fontSize: 16,
  },
  infoValueSmall: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  menuItem: {
    backgroundColor: '#1a1a2e',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  menuItemText: {
    color: '#fff',
    fontSize: 16,
  },
  dangerButton: {
    backgroundColor: '#2a1a1a',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ff5252',
    marginTop: 20,
  },
  dangerButtonText: {
    color: '#ff5252',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
