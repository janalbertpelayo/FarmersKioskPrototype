// context/ProductContext.tsx
import React, { createContext, useState, useContext } from "react";

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    // 🌾 Default Crops
    { id: 1, category: "Crop", name: "Tomatoes (2kg)", price: "₱150", image: "https://via.placeholder.com/100" },
    { id: 2, category: "Crop", name: "Corn (5kg)", price: "₱320", image: "https://via.placeholder.com/100" },
    // 🍖 Default Meat
    { id: 3, category: "Meat", name: "Chicken Drumsticks (1kg)", price: "₱200", image: "https://via.placeholder.com/100" },
    { id: 4, category: "Meat", name: "Beef Sirloin (1kg)", price: "₱450", image: "https://via.placeholder.com/100" },
  ]);

  const addProduct = (newProduct) => {
    setProducts((prev) => [...prev, { id: Date.now(), ...newProduct }]);
  };

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, removeProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
