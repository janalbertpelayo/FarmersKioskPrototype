// app/products.tsx
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useProducts } from "../context/productcontext";
import { useState } from "react";

export default function Products() {
  const router = useRouter();
  const { products, removeProduct } = useProducts();
  const [activeTab, setActiveTab] = useState("Crop");

  const filteredProducts = products.filter((p) => p.category === activeTab);

  const handleRemove = (id, name) => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to remove "${name}" from your ${activeTab} list?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Remove", style: "destructive", onPress: () => removeProduct(id) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛍️ My Products</Text>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Crop" && styles.activeTab]}
          onPress={() => setActiveTab("Crop")}
        >
          <Text style={[styles.tabText, activeTab === "Crop" && styles.activeText]}>🌾 Crops</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "Meat" && styles.activeTab]}
          onPress={() => setActiveTab("Meat")}
        >
          <Text style={[styles.tabText, activeTab === "Meat" && styles.activeText]}>🍖 Meat</Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.empty}>No {activeTab} products yet.</Text>}
        renderItem={({ item }) => (
          <View style={[styles.card, item.category === "Meat" && styles.meatCard]}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.price}</Text>
              <Text style={styles.categoryTag}>
                {item.category === "Meat" ? "🍖 Meat" : "🌾 Crop"}
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleRemove(item.id, item.name)}>
              <Text style={styles.removeBtn}>🗑️</Text>
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
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 15, color: "#2E7D32" },
  tabs: { flexDirection: "row", marginBottom: 15 },
  tab: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
  },
  activeTab: { borderColor: "#4CAF50" },
  tabText: { fontWeight: "bold", color: "#777" },
  activeText: { color: "#4CAF50" },
  card: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  meatCard: { borderColor: "#E53935" },
  image: { width: 60, height: 60, borderRadius: 6, marginRight: 10 },
  name: { fontWeight: "bold", fontSize: 16 },
  categoryTag: { fontSize: 13, color: "#666", marginTop: 3 },
  removeBtn: { fontSize: 20, color: "#E53935" },
  empty: { textAlign: "center", marginTop: 20, color: "#888" },
  backText: { marginTop: 15, color: "#4CAF50", textAlign: "center" },
});
