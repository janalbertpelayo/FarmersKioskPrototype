import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Profile() {
  const router = useRouter();
  const [farmer, setFarmer] = useState({
    name: "Farmer Juan",
    location: "Brgy. San Isidro, Cagayan de Oro",
    contact: "0912-345-6789",
    experience: "5 years farming corn and vegetables",
    avatar: "https://via.placeholder.com/120",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 My Profile</Text>

      <View style={styles.profileCard}>
        <Image source={{ uri: farmer.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{farmer.name}</Text>
        <Text>📍 {farmer.location}</Text>
        <Text>📞 {farmer.contact}</Text>
        <Text style={styles.exp}>🧑‍🌾 {farmer.experience}</Text>
      </View>

      <TouchableOpacity style={styles.editBtn} onPress={() => alert("Edit feature coming soon!")}>
        <Text style={styles.editText}>✏️ Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backText}>⬅ Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "#2E7D32", marginBottom: 20 },
  profileCard: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 20,
    width: "100%",
  },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 15 },
  name: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
  exp: { marginTop: 10, color: "#555", fontStyle: "italic" },
  editBtn: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  editText: { color: "#fff", fontWeight: "bold" },
  backText: { marginTop: 20, color: "#4CAF50" },
});
