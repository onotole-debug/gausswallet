/**
 * Transaction Details Screen
 * Shows detailed information about a transaction
 */

import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import type {RootStackParamList} from '@types';

type TransactionDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'TransactionDetails'
>;

const TransactionDetailsScreen: React.FC = () => {
  const route = useRoute<TransactionDetailsScreenRouteProp>();
  const {transactionId} = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Transaction ID</Text>
        <Text style={styles.value}>{transactionId}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>Confirmed</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Amount</Text>
        <Text style={styles.value}>0.00000000 GAUSS</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Fee</Text>
        <Text style={styles.value}>0.0001 GAUSS</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>From</Text>
        <Text style={styles.valueSmall}>0x...</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>To</Text>
        <Text style={styles.valueSmall}>0x...</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Timestamp</Text>
        <Text style={styles.value}>-</Text>
      </View>
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
    backgroundColor: '#1a1a2e',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  label: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 8,
  },
  value: {
    color: '#fff',
    fontSize: 16,
  },
  valueSmall: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'monospace',
  },
});

export default TransactionDetailsScreen;
