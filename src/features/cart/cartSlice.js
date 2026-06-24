import { createSlice } from "@reduxjs/toolkit";

const storedCart =
  JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = (items) => {
  localStorage.setItem(
    "cart",
    JSON.stringify(items)
  );
};

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: storedCart,
  },

  reducers: {
    addToCart(state, action) {
      const item = action.payload;

      const existingItem = state.items.find(
        (product) => product.id === item.id
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }

      saveCart(state.items);
    },

    increaseQuantity(state, action) {
      const item = state.items.find(
        (product) => product.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }

      saveCart(state.items);
    },

    decreaseQuantity(state, action) {
      const item = state.items.find(
        (product) => product.id === action.payload
      );

      if (item) {
        item.quantity = Math.max(
          1,
          item.quantity - 1
        );
      }

      saveCart(state.items);
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(
        (product) => product.id !== action.payload
      );

      saveCart(state.items);
    },

    clearCart(state) {
      state.items = [];

      saveCart(state.items);
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
