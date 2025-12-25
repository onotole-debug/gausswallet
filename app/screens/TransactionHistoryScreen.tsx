/**
 * Transaction History Screen
 * Displays list of past transactions
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList, Transaction} from '@types';
import {useWallet} from '@contexts/WalletContext';
import {blockchainApi} from '@api/blockchainApi';
import {CONFIG} from '@config';

type TransactionHistoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TransactionHistory'
>;

const TransactionHistoryScreen: React.FC = () => {
  const navigation = useNavigation<TransactionHistoryScreenNavigationProp>();
  const {wallet} = useWallet();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    if (!wallet?.address) return;

    try {
      setIsLoading(true);
      const history = await blockchainApi.getTransactionHistory(
        wallet.address,
      );
      setTransactions(history.transactions);
    } catch (error) {
      console.error('Failed to load transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadTransactions();
    setRefreshing(false);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const renderTransaction = ({item}: {item: Transaction}) => (
    <TouchableOpacity
      style={styles.transactionItem}
      onPress={() =>
        navigation.navigate('TransactionDetails', {transactionId: item.id})
      }>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionType}>
          {item.from === wallet?.address ? 'Sent' : 'Received'}
        </Text>
        <Text style={styles.transactionDate}>{formatDate(item.timestamp)}</Text>
      </View>
      <View style={styles.transactionAmount}>
        <Text
          style={[
            styles.amount,
            item.from === wallet?.address ? styles.sentAmount : styles.receivedAmount,
          ]}>
          {item.from === wallet?.address ? '-' : '+'}
          {item.amount} {CONFIG.WALLET.CURRENCY_SYMBOL}
        </Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#00d4ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {transactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No transactions yet</Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0f23',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 18,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#1a1a2e',
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  transactionDate: {
    color: '#666',
    fontSize: 14,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sentAmount: {
    color: '#ff5252',
  },
  receivedAmount: {
    color: '#4caf50',
  },
  status: {
    color: '#666',
    fontSize: 12,
    textTransform: 'capitalize',
  },
});

export default TransactionHistoryScreen;
