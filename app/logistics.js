// app/logistics.tsx
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Logistics() {
  const router = useRouter();

  const [deliveries, setDeliveries] = useState([
    { id: 1, product: "Corn (5kg)", status: "🧊 In Cold Storage", location: "Warehouse A", eta: "Ready for Delivery" },
    { id: 2, product: "Tomatoes (2kg)", status: "🚚 Out for Delivery", location: "Route 12", eta: "2 hrs" },
    { id: 3, product: "Pork Liempo (1kg)", status: "✅ Delivered", location: "Customer – CDO Market", eta: "Completed" },
  ]);

  const updateStatus = (id) => {
    setDeliveries((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "🧊 In Cold Storage"
                  ? "🚚 Out for Delivery"
                  : item.status === "🚚 Out for Delivery"
                  ? "✅ Delivered"
                  : "🧊 In Cold Storage",
            }
          : item
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚚 Logistics & Cold Storage</Text>
      <Text style={styles.subtitle}>Track your product movement</Text>

      <FlatList
        data={deliveries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.product}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Location: {item.location}</Text>
            <Text>ETA: {item.eta}</Text>

            <TouchableOpacity style={styles.updateBtn} onPress={() => updateStatus(item.id)}>
              <Text style={styles.updateText}>🔄 Update Status</Text>
            </TouchableOpacity>
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
  title: { fontSize: 24, fontWeight: "bold", color: "#2E7D32" },
  subtitle: { fontSize: 15, marginBottom: 10, color: "#555" },
  card: { borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 10 },
  name: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
  updateBtn: {
    marginTop: 10,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  updateText: { color: "#fff", fontWeight: "bold" },
  backText: { marginTop: 15, color: "#4CAF50", textAlign: "center" },
});
