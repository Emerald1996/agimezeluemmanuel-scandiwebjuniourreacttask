import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  cartQuantity: 0,
  totalQuantity: 0,
  cartItemIds: [],
  currentCurrency: "$"
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart
    addItemToCart(state, action) {
      state.cart = [...state.cart, action.payload];
      state.cartQuantity = state.cartQuantity + 1;
      state.totalQuantity = state.totalQuantity + action.payload.quantity;
      state.cartItemIds = [...state.cartItemIds, action.payload.id];
    },

    // Remove item from cart
    removeItemFromCart(state, action) {
      let itemRemoved = state.cart.find((item) => item.id === action.payload);
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      state.cartQuantity = state.cartQuantity - 1;
      state.cartItemIds = state.cartItemIds.filter(
        (item) => item !== action.payload
        );
      state.totalQuantity = state.totalQuantity - itemRemoved?.quantity;
    },

    // Item count
    handleCount(state, action) {
      let count = state.cart.find((item) => item.id === action.payload.id);
      if (count.quantity === 1 && action.payload.subtract) {
        return;
      } else {
        count.quantity = action.payload.add
          ? count.quantity + 1
          : count.quantity - 1;
        state.totalQuantity = action.payload.add
          ? state.totalQuantity + 1
          : state.totalQuantity - 1;
      }
      state.cart = [...state.cart];
    },

    // Clear cart
    clearCartItems(state) {
      state.cart = [];
      state.cartQuantity = 0;
      state.totalQuantity = 0;
      state.cartItemIds = [];
    },

    // Currency update
    setCurrency(state, action) {
      if (state.currentCurrency) {
        state.currentCurrency = action.payload;
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart, handleCount, clearCartItems, handleAttribute, setCurrency } = cartSlice.actions
export default cartSlice.reducer;