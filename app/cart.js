import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { clearCart, getCartItems } from "../services/cartservices";

export default function Cart() {
  const router = useRouter();
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [address, setAddress] = useState("");

  const cartItems = getCartItems();

  const total = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * parseFloat(item.quantity)), 0);

  const handleConfirm = () => {
    // Send cartItems and address to logistics page (simulate)
    router.push({
      pathname: "/logistics",
      params: { address }
    });
    clearCart();
    setCheckoutVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 My Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item, idx) => idx.toString()}
        ListEmptyComponent={<Text style={styles.empty}>Your cart is empty.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image_url} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.quantity}>Qty: {item.quantity} {item.unit}</Text>
              <Text style={styles.price}>₱{item.price}</Text>
            </View>
          </View>
        )}
      />
      {cartItems.length > 0 && (
        <>
          <Text style={styles.total}>Total: ₱{total.toFixed(2)}</Text>
          <TouchableOpacity style={styles.checkoutBtn} onPress={() => setCheckoutVisible(true)}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Checkout Modal */}
      <Modal
        visible={checkoutVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCheckoutVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.checkoutModal}>
            <Text style={styles.modalTitle}>Confirm Purchase</Text>
            <Text style={styles.modalTotal}>Total to pay: ₱{total.toFixed(2)}</Text>
            <Text style={styles.modalPayment}>Payment: Cash on Delivery</Text>
            <TextInput
              style={styles.addressInput}
              placeholder="Enter delivery address"
              value={address}
              onChangeText={setAddress}
            />
            <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
              <Text style={styles.confirmText}>Confirm Purchase</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setCheckoutVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8, color: "#2E7D32" },
  card: { flexDirection: "row", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 10, alignItems: "center" },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  name: { fontWeight: "bold", fontSize: 16 },
  quantity: { fontSize: 14, color: "#333", marginTop: 2 },
  price: { fontSize: 16, color: "#4CAF50" },
  total: { fontSize: 18, fontWeight: "bold", marginTop: 10, marginBottom: 10, color: "#2E7D32" },
  checkoutBtn: { backgroundColor: "#4CAF50", padding: 15, borderRadius: 6, alignItems: "center" },
  checkoutText: { color: "#fff", fontWeight: "bold" },
  empty: { textAlign: "center", marginTop: 20, color: "#888" },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  checkoutModal: { width: '85%', backgroundColor: '#fff', borderRadius: 12, padding: 20, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  modalTotal: { fontSize: 18, marginBottom: 8 },
  modalPayment: { fontSize: 16, marginBottom: 8 },
  addressInput: { width: "100%", borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 10, marginBottom: 12 },
  confirmBtn: { backgroundColor: "#4CAF50", padding: 12, borderRadius: 6, marginTop: 8, width: '100%', alignItems: 'center' },
  confirmText: { color: "#fff", fontWeight: "bold" },
  closeBtn: { marginTop: 8, width: '100%', alignItems: 'center' },
  closeText: { color: "#4CAF50", fontWeight: "bold" },
});
