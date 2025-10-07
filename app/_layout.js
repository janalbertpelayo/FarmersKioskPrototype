// app/_layout.tsx
<Stack initialRouteName="welcome" />

import { Stack } from "expo-router";
import { ProductProvider } from "../context/productcontext";

export default function Layout() {
  return (
    <ProductProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="welcome" />
        <Stack.Screen name="index" />
        <Stack.Screen name="postproduct" />
        <Stack.Screen name="products" />
        <Stack.Screen name="logistics" />
        <Stack.Screen name="wallet" />
        <Stack.Screen name="community" />
        <Stack.Screen name="profile" />
      </Stack>
    </ProductProvider>
  );
}