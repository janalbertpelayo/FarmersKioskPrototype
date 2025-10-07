import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Wallet() {
  const router = useRouter();

  const [balance, setBalance] = useState(15200.75);
  const [transactions, setTransactions] = useState([
    { id: 1, type: "Deposit", amount: 5000, date: "Oct 1, 2025" },
    { id: 2, type: "Sale - Corn (5kg)", amount: 320, date: "Oct 2, 2025" },
    { id: 3, type: "Sale - Pork Liempo (1kg)", amount: 280, date: "Oct 4, 2025" },
    { id: 4, type: "Withdrawal", amount: -2000, date: "Oct 6, 2025" },
  ]);

  const addFunds = () => {
    setBalance(balance + 1000);
    setTransactions([
      { id: Date.now(), type: "Deposit (Demo)", amount: 1000, date: "Oct 7, 2025" },
      ...transactions,
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💰 My Wallet</Text>
      <Text style={styles.balanceLabel}>Current Balance</Text>
      <Text style={styles.balance}>₱{balance.toFixed(2)}</Text>

      <TouchableOpacity style={styles.addButton} onPress={addFunds}>
        <Text style={styles.addButtonText}>+ Add Demo ₱1000</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Transaction History</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.transaction, item.amount < 0 && styles.negative]}>
            <Text style={styles.txType}>{item.type}</Text>
            <Text style={styles.txDate}>{item.date}</Text>
            <Text style={styles.txAmount}>
              {item.amount < 0 ? "-" : "+"}₱{Math.abs(item.amount).toFixed(2)}
            </Text>
          </View>
        )}
      />

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backText}>⬅ Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", color: "#2E7D32", marginBottom: 10 },
  balanceLabel: { fontSize: 16, color: "#555" },
  balance: { fontSize: 36, fontWeight: "bold", marginBottom: 15, color: "#4CAF50" },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  subtitle: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    borderColor: "#ccc",
  },
  txType: { fontWeight: "bold" },
  txDate: { color: "#888" },
  txAmount: { fontWeight: "bold", color: "#2E7D32" },
  negative: { borderColor: "#E53935" },
  backText: { marginTop: 20, color: "#4CAF50", textAlign: "center" },
});
