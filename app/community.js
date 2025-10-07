import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Community() {
  const router = useRouter();

  const [posts, setPosts] = useState([
    { id: 1, author: "Farmer Juan", text: "Any tips for storing corn longer?" },
    { id: 2, author: "Farmer Maria", text: "Our coop is selling organic feeds at discount!" },
    { id: 3, author: "Admin", text: "🌾 Join the harvest festival this October 10!" },
  ]);
  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post = { id: Date.now(), author: "You", text: newPost };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💬 Farmer Community</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Share something..."
          value={newPost}
          onChangeText={setNewPost}
        />
        <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
          <Text style={styles.postText}>Post</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <Text style={styles.author}>{item.author}</Text>
            <Text>{item.text}</Text>
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
  inputRow: { flexDirection: "row", marginBottom: 15 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  postBtn: { backgroundColor: "#4CAF50", paddingHorizontal: 15, justifyContent: "center", borderRadius: 8 },
  postText: { color: "#fff", fontWeight: "bold" },
  postCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  author: { fontWeight: "bold", marginBottom: 3, color: "#2E7D32" },
  backText: { marginTop: 20, color: "#4CAF50", textAlign: "center" },
});
