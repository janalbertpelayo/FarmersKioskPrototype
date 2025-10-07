// app/postproduct.tsx
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useProducts } from "../context/productcontext";

export default function PostProduct() {
  const [type, setType] = useState("Crop");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const router = useRouter();
  const { addProduct } = useProducts();

  const handlePost = () => {
    if (!name || !price) {
      alert("⚠️ Please fill all fields.");
      return;
    }

    const newProduct = {
      category: type,
      name: `${name}`,
      price: `₱${price}`,
      desc,
      image: "https://via.placeholder.com/100",
    };

    addProduct(newProduct); // Save to global list
    alert(`✅ ${type} posted: ${name}`);
    setName(""); setPrice(""); setDesc("");

    router.replace("/products"); // Go to My Products after posting
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Post Product</Text>
      <Text style={styles.subtitle}>Select Product Type</Text>

      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggle, type === "Crop" && styles.activeToggle]}
          onPress={() => setType("Crop")}
        >
          <Text style={[styles.toggleText, type === "Crop" && styles.activeText]}>🌾 Crop</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggle, type === "Meat" && styles.activeToggle]}
          onPress={() => setType("Meat")}
        >
          <Text style={[styles.toggleText, type === "Meat" && styles.activeText]}>🍖 Meat</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={require("../assets/images/logo.png")}
        style={styles.image}
      />

      <TextInput
        style={styles.input}
        placeholder={`${type} Name`}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price (₱)"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Description"
        value={desc}
        onChangeText={setDesc}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handlePost}>
        <Text style={styles.buttonText}>Post {type}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backText}>⬅ Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8, color: "#2E7D32" },
  subtitle: { fontSize: 16, marginBottom: 10, color: "#555" },
  toggleRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  toggle: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#4CAF50",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginHorizontal: 5,
  },
  activeToggle: { backgroundColor: "#4CAF50" },
  toggleText: { fontWeight: "bold", color: "#4CAF50" },
  activeText: { color: "#fff" },
  image: { width: "100%", height: 180, backgroundColor: "#eee", borderRadius: 8, marginBottom: 15 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 6 },
  button: { backgroundColor: "#4CAF50", padding: 15, borderRadius: 6, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  backText: { marginTop: 15, color: "#4CAF50", textAlign: "center" },
});
