/**
 * Backup Screen
 * Displays recovery phrase for user backup
 * Keys are ONLY shown to user for backup purposes
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {getMnemonic} from '@utils/secureStorage';

const BackupScreen: React.FC = () => {
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRevealPhrase = async () => {
    Alert.alert(
      'Security Warning',
      'Your recovery phrase gives full access to your wallet. Make sure no one is watching your screen.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'I Understand',
          onPress: async () => {
            setIsLoading(true);
            const phrase = await getMnemonic();
            setMnemonic(phrase);
            setIsRevealed(true);
            setIsLoading(false);
          },
        },
      ],
    );
  };

  const handleCopyPhrase = () => {
    if (mnemonic) {
      // In a real app, use Clipboard.setString
      Alert.alert('Copied', 'Recovery phrase copied to clipboard');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Backup Wallet</Text>
      <Text style={styles.description}>
        Your recovery phrase is the ONLY way to restore your wallet. Write it
        down and store it in a safe place.
      </Text>

      {!isRevealed ? (
        <TouchableOpacity
          style={styles.revealButton}
          onPress={handleRevealPhrase}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#0f0f23" />
          ) : (
            <Text style={styles.revealButtonText}>Reveal Recovery Phrase</Text>
          )}
        </TouchableOpacity>
      ) : (
        <>
          <View style={styles.phraseContainer}>
            {mnemonic ? (
              <Text style={styles.phraseText}>{mnemonic}</Text>
            ) : (
              <Text style={styles.noPhrase}>No recovery phrase found</Text>
            )}
          </View>

          {mnemonic && (
            <TouchableOpacity
              style={styles.copyButton}
              onPress={handleCopyPhrase}>
              <Text style={styles.copyButtonText}>Copy to Clipboard</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      <View style={styles.warningContainer}>
        <Text style={styles.warningTitle}>⚠️ Security Tips</Text>
        <Text style={styles.warningText}>
          • Never share your recovery phrase with anyone
        </Text>
        <Text style={styles.warningText}>
          • Gauss Wallet will never ask for your recovery phrase
        </Text>
        <Text style={styles.warningText}>
          • Store it offline in a secure location
        </Text>
        <Text style={styles.warningText}>
          • Anyone with this phrase can access your funds
        </Text>
      </View>
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
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 30,
    lineHeight: 24,
  },
  revealButton: {
    backgroundColor: '#00d4ff',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  revealButtonText: {
    color: '#0f0f23',
    fontSize: 18,
    fontWeight: 'bold',
  },
  phraseContainer: {
    backgroundColor: '#1a1a2e',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    minHeight: 100,
  },
  phraseText: {
    color: '#00d4ff',
    fontSize: 16,
    lineHeight: 28,
    textAlign: 'center',
  },
  noPhrase: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
  copyButton: {
    backgroundColor: '#00d4ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  copyButtonText: {
    color: '#0f0f23',
    fontSize: 16,
    fontWeight: 'bold',
  },
  warningContainer: {
    backgroundColor: '#2a1a1a',
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ff9800',
  },
  warningTitle: {
    color: '#ff9800',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  warningText: {
    color: '#ff9800',
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default BackupScreen;
